import { connection } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

export async function getPageBySlug(slug: string) {
  await connection()
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
  })
  return result.docs[0]
}

export async function getNavigationPages() {
  await connection()
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    limit: 20,
    sort: 'createdAt',
    where: { _status: { equals: 'published' } },
  })
  return result.docs
}
