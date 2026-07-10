import { describe, it, expect, beforeAll } from 'vitest'
import { signUnsubscribeToken, verifyUnsubscribeToken } from '../../lib/unsubscribe-token'

beforeAll(() => {
  process.env.CRON_SECRET = 'test-secret-for-unit-tests-only'
})

describe('unsubscribe token', () => {
  it('round-trips an email address', async () => {
    const token = await signUnsubscribeToken('user@example.com')
    const email = await verifyUnsubscribeToken(token)
    expect(email).toBe('user@example.com')
  })

  it('throws on a tampered token', async () => {
    const token = await signUnsubscribeToken('user@example.com')
    await expect(verifyUnsubscribeToken(token + 'x')).rejects.toThrow()
  })

  it('produces a string token', async () => {
    const token = await signUnsubscribeToken('user@example.com')
    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(20)
  })
})
