'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import type { Solution } from '@/config/solutions';

/* ─── Icons (reused from SolutionCard) ─── */
const icons: Record<Solution['icon'], React.ReactNode> = {
  certificate: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  ecard: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
      <path d="M7 15h4" />
    </svg>
  ),
  form: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  ),
  invoice: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  ),
  permit: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  portal: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
      <circle cx="15" cy="15" r="2" />
    </svg>
  ),
};

interface SolutionPageLayoutProps {
  solution: Solution;
  children?: React.ReactNode;
}

export function SolutionPageLayout({ solution, children }: SolutionPageLayoutProps) {
  const shouldReduce = useReducedMotion();
  const highlightedCap = solution.capabilities.find((c) => c.highlight);
  const regularCaps = solution.capabilities.filter((c) => !c.highlight);

  return (
    <div className="bg-background">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-2 text-xs text-foreground/40"
          >
            <Link href="/" className="transition-colors hover:text-foreground/60">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="transition-colors hover:text-foreground/60">Solutions</Link>
            <span>/</span>
            <span className="text-foreground/60">{solution.title}</span>
          </motion.nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* Left — Text */}
            <div className="flex-1 lg:max-w-2xl">
              <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  {icons[solution.icon]}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm font-medium tracking-widest text-primary/40">
                    {solution.number}
                  </span>
                  {solution.badge && (
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {solution.badge}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.h1
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                {solution.title}
              </motion.h1>

              <motion.p
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-lg leading-relaxed text-foreground/70 sm:text-xl sm:leading-relaxed"
              >
                {solution.headline}
              </motion.p>

              <motion.p
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 text-base leading-relaxed text-light-dark"
              >
                {solution.description}
              </motion.p>

              <motion.p
                initial={shouldReduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-primary/50"
              >
                {solution.forWho}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <ButtonLink href="/contact">
                  Start Your Project
                </ButtonLink>
                <ButtonLink href="/#demo" variant="secondary">
                  See Live Demo
                </ButtonLink>
              </motion.div>
            </div>

            {/* Right — Key Feature Callout */}
            {highlightedCap && (
              <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="callout-glow relative w-full overflow-hidden rounded-xl border border-primary/25 bg-primary/[0.06] p-7 lg:max-w-sm"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 animate-pulse-glow rounded-full bg-primary/[0.08] blur-[60px]" />
                <div className="relative">
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Key Feature
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-primary">
                    {highlightedCap.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {highlightedCap.description}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Capabilities ─── */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Capabilities
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What&rsquo;s included
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularCaps.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-background p-6"
              >
                <h3 className="text-base font-semibold text-foreground">{cap.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/50">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Use Cases ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Use Cases
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for your workflow
            </h2>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-3">
            {solution.examples.map((ex, i) => (
              <motion.div
                key={ex}
                initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground/60"
              >
                {ex}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Industries Served ─── */}
      {solution.industries && solution.industries.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Used in
              </span>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {solution.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-primary/15 bg-primary/[0.05] px-4 py-2 text-sm font-medium text-primary/70"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Optional children (e.g., demo embed) */}
      {children}

      {/* ─── CTA ─── */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to automate your {solution.title.toLowerCase()}?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-light-dark">
              Tell us about your document — we&rsquo;ll show you how we&rsquo;d build it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">
                Start Your Project
              </ButtonLink>
              <ButtonLink href="/solutions" variant="secondary">
                View All Solutions
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
