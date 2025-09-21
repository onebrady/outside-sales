import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';

// Quick screenshot test that captures the current state of the application
// across different viewports without requiring authentication

const quickViewports = [
  { width: 1920, height: 1080, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' },
];

test.describe('Quick Responsive Screenshots', () => {
  for (const viewport of quickViewports) {
    test(`Capture ${viewport.name} view`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Navigate to the app
      await page.goto('http://localhost:3000', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });

      // Wait a bit for content to stabilize
      await page.waitForTimeout(2000);

      // Create screenshots directory
      const screenshotDir = path.join('screenshots', 'quick');
      await fs.mkdir(screenshotDir, { recursive: true });

      // Take full page screenshot
      const screenshotPath = path.join(screenshotDir, `${viewport.name}-full.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });

      console.log(`✅ Screenshot saved: ${screenshotPath}`);

      // Check if we're on the sign-in page or the inventory page
      const hasSignIn = await page.locator('[data-clerk-sign-in]').count() > 0;
      const hasGrid = await page.locator('.grid').count() > 0;

      if (hasSignIn) {
        console.log(`📋 ${viewport.name}: Sign-in page detected`);

        // Take screenshot of just the sign-in modal
        const signInModal = await page.locator('.max-w-md').first();
        if (await signInModal.count() > 0) {
          await signInModal.screenshot({
            path: path.join(screenshotDir, `${viewport.name}-signin-modal.png`),
          });
        }
      }

      if (hasGrid) {
        console.log(`📋 ${viewport.name}: Inventory grid detected`);

        // Take screenshot of the header
        const header = await page.locator('header').first();
        if (await header.count() > 0) {
          await header.screenshot({
            path: path.join(screenshotDir, `${viewport.name}-header.png`),
          });
        }

        // Take screenshot of the grid
        const grid = await page.locator('.grid').first();
        if (await grid.count() > 0) {
          await grid.screenshot({
            path: path.join(screenshotDir, `${viewport.name}-grid.png`),
          });
        }

        // Try to open a modal if there are cards
        const firstCard = await page.locator('[role="button"][aria-label*="View details"]').first();
        if (await firstCard.count() > 0) {
          await firstCard.click();

          // Wait for modal
          await page.waitForSelector('[role="dialog"]', {
            timeout: 3000,
            state: 'visible'
          }).catch(() => console.log('Modal did not open'));

          const modal = await page.locator('[role="dialog"]').first();
          if (await modal.count() > 0) {
            await page.waitForTimeout(1000); // Let modal content load

            await modal.screenshot({
              path: path.join(screenshotDir, `${viewport.name}-modal.png`),
            });

            console.log(`📋 ${viewport.name}: Modal screenshot captured`);
          }
        }
      }

      // Check responsive classes on key elements
      if (viewport.width >= 768) {
        const desktopNav = await page.locator('nav.hidden.md\\:flex').count();
        console.log(`🔍 ${viewport.name}: Desktop nav elements found: ${desktopNav}`);
      } else {
        const mobileNav = await page.locator('nav.md\\:hidden').count();
        console.log(`🔍 ${viewport.name}: Mobile nav elements found: ${mobileNav}`);
      }
    });
  }
});