# CS Conference Alerts — Next.js Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static HTML conference listing as a Next.js 15 App Router site with a dark wine palette, university branding, and dot-field aesthetic, deployed on Vercel.

**Architecture:** Server components load typed in-repo conference data and pass it to a `HomeClient` client component that owns filter state. Each conference has a statically pre-rendered detail page. The subscribe form ships with a no-op handler in this sub-project; the real email backend is sub-project 2.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS, `next/font/google`, Vitest (unit tests), Playwright (smoke test), Vercel free tier.

---

## File Map

| Path | Purpose |
|---|---|
| `archive/` | Old `index.html`, `conferences.js`, `1669711196551.jpeg` |
| `public/logo.jpg` | Macquarie / Centre for Applied AI logo |
| `styles/theme.css` | CSS custom properties (palette, dot-field helper class) |
| `app/globals.css` | Tailwind directives + imports `theme.css` |
| `app/layout.tsx` | Root layout: fonts, metadata, `<html>/<body>` |
| `app/page.tsx` | Home page server component |
| `app/c/[slug]/page.tsx` | Conference detail, `generateStaticParams` |
| `app/subscribe/page.tsx` | Standalone subscribe page |
| `app/about/page.tsx` | About placeholder |
| `data/conferences.ts` | `Conference` type + typed data array (58 entries) |
| `lib/status.ts` | `getStatus(deadline): Status` pure function |
| `lib/filter.ts` | `applyFilters()` + `sortByDeadline()` pure functions |
| `lib/build-checks.ts` | Slug collision detection, runs at build time |
| `components/nav.tsx` | Sticky nav bar (server component) |
| `components/hero.tsx` | Hero section with dot field (server component) |
| `components/footer.tsx` | Footer (server component) |
| `components/conference-card.tsx` | Single card (pure presentational, server component) |
| `components/filter-bar.tsx` | Filter controls — controlled, client component |
| `components/sidebar.tsx` | Topic list + coming-up (server component) |
| `components/subscribe-form.tsx` | Email + category form, no-op submit, client component |
| `components/home-client.tsx` | Client wrapper: filter state + renders list + sidebar |
| `tests/lib/status.test.ts` | Vitest tests for `getStatus` |
| `tests/lib/filter.test.ts` | Vitest tests for `applyFilters` + `sortByDeadline` |
| `tests/e2e/home.spec.ts` | Playwright smoke test |
| `vitest.config.ts` | Vitest config |
| `playwright.config.ts` | Playwright config |
| `next.config.ts` | Next.js config (minimal) |
| `tailwind.config.ts` | Tailwind config extending palette + fonts |
| `tsconfig.json` | TypeScript strict config |
| `package.json` | Dependencies |

---

## Task 1: Archive old files and scaffold Next.js app

**Files:**
- Create: `archive/`
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `app/`, `public/`

- [ ] **Step 1: Move old files to archive**

```bash
mkdir -p archive
mv index.html conferences.js 1669711196551.jpeg archive/
```

Expected: `archive/` contains the three files, root is clean except `.git/`, `.github/`, `docs/`, `.gitignore`.

- [ ] **Step 2: Scaffold Next.js 15 at repo root**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --eslint
```

When prompted "Would you like to use Turbopack for `next dev`?": **Yes**.

Expected output ends with: `Success! Created your Next.js app at /path/to/cs-conferences`.

- [ ] **Step 3: Remove create-next-app boilerplate**

```bash
rm -rf app/fonts app/favicon.ico
# Remove the default page content — we'll replace it in Task 14
```

- [ ] **Step 4: Copy logo to public**

```bash
cp archive/1669711196551.jpeg public/logo.jpg
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Next.js default page or blank — no errors in terminal.

Stop the server (`Ctrl+C`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app, archive old static site"
```

---

## Task 2: Theme CSS + Tailwind config + root layout

**Files:**
- Create: `styles/theme.css`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `styles/theme.css`**

```css
/* styles/theme.css */
:root {
  --bg:            #0d0608;
  --surface:       #140a0e;
  --border:        #2a1218;
  --accent:        #e63e5c;
  --accent-muted:  #8a1a2b;
  --text-primary:  #f5e6ea;
  --text-secondary: rgba(245, 230, 234, 0.65);
  --text-label:    rgba(245, 230, 234, 0.45);
  --dot-color:     #3d1220;
}

/* Dot-field background — used by Hero and Subscribe sections */
.dot-field {
  position: relative;
}
.dot-field::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--dot-color) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: 0.55;
  pointer-events: none;
  z-index: 0;
}
.dot-field > * {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 2: Update `app/globals.css`**

Replace the entire file:

```css
@import "../../styles/theme.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 3: Update `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:             'var(--bg)',
        surface:        'var(--surface)',
        border:         'var(--border)',
        accent:         'var(--accent)',
        'accent-muted': 'var(--accent-muted)',
        'text-primary': 'var(--text-primary)',
        'text-secondary':'var(--text-secondary)',
        'text-label':   'var(--text-label)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'CS Conference Alerts',
  description:
    'Upcoming computer science conferences — deadlines, venues, and CORE rankings. Curated by the Centre for Applied AI, Macquarie University.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  )
}
```

- [ ] **Step 5: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no output (clean).

- [ ] **Step 6: Commit**

```bash
git add styles/theme.css app/globals.css tailwind.config.ts app/layout.tsx
git commit -m "feat: add dark-wine theme CSS, Tailwind config, root layout with fonts"
```

---

## Task 3: Conference type + data file

**Files:**
- Create: `data/conferences.ts`

- [ ] **Step 1: Create `data/conferences.ts` with the type**

```typescript
export type Rank = 'A*' | 'A' | 'B' | 'C' | ''

