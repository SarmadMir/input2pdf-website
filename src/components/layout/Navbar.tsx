'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { navLinks, solutionNavItems } from '@/config/site';

/* ─── Small icons for the dropdown ─── */
const dropdownIcons: Record<string, React.ReactNode> = {
  certificate: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  ecard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  ),
  form: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  ),
  portal: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150);
  };

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
            link.hasDropdown ? (
              /* ─── Solutions dropdown trigger ─── */
              <div
                key={link.href}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/60 transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* ─── Dropdown panel ─── */}
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] as const }}
                      className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-black/20"
                    >
                      <div className="p-2">
                        {solutionNavItems.map((item, i) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSolutionsOpen(false)}
                            className="flex items-center gap-3.5 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-primary/[0.06]"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              {dropdownIcons[item.icon]}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                {item.label}
                              </div>
                              <div className="text-xs text-foreground/40">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-border px-2 py-2">
                        <Link
                          href="/solutions"
                          onClick={() => setSolutionsOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/[0.06]"
                        >
                          See all solutions
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
          <ButtonLink href="/contact" size="sm" className="ml-3">
            Tell Us What You Need
          </ButtonLink>
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] as const }}
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
                  {link.hasDropdown ? (
                    /* ─── Mobile Solutions accordion ─── */
                    <div>
                      <button
                        type="button"
                        onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                        className="flex w-full items-center justify-between py-2.5 text-left text-sm font-medium text-foreground/50 transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobileSolutionsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4"
                          >
                            {solutionNavItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => { setMobileOpen(false); setMobileSolutionsOpen(false); }}
                                className="flex items-center gap-3 py-2 text-sm text-foreground/40 transition-colors hover:text-foreground"
                              >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                  {dropdownIcons[item.icon]}
                                </div>
                                {item.label}
                              </Link>
                            ))}
                            <Link
                              href="/solutions"
                              onClick={() => { setMobileOpen(false); setMobileSolutionsOpen(false); }}
                              className="block py-2 text-xs font-medium text-primary"
                            >
                              See all solutions &rarr;
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
                <ButtonLink
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 w-full justify-center"
                >
                  Tell Us What You Need
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
