'use client';

import { useState, type ComponentType } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  Trophy,
  BadgeCheck,
  HeartPulse,
  IdCard,
  FileInput,
  Stethoscope,
  Receipt,
  FileSpreadsheet,
  Stamp,
  LayoutDashboard,
  SearchCheck,
  FileSignature,
  ClipboardCheck,
  FileText,
  type LucideProps,
} from 'lucide-react';
import { documentTypes } from '@/config/document-types';

// Icon resolution — cover every icon name used in config/document-types.ts.
// Unknown names fall back to FileText so a render never breaks on a typo.
const iconByName: Record<string, ComponentType<LucideProps>> = {
  award: Award,
  trophy: Trophy,
  'badge-check': BadgeCheck,
  'heart-pulse': HeartPulse,
  'id-card': IdCard,
  'file-input': FileInput,
  stethoscope: Stethoscope,
  receipt: Receipt,
  'file-spreadsheet': FileSpreadsheet,
  stamp: Stamp,
  'layout-dashboard': LayoutDashboard,
  'search-check': SearchCheck,
  'file-signature': FileSignature,
  'clipboard-check': ClipboardCheck,
};

export function DocumentTypesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const init = reduce ? false : { opacity: 0, y: 14 };
  const show = { opacity: 1, y: 0 };
  const vp = { once: true, margin: '-8%' as const };

  return (
    <section
      id="document-types"
      aria-labelledby="doc-types-heading"
      className="bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.header
          className="mb-14 max-w-2xl"
          initial={init}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            What we generate
          </span>
          <h2
            id="doc-types-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Any document your organization issues — at scale.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-light-dark">
            From certificates to contracts, invoices to inspection permits.
            Hover or tap any type to see the use case.
          </p>
        </motion.header>

        <motion.ul
          role="list"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
          initial={init}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.5, staggerChildren: 0.04, delay: 0.1 }}
        >
          {documentTypes.map((dt) => {
            const Icon = iconByName[dt.icon] ?? FileText;
            const isActive = activeId === dt.name;
            return (
              <li key={dt.name}>
                <button
                  type="button"
                  onClick={() => setActiveId(isActive ? null : dt.name)}
                  aria-expanded={isActive}
                  className="group relative flex h-full w-full flex-col items-start gap-2.5 rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={16} aria-hidden />
                  </div>
                  <span className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {dt.name}
                  </span>

                  {/* Preview — visible on hover (desktop :hover) or when active (tap toggle).
                      motion-reduce:transition-none respects prefers-reduced-motion. */}
                  <span
                    className={[
                      'block text-xs leading-relaxed text-foreground/60 transition-opacity duration-200 motion-reduce:transition-none',
                      isActive
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100',
                    ].join(' ')}
                  >
                    {dt.useCase}
                  </span>
                </button>
              </li>
            );
          })}
        </motion.ul>

        <motion.div
          className="mt-10 text-center"
          initial={init}
          whileInView={show}
          viewport={vp}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            See all categories →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