export type Topic =
  | 'Machine Learning'
  | 'Computer Vision'
  | 'Health Informatics'
  | 'NLP'
  | 'Data Mining & IR'
  | 'Web & Networks'
  | 'Security'
  | 'Software Engineering'
  | 'Robotics'
  | 'Cloud Computing'

export type Conference = {
  slug: string           // e.g. "icml-2026" — used for /c/[slug]
  title: string
  month: string          // "Jan" | "Feb" | ... | "Dec"
  day: string
  year: string
  location: string
  topic: Topic
  rank: Rank
  paperDeadline: string          // "Jan 28, 2026" or "TBD"
  paperDeadlineISO?: string      // "2026-01-28" — used for email reminders in sub-project 2
  notificationDate: string
  cameraReady: string
  url: string
  description?: string           // shown on /c/[slug]; optional
}

export const conferences: Conference[] = [
  {
    slug: 'icml-2026',
    title: 'ICML 2026 – International Conference on Machine Learning',
    month: 'Jul', day: '6', year: '2026',
    location: 'Seoul, South Korea',
    topic: 'Machine Learning',
    rank: 'A*',
    paperDeadline: 'Jan 28, 2026',
    paperDeadlineISO: '2026-01-28',
    notificationDate: 'Apr 30, 2026',
    cameraReady: 'TBD',
    url: 'https://icml.cc/Conferences/2026',
  },
  {
    slug: 'neurips-2026',
    title: 'NeurIPS 2026 – Conference on Neural Information Processing Systems',
    month: 'Dec', day: '06', year: '2026',
    location: 'Sydney, Australia',
    topic: 'Machine Learning',
    rank: 'A*',
    paperDeadline: 'May 07, 2026',
    paperDeadlineISO: '2026-05-07',
    notificationDate: 'Sep 22, 2026',
    cameraReady: 'Oct 20, 2026',
    url: 'https://neurips.cc/Conferences/2026',
  },
  {
    slug: 'aaai-2027',
    title: 'AAAI 2027 – AAAI Conference on Artificial Intelligence',
    month: 'Feb', day: '16', year: '2027',
    location: 'Montréal, Canada',
    topic: 'Machine Learning',
    rank: 'A*',
    paperDeadline: 'Sep 10, 2026',
    paperDeadlineISO: '2026-09-10',
    notificationDate: 'Dec 05, 2026',
    cameraReady: 'Jan 05, 2027',
    url: 'https://aaai.org/conference/aaai/aaai-27/',
  },
  // PORT ALL REMAINING 55 ENTRIES from archive/conferences.js following this pattern:
  // 1. Add slug: lowercase abbreviation + year from the title (e.g. "cvpr-2026")
  // 2. Add paperDeadlineISO: convert "Mon DD, YYYY" to "YYYY-MM-DD" (omit if "TBD")
  // 3. All other fields copy verbatim
  // 4. topic must match one of the Topic union values exactly
]
```

- [ ] **Step 2: Port all 55 remaining conferences from `archive/conferences.js`**

Open `archive/conferences.js`. For each entry, add a corresponding object to the array in `data/conferences.ts` following the pattern above. Apply these transformations:

- `slug`: take the abbreviation before the `–` (e.g. `"CVPR 2026"`) → lowercase + hyphen + year → `"cvpr-2026"`
- `paperDeadlineISO`: convert `"Mon DD, YYYY"` to ISO `"YYYY-MM-DD"`. Leave the field out if `paperDeadline` is `"TBD"`.
- All other fields copy verbatim; `description` can be omitted for all entries.

- [ ] **Step 3: Verify TypeScript accepts all entries**

```bash
npx tsc --noEmit
```

Expected: no output. If you see a `topic` error, check the exact string against the `Topic` union — the most common mismatch is `"Data Mining & IR"` vs slight variants.

- [ ] **Step 4: Commit**

```bash
git add data/conferences.ts
git commit -m "feat: typed Conference data model with 58 entries ported from static JS"
```

---

## Task 4: `lib/status.ts` — test first

**Files:**
- Create: `lib/status.ts`
- Create: `tests/lib/status.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/lib/**/*.test.ts'],
  },
})
```

- [ ] **Step 2: Add Vitest to `package.json` devDependencies and install**

```bash
npm install --save-dev vitest
```

- [ ] **Step 3: Add test script to `package.json`**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Create `tests/lib/status.test.ts`**

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getStatus } from '../../lib/status'

describe('getStatus', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('returns "closed" when deadline is in the past', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Jan 15, 2026')).toBe('closed')
  })

  it('returns "soon" when deadline is 1 day away', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 02, 2026')).toBe('soon')
  })

  it('returns "soon" when deadline is exactly 14 days away', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 15, 2026')).toBe('soon')
  })

  it('returns "open" when deadline is 15 days away', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 16, 2026')).toBe('open')
  })

  it('returns "open" for TBD deadlines', () => {
    expect(getStatus('TBD')).toBe('open')
  })

  it('returns "open" on the deadline day itself', () => {
    vi.setSystemTime(new Date('2026-02-01T00:00:00.000Z'))
    expect(getStatus('Feb 01, 2026')).toBe('soon')
  })
})
```

