'use client';

import { motion } from 'framer-motion';
import type { Capability } from '@/config/solutions';

interface CapabilityPillProps {
  capability: Capability;
  index: number;
}

export function CapabilityPill({ capability, index }: CapabilityPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.25, 1, 0.5, 1] as const,
      }}
      className="flex flex-col gap-1.5 rounded-xl border border-border-hover bg-background p-4"
    >
      <span className="text-sm font-semibold text-foreground">
        {capability.label}
      </span>
      <span className="text-xs leading-relaxed text-foreground/50">
        {capability.description}
      </span>
    </motion.div>
  );
}
