/**
 * GitHub Pages has no server-side routing, so a request for /blog/some-post
 * 404s before the SPA ever loads. Serving index.html as the 404 page lets the
 * router take over. Also regenerates the sitemap from the content directory,
 * because a hand-maintained one silently goes stale on every new post.
 */
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const contentDir = 'src/content/blog'
const site = 'https://sergiojunca.online/'

await copyFile(join(dist, 'index.html'), join(dist, '404.html'))

const posts = []
for (const file of await readdir(contentDir)) {
  // Same rule as src/lib/posts.ts: only `<slug>.<lang>.md` is a post, so a
  // CLAUDE.md sitting next to the content never becomes a route.
  const named = /^(.+)\.(?:en|es)\.md$/.exec(file)
  if (!named) continue
  const slug = named[1]
  if (posts.some(p => p.slug === slug)) continue
  const raw = await readFile(join(contentDir, file), 'utf8')
  const field = name => new RegExp(`^${name}:\\s*(.+)$`, 'm').exec(raw)?.[1]?.trim()
  const date = field('date')
  posts.push({
    slug,
    date: date ?? new Date().toISOString().slice(0, 10),
    title: field('title') ?? '',
    summary: field('summary') ?? '',
  })
}
posts.sort((a, b) => b.date.localeCompare(a.date))

const newest = posts[0]?.date ?? new Date().toISOString().slice(0, 10)
// Trailing slashes throughout: Pages 301s to that form, and a sitemap that lists
// the pre-redirect URL asks crawlers to index something that doesn't serve a 200.
const urls = [
  { loc: site, lastmod: newest, priority: '1.0', changefreq: 'weekly' },
  { loc: `${site}about/`, lastmod: newest, priority: '0.9', changefreq: 'monthly' },
  { loc: `${site}blog/`, lastmod: newest, priority: '0.9', changefreq: 'weekly' },
  ...posts.map(p => ({
    loc: `${site}blog/${p.slug}/`,
    lastmod: p.date,
    priority: '0.7',
    changefreq: 'yearly',
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

await writeFile(join(dist, 'sitemap.xml'), sitemap)

/*
 * 404.html alone makes deep links *work*, but Pages serves it with a 404 status
 * and search engines don't index a 404. Writing a real index.html at each known
 * route makes those URLs return 200; the router still decides what renders.
 * The shell is identical for every route, so a crawler that doesn't execute JS
 * sees the home page's title and description — prerendering is what fixes that.
 */
const shell = await readFile(join(dist, 'index.html'), 'utf8')

const escape = s =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/*
 * SEOHead sets the title and the og tags at runtime, and a social crawler never
 * runs the app: LinkedIn, X and WhatsApp read the HTML as served. Without this
 * rewrite every post shares with the home page's title, description and card.
 * Rewriting in place rather than appending keeps one tag per property, which is
 * what the crawlers deduplicate badly.
 */
function withMeta(html, { title, description, url, image, imageAlt, published }) {
  const set = (pattern, replacement) => {
    if (!pattern.test(html)) throw new Error(`postbuild: no tag matched ${pattern}`)
    html = html.replace(pattern, replacement)
  }
  set(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
  set(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escape(description)}" />`
  )
  for (const [attr, key, value] of [
    ['property', 'og:type', published ? 'article' : 'website'],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', image],
    ['property', 'og:image:alt', imageAlt],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', imageAlt],
  ]) {
    set(
      new RegExp(`<meta ${attr}="${key}"[^>]*>`),
      `<meta ${attr}="${key}" content="${escape(value)}" />`
    )
  }
  if (published) {
    html = html.replace(
      '<!-- Twitter -->',
      `<meta property="article:published_time" content="${published}" />\n    <!-- Twitter -->`
    )
  }
  return html
}

const routes = [
  { route: 'about', html: shell },
  { route: 'blog', html: shell },
  ...posts.map(p => ({
    route: `blog/${p.slug}`,
    html: withMeta(shell, {
      title: `${p.title} | Sergio Junca`,
      description: p.summary,
      url: `${site}blog/${p.slug}/`,
      // Written by `npm run og` and committed. A post added without running it
      // would point at a 404, so the build fails instead.
      image: `${site}blog/og/${p.slug}.jpg`,
      imageAlt: p.title,
      published: p.date,
    }),
  })),
]
for (const { route, html } of routes) {
  await mkdir(join(dist, route), { recursive: true })
  await writeFile(join(dist, route, 'index.html'), html)
}
for (const p of posts) {
  if (!existsSync(join(dist, 'blog', 'og', `${p.slug}.jpg`))) {
    throw new Error(`postbuild: public/blog/og/${p.slug}.jpg is missing — run \`npm run og\``)
  }
}

console.log(
  `postbuild: 404.html written, ${routes.length} routes emitted, sitemap has ${urls.length} urls`
)
