import { Helmet } from 'react-helmet-async'
import { personal } from '@/data/personal'

const defaultTitle = 'Sergio Junca | Senior React Native Engineer | iOS & Android'
const defaultDescription =
  'Senior Mobile Engineer with 10+ years building production React Native apps for fintech, gaming, healthcare, and logistics. Available for senior roles globally.'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  jobTitle: personal.title,
  description:
    'Senior React Native Engineer with 10+ years experience in cross-platform mobile development for fintech, gaming, healthcare, and logistics.',
  url: personal.siteUrl,
  email: personal.email,
  sameAs: [personal.linkedin],
  knowsAbout: [
    'React Native',
    'TypeScript',
    'JavaScript',
    'iOS Development',
    'Android Development',
    'Cross-Platform Mobile',
    'Redux',
    'MobX',
    'GraphQL',
    'REST APIs',
    'CI/CD',
    'CircleCI',
    'Agile',
    'Performance Optimization',
    'Accessibility',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Autonomous University of Bucaramanga',
  },
}

export interface SEOHeadProps {
  title?: string
  description?: string
  /** Path without a leading slash, e.g. `blog/flatlist-jank`. */
  path?: string
  /** Set on blog posts so crawlers get an article rather than a website. */
  article?: { published: string; tags: string[] }
}

export function SEOHead({ title, description, path, article }: SEOHeadProps = {}) {
  const pageTitle = title ?? defaultTitle
  const pageDescription = description ?? defaultDescription
  // Pages serves these routes as directories and 301s to the trailing-slash form,
  // so the canonical has to match or it fights the redirect.
  const url = path ? `${personal.siteUrl}${path}/` : personal.siteUrl
  // Filename is versioned on purpose: WhatsApp and LinkedIn cache a preview by
  // image URL for weeks, so a redesign only ships if the URL changes with it.
  const image = `${personal.siteUrl}og-card.jpg`
  const imageAlt = 'Sergio Junca, senior mobile engineer — React Native, iOS and Android'

  const schema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: pageTitle,
        description: pageDescription,
        datePublished: article.published,
        keywords: article.tags.join(', '),
        url,
        author: { '@type': 'Person', name: personal.name, url: personal.siteUrl },
      }
    : personSchema

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content="Sergio Junca" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0A0F1E" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      {article ? <meta property="article:published_time" content={article.published} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
