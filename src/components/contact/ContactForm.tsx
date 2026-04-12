'use client';

import {
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import {
  contactSchema,
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  BUDGET_RANGES,
  BUDGET_RANGE_LABELS,
  TIMELINES,
  TIMELINE_LABELS,
} from '@/lib/contact/schema';
import type {
  ContactFieldErrors,
  ContactFormData,
  ContactResponse,
} from '@/types/contact';
import { ContactSuccess } from './ContactSuccess';
import { FieldRow } from './FieldRow';

type Status = 'idle' | 'error' | 'success';

interface ContactFormProps {
  /**
   * Server-provided mailto fallback address. Read from
   * `process.env.CONTACT_INBOX_EMAIL` in the Server Component shell.
   * Empty string disables the fallback link.
   */
  fallbackMailto: string;
}

/**
 * Whitelist-based pre-fill sanitizer.
 * Any value NOT in the allowed tuple becomes undefined, preventing reflected
 * XSS via `/contact?type=<script>...`.
 */
function sanitizeEnum<T extends string>(
  raw: string | null,
  allowed: readonly T[],
): T | undefined {
  if (raw === null) return undefined;
  return (allowed as readonly string[]).includes(raw) ? (raw as T) : undefined;
}

const emptyErrors: ContactFieldErrors = {};

export function ContactForm({ fallbackMailto }: ContactFormProps) {
  const formId = useId();
  const searchParams = useSearchParams();

  const initialType = useMemo(
    () => sanitizeEnum(searchParams.get('type'), PROJECT_TYPES) ?? '',
    [searchParams],
  );
  const initialBudget = useMemo(
    () => sanitizeEnum(searchParams.get('budget'), BUDGET_RANGES) ?? '',
    [searchParams],
  );

  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] =
    useState<ContactFieldErrors>(emptyErrors);
  const [serverMessage, setServerMessage] = useState<string>('');
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const resetToIdle = () => {
    setStatus('idle');
    setServerMessage('');
    setFieldErrors(emptyErrors);
  };

  // Success state short-circuits rendering. Rendered after a completed submit.
  if (status === 'success') {
    return <ContactSuccess email={submittedEmail} />;
  }

  const id = (name: string) => `${formId}-${name}`;

  const focusFirstInvalid = (errs: ContactFieldErrors) => {
    const first = Object.keys(errs)[0];
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const raw = Object.fromEntries(fd.entries());

    // Normalize optional selects: empty string → undefined so zod treats them
    // as missing rather than as an invalid enum value.
    const normalized: Record<string, unknown> = { ...raw };
    if (normalized.timeline === '') delete normalized.timeline;
    if (normalized.techStack === undefined) normalized.techStack = '';

    const parsed = contactSchema.safeParse(normalized);

    if (!parsed.success) {
      const errs: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof ContactFormData | undefined;
        if (path && !errs[path]) errs[path] = issue.message;
      }
      setFieldErrors(errs);
      setStatus('error');
      setServerMessage('Please fix the highlighted fields.');
      focusFirstInvalid(errs);
      return;
    }

    const data = parsed.data;

    startTransition(async () => {
      setFieldErrors(emptyErrors);
      setServerMessage('');

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        let json: ContactResponse;
        try {
          json = (await res.json()) as ContactResponse;
        } catch {
          setStatus('error');
          setServerMessage(
            'Unexpected response from the server. Please try again.',
          );
          return;
        }

        if (res.ok && json.ok) {
          // CTC-12: analytics event — no PII. Budget + project type only.
          // `@vercel/analytics` queues events as a no-op until `<Analytics />`
          // mounts (Phase 4). Wiring is complete now.
          track('contact_form_submitted', {
            budget_range: data.budgetRange,
            project_type: data.projectType,
          });

          setSubmittedEmail(data.email);
          setStatus('success');
          return;
        }

        if (!json.ok) {
          setStatus('error');
          setServerMessage(json.error.message);
          if (json.error.fieldErrors) {
            setFieldErrors(json.error.fieldErrors);
            focusFirstInvalid(json.error.fieldErrors);
          }
          return;
        }

        setStatus('error');
        setServerMessage('Something went wrong. Please try again.');
      } catch {
        setStatus('error');
        setServerMessage(
          'Could not reach the server. Check your connection and try again.',
        );
      }
    });
  };

  // Shared input classes — match the project's dark-mode form aesthetic.
  const inputClass =
    'block w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/35 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60';

  const describedBy = (name: keyof ContactFormData, hasHint?: boolean) => {
    const parts: string[] = [];
    if (fieldErrors[name]) parts.push(`${id(name)}-error`);
    else if (hasHint) parts.push(`${id(name)}-hint`);
    return parts.join(' ') || undefined;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-describedby={status === 'error' ? `${formId}-banner` : undefined}
    >
      {/* Error banner (T-02-04: surfaces server/network/rate-limit errors) */}
      {status === 'error' && serverMessage && (
        <div
          id={`${formId}-banner`}
          role="alert"
          className="rounded-md border border-primary/40 bg-primary/[0.06] px-4 py-3 text-sm text-foreground"
        >
          <p>{serverMessage}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              type="button"
              onClick={resetToIdle}
              className="rounded-md border border-border bg-background px-3 py-1.5 font-medium text-foreground/80 transition-colors hover:border-border-hover hover:text-foreground"
            >
              Try again
            </button>
            {fallbackMailto && (
              <a
                href={`mailto:${fallbackMailto}?subject=Project%20inquiry`}
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Or email us directly
              </a>
            )}
          </div>
        </div>
      )}

      {/* Name */}
      <FieldRow
        id={id('name')}
        label="Name"
        required
        error={fieldErrors.name}
      >
        <input
          id={id('name')}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          aria-invalid={Boolean(fieldErrors.name) || undefined}
          aria-describedby={describedBy('name')}
          className={inputClass}
        />
      </FieldRow>

      {/* Email */}
      <FieldRow
        id={id('email')}
        label="Email"
        required
        error={fieldErrors.email}
      >
        <input
          id={id('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          aria-invalid={Boolean(fieldErrors.email) || undefined}
          aria-describedby={describedBy('email')}
          className={inputClass}
        />
      </FieldRow>

      {/* Project type */}
      <FieldRow
        id={id('projectType')}
        label="Project type"
        required
        error={fieldErrors.projectType}
      >
        <select
          id={id('projectType')}
          name="projectType"
          defaultValue={initialType}
          required
          aria-invalid={Boolean(fieldErrors.projectType) || undefined}
          aria-describedby={describedBy('projectType')}
          className={inputClass}
        >
          <option value="" disabled>
            Select a project type…
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {PROJECT_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
      </FieldRow>

      {/* Tech stack (optional) */}
      <FieldRow
        id={id('techStack')}
        label="Tech stack (optional)"
        hint="Any existing systems or preferences? (e.g. WordPress, Laravel, Airtable)"
        error={fieldErrors.techStack}
      >
        <input
          id={id('techStack')}
          name="techStack"
          type="text"
          autoComplete="off"
          maxLength={500}
          aria-invalid={Boolean(fieldErrors.techStack) || undefined}
          aria-describedby={describedBy('techStack', true)}
          className={inputClass}
        />
      </FieldRow>

      {/* Budget */}
      <FieldRow
        id={id('budgetRange')}
        label="Budget range"
        required
        error={fieldErrors.budgetRange}
      >
        <select
          id={id('budgetRange')}
          name="budgetRange"
          defaultValue={initialBudget}
          required
          aria-invalid={Boolean(fieldErrors.budgetRange) || undefined}
          aria-describedby={describedBy('budgetRange')}
          className={inputClass}
        >
          <option value="" disabled>
            Select a budget range…
          </option>
          {BUDGET_RANGES.map((b) => (
            <option key={b} value={b}>
              {BUDGET_RANGE_LABELS[b]}
            </option>
          ))}
        </select>
      </FieldRow>

      {/* Timeline (optional) */}
      <FieldRow
        id={id('timeline')}
        label="Timeline (optional)"
        error={fieldErrors.timeline}
      >
        <select
          id={id('timeline')}
          name="timeline"
          defaultValue=""
          aria-invalid={Boolean(fieldErrors.timeline) || undefined}
          aria-describedby={describedBy('timeline')}
          className={inputClass}
        >
          <option value="">No preference</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>
              {TIMELINE_LABELS[t]}
            </option>
          ))}
        </select>
      </FieldRow>

      {/* Project details */}
      <FieldRow
        id={id('projectDetails')}
        label="Project details"
        required
        hint="What are you trying to build? 20 characters minimum."
        error={fieldErrors.projectDetails}
      >
        <textarea
          id={id('projectDetails')}
          name="projectDetails"
          rows={5}
          required
          minLength={20}
          maxLength={5000}
          aria-invalid={Boolean(fieldErrors.projectDetails) || undefined}
          aria-describedby={describedBy('projectDetails', true)}
          className={`${inputClass} resize-y`}
        />
      </FieldRow>

      {/*
        T-02-04-03 — Honeypot.
        CSS off-screen (NOT `display:none`; some bots detect display:none).
        aria-hidden + tabIndex=-1 + autoComplete=off keep real users + AT away.
        Server enforces strict equality `data.website !== ''`.
      */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor={id('website')}>
          Leave this field empty
          <input
            id={id('website')}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(242,99,128,0.2)] transition-all hover:shadow-[0_0_32px_rgba(242,99,128,0.3)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? 'Sending…' : 'Send project details'}
        </button>

        <p className="text-xs leading-relaxed text-foreground/55 sm:max-w-xs sm:text-right">
          By submitting, you agree to the handling of your information per our{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
