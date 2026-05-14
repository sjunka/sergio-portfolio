import { useDebugValue } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/i18n'

export function useTranslation() {
  const { lang, toggleLang, isLangPending } = useLanguage()
  useDebugValue(lang, l => `Translation: ${l}`)
  return { t: translations[lang], lang, toggleLang, isLangPending }
}
