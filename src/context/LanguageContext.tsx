import { useState, useEffect, useCallback, useMemo, useTransition, useDebugValue, type ReactNode } from 'react'
import { LanguageContext } from '@/hooks/useLanguage'
import type { Lang } from '@/i18n'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    // The inline script in index.html already resolved the language before React
    // loaded and wrote it to document.documentElement.lang — read it here so the
    // very first React render uses the correct language with no flash.
    const fromDom = document.documentElement.lang as Lang
    if (fromDom === 'en' || fromDom === 'es') return fromDom
    // Fallback (only reachable if the inline script is missing)
    const stored = localStorage.getItem('language') as Lang | null
    if (stored === 'en' || stored === 'es') return stored
    return navigator.language.startsWith('es') ? 'es' : 'en'
  })

  const [isLangPending, startTransition] = useTransition()

  useDebugValue(lang, l => `Lang: ${l}`)

  useEffect(() => {
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => {
    startTransition(() => {
      setLangState(l => (l === 'en' ? 'es' : 'en'))
    })
  }, [])

  const value = useMemo(
    () => ({ lang, toggleLang, isLangPending }),
    [lang, toggleLang, isLangPending]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
