import { describe, it, expect, vi, afterEach } from 'vitest'
import { prefersReducedMotion } from './motion'

const original = window.matchMedia

afterEach(() => {
  window.matchMedia = original
})

function stubMatchMedia(matches: boolean) {
  const spy = vi.fn((query: string) => ({ matches, media: query }) as MediaQueryList)
  window.matchMedia = spy
  return spy
}

describe('prefersReducedMotion', () => {
  it('is false when the OS has no reduced-motion preference', () => {
    stubMatchMedia(false)
    expect(prefersReducedMotion()).toBe(false)
  })

  it('is true when the OS asks for reduced motion', () => {
    stubMatchMedia(true)
    expect(prefersReducedMotion()).toBe(true)
  })

  it('queries prefers-reduced-motion, and reads live on every call', () => {
    const spy = stubMatchMedia(false)
    prefersReducedMotion()
    prefersReducedMotion()
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })
})
