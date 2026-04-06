import { type ReactNode } from 'react';

/* ─── Badge — reusable atomic pill component ───
 * Mirrors the system defined in designs/badges.pen:
 * pill shape, mono font, primary coral, variants for emphasis levels.
 */

export type BadgeVariant =
  | 'solid-primary'
  | 'solid-dark'
  | 'outline-primary'
  | 'outline-subtle'
  | 'ghost-primary'
  | 'ghost-neutral';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeDot = 'live' | 'muted' | 'primary';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  dot?: BadgeDot;
  uppercase?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  // Solid coral with near-black text — passes WCAG AA (~6.4:1) vs white-on-coral (~3:1).
  'solid-primary': 'bg-primary text-neutral-950 font-semibold',
  'solid-dark': 'bg-surface-2 border border-border text-foreground font-medium',
  'outline-primary': 'border border-primary/60 bg-primary/[0.04] text-primary font-semibold',
  'outline-subtle': 'border border-border text-foreground/70 font-medium',
  'ghost-primary': 'bg-primary/10 border border-primary/15 text-primary font-semibold',
  'ghost-neutral': 'bg-foreground/[0.06] text-foreground/70 font-medium',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-[10px] gap-1',
  md: 'px-3 py-1 text-xs gap-1.5',
  lg: 'px-3.5 py-1.5 text-xs gap-2',
};

const dotColorClasses: Record<BadgeDot, string> = {
  live: 'bg-emerald-400',
  muted: 'bg-foreground/40',
  primary: 'bg-primary',
};

export function Badge({
  children,
  variant = 'ghost-primary',
  size = 'md',
  icon,
  dot,
  uppercase,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full font-mono ${variantClasses[variant]} ${sizeClasses[size]} ${
        uppercase ? 'uppercase tracking-[0.12em]' : 'tracking-wide'
      } ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColorClasses[dot]}`} />}
      {icon && <span className="shrink-0 [&>svg]:block">{icon}</span>}
      {children}
    </span>
  );
}
