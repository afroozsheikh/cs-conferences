'use client'

import type { Filters } from '@/lib/filter'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const RANKS = ['A*', 'A', 'B'] as const

type Props = {
  filters: Filters
  onChange: (f: Filters) => void
  topics: string[]
}

export default function FilterBar({ filters, onChange, topics }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })

  return (
    <div className="space-y-4" id="listings">
      {/* Topic pills */}
      <div className="flex flex-wrap gap-2">
        {['all', ...topics].map((t) => (
          <button
            key={t}
            onClick={() => set({ topic: t })}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              filters.topic === t
                ? 'border-accent bg-accent text-bg'
                : 'border-border text-text-label hover:border-accent hover:text-accent'
            }`}
          >
            {t === 'all' ? 'All topics' : t}
          </button>
        ))}
      </div>

      {/* Month tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', ...MONTHS].map((m) => (
          <button
            key={m}
            onClick={() => set({ month: m })}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              filters.month === m
                ? 'border-accent-muted bg-accent-muted text-text-primary'
                : 'border-border text-text-label hover:border-accent-muted hover:text-text-secondary'
            }`}
          >
            {m === 'all' ? 'All months' : m}
          </button>
        ))}
      </div>

      {/* Rank + Search + Hide-closed row */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-label">Rank:</span>
        {(['all', ...RANKS] as string[]).map((r) => (
          <button
            key={r}
            onClick={() => set({ rank: r })}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
              filters.rank === r
                ? 'border-accent bg-accent text-bg'
                : 'border-border text-text-label hover:border-accent hover:text-accent'
            }`}
          >
            {r === 'all' ? 'All' : `CORE ${r}`}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-3">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="Search…"
            className="w-48 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-primary outline-none placeholder:text-text-label focus:border-accent"
          />
          <label className="flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-label">
            <input
              type="checkbox"
              checked={filters.hideClosed}
              onChange={(e) => set({ hideClosed: e.target.checked })}
              className="accent-accent"
            />
            Hide closed
          </label>
        </div>
      </div>
    </div>
  )
}
