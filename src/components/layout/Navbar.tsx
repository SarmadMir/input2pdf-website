'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { navLinks, solutionNavItems, type SolutionNavItem } from '@/config/site';
import { contactHref } from '@/lib/contact/url';
import {
  Award,
  HeartHandshake,
  FilePenLine,
  Receipt,
  Stamp,
  LayoutGrid,
  FileSignature,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

/* ─── Icon mapping using Lucide ─── */
// Canonical 7-icon map. Contract = FileSignature, matching the landing
// SolutionsOverview card + /solutions overview grid + SolutionCard.
// Mega-menu renders the 7 items as a vertical left index (w-[340px]) + a
// detail panel on the right (flex-1 of w-[900px]); 7 items fit without
// layout change at 1440px. At 768px/375px the mega menu collapses to the
// mobile accordion below, which iterates solutionNavItems directly.
const solutionIcons: Record<SolutionNavItem['icon'], React.ReactNode> = {
  certificate: <Award size={20} />,
  ecard: <HeartHandshake size={20} />,
  form: <FilePenLine size={20} />,
  invoice: <Receipt size={20} />,
  permit: <Stamp size={20} />,
  portal: <LayoutGrid size={20} />,
  contract: <FileSignature size={20} />,
};

/* ─── Detail content per solution (shown in right panel) ─── */
const solutionDetails: Record<
  SolutionNavItem['icon'],
  { title: string; description: string; features: string[] }
> = {
  certificate: {
    title: 'Your form. Your certificate.\nDelivered automatically.',
    description:
      'Course completions, training awards, merit badges — recipients complete your custom form and receive a branded certificate in their inbox, automatically.',
    features: [
      'Emailed directly to each recipient',
      'Multiple certificate types from one system',
      'Your branding, fonts, and layout',
    ],
  },
  ecard: {
    title: 'Branded cards.\nDelivered digitally.',
    description:
      'CPR eCards, event passes, membership cards — designed to your brand with built-in expiry dates and digital delivery.',
    features: [
      'Built-in expiry and renewal dates',
      'Personalized for each recipient',
      'Download or email instantly',
    ],
  },
  form: {
    title: 'Details captured.\nSigned. Delivered.',
    description:
      'Trade applications, real estate agreements, labor contracts — with a built-in signature pad so everything is captured in one step.',
    features: [
      'Digital signature capture built in',
      'Works in English, German, Dutch, and more',
      'Fields adapt based on user selections',
    ],
  },
  invoice: {
    title: 'Totals calculated.\nInvoice delivered.',
    description:
      'Order forms, reservation confirmations, and payment receipts — totals, taxes, and shipping calculated automatically.',
    features: [
      'Totals and taxes calculated for you',
      'Shipping and delivery options included',
      'Professional layout, ready for records',
    ],
  },
  permit: {
    title: 'Official documents,\nformatted correctly.',
    description:
      'Vehicle permits, inspection certificates, health compliance records — formatted to government standards with verification support.',
    features: [
      'Meets government formatting standards',
      'Public verification for authenticity',
      'Official seals and stamps included',
    ],
  },
  portal: {
    title: 'Your own platform.\nYour brand.',
    description:
      'A complete system where your team generates documents — with admin dashboard, role-based access, and history tracking. White-labeled to your brand.',
    features: [
      'Admin dashboard with generation history',
      'Role-based access for your team',
      'Public verification for recipients',
    ],
  },
  contract: {
    title: 'Structured inputs in.\nLegal-style documents out.',
    description:
      'Service agreements, contractor agreements, NDAs, and consent forms — built around your exact clauses and workflow. Optional extension for approvals or signatures.',
    features: [
      'Legal-style output from your templates',
      'Conditional clauses and audit-ready logs',
      'eSign integration (optional)',
    ],
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  /* Derive default active item from the current route */
  const routeItem = useMemo(() => {
    const match = solutionNavItems.find((s) => pathname.startsWith(s.href));
    return match?.icon ?? 'certificate';
  }, [pathname]);

  /* hoveredItem is only set while hovering in the dropdown; null = use routeItem */
  const [hoveredItem, setHoveredItem] = useState<SolutionNavItem['icon'] | null>(null);
  const activeItem = hoveredItem ?? routeItem;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close dropdown on outside click or Escape */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSolutionsOpen(false);
        setHoveredItem(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
      setHoveredItem(null);
    }, 200);
  };

  const detail = solutionDetails[activeItem];
  const activeSolution = solutionNavItems.find((s) => s.icon === activeItem);

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled
          ? 'border-border/60 bg-background/80'
          : 'border-border/40 bg-background/60'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Left side — Logo + Nav links grouped together */}
        <div className="flex items-center gap-10">
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

          {/* Desktop nav — grouped with logo on the left */}
          <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              /* ─── Solutions mega menu trigger ─── */
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
                  aria-haspopup="true"
                  aria-expanded={solutionsOpen}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    solutionsOpen
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* ─── Mega Menu Dropdown ─── */}
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] as const }}
                      className="absolute -left-32 top-full mt-3 flex w-[900px] overflow-hidden rounded-xl border border-border/80 bg-surface shadow-2xl shadow-black/40"
                    >
                      {/* Left Index */}
                      <div className="w-[340px] shrink-0 border-r border-border/40 py-4">
                        {solutionNavItems.map((item) => {
                          const isActive = item.icon === activeItem;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setSolutionsOpen(false)}
                              onMouseEnter={() => setHoveredItem(item.icon)}
                              className={`flex items-center gap-3.5 px-6 py-3.5 transition-colors duration-150 ${
                                isActive
                                  ? 'border-l-2 border-primary bg-primary/[0.05]'
                                  : 'border-l-2 border-transparent hover:bg-white/[0.03]'
                              }`}
                            >
                              <span
                                className={`shrink-0 ${
                                  isActive ? 'text-primary' : 'text-foreground/40'
                                }`}
                              >
                                {solutionIcons[item.icon]}
                              </span>
                              <div>
                                <div
                                  className={`text-[14px] font-medium leading-snug ${
                                    isActive ? 'text-foreground' : 'text-foreground/70'
                                  }`}
                                >
                                  {item.label}
                                </div>
                                <div
                                  className={`mt-0.5 text-[12px] leading-snug ${
                                    isActive
                                      ? 'text-foreground/50'
                                      : 'text-foreground/35'
                                  }`}
                                >
                                  {item.description}
                                </div>
                              </div>
                            </Link>
                          );
                        })}

                        <div className="mx-6 my-3 border-t border-border/40" />

                        <Link
                          href="/solutions"
                          onClick={() => setSolutionsOpen(false)}
                          className="flex items-center gap-1.5 px-6 py-2 text-xs font-medium text-foreground/45 transition-colors hover:text-primary"
                        >
                          Explore all solutions
                          <ArrowRight size={12} />
                        </Link>
                      </div>

                      {/* Right Detail */}
                      <div className="flex flex-1 flex-col gap-6 p-9">
                        <span className="text-xs font-semibold text-primary">
                          {activeSolution?.label}
                        </span>

                        <h3 className="text-2xl font-semibold leading-tight tracking-tight text-foreground whitespace-pre-line">
                          {detail.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-foreground/55">
                          {detail.description}
                        </p>

                        <div className="flex flex-col gap-3 pt-1">
                          {detail.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-3">
                              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span className="text-[13px] text-foreground/60">
                                {feat}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto flex items-end justify-between pt-4 border-t border-white/[0.04]">
                          <Link
                            href={activeSolution?.href ?? '/solutions'}
                            onClick={() => setSolutionsOpen(false)}
                            className="flex items-center gap-2 text-[13px] font-medium text-primary transition-colors hover:text-primary/80"
                          >
                            Learn more
                            <ArrowRight size={13} />
                          </Link>
                          <Link
                            href={contactHref()}
                            onClick={() => setSolutionsOpen(false)}
                            className="text-[12px] text-foreground/45 transition-colors hover:text-foreground/60"
                          >
                            Need something custom?
                          </Link>
                        </div>
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
          </div>
        </div>

        {/* Right side — Theme toggle + CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ButtonLink href={contactHref()} size="sm" className="hidden md:inline-flex">
            Tell Us What You Need
          </ButtonLink>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors duration-200 hover:border-border-hover md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={16} className="text-foreground/60" />
            ) : (
              <Menu size={16} className="text-foreground/60" />
            )}
          </button>
        </div>
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
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`}
                        />
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
                                  {solutionIcons[item.icon]}
                                </div>
                                {item.label}
                              </Link>
                            ))}
                            <Link
                              href="/solutions"
                              onClick={() => { setMobileOpen(false); setMobileSolutionsOpen(false); }}
                              className="flex items-center gap-1 py-2 text-xs font-medium text-primary"
                            >
                              See all solutions
                              <ArrowRight size={12} />
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
                  href={contactHref()}
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
