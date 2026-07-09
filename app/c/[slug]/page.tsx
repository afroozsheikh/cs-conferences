import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { conferences } from '@/data/conferences'
import { getStatus } from '@/lib/status'

export function generateStaticParams() {
  return conferences.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = conferences.find((x) => x.slug === slug)
  if (!c) return {}
  return {
    title: `${c.title} — CS Conference Alerts`,
    description: `Paper deadline: ${c.paperDeadline}. ${c.location}.`,
  }
}

const STATUS_LABELS = { open: '● Open', soon: '⏳ Soon', closed: '✕ Closed' } as const
const STATUS_COLORS = {
  open: 'text-emerald-400',
  soon: 'text-amber-400',
  closed: 'text-text-label',
}

export default async function ConferenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = conferences.find((x) => x.slug === slug)
  if (!c) notFound()

  const status = getStatus(c.paperDeadline)

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-text-label transition-colors hover:text-accent"
        >
          ← All conferences
        </Link>

        <div className="mt-8 space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{c.topic}</p>
          <h1 className="font-display text-4xl leading-snug text-text-primary">{c.title}</h1>
          <p className="font-mono text-sm text-text-label">
            {c.location} · {c.month} {c.day}, {c.year}
          </p>
        </div>

        {c.description && (
          <p className="mt-6 leading-relaxed text-text-secondary">{c.description}</p>
        )}

        {/* Key dates */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-5 py-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-label">Key dates</p>
          </div>
          <div className="divide-y divide-border">
            {[
              { label: 'Paper deadline', value: c.paperDeadline },
              { label: 'Notification', value: c.notificationDate },
              { label: 'Camera ready', value: c.cameraReady },
              { label: 'Conference', value: `${c.month} ${c.day}, ${c.year}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between px-5 py-3">
                <span className="font-mono text-xs uppercase tracking-wider text-text-label">{label}</span>
                <span className="font-mono text-xs text-text-secondary">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status + rank */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className={`font-mono text-sm font-bold ${STATUS_COLORS[status]}`}>
            {STATUS_LABELS[status]}
          </span>
          {c.rank && (
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-secondary">
              CORE {c.rank}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex gap-4">
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent bg-accent px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-80"
          >
            Official website →
          </a>
          <Link
            href="/subscribe"
            className="rounded-full border border-border px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-text-label transition-colors hover:border-accent hover:text-accent"
          >
            Get deadline alerts
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
