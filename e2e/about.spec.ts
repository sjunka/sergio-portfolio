import { test, expect, en, gotoApp, desktopOnly } from './fixtures'

test.beforeEach(async ({ page }) => {
  await gotoApp(page, '/about')
})

test.describe('about page', () => {
  test('renders every section the navbar anchors to', async ({ page }) => {
    for (const id of ['hero', 'about', 'skills', 'experience', 'mobile', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })

  test('each section heading is wired to its section via aria-labelledby', async ({ page }) => {
    for (const id of ['experience', 'mobile', 'contact']) {
      const section = page.locator(`#${id}`)
      await expect(section).toHaveAttribute('aria-labelledby', `${id}-heading`)
      await expect(page.locator(`#${id}-heading`)).toBeAttached()
    }
  })

  test('the navbar switches to in-page section links', async ({ page }) => {
    desktopOnly(page)
    const nav = page.getByRole('navigation', { name: en.nav.mainNav })
    for (const label of [en.nav.about, en.nav.skills, en.nav.experience, en.nav.mobile, en.nav.contact]) {
      await expect(nav.getByRole('link', { name: label })).toHaveAttribute('href', /^#/)
    }
  })

  test('clicking a section link scrolls to that section', async ({ page }) => {
    desktopOnly(page)
    await page.getByRole('navigation', { name: en.nav.mainNav })
      .getByRole('link', { name: en.nav.experience })
      .click()

    await expect(page).toHaveURL(/#experience$/)
    await expect(page.locator('#experience')).toBeInViewport()
  })

  test('a deep link to a section scrolls there once the lazy section mounts', async ({ page }) => {
    await page.goto('/about#contact')
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('the animated counters settle on their final numbers', async ({ page }) => {
    await page.locator('#about').scrollIntoViewIfNeeded()
    // aria-label carries the target, so the visible text has to catch up to it.
    const counter = page.locator('#about [aria-label]').first()
    const target = (await counter.getAttribute('aria-label'))!
    await expect(counter).toHaveText(target, { timeout: 5000 })
  })
})

test.describe('contact form', () => {
  test('renders labelled fields wired to their inputs', async ({ page }) => {
    const form = page.getByRole('form', { name: en.contact.contactForm })

    for (const label of [en.contact.form.name, en.contact.form.email, en.contact.form.message]) {
      await expect(form.getByLabel(new RegExp(label))).toBeVisible()
    }
  })

  test('reports all three validation errors on an empty submit', async ({ page }) => {
    const form = page.getByRole('form', { name: en.contact.contactForm })
    await form.getByRole('button', { name: en.contact.form.send }).click()

    await expect(form.getByRole('alert')).toHaveCount(3)
    await expect(form.getByText(en.contact.form.nameError)).toBeVisible()
    await expect(form.getByText(en.contact.form.emailError)).toBeVisible()
    await expect(form.getByText(en.contact.form.messageError)).toBeVisible()
  })

  test('marks invalid fields with aria-invalid and describes them', async ({ page }) => {
    const form = page.getByRole('form', { name: en.contact.contactForm })
    await form.getByRole('button', { name: en.contact.form.send }).click()

    const email = form.getByLabel(new RegExp(en.contact.form.email))
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    const describedBy = (await email.getAttribute('aria-describedby'))!
    await expect(page.locator(`#${describedBy}`)).toHaveText(new RegExp(en.contact.form.emailError))
  })

  test('rejects a malformed email but accepts a valid one', async ({ page }) => {
    const form = page.getByRole('form', { name: en.contact.contactForm })
    const email = form.getByLabel(new RegExp(en.contact.form.email))

    await form.getByLabel(new RegExp(en.contact.form.name)).fill('Ada Lovelace')
    await email.fill('not-an-email')
    await form.getByLabel(new RegExp(en.contact.form.message)).fill('A'.repeat(25))
    await form.getByRole('button', { name: en.contact.form.send }).click()
    await expect(form.getByText(en.contact.form.emailError)).toBeVisible()

    await email.fill('ada@example.com')
    await form.getByRole('button', { name: en.contact.form.send }).click()
    await expect(form.getByText(en.contact.form.emailError)).toBeHidden()
  })

  test('lists the direct contact channels alongside the form', async ({ page }) => {
    const section = page.locator('#contact')
    await expect(section.getByRole('link', { name: /mailto|@/ }).first()).toBeVisible()
    await expect(section).toContainText(en.contact.available)
  })
})
