'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { Award, HeartHandshake, FilePenLine, Receipt, Stamp, LayoutGrid, FileSignature } from 'lucide-react';
import type { Solution } from '@/config/solutions';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { SolutionNumber } from './SolutionNumber';
import { CapabilityPill } from './CapabilityPill';
import { HighlightCallout } from './HighlightCallout';

/* ─── Badge treatment per label (consistent across landing + detail pages) ─── */
const badgeVariantFor = (label: string): BadgeVariant =>
  label.toLowerCase().includes('enterprise') ? 'outline-primary' : 'solid-primary';

/* ─── Icons (matches mega menu) ─── */
// Plan 03-03 adds the 'contract' key as a minimal stub (FileSignature) to keep
// `tsc --noEmit` clean when the SolutionSlug union widens. Plan 03-11 owns the
// visual polish (icon weight, final choice, card-level treatment).
const icons: Record<Solution['icon'], React.ReactNode> = {
  certificate: <Award size={26} />,
  ecard: <HeartHandshake size={26} />,
  form: <FilePenLine size={26} />,
  invoice: <Receipt size={26} />,
  permit: <Stamp size={26} />,
  portal: <LayoutGrid size={26} />,
  contract: <FileSignature size={26} />,
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
              <Badge variant={badgeVariantFor(solution.badge)} size="md">
                {solution.badge}
              </Badge>
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
