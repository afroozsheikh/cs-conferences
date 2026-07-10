import { describe, it, expect } from 'vitest'
import { renderReminderEmail } from '../../lib/email'
import type { Conference } from '../../data/conferences'

const conf: Conference = {
  slug: 'icml-2026',
  title: 'ICML 2026 – International Conference on Machine Learning',
  month: 'Jul', day: '6', year: '2026',
  location: 'Seoul, South Korea',
  topic: 'Machine Learning',
  rank: 'A*',
  paperDeadline: 'Jan 28, 2026',
  paperDeadlineISO: '2026-01-28',
  notificationDate: 'Apr 30, 2026',
  cameraReady: 'TBD',
  url: 'https://icml.cc/Conferences/2026',
}

describe('renderReminderEmail', () => {
  it('includes the conference title', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('ICML 2026')
  })

  it('includes the rank', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('A*')
  })

  it('includes the deadline', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('Jan 28, 2026')
  })

  it('includes the unsubscribe URL', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub?token=abc', 'January 28, 2026')
    expect(html).toContain('https://example.com/unsub?token=abc')
  })

  it('includes submit link', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('https://icml.cc/Conferences/2026')
  })

  it('includes divider between multiple conferences', () => {
    const html = renderReminderEmail([conf, { ...conf, slug: 'neurips-2026', title: 'NeurIPS 2026' }], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('· · ·')
  })

  it('does not include divider for a single conference', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).not.toContain('· · ·')
  })
})
