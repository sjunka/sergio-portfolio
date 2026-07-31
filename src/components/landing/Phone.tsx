import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { personal } from '@/data/personal'
import { useTranslation } from '@/hooks/useTranslation'
import { formatDate, type Post } from '@/lib/posts'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/motion'

/** Glyphs are hand-drawn rather than imported so each one fits the tile grid. */
const glyphs = {
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M9 10h6M9 13.5h6M9 17h3.5" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 4v11" />
      <path d="M7.5 10.5 12 15l4.5-4.5" />
      <path d="M5 19h14" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  ),
}

function StatusBar({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div className={cn('flex items-center justify-between px-6 pt-3 text-[10px] font-mono text-[hsl(var(--phone-ink)/0.7)]', className)}>
      <span aria-hidden="true">{time}</span>
      <span className="flex items-end gap-[3px]" aria-hidden="true">
        {[4, 6, 8, 10].map(h => (
          <i key={h} className="w-[3px] rounded-sm bg-[hsl(var(--phone-ink)/0.6)]" style={{ height: h }} />
        ))}
        <i className="ml-1.5 h-[9px] w-[18px] rounded-[3px] border border-[hsl(var(--phone-ink)/0.5)] p-[2px]">
          <i className="block h-full w-2/3 rounded-[1px] bg-[hsl(var(--phone-ink)/0.6)]" />
        </i>
      </span>
    </div>
  )
}

function AppTile({
  glyph,
  label,
  to,
  href,
  gradient,
}: {
  glyph: keyof typeof glyphs
  label: string
  to?: string
  href?: string
  gradient: string
}) {
  const inner = (
    <>
      {/* The glyph stays white in both themes: it sits on its own vivid gradient, not on the screen. */}
      <span
        className="grid size-14 place-items-center rounded-[1.15rem] text-white shadow-lg shadow-black/30 ring-1 ring-white/15"
        style={{ backgroundImage: gradient }}
      >
        <span className="size-7">{glyphs[glyph]}</span>
      </span>
      <span className="text-[10px] font-medium text-[hsl(var(--phone-ink)/0.85)]">{label}</span>
    </>
  )

  const classes =
    'phone-item flex flex-col items-center gap-2 rounded-xl outline-none transition-transform duration-150 active:scale-[0.93] focus-visible:ring-2 focus-visible:ring-[hsl(var(--phone-ink)/0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

  return href ? (
    <a href={href} download={href.endsWith('.pdf') || undefined} className={classes}>
      {inner}
    </a>
  ) : (
    <Link to={to!} className={classes}>
      {inner}
    </Link>
  )
}

