/**
 * Renders scripts/og-card.html to public/og-card.jpg at 1200x630.
 * Playwright is already here for the e2e suite, so the card stays a source file
 * in git rather than a binary somebody has to reopen in a design tool.
 */
import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const out = 'public/og-card.jpg'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 })
await page.goto(pathToFileURL(resolve('scripts/og-card.html')).href)
await page.evaluate(() => document.fonts.ready)
// deviceScaleFactor 2 renders at 2400x1260; social crawlers want the declared
// 1200x630, so scale back down — the downsample is what keeps the text crisp.
await page.screenshot({ path: out, type: 'jpeg', quality: 92, scale: 'css' })
await browser.close()

console.log(`og: wrote ${out}`)