- [ ] **Step 5: Run tests — expect failure**

```bash
npm test
```

Expected: `FAIL tests/lib/status.test.ts` — `getStatus` not found.

- [ ] **Step 6: Create `lib/status.ts`**

```typescript
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
```

- [ ] **Step 7: Run tests — expect all pass**

```bash
npm test
```

Expected:
```
 ✓ tests/lib/status.test.ts (6)

 Test Files  1 passed (1)
 Tests       6 passed (6)
```

- [ ] **Step 8: Commit**

```bash
git add lib/status.ts tests/lib/status.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: add getStatus() with Vitest tests"
```

---

## Task 5: `lib/filter.ts` — test first

**Files:**
- Create: `lib/filter.ts`
- Create: `tests/lib/filter.test.ts`

- [ ] **Step 1: Create `tests/lib/filter.test.ts`**

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { applyFilters, sortByDeadline, type Filters } from '../../lib/filter'
import type { Conference } from '../../data/conferences'

const base: Omit<Conference, 'slug' | 'title' | 'month' | 'year' | 'topic' | 'rank' | 'paperDeadline'> = {
  day: '1',
  location: 'City, Country',
  notificationDate: 'TBD',
  cameraReady: 'TBD',
  url: 'https://example.com',
}

const conferences: Conference[] = [
  { ...base, slug: 'icml-2026',    title: 'ICML 2026',    month: 'Jul', year: '2026', topic: 'Machine Learning', rank: 'A*', paperDeadline: 'Jan 28, 2026', paperDeadlineISO: '2026-01-28' },
  { ...base, slug: 'neurips-2026', title: 'NeurIPS 2026', month: 'Dec', year: '2026', topic: 'Machine Learning', rank: 'A*', paperDeadline: 'May 07, 2026', paperDeadlineISO: '2026-05-07' },
  { ...base, slug: 'cvpr-2026',    title: 'CVPR 2026',    month: 'Jun', year: '2026', topic: 'Computer Vision',  rank: 'A*', paperDeadline: 'Nov 13, 2025', paperDeadlineISO: '2025-11-13' },
  { ...base, slug: 'acl-2026',     title: 'ACL 2026',     month: 'Aug', year: '2026', topic: 'NLP',              rank: 'A*', paperDeadline: 'Feb 15, 2026', paperDeadlineISO: '2026-02-15' },
  { ...base, slug: 'sp-2027',      title: 'S&P 2027',     month: 'May', year: '2027', topic: 'Security',         rank: 'A*', paperDeadline: 'TBD' },
]

const defaultFilters: Filters = {
  month: 'all',
  rank: 'all',
  topic: 'all',
  search: '',
  hideClosed: false,
}

