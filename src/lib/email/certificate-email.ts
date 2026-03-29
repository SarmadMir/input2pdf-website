export function certificateEmailHtml(recipientName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Certificate from Input2PDF</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1a1725;padding:28px 32px;text-align:center;">
              <span style="color:#f26380;font-size:13px;letter-spacing:4px;font-weight:600;">INPUT2PDF</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333;">Hi there,</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333;">Here's the certificate you just created${recipientName ? ` for <strong>${recipientName}</strong>` : ''} on Input2PDF — attached to this email.</p>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#333;">What you experienced was a simple, single-field demo. Now imagine what a full system could do for your organization:</p>
              <ul style="margin:0 0 16px;padding-left:20px;font-size:14px;line-height:1.8;color:#555;">
                <li>Custom templates matching your brand</li>
                <li>Multiple fields — names, dates, scores, IDs</li>
                <li>Bulk generation from spreadsheets or databases</li>
                <li>Automatic email delivery to hundreds of recipients</li>
                <li>Signature uploads and QR verification</li>
              </ul>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333;">We also build <strong>Certificate Management Portals</strong> — a dedicated platform where you manage your courses, instructors, classes, students, and their certificates all in one place. No more spreadsheets, no more manual PDF work.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#333;">We build these systems for course platforms, HR departments, event organizers, and more.</p>
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#f26380;border-radius:6px;">
                    <a href="https://input2pdfsolution.com/contact" style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Tell Us About Your Project</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #eee;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;">Sarmad Mir — Input2PDF</p>
              <p style="margin:4px 0 0;font-size:12px;color:#bbb;">Custom document generation systems, built for your business.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
