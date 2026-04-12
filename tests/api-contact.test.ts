import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import blocklist from '@/lib/contact/disposable-domains.json';

// Must set env before importing the route (resend singleton reads process.env at module load)
process.env.RESEND_API_KEY ??= 'test-key';
process.env.CONTACT_INBOX_EMAIL ??= 'sarmad@example.com';
// Ensure memory rate limiter is selected (not Upstash)
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;

const sendMock = vi.fn();
vi.mock('@/lib/resend', () => ({
  resend: { emails: { send: (...args: unknown[]) => sendMock(...args) } },
  RESEND_FROM: 'Test <test@test.com>',
  CONTACT_INBOX_EMAIL: 'sarmad@example.com',
}));

const rlMock = vi.fn();
vi.mock('@/lib/rate-limit', () => ({
  ratelimit: (...args: unknown[]) => rlMock(...args),
}));

function makeRequest(body: unknown, headers: Record<string, string> = {}): Request {
  const json = JSON.stringify(body);
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': '1.2.3.4',
      'content-length': String(new TextEncoder().encode(json).length),
      ...headers,
    },
    body: json,
  });
}

const validBody = {
  name: 'Sarmad',
  email: 'sarmad@example.com',
  projectType: 'certificates',
  budgetRange: '500-1000',
  projectDetails: 'I need a certificate auto-generation system for my training platform.',
  website: '',
};

// W-3 blocklist guard: if disposable-domains.json no longer contains mailinator.com,
// the test below would produce a cryptic "expected 400 got 200" — this fails early and loud instead.
beforeAll(() => {
  expect(blocklist).toContain('mailinator.com');
});

beforeEach(() => {
  sendMock.mockReset();
  rlMock.mockReset();
  rlMock.mockResolvedValue({ success: true, remaining: 2, reset: Date.now() + 60_000 });
  sendMock.mockResolvedValue({ data: { id: 'test' }, error: null });
});

describe('POST /api/contact', () => {
  it('happy path → 200 + email sent with correct replyTo and subject', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest(validBody) as never);
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
    const arg = sendMock.mock.calls[0][0];
    expect(arg.replyTo).toBe('sarmad@example.com');
    expect(arg.subject).toContain('certificates');
    expect(arg.subject).toContain('500-1000');
  });

  it('honeypot filled → 200 silent, no email sent', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ ...validBody, website: 'spam' }) as never);
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('rate-limited → 429 + Retry-After + RATE_LIMITED code', async () => {
    rlMock.mockResolvedValueOnce({ success: false, remaining: 0, reset: Date.now() + 60_000 });
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest(validBody) as never);
    expect(res.status).toBe(429);
    expect(res.headers.get('retry-after')).toBeTruthy();
    const body = await res.json();
    expect(body.error.code).toBe('RATE_LIMITED');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('oversized payload (content-length > 32KB) → 413', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest(validBody, { 'content-length': String(40_000) }) as never);
    expect(res.status).toBe(413);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('disposable email → 400 DISPOSABLE_EMAIL', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ ...validBody, email: 'spammer@mailinator.com' }) as never);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe('DISPOSABLE_EMAIL');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('invalid payload → 400 VALIDATION with fieldErrors', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const res = await POST(makeRequest({ ...validBody, email: 'not-an-email' }) as never);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe('VALIDATION');
    expect(body.error.fieldErrors?.email).toBeTruthy();
    expect(sendMock).not.toHaveBeenCalled();
  });
});
