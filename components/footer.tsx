import Image from 'next/image'
import Link from 'next/link'

const TOPICS = [
  'Machine Learning',
  'Computer Vision',
  'NLP',
  'Security',
  'Software Engineering',
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <Image
            src="/logo.jpg"
            alt="Centre for Applied AI — Macquarie University"
            width={52}
            height={52}
            className="mb-4 rounded-md object-contain"
          />
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
            CS Conference Alerts
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">
            A curated hub by the{' '}
            <strong className="text-text-primary">Centre for Applied AI, Macquarie University</strong>{' '}
            — track upcoming CS conferences, deadlines &amp; calls for papers.
          </p>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-label">
            Quick links
          </p>
          <ul className="space-y-2">
            {[
              { href: '/', label: 'All Conferences' },
              { href: '/subscribe', label: 'Get Email Alerts' },
              { href: '/about', label: 'About' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-label">
            Topics
          </p>
          <ul className="space-y-2">
            {TOPICS.map((t) => (
              <li key={t}>
                <Link
                  href={`/?topic=${encodeURIComponent(t)}`}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl justify-between border-t border-border px-6 py-5 font-mono text-xs text-text-label">
        <span>© 2026 CS Conference Alerts</span>
        <span>Centre for Applied AI · Macquarie University</span>
      </div>
    </footer>
  )
}
