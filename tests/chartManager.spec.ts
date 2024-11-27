import { test, expect } from '@playwright/test';

test.describe('Chart Manager E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should add a new chart with API data source', async ({ page }) => {
    // Fill the chart form
    await test.step('Add a new chart', async () => {
      await page.fill('input[name="title"]', 'My New Chart');
      await page.selectOption('select[name="type"]', 'line');
      await page.fill('input[name="data_source.name"]', 'GDP');
  
      // Wait for the API response that fetches suggestions
      await page.waitForResponse((response) =>
        response.url().includes('/api/series/search') && response.status() === 200
      );
  
      const suggestions = page.locator('.suggestion-list');
      await expect(suggestions).toBeVisible();
      await suggestions.locator('text=Real disposable Personal Income').first().click();
      await page.fill('input[name="y_axis_name"]', 'Value');
      await page.selectOption('select[name="frequency"]', 'Annual');
      await page.fill('input[type="color"]', '#123456');
      await page.click('button[type="submit"]');
      await expect(page.locator('.chart-item')).toHaveCount(1);
      await expect(page.locator('.chart-item')).toContainText('My New Chart');
    });

    // I took test.step to retain the memory of form
    await test.step('Edit the chart', async () => {  
      await page.click('text=Edit');
      await page.fill('input[name="title"]', 'Updated Chart Title');
      await page.click('button[type="submit"]');
      await expect(page.locator('.chart-item')).toContainText('Updated Chart Title');
   });

   // Delete the chart with test.step
   await test.step('Delete the chart', async () => {  
    await page.click('text=Delete');
    await expect(page.locator('.chart-item')).toHaveCount(0);
  });
  });

  // Try to submit the form without filling required fields
  test('should validate form behavior', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Title is required')).toBeVisible();
    await expect(page.locator('text=Data source is required')).toBeVisible();
  });
});
