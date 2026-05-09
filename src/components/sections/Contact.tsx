import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { LinkedInIcon } from '@/components/shared/BrandIcons'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { personal } from '@/data/personal'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type FormData = z.infer<typeof schema>

type SubmitState = 'idle' | 'success' | 'error'

const contactInfo = [
  {
    Icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sjunka',
    href: personal.linkedin,
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: personal.location,
    href: null,
  },
]

export function Contact() {
  const prefersReduced = useReducedMotion()
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      // Opens default mail client with pre-filled message
      const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`)
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
      setSubmitState('success')
      reset()
    } catch {
      setSubmitState('error')
    }
    setTimeout(() => setSubmitState('idle'), 5000)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-4 sm:px-6 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's build something together"
          description="Open to senior mobile engineering roles, consulting engagements, and technical collaborations."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <AnimatedSection direction="left" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Get in touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you're hiring for a senior mobile role, need consulting on a React Native
                architecture, or just want to connect — I'd love to hear from you.
              </p>
            </div>

            <ul className="space-y-4" role="list">
              {contactInfo.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-foreground">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </div>
          </AnimatedSection>

          {/* Right — contact form */}
          <AnimatedSection direction="right">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact form"
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg text-sm bg-card border text-foreground',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    'transition-colors duration-200',
                    errors.name ? 'border-destructive' : 'border-border hover:border-primary/40'
                  )}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg text-sm bg-card border text-foreground',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    'transition-colors duration-200',
                    errors.email ? 'border-destructive' : 'border-border hover:border-primary/40'
                  )}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  {...register('message')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg text-sm bg-card border text-foreground resize-none',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    'transition-colors duration-200',
                    errors.message ? 'border-destructive' : 'border-border hover:border-primary/40'
                  )}
                  placeholder="Tell me about the role, project, or collaboration you have in mind..."
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                className={cn(
                  'w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg',
                  'bg-primary text-primary-foreground font-semibold text-sm',
                  'hover:opacity-90 transition-opacity duration-200',
                  'disabled:opacity-60 disabled:cursor-not-allowed',
                  'shadow-lg shadow-primary/25'
                )}
              >
                <Send size={16} aria-hidden="true" />
                {isSubmitting ? 'Opening mail client...' : 'Send Message'}
              </motion.button>

              {/* Status messages */}
              <AnimatePresence>
                {submitState === 'success' && (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm"
                  >
                    <CheckCircle2 size={16} aria-hidden="true" />
                    Message ready to send in your mail client.
                  </motion.div>
                )}
                {submitState === 'error' && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle size={16} aria-hidden="true" />
                    Something went wrong. Please email directly at {personal.email}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
