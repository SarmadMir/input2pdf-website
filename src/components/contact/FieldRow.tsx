import type { ReactNode } from 'react';

export interface FieldRowProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/**
 * Accessible row: label + control slot + hint/error region.
 *
 * The control (children) is responsible for its own `id` — this wrapper only
 * wires `<label htmlFor>` and the error/hint `id`s so the caller can set
 * `aria-describedby` appropriately.
 */
export function FieldRow({
  id,
  label,
  required,
  error,
  hint,
  children,
}: FieldRowProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-xs text-foreground/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-primary" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
