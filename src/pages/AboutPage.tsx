import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SEOHead } from '@/components/shared/SEOHead'
import { Hero } from '@/components/sections/Hero'

const About = lazy(() => import('@/components/sections/About').then(m => ({ default: m.About })))
const Skills = lazy(() => import('@/components/sections/Skills').then(m => ({ default: m.Skills })))
const Experience = lazy(() => import('@/components/sections/Experience').then(m => ({ default: m.Experience })))
const Mobile = lazy(() => import('@/components/sections/Mobile').then(m => ({ default: m.Mobile })))
const Contact = lazy(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })))

export function AboutPage() {
  return (
    <>
      <SEOHead path="about" />
      <Hero />
      <ErrorBoundary>
        <Suspense fallback={<div className="h-24" />}>
          <About />
          <Skills />
          <Experience />
          <Mobile />
          <Contact />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
