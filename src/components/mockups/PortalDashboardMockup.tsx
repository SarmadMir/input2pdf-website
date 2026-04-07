'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { User } from 'lucide-react';

const rows = [
  { doc: 'Q1 Sales Invoice', type: 'Invoice', status: 'Delivered' as const },
  { doc: 'Safety Inspection', type: 'Permit', status: 'Delivered' as const },
  { doc: 'NDA — Parker Ltd', type: 'Agreement', status: 'Pending' as const },
  { doc: 'AWS Training Cert', type: 'Certificate', status: 'Delivered' as const },
  { doc: 'Employee Badge', type: 'eCard', status: 'Delivered' as const },
];

export function PortalDashboardMockup() {
  const reduce = useReducedMotion();
  const init = (delay = 0) =>
    reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay } };

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface-2">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3.5">
        <div className="flex items-center gap-2">
          <motion.div
            initial={reduce ? undefined : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-2 w-2 rounded-full bg-secondary"
          />
          <span className="text-sm font-semibold text-foreground">DocEngine</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1">
          <User size={12} className="text-foreground/60" />
          <span className="text-[11px] font-medium text-foreground/60">Admin</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 px-5 py-4">
        <StatCard value="247" label="Documents" color="text-foreground" delay={0.15} reduce={reduce} />
        <StatCard value="4" label="Templates" color="text-primary" delay={0.25} reduce={reduce} />
        <StatCard value="98%" label="Delivered" color="text-secondary" delay={0.35} reduce={reduce} />
      </div>

      {/* Table */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-[1fr_80px_72px] items-center gap-2 py-2 font-mono text-[9px] font-semibold tracking-widest text-foreground/40">
          <span>DOCUMENT</span>
          <span>TYPE</span>
          <span className="text-right">STATUS</span>
        </div>
        <div className="h-px bg-border" />

        {rows.map((row, i) => (
          <motion.div key={row.doc} {...init(0.4 + i * 0.07)}>
            {i > 0 && <div className="h-px bg-surface" />}
            <div className="grid grid-cols-[1fr_80px_72px] items-center gap-2 py-2.5 text-[13px]">
              <span className="text-foreground">{row.doc}</span>
              <span className="text-xs text-foreground/60">{row.type}</span>
              <span
                className={`text-right text-xs font-medium ${
                  row.status === 'Delivered' ? 'text-secondary' : 'text-primary'
                }`}
              >
                {row.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label, color, delay, reduce }: { value: string; label: string; color: string; delay: number; reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col items-center gap-0.5 rounded-lg bg-surface py-3"
    >
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] font-medium tracking-wider text-foreground/40">{label}</span>
    </motion.div>
  );
}
