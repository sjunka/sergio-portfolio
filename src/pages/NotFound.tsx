import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SEOHead } from '@/components/shared/SEOHead'
import { useTranslation } from '@/hooks/useTranslation'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-2xl px-4 pb-32 pt-40 sm:px-6">
      <SEOHead title={`${t.notFound.title} | Sergio Junca`} />
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">404</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">{t.notFound.title}</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">{t.notFound.body}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {t.notFound.home}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          {t.blog.backToBlog}
        </Link>
      </div>
    </div>
  )
}
