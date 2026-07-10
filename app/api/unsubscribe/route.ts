import type { NextRequest } from 'next/server'
import { verifyUnsubscribeToken } from '../../../lib/unsubscribe-token'
import { getSupabaseClient } from '../../../lib/supabase'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return new Response('Missing token.', { status: 400 })
  }

  let email: string
  try {
    email = await verifyUnsubscribeToken(token)
  } catch {
    return new Response('Invalid or expired unsubscribe link.', { status: 400 })
  }

  await getSupabaseClient().from('subscribers').delete().eq('email', email)

  return new Response(
    `<!DOCTYPE html><html><body style="font-family:monospace;padding:40px;background:#f5f0e8;color:#1c180f;">
      <p style="font-size:14px;">You've been unsubscribed. No more reminders will be sent to ${email}.</p>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } },
  )
}
