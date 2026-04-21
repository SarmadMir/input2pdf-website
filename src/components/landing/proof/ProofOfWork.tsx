'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/config/case-studies';
import { PROJECTS_SHIPPED, FIVERR_RATING } from '@/config/stats';

// Hand-picked preview slugs -- flagship + anonymized flagship + Contracts proof point.
// Order-independent of config/case-studies.ts; change this set here, not there.
const PREVIEW_SLUGS = ['badge-bridge', 'som-bank', 'agreement-description'] as const;

export function ProofOfWork() {
  const reduce = useReducedMotion();
  const init = (y = 12) => (reduce ? false : { opacity: 0, y });
  const show = { opacity: 1, y: 0 };
  const vp = { once: true, margin: '-8%' as const };

  const previewCards = PREVIEW_SLUGS
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="border-t border-border bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Row 1 -- Stats bound to SSoT */}
        <motion.div
          initial={init()}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-16"
        >
          <Stat value={`${PROJECTS_SHIPPED}+`} label="Systems shipped" />
          <Stat value={FIVERR_RATING.toFixed(1)} label="Client rating on Fiverr" />
          {/* Third stat dropped -- fabricated country count violates Pitfall #2 of 03-RESEARCH.md.
              If we verify a real country count, reintroduce via stats.ts constant. */}
        </motion.div>

        {/* Divider */}
        <div className="mx-auto my-12 h-px w-full max-w-3xl bg-border" />

        {/* Section heading */}
        <motion.header
          initial={init()}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="proof-heading"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Systems we&apos;ve shipped.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/60">
            Real systems, real organizations — short reads with concrete outcomes.
          </p>
        </motion.header>

        {/* Row 2 -- 3 case study preview cards */}
        <motion.div
          initial={init(16)}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {previewCards.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                <Image
                  src={study.heroImage.src}
                  alt={study.heroImage.alt}
                  width={study.heroImage.width}
                  height={study.heroImage.height}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {study.industry}
                </div>
                <h3 className="mt-2 font-display text-base font-bold text-foreground sm:text-lg">
                  {study.clientName}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">
                  {study.summary}
                </p>
                {study.metrics.length > 0 && (
                  <div className="mt-4 border-t border-border pt-4 text-xs text-foreground/55">
                    <span className="font-display text-base font-semibold text-foreground">
                      {study.metrics[0].value}
                    </span>{' '}
                    — {study.metrics[0].label}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors group-hover:text-primary">
                  Read case study
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Row 3 -- "See all" link -- /case-studies, NOT the deferred portfolio route (CSE-10) */}
        <motion.div
          initial={init(0)}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            See all case studies
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="font-display text-4xl font-bold text-foreground">{value}</span>
      <span className="text-sm text-foreground/45">{label}</span>
    </div>
  );
}
