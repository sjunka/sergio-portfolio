import { test, expect, en, gotoApp, desktopOnly } from './fixtures'

test.describe('landing page', () => {
  test('renders the hero headline, lede and both calls to action', async ({ page }) => {
    await gotoApp(page, '/')

    await expect(page.getByRole('heading', { level: 1 })).toContainText(en.landing.headlineB)
    await expect(page.getByText(en.landing.lede)).toBeVisible()
    await expect(page.getByRole('link', { name: en.landing.readWriting })).toBeVisible()
    await expect(page.getByRole('link', { name: en.landing.aboutMe })).toBeVisible()
  })

  test('has exactly one h1', async ({ page }) => {
    await gotoApp(page, '/')
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('exposes the landmark structure a screen reader navigates by', async ({ page }) => {
    await gotoApp(page, '/')

    await expect(page.getByRole('banner')).toHaveCount(1)
    await expect(page.getByRole('contentinfo')).toHaveCount(1)
    await expect(page.getByRole('main')).toHaveCount(1)
    await expect(page.getByRole('navigation', { name: en.nav.mainNav })).toBeVisible()
  })

  test('the primary CTA goes to the blog', async ({ page }) => {
    await gotoApp(page, '/')
    await page.getByRole('link', { name: en.landing.readWriting }).click()

    await expect(page).toHaveURL(/\/blog\/?$/)
    await expect(page.getByRole('heading', { level: 1, name: en.blog.title })).toBeVisible()
  })

  test('the secondary CTA goes to the about page', async ({ page }) => {
    await gotoApp(page, '/')
    await page.getByRole('link', { name: en.landing.aboutMe }).click()

    await expect(page).toHaveURL(/\/about\/?$/)
  })

  test('offers a downloadable resume link', async ({ page }) => {
    desktopOnly(page)
    await gotoApp(page, '/')
    const resume = page.getByRole('link', { name: en.nav.downloadResumePdf })
    await expect(resume).toHaveAttribute('href', /\.pdf$/)
    await expect(resume).toHaveAttribute('download', '')
  })

  test('loads without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => msg.type() === 'error' && errors.push(msg.text()))
    page.on('pageerror', err => errors.push(err.message))

    await gotoApp(page, '/')
    await page.waitForLoadState('networkidle')

    expect(errors).toEqual([])
  })
})
