import { test, expect } from '@playwright/test';
import type { Route } from '@playwright/test';

/**
 * TS port of tests/test_mock_api.py — network interception / service
 * virtualization via page.route(). Python's `route.fulfill()` and
 * `route.abort()` map 1:1 to the TS API; this is the most direct port
 * in the whole suite since Playwright's routing API is nearly identical
 * across languages.
 *
 * Selected 3 of the original file's 7 tests: blocked assets, a simulated
 * 500 server error, and a fully faked API payload — covering the three
 * distinct virtualization patterns (block, fault-inject, fake data) without
 * repeating near-duplicate cases (e.g. blocking .png vs .css vs .jpg).
 */

async function login(page: import('@playwright/test').Page): Promise<void> {
  await page.goto('https://www.saucedemo.com');
  await page.fill("[data-test='username']", 'standard_user');
  await page.fill("[data-test='password']", 'secret_sauce');
  await page.click("[data-test='login-button']");
  await page.waitForURL('**/inventory.html');
}

test('blocking image requests does not break login', async ({ page }) => {
  await page.route('**/*.png', (route: Route) => route.abort());
  await page.route('**/*.jpg', (route: Route) => route.abort());
  await login(page);
  expect(page.url()).toContain('/inventory');
  const imageCount = await page.locator('img').count();
  expect(imageCount).toBeGreaterThanOrEqual(0);
});

test('mocked 500 server error does not break login', async ({ page }) => {
  await page.route('**/api/**', (route: Route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    })
  );
  await login(page);
  expect(page.url()).toContain('/inventory');
});

test('fully virtualized API response is served to the page', async ({ page }) => {
  await page.route('**/posts', (route: Route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, title: 'Mocked Post 1', userId: 1 },
        { id: 2, title: 'Mocked Post 2', userId: 1 },
      ]),
    })
  );
  await page.goto('https://jsonplaceholder.typicode.com/posts');
  const content = await page.textContent('body');
  expect(content).toContain('Mocked Post 1');
  expect(content).toContain('Mocked Post 2');
});
