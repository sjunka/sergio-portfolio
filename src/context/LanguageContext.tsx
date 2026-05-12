import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from '@/i18n'

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

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

  useEffect(() => {
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLangState(l => (l === 'en' ? 'es' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
