'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { solutions } from '@/config/solutions';

/* ─── Icons ─── */
const icons: Record<string, React.ReactNode> = {
  certificate: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  ecard: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  ),
  form: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  ),
  portal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
};

const slugMap: Record<string, string> = {
  certificate: '/solutions/certificates',
  ecard: '/solutions/ecards',
  form: '/solutions/forms',
  portal: '/solutions/portals',
};

export function SolutionsOverview() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="solutions" className="relative bg-surface py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ─── Header ─── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="h-px flex-1 max-w-16 bg-primary/40"
              initial={shouldReduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Solutions
            </span>
            <motion.div
              className="h-px flex-1 max-w-16 bg-primary/40"
              initial={shouldReduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'right' }}
            />
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            What We Build
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-light-dark sm:text-xl">
            Custom PDF systems for every document type — pick yours to learn more.
          </p>
        </motion.div>

        {/* ─── Solution teaser cards — 2x2 grid ─── */}
        <div className="grid gap-5 sm:grid-cols-2">
          {solutions.map((sol, i) => {
            const highlighted = sol.capabilities.find((c) => c.highlight);
            return (
              <motion.div
                key={sol.number}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={slugMap[sol.icon]}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-7 transition-colors duration-200 hover:border-primary/30 sm:p-8"
                >
                  {/* Background number */}
                  <span className="pointer-events-none absolute -right-1 -top-4 font-display text-[7rem] font-black leading-none text-primary/[0.04] select-none sm:text-[8rem]">
                    {sol.number}
                  </span>

                  <div className="relative flex-1">
                    {/* Icon + title */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        {icons[sol.icon]}
                      </div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                          {sol.title}
                        </h3>
                        {sol.badge && (
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                            {sol.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="mt-4 text-sm leading-relaxed text-foreground/60 sm:text-base">
                      {sol.headline}
                    </p>

                    {/* Key feature highlight */}
                    {highlighted && (
                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary sm:text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {highlighted.label}
                      </div>
                    )}
                  </div>

                  {/* Learn more */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-50 transition-opacity group-hover:opacity-100">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* See all */}
        <motion.div
          className="mt-12 text-center"
          initial={shouldReduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/solutions"
            className="text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            See all solutions &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
