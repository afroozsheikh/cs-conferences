import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getStatus } from '../../lib/status'

describe('getStatus', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('returns "closed" when deadline is in the past', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Jan 15, 2026')).toBe('closed')
  })

  it('returns "soon" when deadline is 1 day away', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 02, 2026')).toBe('soon')
  })

  it('returns "soon" when deadline is exactly 14 days away', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 15, 2026')).toBe('soon')
  })

  it('returns "open" when deadline is 15 days away', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 16, 2026')).toBe('open')
  })

  it('returns "open" for TBD deadlines', () => {
    expect(getStatus('TBD')).toBe('open')
  })

  it('returns "soon" on the deadline day itself', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 01, 2026')).toBe('soon')
  })
})
