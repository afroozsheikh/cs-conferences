import Link from 'next/link'
import type { Conference } from '@/data/conferences'

type Props = { conferences: Conference[] }

export default function Sidebar({ conferences }: Props) {
  const counts: Record<string, number> = {}
  for (const c of conferences) {
    counts[c.topic] = (counts[c.topic] ?? 0) + 1
  }
  const topics = Object.entries(counts).sort((a, b) => b[1] - a[1])

  const today = new Date()
  const upcoming = [...conferences]
    .map((c) => ({ ...c, _date: new Date(`${c.month} ${c.day}, ${c.year}`) }))
    .filter((c) => c._date >= today)
    .sort((a, b) => a._date.getTime() - b._date.getTime())
    .slice(0, 4)

  return (
    <aside className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-label">Browse by topic</p>
        </div>
        <ul className="divide-y divide-border">
          {topics.map(([name, count]) => (
            <li key={name}>
              <Link
                href={`/?topic=${encodeURIComponent(name)}`}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-bg/50 hover:text-text-primary"
              >
                <span>{name}</span>
                <span className="rounded-full bg-bg px-2 py-0.5 font-mono text-[10px] text-text-label">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-label">Coming up soon</p>
        </div>
        <ul className="divide-y divide-border">
          {upcoming.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/c/${c.slug}`}
                className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-bg/50"
              >
                <div className="min-w-[40px] rounded-lg border border-border bg-bg py-1.5 text-center">
                  <p className="font-mono text-[9px] uppercase text-accent">{c.month}</p>
                  <p className="font-mono text-sm font-bold leading-none text-text-primary">{c.day}</p>
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug text-text-primary">
                    {c.title.split('–')[0].trim()}
                  </p>
                  <p className="font-mono text-[11px] text-text-label">{c.location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
