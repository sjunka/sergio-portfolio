import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LazyMotion, domMax } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from '@/context/LanguageContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Landing } from '@/pages/Landing'
import { NotFound } from '@/pages/NotFound'

const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const BlogIndex = lazy(() => import('@/pages/BlogIndex').then(m => ({ default: m.BlogIndex })))
const BlogPost = lazy(() => import('@/pages/BlogPost').then(m => ({ default: m.BlogPost })))

/**
 * Routers don't restore scroll, and GSAP caches trigger positions measured
 * against the previous page's height. Both need handling on every navigation.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // The about page's sections are lazy, so the anchor usually doesn't exist on
    // the first tick — a single getElementById silently scrolls nowhere. Waiting
    // on the DOM beats a timeout: a slow chunk on a slow connection would outlast
    // any deadline worth picking.
    const id = hash.slice(1)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView()
      return
    }

    const observer = new MutationObserver(() => {
      const el = document.getElementById(id)
      if (!el) return
      observer.disconnect()
      el.scrollIntoView()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname, hash])

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(id)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <LazyMotion features={domMax}>
          <HelmetProvider>
            <ScrollManager />
            <Navbar />
            <main id="main-content">
              <ErrorBoundary>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </HelmetProvider>
        </LazyMotion>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
