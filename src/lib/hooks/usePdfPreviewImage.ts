'use client';

import { useState, useEffect, useRef } from 'react';

// Only initialize the worker once across all instances
let workerInitialized = false;

/**
 * Renders a PDF blob URL to an image data URL using PDF.js.
 * This eliminates the iframe and its uncontrollable dark background.
 * Keeps the previous image visible until the new render completes (no blink).
 */
export function usePdfPreviewImage(pdfUrl: string | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!pdfUrl) {
      setImageUrl(null);
      setDimensions(null);
      return;
    }

    let cancelled = false;

    // Don't clear the previous image — keep it visible until the new render is ready.
    // This prevents the blink between PDF regenerations.

    async function render() {
      try {
        const pdfjsLib = await import('pdfjs-dist');

        if (!workerInitialized) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
          ).toString();
          workerInitialized = true;
        }

        const pdf = await pdfjsLib.getDocument(pdfUrl!).promise;
        const page = await pdf.getPage(1);

        const scale = 2;
        const viewport = page.getViewport({ scale });

        if (!canvasRef.current) {
          canvasRef.current = document.createElement('canvas');
        }
        const canvas = canvasRef.current;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        if (!ctx || cancelled) return;

        await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;

        if (cancelled) return;

        const dataUrl = canvas.toDataURL('image/png');
        setImageUrl(dataUrl);
        setDimensions({
          width: viewport.width / scale,
          height: viewport.height / scale,
        });

        pdf.destroy();
      } catch {
        // Silently fail — the PDF preview just won't update
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  return { imageUrl, dimensions };
}
