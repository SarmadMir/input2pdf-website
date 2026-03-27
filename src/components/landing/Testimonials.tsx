'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Sarmad built exactly what we needed — a certificate system for our training programs. Instructors fill in student details and certificates generate instantly. Saved us hours every week.',
    name: 'Merit Badge Courses',
    role: 'Education Platform',
    rating: 5,
  },
  {
    quote:
      'We needed a professional trade form generator for our accounts department. The system was delivered fast, works flawlessly, and handles everything we threw at it. Highly recommended.',
    name: 'Solaris Capital',
    role: 'Financial Services',
    rating: 5,
  },
  {
    quote:
      'The certificate system for our training courses is exactly what we described — clean, reliable, and our clients love the professional output. Great communication throughout.',
    name: 'Corp Train Global',
    role: 'Corporate Training',
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Testimonials() {
  return (
    <section className="relative bg-background py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Client Feedback
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What our clients say
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={item}>
              <blockquote className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
                <Stars count={t.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-light-dark">{t.role}</div>
                </div>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>

        {/* Fiverr badge */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs text-light-dark">
            All reviews from verified Fiverr clients &middot; 5.0 average rating
          </p>
        </motion.div>
      </div>
    </section>
  );
}
