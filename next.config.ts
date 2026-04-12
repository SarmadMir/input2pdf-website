import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
// D-Q7 (locked): Phase 2 ships CSP in enforcing mode. Set CSP_REPORT_ONLY=1 during
// the browse-session verification in Plan 02-05. Default (unset) is enforcing.
const isReportOnly = process.env.CSP_REPORT_ONLY === '1';

// Vercel Analytics + Speed Insights beacon endpoints.
// ASSUMED per RESEARCH.md §4.6 — re-verify in Plan 02-05 report-only browse by watching
// the Network tab; if a new domain appears, add it to connect-src before flipping to enforcing.
const VERCEL_ANALYTICS_CONNECT = 'https://vitals.vercel-insights.com https://va.vercel-scripts.com';
const VERCEL_ANALYTICS_SCRIPT = 'https://va.vercel-scripts.com';

const csp = [
  `default-src 'self'`,
  // script-src: Next.js framework + inline boot (next-themes hydration).
  // 'unsafe-inline' required because we chose static CSP over nonces (locked — avoids killing PPR/CDN).
  // 'unsafe-eval' ONLY in dev (React Refresh / Turbopack HMR).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${VERCEL_ANALYTICS_SCRIPT}`,
  // style-src: framer-motion writes inline styles per-keyframe (transform, opacity). 'unsafe-inline' mandatory.
  // next/font also emits inline <style> for @font-face declarations.
  `style-src 'self' 'unsafe-inline'`,
  // img-src: pdf-lib blob previews (blob:), next/image + inline SVG + next/image placeholders (data:), self-hosted.
  `img-src 'self' data: blob:`,
  // font-src: next/font self-hosts Geist + Bricolage Grotesque; also Pacifico + GreatVibes local.
  `font-src 'self'`,
  // connect-src: same-origin (/api/*) + Vercel Analytics beacons + blob: for pdfjs worker/pdf-lib fetches.
  // Resend is server-side only — no client access.
  `connect-src 'self' blob: ${VERCEL_ANALYTICS_CONNECT}`,
  // worker-src: pdfjs-dist spawns its worker from a blob URL when the certificate demo lazy-loads.
  `worker-src 'self' blob:`,
  // media-src: no audio/video today, but 'self' is cheap.
  `media-src 'self'`,
  // object-src: defense-in-depth against <object>/<embed>/Flash.
  `object-src 'none'`,
  // base-uri: lock down injected <base> tag hijacking of relative URLs.
  `base-uri 'self'`,
  // form-action: contact form posts same-origin only.
  `form-action 'self'`,
  // frame-ancestors: modern clickjacking guard; paired with X-Frame-Options: DENY for legacy.
  `frame-ancestors 'none'`,
  // upgrade stray http:// to https://. Only emitted in enforcing mode — browsers ignore
  // this directive in Report-Only policies and log a noisy console warning, so we skip it.
  ...(isReportOnly ? [] : [`upgrade-insecure-requests`]),
].join('; ');

const securityHeaders = [
  {
    key: isReportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
    value: csp,
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS: 2 years, subdomains covered (future demos.*/app.*), preload-ready.
  // Only active on HTTPS; harmless over localhost HTTP.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
