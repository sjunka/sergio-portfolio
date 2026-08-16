import { describe, it, expect } from 'vitest'
import { formatDate, getPosts, getTags } from './posts'

describe('getPosts', () => {
  it('returns one entry per slug, never a duplicate per translation', () => {
    const slugs = getPosts('en').map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('sorts newest first', () => {
    const dates = getPosts('en').map(p => p.date)
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates)
  })

  it('parses frontmatter into title, date, summary and tags', () => {
    for (const post of getPosts('en')) {
      expect(post.title).not.toBe('')
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Array.isArray(post.tags)).toBe(true)
      expect(post.tags.some(tag => tag === '')).toBe(false)
    }
  })

  it('strips the frontmatter fence out of the body', () => {
    for (const post of getPosts('en')) {
      expect(post.body.startsWith('---')).toBe(false)
      expect(post.body.length).toBeGreaterThan(0)
    }
  })

  it('numbers posts oldest-first as a zero-padded release log', () => {
    const oldestFirst = [...getPosts('en')].reverse()
    expect(oldestFirst.map(p => p.number)).toEqual(
      oldestFirst.map((_, i) => String(i + 1).padStart(3, '0'))
    )
  })

  it('keeps the same number for a post across languages', () => {
    const en = getPosts('en')
    const es = getPosts('es')
    for (const post of es) {
      const twin = en.find(p => p.slug === post.slug)
      expect(twin?.number).toBe(post.number)
    }
  })

  it('prefers the requested language and falls back to english', () => {
    const es = getPosts('es')
    // hiring-mobile-engineers has an es translation; the others are en-only.
    expect(es.find(p => p.slug === 'hiring-mobile-engineers')?.lang).toBe('es')
    expect(es.find(p => p.slug === 'boring-releases')?.lang).toBe('en')
  })

  it('only loads lang-suffixed files, so CLAUDE.md is not published as a post', () => {
    for (const post of getPosts('en')) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('estimates at least one reading minute per post', () => {
    for (const post of getPosts('en')) {
      expect(post.readingMinutes).toBeGreaterThanOrEqual(1)
    }
  })
})

describe('getTags', () => {
  it('returns a sorted, de-duplicated tag list', () => {
    const tags = getTags('en')
    expect(new Set(tags).size).toBe(tags.length)
    expect([...tags].sort()).toEqual(tags)
  })

  it('only returns tags that at least one post carries', () => {
    const posts = getPosts('en')
    for (const tag of getTags('en')) {
      expect(posts.some(p => p.tags.includes(tag))).toBe(true)
    }
  })
})

describe('formatDate', () => {
  it('formats in english', () => {
    expect(formatDate('2026-03-14', 'en')).toBe('Mar 14, 2026')
  })

  it('formats in spanish', () => {
    expect(formatDate('2026-03-14', 'es')).toMatch(/14 (de )?mar/i)
  })

  it('reads the date as local time, not UTC, so the day never slips', () => {
    expect(formatDate('2026-01-01', 'en')).toBe('Jan 1, 2026')
  })
})
