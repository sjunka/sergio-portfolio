import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/i18n'

export function useTranslation() {
  const { lang, toggleLang } = useLanguage()
  return { t: translations[lang], lang, toggleLang }
}
