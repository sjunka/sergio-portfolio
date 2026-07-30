/**
 * GitHub Pages has no server-side routing, so a request for /blog/some-post
 * 404s before the SPA ever loads. Serving index.html as the 404 page lets the
 * router take over. Also regenerates the sitemap from the content directory,
 * because a hand-maintained one silently goes stale on every new post.
 */
import { copyFile, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const dist = 'dist'
const contentDir = 'src/content/blog'
const site = 'https://sergiojunca.online/'

await copyFile(join(dist, 'index.html'), join(dist, '404.html'))

const posts = []
for (const file of await readdir(contentDir)) {
  if (!file.endsWith('.md')) continue
  const slug = file.replace(/\.(en|es)\.md$/, '')
  if (posts.some(p => p.slug === slug)) continue
  const raw = await readFile(join(contentDir, file), 'utf8')
  const date = /^date:\s*(\d{4}-\d{2}-\d{2})/m.exec(raw)?.[1]
  posts.push({ slug, date: date ?? new Date().toISOString().slice(0, 10) })
}
posts.sort((a, b) => b.date.localeCompare(a.date))

const newest = posts[0]?.date ?? new Date().toISOString().slice(0, 10)
const urls = [
  { loc: site, lastmod: newest, priority: '1.0', changefreq: 'weekly' },
  { loc: `${site}about`, lastmod: newest, priority: '0.9', changefreq: 'monthly' },
  { loc: `${site}blog`, lastmod: newest, priority: '0.9', changefreq: 'weekly' },
  ...posts.map(p => ({
    loc: `${site}blog/${p.slug}`,
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
console.log(`postbuild: 404.html written, sitemap has ${urls.length} urls`)
