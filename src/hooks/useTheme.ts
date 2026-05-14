import { useState, useLayoutEffect, useCallback, useDebugValue } from 'react'

type Theme = 'dark' | 'light'

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove('dark', 'light')
  document.documentElement.classList.add(theme)
  localStorage.setItem('theme', theme)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useDebugValue(theme, t => `Theme: ${t}`)

  useLayoutEffect(() => {
    applyTheme(theme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = useCallback(() => {
    setThemeState(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
