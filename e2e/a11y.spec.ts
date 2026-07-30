import { test, expect, en, gotoApp, posts } from './fixtures'

const pages = ['/', '/about', '/blog', `/blog/${posts[0].slug}`]

test.describe('accessibility', () => {
  for (const path of pages) {
    test(`${path} has one h1 and no skipped heading levels`, async ({ page }) => {
      await gotoApp(page, path)
      await expect(page.locator('h1')).toHaveCount(1)

      const levels = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll(els =>
        els.map(el => Number(el.tagName[1]))
      )
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1], `jump at heading ${i} on ${path}`).toBeLessThanOrEqual(1)
      }
    })

    test(`${path} gives every image an alt attribute`, async ({ page }) => {
      await gotoApp(page, path)
      const missing = await page.locator('img:not([alt])').count()
      expect(missing).toBe(0)
    })

    test(`${path} labels every icon-only control`, async ({ page }) => {
      await gotoApp(page, path)
      const unlabelled = await page.getByRole('button').evaluateAll(els =>
        els
          .filter(el => !el.textContent?.trim() && !el.getAttribute('aria-label'))
          .map(el => el.outerHTML.slice(0, 80))
      )
      expect(unlabelled).toEqual([])
    })
  }

  test('the skip link is the first tab stop and moves focus to main', async ({ page }) => {
    await gotoApp(page, '/')
    await page.keyboard.press('Tab')

    const skip = page.getByRole('link', { name: en.nav.skipToContent })
    await expect(skip).toBeFocused()
    await skip.press('Enter')
    await expect(page).toHaveURL(/#main-content$/)
    await expect(page.locator('#main-content')).toBeAttached()
  })

  test('the whole navbar is reachable by keyboard', async ({ page }) => {
    await gotoApp(page, '/blog')

    const reached: string[] = []
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      reached.push(await page.evaluate(() => document.activeElement?.textContent?.trim() ?? ''))
    }
    expect(reached.join(' ')).toContain(en.nav.blog)
  })

  test('the theme toggle is operable with the keyboard alone', async ({ page }) => {
    await gotoApp(page, '/')
    await page.getByRole('button', { name: en.theme.toDark }).focus()
    await page.keyboard.press('Enter')

    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('form errors are announced as alerts', async ({ page }) => {
    await gotoApp(page, '/about')
    const form = page.getByRole('form', { name: en.contact.contactForm })
    await form.getByRole('button', { name: en.contact.form.send }).click()

    await expect(form.getByRole('alert').first()).toBeVisible()
  })

  test('respects prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await gotoApp(page, '/blog')

    // With motion reduced, rows are readable immediately — no waiting on a reveal.
    await expect(page.locator('.post-row').first()).toBeVisible()
    await expect(page.locator('.post-row h2').first()).toHaveText(posts[0].title)
  })

  test('lists use real list semantics', async ({ page }) => {
    await gotoApp(page, '/')
    const orphans = await page.locator('li').evaluateAll(els =>
      els.filter(el => !['UL', 'OL'].includes(el.parentElement?.tagName ?? '')).length
    )
    expect(orphans).toBe(0)
  })

  test('external links carry noopener', async ({ page }) => {
    await gotoApp(page, '/')
    const unsafe = await page.locator('a[target="_blank"]').evaluateAll(els =>
      els.filter(el => !(el.getAttribute('rel') ?? '').includes('noopener')).map(el => el.getAttribute('href'))
    )
    expect(unsafe).toEqual([])
  })
})
