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
