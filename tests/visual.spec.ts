import { test, expect } from '@playwright/test';

test.describe('Khor Design System - Visual Regression', () => {
  test('Home Page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Hide dynamic parts if any (e.g. date)
    await expect(page).toHaveScreenshot('home-page.png', { 
      fullPage: true,
      mask: [page.locator('text=/Generado el/')]
    });
  });

  test('Tokens Page', async ({ page }) => {
    await page.goto('/tokens');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tokens-page.png', { fullPage: true });
  });

  test('KButton Atom', async ({ page }) => {
    await page.goto('/atoms/button');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h2:has-text("KButton")');
    await expect(page).toHaveScreenshot('atom-button.png', { fullPage: true });
  });
  
  test('Dark Mode - Home Page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const toggle = page.locator('button[title="Cambiar a modo oscuro"]');
    if (await toggle.isVisible()) {
      await toggle.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('home-page-dark.png', { fullPage: true });
    }
  });

  test('KDataGrid Organism', async ({ page }) => {
    await page.goto('/organisms/data-grid');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h2:has-text("KDataGrid")');
    await expect(page).toHaveScreenshot('organism-data-grid.png', { fullPage: true });
  });

  test('KFormWizard Organism', async ({ page }) => {
    await page.goto('/organisms/form-wizard');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('h2:has-text("KFormWizard")');
    await expect(page).toHaveScreenshot('organism-form-wizard.png', { fullPage: true });
  });
});
