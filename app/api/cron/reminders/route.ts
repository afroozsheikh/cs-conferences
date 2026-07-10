import type { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { conferences } from '@/data/conferences'
import { getSupabaseClient } from '@/lib/supabase'
import { signUnsubscribeToken } from '@/lib/unsubscribe-token'
import { renderReminderEmail } from '@/lib/email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Compute target date: today (UTC) + 14 days
  const target = new Date()
  target.setUTCDate(target.getUTCDate() + 14)
  const targetISO = target.toISOString().slice(0, 10) // "YYYY-MM-DD"

  const upcoming = conferences.filter((c) => c.paperDeadlineISO === targetISO)
  if (upcoming.length === 0) {
    return Response.json({ sent: 0, skipped: 0 })
  }

  const relevantTopics = [...new Set(upcoming.map((c) => c.topic))]

  const { data: subscribers, error: dbError } = await getSupabaseClient()
    .from('subscribers')
    .select('email, topics')
    .overlaps('topics', relevantTopics)

  if (dbError) {
    console.error('Supabase query error:', dbError)
    return Response.json({ error: 'Database error.' }, { status: 500 })
  }

  const dateLabel = target.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://cs-conferences.vercel.app'

  let sent = 0
  for (const sub of subscribers ?? []) {
    const matched = upcoming.filter((c) => (sub.topics as string[]).includes(c.topic))
    if (matched.length === 0) continue

    const token = await signUnsubscribeToken(sub.email)
    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${token}`
    const html = renderReminderEmail(matched, unsubscribeUrl, dateLabel)

    const { error: emailError } = await resend.emails.send({
      from: 'CS Conferences <onboarding@resend.dev>',
      to: sub.email,
      subject: 'Your paper deadlines are in 14 days',
      html,
    })

    if (emailError) {
      console.error(`Failed to send to ${sub.email}:`, emailError)
    } else {
      sent++
    }
  }

  const total = subscribers?.length ?? 0
  return Response.json({ sent, skipped: total - sent })
}
