import { Resend } from 'resend';

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v || v.trim() === '') {
    throw new Error(
      `[resend] Missing required env var: ${key}. ` +
        `Set it in .env.local for dev and in Vercel project env for production.`,
    );
  }
  return v;
}

function optionalEnvWithFallback(
  key: string,
  fallback: string,
  warnMsg: string,
): string {
  const v = process.env[key];
  if (!v || v.trim() === '') {
    // eslint-disable-next-line no-console
    console.warn(`\x1b[33m[resend] ${warnMsg}\x1b[0m`);
    return fallback;
  }
  return v;
}

// SEC-05: cold-start fail-fast on missing API key.
const apiKey = requireEnv('RESEND_API_KEY');

// D-Q1 (locked): RESEND_FROM_EMAIL falls back to Resend sandbox with loud warning.
// DEFERRED to domain-cutover batch: SEC-06 will remove this fallback; SEC-07 adds domain verification.
export const RESEND_FROM = optionalEnvWithFallback(
  'RESEND_FROM_EMAIL',
  'Input2PDF Demo <onboarding@resend.dev>',
  'RESEND_FROM_EMAIL not set — falling back to Resend sandbox sender. ' +
    'Set RESEND_FROM_EMAIL once the launch domain is verified (SEC-06).',
);

// D-Q1 (locked): Sarmad's lead inbox — required, no fallback.
export const CONTACT_INBOX_EMAIL = requireEnv('CONTACT_INBOX_EMAIL');

export const resend = new Resend(apiKey);
