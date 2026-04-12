import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const REQUIRED_ASSETS = [
  'public/templates/certificate-demo.pdf',
  'public/fonts/Pacifico-Regular.ttf',
  'public/fonts/GreatVibes-Regular.ttf',
];

const projectRoot = resolve(__dirname, '..');
let missing = false;

for (const asset of REQUIRED_ASSETS) {
  const fullPath = resolve(projectRoot, asset);

  // WR-05: defense-in-depth — ensure resolved path is inside projectRoot
  if (!fullPath.startsWith(projectRoot + '/') && fullPath !== projectRoot) {
    console.error(`\x1b[31m[check-assets] INVALID path outside project root: ${asset}\x1b[0m`);
    missing = true;
    continue;
  }

  if (!existsSync(fullPath)) {
    console.error(`\x1b[31m[check-assets] MISSING: ${asset}\x1b[0m`);
    missing = true;
  } else {
    console.log(`\x1b[32m[check-assets] OK: ${asset}\x1b[0m`);
  }
}

if (missing) {
  console.error(
    '\n\x1b[31m[check-assets] Build aborted -- required assets are missing.\x1b[0m\n' +
    'These files are needed for the certificate demo to work.\n' +
    'Check that they exist in the public/ directory.\n'
  );
  process.exit(1);
}

console.log('\x1b[32m[check-assets] All required assets present.\x1b[0m');
