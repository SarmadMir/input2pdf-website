import { describe, it, expect } from 'vitest';
import { contactSchema, PROJECT_TYPES } from '@/lib/contact/schema';

const valid = {
  name: 'Sarmad',
  email: 'Sarmad@Example.COM',
  projectType: 'certificates' as const,
  budgetRange: '500-1000' as const,
  projectDetails: 'I need a certificate auto-generation system for my training platform.',
  website: '',
};

describe('contactSchema', () => {
  it('accepts a valid full payload and normalizes email (trim + lowercase)', () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.email).toBe('sarmad@example.com');
      expect(r.data.name).toBe('Sarmad');
      expect(r.data.projectType).toBe('certificates');
      expect(r.data.budgetRange).toBe('500-1000');
    }
  });

  it('accepts a minimal payload with optional fields absent and defaults techStack to empty string', () => {
    const { website: _w, ...rest } = valid;
    const r = contactSchema.safeParse(rest);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.techStack).toBe('');
      expect(r.data.timeline).toBeUndefined();
      expect(r.data.website).toBe('');
    }
  });

  it('includes "ecards" in PROJECT_TYPES and accepts it as projectType', () => {
    expect(PROJECT_TYPES).toContain('ecards');
    const r = contactSchema.safeParse({ ...valid, projectType: 'ecards' });
    expect(r.success).toBe(true);
  });

  it('allows non-empty honeypot through the schema (route enforces strict !== "")', () => {
    // Schema intentionally lets website pass so the route handler can return 200 silently
    // to bots — a schema-level rejection would leak "VALIDATION" and tip off the bot.
    // The server's strict-equality check in /api/contact/route.ts traps the submission.
    const r = contactSchema.safeParse({ ...valid, website: 'spam' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.website).toBe('spam');
  });

  it('rejects name shorter than 2 characters', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'A' });
    expect(r.success).toBe(false);
  });

  it('rejects name longer than 100 characters', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'x'.repeat(101) });
    expect(r.success).toBe(false);
  });

  it('rejects invalid email format', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(r.success).toBe(false);
  });

  it('rejects email longer than 254 characters', () => {
    const huge = 'a'.repeat(245) + '@ex.com'; // 252 chars local, total > 254
    const local = 'a'.repeat(250);
    const r = contactSchema.safeParse({ ...valid, email: `${local}@ex.com` });
    expect(r.success).toBe(false);
    // also exercise `huge` path to avoid unused-var lint
    expect(huge.length).toBeGreaterThan(0);
  });

  it('rejects projectType not in enum', () => {
    const r = contactSchema.safeParse({ ...valid, projectType: 'not-real' });
    expect(r.success).toBe(false);
  });

  it('rejects budgetRange not in enum', () => {
    const r = contactSchema.safeParse({ ...valid, budgetRange: '1M+' });
    expect(r.success).toBe(false);
  });

  it('rejects projectDetails shorter than 20 characters (19 fails, 20 passes)', () => {
    const d19 = 'x'.repeat(19);
    const d20 = 'x'.repeat(20);
    expect(contactSchema.safeParse({ ...valid, projectDetails: d19 }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, projectDetails: d20 }).success).toBe(true);
  });

  it('rejects projectDetails longer than 5000 characters (5000 passes, 5001 fails)', () => {
    const d5000 = 'x'.repeat(5000);
    const d5001 = 'x'.repeat(5001);
    expect(contactSchema.safeParse({ ...valid, projectDetails: d5000 }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, projectDetails: d5001 }).success).toBe(false);
  });

  it('accepts timeline when valid and rejects when not in enum', () => {
    expect(contactSchema.safeParse({ ...valid, timeline: 'asap' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, timeline: 'yesterday' }).success).toBe(false);
  });

  it('accepts optional techStack string and rejects over 500 chars', () => {
    expect(contactSchema.safeParse({ ...valid, techStack: 'Next.js, Resend' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, techStack: 'x'.repeat(501) }).success).toBe(false);
  });

  it('trims whitespace in name', () => {
    const r = contactSchema.safeParse({ ...valid, name: '  Sarmad  ' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe('Sarmad');
  });
});
