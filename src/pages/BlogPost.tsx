import { useEffect, useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { SEOHead } from '@/components/shared/SEOHead'
import { LinkedInIcon, GitHubIcon } from '@/components/shared/BrandIcons'
import { personal } from '@/data/personal'
import { useTranslation } from '@/hooks/useTranslation'
import { formatDate, getPosts } from '@/lib/posts'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

marked.use({
  gfm: true,
  // A comparison table is wider than a 46rem column on a phone. Wrapping it at
  // render time keeps the scroll inside the table instead of the whole article.
  hooks: {
    postprocess: (html: string) =>
      html.replace(/<table>/g, '<div class="scroll-x"><table>').replace(/<\/table>/g, '</table></div>'),
  },
})

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useTranslation()
  const articleRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const posts = useMemo(() => getPosts(lang), [lang])
  const index = posts.findIndex(p => p.slug === slug)
  const post = index === -1 ? undefined : posts[index]
  // Newest first, so the previous entry in the array is the newer post.
  const newer = index > 0 ? posts[index - 1] : undefined
  const older = index !== -1 && index < posts.length - 1 ? posts[index + 1] : undefined

  const html = useMemo(() => (post ? (marked.parse(post.body) as string) : ''), [post])

  useEffect(() => {
    if (!post || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.post-head', { y: 20, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'expo.out' })

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: articleRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      })
    })
    return () => ctx.revert()
  }, [post])

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 pb-32 pt-40 sm:px-6">
        <SEOHead title={`${t.blog.notFoundTitle} | Sergio Junca`} path={`blog/${slug ?? ''}`} />
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t.blog.notFoundTitle}</h1>
        <p className="mt-4 text-muted-foreground">{t.blog.notFoundBody}</p>
        <Link to="/blog" className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-primary">
          <ArrowLeft size={15} aria-hidden="true" />
          {t.blog.backToBlog}
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Sergio Junca`}
        description={post.summary}
        path={`blog/${post.slug}`}
        article={{ published: post.date, tags: post.tags }}
      />

      {/* Reading progress */}
      <div className="fixed left-0 right-0 top-16 z-40 h-px bg-transparent" aria-hidden="true">
        <div ref={progressRef} className="h-px origin-left scale-x-0 bg-primary" />
      </div>

      <article ref={articleRef} className="mx-auto max-w-[46rem] px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <header>
          <Link
            to="/blog"
            className="post-head group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
            {t.blog.backToBlog}
          </Link>

          <p className="post-head mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            {post.number}
            <span className="mx-2 text-muted-foreground/40">/</span>
            <span className="text-muted-foreground">{formatDate(post.date, lang)}</span>
            <span className="mx-2 text-muted-foreground/40">/</span>
            <span className="text-muted-foreground">
              {post.readingMinutes} {t.blog.minRead}
            </span>
          </p>

          <h1 className="post-head mt-5 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
            {post.title}
          </h1>

          {post.summary && (
            <p className="post-head mt-6 text-lg leading-relaxed text-muted-foreground">{post.summary}</p>
          )}

          {post.tags.length > 0 && (
            <p className="post-head mt-6 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
              {post.tags.map(tag => (
                <span key={tag} className="rounded border border-border px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </p>
          )}

          {post.lang !== lang && (
            <p className="post-head mt-8 flex items-start gap-2.5 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
              <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              {t.blog.onlyEnglish}
            </p>
          )}
        </header>

        {/* Markdown from this repo's own content directory, sanitized at the sink. */}
        <div className="prose mt-14" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />

        <footer className="mt-20 border-t border-border pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <img src="/avatar.png" alt="" width={48} height={48} className="size-12 rounded-full border border-border" />
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {t.blog.writtenBy}
              </p>
              <p className="mt-1 font-semibold text-foreground">{personal.name}</p>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">{t.blog.authorBio}</p>
            </div>
            <div className="flex gap-2 sm:ml-auto">
              {[
                { Icon: LinkedInIcon, href: personal.linkedin, label: t.footer.linkedinProfile },
                { Icon: GitHubIcon, href: personal.github, label: t.footer.githubProfile },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {(older || newer) && (
            <nav className="mt-12 grid gap-4 sm:grid-cols-2" aria-label={t.blog.label}>
              {older && (
                <Link
                  to={`/blog/${older.slug}`}
                  className="group rounded-xl border border-border p-5 transition-colors hover:border-primary/50 hover:bg-muted/40"
                >
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <ArrowLeft size={13} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
                    {t.blog.prevPost}
                  </p>
                  <p className="mt-2 font-semibold leading-snug text-foreground group-hover:text-primary">
                    {older.title}
                  </p>
                </Link>
              )}
              {newer && (
                <Link
                  to={`/blog/${newer.slug}`}
                  className="group rounded-xl border border-border p-5 text-right transition-colors hover:border-primary/50 hover:bg-muted/40 sm:col-start-2"
                >
                  <p className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {t.blog.nextPost}
                    <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </p>
                  <p className="mt-2 font-semibold leading-snug text-foreground group-hover:text-primary">
                    {newer.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </footer>
      </article>
    </>
  )
}
