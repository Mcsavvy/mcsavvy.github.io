import type { Application } from './validate.js'

const COLLECTION = 'free_websites_applications'

/**
 * The collection's create rule requires this header to equal a shared secret:
 *   @request.headers.x_free_websites_key = "<secret>" && @request.body.decision:isset = false
 * Every other rule is empty (superuser only), so the secret can only create records here.
 */
export const KEY_HEADER = 'X-Free-Websites-Key'

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

export async function createApplication(a: Application): Promise<void> {
  const url = process.env.POCKETBASE_URL
  const key = process.env.POCKETBASE_CREATE_KEY
  if (!url) throw new Error('POCKETBASE_URL is not set')
  if (!key) throw new Error('POCKETBASE_CREATE_KEY is not set')

  const res = await fetch(`${url.replace(/\/+$/, '')}/api/collections/${COLLECTION}/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', [KEY_HEADER]: key },
    body: JSON.stringify(toRecord(a)),
    signal: AbortSignal.timeout(8_000),
  })
  if (!res.ok) throw new Error(`PocketBase ${res.status}: ${(await res.text()).slice(0, 300)}`)
}
