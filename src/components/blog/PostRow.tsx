import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { formatDate, type Post } from '@/lib/posts'

export function PostRow({ post }: { post: Post }) {
  const { t, lang } = useTranslation()

  return (
    <li className="post-row group relative border-t border-border">
      {/* Accent rule that fills on hover, echoing a release marker */}
      <span
        className="absolute -top-px left-0 h-px w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full group-focus-within:w-full"
        aria-hidden="true"
      />
      <Link
        to={`/blog/${post.slug}`}
        className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 gap-y-2 py-7 outline-none sm:grid-cols-[4rem_1fr_2rem] sm:gap-x-6"
      >
        <span className="font-mono text-sm text-muted-foreground/60 transition-colors group-hover:text-primary sm:text-base">
          {post.number}
        </span>

        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {formatDate(post.date, lang)}
            <span className="mx-2 text-muted-foreground/40">/</span>
            {post.readingMinutes} {t.blog.minRead}
          </p>

          {/* h2, not h3: the index's only other heading is the h1, so h3 skips a level. */}
          <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
            {post.title}
          </h2>

          {post.summary && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
          )}

          {post.tags.length > 0 && (
            <p className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground/70">
              {post.tags.map(tag => (
                <span key={tag} className="rounded border border-border px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </p>
          )}
        </div>

        <ArrowRight
          size={18}
          aria-hidden="true"
          className="col-start-2 justify-self-start text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-primary sm:col-start-3 sm:justify-self-end"
        />
      </Link>
    </li>
  )
}
