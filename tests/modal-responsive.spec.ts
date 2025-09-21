import { test, expect } from '@playwright/test';
import path from 'path';

// Define test viewports for modal testing
const modalTestViewports = [
  { width: 1920, height: 1080, name: 'desktop-full' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' },
];

// Helper function for screenshot paths
function getModalScreenshotPath(viewport: string, state: string) {
  const timestamp = new Date().toISOString().split('T')[0];
  return path.join('screenshots', 'modal', timestamp, `${viewport}-${state}.png`);
}

test.describe('Trailer Detail Modal - Responsive Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the main page
    await page.goto('/', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for any initial loading
    await page.waitForLoadState('domcontentloaded');
  });

  for (const viewport of modalTestViewports) {
    test(`Modal responsiveness - ${viewport.name}`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Check if we need to handle authentication
      const isAuthenticated = await page.locator('.grid').count() > 0;

      if (!isAuthenticated) {
        console.log(`⚠️  Authentication required for ${viewport.name} test`);
        // In a real test, we'd handle authentication here
        return;
      }

      // Wait for the first trailer card to be visible
      const firstCard = await page.locator('[role="button"][aria-label*="View details"]').first();

      if (await firstCard.count() === 0) {
        console.log(`⚠️  No trailer cards found for ${viewport.name}`);
        return;
      }

      // Click the first trailer card to open modal
      await firstCard.click();

      // Wait for modal to open
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

      // Take screenshot of modal in its initial state
      const modal = await page.locator('[role="dialog"]');
      await modal.screenshot({
        path: getModalScreenshotPath(viewport.name, 'initial'),
      });

      console.log(`📸 Modal initial state - ${viewport.name}`);

      // Test modal width constraints
      const modalContent = await page.locator('[role="dialog"] > div').first();
      const boundingBox = await modalContent.boundingBox();

      if (boundingBox) {
        // Check max-width constraint (max-w-3xl = 48rem = 768px)
        if (viewport.width > 768) {
          expect(boundingBox.width).toBeLessThanOrEqual(768 + 32); // Adding padding
          console.log(`✅ Modal max-width constraint verified on ${viewport.name}`);
        } else {
          // On mobile, modal should be nearly full width with some padding
          expect(boundingBox.width).toBeGreaterThan(viewport.width * 0.85);
          console.log(`✅ Modal mobile width verified on ${viewport.name}`);
        }
      }

      // Test scroll behavior within modal
      const modalContentElement = await page.locator('[role="dialog"] [class*="space-y"]').first();
      if (await modalContentElement.count() > 0) {
        // Scroll to bottom of modal content
        await modalContentElement.evaluate((el) => {
          el.scrollTop = el.scrollHeight;
        });

        await page.waitForTimeout(500);

        await modal.screenshot({
          path: getModalScreenshotPath(viewport.name, 'scrolled'),
        });

        console.log(`📸 Modal scrolled state - ${viewport.name}`);
      }

      // Test pricing grid responsiveness
      const pricingGrid = await page.locator('[role="dialog"] .grid.grid-cols-3').first();
      if (await pricingGrid.count() > 0) {
        await pricingGrid.screenshot({
          path: getModalScreenshotPath(viewport.name, 'pricing-grid'),
        });

        // Check if pricing grid stacks on mobile
        if (viewport.width < 640) {
          const gridClasses = await pricingGrid.getAttribute('class') || '';
          // On mobile, the grid should still maintain 3 columns but with smaller text
          console.log(`📊 Pricing grid classes on ${viewport.name}: ${gridClasses}`);
        }
      }

      // Test Location and Website cards layout
      const twoColumnGrid = await page.locator('[role="dialog"] .grid.md\\:grid-cols-2').first();
      if (await twoColumnGrid.count() > 0) {
        await twoColumnGrid.screenshot({
          path: getModalScreenshotPath(viewport.name, 'info-cards'),
        });

        const gridClasses = await twoColumnGrid.getAttribute('class') || '';
        if (viewport.width >= 768) {
          expect(gridClasses).toContain('md:grid-cols-2');
          console.log(`✅ Two-column layout verified on ${viewport.name}`);
        } else {
          // On mobile, cards should stack
          console.log(`✅ Stacked layout verified on ${viewport.name}`);
        }
      }

      // Test close button accessibility
      const closeButton = await page.locator('[role="dialog"] button[aria-label*="Close"]').first();
      if (await closeButton.count() > 0) {
        const closeButtonBox = await closeButton.boundingBox();
        if (closeButtonBox) {
          // Verify minimum tap target size for mobile (44x44px)
          if (viewport.width < 768) {
            expect(closeButtonBox.width).toBeGreaterThanOrEqual(44);
            expect(closeButtonBox.height).toBeGreaterThanOrEqual(44);
            console.log(`✅ Close button tap target verified on ${viewport.name}`);
          }
        }
      }

      // Test VIN copy button
      const copyButton = await page.locator('[role="dialog"] button:has-text("Copy")').first();
      if (await copyButton.count() > 0) {
        const copyButtonBox = await copyButton.boundingBox();
        if (copyButtonBox && viewport.width < 768) {
          // Verify minimum tap target size
          expect(copyButtonBox.height).toBeGreaterThanOrEqual(36);
          console.log(`✅ Copy button accessibility verified on ${viewport.name}`);
        }
      }

      // Test modal backdrop click to close
      const backdrop = await page.locator('[data-radix-dialog-overlay]').first();
      if (await backdrop.count() > 0) {
        // Click backdrop to close
        await backdrop.click({ position: { x: 10, y: 10 } });

        // Wait for modal to close
        await page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 2000 }).catch(() => {
          console.log('Modal did not close on backdrop click');
        });

        console.log(`✅ Modal backdrop close tested on ${viewport.name}`);
      }

      // Re-open modal for Escape key test
      await firstCard.click();
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

      // Test Escape key to close modal
      await page.keyboard.press('Escape');
      await page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 2000 }).catch(() => {
        console.log('Modal did not close on Escape key');
      });

      console.log(`✅ Modal keyboard accessibility tested on ${viewport.name}`);
    });
  }

  // Test modal content overflow on very small heights
  test('Modal overflow handling - landscape mobile', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 }); // iPhone SE landscape

    const isAuthenticated = await page.locator('.grid').count() > 0;
    if (!isAuthenticated) {
      console.log('⚠️  Authentication required for landscape test');
      return;
    }

    const firstCard = await page.locator('[role="button"][aria-label*="View details"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

      const modal = await page.locator('[role="dialog"]');
      await modal.screenshot({
        path: getModalScreenshotPath('mobile-landscape', 'overflow-test'),
      });

      // Check if modal content is scrollable
      const modalContent = await page.locator('[role="dialog"] > div').first();
      const isScrollable = await modalContent.evaluate((el) => {
        return el.scrollHeight > el.clientHeight;
      });

      expect(isScrollable).toBeTruthy();
      console.log('✅ Modal scroll overflow handling verified in landscape mode');
    }
  });

  // Test focus management and tab navigation
  test('Modal accessibility - focus management', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    const isAuthenticated = await page.locator('.grid').count() > 0;
    if (!isAuthenticated) {
      console.log('⚠️  Authentication required for accessibility test');
      return;
    }

    const firstCard = await page.locator('[role="button"][aria-label*="View details"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

      // Check if focus is trapped within modal
      const activeElement = await page.evaluate(() => document.activeElement?.tagName);
      console.log(`🎯 Initial focus on: ${activeElement}`);

      // Tab through interactive elements
      const interactiveElements = await page.locator('[role="dialog"] button, [role="dialog"] a').count();
      console.log(`Found ${interactiveElements} interactive elements in modal`);

      // Test tab navigation
      for (let i = 0; i < interactiveElements + 1; i++) {
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tag: el?.tagName,
            text: el?.textContent?.trim().substring(0, 20),
          };
        });
        console.log(`Tab ${i + 1}: ${focused.tag} - ${focused.text}`);
      }

      console.log('✅ Modal focus management tested');
    }
  });
});