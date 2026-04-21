'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ChevronRight,
  Check,
  ArrowRight,
  ArrowDown,
  FileText,
  Link as LinkIcon,
  Send,
  PenTool,
  Layers,
  Mail,
  ShieldCheck,
  Upload,
  Users,
  Database,
  Zap,
  Hash,
  History,
  Palette,
  Calculator,
  CreditCard,
  Truck,
  Search,
  Image as ImageIcon,
  ClipboardCheck,
  Gauge,
  FileStack,
  Workflow,
  Lock,
  Languages,
  GitBranch,
  CalendarClock,
  Paintbrush,
  Sparkles,
} from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import type { Solution, SolutionSlug } from '@/config/solutions';
import { contactHref } from '@/lib/contact/url';
import { PROJECT_TYPES } from '@/lib/contact/schema';

/**
 * Map a SolutionSlug to the /contact form's `type` enum (PROJECT_TYPES).
 *
 * Every slug matches a PROJECT_TYPE value 1:1 EXCEPT `'contracts'`, which maps
 * to the schema-locked enum value `'contracts-esign'` (see 03-CONTEXT.md:66
 * and .planning/brand-voice.md Contracts rules — the schema's enum keeps the
 * `-esign` suffix to preserve the optional-extension framing in form analytics).
 * Plan 03-03 widens SolutionSlug; this mapper bridges the two enums so
 * `contactHref({ type: ... })` stays type-safe.
 */
function slugToProjectType(slug: SolutionSlug): (typeof PROJECT_TYPES)[number] {
  return slug === 'contracts' ? 'contracts-esign' : slug;
}

/* ─── Icon resolver — single source of truth ─── */
const iconComponents: Record<string, typeof Sparkles> = {
  'file-text': FileText, link: LinkIcon, send: Send, 'pen-tool': PenTool,
  layers: Layers, mail: Mail, 'shield-check': ShieldCheck, upload: Upload,
  users: Users, database: Database, zap: Zap, hash: Hash, history: History,
  palette: Palette, calculator: Calculator, 'credit-card': CreditCard,
  truck: Truck, search: Search, image: ImageIcon, 'clipboard-check': ClipboardCheck,
  gauge: Gauge, 'file-stack': FileStack, workflow: Workflow, lock: Lock,
  languages: Languages, 'git-branch': GitBranch, 'calendar-clock': CalendarClock,
  paintbrush: Paintbrush,
};

function getIcon(name: string, size = 28) {
  const Icon = iconComponents[name] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.75} />;
}

interface SolutionPageLayoutProps {
  solution: Solution;
  /** Solution-specific preview mockup for the hero right column */
  preview: ReactNode;
}

