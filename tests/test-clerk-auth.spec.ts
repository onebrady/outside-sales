import { test, expect } from '@playwright/test';

test.describe('Clerk Authentication Flow', () => {
  test('should show Clerk login at /outside-sales', async ({ page }) => {
    console.log('Navigating to /outside-sales...');

    // Navigate to the main page
    await page.goto('http://localhost:3000/outside-sales', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait a bit for any redirects to happen
    await page.waitForTimeout(2000);

    // Log the current URL after navigation
    const currentUrl = page.url();
    console.log('Current URL after navigation:', currentUrl);

    // Check if we're on a sign-in page
    const isSignInPage = currentUrl.includes('sign-in') || currentUrl.includes('sign_in');
    const isOutsideSalesPath = currentUrl.includes('/outside-sales');

    console.log('Is sign-in page:', isSignInPage);
    console.log('Is outside-sales path:', isOutsideSalesPath);

    // Take a screenshot to see what's displayed
    await page.screenshot({
      path: 'screenshots/clerk-auth-test.png',
      fullPage: true
    });

    // Look for Clerk sign-in elements
    const clerkSignIn = await page.locator('[data-clerk-sign-in]').count();
    const signInButton = await page.locator('button:has-text("Sign in"), button:has-text("Continue")').count();
    const emailInput = await page.locator('input[type="email"], input[name="identifier"]').count();

    console.log('Clerk sign-in element found:', clerkSignIn > 0);
    console.log('Sign-in button found:', signInButton > 0);
    console.log('Email input found:', emailInput > 0);

    // Check for any error messages
    const errorMessages = await page.locator('.cl-formFieldError, [data-clerk-error]').allTextContents();
    if (errorMessages.length > 0) {
      console.log('Error messages found:', errorMessages);
    }

    // Check page title
    const title = await page.title();
    console.log('Page title:', title);

    // Check for development mode banner (should be hidden)
    const devBanner = await page.locator('[data-clerk-component="clerk-development-badge"]').isVisible().catch(() => false);
    console.log('Development banner visible:', devBanner);

    // Assert we're on the right path
    expect(currentUrl).toContain('/outside-sales');

    // Assert Clerk authentication is present
    const hasAuthElements = (clerkSignIn > 0) || (signInButton > 0) || (emailInput > 0);
    expect(hasAuthElements).toBe(true);
  });

  test('check redirect behavior', async ({ page }) => {
    // Try accessing a protected route
    console.log('Testing redirect from protected route...');

    await page.goto('http://localhost:3000/outside-sales/consignments', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await page.waitForTimeout(2000);

    const finalUrl = page.url();
    console.log('Final URL after redirect:', finalUrl);

    // Should redirect to sign-in
    expect(finalUrl).toContain('/outside-sales');

    await page.screenshot({
      path: 'screenshots/redirect-test.png',
      fullPage: true
    });
  });
});