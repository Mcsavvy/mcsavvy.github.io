import type { Application } from './validate.js'

const COLLECTION = 'free_websites_applications'

let cached: { token: string; exp: number } | null = null

function baseUrl(): string {
  const url = process.env.POCKETBASE_URL
  if (!url) throw new Error('POCKETBASE_URL is not set')
  return url.replace(/\/+$/, '')
}

/** Reads the exp claim (seconds) from a JWT without verifying it. Returns 0 if unreadable. */
export function tokenExpiry(token: string): number {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString()).exp ?? 0
  } catch {
    return 0
  }
}

async function login(): Promise<string> {
  const identity = process.env.POCKETBASE_EMAIL
  const password = process.env.POCKETBASE_PASSWORD
  if (!identity || !password) throw new Error('POCKETBASE_EMAIL / POCKETBASE_PASSWORD are not set')
  const res = await fetch(`${baseUrl()}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity, password }),
    signal: AbortSignal.timeout(8_000),
  })
  if (!res.ok) throw new Error(`PocketBase login ${res.status}`)
  const { token } = (await res.json()) as { token: string }
  cached = { token, exp: tokenExpiry(token) }
  return token
}

async function getToken(): Promise<string> {
  // reuse the token on warm instances, refresh a minute before it expires
  if (cached && cached.exp * 1000 - Date.now() > 60_000) return cached.token
  return login()
}

/** The fields stored for one application. `created` is set by PocketBase. */
export function toRecord(a: Application) {
  return {
    business: a.business,
    type: a.type,
    what: a.what,
    city: a.city,
    goal: a.goal,
    worth: a.worth,
    content: a.content,
    domain: a.domain,
    name: a.name,
    whatsapp: a.whatsapp,
    email: a.email,
    referral: a.referral,
    agree: true,
  }
}

/** Creates one record in the "applications" collection (superuser only, rules are locked). */
export async function createApplication(a: Application): Promise<void> {
  const post = async (token: string) =>
    fetch(`${baseUrl()}/api/collections/${COLLECTION}/records`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(toRecord(a)),
      signal: AbortSignal.timeout(8_000),
    })

  let res = await post(await getToken())
  if (res.status === 401 || res.status === 403) res = await post(await login()) // token revoked or rotated
  if (!res.ok) throw new Error(`PocketBase ${res.status}: ${(await res.text()).slice(0, 300)}`)
}

export function adminLink(): string | null {
  const url = process.env.POCKETBASE_URL
  return url ? `${url.replace(/\/+$/, '')}/_/#/collections?collection=${COLLECTION}` : null
}
