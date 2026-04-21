/**
 * Banned-phrase lists for CMP-04 (voice-banned + tone-banned).
 * Sync with `.planning/brand-voice.md` — that doc is the canonical source.
 *
 * Matching rules:
 *  - Whole-phrase, case-insensitive.
 *  - Lines containing the EXEMPT_TOKEN (`voice-exempt`) are skipped.
 *  - Context-dependent words ('limited', 'limiting') are NOT in these lists — they
 *    require human review per `.planning/brand-voice.md` Competitor playbook.
 */
export const VOICE_BANNED = [
  'PDF generator',
  'form to PDF tool',
  'automation script',
  'SaaS platform',
  'workflow automation tool',
  'form builder',
  'All-in-one platform',
  'Streamline your workflow',
  'leverage',
  'robust',
  'best-in-class',
  'seamless',
  'empower',
  'solution-oriented',
  'cutting-edge',
  'innovative',
] as const;

export const TONE_BANNED = [
  'sucks',
  'fails',
  'broken',
  'inferior',
  'overpriced',
  'bloated',
  'worse than',
] as const;

/** Inline annotation that exempts a single line from the lint. Use with a reason:
 *  `// voice-exempt: CNT-08 attribution, locked copy` */
export const EXEMPT_TOKEN = 'voice-exempt';
