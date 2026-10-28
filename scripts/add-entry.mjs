// Appends a LinkedIn post or certification to the site's data files.
// Used by the "Add to website" GitHub Action, and locally:
//   npm run add -- linkedin "<post url>" "<optional one-line summary>"
//   npm run add -- certification "<name>" "<issuer>" "<date>" "<credential url>"

import { readFile, writeFile } from 'node:fs/promises';

const [kind, ...args] = process.argv.slice(2);
const file = { linkedin: 'linkedin.json', certification: 'certifications.json' }[kind];
if (!file) {
  console.error('First argument must be "linkedin" or "certification".');
  process.exit(1);
}

const path = new URL(`../src/data/${file}`, import.meta.url);
const list = JSON.parse(await readFile(path, 'utf8'));
const today = new Date().toISOString().slice(0, 10);

let entry;
if (kind === 'linkedin') {
  const [url, summary = ''] = args;
  if (!/linkedin\.com\//.test(url ?? '')) {
    console.error('Expected a linkedin.com post URL.');
    process.exit(1);
  }
  if (list.some((p) => p.url === url)) {
    console.log('Post already on the site; nothing to do.');
    process.exit(0);
  }
  entry = { url, summary, date: today };
} else {
  const [name, issuer = '', date = today, url = ''] = args;
  if (!name) {
    console.error('Certification name is required.');
    process.exit(1);
  }
  entry = { name, issuer, date, url };
}

list.unshift(entry);
await writeFile(path, JSON.stringify(list, null, 2) + '\n');
console.log(`Added to ${file}:`, entry);
