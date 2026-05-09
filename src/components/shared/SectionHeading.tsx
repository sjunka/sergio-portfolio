import { AnimatedSection } from './AnimatedSection'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <AnimatedSection className={cn(align === 'center' && 'text-center', className)}>
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
      <div className={cn('mt-4 h-1 w-12 rounded-full bg-primary', align === 'center' && 'mx-auto')} />
    </AnimatedSection>
  )
}
