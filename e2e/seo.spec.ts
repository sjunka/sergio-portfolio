import { test, expect, gotoApp, posts } from './fixtures'

const site = 'https://sergiojunca.online/'

/**
 * index.html keeps a static og/twitter block so social crawlers that don't run JS
 * still get a preview, so those tags exist twice: the static home-page values and
 * the per-route ones React emits. `.last()` is the React-rendered tag, the one
 * that reflects the current route. Only the canonical is asserted to be unique.
 */
const routes = [
  { path: '/', canonical: site },
  { path: '/about', canonical: `${site}about/` },
  { path: '/blog', canonical: `${site}blog/` },
  { path: `/blog/${posts[0].slug}`, canonical: `${site}blog/${posts[0].slug}/` },
]

test.describe('metadata', () => {
  for (const { path, canonical } of routes) {
    test(`${path} has exactly one canonical, pointing at the trailing-slash URL`, async ({ page }) => {
      await gotoApp(page, path)
      const links = page.locator('link[rel="canonical"]')
      await expect(links).toHaveCount(1)
      await expect(links).toHaveAttribute('href', canonical)
    })

    test(`${path} has a title, description and og:image`, async ({ page }) => {
      await gotoApp(page, path)

      await expect(page).toHaveTitle(/Sergio Junca/)
      await expect(page.locator('meta[name="description"]').last()).toHaveAttribute('content', /.{50,}/)
      await expect(page.locator('meta[property="og:image"]').last()).toHaveAttribute('content', /og-card\.jpg$/)
      await expect(page.locator('meta[property="og:image:alt"]').last()).toHaveAttribute('content', /.+/)
      await expect(page.locator('meta[property="og:url"]').last()).toHaveAttribute('content', canonical)
    })
  }

  test('a blog post is tagged as an article with a publish date', async ({ page }) => {
    await gotoApp(page, `/blog/${posts[0].slug}`)

    await expect(page.locator('meta[property="og:type"]').last()).toHaveAttribute('content', 'article')
    await expect(page.locator('meta[property="article:published_time"]').last()).toHaveAttribute(
      'content',
      /^\d{4}-\d{2}-\d{2}$/
    )
    await expect(page).toHaveTitle(new RegExp(posts[0].title.slice(0, 20)))
  })

  test('the landing page is tagged as a website', async ({ page }) => {
    await gotoApp(page, '/')
    await expect(page.locator('meta[property="og:type"]').last()).toHaveAttribute('content', 'website')
  })

  test('emits valid JSON-LD: Person on pages, BlogPosting on posts', async ({ page }) => {
    await gotoApp(page, '/')
    const person = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!)
    expect(person['@type']).toBe('Person')

    await gotoApp(page, `/blog/${posts[0].slug}`)
    const article = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!)
    expect(article['@type']).toBe('BlogPosting')
    expect(article.headline).toContain(posts[0].title)
  })
})

test.describe('crawlability', () => {
  test('sitemap.xml lists every route with a trailing slash', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const xml = await res.text()

    for (const { canonical } of routes) {
      expect(xml).toContain(`<loc>${canonical}</loc>`)
    }
    // Every loc must end in / or Pages 301s away from the indexed URL.
    for (const loc of xml.match(/<loc>([^<]+)<\/loc>/g) ?? []) {
      expect(loc).toMatch(/\/<\/loc>$/)
    }
  })

  test('serves a 404.html fallback for the SPA', async ({ request }) => {
    const res = await request.get('/404.html')
    expect(res.status()).toBe(200)
    expect(await res.text()).toContain('<div id="root">')
  })

  test('the og card is actually served at the URL the meta tags advertise', async ({ page, request }) => {
    await gotoApp(page, '/')
    const src = await page.locator('meta[property="og:image"]').last().getAttribute('content')
    const res = await request.get(new URL(src!).pathname)
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('image/jpeg')
  })

  test('robots meta allows indexing', async ({ page }) => {
    await gotoApp(page, '/')
    await expect(page.locator('meta[name="robots"]').last()).toHaveAttribute('content', /index/)
  })

  test('registers a web manifest for installability', async ({ page }) => {
    await gotoApp(page, '/')
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1)
  })
})
