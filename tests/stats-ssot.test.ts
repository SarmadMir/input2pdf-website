import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';

const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src');
// 'config' skipped: config/stats.ts is the SSoT itself; case-studies.ts holds per-study
// metrics like '30+' which are NOT site-wide stats claims.
const SKIP = new Set(['node_modules', '.next', 'dist', 'tests', 'public', 'config']);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(tsx?|mdx)$/.test(entry)) files.push(full);
  }
  return files;
}

describe('CNT-02 stats SSoT', () => {
  const files = walk(SRC);
  const patterns = ['20+', '30+', '5.0 on'];

  it('no hardcoded stats outside config/stats.ts', () => {
    const hits: string[] = [];
    for (const f of files) {
      const content = readFileSync(f, 'utf8');
      for (const p of patterns) {
        if (content.includes(p)) hits.push(`${f}: "${p}"`);
      }
    }
    expect(hits).toEqual([]);
  });
});
