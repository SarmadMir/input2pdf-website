import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy — Input2PDF',
  description:
    'What we collect, why, how long we keep it, and how to request deletion.',
};

// JURISDICTION-NOTE: if Sarmad confirms a US or UK data-protection lens,
// expand this page with a GDPR / CCPA annex. For now, content reflects the
// solopreneur service-site baseline with honest disclosure.

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Privacy
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          What we collect, and why.
        </h1>
        <p className="mt-4 text-sm text-foreground/55">
          Last updated: 2026-04 · Questions:{' '}
          <a
            className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            href="mailto:PLACEHOLDER@input2pdf.com"
          >
            PLACEHOLDER@input2pdf.com
          </a>
          {/* JURISDICTION-NOTE: swap PLACEHOLDER with the CONTACT_INBOX_EMAIL value once
              the launch domain's branded address is live (SEC-06 in Phase 5 pre-launch). */}
        </p>
      </header>

      <section>
        <h2 className="font-display text-xl font-semibold">What we collect</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-foreground/85">
          <li>
            <strong>Contact form submissions</strong> — name, email, project
            type, tech stack (if provided), budget range, timeline (if
            provided), project details.
          </li>
          <li>
            <strong>Demo email addresses</strong> — the email you enter to send
            yourself a generated certificate from the live demo.
          </li>
          <li>
            <strong>Aggregate analytics</strong> — page views, referrers, and
            device class via Vercel Analytics. Cookieless, no personal
            identifiers.
          </li>
          <li>
            <strong>Performance metrics</strong> — Core Web Vitals field data
            via Vercel Speed Insights. Aggregate only.
          </li>
          <li>
            <strong>Email transport metadata</strong> — Resend logs delivery
            status, bounces, and complaints for emails we send to you.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Why we collect it</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-foreground/85">
          <li>
            Contact form data reaches Sarmad&apos;s inbox so a project
            conversation can start.
          </li>
          <li>
            Demo email addresses receive the certificate you generated and may
            receive one follow-up with context on the pattern we built.
          </li>
          <li>
            Analytics tell us which pages visitors actually read. We use this
            to cut what isn&apos;t useful.
          </li>
          <li>
            Performance metrics catch slow pages before they hurt a
            visitor&apos;s experience.
          </li>
          <li>
            Email transport metadata is the audit trail for delivery — bounces,
            complaints, and spam reports are acted on.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">
          Who we share it with
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-foreground/85">
          <li>
            <strong>Vercel</strong> — hosts the site and provides the
            cookieless analytics and performance monitoring.
          </li>
          <li>
            <strong>Resend</strong> — delivers outgoing email (contact
            notifications, demo certificates).
          </li>
          <li>
            <strong>Upstash</strong> — stores rate-limit counters keyed by IP
            to block abuse. No content, no personal data.
          </li>
        </ul>
        <p className="mt-4 text-foreground/75">
          We don&apos;t sell data. We don&apos;t share contact submissions with
          advertisers. We don&apos;t run third-party tracking scripts.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">
          How long we keep it
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-foreground/85">
          <li>Active contact inquiries: 12 months, then archived.</li>
          <li>Demo email addresses: 24 months.</li>
          <li>
            Aggregate analytics: retained indefinitely in Vercel (anonymous and
            non-identifying).
          </li>
          <li>
            Email transport logs: per Resend&apos;s retention policy (typically
            90 days for content, longer for delivery metadata).
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">
          Requesting deletion
        </h2>
        <p className="mt-4 text-foreground/85">
          Email the data-request address at the top of this page with
          &ldquo;Delete my data&rdquo; in the subject. We respond within 30
          days.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Cookies</h2>
        <p className="mt-4 text-foreground/85">
          We use cookieless analytics (Vercel Analytics) and one functional
          cookie (
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">
            theme
          </code>
          ) that remembers your dark/light mode preference. No advertising
          cookies, no third-party tracking, no consent banner.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">
          Updates to this policy
        </h2>
        <p className="mt-4 text-foreground/85">
          Changes appear here with an updated date at the top. Substantial
          changes (new data categories, new processors) also go out by email to
          active contact submissions within the prior 12 months.
        </p>
      </section>

      <nav className="mt-14 border-t border-border pt-6 text-sm">
        <Link
          href="/terms"
          className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          See terms
        </Link>
      </nav>
    </main>
  );
}
