# Email Subscriptions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up the subscribe form to store emails in Supabase and send deadline reminder digest emails 14 days before each conference deadline via Resend, triggered by a daily Vercel Cron job.

**Architecture:** A `POST /api/subscribe` route upserts subscribers into Supabase. A `GET /api/cron/reminders` route (called daily at 08:00 UTC by Vercel Cron) checks for conferences with deadlines 14 days away, groups them by topic, matches subscribers, and sends one HTML digest email per subscriber via Resend. Unsubscribe links use a short-lived JWT in the URL, verified by `GET /api/unsubscribe`.

**Tech Stack:** `@supabase/supabase-js`, `resend`, `jose` (JWT), Next.js 16 Route Handlers, Vitest

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `data/conferences.ts` | Modify | Add exported `TOPICS` const array |
| `lib/supabase.ts` | Create | Supabase server-side client singleton |
| `lib/validate-subscription.ts` | Create | Pure validation for email + topics |
| `lib/unsubscribe-token.ts` | Create | JWT sign/verify for unsubscribe links |
| `lib/email.ts` | Create | HTML email template renderer |
| `app/api/subscribe/route.ts` | Create | POST — save subscriber to Supabase |
| `app/api/cron/reminders/route.ts` | Create | GET — find deadlines, send digest emails |
| `app/api/unsubscribe/route.ts` | Create | GET — verify token, delete subscriber |
| `components/subscribe-form.tsx` | Modify | Wire `handleSubmit` to POST /api/subscribe |
| `vercel.json` | Create | Cron schedule config |
| `tests/lib/validate-subscription.test.ts` | Create | Vitest unit tests |
| `tests/lib/unsubscribe-token.test.ts` | Create | Vitest unit tests |
| `tests/lib/email.test.ts` | Create | Vitest unit tests |

---

## Task 1: Install dependencies

**Files:** none (package.json)

- [ ] **Step 1: Install the three packages**

```bash
npm install @supabase/supabase-js resend jose
```

