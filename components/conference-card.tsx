import Link from 'next/link'
import type { Conference } from '@/data/conferences'
import type { Status } from '@/lib/status'

const STATUS_STYLES: Record<Status, string> = {
  open:   'bg-emerald-950 text-emerald-400 border-emerald-900',
  soon:   'bg-amber-950 text-amber-400 border-amber-900',
  closed: 'bg-surface text-text-label border-border',
}
const STATUS_LABELS: Record<Status, string> = {
  open: '● Open', soon: '⏳ Soon', closed: '✕ Closed',
}

const RANK_STYLES: Record<string, string> = {
  'A*': 'bg-[#2a0810] text-[#ff6b85] border-[#5a1a2a]',
  'A':  'bg-[#2a1a00] text-amber-400 border-[#5a3a00]',
  'B':  'bg-[#001a2a] text-sky-400 border-[#003a5a]',
  'C':  'bg-surface text-text-label border-border',
}

type Props = { conference: Conference; status: Status }

export default function ConferenceCard({ conference: c, status }: Props) {
  return (
    <article className="rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent-muted hover:shadow-lg hover:shadow-black/30">
      <div className="flex items-start gap-4 p-5">
        {/* Date box */}
        <div className="min-w-[60px] rounded-lg border border-border bg-bg px-1 py-2 text-center">
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent">{c.month}</p>
          <p className="font-display text-2xl leading-none text-text-primary">{c.day}</p>
          <p className="mt-0.5 font-mono text-[10px] text-text-label">{c.year}</p>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="font-body font-semibold leading-snug text-text-primary">
            <Link href={`/c/${c.slug}`} className="transition-colors hover:text-accent">
              {c.title}
            </Link>
          </h3>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-label">
            <span>📍 {c.location}</span>
            <span>⏱ Deadline: {c.paperDeadline}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_STYLES[status]}`}>
            {STATUS_LABELS[status]}
          </span>
          {c.rank && (
            <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${RANK_STYLES[c.rank] ?? RANK_STYLES['C']}`}>
              CORE {c.rank}
            </span>
          )}
        </div>
      </div>

      {/* Footer strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-b-xl border-t border-border bg-bg/40 px-5 py-3">
        {[
          { label: 'Paper deadline', value: c.paperDeadline },
          { label: 'Notification', value: c.notificationDate },
          { label: 'Camera ready', value: c.cameraReady },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-label">{label}</p>
            <p className="font-mono text-xs text-text-secondary">{value}</p>
          </div>
        ))}
        <Link
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto self-center font-mono text-xs text-accent hover:underline"
        >
          Details →
        </Link>
      </div>
    </article>
  )
}
