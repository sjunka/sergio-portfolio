import { test, expect, en, es, gotoApp, untranslatedSlugs } from './fixtures'

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

  test('repaints the landing phone too, not just the page around it', async ({ page }) => {
    await gotoApp(page, '/')
    // The phone screen used to be hardcoded dark, so light mode left a dark slab
    // on a white page. Its ink and glass are theme tokens now; both must flip.
    const device = () =>
      page.evaluate(() => {
        const el = document.querySelector('.phone')!
        const s = getComputedStyle(el)
        return { ink: s.getPropertyValue('--phone-ink').trim(), glass: s.getPropertyValue('--phone-glass').trim() }
      })
    const light = await device()
    expect(light.ink).not.toBe('')

    await page.getByRole('button', { name: en.theme.toDark }).click()
    await expect.poll(async () => (await device()).ink).not.toBe(light.ink)
    expect((await device()).glass).not.toBe(light.glass)
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
    const [slug] = untranslatedSlugs()
    test.skip(!slug, 'every post is translated, so the banner has nothing to fire on')

    await page.addInitScript(() => localStorage.setItem('language', 'es'))
    await page.goto(`/blog/${slug}`)

    await expect(page.getByText(es.blog.onlyEnglish)).toBeVisible()
  })

  test('shows no english-only banner on a translated post', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('language', 'es'))
    await page.goto('/blog/mape-k-loop')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('MAPE-K')
    await expect(page.getByText(es.blog.onlyEnglish)).toBeHidden()
  })

  test('theme and language are independent', async ({ page }) => {
    await gotoApp(page, '/')
    await page.getByRole('button', { name: 'Switch to Spanish' }).click()
    await page.getByRole('button', { name: es.theme.toDark }).click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
