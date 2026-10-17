// Applications close at the deadline on the page, or earlier if FORCE_CLOSED is true.
// To reopen: set FORCE_CLOSED = false and move CLOSES_AT, and remove class="closed" from <html> in
// public/free-websites/index.html.

export const CLOSES_AT = Date.parse('2026-10-17T23:59:00+01:00') // Sat 17 Oct 2026, 23:59 WAT

/** Closed by hand ahead of the deadline. */
export const FORCE_CLOSED = true

export function isClosed(now: number = Date.now()): boolean {
  return FORCE_CLOSED || now >= CLOSES_AT
}
