export type FieldType = 'text' | 'email' | 'date' | 'select' | 'number' | 'textarea';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string;
}

export interface TextOverlay {
  fieldName: string;
  x: number;
  y: number;
  fontSize: number;
  color: { r: number; g: number; b: number };
  font: 'Helvetica' | 'Helvetica-Bold' | 'Courier' | 'TimesRoman' | string;
  alignment?: 'left' | 'center';
  maxWidth?: number;
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
}

export interface DemoConfig {
  slug: string;
  title: string;
  description: string;
  templatePdf: string;
  templatePageIndex: number;
  formFields: FormField[];
  textOverlays: TextOverlay[];
}
