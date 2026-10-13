import { expect, test } from '@playwright/test'

const frontendBaseUrl = process.env.TEST_BASE_URL ?? 'http://localhost:3000'

const routes = [
  { path: '/dashboard', heading: 'Dobré ráno, Davide.' },
  { path: '/analytics', heading: 'Firma v číslech' },
  { path: '/activity', heading: 'Aktivita a zakázky' },
  { path: '/personal', heading: 'Peníze s nadhledem' },
  { path: '/settings', heading: 'Nastavení' },
]

test.describe('Dashboard', () => {
  for (const route of routes) {
    test(`${route.path} renders successfully`, async ({ page }) => {
      const response = await page.goto(`${frontendBaseUrl}${route.path}`)
      expect(response?.status()).toBe(200)
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()
      await expect(page.getByText('Demo režim', { exact: true })).toBeVisible()
    })
  }

  test('switches navigation without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(`${frontendBaseUrl}/dashboard`)
    await expect(page.getByRole('navigation', { name: 'Mobilní navigace' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Hlavní navigace' })).toBeHidden()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)

    await page.setViewportSize({ width: 1366, height: 768 })
    await expect(page.getByRole('navigation', { name: 'Hlavní navigace' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Mobilní navigace' })).toBeHidden()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
  })
})
