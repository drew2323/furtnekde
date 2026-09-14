import { expect, test } from '@playwright/test'
import { getPayload } from 'payload'

import config from '../../src/payload.config.js'

const richText = (text: string) => ({
  root: {
    children: [{
      children: [{ detail: 0, format: 0, mode: 'normal' as const, style: '', text, type: 'text', version: 1 }],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'paragraph',
      version: 1,
    }],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
})

const routes = [
  { path: '/', heading: /S malými dětmi můžete cestovat/ },
  { path: '/kurzy/letadlem-s-miminkem-a-malymi-detmi', heading: 'Letadlem s miminkem a malými dětmi' },
  { path: '/blog/vzorovy-clanek', heading: 'Co si pohlídat před prvním letem s dítětem' },
]

test.describe('První schvalovací prototyp', () => {
  for (const route of routes) {
    test(`${route.path} vrací 200 a nemá horizontální overflow`, async ({ page }) => {
      for (const viewport of [{ width: 375, height: 812 }, { width: 1366, height: 768 }]) {
        await page.setViewportSize(viewport)
        const response = await page.goto(`http://localhost:3000${route.path}`)
        expect(response?.status()).toBe(200)
        await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      }
    })
  }

  test('homepage vysvětluje nabídku a rozlišuje tři cesty', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByRole('link', { name: 'Vybrat, s čím potřebujete pomoct' })).toBeVisible()
    await expect(page.getByText('Připravte se na cestu letadlem')).toBeVisible()
    await expect(page.getByText('Poskládejte si dovolenou po svém')).toBeVisible()
    await expect(page.getByText('Nechte si připravit plán na míru')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Vybrané články' })).toBeVisible()
  })

  test('kurz uvádí schválenou cenu a nezobrazuje falešný úspěch', async ({ page }) => {
    await page.goto('http://localhost:3000/kurzy/letadlem-s-miminkem-a-malymi-detmi')
    await expect(page.getByText('1 390 Kč')).toHaveCount(2)
    await expect(page.getByText('jednorázově · bez splátek')).toBeVisible()
    await expect(page.getByText('14 praktických částí', { exact: true }).first()).toBeVisible()
    await page.getByRole('button', { name: 'Přejít k objednávce kurzu' }).click()
    await expect(page.getByText(/Objednávka není v prototypu aktivní/)).toBeVisible()
  })

  test('článek má obsah, hierarchii, zdroje, FAQ a newsletter', async ({ page }) => {
    await page.goto('http://localhost:3000/blog/vzorovy-clanek')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.getByRole('navigation', { name: 'Obsah článku' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Zdroje a datum kontroly' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Časté dotazy' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Další praktické čtení do schránky' })).toBeVisible()
  })

  test('publikované CMS bloky nahradí fallback a zapojí pole všech tří rout', async ({ page }) => {
    const payload = await getPayload({ config })
    const cmsPages = [
      { slug: '/', pageType: 'home' as const, title: 'CMS domovská stránka', eyebrow: 'CMS homepage', marker: 'Editovatelný obsah homepage' },
      { slug: 'kurzy/letadlem-s-miminkem-a-malymi-detmi', pageType: 'course' as const, title: 'CMS kurz létání', eyebrow: 'CMS kurz', marker: 'Editovatelný obsah kurzu', coursePrice: 1390 },
      { slug: 'blog/vzorovy-clanek', pageType: 'article' as const, title: 'CMS článek', eyebrow: 'CMS rubrika', marker: 'Editovatelný obsah článku', substantiveUpdatedAt: '2025-04-03T00:00:00.000Z' },
    ]
    const originals = await payload.find({ collection: 'pages', limit: 10, where: { slug: { in: cmsPages.map(({ slug }) => slug) } } })

    try {
      await payload.delete({ collection: 'pages', where: { slug: { in: cmsPages.map(({ slug }) => slug) } } })
      for (const cmsPage of cmsPages) {
        await payload.create({
          collection: 'pages',
          draft: false,
          data: {
            ...cmsPage,
            _status: 'published',
            layout: [{ blockType: 'text', heading: cmsPage.marker, content: richText(`Text: ${cmsPage.marker}`) }],
          },
        })
      }

      await page.goto('http://localhost:3000')
      await expect(page.getByText('CMS homepage')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Editovatelný obsah homepage' })).toBeVisible()
      await expect(page.getByText('Připravte se na cestu letadlem')).toHaveCount(0)

      await page.goto('http://localhost:3000/kurzy/letadlem-s-miminkem-a-malymi-detmi')
      await expect(page.getByText('CMS kurz', { exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Editovatelný obsah kurzu' })).toBeVisible()
      await expect(page.getByText('Pro koho kurz je')).toHaveCount(0)
      await expect(page.getByText('1 390 Kč')).toHaveCount(1)

      await page.goto('http://localhost:3000/blog/vzorovy-clanek')
      await expect(page.getByText('CMS rubrika', { exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Editovatelný obsah článku' })).toBeVisible()
      await expect(page.getByRole('navigation', { name: 'Obsah článku' })).toHaveCount(0)
      await expect(page.locator('time')).toHaveAttribute('datetime', '2025-04-03')
      await expect(page.locator('time')).toHaveText('3. dubna 2025')
    } finally {
      await payload.delete({ collection: 'pages', where: { slug: { in: cmsPages.map(({ slug }) => slug) } } })
      for (const original of originals.docs) {
        await payload.create({
          collection: 'pages',
          draft: original._status === 'draft',
          data: {
            _status: original._status,
            content: original.content,
            coursePrice: original.coursePrice,
            eyebrow: original.eyebrow,
            layout: original.layout,
            pageType: original.pageType,
            primaryCta: original.primaryCta,
            slug: original.slug,
            substantiveUpdatedAt: original.substantiveUpdatedAt,
            summary: original.summary,
            title: original.title,
          },
        })
      }
    }
  })

  test('náhled je noindex a focus je viditelný', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
    expect(await focused.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none')
  })
})
