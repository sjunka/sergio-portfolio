import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { lang, toggleLang, isLangPending } = useLanguage()
  const prefersReduced = useReducedMotion()

  return (
    <button
      onClick={toggleLang}
      disabled={isLangPending}
      aria-label={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
      className={cn(
        'relative h-9 w-9 rounded-md flex items-center justify-center overflow-hidden',
        'text-muted-foreground hover:text-foreground hover:bg-muted',
        'transition-colors duration-200 text-xs font-bold tracking-wide',
        isLangPending && 'opacity-50 cursor-wait',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={lang}
          initial={prefersReduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
        >
          {lang === 'en' ? 'EN' : 'ES'}
        </m.span>
      </AnimatePresence>
    </button>
  )
}
