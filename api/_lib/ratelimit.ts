// Best-effort in-memory rate limit. Each warm serverless instance keeps its own
// counters, so this stops casual spam and double-submits, not a distributed attack.
// For a hard limit, add a Vercel Firewall rate-limit rule (see SETUP.md).

export type Limiter = (key: string, now?: number) => { allowed: boolean; retryAfter: number }

export function createLimiter(max: number, windowMs: number): Limiter {
  const hits = new Map<string, number[]>()
  return (key, now = Date.now()) => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
    if (recent.length >= max) {
      hits.set(key, recent)
      return { allowed: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) }
    }
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k)
    }
    return { allowed: true, retryAfter: 0 }
  }
}
