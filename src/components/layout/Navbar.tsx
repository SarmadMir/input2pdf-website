'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { navLinks, solutionNavItems, type SolutionNavItem } from '@/config/site';
import {
  Award,
  HeartHandshake,
  FilePenLine,
  Receipt,
  Stamp,
  LayoutGrid,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

/* ─── Icon mapping using Lucide ─── */
const solutionIcons: Record<SolutionNavItem['icon'], React.ReactNode> = {
  certificate: <Award size={20} />,
  ecard: <HeartHandshake size={20} />,
  form: <FilePenLine size={20} />,
  invoice: <Receipt size={20} />,
  permit: <Stamp size={20} />,
  portal: <LayoutGrid size={20} />,
};

/* ─── Detail content per solution (shown in right panel) ─── */
const solutionDetails: Record<
  SolutionNavItem['icon'],
  { title: string; description: string; features: string[] }
> = {
  certificate: {
    title: 'Professional credentials,\ngenerated at scale.',
    description:
      'Achievement, training, and course completion certificates — generated from user input and delivered without lifting a finger.',
    features: [
      'Auto-emailed to recipients',
      'Multi-certificate systems',
      'Custom branded templates',
    ],
  },
  ecard: {
    title: 'Digital cards that\nleave an impression.',
    description:
      'Branded eCards with custom designs, QR codes, and expiry dates — perfect for memberships, invitations, and promotions.',
    features: [
      'QR code integration',
      'Validity period tracking',
      'Branded card templates',
    ],
  },
  form: {
    title: 'Structured documents,\nsignatures included.',
    description:
      'Agreements, consent forms, and applications with signature capture — streamlined from input to signed PDF.',
    features: [
      'Digital signature capture',
      'Multi-page support',
      'Auto-populated fields',
    ],
  },
  invoice: {
    title: 'Calculated pricing,\nconfirmed instantly.',
    description:
      'Invoices, order confirmations, and receipts with automatic calculations — generated on demand.',
    features: [
      'Auto-calculated totals',
      'Tax & discount handling',
      'Sequential numbering',
    ],
  },
  permit: {
    title: 'Official documents,\ncompliance-ready.',
    description:
      'Permits, licenses, and compliance certificates with proper formatting and verification features.',
    features: [
      'Verification codes',
      'Tamper-evident seals',
      'Regulatory formatting',
    ],
  },
  portal: {
    title: 'Full-scale platforms,\nbuilt for volume.',
    description:
      'Complete generation portals where your users can create their own documents — white-labeled and scalable.',
    features: [
      'Multi-tenant support',
      'User management',
      'Template marketplace',
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
          : 'border-white/[0.06] bg-background/60'
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
                      className="absolute -left-32 top-full mt-2 flex w-[820px] overflow-hidden rounded-xl rounded-t-lg border border-border bg-surface shadow-2xl shadow-black/30"
                    >
                      {/* Left Index */}
                      <div className="w-[320px] shrink-0 border-r border-white/[0.04] py-3">
                        {solutionNavItems.map((item) => {
                          const isActive = item.icon === activeItem;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setSolutionsOpen(false)}
                              onMouseEnter={() => setHoveredItem(item.icon)}
                              className={`flex items-center gap-3 px-5 py-3 transition-colors duration-150 ${
                                isActive
                                  ? 'border-l-2 border-primary bg-primary/[0.04]'
                                  : 'border-l-2 border-transparent hover:bg-white/[0.02]'
                              }`}
                            >
                              <span
                                className={`shrink-0 ${
                                  isActive ? 'text-primary' : 'text-primary/50'
                                }`}
                              >
                                {solutionIcons[item.icon]}
                              </span>
                              <div>
                                <div
                                  className={`text-sm font-medium ${
                                    isActive ? 'text-foreground' : 'text-foreground/60'
                                  }`}
                                >
                                  {item.label}
                                </div>
                                <div
                                  className={`text-[11px] ${
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

                        <div className="mx-5 my-2 border-t border-white/[0.04]" />

                        <Link
                          href="/solutions"
                          onClick={() => setSolutionsOpen(false)}
                          className="block px-5 py-2 font-mono text-[11px] tracking-wider text-foreground/40 transition-colors hover:text-foreground/60"
                        >
                          Explore all →
                        </Link>
                      </div>

                      {/* Right Detail */}
                      <div className="flex flex-1 flex-col gap-5 p-7">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[3px] text-primary/60">
                          {activeSolution?.label}
                        </span>

                        <h3 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground whitespace-pre-line">
                          {detail.title}
                        </h3>

                        <p className="text-[13px] leading-relaxed text-foreground/50">
                          {detail.description}
                        </p>

                        <div className="flex flex-col gap-2.5 pt-2">
                          {detail.features.map((feat, i) => (
                            <div key={feat} className="flex items-center gap-2.5">
                              <span
                                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                                style={{ opacity: 1 - i * 0.25 }}
                              />
                              <span className="text-[12.5px] text-foreground/55">
                                {feat}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Document preview placeholder */}
                        <div className="mt-auto flex items-end justify-between">
                          <Link
                            href={activeSolution?.href ?? '/solutions'}
                            onClick={() => setSolutionsOpen(false)}
                            className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider text-primary transition-colors hover:text-primary/80"
                          >
                            See all solutions
                            <ArrowRight size={12} />
                          </Link>
                          <span className="text-[11px] text-foreground/15">
                            Custom project?
                          </span>
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

        {/* Right side — CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" size="sm" className="hidden md:inline-flex">
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
