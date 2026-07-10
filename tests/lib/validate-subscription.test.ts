import { describe, it, expect } from 'vitest'
import { validateSubscription } from '../../lib/validate-subscription'

describe('validateSubscription', () => {
  it('returns valid for a good email and one topic', () => {
    const result = validateSubscription('user@example.com', ['Machine Learning'])
    expect(result).toEqual({ valid: true })
  })

  it('returns error for missing email', () => {
    const result = validateSubscription('', ['Machine Learning'])
    expect(result.valid).toBe(false)
  })

  it('returns error for malformed email', () => {
    const result = validateSubscription('not-an-email', ['Machine Learning'])
    expect(result.valid).toBe(false)
  })

  it('returns error for empty topics array', () => {
    const result = validateSubscription('user@example.com', [])
    expect(result.valid).toBe(false)
  })

  it('returns error for non-array topics', () => {
    const result = validateSubscription('user@example.com', 'Machine Learning')
    expect(result.valid).toBe(false)
  })

  it('returns error for unknown topic', () => {
    const result = validateSubscription('user@example.com', ['Machine Learning', 'Astrology'])
    expect(result.valid).toBe(false)
  })

  it('returns valid for multiple valid topics', () => {
    const result = validateSubscription('user@example.com', ['Machine Learning', 'NLP', 'Security'])
    expect(result).toEqual({ valid: true })
  })
})
