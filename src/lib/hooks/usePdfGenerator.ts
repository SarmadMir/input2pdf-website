'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { DemoConfig } from '@/types/demo';
import { generatePdf } from '@/lib/pdf/engine';

const DEBOUNCE_MS = 300;

export function usePdfGenerator(
  config: DemoConfig,
  formValues: Record<string, string>,
  templateBytes: Uint8Array | null
) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevUrlRef = useRef<string | null>(null);

  const generate = useCallback(async () => {
    if (!templateBytes) return;

    setGenerating(true);
    setError(null);

    try {
      const pdfBytes = await generatePdf(config, formValues, templateBytes);
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Revoke previous URL to free memory
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
      }
      prevUrlRef.current = url;
      setPdfUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF generation failed');
    } finally {
      setGenerating(false);
    }
  }, [config, formValues, templateBytes]);

  // Debounced generation on form value changes
  useEffect(() => {
    if (!templateBytes) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(generate, DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [generate, templateBytes]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
      }
    };
  }, []);

  return { pdfUrl, generating, error };
}
