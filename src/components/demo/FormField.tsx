'use client';

import { useState, useEffect } from 'react';
import type { FormField as FormFieldType } from '@/types/demo';

interface Props {
  field: FormFieldType;
  value: string;
  onChange: (name: string, value: string) => void;
}

function useTypewriter(text: string, speed = 70, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    function run() {
      let i = 0;
      // Type forward
      const typeNext = () => {
        if (cancelled) return;
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          timeout = setTimeout(typeNext, speed);
        } else {
          // Pause, then erase
          timeout = setTimeout(eraseNext, pauseMs);
        }
      };
      // Erase backward
      const eraseNext = () => {
        if (cancelled) return;
        i--;
        setDisplayed(text.slice(0, i));
        if (i > 0) {
          timeout = setTimeout(eraseNext, speed / 2);
        } else {
          // Pause, then restart
          timeout = setTimeout(run, 500);
        }
      };
      timeout = setTimeout(typeNext, 800);
    }

    run();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [text, speed, pauseMs]);

  return displayed;
}

export function FormField({ field, value, onChange }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const isEmpty = !value;
  const typedPlaceholder = useTypewriter(field.placeholder ?? '');

  const baseClasses =
    'w-full rounded-lg border border-primary/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-light-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all';

  const glowClass = isEmpty && !isFocused ? 'demo-input-empty' : '';

  if (field.type === 'select' && field.options) {
    return (
      <div>
        <label htmlFor={field.name} className="mb-1.5 block text-xs font-medium text-foreground/70">
          {field.label}
        </label>
        <select
          id={field.name}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={baseClasses}
          required={field.required}
        >
          <option value="">{field.placeholder ?? 'Select...'}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <label htmlFor={field.name} className="mb-1.5 block text-xs font-medium text-foreground/70">
          {field.label}
        </label>
        <textarea
          id={field.name}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          required={field.required}
          rows={3}
          className={baseClasses}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.name} className="mb-2 block text-xs font-medium tracking-widest text-foreground/60 font-mono">
        {field.label}
      </label>
      <div className="flex items-center gap-3">
        <input
          id={field.name}
          type={field.type}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isEmpty && !isFocused ? typedPlaceholder : field.placeholder}
          maxLength={field.maxLength}
          required={field.required}
          className={`${baseClasses} ${glowClass}`}
        />
        {field.maxLength && (
          <span className="shrink-0 text-xs text-light-dark/50">
            {value.length}/{field.maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
