'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Stamp, ShieldCheck } from 'lucide-react';

export function PermitMockup() {
  const reduce = useReducedMotion();
  const init = (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay } };

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface-2">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 px-7 pt-6 pb-5">
        <div className="flex w-full items-center justify-between">
          <motion.div {...init(0.1)}>
            <Stamp size={24} strokeWidth={1.5} className="text-primary" />
          </motion.div>
          <motion.div {...init(0.15)} className="inline-flex items-center gap-1.5 rounded-md border border-secondary/30 bg-secondary/10 px-2.5 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] font-semibold text-secondary">Active</span>
          </motion.div>
        </div>

        <motion.p {...init(0.2)} className="font-display text-lg font-bold text-foreground">Building Safety Permit</motion.p>
        <motion.p {...init(0.25)} className="font-mono text-[11px] text-foreground/60">Permit No. BSP-2026-07341</motion.p>
        <div className="h-px w-full bg-border" />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3 px-7 pb-4">
        <DetailRow label="Issued To" value="Mark Thompson" delay={0.3} reduce={reduce} />
        <DetailRow label="Inspection Type" value="Fire Safety" delay={0.35} reduce={reduce} />
        <DetailRow label="Issued" value="Apr 7, 2026" delay={0.4} reduce={reduce} />
        <DetailRow label="Expires" value="Apr 7, 2027" delay={0.45} reduce={reduce} />
      </div>

      <div className="mx-7 h-px bg-border" />

      {/* Authority */}
      <div className="flex flex-col items-center gap-2 px-7 py-5">
        <motion.span {...init(0.5)} className="text-[11px] text-foreground/40">Authorized by</motion.span>
        <motion.span {...init(0.55)} className="text-[13px] font-medium text-foreground/60">City Building Authority</motion.span>
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-1.5"
        >
          <ShieldCheck size={14} className="text-secondary" />
          <span className="text-[11px] font-medium text-secondary">Digitally Verified</span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center border-t border-border bg-surface px-7 py-3">
        <span className="font-mono text-[10px] text-foreground/40">Verify at permits.example.gov</span>
      </div>
    </div>
  );
}

function DetailRow({ label, value, delay, reduce }: { label: string; value: string; delay: number; reduce: boolean | null }) {
  const init = reduce ? {} : { initial: { opacity: 0, x: -4 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.35, delay } };
  return (
    <motion.div {...init} className="flex items-center justify-between">
      <span className="text-xs text-foreground/40">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </motion.div>
  );
}
