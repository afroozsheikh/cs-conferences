export default function Hero() {
  return (
    <section className="dot-field overflow-hidden bg-bg px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Updated · Jul 2026
        </p>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight text-text-primary md:text-5xl">
          Upcoming computer science{' '}
          <em className="italic text-accent">conferences.</em>
        </h1>
        <p className="mt-6 max-w-2xl font-body text-base text-text-secondary">
          Deadlines, venues, and CORE rankings, curated by the Centre for Applied AI,
          Macquarie University. Subscribe for a reminder two weeks before each deadline.
        </p>
        <div className="mt-8 flex gap-3">
          <a
            href="#listings"
            className="rounded-full border border-accent bg-accent px-5 py-2 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-80"
          >
            Browse now
          </a>
          <a
            href="/subscribe"
            className="rounded-full border border-border px-5 py-2 font-mono text-xs uppercase tracking-widest text-text-label transition-colors hover:border-accent hover:text-accent"
          >
            Get alerts
          </a>
        </div>
      </div>
    </section>
  )
}
