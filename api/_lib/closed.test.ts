import { describe, expect, it } from 'vitest'
import { CLOSES_AT, FORCE_CLOSED, isClosed } from './closed'

describe('isClosed', () => {
  it('closes at 23:59 WAT on 17 Oct 2026', () => {
    expect(new Date(CLOSES_AT).toISOString()).toBe('2026-10-17T22:59:00.000Z')
  })
  it('is closed from the deadline onwards, regardless of FORCE_CLOSED', () => {
    expect(isClosed(CLOSES_AT)).toBe(true)
    expect(isClosed(CLOSES_AT + 86_400_000)).toBe(true)
  })
  it('is open before the deadline only when not force-closed', () => {
    expect(isClosed(CLOSES_AT - 1)).toBe(FORCE_CLOSED)
  })
})
