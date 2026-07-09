import { describe, it, expect, vi } from 'vitest'
import { applyFilters, sortByDeadline, type Filters } from '../../lib/filter'
import type { Conference } from '../../data/conferences'

const base: Omit<Conference, 'slug' | 'title' | 'month' | 'year' | 'topic' | 'rank' | 'paperDeadline'> = {
  day: '1',
  location: 'City, Country',
  notificationDate: 'TBD',
  cameraReady: 'TBD',
  url: 'https://example.com',
}

const conferences: Conference[] = [
  { ...base, slug: 'icml-2026',    title: 'ICML 2026',    month: 'Jul', year: '2026', topic: 'Machine Learning', rank: 'A*', paperDeadline: 'Jan 28, 2026', paperDeadlineISO: '2026-01-28' },
  { ...base, slug: 'neurips-2026', title: 'NeurIPS 2026', month: 'Dec', year: '2026', topic: 'Machine Learning', rank: 'A*', paperDeadline: 'May 07, 2026', paperDeadlineISO: '2026-05-07' },
  { ...base, slug: 'cvpr-2026',    title: 'CVPR 2026',    month: 'Jun', year: '2026', topic: 'Computer Vision',  rank: 'A*', paperDeadline: 'Nov 13, 2025', paperDeadlineISO: '2025-11-13' },
  { ...base, slug: 'acl-2026',     title: 'ACL 2026',     month: 'Aug', year: '2026', topic: 'NLP',              rank: 'A*', paperDeadline: 'Feb 15, 2026', paperDeadlineISO: '2026-02-15' },
  { ...base, slug: 'sp-2027',      title: 'S&P 2027',     month: 'May', year: '2027', topic: 'Security',         rank: 'A*', paperDeadline: 'TBD' },
]

const defaultFilters: Filters = {
  month: 'all',
  rank: 'all',
  topic: 'all',
  search: '',
  hideClosed: false,
}

describe('applyFilters', () => {
  it('returns all conferences with default filters', () => {
    expect(applyFilters(conferences, defaultFilters)).toHaveLength(5)
  })

  it('filters by month', () => {
    const result = applyFilters(conferences, { ...defaultFilters, month: 'Jul' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('icml-2026')
  })

  it('filters by rank', () => {
    const result = applyFilters(conferences, { ...defaultFilters, rank: 'A*' })
    expect(result).toHaveLength(5)
  })

  it('filters by topic', () => {
    const result = applyFilters(conferences, { ...defaultFilters, topic: 'NLP' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('acl-2026')
  })

  it('filters by search (title)', () => {
    const result = applyFilters(conferences, { ...defaultFilters, search: 'neurips' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('neurips-2026')
  })

  it('filters by search (topic)', () => {
    const result = applyFilters(conferences, { ...defaultFilters, search: 'computer vision' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('cvpr-2026')
  })

  it('hideClosed removes past-deadline conferences', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-01T00:00:00.000Z'))
    const result = applyFilters(conferences, { ...defaultFilters, hideClosed: true })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(c => {
      const status = c.paperDeadline === 'TBD' ? 'open' : (() => {
        const d = new Date(c.paperDeadline)
        const t = new Date('2026-07-01')
        return d < t ? 'closed' : 'open'
      })()
      expect(status).not.toBe('closed')
    })
    vi.useRealTimers()
  })

  it('combines multiple filters', () => {
    const result = applyFilters(conferences, { ...defaultFilters, topic: 'Machine Learning', month: 'Dec' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('neurips-2026')
  })

  it('returns empty array when nothing matches', () => {
    const result = applyFilters(conferences, { ...defaultFilters, search: 'zzznomatch' })
    expect(result).toHaveLength(0)
  })
})

describe('sortByDeadline', () => {
  it('sorts by ascending deadline, TBD last', () => {
    const result = sortByDeadline(conferences)
    expect(result[0].slug).toBe('cvpr-2026')      // Nov 13, 2025
    expect(result[result.length - 1].slug).toBe('sp-2027') // TBD → Infinity
  })

  it('does not mutate the input array', () => {
    const original = [...conferences]
    sortByDeadline(conferences)
    expect(conferences).toEqual(original)
  })
})
