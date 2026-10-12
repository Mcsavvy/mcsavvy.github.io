import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApplication, KEY_HEADER, toRecord } from './pocketbase'
import type { Application } from './validate'

const app: Application = {
  business: 'Acme', type: 'Food and drink', what: 'Bread', city: 'Lagos', goal: 'Bookings', worth: '',
  content: 'Yes, ready', domain: '', name: 'Bimpe', whatsapp: '08031234567', email: '', referral: '', agree: 'yes',
}

describe('pocketbase', () => {
  beforeEach(() => {
    process.env.POCKETBASE_URL = 'https://pb.example/'
    process.env.POCKETBASE_CREATE_KEY = 'secret'
  })
  afterEach(() => vi.unstubAllGlobals())

  it('maps an application to a record with agree=true and no decision', () => {
    const r = toRecord(app)
    expect(r).toMatchObject({ business: 'Acme', whatsapp: '08031234567', agree: true })
    expect('decision' in r).toBe(false)
    expect('submittedAt' in r).toBe(false)
  })

  it('POSTs the record with the secret header and no login', async () => {
    const f = vi.fn(async () => new Response('{}', { status: 200 }))
    vi.stubGlobal('fetch', f)
    await createApplication(app)
    expect(f).toHaveBeenCalledOnce()
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://pb.example/api/collections/free_websites_applications/records')
    expect((init.headers as Record<string, string>)[KEY_HEADER]).toBe('secret')
    expect(JSON.parse(init.body as string).agree).toBe(true)
  })

  it('throws with the status when PocketBase rejects the record', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{"message":"nope"}', { status: 400 })))
    await expect(createApplication(app)).rejects.toThrow(/PocketBase 400/)
  })

  it('fails clearly when env vars are missing', async () => {
    delete process.env.POCKETBASE_CREATE_KEY
    await expect(createApplication(app)).rejects.toThrow(/POCKETBASE_CREATE_KEY/)
    delete process.env.POCKETBASE_URL
    await expect(createApplication(app)).rejects.toThrow(/POCKETBASE_URL/)
  })
})
