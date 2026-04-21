import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact/schema';
import { ratelimit } from '@/lib/rate-limit';
import { resend, RESEND_FROM, CONTACT_INBOX_EMAIL } from '@/lib/resend';
import { isDisposableEmail } from '@/lib/contact/disposable-domains';
import { renderContactHtml, renderContactText } from './email-templates';
import type {
  ContactErrorCode,
  ContactFieldErrors,
  ContactResponse,
} from '@/types/contact';

// SEC-10: 32 KB cap is ~20x the worst legitimate payload (5000-char projectDetails + fields).
const MAX_PAYLOAD_BYTES = 32 * 1024;

function errorResponse(
  code: ContactErrorCode,
  message: string,
  status: number,
  fieldErrors?: ContactFieldErrors,
  extraHeaders?: Record<string, string>,
): NextResponse {
  const body: ContactResponse = {
    ok: false,
    error: { code, message, fieldErrors },
  };
  return NextResponse.json(body, { status, headers: extraHeaders });
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. Pre-parse size cap (SEC-10)
    const contentLength = Number(req.headers.get('content-length') ?? '0');
    if (contentLength > MAX_PAYLOAD_BYTES) {
      return errorResponse('PAYLOAD_TOO_LARGE', 'Request body too large.', 413);
    }

    // 2. Rate limit (CTC-05) — fails closed via 02-01 ratelimit() abstraction // voice-exempt: 'fails closed' is a security term describing our own code
    const ip = getIp(req);
    const rl = await ratelimit(`contact:${ip}`, { max: 3, window: '15 m' });
    if (!rl.success) {
      const retryAfter = Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000));
      return errorResponse(
        'RATE_LIMITED',
        'Too many requests. Please try again in 15 minutes.',
        429,
        undefined,
        {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Remaining': String(rl.remaining),
        },
      );
    }

    // 3. Read body + re-check size (some clients omit Content-Length)
    const text = await req.text();
    if (text.length > MAX_PAYLOAD_BYTES) {
      return errorResponse('PAYLOAD_TOO_LARGE', 'Request body too large.', 413);
    }

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return errorResponse('VALIDATION', 'Invalid JSON.', 400);
    }

    // 4. Zod validation (CTC-04, ERR-05)
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path.join('.') as keyof ContactFieldErrors;
        if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      return errorResponse(
        'VALIDATION',
        'Please fix the highlighted fields.',
        400,
        fieldErrors,
      );
    }
    const data = parsed.data;

    // 5. Honeypot — STRICT equality per WR-04 carry-forward.
    // Bot fills hidden field → silently return 200 so the bot believes it succeeded.
    if (data.website !== '') {
      // eslint-disable-next-line no-console
      console.warn('[contact] honeypot triggered', { ip });
      const ok: ContactResponse = { ok: true };
      return NextResponse.json(ok);
    }

    // 6. Disposable-domain blocklist (SEC-13)
    if (isDisposableEmail(data.email)) {
      return errorResponse(
        'DISPOSABLE_EMAIL',
        'Please use a non-disposable email address so we can reach you.',
        400,
        { email: 'Please use a permanent email address.' },
      );
    }

    // 7. Send via Resend singleton (CTC-06).
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: CONTACT_INBOX_EMAIL,
      replyTo: data.email,
      subject: `[Input2PDF Lead] ${data.projectType} — ${data.budgetRange}`,
      html: renderContactHtml(data),
      text: renderContactText(data),
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.error('[contact] Resend failure', error);
      return errorResponse(
        'EMAIL_SEND_FAILED',
        'Could not send your message. Please try again or email us directly.',
        502,
      );
    }

    const ok: ContactResponse = { ok: true };
    return NextResponse.json(ok);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] unknown error', err);
    return errorResponse('UNKNOWN', 'Something went wrong. Please try again.', 500);
  }
}
