'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, FileText, CheckCircle, Info, ArrowRight } from 'lucide-react';
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

          <div className="grid items-start gap-1.5 lg:grid-cols-2">
            {/* Form panel */}
            <div className="flex flex-col rounded-xl bg-surface-2 p-6 h-full">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                  <Pencil size={12} className="text-primary" />
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
              <div className="mt-8 flex-1">
                {/* How it works mini-guide */}
                <div className="mb-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/40 font-mono">
                    How this works
                  </p>
                  <div className="pointer-events-none mb-5 h-px bg-gradient-to-r from-border/60 via-border/30 to-transparent" />
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">1</div>
                      <p className="text-sm leading-relaxed text-light-dark">Fill out a form with event, certificate, or course details</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">2</div>
                      <p className="text-sm leading-relaxed text-light-dark">A polished document generates instantly — no manual formatting</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</div>
                      <p className="text-sm leading-relaxed text-light-dark">Download, share, or have it emailed to recipients automatically</p>
                    </div>
                  </div>
                </div>

                {/* Capabilities hint */}
                <div className="rounded-lg border border-[#2A2D3E] bg-background/60 p-4">
                  <div className="flex items-start gap-3">
                    <Info size={16} className="mt-0.5 shrink-0 text-light-dark/60" />
                    <p className="text-sm leading-relaxed text-light-dark">
                      <span className="font-semibold text-foreground">This is a simplified demo.</span><br />
                      Our client systems support multiple fields, custom templates, signature uploads, and automatic email delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview panel */}
            <div className="rounded-xl bg-surface-2 p-6 lg:sticky lg:top-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary/10">
                    <FileText size={12} className="text-secondary" />
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
                      <CheckCircle size={12} />
                      Generated instantly
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
              <PdfPreview
                pdfUrl={pdfUrl}
                loading={templateLoading}
                error={templateError ?? pdfError}
                recipientName={formValues.fname || ''}
              />
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
            <ArrowRight size={14} className="ml-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
