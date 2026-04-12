// `import type` is intentional: z is only used in the `z.infer` type position.
// This file has no runtime dependency on zod.
import type { z } from 'zod';
import type { contactSchema } from '@/lib/contact/schema';

export type ContactFormData = z.infer<typeof contactSchema>;

/** Structured error codes returned by the /api/contact route (ERR-05). */
export type ContactErrorCode =
  | 'VALIDATION'
  | 'RATE_LIMITED'
  | 'PAYLOAD_TOO_LARGE'
  | 'HONEYPOT'
  | 'DISPOSABLE_EMAIL'
  | 'EMAIL_SEND_FAILED'
  | 'UNKNOWN';

/** Per-field validation errors keyed by ContactFormData field name. */
export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

/** Discriminated union for /api/contact responses. */
export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      error: {
        code: ContactErrorCode;
        message: string;
        fieldErrors?: ContactFieldErrors;
      };
    };
