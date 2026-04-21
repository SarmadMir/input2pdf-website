'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, HeartHandshake, FilePenLine, Receipt, Stamp, LayoutGrid, FileSignature, ArrowRight } from 'lucide-react';
import { solutions } from '@/config/solutions';
import { Badge } from '@/components/ui/Badge';

/* ─── Icons (matches mega menu) ─── */
// Plan 03-03: 'contract' stub keeps the landing build passing when SolutionSlug
// widens. Plan 03-11 owns the visual polish for the 7-card layout.
const icons: Record<string, React.ReactNode> = {
  certificate: <Award size={22} />,
  ecard: <HeartHandshake size={22} />,
  form: <FilePenLine size={22} />,
  invoice: <Receipt size={22} />,
  permit: <Stamp size={22} />,
  portal: <LayoutGrid size={22} />,
  contract: <FileSignature size={22} />,
};

const slugMap: Record<string, string> = {
  certificate: '/solutions/certificates',
  ecard: '/solutions/ecards',
  form: '/solutions/forms',
  invoice: '/solutions/invoices',
  permit: '/solutions/permits',
  portal: '/solutions/portals',
  contract: '/solutions/contracts',
};

export function SolutionsOverview() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="relative bg-surface py-28 sm:py-36"
    >
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
          <h2
            id="solutions-heading"
            className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            What We Build
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-light-dark sm:text-xl">
            Custom PDF systems for every document type and your business needs — pick yours to learn more.
          </p>
        </motion.div>

        {/* ─── Solution teaser cards — 3x2 grid ─── */}
        <ul role="list" className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => {
            const highlighted = sol.capabilities.find((c) => c.highlight);
            return (
              <motion.li
                key={sol.number}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={slugMap[sol.icon]}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:p-8"
                >
                  {/* Background number — decorative only */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-1 -top-4 font-display text-[7rem] font-black leading-none text-primary/[0.08] select-none sm:text-[8rem]"
                  >
                    {sol.number}
                  </span>

                  <div className="relative flex-1">
                    {/* Row 1: Icon + optional badge (keeps title row unblocked) */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-200 group-hover:border-primary/40 group-hover:bg-primary/20">
                        {icons[sol.icon]}
                      </div>
                      {sol.badge && (
                        <Badge variant="solid-primary" size="sm">
                          {sol.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Row 2: Title — full width so long titles wrap cleanly */}
                    <h3 className="mt-5 font-display text-lg font-bold text-foreground sm:text-xl">
                      {sol.title}
                    </h3>

                    {/* Headline */}
                    <p className="mt-3 text-sm leading-relaxed text-foreground/60 sm:text-base">
                      {sol.headline}
                    </p>

                    {/* Key feature highlight — pill-wrapped for stronger visual weight */}
                    {highlighted && (
                      <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/[0.08] px-2.5 py-1 text-xs font-semibold text-primary sm:text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {highlighted.label}
                      </div>
                    )}
                  </div>

                  {/* Learn more */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary/70 transition-colors group-hover:text-primary">
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

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
            className="group/all inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
          >
            See all solutions
            <ArrowRight size={14} className="transition-transform group-hover/all:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
