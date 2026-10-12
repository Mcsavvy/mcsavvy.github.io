import type { Application } from './validate.js'

/** e.g. "2026-10-12 14:03:09" in Lagos time (UTC+1, no DST). */
export function formatWat(date: Date): string {
  const p = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? ''
  return `${g('year')}-${g('month')}-${g('day')} ${g('hour')}:${g('minute')}:${g('second')}`
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

export function emailSubject(a: Application): string {
  return `New application: ${a.business}`.replace(/[\r\n]+/g, ' ').slice(0, 150)
}

export function emailHtml(a: Application, submitted: Date, recordsLink: string | null, saveError: string | null): string {
  const rows: [string, string][] = [
    ['Business', a.business],
    ['Type', a.type],
    ['What they sell', a.what],
    ['City', a.city],
    ['Page goal', a.goal],
    ['Customer worth', a.worth || 'Not given'],
    ['Content ready', a.content],
    ['Domain', a.domain || 'None yet'],
    ['Name', a.name],
    ['WhatsApp', a.whatsapp],
    ['Email', a.email || 'None'],
    ['Referral', a.referral || 'None'],
    ['Submitted (WAT)', formatWat(submitted)],
  ]
  const wa = a.whatsapp.replace(/\D/g, '')
  const body = rows
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#4A5E80;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;color:#0F2344"><b>${escapeHtml(v)}</b></td></tr>`)
    .join('')
  const warn = saveError
    ? `<p style="background:#FDECEA;color:#B42318;padding:10px 12px;border-radius:6px"><b>Saving to PocketBase failed</b> (${escapeHtml(saveError)}). This email is the only copy, so add the record by hand.</p>`
    : ''
  const link = recordsLink ? `<p><a href="${escapeHtml(recordsLink)}">Open the applications in PocketBase</a></p>` : ''
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0F2344"><h2 style="margin:0 0 12px">${escapeHtml(a.business)}</h2>${warn}<table style="border-collapse:collapse">${body}</table><p><a href="https://wa.me/${wa}">Message ${escapeHtml(a.name)} on WhatsApp</a></p>${link}</div>`
}

export function emailText(a: Application, submitted: Date, recordsLink: string | null, saveError: string | null): string {
  const lines = [
    saveError ? `POCKETBASE SAVE FAILED (${saveError}). This email is the only copy.` : '',
    `Business: ${a.business}`,
    `Type: ${a.type}`,
    `What they sell: ${a.what}`,
    `City: ${a.city}`,
    `Page goal: ${a.goal}`,
    `Customer worth: ${a.worth || 'Not given'}`,
    `Content ready: ${a.content}`,
    `Domain: ${a.domain || 'None yet'}`,
    `Name: ${a.name}`,
    `WhatsApp: ${a.whatsapp}`,
    `Email: ${a.email || 'None'}`,
    `Referral: ${a.referral || 'None'}`,
    `Submitted (WAT): ${formatWat(submitted)}`,
    recordsLink ? `PocketBase: ${recordsLink}` : '',
  ]
  return lines.filter(Boolean).join('\n')
}
