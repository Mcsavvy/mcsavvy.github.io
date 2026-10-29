import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { clientSites } from './content'

describe('clientSites', () => {
  it('lists three live sites with a thumbnail on disk', () => {
    expect(clientSites).toHaveLength(3)
    for (const c of clientSites) {
      expect(c.href).toBe(`https://${c.host}`)
      expect(existsSync(`public${c.image}`)).toBe(true)
    }
  })
  it('never labels the sites as free', () => {
    expect(JSON.stringify(clientSites).toLowerCase()).not.toContain('free')
  })
})
