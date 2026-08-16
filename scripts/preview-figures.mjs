/**
 * Renders every <figure> in the given posts side by side in light and dark, on
 * the site's real theme tokens, and writes one PNG. A diagram whose geometry is
 * wrong looks fine in the markdown and wrong on the page, so this is the only
 * cheap way to catch label collisions, arrows landing off-centre and text
 * clipped above the viewBox before shipping.
 *
 *   node scripts/preview-figures.mjs out.png src/content/blog/a-post.en.md ...
 */
import { chromium } from 'playwright-core'
import { readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const [out, ...files] = process.argv.slice(2)
if (!out || files.length === 0) {
  console.error('usage: node scripts/preview-figures.mjs <out.png> <post.md...>')
  process.exit(1)
}

const figures = files
  .flatMap(file => {
    const md = readFileSync(file, 'utf8')
    const name = file.split('/').pop()
    return [...md.matchAll(/<figure[\s\S]*?<\/figure>/g)].map(
      // Site-absolute image paths do not resolve over file://, so point them at public/.
      m => `<p class="tag">${name}</p>${m[0].replaceAll('src="/', `src="${resolve('public')}/`)}`
    )
  })
  .join('\n')

// The token values, not the stylesheet: globals.css is Tailwind source and does
// not run standalone. Keep these in sync with :root and .dark there.
const tokens = `
:root{--background:210 40% 98%;--foreground:222 47% 11%;--card:0 0% 100%;--primary:239 84% 67%;
--muted:210 40% 94%;--muted-foreground:215 16% 47%;--border:214 32% 91%}
.dark{--background:222 47% 6%;--foreground:210 40% 95%;--card:222 47% 9%;--primary:239 84% 72%;
--muted:222 47% 12%;--muted-foreground:215 20% 55%;--border:222 47% 16%}`

const diagramCss = readFileSync('src/styles/globals.css', 'utf8')
  .split('/* Diagram tokens')[1]
  .replace(/^[\s\S]*?\n/, '')

const html = `<!doctype html><html><head><style>${tokens}
body{margin:0;font-family:Inter,system-ui,sans-serif;background:hsl(var(--background));color:hsl(var(--foreground))}
.wrap{display:flex}
.col{width:736px;padding:24px;box-sizing:border-box}
figure{margin:0 0 28px}
figure>svg{display:block;width:100%;height:auto;border-radius:12px;border:1px solid hsl(var(--border));background:hsl(var(--card));padding:24px;box-sizing:border-box}
figure.shots{display:grid;grid-template-columns:1fr 1fr;gap:16px}
figure.shots img{width:100%;border-radius:12px;border:1px solid hsl(var(--border))}
figcaption{margin-top:10px;font-family:monospace;font-size:11.5px;color:hsl(var(--muted-foreground))}
.tag{font-family:monospace;font-size:11px;color:hsl(var(--primary));margin:0 0 6px}
${diagramCss}</style></head>
<body><div class="wrap"><div class="col">${figures}</div>
<div class="col dark" style="background:hsl(222 47% 6%)">${figures}</div></div></body></html>`

const page = join(tmpdir(), 'figures-preview.html')
writeFileSync(page, html)

const browser = await chromium.launch()
const tab = await browser.newPage({ viewport: { width: 1472, height: 900 }, deviceScaleFactor: 2 })
await tab.goto(`file://${page}`)
await tab.screenshot({ path: out, fullPage: true })
await browser.close()
console.log(`preview-figures: wrote ${out}`)
