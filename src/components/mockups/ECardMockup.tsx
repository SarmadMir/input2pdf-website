'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CircleCheck, HeartHandshake } from 'lucide-react';

export function ECardMockup() {
  const reduce = useReducedMotion();
  const init = (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } };

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface-2">
      <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-[#1a1230] to-surface-2 px-7 py-8 text-center sm:px-8 sm:py-10">
        <motion.div {...init(0.1)} className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5">
          <CircleCheck size={14} className="text-secondary" />
          <span className="text-[11px] font-semibold text-secondary">Verified</span>
        </motion.div>

        <motion.div {...init(0.2)}>
          <HeartHandshake size={36} strokeWidth={1.5} className="text-primary" />
        </motion.div>

        <motion.p {...init(0.3)} className="font-display text-lg font-bold text-foreground sm:text-xl">
          Leadership Excellence Award
        </motion.p>

        <motion.p {...init(0.35)} className="text-xs text-foreground/40">Presented to</motion.p>

        <motion.p {...init(0.4)} className="font-display text-2xl font-bold text-foreground">Sarah Mitchell</motion.p>

        <motion.div {...init(0.45)} className="h-px w-10 bg-border" />

        <motion.p {...init(0.5)} className="text-sm text-foreground/60">Annual Training Summit 2026</motion.p>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-surface px-7 py-3.5">
        <span className="font-mono text-[10px] text-foreground/40">Valid through Dec 2028</span>
        <span className="font-mono text-[10px] text-foreground/40">ID: EC-2026-04182</span>
      </div>
    </div>
  );
}
