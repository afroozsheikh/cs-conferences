# Email Subscription Feature — Design Spec
_Date: 2026-07-10_

## Overview

Wire up the existing no-op subscribe form to actually collect emails and send deadline reminder digests 14 days before each conference paper deadline.

**Stack:** Supabase (storage) + Resend (email) + Vercel Cron (scheduler)

---

## Data Model

One table in Supabase:

```sql
create table subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  topics     text[] not null,
  created_at timestamptz default now()
);
```

Topics are stored as a postgres text array matching the `Topic` union type in `data/conferences.ts`. Re-subscribing with a different topic selection upserts the row (updates topics, preserves created_at).

---

## API Routes

### `POST /api/subscribe`

- **Input:** `{ email: string, topics: string[] }`
- **Validation (server-side):** valid email format, at least one topic, topics are all valid `Topic` values
- **Action:** upsert into `subscribers` table (conflict on `email`, update `topics`)
- **Responses:**
  - `200` — success
  - `400` — validation failure with `{ error: string }`
  - `500` — unexpected error

### `GET /api/cron/reminders`

- **Auth:** `Authorization: Bearer <CRON_SECRET>` header — returns 401 if missing or wrong
- **Logic:**
  1. Compute target date = today (UTC) + 14 days, formatted as `YYYY-MM-DD`
  2. Filter `conferences` (from `data/conferences.ts`) where `paperDeadlineISO === target`
  3. If no matching conferences, return `{ sent: 0, skipped: 0 }` early
  4. Collect the unique topics of matching conferences
  5. Query Supabase for subscribers whose `topics` array overlaps with those topics
  6. For each subscriber, filter the matching conferences down to their subscribed topics
  7. Send one digest email via Resend
- **Response:** `200 { sent: number, skipped: number }`

---

## Cron Schedule

Configured in `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/reminders",
    "schedule": "0 8 * * *"
  }]
}
```

Runs daily at 08:00 UTC. Vercel automatically adds the `Authorization` header using `CRON_SECRET`.

---

## Email Design

- **From:** `CS Conferences <reminders@yourdomain.com>` (configured in Resend)
- **Subject:** `Your paper deadlines are in 14 days`
- **Format:** HTML email, warm cream background (`#f5f0e8`), wine accent (`#730d28`)
- **Structure:**
  - Header: "CS CONFERENCES · Deadline Reminder · {date}"
  - Intro line: "Your deadlines are in 14 days 🗓️"
  - One section per conference: title, full name, CORE rank pill, location, conference dates, deadline date, "Submit now →" link
  - Subtle `· · ·` divider between conferences
  - Footer: "Centre for Applied AI · Macquarie University" + unsubscribe link

Unsubscribe: a signed token in the URL hits `GET /api/unsubscribe?token=<jwt>` which deletes the row. Token is a JWT signed with `CRON_SECRET` containing the subscriber's email.

---

## Environment Variables

| Variable | Where used |
|---|---|
| `SUPABASE_URL` | Both API routes |
| `SUPABASE_SERVICE_ROLE_KEY` | Both API routes (server-only, bypasses RLS) |
| `RESEND_API_KEY` | Cron route |
| `CRON_SECRET` | Cron route auth + unsubscribe token signing |

All set in Vercel project settings. Never exposed to the client.

---

## Form Integration

`components/subscribe-form.tsx` `handleSubmit`:
1. POST to `/api/subscribe` with `{ email, topics: categories }`
2. On success → show existing "Noted!" confirmation
3. On API error → show inline: "Something went wrong — please try again."

Client-side validation (already implemented) runs before the API call.

---

## Files to Create / Modify

| File | Change |
|---|---|
| `app/api/subscribe/route.ts` | New — POST handler |
| `app/api/cron/reminders/route.ts` | New — GET handler |
| `app/api/unsubscribe/route.ts` | New — GET handler (token-based delete) |
| `lib/email.tsx` | New — Resend HTML email template |
| `components/subscribe-form.tsx` | Modify — wire `handleSubmit` to API |
| `vercel.json` | New — cron schedule config |
