import { expect, test } from '@playwright/test'
import { getPayload } from 'payload'

import config from '../../src/payload.config.js'
import type { Page } from '../../src/payload-types.js'

const testPageTitle = 'Homepage E2E'
const testSubpageTitle = 'Features E2E'

const richText = (text: string) => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
})

test.describe('Frontend', () => {
  let displacedPages: Page[] = []

  test.beforeEach(async () => {
    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'pages',
      limit: 100,
      where: { slug: { in: ['/', 'features-e2e'] } },
    })
    displacedPages = existing.docs
    await payload.delete({
      collection: 'pages',
      where: { slug: { in: ['/', 'features-e2e'] } },
    })
  })

  test.afterEach(async () => {
    const payload = await getPayload({ config })
    await payload.delete({
      collection: 'pages',
      where: { slug: { in: ['/', 'features-e2e'] } },
    })
    for (const savedPage of displacedPages) {
      await payload.create({
        collection: 'pages',
        data: { slug: savedPage.slug, title: savedPage.title, content: savedPage.content },
      })
    }
  })

  test('renders the exact fallback when no Page exists', async ({ page }) => {
    const payload = await getPayload({ config })
    const existing = await payload.find({ collection: 'pages', limit: 100 })
    try {
      await payload.delete({ collection: 'pages', where: {} })
      const response = await page.goto('http://localhost:3000')
      expect(response?.status()).toBe(200)
      await expect(page.locator('.home')).toHaveText('Hello world')
    } finally {
      for (const savedPage of existing.docs) {
        await payload.create({
          collection: 'pages',
          data: { slug: savedPage.slug, title: savedPage.title, content: savedPage.content },
        })
      }
    }
  })

  test('renders routes, reflects edits, and has no horizontal overflow', async ({ page }) => {
    const payload = await getPayload({ config })
    const createdPage = await payload.create({
      collection: 'pages',
      data: {
        slug: '/',
        title: testPageTitle,
        content: richText('Initial homepage content'),
      },
    })
    await payload.create({
      collection: 'pages',
      data: { slug: 'features-e2e', title: testSubpageTitle, content: richText('Subpage content') },
    })

    await page.goto('http://localhost:3000')
    await expect(page.getByRole('heading', { level: 1, name: testPageTitle })).toBeVisible()
    await expect(page.getByText('Initial homepage content')).toBeVisible()

    const subpageResponse = await page.goto('http://localhost:3000/features-e2e')
    expect(subpageResponse?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1, name: testSubpageTitle })).toBeVisible()
    await expect(page.getByText('Subpage content')).toBeVisible()

    await payload.update({
      collection: 'pages',
      id: createdPage.id,
      data: { title: 'Edited homepage title', content: richText('Edited homepage content') },
    })

    await page.goto('http://localhost:3000')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Edited homepage title' }),
    ).toBeVisible()
    await expect(page.getByText('Edited homepage content')).toBeVisible()

    for (const viewport of [
      { width: 375, height: 667 },
      { width: 1366, height: 768 },
    ]) {
      await page.setViewportSize(viewport)
      await page.goto('http://localhost:3000/features-e2e')
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true)
    }
  })
})
