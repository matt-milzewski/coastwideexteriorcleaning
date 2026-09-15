import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('src');
const target = path.resolve('.deploy');
const placeholder = '__ANCHOR_FORMS_API_BASE__';
const apiBase = String(process.env.ANCHOR_FORMS_API_BASE || '').trim().replace(/\/+$/, '');

if (apiBase && !/^https:\/\/[a-z0-9.-]+$/i.test(apiBase)) {
  throw new Error('ANCHOR_FORMS_API_BASE must be an HTTPS origin without a path.');
}

await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });

const contactPath = path.join(target, 'contact.html');
const contact = await readFile(contactPath, 'utf8');
const matches = contact.split(placeholder).length - 1;
if (matches !== 1) throw new Error(`Expected one forms API placeholder, found ${matches}.`);
await writeFile(contactPath, contact.replace(placeholder, apiBase));

console.log(`Prepared Coastwide deploy artifact with Anchor Forms ${apiBase ? 'enabled' : 'disabled'}.`);
