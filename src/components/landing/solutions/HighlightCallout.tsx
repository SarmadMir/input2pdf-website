'use client';

import { motion } from 'framer-motion';
import type { Capability } from '@/config/solutions';
import { Badge } from '@/components/ui/Badge';

interface HighlightCalloutProps {
  capability: Capability;
}

export function HighlightCallout({ capability }: HighlightCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
      className="callout-glow relative w-full overflow-hidden rounded-xl border border-primary/25 bg-primary/[0.06] p-6 sm:p-7"
    >
      {/* Coral left accent bar */}
      <div className="absolute inset-y-0 left-0 w-1 bg-primary" />

      {/* Animated glow background */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 animate-pulse-glow rounded-full bg-primary/[0.08] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 animate-pulse-glow rounded-full bg-primary/[0.05] blur-[50px]" style={{ animationDelay: '1.5s' }} />

      <div className="relative flex items-start gap-4 sm:gap-5">
        {/* Icon — larger, more presence */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/15 text-primary">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13 2 4" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-primary sm:text-lg">
              {capability.label}
            </span>
            <Badge variant="ghost-primary" size="sm" uppercase>
              Key Feature
            </Badge>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base sm:leading-relaxed">
            {capability.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
