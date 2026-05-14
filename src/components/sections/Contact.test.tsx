import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Contact } from './Contact'
import { LanguageProvider } from '@/context/LanguageContext'

function renderContact() {
  return render(
    <LanguageProvider>
      <Contact />
    </LanguageProvider>
  )
}

describe('Contact form', () => {
  it('renders all form fields', () => {
    renderContact()
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderContact()
    await user.click(screen.getByRole('button', { name: /send/i }))
    expect(await screen.findAllByRole('alert')).toHaveLength(3)
  })

  it('shows name error when name is too short', async () => {
    const user = userEvent.setup()
    renderContact()
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'A')
    await user.click(screen.getByRole('button', { name: /send/i }))
    const alerts = await screen.findAllByRole('alert')
    expect(alerts.some(el => /at least 2/i.test(el.textContent ?? ''))).toBe(true)
  })

  it('form fields have matching label/input associations via useId', () => {
    renderContact()
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    expect(nameInput).toHaveAttribute('id')
    const nameId = nameInput.getAttribute('id')!
    const label = document.querySelector(`label[for="${nameId}"]`)
    expect(label).not.toBeNull()
  })
})
