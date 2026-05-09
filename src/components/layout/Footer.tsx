import { Mail } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from '@/components/shared/BrandIcons'
import { personal } from '@/data/personal'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer role="contentinfo" className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} <span className="text-foreground font-medium">Sergio Junca</span>. Built with React & Vite.
        </p>

        <nav aria-label="Social links">
          <ul className="flex items-center gap-3" role="list">
            <li>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
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
                aria-label="GitHub profile"
                className="size-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary transition-colors"
              >
                <GitHubIcon size={16} />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Send email"
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
