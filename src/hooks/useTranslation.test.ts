import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useTranslation } from './useTranslation'
import { LanguageProvider } from '@/context/LanguageContext'

describe('useTranslation', () => {
  it('returns english translations by default', () => {
    document.documentElement.lang = 'en'
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(result.current.lang).toBe('en')
    expect(result.current.t).toBeDefined()
  })

  it('exposes toggleLang and isLangPending', () => {
    document.documentElement.lang = 'en'
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(typeof result.current.toggleLang).toBe('function')
    expect(typeof result.current.isLangPending).toBe('boolean')
  })

  it('provides translated keys for nav section', () => {
    document.documentElement.lang = 'en'
    const { result } = renderHook(() => useTranslation(), { wrapper: LanguageProvider })
    expect(result.current.t.nav).toBeDefined()
    expect(typeof result.current.t.nav.about).toBe('string')
  })
})
