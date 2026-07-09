import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Centre for Applied AI — Macquarie University"
            width={40}
            height={40}
            className="rounded-md object-contain"
          />
          <span className="font-mono text-xs uppercase tracking-widest text-text-label">
            CS Conference Alerts
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: '/', label: 'Conferences' },
            { href: '/about', label: 'About' },
            { href: '/subscribe', label: 'Get alerts' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono text-xs uppercase tracking-widest transition-colors hover:text-accent ${
                label === 'Get alerts' ? 'text-accent' : 'text-text-label'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
