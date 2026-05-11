import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Code2, Layers, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!inView || prefersReduced) {
      setCount(target);
      return;
    }
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, target, prefersReduced]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {count}
      {suffix}
    </span>
  );
}

const highlights = [
  {
    icon: Code2,
    title: "Cross-Platform Expert",
    description:
      "Single codebase, native performance. React Native from Day 1 to App Store.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Layers,
    title: "Architecture-First",
    description:
      "Scalable component systems, CI/CD pipelines, and performance-optimized builds.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Users,
    title: "Team Multiplier",
    description:
      "Technical mentor, team lead, and code reviewer who elevates everyone around them.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="About Me"
          title="Engineering mobile experiences at scale"
          description="I don't just write code — I build systems, mentor teams, and deliver products that live in millions of pockets."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Left — avatar + location */}
          <AnimatedSection direction="left">
            <div className="flex flex-col items-center md:items-start gap-6">
              {/* Avatar placeholder */}
              <div className="relative">
                <img
                  src="/avatar.png"
                  alt="Sergio Junca"
                  className="size-48 rounded-2xl object-cover shadow-2xl"
                />
                <div className="absolute -bottom-3 -right-3 size-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg" aria-hidden="true">
                    ✓
                  </span>
                </div>
              </div>

              {/* Location badge */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary" aria-hidden="true" />
                <span>{personal.location}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                {personal.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-xl bg-card border border-border"
                  >
                    <div className="text-2xl font-extrabold text-primary">
                      <AnimatedCounter
                        target={parseInt(stat.value)}
                        suffix={stat.value.replace(/[0-9]/g, "")}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right — bio + highlights */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a{" "}
                  <strong className="text-foreground">
                    Senior Mobile Engineer
                  </strong>{" "}
                  with over 10 years of experience building and shipping
                  production-grade React Native applications across fintech,
                  gaming, healthcare, and logistics industries.
                </p>
                <p>
                  My expertise spans the full mobile lifecycle, from
                  architecture decisions and scalable component systems to CI/CD
                  pipelines, App Store deployments, and performance
                  optimization. I've led engineering teams, mentored developers,
                  and delivered features trusted by real users every day.
                </p>
                <p>
                  I hold a{" "}
                  <strong className="text-foreground">
                    Bachelor's degree in Computer Science and Engineering
                  </strong>{" "}
                  from the Autonomous University of Bucaramanga and have been a
                  technical speaker and mentor throughout my career.
                </p>
              </div>

              {/* Highlight cards */}
              <div className="space-y-3">
                {highlights.map(
                  ({ icon: Icon, title, description, color, bg }) => (
                    <m.div
                      key={title}
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
                    >
                      <div className={cn("p-2 rounded-lg flex-shrink-0", bg)}>
                        <Icon size={18} className={color} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-0.5">
                          {title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </m.div>
                  ),
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
