import { FileSignature, GitMerge, ShieldCheck } from 'lucide-react';

export function ContractMockup() {
  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-sm select-none"
    >
      {/* Document card */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-2xl shadow-black/20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <FileSignature size={14} aria-hidden />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                Service Agreement
              </div>
              <div className="text-[9px] text-foreground/50">
                Generated · DEMO
              </div>
            </div>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
            Draft
          </span>
        </div>

        {/* Clause rows */}
        <div className="mt-5 space-y-3">
          <ClauseRow label="Scope of services" detail="Structured deliverables per engagement brief." />
          <ClauseRow label="Fees & milestones" detail="Deposit + mid-project + delivery." />
          <ClauseRow
            label="Jurisdiction clause"
            detail="Applied automatically based on intake."
            conditional
          />
          <ClauseRow label="Confidentiality" detail="NDA-backed when the engagement warrants." />
        </div>

        {/* Signature block */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
          <div>
            <div className="h-4 border-b border-foreground/25" aria-hidden />
            <div className="mt-1 text-[9px] uppercase tracking-wider text-foreground/45">
              Client signature
            </div>
          </div>
          <div>
            <div className="h-4 border-b border-foreground/25" aria-hidden />
            <div className="mt-1 text-[9px] uppercase tracking-wider text-foreground/45">
              Date
            </div>
          </div>
        </div>
      </div>

      {/* Subtle decorative meta chip — no continuous animation */}
      <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-foreground/55">
        <span className="inline-flex items-center gap-1">
          <GitMerge size={10} className="text-primary" aria-hidden />
          Conditional clauses
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck size={10} className="text-secondary" aria-hidden />
          Audit-ready log
        </span>
      </div>
    </div>
  );
}

function ClauseRow({
  label,
  detail,
  conditional,
}: {
  label: string;
  detail: string;
  conditional?: boolean;
}) {
  return (
    <div className="rounded-md border border-border/50 bg-background/50 px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold text-foreground/85">{label}</div>
        {conditional && (
          <span className="text-[9px] font-medium text-primary/80">Conditional</span>
        )}
      </div>
      <div className="mt-0.5 text-[10px] leading-snug text-foreground/55">{detail}</div>
    </div>
  );
}
