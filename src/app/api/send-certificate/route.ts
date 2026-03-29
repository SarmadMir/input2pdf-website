import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { certificateEmailHtml } from '@/lib/email/certificate-email';

// Simple in-memory rate limit: max 5 sends per IP per 15 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Server-side rate limiting by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { email, pdfBase64, recipientName } = body as {
      email: string;
      pdfBase64: string;
      recipientName: string;
    };

    // Require a recipient name (prevents empty certificate emails)
    if (!recipientName?.trim()) {
      return NextResponse.json({ error: 'Recipient name is required' }, { status: 400 });
    }

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate PDF data
    if (!pdfBase64 || pdfBase64.length > 7_000_000) {
      return NextResponse.json({ error: 'Invalid or oversized PDF' }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const safeName = (recipientName || 'certificate').replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'certificate';

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Input2PDF Demo <onboarding@resend.dev>',
      to: email,
      subject: 'Your Certificate is Here — See What Input2PDF Can Build for You',
      html: certificateEmailHtml(recipientName || ''),
      attachments: [
        {
          filename: `certificate-${safeName}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send certificate error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
