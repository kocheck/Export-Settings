import { test, expect } from '@playwright/test';

test.describe('Plugin UI', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Figma plugin sandbox (you'll need to set this up)
    await page.goto('http://localhost:5173/plugin-sandbox');
  });

  test('should show platform selection', async ({ page }) => {
    const platformSelect = page.locator(
      'select[aria-label="Select Platform"]'
    );
    await expect(platformSelect).toBeVisible();
  });

  test('should apply export settings', async ({ page }) => {
    // Select platform
    await page.selectOption(
      'select[aria-label="Select Platform"]',
      'iOS'
    );

    // Click apply button
    await page.click('button:text("Apply Export Settings")');

    // Verify success message
    await expect(page.locator('.toast.success')).toBeVisible();
  });

  test('should show settings panel', async ({ page }) => {
    await page.click('button[aria-label="Settings"]');
    await expect(page.locator('.settings-panel')).toBeVisible();
  });
});
