import { Smartphone, Monitor, Network, GitBranch, Users, Sparkles, Server, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { skillGroups } from '@/data/skills'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Monitor,
  Network,
  GitBranch,
  Users,
  Sparkles,
  Server,
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-4 sm:px-6 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Core Skills"
          title="Technologies I work with"
          description="A decade of hands-on experience across the full mobile and frontend stack."
        />

        <StaggerContainer
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {skillGroups.map(group => {
            const Icon = iconMap[group.icon] ?? Smartphone
            return (
              <StaggerItem key={group.category}>
                <article
                  className={cn(
                    'h-full p-6 rounded-2xl bg-card border-l-4 border border-border',
                    'hover:shadow-lg hover:border-primary/30 transition-all duration-300',
                    group.borderClass
                  )}
                  aria-label={`${group.category} skills`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-secondary">
                      <Icon size={20} className={group.colorClass} aria-hidden />
                    </div>
                    <h3 className="font-semibold text-foreground">{group.category}</h3>
                  </div>

                  {/* Skill badges */}
                  <ul className="flex flex-wrap gap-2" role="list" aria-label={`${group.category} skill list`}>
                    {group.skills.map(skill => (
                      <li key={skill}>
                        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
