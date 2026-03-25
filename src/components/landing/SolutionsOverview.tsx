import Link from 'next/link';

const solutions = [
  {
    title: 'Certificates',
    description:
      'Achievement, training, course completion, and professional certification systems.',
    href: '/solutions/certificates',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'eCards & Invitations',
    description:
      'Digital cards for events, courses, programs, and special occasions.',
    href: '/solutions/ecards',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 8h10M7 12h6" />
      </svg>
    ),
  },
  {
    title: 'Forms & Documents',
    description:
      'Agreements, trade forms, questionnaires, order forms, and business documents.',
    href: '/solutions/forms',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      'Full-scale portals for schools and organizations to generate certificates and eCards at volume.',
    href: '/solutions/portals',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
];

export function SolutionsOverview() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            What We Build
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-light-dark">
            From simple certificates to full-scale generation portals — we deliver
            custom PDF systems tailored to your exact needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((sol) => (
            <Link
              key={sol.title}
              href={sol.href}
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 text-primary">{sol.icon}</div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {sol.title}
              </h3>
              <p className="mt-2 text-sm text-light-dark">{sol.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
