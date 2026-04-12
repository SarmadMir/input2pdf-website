import type { z } from 'zod';
import type { contactSchema } from '@/lib/contact/schema';

export type ContactFormData = z.infer<typeof contactSchema>;
