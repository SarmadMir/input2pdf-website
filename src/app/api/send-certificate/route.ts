import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { certificateEmailHtml } from '@/lib/email/certificate-email';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { email, pdfBase64, recipientName } = body as {
      email: string;
      pdfBase64: string;
      recipientName: string;
    };

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
