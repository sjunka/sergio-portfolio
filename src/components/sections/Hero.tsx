import { m, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail, Download, ArrowRight } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/shared/BrandIcons";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

const socials = [
  { Icon: LinkedInIcon, label: "LinkedIn", href: personal.linkedin },
  { Icon: GitHubIcon, label: "GitHub", href: personal.github },
  { Icon: Mail, label: "Email", href: `mailto:${personal.email}` },
];

export function Hero() {
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" aria-hidden="true" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 size-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 size-80 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: "hsl(271 91% 65%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Tag */}
        <m.div {...fadeUp(0.1)}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/30 bg-primary/10 text-primary mb-6">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-primary" />
            </span>
            Open to Senior & SSR Roles
          </span>
        </m.div>

        {/* Name */}
        <m.div {...fadeUp(0.2)}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground mb-4 leading-none">
            Sergio{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(271 91% 65%))",
              }}
            >
              Junca
            </span>
          </h1>
        </m.div>

        {/* Title */}
        <m.div {...fadeUp(0.35)}>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-3">
            Senior Mobile Engineer
          </p>
        </m.div>

        {/* Subtitle pill row */}
        <m.div
          {...fadeUp(0.45)}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {["React Native", "TypeScript", "iOS & Android", "10+ Years"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border"
              >
                {tag}
              </span>
            ),
          )}
        </m.div>

        {/* Summary */}
        <m.div {...fadeUp(0.55)}>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Building production-grade cross-platform mobile apps across{" "}
            <strong className="text-foreground font-medium">
              fintech, gaming, healthcare,
            </strong>{" "}
            and{" "}
            <strong className="text-foreground font-medium">logistics</strong>,{" "}
            from architecture to App Store.
          </p>
        </m.div>

        {/* CTAs */}
        <m.div
          {...fadeUp(0.65)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#experience"
            className={cn(
              "group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base",
              "bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200",
              "shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5",
            )}
          >
            View My Work
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </a>
          <a
            href={personal.resumePdf}
            download
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base",
              "border border-border text-foreground hover:bg-muted hover:border-primary/50",
              "transition-all duration-200 hover:-translate-y-0.5",
            )}
          >
            <Download size={16} aria-hidden="true" />
            Download CV
          </a>
        </m.div>

        {/* Socials */}
        <m.nav {...fadeUp(0.75)} aria-label="Social links">
          <ul className="flex items-center justify-center gap-3" role="list">
            {socials.map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center rounded-full",
                    "border border-border text-muted-foreground",
                    "hover:border-primary hover:text-primary hover:bg-primary/10",
                    "transition-all duration-200 hover:-translate-y-1",
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </m.nav>
      </div>

      {/* Scroll indicator */}
      <m.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <m.div
          animate={prefersReduced ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </m.div>
      </m.div>
    </section>
  );
}
