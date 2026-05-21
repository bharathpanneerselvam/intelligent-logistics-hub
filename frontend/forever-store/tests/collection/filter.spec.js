import { test, expect } from '@playwright/test';

test('category filter works', async ({ page }) => {

  await page.goto('/collection');

  await page.selectOption('select', 'Men');

  await page.waitForTimeout(1000);

  const categories = await page.locator('.collection-category').allTextContents();

  for (const text of categories) {
    expect(text).toContain('Men');
  }

});