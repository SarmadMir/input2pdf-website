'use client';

import { motion, type MotionValue } from 'framer-motion';

interface SolutionNumberProps {
  number: string;
  numberY: MotionValue<number>;
  isReversed: boolean;
}

export function SolutionNumber({ number, numberY, isReversed }: SolutionNumberProps) {
  return (
    <motion.span
      style={{ y: numberY }}
      className={`pointer-events-none absolute -top-4 font-display text-[10rem] font-black leading-none text-primary/[0.07] select-none sm:text-[13rem] lg:text-[16rem] ${
        isReversed ? 'left-4 lg:left-6' : 'right-4 lg:right-6'
      }`}
      aria-hidden="true"
    >
      {number}
    </motion.span>
  );
}
