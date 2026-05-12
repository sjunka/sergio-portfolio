import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { personal } from '@/data/personal'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.mobile, href: '#mobile' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'skills', 'experience', 'mobile', 'contact']
    const observers: IntersectionObserver[] = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">{t.nav.skipToContent}</a>

      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav
          aria-label={t.nav.mainNav}
          className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
        >
          {/* Logo */}
          <a
            href="#hero"
            aria-label={t.nav.backToTop}
            className="font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">SJ</span>
            <span className="hidden sm:inline text-foreground/60 font-normal ml-1">· Sergio Junca</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors relative',
                    activeSection === link.href.slice(1)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <m.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <a
              href={personal.resumePdf}
              download
              aria-label={t.nav.downloadResumePdf}
              className={cn(
                'hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium',
                'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
                'transition-colors duration-200'
              )}
            >
              <Download size={14} aria-hidden="true" />
              {t.nav.resume}
            </a>
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden size-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.mobileNav}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md flex flex-col pt-20 px-6 md:hidden"
          >
            <nav>
              <ul className="space-y-2" role="list">
                {navLinks.map((link, i) => (
                  <m.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-2xl font-semibold text-foreground hover:text-primary transition-colors border-b border-border"
                    >
                      {link.label}
                    </a>
                  </m.li>
                ))}
              </ul>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <a
                  href={personal.resumePdf}
                  download
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
                >
                  <Download size={16} aria-hidden="true" />
                  {t.nav.downloadResume}
                </a>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
