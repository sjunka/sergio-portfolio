import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(cn('a', false, undefined, null, '', 'b')).toBe('a b')
  })

  it('resolves conflicting tailwind utilities in favour of the last one', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-sm text-muted-foreground', 'text-primary')).toBe('text-sm text-primary')
  })

  it('keeps non-conflicting utilities together', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4')
  })

  it('accepts conditional object and array syntax', () => {
    expect(cn(['a', { b: true, c: false }])).toBe('a b')
  })
})
