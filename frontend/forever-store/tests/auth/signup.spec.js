import { test, expect } from '@playwright/test';

test('user signup works', async ({ page }) => {

  const email = `bharath${Date.now()}@gmail.com`;

  await page.goto('/signup');

  await page.fill('#name', 'Bharath');

  await page.fill('#email', email);

  await page.fill('#password', '123456');

  await page.fill('#confirm', '123456');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/login/);

  await expect(
    page.locator('h2.auth-title')
  ).toHaveText('Welcome back');

});