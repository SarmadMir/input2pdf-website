# Input2PDF — Security Decisions Log

## Phase 2 `npm audit` baseline (2026-04-12)

Command: `npm audit --omit=dev --audit-level=high`

Production results: **0 vulnerabilities** (0 high, 0 critical, 0 moderate, 0 low).

### Rule 1 auto-fix during Plan 02-05

- **next 16.2.1 → 16.2.3** (patch bump) to resolve `GHSA-q4gf-8mx6-v5v3`
  (Next.js Denial of Service with Server Components, high severity). `npm audit
  fix` (without `--force`) could not apply the fix because `package.json` pinned
  the exact minor version; bumping to 16.2.3 is a semver-patch change and
  preserves API surface. All 32 Vitest tests pass post-bump.

### Residual moderate/low advisories (dev-only — `npm audit` without `--omit=dev`)

These affect the build/test toolchain only. None reach the deployed bundle.

| Advisory | Package | Severity | Dependency path | Justification |
|----------|---------|----------|-----------------|---------------|
| GHSA-f886-m6hf-6m8v | brace-expansion | moderate | eslint / vitest transitive | Dev-only (lint + test). Waiting on upstream patches to eslint & vitest dependency trees. No runtime exposure. |
| GHSA-67mh-4wv8-2f99 | esbuild | moderate | vite → vitest | Dev-only; esbuild dev server is never exposed publicly. |
| GHSA-3v7f-55p6-f55p | picomatch | high (dev-only) | micromatch / tinyglobby chain | Dev-only file-matching during tests/build. Not reachable from production bundle. Blocked by upstream transitive resolution. |
| GHSA-c2c7-rcm5-vvqj | picomatch | high (dev-only) | same chain | Same as above; awaiting upstream patch. |

Mitigation: these packages never ship to users. The deployed Next.js bundle is
produced by `next build` and contains no dev dependencies. Production audit
(`npm audit --omit=dev --audit-level=high`) is clean. Re-check at Phase 3 kickoff
to see if upstream transitive patches have landed.

## CSP decisions

- **Static CSP with `'unsafe-inline'` on style-src**: framer-motion writes
  inline `transform`/`opacity` styles per animation keyframe. Moving to nonces
  would break Partial Prerendering (PPR) and CDN caching because every response
  would need a fresh per-request nonce. Accepted tradeoff per
  `02-RESEARCH.md §4.4`.

- **No `report-uri` / `report-to` endpoint for v1**: browser console plus the
  DevTools Issues panel is sufficient signal for a marketing-site launch. Add a
  collector (report-uri.com free tier or self-hosted) in v2 if traffic warrants
  the noise-filtering work.

- **Enforcing mode flip**: Phase 2 ships CSP in enforcing mode (default). The
  `CSP_REPORT_ONLY=1` env var is only used during the Plan 02-05 browse-session
  checkpoint and must NOT be set in Vercel project settings.

- **Honeypot schema relaxation (Rule 1)**: `contactSchema.website` was changed
  from `.max(0)` to `.max(500)`. The previous schema rejected non-empty
  honeypot input at Zod validation and returned `400 VALIDATION`, which leaks
  to bots that the field is inspected. The corrected schema lets the value
  pass, and the route handler's strict equality check (`data.website !== ''`)
  returns `200` silently — matching the WR-04 carry-forward intent. Verified by
  `tests/api-contact.test.ts` "honeypot filled → 200 silent, no email sent".

## Resend sandbox fallback

Kept `onboarding@resend.dev` as the `RESEND_FROM_EMAIL` fallback per D-Q1
(locked). SEC-06 (removal of the sandbox fallback) and SEC-07 (Resend domain
verification + SPF/DKIM/DMARC) are deferred to the domain-cutover batch once
the launch company name and domain are finalized.

## Deferred items from Phase 2

- FND-01, FND-09 (domain + Badge Bridge outreach — carried from Phase 1)
- SEC-06, SEC-07 (domain-cutover batch)
- Playwright / E2E tests (Phase 2 scope excludes; workspace backlog P2)
- UI component unit tests (Phase 2 budget did not cover)
