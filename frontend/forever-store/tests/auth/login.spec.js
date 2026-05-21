import { test, expect } from '@playwright/test';

test('user login works', async ({ page }) => {

  await page.goto('/login');

  await page.fill('#email', 'bharath@gmail.com');

  await page.fill('#password', '123456');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:5173/');

  const token = await page.evaluate(() =>
    localStorage.getItem('token')
  );

  expect(token).not.toBeNull();

});