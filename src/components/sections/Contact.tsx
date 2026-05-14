import { useReducer, useId, useOptimistic, useTransition, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { LinkedInIcon } from '@/components/shared/BrandIcons'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { personal } from '@/data/personal'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

type FormData = {
  name: string
  email: string
  message: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'
type Action = { type: 'SUCCESS' } | { type: 'ERROR' } | { type: 'RESET' }

function submitReducer(_state: SubmitState, action: Action): SubmitState {
  switch (action.type) {
    case 'SUCCESS': return 'success'
    case 'ERROR': return 'error'
    case 'RESET': return 'idle'
  }
}

export function Contact() {
  const { t, lang } = useTranslation()
  const prefersReduced = useReducedMotion()
  const [submitState, dispatch] = useReducer(submitReducer, 'idle')
  const [isPending, startTransition] = useTransition()
  const [optimisticState, setOptimistic] = useOptimistic(
    submitState,
    (_current, next: SubmitState) => next
  )

  const nameId = useId()
  const emailId = useId()
  const messageId = useId()

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t.contact.form.nameError),
        email: z.string().email(t.contact.form.emailError),
        message: z.string().min(20, t.contact.form.messageError),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  )

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    clearErrors()
  }, [lang, clearErrors])

  const contactInfo = [
    {
      Icon: Mail,
      label: t.contact.emailLabel,
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      Icon: LinkedInIcon,
      label: t.contact.linkedinLabel,
      value: 'linkedin.com/in/sjunka',
      href: personal.linkedin,
    },
    {
      Icon: MapPin,
      label: t.contact.locationLabel,
      value: personal.location,
      href: null,
    },
  ]

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      setOptimistic('submitting')
      try {
        const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`)
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)
        window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
        dispatch({ type: 'SUCCESS' })
        reset()
      } catch {
        dispatch({ type: 'ERROR' })
      }
      setTimeout(() => dispatch({ type: 'RESET' }), 5000)
    })
  }

  const isBusy = optimisticState === 'submitting' || isPending

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-4 sm:px-6 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label={t.contact.label}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <AnimatedSection direction="left" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t.contact.getInTouch}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t.contact.getInTouchDesc}
              </p>
            </div>

            <ul className="space-y-4" role="list">
              {contactInfo.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
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
              <span className="relative flex size-2" aria-hidden="true">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t.contact.available}
            </div>
          </AnimatedSection>

          {/* Right — contact form */}
          <AnimatedSection direction="right">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label={t.contact.contactForm}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label htmlFor={nameId} className="block text-sm font-medium text-foreground mb-1.5">
                  {t.contact.form.name} <span aria-hidden="true">*</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  {...register('name')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg text-sm bg-card border text-foreground',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    'transition-colors duration-200',
                    errors.name ? 'border-destructive' : 'border-border hover:border-primary/40'
                  )}
                  placeholder={t.contact.form.namePlaceholder}
                />
                {errors.name && (
                  <p id={`${nameId}-error`} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor={emailId} className="block text-sm font-medium text-foreground mb-1.5">
                  {t.contact.form.email} <span aria-hidden="true">*</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${emailId}-error` : undefined}
                  {...register('email')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg text-sm bg-card border text-foreground',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    'transition-colors duration-200',
                    errors.email ? 'border-destructive' : 'border-border hover:border-primary/40'
                  )}
                  placeholder={t.contact.form.emailPlaceholder}
                />
                {errors.email && (
                  <p id={`${emailId}-error`} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor={messageId} className="block text-sm font-medium text-foreground mb-1.5">
                  {t.contact.form.message} <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id={messageId}
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${messageId}-error` : undefined}
                  {...register('message')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg text-sm bg-card border text-foreground resize-none',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    'transition-colors duration-200',
                    errors.message ? 'border-destructive' : 'border-border hover:border-primary/40'
                  )}
                  placeholder={t.contact.form.messagePlaceholder}
                />
                {errors.message && (
                  <p id={`${messageId}-error`} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} aria-hidden="true" /> {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <m.button
                type="submit"
                disabled={isBusy}
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
                {isBusy ? t.contact.form.sending : t.contact.form.send}
              </m.button>

              {/* Status messages */}
              <AnimatePresence>
                {optimisticState === 'success' && (
                  <m.div
                    role="status"
                    aria-live="polite"
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm"
                  >
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {t.contact.form.successMsg}
                  </m.div>
                )}
                {optimisticState === 'error' && (
                  <m.div
                    role="alert"
                    aria-live="assertive"
                    initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle size={16} aria-hidden="true" />
                    {t.contact.form.errorMsg}{personal.email}
                  </m.div>
                )}
              </AnimatePresence>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
