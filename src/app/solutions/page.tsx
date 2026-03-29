import Link from 'next/link';
import { solutions } from '@/config/solutions';

export const metadata = {
  title: 'Solutions — Input2PDFSolution',
  description:
    'Custom PDF generation systems for certificates, eCards, forms, and enterprise portals. Tailored to your exact needs.',
};

/* ─── Icons (inline to keep this a server component) ─── */
const icons: Record<string, React.ReactNode> = {
  certificate: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  ecard: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
      <path d="M7 15h4" />
    </svg>
  ),
  form: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
    </svg>
  ),
  portal: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  portal: '/solutions/portals',
};

export default function SolutionsOverviewPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-foreground/40">
            <Link href="/" className="transition-colors hover:text-foreground/60">Home</Link>
            <span>/</span>
            <span className="text-foreground/60">Solutions</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Solutions</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            What We Build
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-light-dark sm:text-xl">
            Custom PDF generation systems tailored to your exact needs — from simple certificates to full-scale enterprise portals.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="pb-32 sm:pb-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {solutions.map((sol) => {
              const highlighted = sol.capabilities.find((c) => c.highlight);
              return (
                <Link
                  key={sol.number}
                  href={slugMap[sol.icon]}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2/50 p-8 transition-colors duration-200 hover:border-primary/30 sm:p-10"
                >
                  {/* Background number */}
                  <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[8rem] font-black leading-none text-primary/[0.04] select-none">
                    {sol.number}
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        {icons[sol.icon]}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                            {sol.title}
                          </h2>
                          {sol.badge && (
                            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                              {sol.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-primary/40">
                          {sol.forWho}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-foreground/60">
                      {sol.headline}
                    </p>

                    {highlighted && (
                      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {highlighted.label}: {highlighted.description}
                      </div>
                    )}

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-60 transition-opacity group-hover:opacity-100">
                      Learn more
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
