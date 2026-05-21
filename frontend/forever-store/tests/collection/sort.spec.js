import { test, expect } from '@playwright/test';

test('price sorting low to high works', async ({ page }) => {

  await page.goto('/collection');

  const selects = page.locator('select');

  await selects.nth(1).selectOption('low-high');

  await page.waitForTimeout(1000);

  const prices = await page
    .locator('.collection-price')
    .allTextContents();

  const numericPrices = prices.map(price =>
    parseInt(price.replace('₹', ''))
  );

  const sorted = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sorted);

});