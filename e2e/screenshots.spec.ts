import { test, expect, en, gotoApp, posts } from './fixtures'

/**
 * Produces the images the README's testing section links to. Not assertions —
 * run with `npm run test:e2e:screenshots` after a UI change to refresh them.
 */
const out = 'docs/screenshots'

test.describe('screenshots', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'one browser is enough')

  test('desktop, light and dark', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 900, 'desktop only')

    for (const path of ['/', '/blog', `/blog/${posts[0].slug}`, '/about']) {
      const name = path === '/' ? 'landing' : path.slice(1).replace(/\//g, '-')
      await gotoApp(page, path)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(700) // let the entrance animations settle
      await page.screenshot({ path: `${out}/${name}-light.png`, fullPage: false })
    }

    await gotoApp(page, '/')
    await page.getByRole('button', { name: en.theme.toDark }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(700)
    await page.screenshot({ path: `${out}/landing-dark.png` })
  })

  test('mobile, including the open menu', async ({ page }) => {
    test.skip(page.viewportSize()!.width >= 900, 'mobile only')

    await gotoApp(page, '/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(700)
    await page.screenshot({ path: `${out}/landing-mobile.png` })

    await page.getByRole('button', { name: en.nav.openMenu }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${out}/menu-mobile.png` })

    await gotoApp(page, '/blog')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(700)
    await page.screenshot({ path: `${out}/blog-mobile.png` })
  })

  test('the contact form in its error state', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 900, 'desktop only')

    await gotoApp(page, '/about')
    const form = page.getByRole('form', { name: en.contact.contactForm })
    await form.getByRole('button', { name: en.contact.form.send }).click()
    await expect(form.getByRole('alert')).toHaveCount(3)
    await form.scrollIntoViewIfNeeded()
    await page.screenshot({ path: `${out}/contact-errors.png` })
  })
})
