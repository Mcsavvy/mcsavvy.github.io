import type { VercelRequest, VercelResponse } from '@vercel/node'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const createApplication = vi.fn()
vi.mock('../_lib/pocketbase.js', () => ({ createApplication }))

const { default: handler } = await import('./apply')

const body = {
  business: 'Acme',
  type: 'Food and drink',
  what: 'Bread',
  city: 'Lagos',
  goal: 'Bookings',
  worth: '',
  content: 'Yes, ready',
  domain: '',
  name: 'Bimpe',
  whatsapp: '08031234567',
  email: '',
  referral: '',
  agree: 'yes',
  hp_url: '',
}

let n = 0
function call(over: { method?: string; body?: unknown; headers?: Record<string, string> } = {}) {
  // a fresh IP per call keeps the rate limiter out of the way unless a test wants it
  const req = {
    method: over.method ?? 'POST',
    body: 'body' in over ? over.body : body,
    headers: { host: 'site.test', 'x-real-ip': `10.0.0.${++n}`, ...over.headers },
  } as unknown as VercelRequest
  const out = { status: 0, json: undefined as unknown, headers: {} as Record<string, string> }
  const res = {
    setHeader: (k: string, v: string) => void (out.headers[k] = v),
    status(c: number) {
      out.status = c
      return this
    },
    json(j: unknown) {
      out.json = j
      return this
    },
  } as unknown as VercelResponse
  return handler(req, res).then(() => out)
}

beforeEach(() => {
  createApplication.mockReset().mockResolvedValue(undefined)
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('POST /api/free-websites/apply', () => {
  it('saves a valid application to PocketBase', async () => {
    const r = await call()
    expect(r.status).toBe(200)
    expect(createApplication).toHaveBeenCalledOnce()
    expect(createApplication.mock.calls[0][0]).toMatchObject({ business: 'Acme', agree: 'yes' })
  })

  it('returns 502 and logs the payload when the save fails', async () => {
    createApplication.mockRejectedValue(new Error('PocketBase 403'))
    const r = await call()
    expect(r.status).toBe(502)
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('NOT saved'), expect.stringContaining('Acme'))
  })

  it('fakes success for honeypot hits and stores nothing', async () => {
    const r = await call({ body: { ...body, hp_url: 'http://spam.example' } })
    expect(r.status).toBe(200)
    expect(createApplication).not.toHaveBeenCalled()
  })

  it('rejects invalid input with 400 and field errors', async () => {
    const r = await call({ body: { ...body, whatsapp: '123', agree: 'no' } })
    expect(r.status).toBe(400)
    expect(Object.keys((r.json as { errors: object }).errors)).toEqual(expect.arrayContaining(['whatsapp', 'agree']))
    expect(createApplication).not.toHaveBeenCalled()
  })

  it('accepts a JSON string body and rejects broken JSON', async () => {
    expect((await call({ body: JSON.stringify(body) })).status).toBe(200)
    expect((await call({ body: '{nope' })).status).toBe(400)
  })

  it('rejects other methods with 405', async () => {
    const r = await call({ method: 'GET' })
    expect(r.status).toBe(405)
    expect(r.headers.Allow).toBe('POST')
  })

  it('rejects a cross-origin request and accepts same-origin', async () => {
    expect((await call({ headers: { origin: 'https://evil.example' } })).status).toBe(403)
    expect((await call({ headers: { origin: 'https://site.test' } })).status).toBe(200)
  })

  it('rate limits by IP', async () => {
    const h = { 'x-real-ip': '9.9.9.9' }
    for (let i = 0; i < 5; i++) expect((await call({ headers: h })).status).toBe(200)
    const r = await call({ headers: h })
    expect(r.status).toBe(429)
    expect(Number(r.headers['Retry-After'])).toBeGreaterThan(0)
  })
})
