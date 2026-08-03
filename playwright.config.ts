import { defineConfig, devices } from '@playwright/test';

/**
 * Mirrors the settings the Python framework carries in pytest.ini:
 *   --screenshot=only-on-failure --video=on --browser chromium --browser firefox --browser webkit -n auto
 *
 * Playwright Test's own runner replaces pytest.ini + conftest.py fixtures entirely —
 * projects[] below is the native way to run the same suite across three engines,
 * and workers replaces pytest-xdist's `-n auto`.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  outputDir: 'test-results',
});
