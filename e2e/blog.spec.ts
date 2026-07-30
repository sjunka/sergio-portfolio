import { test, expect, en, gotoApp, posts } from './fixtures'

test.describe('blog index', () => {
  test('lists every post, newest first', async ({ page }) => {
    await gotoApp(page, '/blog')

    const headings = page.locator('.post-row h2')
    await expect(headings).toHaveCount(posts.length)
    await expect(headings).toHaveText(posts.map(p => p.title))
  })

  test('numbers posts as a release log, oldest = 001', async ({ page }) => {
    await gotoApp(page, '/blog')

    // Newest first on screen, so the numbers count down.
    await expect(page.locator('.post-row').first()).toContainText('003')
    await expect(page.locator('.post-row').last()).toContainText('001')
  })

  test('shows reading time and a date for each post', async ({ page }) => {
    await gotoApp(page, '/blog')

    for (const row of await page.locator('.post-row').all()) {
      await expect(row).toContainText(en.blog.minRead)
      await expect(row).toContainText(/\w{3} \d{1,2}, \d{4}/)
    }
  })

  test('filters by tag and restores the full list on All', async ({ page }) => {
    await gotoApp(page, '/blog')
    const filters = page.getByRole('group', { name: en.blog.filterLabel })

    await filters.getByRole('button', { name: 'performance' }).click()
    await expect(page.locator('.post-row')).toHaveCount(1)
    await expect(page.locator('.post-row')).toContainText('FlatList')

    await filters.getByRole('button', { name: en.blog.filterAll }).click()
    await expect(page.locator('.post-row')).toHaveCount(posts.length)
  })

  test('opens a post from the index', async ({ page }) => {
    await gotoApp(page, '/blog')
    await page.locator('.post-row').first().getByRole('link').click()

    await expect(page).toHaveURL(new RegExp(`/blog/${posts[0].slug}`))
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(posts[0].title)
  })
})

test.describe('blog post', () => {
  test('renders the markdown body as real HTML, not escaped text', async ({ page }) => {
    await gotoApp(page, `/blog/${posts[0].slug}`)

    const prose = page.locator('.prose')
    await expect(prose.locator('h2').first()).toBeVisible()
    await expect(prose.locator('p').first()).toBeVisible()
    await expect(prose).not.toContainText('<p>')
  })

  test('shows the metadata line: number, date and reading time', async ({ page }) => {
    await gotoApp(page, `/blog/${posts[0].slug}`)

    const header = page.locator('article header')
    await expect(header).toContainText('003')
    await expect(header).toContainText(en.blog.minRead)
  })

  test('links to the author profiles in the post footer', async ({ page }) => {
    await gotoApp(page, `/blog/${posts[0].slug}`)
    const footer = page.locator('article footer')

    await expect(footer.getByRole('link', { name: en.footer.linkedinProfile })).toHaveAttribute(
      'href',
      /linkedin\.com/
    )
    await expect(footer.getByRole('link', { name: en.footer.githubProfile })).toHaveAttribute(
      'href',
      /github\.com/
    )
  })

  test('offers previous/next navigation between posts', async ({ page }) => {
    await gotoApp(page, `/blog/${posts[1].slug}`)

    // The middle post has a newer and an older neighbour.
    await expect(page.locator('article').getByRole('link', { name: new RegExp(posts[0].title) })).toBeVisible()
    await expect(page.locator('article').getByRole('link', { name: new RegExp(posts[2].title) })).toBeVisible()
  })

  test('shows the not-found state for an unknown slug', async ({ page }) => {
    await gotoApp(page, '/blog/no-such-post')

    await expect(page.getByRole('heading', { level: 1, name: en.blog.notFoundTitle })).toBeVisible()
    await expect(page.getByRole('link', { name: en.blog.backToBlog })).toBeVisible()
  })

  test('does not execute script from the markdown pipeline', async ({ page }) => {
    let dialogs = 0
    page.on('dialog', async d => {
      dialogs++
      await d.dismiss()
    })

    await gotoApp(page, `/blog/${posts[0].slug}`)
    await expect(page.locator('.prose script')).toHaveCount(0)
    expect(dialogs).toBe(0)
  })

  test('back-to-blog returns to the index', async ({ page }) => {
    await gotoApp(page, `/blog/${posts[0].slug}`)
    await page.getByRole('link', { name: en.blog.backToBlog }).first().click()

    await expect(page.getByRole('heading', { level: 1, name: en.blog.title })).toBeVisible()
  })
})
