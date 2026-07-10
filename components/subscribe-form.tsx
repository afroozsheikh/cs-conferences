'use client'

import { useState } from 'react'
import { TOPICS } from '../data/conferences'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [errors, setErrors] = useState<{ email?: string; categories?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  function toggle(topic: string) {
    setCategories((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    )
  }

  function validate() {
    const e: typeof errors = {}
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Please enter a valid email address.'
    }
    if (categories.length === 0) {
      e.categories = 'Pick at least one category.'
    }
    return e
  }

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-accent-muted bg-surface px-8 py-10 text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Noted!</p>
        <p className="text-sm text-text-secondary">
          Signups open in the next release. We&rsquo;ll send a reminder two weeks before each deadline
          for your selected categories.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-lg space-y-6">
      <div>
        <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-label">
          Your email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@university.edu"
          className="w-full rounded-lg border border-border bg-bg px-4 py-3 font-body text-sm text-text-primary outline-none placeholder:text-text-label focus:border-accent"
        />
        {errors.email && (
          <p className="mt-1 font-mono text-xs text-accent">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-label">
          Notify me about
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategories(categories.length === TOPICS.length ? [] : [...TOPICS])}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              categories.length === TOPICS.length
                ? 'border-accent bg-accent text-bg'
                : 'border-border text-text-label hover:border-accent hover:text-accent'
            }`}
          >
            All conferences
          </button>
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggle(t)}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                categories.includes(t)
                  ? 'border-accent-muted bg-accent-muted text-text-primary'
                  : 'border-border text-text-label hover:border-accent hover:text-accent'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.categories && (
          <p className="mt-2 font-mono text-xs text-accent">{errors.categories}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-full border border-accent bg-accent py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-80"
      >
        Notify me
      </button>
    </form>
  )
}
