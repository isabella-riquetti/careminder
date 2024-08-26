import { test, expect } from '@playwright/test';

test('basic test to open the page', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page).toHaveTitle(/CareMinder/);
});
