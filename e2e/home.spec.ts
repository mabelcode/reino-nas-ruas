import { test, expect } from '@playwright/test';

// Basic e2e test for home page

test('home page loads and shows sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /transformando/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /nossa essência/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /projetos em destaque/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /próximos eventos/i })).toBeVisible();
});
