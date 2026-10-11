import { describe, expect, it } from 'vitest'
import { emailHtml, emailSubject, formatWat, SHEET_COLUMNS, toRow } from './format'
import type { Application } from './validate'

const app: Application = {
  business: '<b>Evil</b> & Co',
  type: 'Food and drink',
  what: 'Bread',
  city: 'Lagos',
  goal: 'Bookings',
  worth: '',
  content: 'Yes, ready',
  domain: '',
  name: 'Bimpe',
  whatsapp: '0803 123 4567',
  email: '',
  referral: '',
  agree: 'yes',
}

describe('format', () => {
  it('renders Lagos time (UTC+1)', () => {
    expect(formatWat(new Date('2026-10-12T22:30:05Z'))).toBe('2026-10-12 23:30:05')
    expect(formatWat(new Date('2026-10-12T23:30:05Z'))).toBe('2026-10-13 00:30:05')
  })

  it('builds a row that matches the column count, with an empty Decision', () => {
    const row = toRow(app, new Date('2026-10-12T10:00:00Z'))
    expect(row).toHaveLength(SHEET_COLUMNS.length)
    expect(row[0]).toBe('2026-10-12 11:00:00')
    expect(row.at(-1)).toBe('')
    expect(SHEET_COLUMNS.at(-1)).toBe('Decision')
  })

  it('puts the business in the subject on one line', () => {
    expect(emailSubject({ ...app, business: 'A\nB' })).toBe('New application: A B')
  })

  it('escapes user input in the email body and flags a failed sheet write', () => {
    const html = emailHtml(app, new Date(), 'https://docs.google.com/x', 'boom')
    expect(html).not.toContain('<b>Evil</b>')
    expect(html).toContain('&lt;b&gt;Evil&lt;/b&gt; &amp; Co')
    expect(html).toContain('Google Sheet write failed')
    expect(html).toContain('https://docs.google.com/x')
  })
})
