import { describe, expect, it } from 'vitest'
import { isHoneypotFilled, validate } from './validate'

const good = {
  business: "Bímpé's Bakehouse",
  type: 'Food and drink',
  what: 'Fresh bread in Surulere',
  city: 'Lagos',
  goal: 'Bookings',
  worth: '',
  content: 'Yes, ready',
  domain: '',
  name: 'Bimpe A',
  whatsapp: '0803 123 4567',
  email: '',
  referral: '',
  agree: 'yes',
  submittedAt: '2026-10-12T10:00:00.000Z',
}

describe('validate', () => {
  it('accepts a complete application and ignores extra keys', () => {
    const r = validate(good)
    expect(r.ok).toBe(true)
    if (r.ok) expect('submittedAt' in r.data).toBe(false)
  })

  it.each(['business', 'type', 'what', 'city', 'goal', 'content', 'name', 'whatsapp'])('requires %s', (f) => {
    const r = validate({ ...good, [f]: '   ' })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors[f as keyof typeof r.errors]).toBeTruthy()
  })

  it('treats optional fields as optional', () => {
    const rest: Record<string, unknown> = { ...good }
    for (const k of ['worth', 'domain', 'email', 'referral']) delete rest[k]
    expect(validate(rest).ok).toBe(true)
  })

  it('needs 10 digits in WhatsApp', () => {
    expect(validate({ ...good, whatsapp: '0803 123 45' }).ok).toBe(false)
    expect(validate({ ...good, whatsapp: '+234 803 123 4567' }).ok).toBe(true)
  })

  it('requires agree === "yes"', () => {
    for (const agree of [undefined, '', 'no', true, 'YES']) expect(validate({ ...good, agree }).ok).toBe(false)
  })

  it('rejects a bad email but accepts an empty one', () => {
    expect(validate({ ...good, email: 'nope' }).ok).toBe(false)
    expect(validate({ ...good, email: 'a@b.co' }).ok).toBe(true)
  })

  it('rejects non-string values and over-long values', () => {
    expect(validate({ ...good, business: 5 }).ok).toBe(false)
    expect(validate({ ...good, business: 'x'.repeat(81) }).ok).toBe(false)
  })

  it('strips control characters and trims', () => {
    const r = validate({ ...good, business: '  Acme\u0000\u0007 ' })
    expect(r.ok && r.data.business).toBe('Acme')
  })

  it('rejects non-objects', () => {
    for (const b of [null, undefined, 'x', 3, []]) expect(validate(b).ok).toBe(false)
  })
})

describe('isHoneypotFilled', () => {
  it('only trips on a non-empty hp_url string', () => {
    expect(isHoneypotFilled({ hp_url: 'http://spam' })).toBe(true)
    expect(isHoneypotFilled({ hp_url: '' })).toBe(false)
    expect(isHoneypotFilled({})).toBe(false)
    expect(isHoneypotFilled(null)).toBe(false)
  })
})
