import { auth, sheets } from '@googleapis/sheets'
import { SHEET_COLUMNS } from './format.js'

/** Env var keys often arrive with literal "\n" and wrapping quotes. */
export function normalizePrivateKey(raw: string): string {
  return raw.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
}

/**
 * Appends one row to the first tab of the sheet. Writes the header row first if A1 is empty.
 * RAW input means values are stored as typed: no formula evaluation, and "0803..." keeps its zero.
 */
export async function appendRow(row: string[]): Promise<void> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY
  const spreadsheetId = process.env.SHEET_ID
  if (!email || !key || !spreadsheetId) throw new Error('Google Sheets env vars are not set')

  const client = new auth.JWT({
    email,
    key: normalizePrivateKey(key),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const api = sheets({ version: 'v4', auth: client })
  const lastCol = String.fromCharCode(64 + SHEET_COLUMNS.length) // N

  const head = await api.spreadsheets.values.get({ spreadsheetId, range: `A1:${lastCol}1` })
  if (!head.data.values?.length) {
    await api.spreadsheets.values.update({
      spreadsheetId,
      range: `A1:${lastCol}1`,
      valueInputOption: 'RAW',
      requestBody: { values: [[...SHEET_COLUMNS]] },
    })
  }
  await api.spreadsheets.values.append({
    spreadsheetId,
    range: `A:${lastCol}`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
}
