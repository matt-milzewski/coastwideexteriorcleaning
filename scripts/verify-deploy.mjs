import { readFile } from 'node:fs/promises';

const contact = await readFile('.deploy/contact.html', 'utf8');
const formScript = await readFile('.deploy/js/form.js', 'utf8');
const apiBase = String(process.env.ANCHOR_FORMS_API_BASE || '').trim().replace(/\/+$/, '');

const requireText = (source, text, label) => {
  if (!source.includes(text)) throw new Error(`Missing ${label}: ${text}`);
};

requireText(contact, 'action="https://formspree.io/f/xzdaoelr"', 'Formspree fallback');
requireText(contact, 'data-anchor-site-id="coastwide-exterior-cleaning"', 'Anchor site ID');
requireText(contact, `data-anchor-api-base="${apiBase}"`, 'injected API base');
requireText(contact, 'name="_gotcha"', 'honeypot');
requireText(contact, 'name="_idempotencyKey"', 'idempotency key');
requireText(contact, 'name="consent"', 'consent field');
requireText(contact, 'id="backup-submit"', 'customer-controlled fallback');
requireText(formScript, 'HTMLFormElement.prototype.submit.call(form)', 'native fallback submission');
requireText(formScript, '/api/forms/', 'Anchor submission route');

if (contact.includes('__ANCHOR_FORMS_API_BASE__')) throw new Error('Forms API placeholder was not replaced.');
console.log(`Verified Coastwide artifact with Anchor Forms ${apiBase ? 'enabled' : 'disabled'} and Formspree retained.`);