Expected: package.json `dependencies` now includes `@supabase/supabase-js`, `resend`, `jose`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add supabase, resend, jose dependencies"
```

---

## Task 2: Set up Supabase (manual steps — no code)

- [ ] **Step 1: Create a Supabase account and project**

  Go to https://supabase.com, sign up, create a new project. Choose any region. Wait for the project to be ready (~2 min).

- [ ] **Step 2: Create the subscribers table**

  In the Supabase dashboard → SQL Editor → New query. Paste and run:

```sql
create table subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  topics     text[] not null,
  created_at timestamptz default now()
);
```

- [ ] **Step 3: Get your credentials**

  In the Supabase dashboard → Settings → API:
  - Copy **Project URL** → this is `SUPABASE_URL`
  - Copy **service_role** secret (under "Project API keys") → this is `SUPABASE_SERVICE_ROLE_KEY`

  **Never commit these values. Never use the anon key — the service role key bypasses Row Level Security, which is what we need for server-side writes.**

- [ ] **Step 4: Create .env.local**

  Create `/Disk1/afrouz/Projects/cs-conferences/.env.local` with:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
RESEND_API_KEY=re_placeholder_get_this_in_task_3
CRON_SECRET=generate-a-random-string-here-eg-openssl-rand-hex-32
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

  Generate CRON_SECRET by running: `openssl rand -hex 32`

  `.env.local` is already in `.gitignore` — do not commit it.

---

## Task 3: Set up Resend (manual steps — no code)

- [ ] **Step 1: Create a Resend account**

  Go to https://resend.com, sign up.

- [ ] **Step 2: Get an API key**

  Resend dashboard → API Keys → Create API Key. Copy the value.

- [ ] **Step 3: Update .env.local**

  Replace `re_placeholder_get_this_in_task_3` in `.env.local` with your real Resend API key.

- [ ] **Step 4: Note the sender email**

  On Resend's free tier you can send from `onboarding@resend.dev` for testing. For production you'll add a custom domain later. For now we'll use `onboarding@resend.dev` — update this in `app/api/cron/reminders/route.ts` when you add a real domain.

---

## Task 4: Export TOPICS const from data/conferences.ts

**Files:**
- Modify: `data/conferences.ts`
- Modify: `components/subscribe-form.tsx`

- [ ] **Step 1: Add TOPICS export to data/conferences.ts**

  Open `data/conferences.ts`. After the `Topic` type definition (line 13), add:

```typescript
export const TOPICS: Topic[] = [
  'Machine Learning',
  'Computer Vision',
  'NLP',
  'Health Informatics',
  'Data Mining & IR',
  'Web & Networks',
  'Security',
  'Software Engineering',
  'Robotics',
  'Cloud Computing',
]
```

- [ ] **Step 2: Update subscribe-form.tsx to import TOPICS**

  In `components/subscribe-form.tsx`, replace the hardcoded `TOPICS` array:

```typescript
// Remove this:
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
```

  Add import at the top of the file:

```typescript
import { TOPICS } from '../data/conferences'
```

- [ ] **Step 3: Verify the app still works**

```bash
npm run dev
```

  Navigate to `/subscribe` and confirm the topic pills still render correctly.

- [ ] **Step 4: Commit**

```bash
git add data/conferences.ts components/subscribe-form.tsx
git commit -m "refactor: export TOPICS from data/conferences, import in subscribe-form"
```

---

## Task 5: lib/supabase.ts

**Files:**
- Create: `lib/supabase.ts`

- [ ] **Step 1: Create the Supabase client singleton**

  Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

- [ ] **Step 2: Commit**

```bash
git add lib/supabase.ts
git commit -m "feat: add Supabase server-side client"
```

---

## Task 6: lib/validate-subscription.ts + tests

**Files:**
- Create: `lib/validate-subscription.ts`
- Create: `tests/lib/validate-subscription.test.ts`

- [ ] **Step 1: Write the failing tests**

  Create `tests/lib/validate-subscription.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { validateSubscription } from '../../lib/validate-subscription'

