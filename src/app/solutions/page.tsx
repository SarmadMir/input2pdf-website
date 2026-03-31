import Link from 'next/link';
import Image from 'next/image';
import { solutions } from '@/config/solutions';

export const metadata = {
  title: 'Solutions — Input2PDFSolution',
  description:
    'Custom PDF generation systems for certificates, eCards, forms, invoices, permits, and enterprise portals. 30+ projects delivered across 6+ countries.',
};

/* ─── Icons — larger for featured cards ─── */
const icons: Record<string, (size: number) => React.ReactNode> = {
  certificate: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  ecard: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
      <path d="M7 15h4" />
    </svg>
  ),
  form: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  ),
  invoice: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  ),
  permit: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  portal: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
      <circle cx="15" cy="15" r="2" />
    </svg>
  ),
};

const slugMap: Record<string, string> = {
  certificate: '/solutions/certificates',
  ecard: '/solutions/ecards',
  form: '/solutions/forms',
  invoice: '/solutions/invoices',
  permit: '/solutions/permits',
  portal: '/solutions/portals',
};

/* ─── Unique accent tints per solution for visual identity ─── */
const accentMap: Record<string, string> = {
  certificate: 'from-primary/[0.08] to-transparent',
  ecard: 'from-secondary/[0.06] to-transparent',
  form: 'from-amber-500/[0.05] to-transparent',
  invoice: 'from-blue-500/[0.05] to-transparent',
  permit: 'from-emerald-500/[0.05] to-transparent',
  portal: 'from-violet-500/[0.06] to-transparent',
};

const industries = [
  { name: 'Education & Training', count: '13+ projects' },
  { name: 'Finance & Business', count: '6+ projects' },
  { name: 'Healthcare', count: '3+ projects' },
  { name: 'Government', count: '2+ projects' },
  { name: 'Real Estate', count: '2+ projects' },
  { name: 'Commerce & Retail', count: '2+ projects' },
];

export default function SolutionsOverviewPage() {
  const featured = solutions[0]; // Certificates
  const portal = solutions[5]; // Generation Portals
  const middle = solutions.slice(1, 5); // eCards, Forms, Invoices, Permits

  return (
    <div className="bg-background">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-foreground/50">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span className="text-foreground/30">/</span>
            <span className="text-foreground/70">Solutions</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Solutions</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            What We Build
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/60 sm:text-xl">
            Custom PDF generation systems tailored to your exact needs — from simple certificates to full-scale enterprise portals.
          </p>

          {/* Stats — cleaner layout */}
          <div className="mt-10 flex items-center gap-8 border-t border-border pt-8">
            {[
              { value: '30+', label: 'Projects delivered' },
              { value: '6+', label: 'Countries' },
              { value: '5+', label: 'Industries' },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-display text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="ml-2 text-sm text-foreground/40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured: Certificates (hero card) ─── */}
      <section className="pb-6 sm:pb-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            href={slugMap[featured.icon]}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-2/50 transition-colors duration-200 hover:border-primary/30 lg:flex-row"
          >
            {/* Unique gradient accent */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[featured.icon]}`} />

            {/* Content */}
            <div className="relative flex-1 p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  {icons[featured.icon](28)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-primary/40">{featured.number}</span>
                    <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {featured.title}
                    </h2>
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                      {featured.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground/40">{featured.forWho}</p>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/60 sm:text-lg">
                {featured.headline}
              </p>

              {/* Key capabilities inline */}
              <div className="mt-6 flex flex-wrap gap-3">
                {featured.capabilities.map((cap) => (
                  <span
                    key={cap.label}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                      cap.highlight
                        ? 'border border-primary/25 bg-primary/10 text-primary'
                        : 'bg-background text-foreground/50'
                    }`}
                  >
                    {cap.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary opacity-60 transition-opacity group-hover:opacity-100">
                Explore certificates
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Right: Certificate mockup image */}
            <div className="relative hidden w-80 shrink-0 items-center justify-center border-l border-border/40 bg-background/30 p-8 lg:flex xl:w-96">
              <div className="relative">
                <Image
                  src="/images/solutions/certificate-mockup.png"
                  alt="Certificate of Completion — auto-emailed to recipients"
                  width={340}
                  height={420}
                  className="w-52 rounded-lg shadow-2xl shadow-black/30 xl:w-60"
                />
                {/* Stack effect */}
                <div className="absolute -bottom-2 left-3 right-3 -z-10 h-full rounded-lg border border-border/40 bg-surface/30" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Middle 4: Varied 2x2 grid ─── */}
      <section className="py-3 sm:py-4">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {middle.map((sol) => {
              const highlighted = sol.capabilities.find((c) => c.highlight);
              return (
                <Link
                  key={sol.number}
                  href={slugMap[sol.icon]}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-2/50 p-7 transition-colors duration-200 hover:border-primary/30 sm:p-8"
                >
                  {/* Unique accent gradient */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[sol.icon]}`} />

                  {/* Background number */}
                  <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-black leading-none text-foreground/[0.03] select-none">
                    {sol.number}
                  </span>

                  <div className="relative flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border-hover bg-background text-foreground/60">
                        {icons[sol.icon](22)}
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                          {sol.title}
                        </h2>
                        <p className="mt-0.5 text-xs text-foreground/35">{sol.forWho}</p>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-foreground/55">
                      {sol.headline}
                    </p>

                    {highlighted && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary/[0.08] px-2.5 py-1 text-xs font-medium text-primary">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {highlighted.label}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-40 transition-opacity group-hover:opacity-100">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Featured: Generation Portals (enterprise card) ─── */}
      <section className="pt-3 pb-20 sm:pt-4 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            href={slugMap[portal.icon]}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-2/50 transition-colors duration-200 hover:border-primary/30 lg:flex-row-reverse"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[portal.icon]}`} />

            <div className="relative flex-1 p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border-hover bg-background text-foreground/60">
                  {icons[portal.icon](28)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-foreground/30">{portal.number}</span>
                    <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {portal.title}
                    </h2>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {portal.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground/40">{portal.forWho}</p>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/60 sm:text-lg">
                {portal.headline}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {portal.capabilities.map((cap) => (
                  <span
                    key={cap.label}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                      cap.highlight
                        ? 'border border-primary/25 bg-primary/10 text-primary'
                        : 'bg-background text-foreground/50'
                    }`}
                  >
                    {cap.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary opacity-60 transition-opacity group-hover:opacity-100">
                Explore portals
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Left: Portal dashboard mockup image */}
            <div className="relative hidden w-80 shrink-0 items-center justify-center border-r border-border/40 bg-background/30 p-8 lg:flex xl:w-96">
              <Image
                src="/images/solutions/portal-dashboard-mockup.png"
                alt="CertPortal admin dashboard — 142 certificates, 96% delivered"
                width={360}
                height={340}
                className="w-56 rounded-lg shadow-2xl shadow-black/30 xl:w-64"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Industries we serve ─── */}
      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Industries We Serve
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Trusted across industries
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="rounded-xl border border-border bg-surface-2/30 px-4 py-5 text-center"
              >
                <div className="text-sm font-semibold text-foreground/70">{ind.name}</div>
                <div className="mt-1 text-xs text-foreground/30">{ind.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
