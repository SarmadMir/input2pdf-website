import { z } from 'zod';

/** Strict RFC5322-ish email for the certificate demo email field.
 *  Used by /api/send-certificate; the contact form uses the full contactSchema. */
export const certificateEmailSchema = z
  .string()
  .email('Please enter a valid email address')
  .max(254, 'Email must be under 254 characters')
  .trim()
  .toLowerCase();
