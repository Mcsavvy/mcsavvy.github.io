import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApplication, toRecord, tokenExpiry } from './pocketbase'
import type { Application } from './validate'

const app: Application = {
  business: 'Acme', type: 'Food and drink', what: 'Bread', city: 'Lagos', goal: 'Bookings', worth: '',
  content: 'Yes, ready', domain: '', name: 'Bimpe', whatsapp: '08031234567', email: '', referral: '', agree: 'yes',
}
const jwt = (exp: number) => `x.${Buffer.from(JSON.stringify({ exp })).toString('base64url')}.y`
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status })

describe('pocketbase', () => {
  beforeEach(() => {
    process.env.POCKETBASE_URL = 'https://pb.example/'
    process.env.POCKETBASE_EMAIL = 'a@b.co'
    process.env.POCKETBASE_PASSWORD = 'pw'
  })
  afterEach(() => vi.unstubAllGlobals())

  it('maps an application to a record with agree=true', () => {
    expect(toRecord(app)).toMatchObject({ business: 'Acme', whatsapp: '08031234567', agree: true })
    expect('submittedAt' in toRecord(app)).toBe(false)
  })

  it('reads JWT expiry and tolerates garbage', () => {
    expect(tokenExpiry(jwt(123))).toBe(123)
    expect(tokenExpiry('nope')).toBe(0)
  })

  it('logs in, creates the record, and re-logs in once on a 401', async () => {
    const calls: string[] = []
    let creates = 0
    vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => {
      calls.push(`${init.method} ${url.replace('https://pb.example', '')}`)
      if (url.endsWith('/auth-with-password')) return json(200, { token: jwt(Math.floor(Date.now() / 1000) + 3600) })
      return ++creates === 1 ? json(401, { message: 'expired' }) : json(200, { id: 'r1' })
    }))
    await createApplication(app)
    expect(calls.filter((c) => c.includes('/records'))).toHaveLength(2)
    expect(calls.filter((c) => c.includes('auth-with-password')).length).toBeGreaterThanOrEqual(1)
    expect(calls.at(-1)).toBe('POST /api/collections/applications/records')
  })

  it('throws with the status when PocketBase rejects the record', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) =>
      url.endsWith('/auth-with-password') ? json(200, { token: jwt(Math.floor(Date.now() / 1000) + 3600) }) : json(400, { message: 'bad' })))
    await expect(createApplication(app)).rejects.toThrow(/PocketBase 400/)
  })

  it('fails clearly when env vars are missing', async () => {
    delete process.env.POCKETBASE_URL
    await expect(createApplication(app)).rejects.toThrow(/POCKETBASE_URL/)
  })
})
