import { m, useReducedMotion } from 'framer-motion'
import { Smartphone, Globe, Zap, Shield } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

const mobileStack = [
  'React Native', 'TypeScript', 'iOS', 'Android',
  'Redux', 'MobX', 'GraphQL', 'REST APIs',
  'CircleCI', 'Firebase', 'TestFlight', 'Expo',
  'React Navigation', 'Reanimated', 'WCAG Accessibility',
]

const mobileStatsValues = [
  { value: '6+', key: 'years' as const },
  { value: '2', key: 'platforms' as const },
  { value: '5+', key: 'apps' as const },
]

function PhoneMockup({ mockupLabel }: { mockupLabel: string }) {
  const prefersReduced = useReducedMotion()

  return (
    <div className="relative flex items-center justify-center h-[480px] w-[280px]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-48 h-64 rounded-full bg-primary/15 blur-3xl" />
      </div>

      {/* Phone body */}
      <m.div
        animate={prefersReduced ? {} : { y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="relative z-10 w-[180px] h-[360px] bg-card border-2 border-border rounded-[36px] shadow-2xl flex flex-col overflow-hidden"
        aria-label={mockupLabel}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1">
          <div className="w-8 h-3 rounded-full bg-muted-foreground/20" />
          <div className="w-14 h-4 bg-background rounded-full" />
          <div className="w-8 h-3 rounded-full bg-muted-foreground/20" />
        </div>

        {/* Screen content */}
        <div className="flex-1 bg-gradient-to-br from-background to-secondary/40 flex flex-col items-center justify-center px-4 gap-4">
          {/* App icon */}
          <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg">
            <Smartphone size={28} className="text-primary" aria-hidden="true" />
          </div>

          {/* React Native label */}
          <div className="text-center">
            <div className="text-xs font-bold text-primary tracking-widest uppercase">React Native</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Cross-Platform</div>
          </div>

          {/* Simulated content lines */}
          <div className="w-full space-y-2 mt-2">
            <div className="h-2 bg-primary/30 rounded-full w-3/4 mx-auto" />
            <div className="h-1.5 bg-muted-foreground/20 rounded-full w-full" />
            <div className="h-1.5 bg-muted-foreground/20 rounded-full w-5/6 mx-auto" />
            <div className="h-1.5 bg-muted-foreground/15 rounded-full w-2/3 mx-auto" />
          </div>

          {/* Platform badges */}
          <div className="flex gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              iOS
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Android
            </span>
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className="h-12 bg-card/80 border-t border-border flex items-center justify-around px-6">
          <div className="size-5 rounded bg-primary/30" />
          <div className="size-5 rounded bg-muted/50" />
          <div className="size-5 rounded bg-muted/50" />
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>
      </m.div>

      {/* Floating badges */}
      <m.div
        animate={prefersReduced ? {} : { y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.5 }}
        className="absolute left-2 top-20 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm whitespace-nowrap"
        aria-hidden="true"
      >
        iOS
      </m.div>
      <m.div
        animate={prefersReduced ? {} : { y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
        className="absolute right-0 top-40 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm whitespace-nowrap"
        aria-hidden="true"
      >
        Android
      </m.div>
      <m.div
        animate={prefersReduced ? {} : { y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.2 }}
        className="absolute left-0 bottom-32 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-sm whitespace-nowrap"
        aria-hidden="true"
      >
        React Native
      </m.div>
      <m.div
        animate={prefersReduced ? {} : { y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 1.5 }}
        className="absolute right-2 bottom-20 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-500 border border-violet-500/20 shadow-sm whitespace-nowrap"
        aria-hidden="true"
      >
        TypeScript
      </m.div>
    </div>
  )
}

export function Mobile() {
  const { t } = useTranslation()

  const mobileHighlights = [
    {
      icon: Globe,
      title: t.mobile.highlights.crossPlatform.title,
      description: t.mobile.highlights.crossPlatform.description,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Zap,
      title: t.mobile.highlights.performance.title,
      description: t.mobile.highlights.performance.description,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: Shield,
      title: t.mobile.highlights.production.title,
      description: t.mobile.highlights.production.description,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ]

  return (
    <section id="mobile" aria-labelledby="mobile-heading" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label={t.mobile.label}
          title={t.mobile.title}
          description={t.mobile.description}
        />

        <div className="mt-16 grid md:grid-cols-2 gap-16 items-center">
          {/* Phone mockup */}
          <AnimatedSection direction="left" className="flex justify-center">
            <PhoneMockup mockupLabel={t.mobile.mockup} />
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="right">
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {mobileStatsValues.map(stat => (
                  <div
                    key={stat.key}
                    className="text-center p-3 rounded-xl bg-card border border-border"
                  >
                    <div className="text-2xl font-extrabold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-tight">{t.mobile.stats[stat.key]}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {mobileHighlights.map(({ icon: Icon, title, description, color, bg }) => (
                  <m.div
                    key={title}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
                  >
                    <div className={cn('p-2 rounded-lg flex-shrink-0', bg)}>
                      <Icon size={18} className={color} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">{title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* Mobile stack */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">{t.mobile.stack}</h3>
                <div className="flex flex-wrap gap-2">
                  {mobileStack.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