function HomeScreen({ posts }: { posts: Post[] }) {
  const { t, lang } = useTranslation()
  const latest = posts[0]

  const apps = [
    { glyph: 'about', label: t.landing.apps.about, to: '/about', gradient: 'linear-gradient(145deg,hsl(239 84% 62%),hsl(271 91% 58%))' },
    { glyph: 'blog', label: t.landing.apps.blog, to: '/blog', gradient: 'linear-gradient(145deg,hsl(199 89% 52%),hsl(239 84% 62%))' },
    { glyph: 'resume', label: t.landing.apps.resume, href: personal.resumePdf, gradient: 'linear-gradient(145deg,hsl(158 64% 42%),hsl(199 89% 48%))' },
    { glyph: 'contact', label: t.landing.apps.contact, href: `mailto:${personal.email}`, gradient: 'linear-gradient(145deg,hsl(271 91% 60%),hsl(330 81% 58%))' },
  ] as const

  return (
    <div className="flex h-full flex-col">
      <div className="px-7 pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--phone-ink)/0.45)]">sergiojunca.online</p>
        <p className="mt-1 text-sm font-semibold text-[hsl(var(--phone-ink))]">{personal.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-7 px-8 pt-8">
        {apps.map(app => (
          <AppTile key={app.label} {...app} />
        ))}
      </div>

      {/* Widget: the newest post, the way a home screen would surface it */}
      {latest && (
        <Link
          to={`/blog/${latest.slug}`}
          className="phone-item mx-7 mt-9 block rounded-2xl bg-[hsl(var(--phone-ink)/0.06)] p-4 ring-1 ring-[hsl(var(--phone-ink)/0.1)] outline-none transition-colors hover:bg-[hsl(var(--phone-ink)/0.11)] focus-visible:bg-[hsl(var(--phone-ink)/0.14)]"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[hsl(var(--phone-ink)/0.4)]">
            {t.blog.label} <span className="text-[hsl(var(--phone-ink)/0.25)]">/</span> {latest.number}
          </p>
          <p className="mt-2 line-clamp-2 text-[13px] font-semibold leading-snug text-[hsl(var(--phone-ink)/0.9)]">{latest.title}</p>
          <p className="mt-2.5 font-mono text-[9px] text-[hsl(var(--phone-ink)/0.45)]">
            {formatDate(latest.date, lang)} <span className="text-[hsl(var(--phone-ink)/0.25)]">/</span> {latest.readingMinutes}{' '}
            {t.blog.minRead}
          </p>
        </Link>
      )}

      <div className="mt-auto flex justify-center gap-1.5 pb-5" aria-hidden="true">
        <i className="size-1 rounded-full bg-[hsl(var(--phone-ink)/0.8)]" />
        <i className="size-1 rounded-full bg-[hsl(var(--phone-ink)/0.25)]" />
      </div>
    </div>
  )
}

function BlogScreen({ posts }: { posts: Post[] }) {
  const { t, lang } = useTranslation()

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--phone-ink)/0.45)]">{t.blog.label}</p>
        <p className="mt-1 text-lg font-semibold leading-tight text-[hsl(var(--phone-ink))]">{t.blog.title}</p>
      </div>

      <ul className="mt-5 divide-y divide-[hsl(var(--phone-ink)/0.1)] border-t border-[hsl(var(--phone-ink)/0.1)]">
        {posts.slice(0, 3).map(post => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="block px-6 py-3.5 outline-none transition-colors hover:bg-[hsl(var(--phone-ink)/0.05)] focus-visible:bg-[hsl(var(--phone-ink)/0.1)]"
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--phone-ink)/0.4)]">
                {post.number} · {formatDate(post.date, lang)}
              </p>
              <p className="mt-1 line-clamp-2 text-[13px] font-medium leading-snug text-[hsl(var(--phone-ink)/0.9)]">{post.title}</p>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/blog"
        className="mx-6 mt-auto mb-6 rounded-xl bg-[hsl(var(--phone-ink)/0.1)] py-2.5 text-center text-[11px] font-semibold text-[hsl(var(--phone-ink)/0.9)] ring-1 ring-[hsl(var(--phone-ink)/0.15)] transition-colors hover:bg-[hsl(var(--phone-ink)/0.2)]"
      >
        {t.landing.allPosts}
      </Link>
    </div>
  )
}

export function Phone({ screen, posts }: { screen: 'home' | 'blog'; posts: Post[] }) {
  const { t } = useTranslation()
  const frameRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)

  // Entrance: the frame arrives, then the tiles land on it.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(frameRef.current, { y: 40, scale: 0.94, opacity: 0, duration: 1, ease: 'expo.out' })
        .from('.phone-item', { y: 16, scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(2)' }, 0.35)
    }, frameRef)
    return () => ctx.revert()
  }, [])

  // Tilt toward the cursor. Pointer-only, so touch and keyboard are unaffected.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame || prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rotX = gsap.quickTo(frame, 'rotationX', { duration: 0.7, ease: 'power3.out' })
    const rotY = gsap.quickTo(frame, 'rotationY', { duration: 0.7, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      rotY(((e.clientX - cx) / cx) * 7)
      rotX(((cy - e.clientY) / cy) * 5)
    }
    const onLeave = () => {
      rotX(0)
      rotY(0)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  // App-switch crossfade when the scroll position changes which screen is showing.
  useEffect(() => {
    if (prefersReducedMotion() || !screenRef.current) return
    gsap.fromTo(
      screenRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'expo.out' }
    )
  }, [screen])

  return (
    /* `phone` carries the device's own light/dark tokens — see globals.css. */
    <div className="phone relative" style={{ perspective: 1400 }}>
      {/* Ambient light behind the device */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle,hsl(239 84% 67%),transparent 65%)' }}
        aria-hidden="true"
      />

      <div
        ref={frameRef}
        role="group"
        aria-label={t.landing.phoneLabel}
        className="relative mx-auto aspect-[9/19] w-[17rem] rounded-[2.75rem] bg-[image:var(--phone-frame)] p-[3px] shadow-2xl shadow-black/30 sm:w-[19rem]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] bg-[image:var(--phone-glass)]">
          {/* Dynamic island */}
          <div
            className="absolute left-1/2 top-2.5 z-10 h-5 w-[5.5rem] -translate-x-1/2 rounded-full bg-black"
            aria-hidden="true"
          />
          <StatusBar />

          <div ref={screenRef} className="h-[calc(100%-2rem)]">
            {screen === 'home' ? <HomeScreen posts={posts} /> : <BlogScreen posts={posts} />}
          </div>

          {/* Home indicator */}
          <div
            className="absolute bottom-1.5 left-1/2 h-[3px] w-24 -translate-x-1/2 rounded-full bg-[hsl(var(--phone-ink)/0.35)]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
