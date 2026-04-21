import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms — Input2PDF',
  description:
    'How engagements work. Payment terms. IP. Revisions. Liability. Termination.',
};

// JURISDICTION: pending Sarmad confirmation — swap PLACEHOLDER_JURISDICTION with
// the locked governing jurisdiction (likely 'the laws of England and Wales' or
// a US state) before launch. Wave 4 /impeccable:critique flags this.

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Terms
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          How we work together.
        </h1>
        <p className="mt-4 text-sm text-foreground/55">Last updated: 2026-04</p>
      </header>

      {/* Risk 7 mitigation: honest disclaimer */}
      <aside className="rounded-xl border border-border bg-surface px-5 py-4 text-sm leading-relaxed text-foreground/75">
        These terms cover a standard service engagement. They are not a
        substitute for a signed Master Services Agreement — commercial
        engagements use a signed MSA that supersedes these terms where the two
        differ. Not legal advice.
      </aside>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">Scope of services</h2>
        <p className="mt-4 text-foreground/85">
          We build bespoke document automation systems — deliverables are
          defined per engagement in the proposal we send with your quote.
          Anything not in the proposal is out of scope until both sides agree
          in writing.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Payment terms</h2>
        <p className="mt-4 text-foreground/85">
          Most engagements run on milestone billing — a deposit to start, a
          mid-project invoice at a defined checkpoint, and a delivery invoice
          on handoff. Exact milestones are set in the proposal. Quotes are
          valid for 30 days from issue.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">IP ownership</h2>
        <p className="mt-4 text-foreground/85">
          On final payment you own the delivered source code and all artifacts
          listed as deliverables. Input2PDF retains the right to reference the
          engagement as portfolio work, scrubbed of identifying details unless
          you&apos;ve explicitly agreed to be named.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Revisions</h2>
        <p className="mt-4 text-foreground/85">
          Within-scope revisions are included. Out-of-scope changes get
          re-quoted honestly — we tell you up front when a request crosses the
          line. Scope is written into the proposal so this conversation stays
          short.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">
          Limitation of liability
        </h2>
        <p className="mt-4 text-foreground/85">
          Our liability on any engagement is capped at the total fees
          you&apos;ve paid for that engagement. We don&apos;t accept liability
          for consequential, incidental, or indirect damages.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">
          Governing jurisdiction
        </h2>
        <p className="mt-4 text-foreground/85">
          {/* JURISDICTION: pending Sarmad confirmation — placeholder kept explicit for Wave 4 critique */}
          These terms are governed by{' '}
          <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-primary">
            PLACEHOLDER_JURISDICTION
          </span>
          . Disputes are resolved first through good-faith negotiation; if
          that fails, through the courts of the governing jurisdiction. {/* voice-exempt: legal-terms boilerplate — 'if that fails' refers to negotiation, not competitor product */}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Termination</h2>
        <p className="mt-4 text-foreground/85">
          Either party may terminate the engagement with 14 days&apos; written
          notice. On termination, completed milestones are payable; incomplete
          milestones are pro-rated against work delivered.
        </p>
      </section>

      <nav className="mt-14 border-t border-border pt-6 text-sm">
        <Link
          href="/privacy"
          className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          See privacy policy
        </Link>
      </nav>
    </main>
  );
}
