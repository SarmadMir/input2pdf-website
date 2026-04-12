import { z } from 'zod';

export const PROJECT_TYPES = [
  'certificates',
  'ecards',
  'forms',
  'invoices',
  'permits',
  'portals',
  'course-management',
  'pdf-generator',
  'other',
] as const;

export const BUDGET_RANGES = [
  '100-500',
  '500-1000',
  '1000-2000',
  '2000-5000',
  '5000+',
] as const;

export const TIMELINES = [
  'asap',
  'within-a-month',
  '1-3-months',
  'flexible',
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .trim(),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be under 254 characters')
    .trim()
    .toLowerCase(),

  projectType: z.enum(PROJECT_TYPES, {
    message: 'Please select a project type',
  }),

  techStack: z
    .string()
    .max(500, 'Tech stack description must be under 500 characters')
    .trim()
    .optional()
    .default(''),

  budgetRange: z.enum(BUDGET_RANGES, {
    message: 'Please select a budget range',
  }),

  timeline: z
    .enum(TIMELINES, {
      message: 'Please select a timeline',
    })
    .optional(),

  projectDetails: z
    .string()
    .min(20, 'Please provide at least 20 characters about your project')
    .max(5000, 'Project details must be under 5000 characters')
    .trim(),

  // Honeypot -- must be empty for legitimate submissions.
  // Schema accepts any string (bounded length) so the route handler can apply the
  // strict-equality check (`data.website !== ''`) and return 200 silently to bots.
  // If this were .max(0), Zod would short-circuit to a 400 VALIDATION response,
  // which signals to bots that the field is being inspected. The 200 silent trap
  // matches the WR-04 carry-forward and the behaviour asserted by tests/api-contact.test.ts.
  // SERVER MUST enforce strict equality: `if (data.website !== '') reject`.
  // Do NOT use truthiness (`if (!data.website)`) -- empty string is falsy and would bypass.
  website: z
    .string()
    .max(500, 'Invalid input')
    .optional()
    .default(''),
});

/** Display labels for form dropdowns */
export const PROJECT_TYPE_LABELS: Record<typeof PROJECT_TYPES[number], string> = {
  'certificates': 'Certificates',
  'ecards': 'eCards & Digital Cards',
  'forms': 'Forms & Agreements',
  'invoices': 'Invoices & Orders',
  'permits': 'Permits & Licenses',
  'portals': 'Generation Portals',
  'course-management': 'Course Management',
  'pdf-generator': 'PDF Generator',
  'other': 'Other',
};

export const BUDGET_RANGE_LABELS: Record<typeof BUDGET_RANGES[number], string> = {
  '100-500': '$100 - $500',
  '500-1000': '$500 - $1,000',
  '1000-2000': '$1,000 - $2,000',
  '2000-5000': '$2,000 - $5,000',
  '5000+': '$5,000+',
};

export const TIMELINE_LABELS: Record<typeof TIMELINES[number], string> = {
  'asap': 'ASAP',
  'within-a-month': 'Within a month',
  '1-3-months': '1-3 months',
  'flexible': 'Flexible',
};
