import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Phone } from '@/components/landing/Phone'
import { PostRow } from '@/components/blog/PostRow'
import { SEOHead } from '@/components/shared/SEOHead'
import { personal } from '@/data/personal'
import { experiences } from '@/data/experience'
import { useTranslation } from '@/hooks/useTranslation'
import { getPosts } from '@/lib/posts'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const industryCount = new Set(experiences.map(e => e.industry)).size

export function Landing() {
  const { t, lang } = useTranslation()
  const posts = useMemo(() => getPosts(lang), [lang])
  const [screen, setScreen] = useState<'home' | 'blog'>('home')
  const root = useRef<HTMLDivElement>(null)

  const marks = [
    { value: '10', suffix: '+', label: t.landing.marks.years },
    { value: String(industryCount), suffix: '', label: t.landing.marks.industries },
    { value: '2', suffix: '', label: t.landing.marks.platforms },
  ]

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-line', { yPercent: 108, duration: 1.1, stagger: 0.08 })
        .from('.hero-fade', { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.35)

      gsap.from('.mark', {
        scrollTrigger: { trigger: '.marks', start: 'top 90%' },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'expo.out',
      })

      gsap.from('.post-row', {
        scrollTrigger: { trigger: '.writing', start: 'top 78%' },
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'expo.out',
      })

      // The phone switches apps as the reader arrives at the writing section.
      ScrollTrigger.create({
        trigger: '.writing',
        start: 'top 65%',
        end: 'bottom 40%',
        onToggle: self => setScreen(self.isActive ? 'blog' : 'home'),
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      <SEOHead title={`${personal.name} — ${personal.title}`} description={t.landing.lede} path="" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20">
          {/* ── Hero ─────────────────────────────────────────────────── */}
          <section
            aria-labelledby="landing-headline"
            className="pt-28 sm:pt-36 lg:col-start-1 lg:row-start-1 lg:min-h-[calc(100vh-9rem)]"
          >
            <p className="hero-fade font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              {t.landing.eyebrow}
            </p>

            <h1
              id="landing-headline"
              className="mt-6 text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground"
            >
              <span className="block overflow-hidden py-[0.06em]">
                <span className="hero-line block">{t.landing.headlineA}</span>
              </span>
              <span className="block overflow-hidden py-[0.06em]">
                <span
                  className="hero-line block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(100deg,hsl(var(--primary)),hsl(271 91% 65%) 55%,hsl(199 89% 58%))',
                  }}
                >
                  {t.landing.headlineB}
                </span>
              </span>
            </h1>

            <p className="hero-fade mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.landing.lede}
            </p>

            <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary/40"
              >
                {t.landing.readWriting}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted"
              >
                {t.landing.aboutMe}
              </Link>
            </div>

            <dl className="marks mt-20 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {marks.map(mark => (
                <div key={mark.label} className="mark">
                  <dt className="sr-only">{mark.label}</dt>
                  <dd>
                    <span className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      {mark.value}
                      <span className="text-primary">{mark.suffix}</span>
                    </span>
                    <span className="mt-2 block text-xs leading-snug text-muted-foreground">{mark.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── The device: sticky beside the story on desktop, inline between
                hero and writing on small screens. One instance either way. ── */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-24 lg:pt-36">
              <Phone screen={screen} posts={posts} />
            </div>
          </div>

          {/* ── Writing ──────────────────────────────────────────────── */}
          <section
            className="writing pt-8 sm:pt-16 lg:col-start-1 lg:row-start-2 lg:pt-32"
            aria-labelledby="landing-writing"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">{t.landing.writingLabel}</p>
            <h2 id="landing-writing" className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t.landing.writingTitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.landing.writingLede}
            </p>

            <ul className="mt-10 border-b border-border" role="list">
              {posts.slice(0, 3).map(post => (
                <PostRow key={post.slug} post={post} />
              ))}
            </ul>

            <Link to="/blog" className="group mt-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-primary">
              {t.landing.allPosts}
              <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </section>
        </div>
      </div>

      {/* ── Where the code shipped: real companies, most recent first ───── */}
      <section className="mt-28 overflow-hidden border-y border-border py-6 sm:mt-36" aria-labelledby="landing-shipped">
        <h2 id="landing-shipped" className="sr-only">
          {t.landing.industriesLabel}
        </h2>
        <div className="marquee flex w-max gap-10">
          {[0, 1].map(copy => (
            <ul key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1} role="list">
              {experiences.map(item => (
                <li key={item.company} className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-base font-semibold text-foreground">{item.company}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {item.industry}
                  </span>
                  <span className="size-1 rounded-full bg-primary/50" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-lg text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t.landing.contactLabel}
          </h2>
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {t.landing.contactCta}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>
    </div>
  )
}
