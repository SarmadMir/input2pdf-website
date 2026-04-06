import { Award } from 'lucide-react';

/* ─── Cream certificate mockup — matches designs/Solutions.pen v3 ─── */
export function CertificatePreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col items-center gap-3.5 rounded-lg bg-[#f4eee3] px-8 py-10 text-center sm:px-10 sm:py-12">
        {/* Top accent */}
        <div className="h-0.5 w-16 bg-primary" />

        <Award size={44} strokeWidth={1.5} className="mt-1 text-primary" />

        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355]">
          Certificate of Completion
        </p>

        <div className="h-px w-16 bg-[#d4c5ab]" />

        <p className="text-xs text-[#8b7355]">Presented to</p>
        <p className="font-display text-[1.85rem] font-bold leading-tight text-[#2a241d]">Jane Doe</p>
        <p className="text-xs text-[#8b7355]">for completing</p>
        <p className="text-sm font-semibold text-[#b8412d]">Advanced CPR &amp; First Aid Certification</p>

        <div className="h-px w-16 bg-[#d4c5ab]" />

        <p className="font-mono text-[10px] text-[#8b7355]">April 6, 2026 &middot; No. CPR-2026-00847</p>

        {/* Bottom accent */}
        <div className="mt-1 h-0.5 w-16 bg-primary" />
      </div>
    </div>
  );
}
