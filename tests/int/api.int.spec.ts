import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('does not expose draft pages to anonymous readers', async () => {
    const slug = `draft-access-${Date.now()}`
    const draft = await payload.create({
      collection: 'pages',
      data: { pageType: 'standard', slug, title: 'Neveřejný draft' },
      draft: true,
    })

    try {
      const result = await payload.find({
        collection: 'pages',
        draft: true,
        overrideAccess: false,
        where: { id: { equals: draft.id } },
      })
      expect(result.docs).toHaveLength(0)
    } finally {
      await payload.delete({ collection: 'pages', id: draft.id })
    }
  })

  it('rejects unsafe CMS CTA destinations', async () => {
    for (const [index, href] of ['data:text/html,<script>alert(1)</script>', '/\\evil.example'].entries()) {
      await expect(payload.create({
        collection: 'pages',
        data: {
          pageType: 'standard',
          primaryCta: { href, label: 'Nebezpečný odkaz' },
          slug: `unsafe-link-${Date.now()}-${index}`,
          title: 'Neplatný odkaz',
        },
      })).rejects.toThrow()
    }
  })
})
