'use client';

import { useState, useCallback } from 'react';
import type { DemoConfig } from '@/types/demo';
import { useTemplateLoader } from '@/lib/hooks/useTemplateLoader';
import { usePdfGenerator } from '@/lib/hooks/usePdfGenerator';
import { DemoForm } from './DemoForm';
import { PdfPreview } from './PdfPreview';

interface Props {
  config: DemoConfig;
}

export function DemoSection({ config }: Props) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const { templateBytes, loading: templateLoading, error: templateError } =
    useTemplateLoader(config.templatePdf);

  const { pdfUrl, generating, error: pdfError } = usePdfGenerator(
    config,
    formValues,
    templateBytes
  );

  const handleFieldChange = useCallback((name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          See It in Action
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-light-dark">
          {config.description}
        </p>
      </div>

      <div className="grid min-h-[500px] gap-6 lg:grid-cols-2">
        {/* Form side */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <DemoForm
            fields={config.formFields}
            values={formValues}
            onChange={handleFieldChange}
          />
        </div>

        {/* Preview side */}
        <div className="min-h-[400px] lg:min-h-0">
          <PdfPreview
            pdfUrl={pdfUrl}
            loading={templateLoading}
            generating={generating}
            error={templateError ?? pdfError}
          />
        </div>
      </div>
    </section>
  );
}
