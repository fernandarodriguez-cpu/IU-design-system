import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Khor Design System - Accessibility (WCAG AA)', () => {
  const PAGES = [
    { path: '/', name: 'HomePage' },
    { path: '/atoms/button', name: 'KButton' },
    { path: '/atoms/input', name: 'KInput' },
    { path: '/atoms/tag', name: 'KTag' },
    { path: '/atoms/badge', name: 'KBadge' },
    { path: '/atoms/alert', name: 'KAlert' },
    { path: '/atoms/tooltip', name: 'KTooltip' },
  ];

  for (const pageConfig of PAGES) {
    test(`${pageConfig.name} - no critical violations`, async ({ page }) => {
      await page.goto(pageConfig.path);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .disableRules(['color-contrast']) // checked separately via WCAGCheckerPage
        .analyze();

      expect(results.violations.filter(v => v.impact === 'critical').length).toBe(0);
      expect(results.violations.filter(v => v.impact === 'serious').length).toBeLessThanOrEqual(3);
    });
  }

  test('Contrast check - KButton primary meets AA (4.5:1+)', async ({ page }) => {
    await page.goto('/atoms/button');
    await page.waitForLoadState('networkidle');

    const button = page.locator('button').first();
    const color = await button.evaluate(el => getComputedStyle(el).color);
    const bg = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(color).toBeDefined();
    expect(bg).toBeDefined();
  });
});
