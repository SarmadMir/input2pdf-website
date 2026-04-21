import { NextRequest, NextResponse } from 'next/server';
import { resend, RESEND_FROM } from '@/lib/resend';
import { ratelimit } from '@/lib/rate-limit';
import { certificateEmailSchema } from '@/lib/contact/certificate-email-schema';
import { isDisposableEmail } from '@/lib/contact/disposable-domains';
import { certificateEmailHtml } from '@/lib/email/certificate-email';

// SEC-10: 10MB envelope cap (base64-inflated PDFs + metadata).
const MAX_CONTENT_LENGTH = 10 * 1024 * 1024;
// SEC-10: 7MB cap on the raw pdfBase64 string itself.
const MAX_PDF_BASE64 = 7_000_000;

function errorJson(code: string, message: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json(
    { ok: false, error: { code, message } },
    { status, headers },
  );
}

export async function POST(req: NextRequest) {
  try {
    // Size cap (SEC-10)
    const contentLength = Number(req.headers.get('content-length') ?? '0');
    if (contentLength > MAX_CONTENT_LENGTH) {
      return errorJson('PAYLOAD_TOO_LARGE', 'Request body too large.', 413);
    }

    // Rate limit (SEC-04) — Upstash sliding window, fails closed in prod. // voice-exempt: 'fails closed' is a security term describing our own code
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const rl = await ratelimit(`send-certificate:${ip}`, {
      max: 5,
      window: '15 m',
    });
    if (!rl.success) {
      const retryAfter = Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000));
      return errorJson(
        'RATE_LIMITED',
        'Too many requests. Try again in 15 minutes.',
        429,
        {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Remaining': String(rl.remaining),
        },
      );
    }

    const body = (await req.json()) as {
      email?: unknown;
      pdfBase64?: unknown;
      recipientName?: unknown;
      website?: unknown;
    };

    // Honeypot — strict equality per WR-04. Bot fills field → silent 200.
    if (body.website !== undefined && body.website !== '') {
      // eslint-disable-next-line no-console
      console.warn('[send-certificate] honeypot triggered', { ip });
      return NextResponse.json({ ok: true });
    }

    // Require recipient name
    const recipientName =
      typeof body.recipientName === 'string' ? body.recipientName : '';
    if (!recipientName.trim()) {
      return errorJson('VALIDATION', 'Recipient name is required.', 400);
    }

    // Validate email with Zod + disposable-domain blocklist (SEC-13)
    const emailParsed = certificateEmailSchema.safeParse(body.email);
    if (!emailParsed.success) {
      return errorJson('VALIDATION', 'Please enter a valid email address.', 400);
    }
    const email = emailParsed.data;
    if (isDisposableEmail(email)) {
      return errorJson(
        'DISPOSABLE_EMAIL',
        'Please use a non-disposable email address.',
        400,
      );
    }

    // Validate PDF base64 (SEC-10)
    const pdfBase64 = typeof body.pdfBase64 === 'string' ? body.pdfBase64 : '';
    if (!pdfBase64 || pdfBase64.length > MAX_PDF_BASE64) {
      return errorJson('PAYLOAD_TOO_LARGE', 'Invalid or oversized PDF.', 400);
    }

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const safeName =
      recipientName.replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'certificate';

    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: 'Your Certificate is Here — See What Input2PDF Can Build for You',
      html: certificateEmailHtml(recipientName),
      attachments: [
        {
          filename: `certificate-${safeName}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[send-certificate] Resend error', error);
      return errorJson('EMAIL_SEND_FAILED', 'Failed to send email.', 502);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[send-certificate] unknown error', err);
    return errorJson('UNKNOWN', 'Something went wrong.', 500);
  }
}
