import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { PostRow } from '@/components/blog/PostRow'
import { SEOHead } from '@/components/shared/SEOHead'
import { useTranslation } from '@/hooks/useTranslation'
import { getPosts, getTags } from '@/lib/posts'
import { prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function BlogIndex() {
  const { t, lang } = useTranslation()
  const [tag, setTag] = useState<string | null>(null)
  const root = useRef<HTMLDivElement>(null)

  const posts = useMemo(() => getPosts(lang), [lang])
  const tags = useMemo(() => getTags(lang), [lang])
  const visible = tag ? posts.filter(p => p.tags.includes(tag)) : posts

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.blog-head', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08 })
        .from('.post-row', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.25)
    }, root)
    return () => ctx.revert()
  }, [])

  // Re-reveal the filtered set so switching tags reads as a change, not a jump.
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    gsap.fromTo(
      root.current.querySelectorAll('.post-row'),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'expo.out', overwrite: true }
    )
  }, [tag])

  return (
    <div ref={root} className="mx-auto max-w-4xl px-4 pb-28 pt-28 sm:px-6 sm:pt-36">
      <SEOHead title={`${t.blog.title} — ${t.blog.label} | Sergio Junca`} description={t.blog.lede} path="blog" />

      <header>
        <p className="blog-head font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          {t.blog.label}
          <span className="mx-2 text-muted-foreground/40">/</span>
          <span className="text-muted-foreground">
            {posts.length} {t.blog.postCount}
          </span>
        </p>
        <h1 className="blog-head mt-5 text-[clamp(2.25rem,5.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
          {t.blog.title}
        </h1>
        <p className="blog-head mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{t.blog.lede}</p>
      </header>

      {tags.length > 0 && (
        <div className="blog-head mt-10 flex flex-wrap gap-2" role="group" aria-label={t.blog.filterLabel}>
          {[null, ...tags].map(value => (
            <button
              key={value ?? 'all'}
              type="button"
              onClick={() => setTag(value)}
              aria-pressed={tag === value}
              className={cn(
                'rounded-full border px-4 py-1.5 font-mono text-xs transition-colors',
                tag === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {value ?? t.blog.filterAll}
            </button>
          ))}
        </div>
      )}

      {visible.length > 0 ? (
        <ul className="mt-12 border-b border-border" role="list">
          {visible.map(post => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ul>
      ) : (
        <p className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">{t.blog.empty}</p>
      )}
    </div>
  )
}
