import { test, expect } from '@playwright/test';

test('cart page displays added item', async ({ page }) => {

  await page.goto('/collection');

  await page.waitForSelector('.collection-card');

  await page.locator('.collection-cart-btn').first().click();

  await page.click('.cart-btn');

  await expect(page.locator('.cart-row')).toHaveCount(1);

});