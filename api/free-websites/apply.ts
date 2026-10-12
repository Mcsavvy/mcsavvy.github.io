import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendNotification } from '../_lib/email.js'
import { createApplication } from '../_lib/pocketbase.js'
import { createLimiter } from '../_lib/ratelimit.js'
import { isHoneypotFilled, validate } from '../_lib/validate.js'

// 5 applications per IP per 10 minutes (per warm instance, see ratelimit.ts).
const limit = createLimiter(5, 10 * 60 * 1000)

function clientIp(req: VercelRequest): string {
  const h = (n: string) => {
    const v = req.headers[n]
    return Array.isArray(v) ? v[0] : v
  }
  return h('x-vercel-forwarded-for') || h('x-real-ip') || h('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
}

function message(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // Same-origin only. Requests without an Origin header (curl, server-to-server) are allowed through
  // and are still validated and rate limited.
  const origin = req.headers.origin
  if (origin) {
    let host = ''
    try {
      host = new URL(origin).host
    } catch {
      /* falls through to rejection */
    }
    if (host !== req.headers.host) return res.status(403).json({ ok: false, error: 'Forbidden' })
  }

  const rl = limit(clientIp(req))
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfter))
    return res.status(429).json({ ok: false, error: 'Too many applications. Try again later.' })
  }

  let body: unknown = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' })
    }
  }

  // Bots that fill the hidden field get a fake success and nothing is stored.
  if (isHoneypotFilled(body)) return res.status(200).json({ ok: true })

  const result = validate(body)
  if (!result.ok) return res.status(400).json({ ok: false, errors: result.errors })

  const submitted = new Date()
  const app = result.data

  let saveError: string | null = null
  try {
    await createApplication(app)
  } catch (e) {
    saveError = message(e)
    console.error('[free-websites] PocketBase save failed:', saveError)
  }

  let emailError: string | null = null
  try {
    await sendNotification(app, submitted, saveError)
  } catch (e) {
    emailError = message(e)
    console.error('[free-websites] email failed:', emailError)
  }

  if (saveError && emailError) {
    // Last resort so the application can still be recovered from the function logs.
    console.error('[free-websites] application NOT saved anywhere:', JSON.stringify({ submittedAt: submitted.toISOString(), ...app }))
    return res.status(502).json({ ok: false, error: 'Could not save the application' })
  }
  return res.status(200).json({ ok: true })
}
