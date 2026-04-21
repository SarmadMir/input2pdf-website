#!/usr/bin/env node
// scripts/check-voice.mjs — CMP-04 prebuild lint.
// Matches src/lib/voice-lint/banned-phrases.ts (duplicated here for a zero-build-deps Node run).
// Drift between this file and the TS source is caught by tests/voice-lint.test.ts.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { cwd, exit } from 'node:process';

const VOICE_BANNED = [
  'PDF generator', 'form to PDF tool', 'automation script',
  'SaaS platform', 'workflow automation tool', 'form builder',
  'All-in-one platform', 'Streamline your workflow',
  'leverage', 'robust', 'best-in-class', 'seamless',
  'empower', 'solution-oriented', 'cutting-edge', 'innovative',
];
const TONE_BANNED = ['sucks', 'fails', 'broken', 'inferior', 'overpriced', 'bloated', 'worse than'];
const EXEMPT_TOKEN = 'voice-exempt';

const ROOT = cwd();
const SRC = resolve(ROOT, 'src');
const EXTS = new Set(['.ts', '.tsx', '.mdx']);
// 'voice-lint' excluded because it's the definition of the banned-phrase lists themselves.
const SKIP_DIRS = new Set(['node_modules', '.next', 'dist', 'tests', 'public', '__tests__', 'voice-lint']);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
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

function lintFile(path) {
  const content = readFileSync(path, 'utf8');
  const lines = content.split(/\r?\n/);
  const hits = [];
  lines.forEach((line, idx) => {
    if (line.includes(EXEMPT_TOKEN)) return;
    const lower = line.toLowerCase();
    for (const phrase of [...VOICE_BANNED, ...TONE_BANNED]) {
      if (lower.includes(phrase.toLowerCase())) {
        hits.push({ line: idx + 1, phrase, text: line.trim() });
      }
    }
  });
  return hits;
}

const files = walk(SRC);
let total = 0;
for (const f of files) {
  const hits = lintFile(f);
  if (hits.length) {
    const rel = f.replace(ROOT + '/', '');
    console.error(`\x1b[31m[voice-lint] ${rel}\x1b[0m`);
    for (const h of hits) {
      console.error(`  L${h.line} banned: "${h.phrase}"`);
      console.error(`    ${h.text}`);
    }
    total += hits.length;
  }
}

if (total > 0) {
  console.error(`\n\x1b[31m[voice-lint] FAILED — ${total} banned-phrase match(es). Resolve or annotate with \`// ${EXEMPT_TOKEN}: <reason>\`.\x1b[0m`);
  exit(1);
}
console.log('[voice-lint] clean — no banned phrases in src/');
