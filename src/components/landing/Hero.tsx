'use client';

import { motion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { contactHref } from '@/lib/contact/url';
import { brand } from '@/config/site';
import { PROJECTS_SHIPPED, FIVERR_RATING } from '@/config/stats';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] translate-x-1/4 rounded-full bg-secondary/[0.04] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid min-h-[calc(100vh-64px)] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-0">
          {/* Left — Copy (staggered entrance) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <Badge variant="ghost-primary" size="lg" dot="primary">
                {brand.category}
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Systems that issue{' '}
              <br className="hidden sm:block" />
              <span className="text-primary">documents continuously.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 font-display text-lg font-medium tracking-wide text-primary sm:text-xl"
            >
              {brand.tagline}
            </motion.p>

            <motion.p variants={fadeUp} className="mt-5 max-w-lg text-base leading-relaxed text-light-dark sm:text-lg">
              Certificates for your students. Agreements for your clients.
              Invoices, badges, permits — we build the system that issues them
              end to end, on every submission.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="#demo">
                See How It Works
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </ButtonLink>
              <ButtonLink href={contactHref()} variant="secondary">
                Tell Us What You Need
              </ButtonLink>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 text-xs text-light-dark">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>{FIVERR_RATING.toFixed(1)} on Fiverr</span>
              </div>
              <div className="h-3 w-px bg-border" />
              <span>{PROJECTS_SHIPPED}+ projects delivered</span>
            </motion.div>
          </motion.div>

          {/* Right — Visual illustration */}
          <motion.div
            className="relative hidden lg:flex lg:items-center lg:justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Vertical flow: Form → Arrow → PDF — rendered as a static composition (motion-budget compliant) */}
            <div className="flex w-full max-w-sm select-none flex-col items-center gap-3">
              {/* Form card */}
              <div className="w-full rounded-xl border border-border bg-surface p-5 shadow-2xl shadow-black/20">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-light-dark">Student Details</span>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="mb-1 text-[10px] font-medium text-light-dark">Full Name</div>
                    <div className="rounded-md border border-border bg-background px-3 py-1.5">
                      <span className="text-xs text-foreground/80">Sarah Johnson</span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-medium text-light-dark">Course Completed</div>
                    <div className="rounded-md border border-border bg-background px-3 py-1.5">
                      <span className="text-xs text-foreground/80">Advanced Leadership Training</span>
                    </div>
                  </div>
                  <a
                    href="#demo"
                    className="btn-primary flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2 text-[11px] font-semibold text-white hover:bg-primary/90"
                  >
                    Generate Certificate
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Flow arrow */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>

              {/* PDF card */}
              <div className="w-full rounded-xl border border-border bg-surface p-4 shadow-2xl shadow-black/20">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-primary">Generated Document</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="rounded-md border border-border/50 bg-background/50 px-4 py-5 text-center">
                  <div className="text-[8px] font-medium text-light-dark tracking-[0.2em] uppercase">Certificate of Completion</div>
                  <div className="mx-auto mt-2 h-px w-12 bg-primary/20" />
                  <div className="mt-2 text-[7px] text-light-dark">Presented to</div>
                  <div className="mt-1 text-base font-bold text-foreground">Sarah Johnson</div>
                  <div className="mt-1 text-[8px] text-light-dark">for successfully completing</div>
                  <div className="mt-0.5 text-[10px] font-medium text-foreground/80">Advanced Leadership Training</div>
                  <div className="mx-auto mt-3 h-px w-12 bg-primary/20" />
                  <div className="mt-2 flex items-center justify-center gap-3">
                    <div className="text-center">
                      <div className="h-3 w-8 border-b border-light-dark/30" />
                      <div className="mt-0.5 text-[6px] text-light-dark">Date</div>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-50" />
                    <div className="text-center">
                      <div className="h-3 w-8 border-b border-light-dark/30" />
                      <div className="mt-0.5 text-[6px] text-light-dark">Signature</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glow — static, non-animated (motion-budget compliant) */}
              <div className="absolute -bottom-4 left-1/4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
