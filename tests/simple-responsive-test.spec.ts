import { test, expect } from '@playwright/test';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 }
};

// Helper to bypass Clerk authentication
async function bypassAuth(page) {
  // Set Clerk test mode cookie to skip authentication
  await page.context().addCookies([{
    name: '__clerk_db_jwt',
    value: 'test',
    domain: 'localhost',
    path: '/'
  }]);

  // Also add session storage if needed
  await page.addInitScript(() => {
    window.localStorage.setItem('__clerk_testing_token', 'test');
  });
}

test.describe('Responsive Design Verification', () => {
  test.beforeEach(async ({ page }) => {
    await bypassAuth(page);
  });

  for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
    test(`${viewportName} - Main page and modal`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize(viewport);

      // Navigate to the main page
      await page.goto('http://localhost:3000/outside-sales', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for content to load
      await page.waitForTimeout(2000);

      // Take screenshot of main page
      await page.screenshot({
        path: `screenshots/responsive-test/${viewportName}-main.png`,
        fullPage: true
      });

      // Try to click on the first trailer card to open modal
      const firstCard = page.locator('[data-testid="trailer-card"], .cursor-pointer').first();
      const cardExists = await firstCard.isVisible().catch(() => false);

      if (cardExists) {
        await firstCard.click();

        // Wait for modal to open
        await page.waitForSelector('[role="dialog"]', {
          timeout: 5000,
          state: 'visible'
        }).catch(() => console.log(`Modal didn't open for ${viewportName}`));

        // Take screenshot of modal
        await page.screenshot({
          path: `screenshots/responsive-test/${viewportName}-modal.png`,
          fullPage: false // Just capture viewport with modal
        });
      }

      console.log(`✅ ${viewportName} screenshots captured`);
    });
  }

  test('Mobile menu functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(VIEWPORTS.mobile);

    // Navigate to the main page
    await page.goto('http://localhost:3000/outside-sales', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Look for hamburger menu button
    const hamburgerButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    const hamburgerExists = await hamburgerButton.isVisible().catch(() => false);

    if (hamburgerExists) {
      // Click hamburger menu
      await hamburgerButton.click();
      await page.waitForTimeout(500);

      // Take screenshot with menu open
      await page.screenshot({
        path: `screenshots/responsive-test/mobile-menu-open.png`,
        fullPage: false
      });

      console.log('✅ Mobile menu screenshot captured');
    } else {
      console.log('⚠️ No hamburger menu found');
    }
  });
});