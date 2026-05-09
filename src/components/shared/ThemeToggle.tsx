import { Moon, Sun } from 'lucide-react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const prefersReduced = useReducedMotion()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative h-9 w-9 rounded-md flex items-center justify-center',
        'text-muted-foreground hover:text-foreground hover:bg-muted',
        'transition-colors duration-200',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <m.span
            key="moon"
            initial={prefersReduced ? false : { rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={prefersReduced ? undefined : { rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} aria-hidden="true" />
          </m.span>
        ) : (
          <m.span
            key="sun"
            initial={prefersReduced ? false : { rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={prefersReduced ? undefined : { rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} aria-hidden="true" />
          </m.span>
        )}
      </AnimatePresence>
    </button>
  )
}
