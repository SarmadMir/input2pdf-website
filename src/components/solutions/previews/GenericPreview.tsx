import { type ReactNode } from 'react';

interface GenericPreviewProps {
  eyebrow: string;
  title: string;
  body: ReactNode;
  footer?: string;
  icon: ReactNode;
}

/* ─── Generic preview mockup — shell used by solutions that don't have a bespoke
 * preview yet. Matches the pen design's gradient-framed card style so the preview
 * section feels cohesive across all solution pages.
 */
export function GenericPreview({ eyebrow, title, body, footer, icon }: GenericPreviewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-col items-center gap-6 bg-surface-2 px-8 py-12 text-center sm:px-14 sm:py-14">
        <div className="h-[3px] w-full bg-gradient-to-r from-primary to-primary/20" />

        <div className="mt-2 text-primary">{icon}</div>

        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/55">
          {eyebrow}
        </p>

        <div className="h-px w-20 bg-border" />

        <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">{title}</p>

        <div className="max-w-sm text-sm leading-relaxed text-foreground/65">{body}</div>

        {footer && (
          <>
            <div className="h-px w-20 bg-border" />
            <p className="font-mono text-xs text-foreground/55">{footer}</p>
          </>
        )}

        <div className="mt-2 h-[3px] w-full bg-gradient-to-r from-primary/20 to-primary" />
      </div>
    </div>
  );
}
