import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '@/App'
import { en } from '@/i18n/en'
import { es } from '@/i18n/es'

function renderApp() {
  window.history.pushState({}, '', '/')
  return render(<App />)
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.lang = 'en'
  document.documentElement.classList.remove('dark', 'light')
})

describe('theme preference', () => {
  it('applies a theme class to the document on first render', async () => {
    renderApp()
    await screen.findByRole('banner')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('switches theme, swaps the button label and persists the choice', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: en.theme.toDark }))

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(screen.getByRole('button', { name: en.theme.toLight })).toBeInTheDocument()
  })

  it('restores a stored theme on the next mount', async () => {
    localStorage.setItem('theme', 'dark')
    renderApp()
    await screen.findByRole('banner')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

describe('language preference', () => {
  it('renders english navigation labels by default', async () => {
    renderApp()
    const nav = await screen.findByRole('navigation', { name: en.nav.mainNav })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to spanish/i })).toBeInTheDocument()
  })

  it('switches the whole UI to spanish and persists it', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: /switch to spanish/i }))

    expect(await screen.findByRole('navigation', { name: es.nav.mainNav })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('es')
    expect(localStorage.getItem('language')).toBe('es')
  })

  it('reads the language the inline index.html script resolved before React booted', async () => {
    document.documentElement.lang = 'es'
    renderApp()
    expect(await screen.findByRole('navigation', { name: es.nav.mainNav })).toBeInTheDocument()
  })

  it('keeps theme and language independent', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: /switch to spanish/i }))
    await user.click(await screen.findByRole('button', { name: es.theme.toDark }))

    expect(document.documentElement.lang).toBe('es')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

describe('mobile menu', () => {
  it('opens a modal dialog, exposes aria state and closes on navigation', async () => {
    const user = userEvent.setup()
    renderApp()
    const toggle = screen.getByRole('button', { name: en.nav.openMenu })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    const dialog = await screen.findByRole('dialog', { name: en.nav.mobileNav })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByRole('button', { name: en.nav.closeMenu })).toHaveAttribute('aria-expanded', 'true')
    expect(document.body.style.overflow).toBe('hidden')

    await user.click(screen.getByRole('button', { name: en.nav.closeMenu }))
    expect(screen.getByRole('button', { name: en.nav.openMenu })).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')
  })
})
