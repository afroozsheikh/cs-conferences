'use client'

import { useState } from 'react'
import type { Conference, Topic } from '@/data/conferences'
import type { Filters } from '@/lib/filter'
import { applyFilters, sortByDeadline } from '@/lib/filter'
import { getStatus } from '@/lib/status'
import FilterBar from '@/components/filter-bar'
import ConferenceCard from '@/components/conference-card'
import Sidebar from '@/components/sidebar'

type Props = { conferences: Conference[] }

const ALL_TOPICS: Topic[] = [
  'Machine Learning',
  'Computer Vision',
  'Health Informatics',
  'NLP',
  'Data Mining & IR',
  'Web & Networks',
  'Security',
  'Software Engineering',
  'Robotics',
  'Cloud Computing',
]

export default function HomeClient({ conferences }: Props) {
  const [filters, setFilters] = useState<Filters>({
    month: 'all',
    rank: 'all',
    topic: 'all',
    search: '',
    hideClosed: true,
  })

  const filtered = sortByDeadline(applyFilters(conferences, filters))

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-8">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            topics={ALL_TOPICS}
          />

          <div>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-display text-2xl text-text-primary">Conference Listings</h2>
              <span className="font-mono text-xs text-text-label">
                {filtered.length} conference{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filtered.length === 0 ? (
              <p className="rounded-xl border border-border bg-surface px-6 py-12 text-center font-mono text-sm text-text-label">
                No conferences match your filters.
              </p>
            ) : (
              <div className="space-y-4">
                {filtered.map((c) => (
                  <ConferenceCard
                    key={c.slug}
                    conference={c}
                    status={getStatus(c.paperDeadline)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Sidebar conferences={conferences} />
      </div>
    </div>
  )
}
