import { test, expect } from '@playwright/test';

test('user logout works', async ({ page }) => {

  await page.goto('/login');

  await page.fill('#email', 'bharath@gmail.com');

  await page.fill('#password', '123456');

  await page.click('button[type="submit"]');

  await page.waitForURL('/');

  await page.hover('.account-wrap');

  await page.click('text=Logout');

  const token = await page.evaluate(() =>
    localStorage.getItem('token')
  );

  expect(token).toBeNull();

});