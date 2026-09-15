import { expect, test } from '@playwright/test';

const anchorApi = 'https://jp5by1qc4d.execute-api.ap-southeast-2.amazonaws.com';
const anchorRoute = `${anchorApi}/api/forms/coastwide-exterior-cleaning`;
const formspreeRoute = 'https://formspree.io/f/xzdaoelr';

async function fillQuote(page, { consent = true } = {}) {
  await page.getByLabel('Full Name *').fill('Transport Test');
  await page.getByLabel('Email Address *').fill('test@example.com');
  await page.getByLabel('Phone Number *').fill('0400000000');
  await page.getByLabel('Property Address / Suburb *').fill('Test suburb');
  await page.getByLabel('Service Required').selectOption('House Washing');
  await page.getByLabel('Message').fill('Mocked browser transport test.');
  if (consent) await page.getByLabel(/I consent to Coastwide/).check();
}

async function enableAnchorInDocument(page) {
  await page.route('**/contact.html', async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace('data-anchor-api-base=""', `data-anchor-api-base="${anchorApi}"`);
    await route.fulfill({ response, body, headers: { ...response.headers(), 'content-type': 'text/html; charset=utf-8' } });
  });
}

test('Phase A submits through Formspree while Anchor is disabled', async ({ page }) => {
  let formspreeCalls = 0;
  let anchorCalls = 0;
  await page.route(formspreeRoute, async (route) => {
    formspreeCalls += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{}' });
  });
  await page.route(anchorRoute, async (route) => {
    anchorCalls += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ accepted: true, submissionId: 'not-used' }) });
  });

  await page.goto('/contact.html');
  await fillQuote(page);
  await page.getByRole('button', { name: 'Send Quote Request' }).click();
  await expect(page.getByText(/Thank you! We'll reach out/)).toBeVisible();
  expect(formspreeCalls).toBe(1);
  expect(anchorCalls).toBe(0);
});

test('Phase B submits through Anchor and leaves Formspree idle on success', async ({ page }) => {
  let formspreeCalls = 0;
  let anchorCalls = 0;
  await enableAnchorInDocument(page);
  await page.route(formspreeRoute, async (route) => {
    formspreeCalls += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
  await page.route(anchorRoute, async (route) => {
    anchorCalls += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': 'http://127.0.0.1:4177' },
      body: JSON.stringify({ accepted: true, submissionId: '11111111-1111-4111-8111-111111111111' })
    });
  });

  await page.goto('/contact.html');
  await fillQuote(page);
  await page.getByRole('button', { name: 'Send Quote Request' }).click();
  await expect(page.getByText(/Thank you! We'll reach out/)).toBeVisible();
  expect(anchorCalls).toBe(1);
  expect(formspreeCalls).toBe(0);
});

test('Anchor uncertainty reveals and operates the Formspree backup', async ({ page }) => {
  let formspreeCalls = 0;
  await enableAnchorInDocument(page);
  await page.route(anchorRoute, (route) => route.fulfill({
    status: 503,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': 'http://127.0.0.1:4177' },
    body: JSON.stringify({ accepted: false, error: 'Unavailable for test' })
  }));
  await page.route(formspreeRoute, async (route) => {
    formspreeCalls += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });

  await page.goto('/contact.html');
  await fillQuote(page);
  await page.getByRole('button', { name: 'Send Quote Request' }).click();
  const backup = page.getByRole('button', { name: 'Send using our backup service' });
  await expect(backup).toBeVisible();
  await backup.click();
  await expect.poll(() => formspreeCalls).toBe(1);
});

test('consent validation blocks all transports', async ({ page }) => {
  let calls = 0;
  await page.route(formspreeRoute, async (route) => { calls += 1; await route.abort(); });
  await page.route(anchorRoute, async (route) => { calls += 1; await route.abort(); });
  await page.goto('/contact.html');
  await fillQuote(page, { consent: false });
  await page.getByRole('button', { name: 'Send Quote Request' }).click();
  await expect(page.getByText('Please provide consent so we can respond.')).toBeVisible();
  expect(calls).toBe(0);
});
