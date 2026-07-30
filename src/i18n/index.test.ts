import { describe, it, expect } from 'vitest'
import { translations } from './index'

/** Every leaf path in an object, e.g. `nav.about` or `hero.tags.0`. */
function paths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => paths(v, `${prefix}.${i}`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k))
  }
  return [prefix]
}

describe('translations', () => {
  it('exposes both supported languages', () => {
    expect(Object.keys(translations).sort()).toEqual(['en', 'es'])
  })

  it('has the same key set in every language', () => {
    expect(paths(translations.es).sort()).toEqual(paths(translations.en).sort())
  })

  it('has no empty strings', () => {
    for (const [lang, dict] of Object.entries(translations)) {
      const empties = paths(dict).filter(p =>
        p.split('.').reduce<unknown>((acc, k) => (acc as Record<string, unknown>)?.[k], dict) === ''
      )
      expect(empties, `empty keys in ${lang}`).toEqual([])
    }
  })

  it('actually translates — es differs from en on the nav labels', () => {
    expect(translations.es.nav.about).not.toBe(translations.en.nav.about)
  })
})
