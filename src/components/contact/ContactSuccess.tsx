'use client';

import { useEffect, useRef } from 'react';

/**
 * Post-submit confirmation panel.
 *
 * IMPORTANT: do NOT promise a confirmation email here.
 * `/api/contact` sends ONE email — to `CONTACT_INBOX_EMAIL` with
 * `replyTo: data.email`. No outbound email is sent to the submitter.
 * The copy below must match what the system actually delivers.
 */
export function ContactSuccess({ email }: { email: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: false });
  }, []);

  return (
    <section
      className="rounded-xl border border-border bg-surface/60 p-8"
      role="status"
      aria-live="polite"
    >
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-2xl font-semibold tracking-tight outline-none"
      >
        Thanks — we got your project details.
      </h2>
      <p className="mt-3 text-foreground/70">
        We&apos;ll reply to{' '}
        <span className="font-medium text-foreground">{email}</span> within one
        business day.
      </p>

      <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-foreground/55">
        What happens next
      </h3>
      <ol className="mt-3 space-y-2 text-sm text-foreground/75">
        <li>
          <span className="font-semibold text-foreground">1.</span> Sarmad reads
          your project details (typically within one business day).
        </li>
        <li>
          <span className="font-semibold text-foreground">2.</span> If it&apos;s
          a fit, you get a reply with specific next steps and a rough estimate.
        </li>
        <li>
          <span className="font-semibold text-foreground">3.</span> If we need
          to dig in further, we book a 20-minute call to clarify scope.
        </li>
      </ol>
    </section>
  );
}
