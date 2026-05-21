import { test, expect } from '@playwright/test';

test('add to cart works', async ({ page }) => {

  await page.goto('/collection');

  await page.waitForSelector('.collection-card');

  await page.locator('.collection-cart-btn').first().click();

  await expect(page.locator('.cart-badge')).toHaveText('1');

});