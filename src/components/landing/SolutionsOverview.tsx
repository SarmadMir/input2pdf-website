'use client';

import { motion } from 'framer-motion';

const solutions = [
  {
    title: 'Certificates',
    description:
      'Achievement, training, course completion, and professional certifications — generated instantly from user input.',
    forWho: 'For course platforms, training providers, and schools',
    badge: 'Most Popular',
    featured: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    examples: ['Course completions', 'Training programs', 'Auto-emailed to recipients'],
  },
  {
    title: 'eCards & Invitations',
    description:
      'Digital cards for events, courses, programs, and special occasions — branded to your design.',
    forWho: 'For event organizers and program coordinators',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 8h10M7 12h6" />
      </svg>
    ),
  },
  {
    title: 'Forms & Agreements',
    description:
      'Trade forms, questionnaires, contracts, and business documents — structured and professional.',
    forWho: 'For legal teams, HR, and finance departments',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Generation Portals',
    description:
      'Full-scale platforms for schools and orgs to generate documents at volume — white-labeled and managed.',
    forWho: 'For organizations generating at scale',
    badge: 'Enterprise',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SolutionsOverview() {
  const featured = solutions.find((s) => s.featured);
  const rest = solutions.filter((s) => !s.featured);

  return (
    <section id="solutions" className="relative bg-surface py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Solutions
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What We Build
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-light-dark">
            From simple certificates to full-scale generation portals — custom
            PDF systems tailored to your exact needs.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {/* Featured card — Certificates */}
          {featured && (
            <motion.div variants={item}>
              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-background p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/[0.04] blur-3xl" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {featured.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">{featured.title}</h3>
                      {featured.badge && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {featured.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-light-dark">
                      {featured.description}
                    </p>
                    {featured.forWho && (
                      <p className="mt-1 text-xs text-primary/70">{featured.forWho}</p>
                    )}
                    {featured.examples && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {featured.examples.map((ex) => (
                          <span key={ex} className="rounded-md border border-border bg-surface px-3 py-1 text-xs text-light-dark">
                            {ex}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other cards — 3 in a row */}
          <div className="grid gap-4 sm:grid-cols-3">
            {rest.map((sol) => (
              <motion.div key={sol.title} variants={item}>
                <div className="relative flex h-full flex-col rounded-xl border border-border bg-background p-5">
                  {sol.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary/[0.08] px-2 py-0.5 text-xs font-semibold text-primary">
                      {sol.badge}
                    </span>
                  )}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[0.06] text-primary">
                    {sol.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {sol.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-light-dark">
                    {sol.description}
                  </p>
                  {sol.forWho && (
                    <p className="mt-2 text-xs text-primary/70">{sol.forWho}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