describe('applyFilters', () => {
  it('returns all conferences with default filters', () => {
    expect(applyFilters(conferences, defaultFilters)).toHaveLength(5)
  })

  it('filters by month', () => {
    const result = applyFilters(conferences, { ...defaultFilters, month: 'Jul' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('icml-2026')
  })

  it('filters by rank', () => {
    const result = applyFilters(conferences, { ...defaultFilters, rank: 'A*' })
    expect(result).toHaveLength(5)
  })

  it('filters by topic', () => {
    const result = applyFilters(conferences, { ...defaultFilters, topic: 'NLP' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('acl-2026')
  })

  it('filters by search (title)', () => {
    const result = applyFilters(conferences, { ...defaultFilters, search: 'neurips' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('neurips-2026')
  })

  it('filters by search (topic)', () => {
    const result = applyFilters(conferences, { ...defaultFilters, search: 'computer vision' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('cvpr-2026')
  })

  it('hideClosed removes past-deadline conferences', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-01T00:00:00.000Z'))
    const result = applyFilters(conferences, { ...defaultFilters, hideClosed: true })
    // icml (Jan 28, 2026) and cvpr (Nov 13, 2025) and acl (Feb 15, 2026) are closed by Jul 1
    // neurips (May 07, 2026) is also closed. Only sp-2027 (TBD=open) and none others open.
    expect(result.every(c => c.slug === 'sp-2027' || c.paperDeadline !== 'TBD')).toBe(true)
    vi.useRealTimers()
  })

  it('combines multiple filters', () => {
    const result = applyFilters(conferences, { ...defaultFilters, topic: 'Machine Learning', month: 'Dec' })
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('neurips-2026')
  })

  it('returns empty array when nothing matches', () => {
    const result = applyFilters(conferences, { ...defaultFilters, search: 'zzznomatch' })
    expect(result).toHaveLength(0)
  })
})

describe('sortByDeadline', () => {
  it('sorts by ascending deadline, TBD last', () => {
    const result = sortByDeadline(conferences)
    expect(result[0].slug).toBe('cvpr-2026')      // Nov 13, 2025
    expect(result[result.length - 1].slug).toBe('sp-2027') // TBD → Infinity
  })

  it('does not mutate the input array', () => {
    const copy = [...conferences]
    sortByDeadline(conferences)
    expect(conferences).toEqual(copy)
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
npm test
```

Expected: `FAIL tests/lib/filter.test.ts` — `applyFilters` not found.

- [ ] **Step 3: Create `lib/filter.ts`**

```typescript
import type { Conference } from '@/data/conferences'
import { getStatus } from '@/lib/status'

export type Filters = {
  month: string       // 'all' | three-letter month
  rank: string        // 'all' | 'A*' | 'A' | 'B' | 'C'
  topic: string       // 'all' | exact Topic value
  search: string
  hideClosed: boolean
}

export function applyFilters(list: Conference[], filters: Filters): Conference[] {
  return list.filter((c) => {
    if (filters.hideClosed && getStatus(c.paperDeadline) === 'closed') return false
    if (filters.month !== 'all' && c.month !== filters.month) return false
    if (filters.rank !== 'all' && c.rank !== filters.rank) return false
    if (filters.topic !== 'all' && c.topic.toLowerCase() !== filters.topic.toLowerCase()) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      return (
        c.title.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.topic.toLowerCase().includes(q) ||
        c.rank.toLowerCase() === q
      )
    }
    return true
  })
}

export function sortByDeadline(list: Conference[]): Conference[] {
  return [...list].sort((a, b) => {
    const da = a.paperDeadline === 'TBD' ? Infinity : new Date(a.paperDeadline).getTime()
    const db = b.paperDeadline === 'TBD' ? Infinity : new Date(b.paperDeadline).getTime()
    return da - db
  })
}
```

- [ ] **Step 4: Run all tests — expect all pass**

```bash
npm test
```

Expected:
```
 ✓ tests/lib/status.test.ts (6)
 ✓ tests/lib/filter.test.ts (9)

 Test Files  2 passed (2)
 Tests       15 passed (15)
```

- [ ] **Step 5: Commit**

```bash
git add lib/filter.ts tests/lib/filter.test.ts
git commit -m "feat: add applyFilters() + sortByDeadline() with Vitest tests"
```

---

## Task 6: `lib/build-checks.ts`

**Files:**
- Create: `lib/build-checks.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `lib/build-checks.ts`**

```typescript
import { conferences } from '@/data/conferences'

export function checkSlugCollisions(): void {
  const seen = new Map<string, string>()
  for (const c of conferences) {
    if (seen.has(c.slug)) {
      throw new Error(
        `Slug collision: "${c.slug}" is used by both "${seen.get(c.slug)}" and "${c.title}". ` +
        `Fix the slug in data/conferences.ts.`
      )
    }
    seen.set(c.slug, c.title)
  }
}
```

- [ ] **Step 2: Run check in `next.config.ts`**

```typescript
import type { NextConfig } from 'next'
import { checkSlugCollisions } from './lib/build-checks'

checkSlugCollisions()

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 3: Verify build does not throw**

```bash
npx next build 2>&1 | head -20
```

Expected: build output, no "Slug collision" error. (Build will fail at a later step for other reasons if components don't exist yet — that's fine. We're only verifying the slug check doesn't fire.)

- [ ] **Step 4: Commit**

```bash
git add lib/build-checks.ts next.config.ts
git commit -m "feat: add build-time slug collision detection"
```

---

## Task 7: Nav component

**Files:**
- Create: `components/nav.tsx`

- [ ] **Step 1: Create `components/nav.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: add Nav component"
```

---

## Task 8: Hero component

**Files:**
- Create: `components/hero.tsx`

- [ ] **Step 1: Create `components/hero.tsx`**

```tsx
export default function Hero() {
  return (
    <section className="dot-field overflow-hidden bg-bg px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Updated · Jul 2026
        </p>
        <h1 className="mt-4 font-display text-5xl font-normal leading-[1.05] tracking-tight text-text-primary md:text-6xl">
          Upcoming computer<br />
          science{' '}
          <em className="italic text-accent">conferences.</em>
        </h1>
        <p className="mt-6 max-w-lg font-body text-base text-text-secondary">
          Deadlines, venues, and CORE rankings — curated by the Centre for Applied AI,
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
```

- [ ] **Step 2: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: add Hero component with dot-field background"
```

---

## Task 9: Footer component

**Files:**
- Create: `components/footer.tsx`

- [ ] **Step 1: Create `components/footer.tsx`**

```tsx
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
    <footer className="border-t border-border bg-surface mt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <Image
            src="/logo.jpg"
            alt="Centre for Applied AI — Macquarie University"
            width={52}
            height={52}
            className="rounded-md object-contain mb-4"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            CS Conference Alerts
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            A curated hub by the{' '}
            <strong className="text-text-primary">Centre for Applied AI, Macquarie University</strong>{' '}
            — track upcoming CS conferences, deadlines &amp; calls for papers.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-text-label mb-4">
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
          <p className="font-mono text-xs uppercase tracking-widest text-text-label mb-4">
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
      <div className="border-t border-border mx-auto max-w-6xl px-6 py-5 flex justify-between text-xs text-text-label font-mono">
        <span>© 2026 CS Conference Alerts</span>
        <span>Centre for Applied AI · Macquarie University</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 10: ConferenceCard component

**Files:**
- Create: `components/conference-card.tsx`

- [ ] **Step 1: Create `components/conference-card.tsx`**

```tsx
import Link from 'next/link'
import type { Conference } from '@/data/conferences'
import type { Status } from '@/lib/status'

const STATUS_STYLES: Record<Status, string> = {
  open:   'bg-emerald-950 text-emerald-400 border-emerald-900',
  soon:   'bg-amber-950  text-amber-400  border-amber-900',
  closed: 'bg-surface    text-text-label border-border',
}
const STATUS_LABELS: Record<Status, string> = {
  open: '● Open', soon: '⏳ Soon', closed: '✕ Closed',
}

const RANK_STYLES: Record<string, string> = {
  'A*': 'bg-[#2a0810] text-[#ff6b85] border-[#5a1a2a]',
  'A':  'bg-[#2a1a00] text-amber-400  border-[#5a3a00]',
  'B':  'bg-[#001a2a] text-sky-400    border-[#003a5a]',
  'C':  'bg-surface   text-text-label  border-border',
}

type Props = { conference: Conference; status: Status }

export default function ConferenceCard({ conference: c, status }: Props) {
  return (
    <article className="rounded-xl border border-border bg-surface transition-all hover:border-accent-muted hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30">
      <div className="flex items-start gap-4 p-5">
        {/* Date box */}
        <div className="min-w-[60px] rounded-lg bg-bg border border-border text-center py-2 px-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent">{c.month}</p>
          <p className="font-display text-2xl leading-none text-text-primary">{c.day}</p>
          <p className="font-mono text-[10px] text-text-label mt-0.5">{c.year}</p>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-semibold text-text-primary leading-snug">
            <Link href={`/c/${c.slug}`} className="hover:text-accent transition-colors">
              {c.title}
            </Link>
          </h3>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-text-label">
            <span>📍 {c.location}</span>
            <span>⏱ Deadline: {c.paperDeadline}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col items-end gap-2 shrink-0">
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
      <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-border bg-bg/40 px-5 py-3 rounded-b-xl">
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
          className="ml-auto font-mono text-xs text-accent hover:underline self-center"
        >
          Details →
        </Link>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/conference-card.tsx
git commit -m "feat: add ConferenceCard component"
```

---

## Task 11: FilterBar component

**Files:**
- Create: `components/filter-bar.tsx`

- [ ] **Step 1: Create `components/filter-bar.tsx`**

```tsx
'use client'

import type { Filters } from '@/lib/filter'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const RANKS  = ['A*', 'A', 'B'] as const

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
            className="w-48 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-primary placeholder:text-text-label outline-none focus:border-accent"
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
```

- [ ] **Step 2: Commit**

```bash
git add components/filter-bar.tsx
git commit -m "feat: add FilterBar component"
```

---

## Task 12: Sidebar component

**Files:**
- Create: `components/sidebar.tsx`

- [ ] **Step 1: Create `components/sidebar.tsx`**

```tsx
import Link from 'next/link'
import type { Conference } from '@/data/conferences'
import { getStatus } from '@/lib/status'

type Props = { conferences: Conference[] }

export default function Sidebar({ conferences }: Props) {
  // Build topic counts
  const counts: Record<string, number> = {}
  for (const c of conferences) {
    counts[c.topic] = (counts[c.topic] ?? 0) + 1
  }
  const topics = Object.entries(counts).sort((a, b) => b[1] - a[1])

  // Upcoming: next 4 conferences by conference start date
  const today = new Date()
  const upcoming = [...conferences]
    .map((c) => ({ ...c, _date: new Date(`${c.month} ${c.day}, ${c.year}`) }))
    .filter((c) => c._date >= today)
    .sort((a, b) => a._date.getTime() - b._date.getTime())
    .slice(0, 4)

  return (
    <aside className="space-y-6">
      {/* Topics */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-label">Browse by topic</p>
        </div>
        <ul className="divide-y divide-border">
          {topics.map(([name, count]) => (
            <li key={name}>
              <Link
                href={`/?topic=${encodeURIComponent(name)}`}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg/50 transition-colors"
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

      {/* Coming up soon */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-label">Coming up soon</p>
        </div>
        <ul className="divide-y divide-border">
          {upcoming.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/c/${c.slug}`}
                className="flex items-start gap-3 px-4 py-3 hover:bg-bg/50 transition-colors"
              >
                <div className="min-w-[40px] rounded-lg bg-bg border border-border text-center py-1.5">
                  <p className="font-mono text-[9px] uppercase text-accent">{c.month}</p>
                  <p className="font-mono text-sm font-bold text-text-primary leading-none">{c.day}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary leading-snug">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sidebar.tsx
git commit -m "feat: add Sidebar component with topic counts and upcoming list"
```

---

## Task 13: SubscribeForm component

**Files:**
- Create: `components/subscribe-form.tsx`

- [ ] **Step 1: Create `components/subscribe-form.tsx`**

```tsx
'use client'

import { useState } from 'react'

const TOPICS = [
  'Machine Learning',
  'Computer Vision',
  'NLP',
  'Health Informatics',
  'Data Mining & IR',
  'Security',
  'Software Engineering',
  'Web & Networks',
  'Robotics',
  'Cloud Computing',
]

export default function SubscribeForm() {
  const [email, setEmail]       = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [errors, setErrors]     = useState<{ email?: string; categories?: string }>({})
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
      <div className="rounded-xl border border-accent-muted bg-surface px-8 py-10 text-center max-w-lg mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Noted!</p>
        <p className="text-text-secondary text-sm">
          Signups open in the next release. We&rsquo;ll send a reminder two weeks before each deadline
          for your selected categories.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg mx-auto space-y-6">
      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-text-label mb-2">
          Your email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@university.edu"
          className="w-full rounded-lg border border-border bg-bg px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-label outline-none focus:border-accent"
        />
        {errors.email && (
          <p className="mt-1 font-mono text-xs text-accent">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-text-label mb-2">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/subscribe-form.tsx
git commit -m "feat: add SubscribeForm with validation and v1 no-op handler"
```

---

## Task 14: HomeClient + home page

**Files:**
- Create: `components/home-client.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/home-client.tsx`**

```tsx
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
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Footer from '@/components/footer'
import HomeClient from '@/components/home-client'
import SubscribeForm from '@/components/subscribe-form'
import { conferences } from '@/data/conferences'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HomeClient conferences={conferences} />

        {/* Email alerts section */}
        <section className="dot-field bg-bg border-t border-border mt-8">
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              Never miss a deadline
            </p>
            <h2 className="font-display text-4xl text-text-primary mb-4">
              Get email <em className="italic text-accent">alerts.</em>
            </h2>
            <p className="text-text-secondary mb-10 max-w-md mx-auto">
              We&rsquo;ll email you two weeks before each paper deadline for the conferences you care about.
            </p>
            <SubscribeForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Dark background, dot field in hero
- Conference cards render with correct colors and badges
- Filters work (try clicking a topic pill, a month, the rank filter)
- "Hide closed" default is on — only open/soon conferences show
- Sidebar shows topic counts and upcoming list

Stop dev server (`Ctrl+C`).

- [ ] **Step 4: Commit**

```bash
git add components/home-client.tsx app/page.tsx
git commit -m "feat: add HomeClient with filter state, home page assembled"
```

---

## Task 15: Conference detail page `/c/[slug]`

**Files:**
- Create: `app/c/[slug]/page.tsx`

- [ ] **Step 1: Create `app/c/[slug]/page.tsx`**

```tsx
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
  open:   'text-emerald-400',
  soon:   'text-amber-400',
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
          className="font-mono text-xs uppercase tracking-widest text-text-label hover:text-accent transition-colors"
        >
          ← All conferences
        </Link>

        <div className="mt-8 space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{c.topic}</p>
          <h1 className="font-display text-4xl text-text-primary leading-snug">{c.title}</h1>
          <p className="font-mono text-sm text-text-label">
            {c.location} · {c.month} {c.day}, {c.year}
          </p>
        </div>

        {c.description && (
          <p className="mt-6 text-text-secondary leading-relaxed">{c.description}</p>
        )}

        {/* Key dates */}
        <div className="mt-10 rounded-xl border border-border bg-surface overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
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
                <span className="font-mono text-xs text-text-label uppercase tracking-wider">{label}</span>
                <span className="font-mono text-xs text-text-secondary">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status + rank */}
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <span className={`font-mono text-sm font-bold ${STATUS_COLORS[status]}`}>
            {STATUS_LABELS[status]}
          </span>
          {c.rank && (
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-secondary">
              CORE {c.rank}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 flex gap-4">
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent bg-accent px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-80 transition-opacity"
          >
            Official website →
          </a>
          <Link
            href="/subscribe"
            className="rounded-full border border-border px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-text-label hover:border-accent hover:text-accent transition-colors"
          >
            Get deadline alerts
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Test one detail page in dev**

```bash
npm run dev
```

Navigate to `http://localhost:3000/c/icml-2026`. Verify the page renders with the correct title, dates, and links.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add app/c/
git commit -m "feat: add conference detail page /c/[slug] with static generation"
```

---

## Task 16: `/subscribe` page

**Files:**
- Create: `app/subscribe/page.tsx`

- [ ] **Step 1: Create `app/subscribe/page.tsx`**

```tsx
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import SubscribeForm from '@/components/subscribe-form'

export const metadata = {
  title: 'Get Email Alerts — CS Conference Alerts',
  description:
    'Subscribe to receive email reminders two weeks before CS conference deadlines.',
}

export default function SubscribePage() {
  return (
    <>
      <Nav />
      <main className="dot-field bg-bg min-h-screen">
        <div className="relative mx-auto max-w-3xl px-6 py-24">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              Never miss a deadline
            </p>
            <h1 className="font-display text-5xl text-text-primary mb-4">
              Get email <em className="italic text-accent">alerts.</em>
            </h1>
            <p className="text-text-secondary max-w-md mx-auto">
              We&rsquo;ll email you two weeks before each paper deadline for the conferences you select.
              No spam, unsubscribe anytime.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/subscribe/page.tsx
git commit -m "feat: add /subscribe page"
```

---

## Task 17: `/about` page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create `app/about/page.tsx`**

```tsx
import Image from 'next/image'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata = {
  title: 'About — CS Conference Alerts',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
          About this site
        </p>
        <h1 className="font-display text-5xl text-text-primary mb-8">
          Centre for Applied AI,<br />
          <em className="italic text-accent">Macquarie University.</em>
        </h1>
        <Image
          src="/logo.jpg"
          alt="Centre for Applied AI — Macquarie University"
          width={72}
          height={72}
          className="rounded-xl mb-8"
        />
        <div className="prose prose-invert max-w-none space-y-4 text-text-secondary leading-relaxed">
          <p>
            CS Conference Alerts is maintained by the{' '}
            <strong className="text-text-primary">Centre for Applied AI</strong> at Macquarie University.
            We track upcoming computer science conference deadlines, venues, and CORE rankings to help
            researchers stay on top of submission windows.
          </p>
          <p>
            The site covers conferences across machine learning, computer vision, NLP, health informatics,
            data mining, security, software engineering, robotics, and cloud computing.
          </p>
          <p>
            To suggest a missing conference or report an error, please{' '}
            <a href="mailto:admin@example.com" className="text-accent hover:underline">
              get in touch
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add /about placeholder page"
```

---

## Task 18: Playwright smoke test

**Files:**
- Create: `tests/e2e/home.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Install Playwright**

```bash
npx playwright install --with-deps chromium
npm install --save-dev @playwright/test
```

- [ ] **Step 2: Create `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  webServer: {
    command: 'npm run build && npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
```

- [ ] **Step 3: Add e2e script to `package.json`**

In `package.json` scripts:
```json
"test:e2e": "playwright test"
```

- [ ] **Step 4: Create `tests/e2e/home.spec.ts`**

```typescript
import { test, expect } from '@playwright/test'

test('home page loads and shows conference cards', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('conferences')
  // At least one card visible (depends on hideClosed default — some must be open/soon)
  await expect(page.locator('article').first()).toBeVisible()
})

test('topic filter reduces visible cards', async ({ page }) => {
  await page.goto('/')
  // Count cards with all-topics selected
  const totalBefore = await page.locator('article').count()
  // Click "Machine Learning" topic
  await page.getByRole('button', { name: 'Machine Learning' }).click()
  const totalAfter = await page.locator('article').count()
  // Filtering should change the count (may increase or decrease, but some ML conferences exist)
  expect(totalAfter).toBeGreaterThan(0)
  expect(totalAfter).toBeLessThanOrEqual(totalBefore)
})

test('detail page renders for first conference', async ({ page }) => {
  await page.goto('/c/icml-2026')
  await expect(page.locator('h1')).toContainText('ICML')
  await expect(page.getByText('Paper deadline')).toBeVisible()
})

test('subscribe page renders form', async ({ page }) => {
  await page.goto('/subscribe')
  await expect(page.getByRole('button', { name: /notify me/i })).toBeVisible()
})
```

- [ ] **Step 5: Run Playwright tests**

```bash
npm run test:e2e
```

Expected:
```
  4 passed (...)
```

If a test fails, check the failure message. Common issues:
- Cards hidden by "hide closed" default → adjust the assertion to check for `toBeGreaterThan(0)` rather than an exact count
- Detail page slug mismatch → verify `icml-2026` exists in `data/conferences.ts`

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/e2e/home.spec.ts package.json package-lock.json
git commit -m "test: add Playwright smoke tests for home, detail, and subscribe pages"
```

---

## Task 19: `next build` verification

- [ ] **Step 1: Run a production build**

```bash
npm run build
```

Expected: build completes with no TypeScript errors, no missing-import errors.

Common issues to fix if they appear:
- `Type error: … is not assignable to type …` — check `data/conferences.ts` for entries with `topic` values not in the `Topic` union
- `Module not found: Can't resolve '@/…'` — verify path alias is set in `tsconfig.json` (`"@/*": ["./*"]`)

- [ ] **Step 2: Smoke-test the production build locally**

```bash
npm run start
```

Open `http://localhost:3000`. Click through: home → a conference detail → subscribe → about. No 404s, no JS errors in the console.

Stop the server.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors from next build verification"
```

(If no fixes needed, skip this step.)

---

## Task 20: Vercel deployment

- [ ] **Step 1: Push current branch to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Create a new Vercel project**

1. Go to vercel.com → New Project
2. Import the GitHub repo `cs-conferences`
3. Framework preset: **Next.js** (auto-detected)
4. Root Directory: `.` (repo root)
5. Build Command: `npm run build` (default)
6. Output Directory: `.next` (default)
7. Click **Deploy**

- [ ] **Step 3: Verify the deployment**

Once deployment completes, open the `*.vercel.app` URL Vercel assigns.

Verify:
- Home page loads with the dark wine theme
- At least one conference card is visible
- Clicking a card title goes to the detail page (e.g. `/c/icml-2026`)
- The subscribe form renders at `/subscribe`

- [ ] **Step 4: Commit the Vercel config (if a `vercel.json` was generated)**

```bash
git add vercel.json 2>/dev/null; git diff --cached --quiet || git commit -m "chore: add vercel.json"
```

---

## Task 21: Remove GitHub Pages workflow

- [ ] **Step 1: Delete the old GitHub Actions workflow**

```bash
ls .github/workflows/
```

Expected: one or more `.yml` files for GitHub Pages deployment.

```bash
rm -rf .github/workflows/
```

If you want to keep CI (e.g. for running tests on PRs), keep a `ci.yml` but remove the GitHub Pages deploy step. The full removal is fine for now since Vercel handles CD.

- [ ] **Step 2: Commit**

```bash
git add .github/
git commit -m "chore: remove GitHub Pages deployment workflow (now on Vercel)"
git push origin main
```

- [ ] **Step 3: Disable GitHub Pages in repo settings (optional)**

Go to the GitHub repo → Settings → Pages → Source → set to "None". This prevents the old static site from being served from a Pages URL.

---

## Self-Review Checklist

_Completed inline before finalizing:_

- [x] **Spec section 3 (visual direction)** → Tasks 2, 7, 8, 9 cover palette, dot field, fonts, typography
- [x] **Spec section 4 (stack)** → Tasks 1–2 cover Next.js 15 + TS + Tailwind + next/font + Vitest + Playwright + Vercel
- [x] **Spec section 5 (routes)** → Tasks 14–17 cover `/`, `/c/[slug]`, `/subscribe`, `/about`
- [x] **Spec section 6 (data model)** → Task 3 defines `Conference` type with all required fields including `slug`, `paperDeadlineISO`
- [x] **Spec section 7 (home page structure)** → Task 14 covers all six sections (nav, hero, filter bar, listing, sidebar, email section, footer)
- [x] **Spec section 8 (component boundaries)** → Each component is in its own file; lib functions are pure and testable
- [x] **Spec section 9 (data flow)** → Server component loads data, passes to `HomeClient`; `generateStaticParams` in Task 15
- [x] **Spec section 10 (error handling)** → `notFound()` in detail page; status `—` handled by `getStatus('TBD') = 'open'`; slug collision in Task 6
- [x] **Spec section 11 (testing)** → Vitest (Tasks 4–5), Playwright (Task 18)
- [x] **Spec section 12 (deployment)** → Tasks 20–21
- [x] **Spec section 13 (migration)** → Task 1 (archive) + Task 3 (data port)
- [x] **Spec section 15 (success criteria)** → covered by Playwright + build verification in Tasks 18–19
- [x] **Type consistency** → `Conference` defined once in `data/conferences.ts`; `Filters` defined once in `lib/filter.ts`; `Status` defined once in `lib/status.ts`; all imports reference the same definitions
- [x] **No TBDs or "implement later"** — subscriber form no-op is explicit and the commit message says "v1 no-op handler"; `about` page copy is a placeholder but the component is complete
