import { test, expect, en, gotoApp, desktopOnly, posts } from './fixtures'

test.describe('deep links', () => {
  // The postbuild step emits a real index.html per route, so these must be 200,
  // not the 404.html fallback — a 404 status keeps the page out of search results.
  for (const path of ['/', '/about', '/blog', `/blog/${posts[0].slug}`]) {
    test(`${path} responds 200`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status(), `${path} should be 200`).toBe(200)
      await expect(page.getByRole('banner')).toBeVisible()
    })
  }

  test('an unknown route renders the 404 page', async ({ page }) => {
    await page.goto('/definitely-not-a-page')
    await expect(page.getByRole('heading', { level: 1, name: en.notFound.title })).toBeVisible()
    await expect(page.getByText('404')).toBeVisible()
  })

  test('the 404 page links back into the site', async ({ page }) => {
    await page.goto('/definitely-not-a-page')
    await page.getByRole('link', { name: en.notFound.home }).click()
    await expect(page).toHaveURL(/\/$/)
  })
})

test.describe('navbar', () => {
  test('marks only the current route with aria-current', async ({ page }) => {
    desktopOnly(page)
    await gotoApp(page, '/blog')
    const nav = page.getByRole('navigation', { name: en.nav.mainNav })

    await expect(nav.getByRole('link', { name: en.nav.blog })).toHaveAttribute('aria-current', 'page')
    await expect(nav.getByRole('link', { name: en.nav.about, exact: true })).not.toHaveAttribute('aria-current')
  })

  test('the logo returns to the landing page', async ({ page }) => {
    await gotoApp(page, '/blog')
    await page.getByRole('link', { name: en.nav.backToTop }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('gains a background once the page is scrolled', async ({ page }) => {
    await gotoApp(page, '/blog')
    const header = page.getByRole('banner')

    await expect(header).toHaveClass(/bg-transparent/)
    await page.mouse.wheel(0, 400)
    await expect(header).not.toHaveClass(/bg-transparent/)
  })

  test('scroll position resets on navigation', async ({ page }) => {
    desktopOnly(page)
    await gotoApp(page, '/blog')
    await page.mouse.wheel(0, 800)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

    await page.getByRole('navigation', { name: en.nav.mainNav })
      .getByRole('link', { name: en.nav.about, exact: true })
      .click()

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50)
  })
})

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('opens, exposes modal semantics, and locks body scroll', async ({ page }) => {
    await gotoApp(page, '/')
    const toggle = page.getByRole('button', { name: en.nav.openMenu })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()
    const dialog = page.getByRole('dialog', { name: en.nav.mobileNav })
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(page.getByRole('button', { name: en.nav.closeMenu })).toHaveAttribute('aria-expanded', 'true')
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden')
  })

  test('navigates and closes itself', async ({ page }) => {
    await gotoApp(page, '/')
    await page.getByRole('button', { name: en.nav.openMenu }).click()
    await page.getByRole('dialog').getByRole('link', { name: en.nav.blog }).click()

    await expect(page).toHaveURL(/\/blog\/?$/)
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('')
  })

  test('desktop links are hidden at mobile width', async ({ page }) => {
    await gotoApp(page, '/')
    const nav = page.getByRole('navigation', { name: en.nav.mainNav })
    await expect(nav.getByRole('link', { name: en.nav.blog })).toBeHidden()
  })
})
