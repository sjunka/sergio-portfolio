import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { experiences } from '@/data/experience'
import { cn } from '@/lib/utils'

const industryColorMap: Record<string, string> = {
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  slate: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
}

function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number]
  index: number
}) {
  const prefersReduced = useReducedMotion()
  const isEven = index % 2 === 0

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <li
      ref={ref}
      className={cn(
        'relative flex flex-col md:flex-row gap-0 md:gap-8',
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Card */}
      <motion.div
        className={cn('w-full md:w-[calc(50%-2.5rem)]', isEven ? 'md:text-right' : 'md:text-left')}
        initial={prefersReduced ? {} : { opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView || prefersReduced ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <article
          className={cn(
            'p-5 sm:p-6 rounded-2xl bg-card border border-border',
            'hover:border-primary/40 hover:shadow-lg transition-all duration-300',
            'ml-10 md:ml-0' // mobile offset for timeline dot
          )}
        >
          {/* Header */}
          <div className={cn('mb-4', isEven ? 'md:items-end' : 'md:items-start', 'flex flex-col gap-2')}>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                  industryColorMap[exp.industryColor] ?? industryColorMap.slate
                )}
              >
                {exp.industry}
              </span>
              {exp.type === 'Contract' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-secondary text-secondary-foreground border-border">
                  Contract
                </span>
              )}
              {exp.isCurrent && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Current
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
              {exp.role}
            </h3>

            <div>
              <span className="font-semibold text-primary">{exp.company}</span>
              {exp.client && (
                <span className="text-sm text-muted-foreground"> · Client: {exp.client}</span>
              )}
            </div>

            <time
              dateTime={exp.period}
              className="text-xs text-muted-foreground flex items-center gap-1"
            >
              <Briefcase size={11} aria-hidden="true" />
              {exp.period}
            </time>
          </div>

          {/* Bullets */}
          <ul className={cn('space-y-2', isEven ? 'md:text-right' : 'md:text-left')} role="list">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2 md:items-start">
                <span className="text-primary mt-1.5 flex-shrink-0 text-xs" aria-hidden="true">▹</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>
      </motion.div>

      {/* Center dot — desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
        <div className={cn('relative h-5 w-5 rounded-full border-2 border-primary bg-background')}>
          {exp.isCurrent && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" aria-hidden="true" />
          )}
          <span className={cn('absolute inset-1 rounded-full', exp.isCurrent ? 'bg-primary' : 'bg-muted-foreground/40')} />
        </div>
      </div>

      {/* Mobile dot */}
      <div className="absolute left-0 top-6 md:hidden flex items-center z-10">
        <div className="relative h-5 w-5 rounded-full border-2 border-primary bg-background">
          {exp.isCurrent && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" aria-hidden="true" />
          )}
          <span className={cn('absolute inset-1 rounded-full', exp.isCurrent ? 'bg-primary' : 'bg-muted-foreground/40')} />
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" aria-hidden="true" />
    </li>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Experience"
          title="10+ years of mobile engineering"
          description="A track record of delivering production-grade React Native apps across industries and geographies."
        />

        <div className="mt-16 relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-2.5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-transparent -translate-x-px md:-translate-x-px"
            aria-hidden="true"
          />

          <ol className="relative space-y-10 md:space-y-16" aria-label="Work experience timeline">
            {experiences.map((exp, i) => (
              <TimelineCard key={exp.id} exp={exp} index={i} />
            ))}
          </ol>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Interested in working together?
          </a>
        </div>
      </div>
    </section>
  )
}
