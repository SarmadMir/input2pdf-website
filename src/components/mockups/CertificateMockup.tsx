'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Award } from 'lucide-react';

export function CertificateMockup() {
  const reduce = useReducedMotion();
  const init = (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay } };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col items-center gap-3.5 rounded-lg bg-[#f4eee3] px-8 py-10 text-center sm:px-10 sm:py-12">
        {/* Top accent */}
        <motion.div
          initial={reduce ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-0.5 w-16 bg-primary"
        />

        <motion.div {...init(0.15)}>
          <Award size={44} strokeWidth={1.5} className="mt-1 text-primary" />
        </motion.div>

        <motion.p {...init(0.25)} className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">
          Certificate of Completion
        </motion.p>

        <motion.div {...init(0.3)} className="h-px w-16 bg-[#d4c5ab]" />

        <motion.p {...init(0.35)} className="text-xs text-[#8b7355]">Presented to</motion.p>
        <motion.p {...init(0.4)} className="font-display text-[1.85rem] font-bold leading-tight text-[#2a241d]">Jane Doe</motion.p>
        <motion.p {...init(0.45)} className="text-xs text-[#8b7355]">for completing</motion.p>
        <motion.p {...init(0.5)} className="text-sm font-semibold text-[#b8412d]">Advanced CPR &amp; First Aid Certification</motion.p>

        <motion.div {...init(0.55)} className="h-px w-16 bg-[#d4c5ab]" />

        <motion.p {...init(0.6)} className="font-mono text-[10px] text-[#8b7355]">April 6, 2026 &middot; No. CPR-2026-00847</motion.p>

        {/* Bottom accent */}
        <motion.div
          initial={reduce ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 h-0.5 w-16 bg-primary"
        />
      </div>
    </div>
  );
}
