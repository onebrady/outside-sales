import { test, expect } from '@playwright/test';

test('Quick Clerk test - check what appears at /outside-sales', async ({ page }) => {
  console.log('Testing /outside-sales...');

  // Navigate to the main page
  await page.goto('http://localhost:3000/outside-sales', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Log the URL we ended up at
  const finalUrl = page.url();
  console.log('Final URL:', finalUrl);

  // Take a screenshot
  await page.screenshot({
    path: 'test-results/clerk-current-state.png',
    fullPage: true
  });

  // Log what we can see on the page
  const pageText = await page.textContent('body').catch(() => 'Could not get page text');
  console.log('Page contains:', pageText.substring(0, 500));

  // Check if there are Clerk elements
  const hasClerkElements = await page.locator('[data-clerk]').count() > 0;
  console.log('Has Clerk elements:', hasClerkElements);

  // Check if we can see sign-in form
  const hasSignInForm = await page.locator('form, [role="form"]').count() > 0;
  console.log('Has sign-in form:', hasSignInForm);

  // Just make sure we're on the right path
  expect(finalUrl).toContain('/outside-sales');
});