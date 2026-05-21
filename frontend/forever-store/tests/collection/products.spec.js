import { test, expect } from '@playwright/test';

test('products load successfully', async ({ page }) => {

  await page.goto('/collection');

  await page.waitForSelector('.collection-card');

  const cards = await page.locator('.collection-card').count();

  expect(cards).toBeGreaterThan(0);

});