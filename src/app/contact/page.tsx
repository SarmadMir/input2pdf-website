import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactFormSkeleton } from '@/components/contact/ContactFormSkeleton';

export const metadata: Metadata = {
  title: 'Start a Project — Input2PDF',
  description:
    'Tell us about your PDF automation project. We reply within one business day.',
};

export default function ContactPage() {
  // D-Q8 (locked): mailto fallback reuses CONTACT_INBOX_EMAIL (server-only env).
  // Server Component reads env at build/request time and passes the value as a
  // plain prop to the client island. Will be swapped to a branded
  // `hello@{domain}` in the domain-cutover batch.
  const fallbackMailto = process.env.CONTACT_INBOX_EMAIL ?? '';

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 md:py-24">
      <header className="mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Start a project
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/65">
          Tell us about your PDF automation project. We reply within one
          business day.
        </p>
        {fallbackMailto && (
          <p className="mt-3 text-sm text-foreground/55">
            Prefer email? Reach us at{' '}
            <a
              className="text-primary underline-offset-2 hover:underline"
              href={`mailto:${fallbackMailto}?subject=Project%20inquiry`}
            >
              {fallbackMailto}
            </a>
            .
          </p>
        )}
      </header>

      {/*
        Next.js 16 requires a Suspense boundary around any client component
        that calls `useSearchParams()`. See ContactForm — it reads `type` +
        `budget` query params for CTA pre-fill.
      */}
      <Suspense fallback={<ContactFormSkeleton />}>
        <ContactForm fallbackMailto={fallbackMailto} />
      </Suspense>
    </main>
  );
}
