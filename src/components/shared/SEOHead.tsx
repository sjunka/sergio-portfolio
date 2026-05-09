import { Helmet } from 'react-helmet-async'
import { personal } from '@/data/personal'

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

export function SEOHead() {
  return (
    <Helmet>
      <html lang="en" />
      <title>Sergio Junca | Senior React Native Engineer | iOS & Android</title>
      <meta
        name="description"
        content="Senior Mobile Engineer with 10+ years building production React Native apps for fintech, gaming, healthcare, and logistics. Available for senior roles globally."
      />
      <meta
        name="keywords"
        content="React Native, Senior Mobile Engineer, TypeScript, JavaScript, iOS, Android, Cross-Platform, Fintech, Gaming, iGaming, Healthcare, Logistics, Redux, MobX, GraphQL, CI/CD, CircleCI, Colombia, Remote"
      />
      <meta name="author" content="Sergio Junca" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0A0F1E" />
      <link rel="canonical" href={personal.siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={personal.siteUrl} />
      <meta property="og:title" content="Sergio Junca | Senior React Native Engineer" />
      <meta
        property="og:description"
        content="10+ years shipping production mobile apps across iOS & Android. React Native specialist in fintech, gaming, healthcare, and logistics."
      />
      <meta property="og:image" content={`${personal.siteUrl}og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sergio Junca | Senior React Native Engineer" />
      <meta
        name="twitter:description"
        content="10+ years shipping production mobile apps across iOS & Android."
      />
      <meta name="twitter:image" content={`${personal.siteUrl}og-image.png`} />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  )
}