export function SolutionPageLayout({ solution, preview }: SolutionPageLayoutProps) {
  const reduce = useReducedMotion();
  const init = (y = 16) => (reduce ? false : { opacity: 0, y });
  const show = { opacity: 1, y: 0 };
  const vp = { once: true, margin: '-8%' as const };

  return (
    <div className="bg-background">

      {/* ═══════════════════════════ 1. HERO ═══════════════════════════ */}
      <section className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-11 flex items-center gap-1.5 text-[13px] text-foreground/55"
          >
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight size={14} className="text-foreground/25" aria-hidden />
            <Link href="/solutions" className="transition-colors hover:text-foreground">Solutions</Link>
            <ChevronRight size={14} className="text-foreground/25" aria-hidden />
            <span className="font-medium text-primary" aria-current="page">{solution.title}</span>
          </motion.nav>

          {/* Split: text left, mockup right */}
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-14">
            {/* Left */}
            <div className="flex-1 lg:max-w-[640px]">
              <motion.p
                initial={init(0)} animate={show} transition={{ duration: 0.4, delay: 0.05 }}
                className="text-sm font-semibold text-primary"
              >
                {solution.heroEyebrow}
              </motion.p>

              <motion.h1
                initial={init(20)} animate={show} transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-5 font-display text-[2.75rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]"
              >
                {solution.heroH1}
              </motion.h1>

              <motion.p
                initial={init(12)} animate={show} transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-7 max-w-xl text-[17px] leading-[1.65] text-foreground/60"
              >
                {solution.heroSubtitle}
              </motion.p>

              {/* Proof bullets */}
              <motion.ul
                initial={init(12)} animate={show} transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-col gap-3.5"
              >
                {solution.proofBullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] font-medium text-foreground">
                    <Check size={18} className="shrink-0 text-primary" aria-hidden />
                    {b}
                  </li>
                ))}
              </motion.ul>

              {/* CTAs */}
              <motion.div
                initial={init(12)} animate={show} transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <ButtonLink href={contactHref({ type: slugToProjectType(solution.slug) })}>
                  Get a quote in 48 hours
                  <ArrowRight size={16} className="ml-1" aria-hidden />
                </ButtonLink>
                <a href="#how-it-works" className="inline-flex items-center gap-1.5 border-b border-transparent px-2 py-3 text-[15px] font-medium text-foreground transition-colors hover:text-primary">
                  See how it works
                  <ArrowDown size={14} aria-hidden />
                </a>
              </motion.div>
            </div>

            {/* Right — Preview mockup */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:max-w-[440px]"
            >
              {preview}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ 2. HOW IT WORKS ═══════════════════════════ */}
      <section id="how-it-works" className="border-t border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div initial={init()} whileInView={show} viewport={vp} transition={{ duration: 0.5 }}>
            <h2 className="max-w-2xl font-display text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-[2.5rem]">
              {solution.howItWorksH2}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/55">
              {solution.howItWorksSub}
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {solution.howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                initial={init(20)}
                whileInView={show}
                viewport={vp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col gap-5"
              >
                {/* Pill + connecting line */}
                <div className="flex items-center gap-3">
                  <span className="flex h-7 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-[11px] font-bold text-background">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < 2 && (
                    <div className="hidden h-0.5 flex-1 bg-primary/25 md:block" />
                  )}
                </div>

                <div className="text-foreground/55">{getIcon(step.icon)}</div>
                <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/55">{step.description}</p>
                {step.detail && (
                  <p className="text-xs font-medium text-primary">{step.detail}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ 3. FEATURES (asymmetric) ═══════════════════════════ */}
      <section className="border-t border-border py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div initial={init()} whileInView={show} viewport={vp} transition={{ duration: 0.5 }}>
            <h2 className="max-w-2xl font-display text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-[2.5rem]">
              {solution.featuresH2}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/55">
              {solution.featuresSub}
            </p>
          </motion.div>

          <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:gap-20">
            {/* Left — 2 hero features */}
            <div className="flex flex-1 flex-col gap-10">
              {solution.heroFeatures.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={init(20)}
                  whileInView={show}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-primary">{getIcon(feat.icon, 32)}</span>
                    <h3 className="font-display text-2xl font-bold text-foreground">{feat.title}</h3>
                  </div>
                  <p className="max-w-lg text-[15px] leading-[1.65] text-foreground/55">{feat.description}</p>
                  {i < solution.heroFeatures.length - 1 && (
                    <div className="mt-6 h-px bg-surface-2" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right — supporting features list */}
            <motion.div
              initial={init(20)}
              whileInView={show}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-[400px] lg:shrink-0"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-foreground/35">
                Also included
              </p>
              <div className="flex flex-col">
                {solution.supportingFeatures.map((sf, i) => (
                  <div key={sf.title}>
                    <div className="flex gap-3.5 py-5">
                      <span className="mt-0.5 shrink-0 text-primary">{getIcon(sf.icon, 18)}</span>
                      <div>
                        <h4 className="text-[15px] font-semibold text-foreground">{sf.title}</h4>
                        <p className="mt-1 text-[13px] leading-relaxed text-foreground/55">{sf.description}</p>
                      </div>
                    </div>
                    {i < solution.supportingFeatures.length - 1 && (
                      <div className="h-px bg-surface-2" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ 4. USE CASES ═══════════════════════════ */}
      <section className="border-t border-border bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div initial={init()} whileInView={show} viewport={vp} transition={{ duration: 0.5 }}>
            <h2 className="max-w-2xl font-display text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-[2.5rem]">
              {solution.useCasesH2}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/55">
              {solution.useCasesSub}
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {solution.useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={init(20)}
                whileInView={show}
                viewport={vp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-8"
              >
                <span className="text-xs font-semibold text-secondary">{uc.tag}</span>
                <h3 className="font-display text-xl font-bold text-foreground">{uc.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/55">{uc.description}</p>
                <p className="mt-auto pt-2 text-xs text-foreground/40">{uc.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ 5. CTA ═══════════════════════════ */}
      <section className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.div initial={init()} whileInView={show} viewport={vp} transition={{ duration: 0.5 }}>
            {/* Gradient accent */}
            <div className="mx-auto h-0.5 w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <h2 className="mt-10 font-display text-[2.25rem] font-bold tracking-tight text-foreground sm:text-[2.5rem]">
              {solution.ctaH2}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/55 sm:text-lg">
              {solution.ctaSub}
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink href={contactHref({ type: slugToProjectType(solution.slug) })}>
                Tell us what you need
                <ArrowRight size={16} className="ml-1" aria-hidden />
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
