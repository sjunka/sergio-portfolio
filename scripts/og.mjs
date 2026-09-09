/**
 * Renders the share cards social crawlers show when a link is pasted:
 * scripts/og-card.html to public/share-card.jpg (the site itself), and
 * scripts/og-post.html once per post to public/blog/og/<slug>.jpg.
 *
 * Playwright is already here for the e2e suite, so the cards stay source files
 * in git rather than binaries somebody has to reopen in a design tool. They are
 * committed rather than built on deploy, which keeps a browser download out of
 * the deploy job.
 */
import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const contentDir = 'src/content/blog'
const outDir = 'public/blog/og'
const tmp = 'scripts/.og-render.html'

/** Frontmatter only: the body never reaches the card. */
function frontmatter(raw) {
  const meta = {}
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] ?? ''
  for (const line of block.split('\n')) {
    const sep = line.indexOf(':')
    if (sep !== -1) meta[line.slice(0, sep).trim()] = line.slice(sep + 1).trim()
  }
  return meta
}

const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * One font size for every title makes the short ones timid and clips the long
 * ones. Three steps, chosen by length, keeps all of them inside the card.
 */
function titleSize(title) {
  if (title.length <= 42) return '76px'
  if (title.length <= 68) return '62px'
  return '52px'
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 })

async function render(source, out) {
  await page.goto(pathToFileURL(resolve(source)).href)
  await page.evaluate(() => document.fonts.ready)
  // deviceScaleFactor 2 renders at 2400x1260; social crawlers want the declared
  // 1200x630, so scale back down — the downsample is what keeps the text crisp.
  await page.screenshot({ path: out, type: 'jpeg', quality: 92, scale: 'css' })
  console.log(`og: wrote ${out}`)
}

await render('scripts/og-card.html', 'public/share-card.jpg')

// English is the card for both languages: one image per slug, and the Spanish
// reader still lands on the Spanish post. Two cards per post would double the
// binaries in git for a preview nobody reads twice.
await mkdir(outDir, { recursive: true })
const template = await readFile('scripts/og-post.html', 'utf8')
for (const file of await readdir(contentDir)) {
  const slug = /^(.+)\.en\.md$/.exec(file)?.[1]
  if (!slug) continue
  const meta = frontmatter(await readFile(join(contentDir, file), 'utf8'))
  const stamp = new Date(`${meta.date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const html = template
    .replaceAll('{{titleSize}}', titleSize(meta.title ?? ''))
    .replaceAll('{{title}}', escape(meta.title ?? ''))
    .replaceAll('{{summary}}', escape(meta.summary ?? ''))
    .replaceAll('{{stamp}}', escape(stamp))
  await writeFile(tmp, html)
  await render(tmp, join(outDir, `${slug}.jpg`))
}
await unlink(tmp)

await browser.close()
