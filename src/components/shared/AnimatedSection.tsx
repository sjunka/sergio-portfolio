import { memo, forwardRef, useCallback } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export const AnimatedSection = memo(
  forwardRef<HTMLDivElement, AnimatedSectionProps>(function AnimatedSection(
    { children, className, delay = 0, direction = 'up' },
    forwardedRef
  ) {
    const prefersReduced = useReducedMotion()
    const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        inViewRef(node)
        if (typeof forwardedRef === 'function') {
          forwardedRef(node)
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [inViewRef, forwardedRef]
    )

    const directionMap = {
      up: { y: 40, x: 0 },
      left: { x: -60, y: 0 },
      right: { x: 60, y: 0 },
      none: { x: 0, y: 0 },
    }

    const initial = prefersReduced
      ? { opacity: 1, x: 0, y: 0 }
      : { opacity: 0, ...directionMap[direction] }

    const animate = prefersReduced
      ? { opacity: 1, x: 0, y: 0 }
      : inView
        ? { opacity: 1, x: 0, y: 0 }
        : { opacity: 0, ...directionMap[direction] }

    return (
      <m.div
        ref={setRef}
        initial={initial}
        animate={animate}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className={cn(className)}
      >
        {children}
      </m.div>
    )
  })
)
AnimatedSection.displayName = 'AnimatedSection'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export const StaggerContainer = memo(function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView || prefersReduced ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
    >
      {children}
    </m.div>
  )
})
StaggerContainer.displayName = 'StaggerContainer'

export const StaggerItem = memo(function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const prefersReduced = useReducedMotion()

  return (
    <m.div
      className={cn(className)}
      variants={
        prefersReduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
            }
      }
    >
      {children}
    </m.div>
  )
})
StaggerItem.displayName = 'StaggerItem'
