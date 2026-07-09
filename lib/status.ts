export type Status = 'open' | 'soon' | 'closed'

export function getStatus(paperDeadline: string): Status {
  if (paperDeadline === 'TBD') return 'open'
  const deadline = new Date(paperDeadline)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  if (diffDays < 0) return 'closed'
  if (diffDays <= 14) return 'soon'
  return 'open'
}
