'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { DemoConfig } from '@/types/demo';
import { useTemplateLoader } from '@/lib/hooks/useTemplateLoader';
import { usePdfGenerator } from '@/lib/hooks/usePdfGenerator';
import { DemoForm } from './DemoForm';
import { PdfPreview } from './PdfPreview';

interface Props {
  config: DemoConfig;
}

export function DemoSection({ config }: Props) {
  const initialValues: Record<string, string> = {};
  for (const field of config.formFields) {
    if (field.defaultValue) {
      initialValues[field.name] = field.defaultValue;
    }
  }

  const [formValues, setFormValues] = useState<Record<string, string>>(initialValues);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { templateBytes, loading: templateLoading, error: templateError } =
    useTemplateLoader(config.templatePdf);

  const { pdfUrl, generating, error: pdfError } = usePdfGenerator(
    config,
    formValues,
    templateBytes
  );

  const handleFieldChange = useCallback((name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  // Show success badge when user has typed and PDF is ready
  const showSuccess = hasInteracted && !!pdfUrl && !generating;

  return (
    <section className="relative bg-surface py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Live Demo
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            See It in Action
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-light-dark">
            Fill in the form with your name and watch as a professional certificate appears instantly — this is exactly how our client systems work.
          </p>
        </motion.div>

        {/* Demo container */}
        <motion.div
          className="relative rounded-2xl border border-border bg-background p-1.5 shadow-2xl shadow-black/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-primary/[0.03] blur-2xl" />

          <div className="grid gap-1.5 lg:grid-cols-2">
            {/* Form panel */}
            <div className="flex flex-col rounded-xl bg-surface-2 p-6">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">Your Input</span>
              </div>

              {/* Form fields */}
              <DemoForm
                fields={config.formFields}
                values={formValues}
                onChange={handleFieldChange}
              />

              {/* Context info — fills the space meaningfully */}
              <div className="mt-6 flex-1">
                {/* How it works mini-guide */}
                <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    How this works
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">1</div>
                      <p className="text-xs leading-relaxed text-light-dark">Fill out a form with event, certificate, or course details</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">2</div>
                      <p className="text-xs leading-relaxed text-light-dark">A polished document generates instantly — no manual formatting</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">3</div>
                      <p className="text-xs leading-relaxed text-light-dark">Download, share, or have it emailed to recipients automatically</p>
                    </div>
                  </div>
                </div>

                {/* Capabilities hint */}
                <div className="mt-4 rounded-lg border border-primary/10 bg-primary/[0.03] p-4">
                  <p className="text-xs leading-relaxed text-light-dark">
                    <span className="font-medium text-foreground">This is a simplified demo.</span>{' '}
                    Our client systems support multiple fields, custom templates, signature uploads, and automatic email delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Preview panel */}
            <div className="flex flex-col rounded-xl bg-surface-2 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary/10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-foreground">Generated Document</span>
                </div>
                <AnimatePresence mode="wait">
                  {generating ? (
                    <motion.span
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-xs text-light-dark"
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                      Generating...
                    </motion.span>
                  ) : showSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-xs text-secondary"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Generated instantly
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
              <div className="min-h-[400px] flex-1">
                <PdfPreview
                  pdfUrl={pdfUrl}
                  loading={templateLoading}
                  generating={generating}
                  error={templateError ?? pdfError}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post-demo CTA */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-light-dark">
            Like what you see?
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(242,99,128,0.15)] hover:shadow-[0_0_25px_rgba(242,99,128,0.25)] hover:brightness-110"
          >
            Tell us about your project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
