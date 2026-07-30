import { test, expect, en, es, gotoApp } from './fixtures'

test.describe('theme', () => {
  test('starts light, switches to dark and survives a reload', async ({ page }) => {
    await gotoApp(page, '/')
    await expect(page.locator('html')).toHaveClass(/light/)

    await page.getByRole('button', { name: en.theme.toDark }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.locator('html')).not.toHaveClass(/light/)
    await expect(page.getByRole('button', { name: en.theme.toLight })).toBeVisible()

    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('actually repaints — the background colour changes', async ({ page }) => {
    await gotoApp(page, '/')
    const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    const light = await bg()

    await page.getByRole('button', { name: en.theme.toDark }).click()
    await expect.poll(bg).not.toBe(light)
  })

  test('paints the stored theme before first paint, with no light flash', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
    await page.goto('/')
    // The inline script in index.html runs before React, so the class is already there.
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})

test.describe('language', () => {
  test('switches the whole UI to spanish and survives a reload', async ({ page }) => {
    await gotoApp(page, '/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    await page.getByRole('button', { name: 'Switch to Spanish' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.getByRole('navigation', { name: es.nav.mainNav })).toBeVisible()
    await expect(page.getByText(es.landing.lede)).toBeVisible()

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.getByText(es.landing.lede)).toBeVisible()
  })

  test('translates the blog index too', async ({ page }) => {
    await gotoApp(page, '/blog')
    await page.getByRole('button', { name: 'Switch to Spanish' }).click()

    await expect(page.getByRole('heading', { level: 1, name: es.blog.title })).toBeVisible()
    await expect(page.locator('.post-row').first()).toContainText(es.blog.minRead)
  })

  test('serves the spanish translation of a post that has one', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('language', 'es'))
    await page.goto('/blog/hiring-mobile-engineers')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Qué busco cuando entrevisto a un ingeniero mobile'
    )
    await expect(page.getByText(es.blog.onlyEnglish)).toBeHidden()
  })

  test('falls back to english and says so when there is no translation', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('language', 'es'))
    await page.goto('/blog/boring-releases')

    await expect(page.getByText(es.blog.onlyEnglish)).toBeVisible()
  })

  test('theme and language are independent', async ({ page }) => {
    await gotoApp(page, '/')
    await page.getByRole('button', { name: 'Switch to Spanish' }).click()
    await page.getByRole('button', { name: es.theme.toDark }).click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
