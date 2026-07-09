import type { Conference } from '@/data/conferences'
import { getStatus } from '@/lib/status'

export type Filters = {
  month: string       // 'all' | three-letter month
  rank: string        // 'all' | 'A*' | 'A' | 'B' | 'C'
  topic: string       // 'all' | exact Topic value
  search: string
  hideClosed: boolean
}

export function applyFilters(list: Conference[], filters: Filters): Conference[] {
  return list.filter((c) => {
    if (filters.hideClosed && getStatus(c.paperDeadline) === 'closed') return false
    if (filters.month !== 'all' && c.month !== filters.month) return false
    if (filters.rank !== 'all' && c.rank !== filters.rank) return false
    if (filters.topic !== 'all' && c.topic.toLowerCase() !== filters.topic.toLowerCase()) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      return (
        c.title.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.topic.toLowerCase().includes(q) ||
        c.rank.toLowerCase() === q
      )
    }
    return true
  })
}

export function sortByDeadline(list: Conference[]): Conference[] {
  return [...list].sort((a, b) => {
    const da = a.paperDeadline === 'TBD' ? Infinity : new Date(a.paperDeadline).getTime()
    const db = b.paperDeadline === 'TBD' ? Infinity : new Date(b.paperDeadline).getTime()
    return da - db
  })
}
