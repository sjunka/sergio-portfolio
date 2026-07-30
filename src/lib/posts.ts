import type { Lang } from '@/i18n'

export type Post = {
  slug: string
  lang: Lang
  /** Release-log number: 001 is the oldest post. */
  number: string
  title: string
  date: string
  summary: string
  tags: string[]
  body: string
  readingMinutes: number
}

// ponytail: every post body ships in the blog chunk. Swap to a lazy glob past ~30 posts.
const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Parses `key: value` frontmatter between the leading `---` fences. */
function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { meta: {} as Record<string, string>, body: raw.trim() }

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    meta[line.slice(0, sep).trim()] = line.slice(sep + 1).trim()
  }
  return { meta, body: match[2].trim() }
}

function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 220))
}

/** `flatlist-frames.en.md` -> { slug: 'flatlist-frames', lang: 'en' } */
function parseFilename(path: string) {
  const name = path.split('/').pop()!.replace(/\.md$/, '')
  const dot = name.lastIndexOf('.')
  const lang = name.slice(dot + 1)
  return {
    slug: name.slice(0, dot),
    lang: (lang === 'es' ? 'es' : 'en') as Lang,
  }
}

const all: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { slug, lang } = parseFilename(path)
    const { meta, body } = parseFrontmatter(raw)
    return {
      slug,
      lang,
      number: '',
      title: meta.title ?? slug,
      date: meta.date ?? '1970-01-01',
      summary: meta.summary ?? '',
      tags: meta.tags ? meta.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      body,
      readingMinutes: readingMinutes(body),
    }
  })
  .sort((a, b) => a.date.localeCompare(b.date))

// Number by publication order, shared across translations of the same post.
const numbers = new Map<string, string>()
for (const post of all) {
  if (!numbers.has(post.slug)) numbers.set(post.slug, String(numbers.size + 1).padStart(3, '0'))
  post.number = numbers.get(post.slug)!
}

/** Posts in the requested language, falling back to English, newest first. */
export function getPosts(lang: Lang): Post[] {
  const bySlug = new Map<string, Post>()
  for (const post of all) {
    const chosen = bySlug.get(post.slug)
    if (!chosen || (post.lang === lang && chosen.lang !== lang)) bySlug.set(post.slug, post)
  }
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date))
}

export function getTags(lang: Lang): string[] {
  return [...new Set(getPosts(lang).flatMap(p => p.tags))].sort()
}

export function formatDate(date: string, lang: Lang) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
