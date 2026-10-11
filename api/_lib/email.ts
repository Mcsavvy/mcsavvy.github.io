import type { Application } from './validate.js'
import { emailHtml, emailSubject, emailText, sheetUrl } from './format.js'

/** Sends the notification through Resend's REST API (no SDK needed). */
export async function sendNotification(a: Application, submitted: Date, sheetError: string | null): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_EMAIL
  if (!apiKey || !to) throw new Error('Resend env vars are not set')
  const link = sheetUrl(process.env.SHEET_ID)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || 'Five Free Websites <apply@futurdevs.com>',
      to: [to],
      subject: emailSubject(a),
      html: emailHtml(a, submitted, link, sheetError),
      text: emailText(a, submitted, link, sheetError),
      ...(a.email ? { reply_to: a.email } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`)
}
