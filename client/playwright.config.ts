import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start',
    port: 5173,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
