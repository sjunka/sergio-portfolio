/** Read live so a mid-session OS change is picked up on the next animation. */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
