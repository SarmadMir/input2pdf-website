'use client';

import { useState } from 'react';
import { Download, Mail } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { usePdfPreviewImage } from '@/lib/hooks/usePdfPreviewImage';
import { EmailCertificateModal } from './EmailCertificateModal';

const MAX_SENDS = 3;

interface Props {
  pdfUrl: string | null;
  loading: boolean;
  error: string | null;
  recipientName: string;
}

export function PdfPreview({ pdfUrl, loading, error, recipientName }: Props) {
  const { imageUrl, dimensions } = usePdfPreviewImage(pdfUrl);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [sendCount, setSendCount] = useState(0);

  if (error) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.04] p-6">
        <p className="text-center text-xs text-red-400">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-border bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <p className="text-xs text-light-dark">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!pdfUrl || !imageUrl) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-border bg-background">
        <p className="text-xs text-light-dark">
          Start typing to see your PDF
        </p>
      </div>
    );
  }

  const emailDisabled = sendCount >= MAX_SENDS;

  return (
    <>
      <div className="group relative">
        <div className="relative overflow-hidden rounded-lg border border-border">
          <img
            src={imageUrl}
            alt="Generated certificate preview"
            className="block w-full"
            style={dimensions ? { aspectRatio: `${dimensions.width} / ${dimensions.height}` } : undefined}
          />
        </div>

        {/* Hover overlay — only show when user has entered a name */}
        {recipientName.trim() && <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            onClick={() => setEmailModalOpen(true)}
            disabled={emailDisabled}
            title={emailDisabled ? 'Send limit reached' : 'Email this certificate'}
            variant="primary"
            size="sm"
          >
            <Mail size={12} />
            Email Certificate
          </Button>
          <ButtonLink
            href={pdfUrl}
            download="certificate.pdf"
            variant="secondary"
            size="sm"
            className="bg-background/90 backdrop-blur-sm"
          >
            <Download size={12} />
            Download PDF
          </ButtonLink>
        </div>}
      </div>

      <EmailCertificateModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSuccess={() => setSendCount((c) => c + 1)}
        pdfUrl={pdfUrl}
        recipientName={recipientName}
      />
    </>
  );
}
