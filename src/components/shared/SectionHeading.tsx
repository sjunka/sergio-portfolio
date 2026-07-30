import { memo } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
  /** Target of the section's `aria-labelledby`, so the section has a name. */
  id?: string
}

export const SectionHeading = memo(function SectionHeading({
  label,
  title,
  description,
  className,
  align = 'center',
  id,
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={cn(align === 'center' && 'text-center', className)}>
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
        {label}
      </span>
      <h2 id={id} className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
      <div className={cn('mt-4 h-1 w-12 rounded-full bg-primary', align === 'center' && 'mx-auto')} />
    </AnimatedSection>
  )
})
SectionHeading.displayName = 'SectionHeading'
