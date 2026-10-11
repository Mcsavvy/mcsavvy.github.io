// Server-side validation for the "5 Free Websites" application.
// Field names match the JSON the form in public/free-websites/index.html sends.

export type Application = {
  business: string
  type: string
  what: string
  city: string
  goal: string
  worth: string
  content: string
  domain: string
  name: string
  whatsapp: string
  email: string
  referral: string
  agree: 'yes'
}

type Field = keyof Omit<Application, 'agree'>

const LIMITS: Record<Field, number> = {
  business: 80,
  type: 60,
  what: 160,
  city: 60,
  goal: 80,
  worth: 40,
  content: 40,
  domain: 80,
  name: 80,
  whatsapp: 20,
  email: 120,
  referral: 160,
}

const REQUIRED: Field[] = ['business', 'type', 'what', 'city', 'goal', 'content', 'name', 'whatsapp']

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Result =
  | { ok: true; data: Application }
  | { ok: false; errors: Partial<Record<Field | 'agree', string>> }

/** Name of the honeypot input. Real people never see it, bots fill it. */
export const HONEYPOT = 'hp_url'

export function isHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false
  const v = (body as Record<string, unknown>)[HONEYPOT]
  return typeof v === 'string' && v.trim() !== ''
}

function clean(v: unknown): string | null {
  if (v === undefined || v === null) return ''
  if (typeof v !== 'string') return null
  return v.replace(CONTROL, '').trim()
}

export function validate(body: unknown): Result {
  const errors: Partial<Record<Field | 'agree', string>> = {}
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, errors: { business: 'Body must be a JSON object.' } }
  }
  const src = body as Record<string, unknown>
  const out = {} as Record<Field, string>

  for (const f of Object.keys(LIMITS) as Field[]) {
    const v = clean(src[f])
    if (v === null) {
      errors[f] = 'Must be text.'
      out[f] = ''
      continue
    }
    if (v.length > LIMITS[f]) errors[f] = `Max ${LIMITS[f]} characters.`
    if (REQUIRED.includes(f) && v === '') errors[f] = 'Required.'
    out[f] = v
  }

  if (!errors.whatsapp && out.whatsapp.replace(/\D/g, '').length < 10) {
    errors.whatsapp = 'Enter at least 10 digits.'
  }
  if (!errors.email && out.email !== '' && !EMAIL.test(out.email)) {
    errors.email = 'Invalid email address.'
  }
  if (src.agree !== 'yes') errors.agree = 'Agreement is required.'

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true, data: { ...out, agree: 'yes' } }
}
