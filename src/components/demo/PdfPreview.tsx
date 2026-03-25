'use client';

interface Props {
  pdfUrl: string | null;
  loading: boolean;
  generating: boolean;
  error: string | null;
}

export function PdfPreview({ pdfUrl, loading, generating, error }: Props) {
  if (error) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-red-300 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/20">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-border bg-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-light-dark">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-border bg-surface">
        <p className="text-sm text-light-dark">
          Enter details on the left to generate your PDF
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full rounded-lg border border-border bg-surface overflow-hidden">
      {generating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {/* Desktop: inline PDF viewer */}
      <object
        data={pdfUrl}
        type="application/pdf"
        className="hidden h-full w-full sm:block"
        aria-label="Generated PDF preview"
      >
        <a
          href={pdfUrl}
          download="certificate.pdf"
          className="flex h-full items-center justify-center text-sm text-primary underline"
        >
          Download PDF
        </a>
      </object>
      {/* Mobile: download button (Safari can't render inline PDFs) */}
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 sm:hidden">
        <p className="text-sm text-light-dark">Your PDF is ready!</p>
        <a
          href={pdfUrl}
          download="certificate.pdf"
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
