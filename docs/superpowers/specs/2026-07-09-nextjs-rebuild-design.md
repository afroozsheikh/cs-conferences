# CS Conference Alerts — Next.js Rebuild + Redesign

**Date:** 2026-07-09
**Sub-project:** 1 of 3 (rebuild) — followed by (2) email notifications, (3) data audit + refresh
**Status:** Design — awaiting user review

## 1. Purpose

Replace the current static single-page site (`index.html` + `conferences.js`, hosted on GitHub Pages) with a Next.js 15 app on Vercel that:

- Adopts a collectivelearning.ai-inspired visual language while retaining Centre for Applied AI / Macquarie University branding.
- Preserves every filtering behavior of the current site (month, CORE rank, topic, text search, hide-closed).
- Adds per-conference detail pages (SEO + link targets for future email reminders).
- Adds a "Get email alerts" section on the home page (form only; backend arrives in sub-project 2).
- Migrates hosting from GitHub Pages to Vercel to unlock serverless functions + cron for sub-project 2.

Data (the conference list itself) is *not* audited in this sub-project. That is sub-project 3 and happens against the final schema after the rebuild ships.

## 2. Non-goals

- No email backend, database, subscription table, or cron in this sub-project. Only the signup form UI.
- No CMS. Conferences remain a typed file committed to the repo.
- No auth. No user accounts.
- No dark/light toggle. The site is dark-only.
- No source verification, no schedule for new conferences added. Sub-project 3 covers that.

## 3. Visual direction

### Palette (dark wine)

- **Background base:** `#0d0608` (near-black with a warm undertone).
- **Surface / cards:** `#140a0e` with `#2a1218` borders.
- **Accent (Macquarie wine):** `#e63e5c` for primary actions, links, active states, headline emphasis.
- **Accent muted:** `#8a1a2b` for hover borders, dot pattern.
- **Text:** `#f5e6ea` primary, `rgba(245,230,234,0.65)` secondary, `rgba(245,230,234,0.45)` labels.

The Macquarie / Centre for Applied AI logo appears in the top-left of the nav and in the footer, unchanged from the current asset (`1669711196551.jpeg`) — the logo is a hard requirement of keeping the university affiliation visible.

### Typography

- **Display (headlines):** Instrument Serif (Google Fonts). Used for hero, page titles, section titles.
- **Body:** Inter (Google Fonts). Used for card copy, descriptions, form labels.
- **Mono (labels / metadata):** JetBrains Mono (Google Fonts). Used for uppercased category tags, dates in card headers, section labels.

Wired via `next/font` so fonts are self-hosted and don't add a runtime dependency on Google Fonts.

### Signature elements

- **Radial dot field** behind the hero and the "Get email alerts" section. CSS `background-image: radial-gradient(circle, #3d1220 1px, transparent 1px); background-size: 22px 22px; opacity: 0.55;`. Static (no cursor tracking) for v1 — simpler and cheaper. Cursor-following interaction is a follow-up if it feels flat.
- **Serif + italic accent** for a highlighted word in the hero (e.g. `conferences.` in italics + wine color).
- **Mono uppercase labels** with letter-spacing for categories, statuses, and section headers.
- **Pill filters** with wine-colored active state; other states use border-only.

## 4. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15, App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + a small `theme.css` for CSS custom properties (the palette above) |
| Data source | `data/conferences.ts` — a typed `Conference[]` export |
| Fonts | `next/font/google` — Instrument Serif, Inter, JetBrains Mono |
| Icons | `lucide-react` (small, tree-shakeable) |
| Hosting | Vercel (free tier), deploys on `git push` to `main` |
| Analytics | None in v1 |
| Testing | Vitest for pure functions (status computation, filtering), Playwright for one smoke test of the home page |

No CMS, no CDN config, no database in this sub-project.

## 5. Routes

| Path | Contents |
|---|---|
| `/` | Hero, filter bar, listing, sidebar (topics + coming-up), "Get email alerts" section, footer |
| `/c/[slug]` | Per-conference detail page — full metadata, all deadlines, link to the official site, "notify me for this one" button (form disabled placeholder in v1) |
| `/subscribe` | Standalone version of the signup form (linked from footer and from emails in sub-project 2) |
| `/about` | Placeholder page for now — currently just the "About" nav link; short blurb about the Centre for Applied AI |

Slug generation for `/c/[slug]`: lowercased conference abbreviation + year, e.g. `icml-2026`. Derived at build time.

## 6. Data model

`data/conferences.ts` exports a typed array. The type extends the existing `conferences.js` shape with two additions needed for the new pages and future email logic:

```ts
export type Rank = 'A*' | 'A' | 'B' | 'C' | '';

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
  | 'Cloud Computing';

export type Conference = {
  slug: string;                 // NEW — e.g. "icml-2026", used for /c/[slug]
  title: string;
  month: string;                // "Jan"..."Dec"
  day: string;
  year: string;
  location: string;
  topic: Topic;
  rank: Rank;
  paperDeadline: string;        // "Jan 28, 2026" or "TBD"
  paperDeadlineISO?: string;    // NEW — ISO string when known, used for reminders in sub-project 2
  notificationDate: string;
  cameraReady: string;
  url: string;
  description?: string;         // NEW — shown on /c/[slug] only
};
```

Slug and ISO deadline are the only *required* new fields. `description` is optional and can be backfilled as part of sub-project 3.

## 7. Home page structure

Top to bottom:

