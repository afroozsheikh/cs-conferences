import { validateSubscription } from '../../../lib/validate-subscription'
import { getSupabaseClient } from '../../../lib/supabase'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { email, topics } = body as { email: unknown; topics: unknown }
  const result = validateSubscription(email, topics)
  if (!result.valid) {
    return Response.json({ error: result.error }, { status: 400 })
  }

  const { error } = await getSupabaseClient()
    .from('subscribers')
    .upsert(
      { email: email as string, topics: topics as string[] },
      { onConflict: 'email' }
    )

  if (error) {
    console.error('Supabase upsert error:', error)
    return Response.json({ error: 'Failed to save subscription.' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
