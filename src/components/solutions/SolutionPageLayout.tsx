'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import type { Solution } from '@/config/solutions';

/* ─── Icons ─── */
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

/* ─── Capability icons ─── */
const capIcons: Record<string, React.ReactNode> = {
  'Auto-Emailed': <path d="M22 4L12 13 2 4M2 4h20v16H2z" />,
  'Auto-Numbered': <path d="M4 7V4h16v3M9 20h6M12 4v16" />,
  'Multi-Certificate Systems': <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" />,
  'Certificate History': <path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  'Digital Distribution': <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16M14 14l1.586-1.586a2 2 0 012.828 0L20 14M8 4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4z" />,
  'Validity Periods': <path d="M8 7V3M16 7V3M7 11h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  'Branded Design': <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM15 3h4a2 2 0 012 2v4M15 3l6 6M15 9h6" />,
  'Bulk Generation': <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  'Signature Pad': <path d="M15.232 5.232l3.536 3.536M9 13l6.5-6.5a2.12 2.12 0 013 3L12 16H9v-3zM16 19H3" />,
  'Multi-Language': <path d="M3 5h12M9 3v2M11.05 12.95l2.95 2.95M4 17l3-3M11 5a5 5 0 015 5M14 17a5 5 0 01-5-5" />,
  'Conditional Fields': <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 12h.01M8 12h.01M16 12h.01" />,
  'Auto-Calculations': <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14v6M14 17h6" />,
  'Price Calculations': <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />,
  'Payment Details': <path d="M3 10h18M3 6h18v12H3z" />,
  'Shipping Integration': <path d="M16 16l3-8 3 8M20 10h4M1 4h6v6H1zM1 16h6v6H1zM10 4h4M10 10h4" />,
  'Professional Layout': <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
  'Official Formatting': <path d="M9 12l2 2 4-4M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  'Verification Support': <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
  'Image Overlays': <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16M14 14l1.586-1.586a2 2 0 012.828 0L20 14M4 4h16v16H4z" />,
  'Compliance Ready': <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4" />,
  'Admin Dashboard': <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
  'Multi-User Access': <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
  'Public Status Checker': <path d="M21 21l-6-6M10 17a7 7 0 110-14 7 7 0 010 14z" />,
  'Multi-Format Output': <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  'Department Workflows': <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
  'Secure Output': <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
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
      <section className="relative overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb — Action 3: improved contrast */}
          <motion.nav
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-10 flex items-center gap-2 text-sm text-foreground/50"
          >
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span className="text-foreground/25">/</span>
            <Link href="/solutions" className="transition-colors hover:text-foreground">Solutions</Link>
            <span className="text-foreground/25">/</span>
            <span className="font-medium text-foreground/70">{solution.title}</span>
          </motion.nav>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
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
                {solution.badge && (
                  <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-white">
                    {solution.badge}
                  </span>
                )}
              </motion.div>

              <motion.h1
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-7 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                {solution.title}
              </motion.h1>

              {/* Action 3: audience label — prominent, readable */}
              <motion.p
                initial={shouldReduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-4 text-sm font-semibold text-primary"
              >
                {solution.forWho}
              </motion.p>

              <motion.p
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-lg leading-relaxed text-foreground/65 sm:text-xl sm:leading-relaxed"
              >
                {solution.headline}
              </motion.p>

              <motion.p
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 text-base leading-relaxed text-foreground/45"
              >
                {solution.description}
              </motion.p>

              {/* Action 5: CTA with context */}
              <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <ButtonLink href="/contact">
                  Start Your Project
                </ButtonLink>
                <ButtonLink href="/#demo" variant="secondary">
                  See Live Demo
                </ButtonLink>
                <span className="text-xs text-foreground/30">Free consultation, no commitment</span>
              </motion.div>
            </div>

            {/* Right — Key Feature Callout + Mockup */}
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:max-w-md"
            >
              {/* Key feature callout */}
              {highlightedCap && (
                <div className="callout-glow relative overflow-hidden rounded-xl border border-primary/25 bg-primary/[0.06] p-7">
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 animate-pulse-glow rounded-full bg-primary/[0.08] blur-[60px]" />
                  <div className="relative">
                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      Key Feature
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-primary">
                      {highlightedCap.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                      {highlightedCap.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Document mockup image */}
              <div className="mt-5 overflow-hidden rounded-xl border border-border bg-surface-2/30 p-5">
                <div className="flex items-center gap-2 text-xs text-foreground/25 mb-4">
                  <div className="h-2 w-2 rounded-full bg-primary/30" />
                  <div className="h-2 w-2 rounded-full bg-secondary/30" />
                  <div className="h-2 w-2 rounded-full bg-foreground/10" />
                  <span className="ml-2">Document preview</span>
                </div>
                <Image
                  src="/images/solutions/certificate-mockup.png"
                  alt={`${solution.title} document preview`}
                  width={340}
                  height={420}
                  className="mx-auto w-full max-w-[240px] rounded-md"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Capabilities — Action 2: richer with icons ─── */}
      <section className="border-t border-border bg-surface py-24 sm:py-32">
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
            <p className="mt-3 max-w-lg text-base text-foreground/40">
              Every {solution.title.toLowerCase()} system we build includes these features out of the box.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {regularCaps.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={shouldReduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col bg-background p-7 sm:p-8"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-foreground/50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {capIcons[cap.label] || <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{cap.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/45">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Use Cases ─── */}
      <section className="py-24 sm:py-32">
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

          <div className="mt-10 flex flex-wrap gap-3">
            {solution.examples.map((ex, i) => (
              <motion.div
                key={ex}
                initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground/55"
              >
                {ex}
              </motion.div>
            ))}
          </div>

          {/* Industries — Action 4: meaningful, not noisy pills */}
          {solution.industries.length > 0 && (
            <motion.div
              initial={shouldReduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex items-center gap-4 border-t border-border pt-8"
            >
              <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-foreground/25">
                Used in
              </span>
              <div className="flex flex-wrap gap-2">
                {solution.industries.map((industry) => (
                  <span
                    key={industry}
                    className="text-sm text-foreground/40"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Optional children */}
      {children}

      {/* ─── CTA — Action 5: better copy + context ─── */}
      <section className="border-t border-border py-24 sm:py-32">
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
            <p className="mt-4 text-base leading-relaxed text-foreground/45">
              Describe your document — we&rsquo;ll build you a custom generation system. Free consultation, typically delivered within 2 weeks.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
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
