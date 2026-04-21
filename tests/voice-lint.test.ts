import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { VOICE_BANNED, TONE_BANNED, EXEMPT_TOKEN } from '@/lib/voice-lint/banned-phrases';

const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src');
const EXTS = new Set(['.ts', '.tsx', '.mdx']);
// 'voice-lint' skipped: it's the definition of the banned-phrase lists themselves.
const SKIP = new Set(['node_modules', '.next', 'dist', 'tests', 'public', '__tests__', 'voice-lint']);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else {
      const ext = '.' + entry.split('.').pop();
      if (EXTS.has(ext)) files.push(full);
    }
  }
  return files;
}

describe('CMP-04 voice-lint', () => {
  const files = walk(SRC);

  it('walks every .ts/.tsx/.mdx file under src/', () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it('has zero voice-banned phrase hits outside voice-exempt lines', () => {
    const hits: string[] = [];
    for (const f of files) {
      const lines = readFileSync(f, 'utf8').split(/\r?\n/);
      lines.forEach((line, idx) => {
        if (line.includes(EXEMPT_TOKEN)) return;
        const lower = line.toLowerCase();
        for (const p of VOICE_BANNED) {
          if (lower.includes(p.toLowerCase())) {
            hits.push(`${f}:${idx + 1} "${p}"`);
          }
        }
      });
    }
    expect(hits).toEqual([]);
  });

  it('has zero tone-banned phrase hits outside voice-exempt lines', () => {
    const hits: string[] = [];
    for (const f of files) {
      const lines = readFileSync(f, 'utf8').split(/\r?\n/);
      lines.forEach((line, idx) => {
        if (line.includes(EXEMPT_TOKEN)) return;
        const lower = line.toLowerCase();
        for (const p of TONE_BANNED) {
          if (lower.includes(p.toLowerCase())) {
            hits.push(`${f}:${idx + 1} "${p}"`);
          }
        }
      });
    }
    expect(hits).toEqual([]);
  });

  it('scripts/check-voice.mjs arrays stay in sync with the TS source', () => {
    const mjs = readFileSync(resolve(ROOT, 'scripts/check-voice.mjs'), 'utf8');
    for (const p of [...VOICE_BANNED, ...TONE_BANNED]) {
      // The .mjs file literally contains the phrase as a single-quoted string.
      expect(mjs.includes(`'${p}'`)).toBe(true);
    }
  });
});
