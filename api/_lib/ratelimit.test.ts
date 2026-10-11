import { expect, it } from 'vitest'
import { createLimiter } from './ratelimit'

it('blocks after max hits in the window and recovers after it', () => {
  const l = createLimiter(2, 1000)
  expect(l('a', 0).allowed).toBe(true)
  expect(l('a', 100).allowed).toBe(true)
  const blocked = l('a', 200)
  expect(blocked.allowed).toBe(false)
  expect(blocked.retryAfter).toBe(1)
  expect(l('b', 200).allowed).toBe(true)
  expect(l('a', 1001).allowed).toBe(true)
})
