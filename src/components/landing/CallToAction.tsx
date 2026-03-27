'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-surface py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <motion.div
        className="relative mx-auto max-w-2xl px-5 text-center sm:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Tell us what document you need —{' '}
          <br className="hidden sm:block" />
          we&apos;ll show you how we&apos;d build it.
        </h2>
        <p className="mt-4 text-lg text-light-dark">
          Certificates, agreements, forms, or portals — describe your project
          and we&apos;ll get back to you with a plan.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(242,99,128,0.2)] hover:shadow-[0_0_32px_rgba(242,99,128,0.3)] hover:brightness-110"
          >
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/portfolio"
            className="btn-ghost inline-flex items-center rounded-lg border border-border px-7 py-3 text-sm font-semibold text-foreground/80 hover:border-border-hover hover:text-foreground"
          >
            View Past Work
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
