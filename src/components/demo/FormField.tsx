'use client';

import type { FormField as FormFieldType } from '@/types/demo';

interface Props {
  field: FormFieldType;
  value: string;
  onChange: (name: string, value: string) => void;
}

export function FormField({ field, value, onChange }: Props) {
  const baseClasses =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-light-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors';

  if (field.type === 'select' && field.options) {
    return (
      <div>
        <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-foreground">
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
        <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-foreground">
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
      <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-foreground">
        {field.label}
      </label>
      <input
        id={field.name}
        type={field.type}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        required={field.required}
        className={baseClasses}
      />
    </div>
  );
}
