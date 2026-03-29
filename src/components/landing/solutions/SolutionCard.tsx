'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import type { Solution } from '@/config/solutions';
import { SolutionNumber } from './SolutionNumber';
import { CapabilityPill } from './CapabilityPill';
import { HighlightCallout } from './HighlightCallout';

/* ─── Icon map (string key → SVG) — larger, bolder icons ─── */
const icons: Record<Solution['icon'], React.ReactNode> = {
  certificate: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  ecard: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
      <path d="M7 15h4" />
    </svg>
  ),
  form: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  ),
  portal: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
      <circle cx="15" cy="15" r="2" />
    </svg>
  ),
};

interface SolutionCardProps {
  solution: Solution;
  index: number;
}

export function SolutionCard({ solution, index }: SolutionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const isReversed = index % 2 !== 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  /* ─── Scroll-driven transforms ─── */
  const rawNumberY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const numberY = useSpring(rawNumberY, { stiffness: 80, damping: 30 });

  const rawCardOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const cardOpacity = shouldReduce ? 1 : rawCardOpacity;

  const rawCardY = useTransform(scrollYProgress, [0, 0.22], [60, 0]);
  const cardY = shouldReduce ? 0 : rawCardY;

  /* ─── Find the highlighted capability for the callout ─── */
  const highlightedCap = solution.capabilities.find((c) => c.highlight);
  const regularCaps = solution.capabilities.filter((c) => !c.highlight);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: cardOpacity, y: cardY }}
      className="relative"
    >
      {/* ─── SINGLE unified card container ─── */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2/50 p-8 sm:p-10 lg:p-14">
        {/* Decorative number — large, visible, part of the design */}
        <SolutionNumber
          number={solution.number}
          numberY={shouldReduce ? ({ get: () => 0 } as any) : numberY}
          isReversed={isReversed}
        />

        {/* Ambient glow */}
        <div
          className={`pointer-events-none absolute h-64 w-64 rounded-full blur-[100px] ${
            solution.badge
              ? 'bg-primary/[0.06]'
              : 'bg-primary/[0.03]'
          } ${isReversed ? '-left-20 -top-20' : '-right-20 -top-20'}`}
        />

        {/* ─── Header row: icon + number + title + badge ─── */}
        <div className="relative mb-8 flex items-center gap-5">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            {icons[solution.icon]}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-sm font-medium tracking-widest text-primary/40">
              {solution.number}
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {solution.title}
            </h3>
            {solution.badge && (
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {solution.badge}
              </span>
            )}
          </div>
        </div>

        {/* ─── Headline + Description ─── */}
        <div className="relative mb-8 max-w-2xl">
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg leading-relaxed text-foreground/80 sm:text-xl sm:leading-relaxed"
          >
            {solution.headline}
          </motion.p>
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm leading-relaxed text-light-dark sm:text-base"
          >
            {solution.description}
          </motion.p>
          <motion.p
            initial={shouldReduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-3 text-xs font-semibold uppercase tracking-widest text-primary/50"
          >
            {solution.forWho}
          </motion.p>
        </div>

        {/* ─── HIGHLIGHT CALLOUT — full width, dominant, first visual focus ─── */}
        {highlightedCap && (
          <div className="relative mb-10">
            <HighlightCallout capability={highlightedCap} />
          </div>
        )}

        {/* ─── Capabilities + Examples — inside the same card ─── */}
        <div
          className={`relative flex flex-col gap-8 lg:flex-row lg:items-start ${
            isReversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Capabilities grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {regularCaps.map((cap, i) => (
                <CapabilityPill key={cap.label} capability={cap} index={i} />
              ))}
            </div>
          </div>

          {/* Examples */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2 lg:max-w-[35%]"
          >
            {solution.examples.map((ex) => (
              <span
                key={ex}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/60"
              >
                {ex}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
