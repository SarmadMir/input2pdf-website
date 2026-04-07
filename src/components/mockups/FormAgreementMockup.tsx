'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FilePenLine } from 'lucide-react';

export function FormAgreementMockup() {
  const reduce = useReducedMotion();
  const init = (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay } };

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface-2">
      {/* Header */}
      <div className="flex flex-col gap-3 px-7 pt-6 pb-0">
        <div className="flex items-center justify-between">
          <motion.p {...init(0.1)} className="font-display text-lg font-bold text-foreground">Service Agreement</motion.p>
          <motion.span
            {...init(0.15)}
            className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary"
          >
            Pending Signature
          </motion.span>
        </div>
        <div className="h-px bg-border" />
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-3.5 px-7 py-4">
        <Field label="CLIENT NAME" value="Jane Cooper" delay={0.2} reduce={reduce} />
        <Field label="SERVICE TYPE" value="Website Development & Maintenance" delay={0.3} reduce={reduce} />
        <div className="flex gap-3">
          <Field label="EFFECTIVE DATE" value="Apr 7, 2026" delay={0.4} reduce={reduce} />
          <Field label="DURATION" value="12 months" delay={0.45} reduce={reduce} />
        </div>
      </div>

      {/* Signature */}
      <div className="flex flex-col gap-2 px-7 pb-5">
        <span className="font-mono text-[9px] font-semibold tracking-widest text-foreground/40">
          SIGNATURE
        </span>
        <div className="flex flex-col items-center gap-1 rounded-lg border border-border bg-surface px-4 pt-4 pb-2.5">
          <svg
            viewBox="0 0 140 52"
            className="h-10 w-36"
            fill="none"
            aria-label="Signature"
          >
            {/* Single continuous stroke — one pen, no lifts */}
            <motion.path
              d="M10 20 C12 10, 18 6, 20 16 C22 26, 20 36, 17 42 C14 47, 10 43, 14 36 C18 28, 26 18, 34 22 C40 25, 36 34, 44 28 C50 23, 48 17, 56 20 C62 23, 55 33, 64 26 C70 21, 74 30, 80 24 C85 19, 82 32, 90 27 C96 23, 92 18, 100 22 C106 25, 110 30, 116 24 C120 20, 124 28, 130 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/50"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>
          <div className="h-px w-full bg-border" />
          <p className="text-[10px] text-foreground/40">Sign above</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-surface px-7 py-3">
        <span className="font-mono text-[10px] text-foreground/40">Ref: SA-2026-00312</span>
        <FilePenLine size={14} className="text-foreground/40" />
      </div>
    </div>
  );
}

function Field({ label, value, delay, reduce }: { label: string; value: string; delay: number; reduce: boolean | null }) {
  const init = reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay } };
  return (
    <motion.div {...init} className="flex flex-1 flex-col gap-1">
      <span className="font-mono text-[9px] font-semibold tracking-widest text-foreground/40">
        {label}
      </span>
      <div className="rounded-lg border border-border bg-surface px-3.5 py-2.5">
        <span className="text-[13px] text-foreground">{value}</span>
      </div>
    </motion.div>
  );
}
