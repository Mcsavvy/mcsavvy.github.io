import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { reviews } from './content'

describe('reviews', () => {
  it('every card has a quote, reviewer, https website and an existing photo', () => {
    expect(reviews.length).toBeGreaterThanOrEqual(2)
    for (const r of reviews) {
      expect(r.quote.trim()).not.toBe('')
      expect(r.name.trim()).not.toBe('')
      expect(r.site).toMatch(/^https:\/\//)
      for (const img of [r.photo, r.logo]) expect(existsSync(join(__dirname, '..', 'public', img))).toBe(true)
    }
  })

  it('has no filler: quotes stay short enough for a marquee card', () => {
    for (const r of reviews) expect(r.quote.length).toBeLessThanOrEqual(190)
  })

  it('alternates each reviewer between photo and logo avatars', () => {
    for (const org of new Set(reviews.map((r) => r.org))) {
      const kinds = new Set(reviews.filter((r) => r.org === org).map((r) => r.avatar))
      expect(kinds).toEqual(new Set(['photo', 'logo']))
    }
  })
})
