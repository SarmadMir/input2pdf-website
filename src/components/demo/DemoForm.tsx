'use client';

import type { FormField as FormFieldType } from '@/types/demo';
import { FormField } from './FormField';

interface Props {
  fields: FormFieldType[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function DemoForm({ fields, values, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name] ?? field.defaultValue ?? ''}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
