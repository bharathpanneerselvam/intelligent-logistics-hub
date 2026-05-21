import { test, expect } from '@playwright/test';

test('increase and decrease quantity works', async ({ page }) => {

  await page.goto('/collection');

  await page.waitForSelector('.collection-card');

  await page.locator('.collection-cart-btn').first().click();

  await page.click('.cart-btn');

  const plusButton = page.locator('.qty-controls button').nth(1);

  await plusButton.click();

  await expect(
    page.locator('.qty-controls span')
  ).toHaveText('2');

  const minusButton = page.locator('.qty-controls button').nth(0);

  await minusButton.click();

  await expect(
    page.locator('.qty-controls span')
  ).toHaveText('1');

});