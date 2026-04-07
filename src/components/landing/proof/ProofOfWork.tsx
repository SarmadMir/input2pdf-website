'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '30+', label: 'Systems built' },
  { value: '6+', label: 'Countries' },
  { value: '5.0', label: 'Client rating' },
];

const quotes = [
  { text: 'Delivered exactly as requested, very responsive.', from: 'Certificate system client' },
  { text: 'Great work and quick turnaround.', from: 'Form generation client' },
  { text: 'Highly recommended for custom PDF solutions.', from: 'Portal system client' },
];

export function ProofOfWork() {
  const reduce = useReducedMotion();
  const init = (y = 12) => (reduce ? false : { opacity: 0, y });
  const show = { opacity: 1, y: 0 };
  const vp = { once: true, margin: '-8%' as const };

  return (
    <section className="border-t border-border bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Row 1 — Stats */}
        <motion.div
          initial={init()}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <span className="font-display text-4xl font-bold text-foreground">{s.value}</span>
              <span className="text-sm text-foreground/45">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mx-auto my-10 h-px w-full max-w-3xl bg-border" />

        {/* Row 2 — Client quotes */}
        <motion.div
          initial={init()}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3"
        >
          {quotes.map((q, i) => (
            <div key={i} className="text-center">
              <p className="text-sm leading-relaxed text-foreground/65">
                &ldquo;{q.text}&rdquo;
              </p>
              <p className="mt-2 text-xs text-foreground/35">{q.from}</p>
            </div>
          ))}
        </motion.div>

        {/* Row 3 — Portfolio link */}
        <motion.div
          initial={init(0)}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            See our work
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
