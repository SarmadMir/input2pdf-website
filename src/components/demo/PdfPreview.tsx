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
      <div className="flex h-full items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.04] p-6">
        <div className="text-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 text-red-400">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <p className="text-xs text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-border bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <p className="text-xs text-light-dark">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border bg-background">
        <div className="text-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 text-border">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <p className="text-xs text-light-dark">
            Start typing to see your PDF
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden rounded-lg border border-border bg-[#eae5d7]">
      {generating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#eae5d7]/80 backdrop-blur-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      )}
      {/* Desktop: PDF viewer — Fit shows full certificate, cream bg fills any gaps */}
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&view=Fit`}
        className="mx-auto hidden h-full w-full sm:block"
        title="Generated PDF preview"
        style={{ pointerEvents: 'none' }}
      />
      {/* Mobile: download button */}
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 sm:hidden">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p className="text-sm font-medium text-foreground">PDF Generated</p>
        <a
          href={pdfUrl}
          download="certificate.pdf"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