1. **Nav** — logo + wordmark on the left, links (Conferences, Categories, About, Get alerts) on the right. Sticky, translucent dark background with a bottom border on scroll.
2. **Hero** — "UPDATED · FEB 2026" mono label, big serif headline with italic wine accent on the final word, secondary line describing the site, dot field behind.
3. **Filter bar** — mono pill filters for topic (All, ML, VISION, NLP, ...); below that, a compact row for CORE rank + a search input + a "hide closed" toggle. Month filter as a horizontal scroll of pill tabs above the listing.
4. **Listing** — vertical stack of conference cards (not a grid). Each card:
   - Left: date box (mono month + serif day + faded year), same visual language as current site but retimed for dark palette.
   - Middle: title, location, topic, paper deadline.
   - Right: status badge (open / soon / closed) + CORE rank badge.
   - Footer strip: full deadline set (paper, notification, camera-ready) + a "Details →" link that goes to `/c/[slug]`.
5. **Sidebar** (desktop only, above listing on mobile) — "Browse by topic" list with counts, "Coming up soon" mini-list. Same content as current site.
6. **Email alerts section** — full-width, dot field, a signup form containing: an email input, a category multi-select (checkbox pills for the ten topics + an "All conferences" option), and a "Notify me" button. Form is real HTML with real validation, but the submit handler in v1 is a no-op that shows a toast ("Signups open in the next release"). The handler is swapped for a real POST in sub-project 2.
7. **Footer** — same content and branding as current, restyled.

## 8. Component boundaries

Each piece has a single responsibility, is testable in isolation, and can be understood without reading its neighbors.

- `components/nav.tsx` — sticky nav bar. No state beyond scroll shadow.
- `components/hero.tsx` — hero with dot field. Pure presentation.
- `components/filter-bar.tsx` — controlled filter state (topic, rank, search, hide-closed, month). Exposes `onChange` and consumes a `filters` prop. No data fetching.
- `components/conference-card.tsx` — pure presentation, takes a `Conference` + computed `status`.
- `components/conference-list.tsx` — takes the full list + filters, applies the filter/sort pipeline, renders cards. This is the only place filtering logic lives.
- `components/sidebar.tsx` — takes the full list, computes topic counts and upcoming list.
- `components/subscribe-form.tsx` — form UI. Takes an `onSubmit` prop; v1 wires a no-op handler with a toast.
- `lib/status.ts` — pure `getStatus(deadlineISO): 'open' | 'soon' | 'closed'`. Same logic as current site.
- `lib/filter.ts` — pure `applyFilters(list, filters): Conference[]` and `sortByDeadline`. Extracted so it's unit-testable and can be reused by `/c/[slug]` for "related conferences".

## 9. Data flow

- `data/conferences.ts` is imported directly by pages (server components). No fetch, no API.
- Home page is a server component that reads the data, passes it to a client component `<HomeClient />` which owns filter state.
- `/c/[slug]` uses `generateStaticParams` over the data to pre-render every conference detail page at build time.
- No runtime data fetching in this sub-project.

## 10. Error handling

- Missing `paperDeadline` or `TBD`: sort to bottom, status shown as `—` badge.
- Missing `rank`: no rank badge rendered.
- Missing `url`: card title is not a link; "Details →" still goes to `/c/[slug]`.
- Unknown `topic`: caught by TypeScript at build time (the `Topic` union is closed). No runtime handling needed.
- Slug collision (two conferences producing the same slug): caught by a build-time check in `lib/build-checks.ts` that throws during `next build`. This is a data-authoring bug, not a runtime concern.
- The signup form has real input validation (email regex, at least one category selected) and shows inline errors. Submission is a no-op with a toast in v1.

## 11. Testing

- **Vitest** for `lib/status.ts` (open / soon / closed / TBD cases) and `lib/filter.ts` (each filter dimension, combinations, empty results).
- **Playwright** for one smoke test: home page loads, at least one card is visible, clicking a topic pill reduces the visible count.
- No visual regression testing in v1.

## 12. Deployment

- Repo pushed to GitHub as-is (Vercel reads from GitHub).
- New Vercel project connected to the repo. `main` = production, PR previews auto-generated.
- Custom domain: none in this sub-project — the default `*.vercel.app` URL is fine until sub-project 2 or 3.
- GitHub Pages deployment (`.github/workflows/`) is removed once Vercel is verified working. The current `.github/workflows/` directory contents will be reviewed and deleted in the implementation plan.

## 13. Migration mechanics

The rebuild happens in a new subdirectory (`web/`) or by promoting the Next.js app to the repo root and moving the current `index.html` + `conferences.js` to an `archive/` folder. Decision deferred to the implementation plan — both are fine, the choice affects only the git history readability.

Conference data is ported by hand: each entry in the current `conferences.js` array is copied into `data/conferences.ts` with the new schema fields (`slug`, `paperDeadlineISO`) filled in. The old file is deleted after the port.

## 14. Open questions / deferred to later sub-projects

- **Signup persistence, sending, and cron** — sub-project 2.
- **Source correctness and new conferences** — sub-project 3.
- **About page content** — placeholder in v1, real copy is a content task not a design task.
- **Cursor-following dot interaction** — deferred; static dot field ships first.
- **Custom domain** — deferred until email delivery needs a proper sender domain.

## 15. Success criteria

- Site loads on the Vercel free tier with no runtime errors.
- All conferences from the current `conferences.js` are present and correctly displayed.
- Every filter from the current site works: month, CORE rank, topic, search, hide-closed.
- Each conference has a `/c/[slug]` page that renders all fields.
- The signup form validates input and shows a "coming soon" toast on submit.
- Lighthouse: performance ≥ 95, accessibility ≥ 95 on desktop.
- The site visibly resembles the mockup from the brainstorming session (dark wine palette, dot field, editorial serif + mono).
