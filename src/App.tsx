import { lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { SEOHead } from '@/components/shared/SEOHead'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'

const About = lazy(() => import('@/components/sections/About').then(m => ({ default: m.About })))
const Skills = lazy(() => import('@/components/sections/Skills').then(m => ({ default: m.Skills })))
const Experience = lazy(() => import('@/components/sections/Experience').then(m => ({ default: m.Experience })))
const Mobile = lazy(() => import('@/components/sections/Mobile').then(m => ({ default: m.Mobile })))
const Contact = lazy(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })))

function App() {
  return (
    <HelmetProvider>
      <SEOHead />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<div className="h-24" />}>
          <About />
          <Skills />
          <Experience />
          <Mobile />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </HelmetProvider>
  )
}

export default App
