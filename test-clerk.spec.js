const { test, expect } = require('@playwright/test');

test('test clerk middleware error', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:3000');

  // Wait for page load
  await page.waitForLoadState('networkidle');

  // Check for any console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Wait a bit more to capture any delayed errors
  await page.waitForTimeout(2000);

  // Check if the Clerk error appears
  const clerkError = errors.find(error => error.includes('Clerk: auth() was called'));

  if (clerkError) {
    console.log('Found Clerk error:', clerkError);
  } else {
    console.log('No Clerk auth() error found');
  }

  // Print all errors for debugging
  if (errors.length > 0) {
    console.log('All console errors:', errors);
  }

  // Take a screenshot for debugging
  await page.screenshot({ path: 'debug-clerk.png' });
});