import { Mail } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from '@/components/shared/BrandIcons'
import { personal } from '@/data/personal'
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer role="contentinfo" className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} <span className="text-foreground font-medium">Sergio Junca</span>. {t.footer.built}
        </p>

        <nav aria-label={t.nav.socialLinks}>
          <ul className="flex items-center gap-3" role="list">
            <li>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.linkedinProfile}
                className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary transition-colors"
              >
                <LinkedInIcon size={16} />
              </a>
            </li>
            <li>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.githubProfile}
                className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary transition-colors"
              >
                <GitHubIcon size={16} />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${personal.email}`}
                aria-label={t.footer.sendEmail}
                className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
