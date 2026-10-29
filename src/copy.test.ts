import { describe, expect, it } from 'vitest'
import { engagements, featured, receipts } from './content'

describe('confirmed copy facts', () => {
  it('states the PLSOM figure the same way in the stat and the story', () => {
    expect(receipts[0].big).toBe('150+')
    expect(featured[0].story).toContain('<strong>150+ students</strong>')
    expect(featured[0].story).not.toMatch(/hundreds/i)
  })
  it('prices both engagements', () => {
    expect(engagements.map((e) => e.price)).toEqual(['Projects from $10,000', 'From $2,500 a month'])
  })
})