describe('validateSubscription', () => {
  it('returns valid for a good email and one topic', () => {
    const result = validateSubscription('user@example.com', ['Machine Learning'])
    expect(result).toEqual({ valid: true })
  })

  it('returns error for missing email', () => {
    const result = validateSubscription('', ['Machine Learning'])
    expect(result.valid).toBe(false)
  })

  it('returns error for malformed email', () => {
    const result = validateSubscription('not-an-email', ['Machine Learning'])
    expect(result.valid).toBe(false)
  })

  it('returns error for empty topics array', () => {
    const result = validateSubscription('user@example.com', [])
    expect(result.valid).toBe(false)
  })

  it('returns error for non-array topics', () => {
    const result = validateSubscription('user@example.com', 'Machine Learning')
    expect(result.valid).toBe(false)
  })

  it('returns error for unknown topic', () => {
    const result = validateSubscription('user@example.com', ['Machine Learning', 'Astrology'])
    expect(result.valid).toBe(false)
  })

  it('returns valid for multiple valid topics', () => {
    const result = validateSubscription('user@example.com', ['Machine Learning', 'NLP', 'Security'])
    expect(result).toEqual({ valid: true })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- validate-subscription
```

  Expected: FAIL — `Cannot find module '../../lib/validate-subscription'`

- [ ] **Step 3: Create lib/validate-subscription.ts**

```typescript
import { TOPICS } from '../data/conferences'

export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string }

export function validateSubscription(email: unknown, topics: unknown): ValidationResult {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Invalid email address.' }
  }
  if (!Array.isArray(topics) || topics.length === 0) {
    return { valid: false, error: 'Select at least one topic.' }
  }
  const invalid = topics.filter((t) => !(TOPICS as string[]).includes(t))
  if (invalid.length > 0) {
    return { valid: false, error: `Unknown topics: ${invalid.join(', ')}` }
  }
  return { valid: true }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- validate-subscription
```

  Expected: 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/validate-subscription.ts tests/lib/validate-subscription.test.ts
git commit -m "feat: add subscription validation with tests"
```

---

## Task 7: lib/unsubscribe-token.ts + tests

**Files:**
- Create: `lib/unsubscribe-token.ts`
- Create: `tests/lib/unsubscribe-token.test.ts`

- [ ] **Step 1: Write the failing tests**

  Create `tests/lib/unsubscribe-token.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest'
import { signUnsubscribeToken, verifyUnsubscribeToken } from '../../lib/unsubscribe-token'

beforeAll(() => {
  process.env.CRON_SECRET = 'test-secret-for-unit-tests-only'
})

describe('unsubscribe token', () => {
  it('round-trips an email address', async () => {
    const token = await signUnsubscribeToken('user@example.com')
    const email = await verifyUnsubscribeToken(token)
    expect(email).toBe('user@example.com')
  })

  it('throws on a tampered token', async () => {
    const token = await signUnsubscribeToken('user@example.com')
    await expect(verifyUnsubscribeToken(token + 'x')).rejects.toThrow()
  })

  it('produces a string token', async () => {
    const token = await signUnsubscribeToken('user@example.com')
    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(20)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- unsubscribe-token
```

  Expected: FAIL — `Cannot find module '../../lib/unsubscribe-token'`

- [ ] **Step 3: Create lib/unsubscribe-token.ts**

```typescript
import { SignJWT, jwtVerify } from 'jose'

function getSecret() {
  return new TextEncoder().encode(process.env.CRON_SECRET!)
}

export async function signUnsubscribeToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(getSecret())
}

export async function verifyUnsubscribeToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, getSecret())
  if (typeof payload.email !== 'string') throw new Error('Invalid token payload')
  return payload.email
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- unsubscribe-token
```

  Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/unsubscribe-token.ts tests/lib/unsubscribe-token.test.ts
git commit -m "feat: add unsubscribe JWT signing and verification with tests"
```

---

## Task 8: lib/email.ts + tests

**Files:**
- Create: `lib/email.ts`
- Create: `tests/lib/email.test.ts`

- [ ] **Step 1: Write the failing tests**

  Create `tests/lib/email.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { renderReminderEmail } from '../../lib/email'
import type { Conference } from '../../data/conferences'

const conf: Conference = {
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
}

describe('renderReminderEmail', () => {
  it('includes the conference title', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('ICML 2026')
  })

  it('includes the rank', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('A*')
  })

  it('includes the deadline', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('Jan 28, 2026')
  })

  it('includes the unsubscribe URL', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub?token=abc', 'January 28, 2026')
    expect(html).toContain('https://example.com/unsub?token=abc')
  })

  it('includes submit link', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('https://icml.cc/Conferences/2026')
  })

  it('includes divider between multiple conferences', () => {
    const html = renderReminderEmail([conf, { ...conf, slug: 'neurips-2026', title: 'NeurIPS 2026' }], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).toContain('· · ·')
  })

  it('does not include divider for a single conference', () => {
    const html = renderReminderEmail([conf], 'https://example.com/unsub', 'January 28, 2026')
    expect(html).not.toContain('· · ·')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- email
```

  Expected: FAIL — `Cannot find module '../../lib/email'`

- [ ] **Step 3: Create lib/email.ts**

```typescript
import type { Conference } from '../data/conferences'

export function renderReminderEmail(
  conferences: Conference[],
  unsubscribeUrl: string,
  dateLabel: string,
): string {
  const cards = conferences
    .map((c, i) => {
      const divider =
        i > 0
          ? `<p style="text-align:center;color:#9a8f7c;font-family:monospace;font-size:13px;margin:24px 0;">· · ·</p>`
          : ''
      const rank = c.rank
        ? `<span style="display:inline-block;background:#f0dde3;color:#730d28;font-family:monospace;font-size:10px;letter-spacing:0.1em;padding:2px 8px;border-radius:999px;margin-left:8px;">${c.rank}</span>`
        : ''
      return `
        ${divider}
        <div style="padding:0 0 4px;">
          <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:18px;font-weight:normal;color:#1c180f;">
            ${c.title}${rank}
          </p>
          <p style="margin:0 0 4px;font-family:monospace;font-size:12px;color:#9a8f7c;letter-spacing:0.05em;">
            📍 ${c.location} &nbsp;·&nbsp; ${c.month} ${c.day}, ${c.year}
          </p>
          <p style="margin:0 0 12px;font-family:monospace;font-size:12px;color:#730d28;letter-spacing:0.05em;">
            ⏰ Deadline: ${c.paperDeadline}
          </p>
          <a href="${c.url}" style="font-family:monospace;font-size:11px;color:#730d28;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">Submit now →</a>
        </div>`
    })
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:0 0 32px;">
          <p style="margin:0;font-family:monospace;font-size:11px;letter-spacing:0.18em;color:#730d28;text-transform:uppercase;">
            CS CONFERENCES &nbsp;·&nbsp; Deadline Reminder &nbsp;·&nbsp; ${dateLabel}
          </p>
        </td></tr>
        <tr><td style="border-top:1px solid #d4c4b4;padding:0 0 28px;"></td></tr>
        <tr><td style="padding:0 0 28px;">
          <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#1c180f;font-weight:normal;">
            Your deadlines are in 14 days 🗓️
          </p>
        </td></tr>
        <tr><td style="padding:0 0 32px;">${cards}</td></tr>
        <tr><td style="border-top:1px solid #d4c4b4;padding:28px 0 0;">
          <p style="margin:0 0 4px;font-family:monospace;font-size:10px;letter-spacing:0.1em;color:#9a8f7c;text-transform:uppercase;">
            Centre for Applied AI · Macquarie University
          </p>
          <a href="${unsubscribeUrl}" style="font-family:monospace;font-size:10px;color:#9a8f7c;letter-spacing:0.08em;text-transform:uppercase;">
            Unsubscribe
          </a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- email
```

  Expected: 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/email.ts tests/lib/email.test.ts
git commit -m "feat: add HTML email template with tests"
```

---

## Task 9: POST /api/subscribe route

**Files:**
- Create: `app/api/subscribe/route.ts`

- [ ] **Step 1: Create the route handler**

  Create `app/api/subscribe/route.ts`:

```typescript
import { validateSubscription } from '../../../lib/validate-subscription'
import { supabase } from '../../../lib/supabase'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { email, topics } = body as { email: unknown; topics: unknown }
  const result = validateSubscription(email, topics)
  if (!result.valid) {
    return Response.json({ error: result.error }, { status: 400 })
  }

  const { error } = await supabase
    .from('subscribers')
    .upsert(
      { email: email as string, topics: topics as string[] },
      { onConflict: 'email' }
    )

  if (error) {
    console.error('Supabase upsert error:', error)
    return Response.json({ error: 'Failed to save subscription.' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
```

- [ ] **Step 2: Manual smoke test**

  Start the dev server (`npm run dev`), then in a separate terminal:

```bash
curl -s -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","topics":["Machine Learning","NLP"]}' | jq
```

  Expected: `{"ok":true}`

  Check Supabase dashboard → Table Editor → subscribers — your row should appear.

- [ ] **Step 3: Test validation errors**

```bash
# Missing topics
curl -s -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","topics":[]}' | jq

# Bad email
curl -s -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"notanemail","topics":["NLP"]}' | jq
```

  Expected: `{"error":"..."}` with status 400 for both.

- [ ] **Step 4: Commit**

```bash
git add app/api/subscribe/route.ts
git commit -m "feat: add POST /api/subscribe route"
```

---

## Task 10: Wire up subscribe-form.tsx

**Files:**
- Modify: `components/subscribe-form.tsx`

- [ ] **Step 1: Add API error state and wire handleSubmit**

  In `components/subscribe-form.tsx`, add an `apiError` state and replace the `handleSubmit` function:

  Add state after the existing `setSubmitted` state:
```typescript
const [apiError, setApiError] = useState<string | null>(null)
```

  Replace the `handleSubmit` function:
```typescript
async function handleSubmit(evt: React.FormEvent) {
  evt.preventDefault()
  const e = validate()
  if (Object.keys(e).length > 0) { setErrors(e); return }
  setErrors({})
  setApiError(null)

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, topics: categories }),
    })
    if (!res.ok) throw new Error('API error')
    setSubmitted(true)
  } catch {
    setApiError('Something went wrong — please try again.')
  }
}
```

  Add the error display just before the submit button (before the `<button type="submit"` line):
```tsx
{apiError && (
  <p className="font-mono text-xs text-accent">{apiError}</p>
)}
```

- [ ] **Step 2: Manual test in browser**

  Go to `/subscribe`, enter a real email, pick topics, hit "Notify me". Confirm:
  - "Noted!" confirmation appears
  - The email appears in Supabase dashboard → subscribers table

  Also test re-subscribing with the same email and different topics — row should update, not duplicate.

- [ ] **Step 3: Commit**

```bash
git add components/subscribe-form.tsx
git commit -m "feat: wire subscribe form to POST /api/subscribe"
```

---

## Task 11: GET /api/unsubscribe route

**Files:**
- Create: `app/api/unsubscribe/route.ts`

- [ ] **Step 1: Create the route handler**

  Create `app/api/unsubscribe/route.ts`:

```typescript
import type { NextRequest } from 'next/server'
import { verifyUnsubscribeToken } from '../../../lib/unsubscribe-token'
import { supabase } from '../../../lib/supabase'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return new Response('Missing token.', { status: 400 })
  }

  let email: string
  try {
    email = await verifyUnsubscribeToken(token)
  } catch {
    return new Response('Invalid or expired unsubscribe link.', { status: 400 })
  }

  await supabase.from('subscribers').delete().eq('email', email)

  return new Response(
    `<!DOCTYPE html><html><body style="font-family:monospace;padding:40px;background:#f5f0e8;color:#1c180f;">
      <p style="font-size:14px;">You've been unsubscribed. No more reminders will be sent to ${email}.</p>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } },
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/unsubscribe/route.ts
git commit -m "feat: add GET /api/unsubscribe route"
```

---

## Task 12: GET /api/cron/reminders route

**Files:**
- Create: `app/api/cron/reminders/route.ts`

- [ ] **Step 1: Create the route handler**

  Create `app/api/cron/reminders/route.ts`:

```typescript
import type { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { conferences } from '../../../data/conferences'
import { supabase } from '../../../lib/supabase'
import { signUnsubscribeToken } from '../../../lib/unsubscribe-token'
import { renderReminderEmail } from '../../../lib/email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Compute target date: today (UTC) + 14 days
  const target = new Date()
  target.setUTCDate(target.getUTCDate() + 14)
  const targetISO = target.toISOString().slice(0, 10) // "YYYY-MM-DD"

  const upcoming = conferences.filter((c) => c.paperDeadlineISO === targetISO)
  if (upcoming.length === 0) {
    return Response.json({ sent: 0, skipped: 0 })
  }

  const relevantTopics = [...new Set(upcoming.map((c) => c.topic))]

  const { data: subscribers, error: dbError } = await supabase
    .from('subscribers')
    .select('email, topics')
    .overlaps('topics', relevantTopics)

  if (dbError) {
    console.error('Supabase query error:', dbError)
    return Response.json({ error: 'Database error.' }, { status: 500 })
  }

  const dateLabel = target.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://cs-conferences.vercel.app'

  let sent = 0
  for (const sub of subscribers ?? []) {
    const matched = upcoming.filter((c) => (sub.topics as string[]).includes(c.topic))
    if (matched.length === 0) continue

    const token = await signUnsubscribeToken(sub.email)
    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${token}`
    const html = renderReminderEmail(matched, unsubscribeUrl, dateLabel)

    const { error: emailError } = await resend.emails.send({
      from: 'CS Conferences <onboarding@resend.dev>',
      to: sub.email,
      subject: 'Your paper deadlines are in 14 days',
      html,
    })

    if (emailError) {
      console.error(`Failed to send to ${sub.email}:`, emailError)
    } else {
      sent++
    }
  }

  const total = subscribers?.length ?? 0
  return Response.json({ sent, skipped: total - sent })
}
```

- [ ] **Step 2: Manual smoke test**

  With `npm run dev` running, trigger the cron manually:

```bash
curl -s -H "Authorization: Bearer $(grep CRON_SECRET .env.local | cut -d= -f2)" \
  http://localhost:3000/api/cron/reminders | jq
```

  Expected: `{"sent":0,"skipped":0}` (unless today + 14 days happens to match a conference deadline).

  Test auth rejection:
```bash
curl -s http://localhost:3000/api/cron/reminders | jq
```

  Expected: `{"error":"Unauthorized"}` with 401.

- [ ] **Step 3: Commit**

```bash
git add app/api/cron/reminders/route.ts
git commit -m "feat: add GET /api/cron/reminders cron route"
```

---

## Task 13: vercel.json

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create vercel.json**

  Create `vercel.json` at project root:

```json
{
  "crons": [
    {
      "path": "/api/cron/reminders",
      "schedule": "0 8 * * *"
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "feat: add Vercel cron schedule for daily reminder emails"
```

---

## Task 14: Add env vars to Vercel and deploy

- [ ] **Step 1: Add env vars in Vercel dashboard**

  Go to your Vercel project → Settings → Environment Variables. Add all four:

  | Key | Value |
  |---|---|
  | `SUPABASE_URL` | from Supabase Settings → API |
  | `SUPABASE_SERVICE_ROLE_KEY` | from Supabase Settings → API (service_role key) |
  | `RESEND_API_KEY` | from Resend dashboard |
  | `CRON_SECRET` | the same value from your .env.local |
  | `NEXT_PUBLIC_BASE_URL` | `https://your-vercel-deployment-url.vercel.app` |

- [ ] **Step 2: Push and deploy**

```bash
git push origin main
```

  Vercel will deploy automatically.

- [ ] **Step 3: Verify cron is registered**

  In Vercel dashboard → your project → Cron Jobs tab. You should see `/api/cron/reminders` scheduled at `0 8 * * *`.

- [ ] **Step 4: Run the full tests**

```bash
npm test
```

  Expected: all tests pass (validate-subscription, unsubscribe-token, email, plus existing filter and status tests).

---

## Task 15: End-to-end verification

- [ ] **Step 1: Subscribe via the live site**

  Go to your Vercel URL → `/subscribe`. Enter your own email and pick topics. Hit "Notify me". Confirm "Noted!" appears.

  Check Supabase dashboard → Table Editor → subscribers — your row is there.

- [ ] **Step 2: Trigger the cron manually on production**

```bash
curl -s \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-vercel-url.vercel.app/api/cron/reminders | jq
```

  Expected: `{"sent":0,"skipped":0}` unless today + 14 days matches a deadline.

- [ ] **Step 3: Test unsubscribe**

  Generate a token locally:
```bash
node -e "
const { SignJWT } = require('jose');
const secret = new TextEncoder().encode('YOUR_CRON_SECRET');
new SignJWT({ email: 'your@email.com' })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('1h')
  .sign(secret)
  .then(t => console.log(t))
"
```

  Visit: `https://your-vercel-url.vercel.app/api/unsubscribe?token=<token>`

  Expected: "You've been unsubscribed." page. Row removed from Supabase.
