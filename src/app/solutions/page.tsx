import Link from 'next/link';
import {
  Award, HeartHandshake, FilePenLine, Receipt, Stamp, LayoutGrid, FileSignature,
  ArrowRight, ChevronRight,
} from 'lucide-react';
import { solutions } from '@/config/solutions';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'Solutions — Input2PDFSolution',
  description:
    'Custom PDF generation systems for certificates, eCards, forms, invoices, permits, and enterprise portals. 30+ projects delivered across 6+ countries.',
};

/* ─── Icons (matches mega menu) ─── */
// Plan 03-03: 'contract' stub keeps /solutions prerender succeeding when
// SolutionSlug widens. Plan 03-11 owns the visual polish for the 7-card layout.
const icons: Record<string, React.ReactNode> = {
  certificate: <Award size={22} />,
  ecard: <HeartHandshake size={22} />,
  form: <FilePenLine size={22} />,
  invoice: <Receipt size={22} />,
  permit: <Stamp size={22} />,
  portal: <LayoutGrid size={22} />,
  contract: <FileSignature size={22} />,
};

const slugMap: Record<string, string> = {
  certificate: '/solutions/certificates',
  ecard: '/solutions/ecards',
  form: '/solutions/forms',
  invoice: '/solutions/invoices',
  permit: '/solutions/permits',
  portal: '/solutions/portals',
  contract: '/solutions/contracts',
};

const industries = [
  'Education & Training',
  'Finance & Business',
  'Healthcare',
  'Government',
  'Real Estate',
  'Commerce & Retail',
];

export default function SolutionsOverviewPage() {
  return (
    <div className="bg-background">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb — consistent with detail pages */}
          <nav
            aria-label="Breadcrumb"
            className="mb-11 flex items-center gap-1.5 text-[13px] text-foreground/55"
          >
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight size={14} className="text-foreground/25" aria-hidden />
            <span className="font-medium text-primary" aria-current="page">Solutions</span>
          </nav>

          <p className="text-sm font-semibold text-primary">What We Build</p>

          <h1 className="mt-5 max-w-3xl font-display text-[2.75rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Custom PDF systems for every document type.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-foreground/60">
            From simple certificates to full-scale generation portals — each system is purpose-built for your workflow. Pick a type to see how it works.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-border pt-8">
            {[
              { value: '30+', label: 'Projects delivered' },
              { value: '6+', label: 'Countries' },
              { value: '5+', label: 'Industries' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-foreground/40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Solution cards — uniform 3×2 grid ─── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ul role="list" className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => {
              const highlighted = sol.capabilities.find((c) => c.highlight);
              return (
                <li key={sol.number}>
                  <Link
                    href={slugMap[sol.icon]}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-8"
                  >
                    {/* Background number — decorative */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-4 font-display text-[7rem] font-black leading-none text-primary/[0.06] select-none sm:text-[8rem]"
                    >
                      {sol.number}
                    </span>

                    <div className="relative flex-1">
                      {/* Icon + badge row */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-200 group-hover:border-primary/40 group-hover:bg-primary/20">
                          {icons[sol.icon]}
                        </div>
                        {sol.badge && (
                          <Badge variant="solid-primary" size="sm">
                            {sol.badge}
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="mt-5 font-display text-lg font-bold text-foreground sm:text-xl">
                        {sol.title}
                      </h2>

                      {/* Audience */}
                      <p className="mt-1.5 text-xs text-foreground/40">{sol.forWho}</p>

                      {/* Headline */}
                      <p className="mt-4 text-sm leading-relaxed text-foreground/60 sm:text-[15px]">
                        {sol.headline}
                      </p>

                      {/* Key feature highlight */}
                      {highlighted && (
                        <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/[0.08] px-2.5 py-1 text-xs font-semibold text-primary">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {highlighted.label}
                        </div>
                      )}
                    </div>

                    {/* Learn more */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary/70 transition-colors group-hover:text-primary">
                      Learn more
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Trusted across industries
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-foreground/50">
            We&rsquo;ve delivered custom PDF systems for organizations in these sectors.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((name) => (
              <span
                key={name}
                className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground/60"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
