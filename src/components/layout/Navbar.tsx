'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/config/site';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled
          ? 'border-border/60 bg-background/80'
          : 'border-white/[0.06] bg-background/60'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
              <path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
            </svg>
          </div>
          <div className="font-display text-lg font-semibold tracking-tight">
            <span className="text-primary">Input2PDF</span>
            <span className="text-foreground/60 font-normal">Solution</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.href.startsWith('#') ? (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/60 transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/60 transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="btn-primary ml-3 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(242,99,128,0.15)] hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(242,99,128,0.25)]"
          >
            Tell Us What You Need
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors duration-200 hover:border-border-hover md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/60">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — animated */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden border-t border-border bg-surface/80 backdrop-blur-xl md:hidden"
          >
            <div className="px-5 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  {link.href.startsWith('#') ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="block w-full py-2.5 text-left text-sm font-medium text-foreground/50 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.25 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary mt-3 block rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Tell Us What You Need
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
