import { test as base, expect, type Page } from '@playwright/test'
import { en } from '../src/i18n/en'
import { es } from '../src/i18n/es'

/**
 * The app resolves language from navigator.language and theme from the OS on a
 * first visit, which would make every assertion depend on the machine running
 * the suite. Seed both before the first script runs — but only when absent, or
 * this init script (which runs on every navigation, reloads included) would undo
 * whatever the test just clicked.
 */
export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      if (!localStorage.getItem('language')) localStorage.setItem('language', 'en')
      if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light')
    })
    await use(page)
  },
})

export { expect, en, es }

/**
 * The desktop nav links and the resume button are `hidden` below Tailwind's `md`
 * breakpoint — at mobile width the same journey goes through the burger menu, which
 * navigation.spec covers separately.
 */
export function desktopOnly(page: Page) {
  test.skip((page.viewportSize()?.width ?? 0) < 768, 'desktop navbar only')
}

/** Waits for hydration: the navbar only exists once React has mounted. */
export async function gotoApp(page: Page, path: string) {
  await page.goto(path)
  await expect(page.getByRole('banner')).toBeVisible()
}

export const posts = [
  { slug: 'adapt-cps-methodology', title: 'A process model where the contract exists before the code' },
  { slug: 'agile-waterfall-cyber-physical', title: 'Agile and waterfall both fail cyber-physical systems, from opposite ends' },
  { slug: 'one-contract-two-platforms', title: 'What a TurboModule spec cannot tell you' },
  { slug: 'webview-micro-app', title: 'A web screen inside a native app is a trust boundary, not a component' },
  { slug: 'mape-k-loop', title: 'MAPE-K, or how to keep adaptation out of your business logic' },
  { slug: 'iot-cps-cpas', title: 'IoT measures, a CPS acts, a CPAS rewrites how it acts' },
  { slug: 'hiring-mobile-engineers', title: 'What I look for when I interview a mobile engineer' },
  { slug: 'boring-releases', title: 'The best mobile release is the one nobody notices' },
  { slug: 'flatlist-jank', title: "Your FlatList isn't slow, your renderItem is" },
] as const
