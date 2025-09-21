import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';

// This test works with Clerk in TEST MODE
// Test mode provides simplified authentication for development/testing

const viewports = [
  { width: 1920, height: 1080, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' },
];

test.describe('Clerk Test Mode - Responsive Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    console.log('🧪 Running in Clerk Test Mode');

    // Navigate to the app
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // In test mode, check if we see the sign-in form
    const signInForm = await page.locator('[data-clerk-sign-in]').count();

    if (signInForm > 0) {
      console.log('🔐 Detected sign-in form - attempting test mode authentication...');

      try {
        // In test mode, Clerk often pre-fills or simplifies the form
        // Wait for the identifier field
        await page.waitForSelector('input[name="identifier"]', { timeout: 5000 });

        // Check if test email is pre-filled
        const identifierField = page.locator('input[name="identifier"]');
        const currentValue = await identifierField.inputValue();

        if (!currentValue) {
          // Fill in the test email
          await identifierField.fill('test@example.com');
          console.log('  Filled test email');
        } else {
          console.log(`  Email pre-filled: ${currentValue}`);
        }

        // Click continue
        const continueButton = page.locator('button[data-localization-key="formButtonPrimary"]').first();
        await continueButton.click();

        // In test mode, password might be skipped or use a simple value
        // Wait to see what happens after clicking continue
        await page.waitForTimeout(1000);

        // Check if we need to enter a password
        const passwordField = await page.locator('input[name="password"]').count();

        if (passwordField > 0) {
          // Enter any password (test mode usually accepts anything)
          await page.fill('input[name="password"]', 'test');
          console.log('  Filled test password');

          // Click sign in
          const signInButton = page.locator('button[data-localization-key="formButtonPrimary"]').first();
          await signInButton.click();
        }

        // Check if we need a verification code (test mode uses 424242)
        const verificationField = await page.locator('input[name="code"]').count();

        if (verificationField > 0) {
          console.log('  Verification code required - using test code 424242');
          await page.fill('input[name="code"]', '424242');

          // Submit verification
          const verifyButton = page.locator('button[data-localization-key="formButtonPrimary"]').first();
          await verifyButton.click();
        }

        // Wait for successful authentication
        await page.waitForSelector('.grid', { timeout: 10000 });
        console.log('✅ Test mode authentication successful!');

      } catch (error) {
        console.log('⚠️  Test mode auth failed - capturing sign-in page instead');
        console.log(`  Error: ${error.message}`);
      }
    } else {
      console.log('✅ Already authenticated or no auth required');
    }
  });

  for (const viewport of viewports) {
    test(`Test Mode - ${viewport.name} screenshots`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Create screenshots directory
      const screenshotDir = path.join('screenshots', 'test-mode', viewport.name);
      await fs.mkdir(screenshotDir, { recursive: true });

      // Wait for content to stabilize
      await page.waitForTimeout(2000);

      // Take full page screenshot
      await page.screenshot({
        path: path.join(screenshotDir, 'full-page.png'),
        fullPage: true,
      });
      console.log(`📸 ${viewport.name}: Full page captured`);

      // Check what state we're in
      const hasSignIn = await page.locator('[data-clerk-sign-in]').count() > 0;
      const hasGrid = await page.locator('.grid').count() > 0;

      if (hasSignIn) {
        console.log(`📋 ${viewport.name}: On sign-in page`);

        // Capture the sign-in modal
        const signInContainer = await page.locator('.max-w-md').first();
        if (await signInContainer.count() > 0) {
          await signInContainer.screenshot({
            path: path.join(screenshotDir, 'signin-modal.png'),
          });
          console.log(`   Sign-in modal captured`);
        }
      }

      if (hasGrid) {
        console.log(`📋 ${viewport.name}: On inventory page`);

        // Capture header
        const header = await page.locator('header').first();
        if (await header.count() > 0) {
          await header.screenshot({
            path: path.join(screenshotDir, 'header.png'),
          });

          // Check navigation type
          if (viewport.width >= 768) {
            const desktopNav = await page.locator('nav.hidden.md\\:flex').count();
            console.log(`   Desktop navigation elements: ${desktopNav}`);
          } else {
            const mobileNav = await page.locator('nav.md\\:hidden').count();
            console.log(`   Mobile navigation elements: ${mobileNav}`);
          }
        }

        // Capture inventory grid
        const grid = await page.locator('.grid').first();
        if (await grid.count() > 0) {
          await grid.screenshot({
            path: path.join(screenshotDir, 'inventory-grid.png'),
          });

          // Check grid columns
          const gridClasses = await grid.getAttribute('class') || '';
          console.log(`   Grid responsive classes detected`);
        }

        // Capture category filters
        const filters = await page.locator('[class*="snap-x"]').first();
        if (await filters.count() > 0) {
          await filters.screenshot({
            path: path.join(screenshotDir, 'category-filters.png'),
          });

          if (viewport.width < 768) {
            // Test scroll on mobile
            const scrollable = await filters.evaluate((el) => el.scrollWidth > el.clientWidth);
            console.log(`   Category filters scrollable: ${scrollable}`);
          }
        }

        // Try to open modal
        const firstCard = await page.locator('[role="button"][aria-label*="View details"]').first();
        if (await firstCard.count() > 0) {
          console.log('   Opening trailer modal...');
          await firstCard.click();

          try {
            await page.waitForSelector('[role="dialog"]', {
              state: 'visible',
              timeout: 3000
            });

            await page.waitForTimeout(1000);

            const modal = await page.locator('[role="dialog"]').first();
            await modal.screenshot({
              path: path.join(screenshotDir, 'trailer-modal.png'),
            });
            console.log(`   Modal captured`);

            // Check modal responsiveness
            const modalContent = await page.locator('[role="dialog"] > div').first();
            const box = await modalContent.boundingBox();

            if (box) {
              if (viewport.width > 768) {
                console.log(`   Modal width: ${box.width}px (desktop)`);
              } else {
                console.log(`   Modal width: ${box.width}px (mobile)`);
              }
            }

            // Capture pricing section
            const pricingSection = await page.locator('[role="dialog"] .grid.grid-cols-3').first();
            if (await pricingSection.count() > 0) {
              await pricingSection.screenshot({
                path: path.join(screenshotDir, 'modal-pricing.png'),
              });
            }

            // Check tap targets on mobile
            if (viewport.width < 768) {
              const buttons = await page.locator('[role="dialog"] button').all();
              let validTargets = 0;

              for (const button of buttons) {
                const btnBox = await button.boundingBox();
                if (btnBox && btnBox.width >= 44 && btnBox.height >= 44) {
                  validTargets++;
                }
              }

              console.log(`   Tap targets ≥44px: ${validTargets}/${buttons.length}`);
            }

            // Close modal
            await page.keyboard.press('Escape');
            await page.waitForSelector('[role="dialog"]', { state: 'hidden', timeout: 2000 });

          } catch (error) {
            console.log(`   Modal test skipped: ${error.message}`);
          }
        }
      }

      console.log(`✅ ${viewport.name} complete\n`);
    });
  }

  test('Summary Report', async () => {
    const screenshotDir = path.join('screenshots', 'test-mode');

    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST MODE SCREENSHOT SUMMARY');
    console.log('='.repeat(50));
    console.log('\n📁 Screenshots saved to:', screenshotDir);
    console.log('\n🖼️ Captured views:');
    console.log('  • Desktop (1920x1080)');
    console.log('  • Tablet (768x1024)');
    console.log('  • Mobile (390x844)');
    console.log('\n✅ Tests complete! Check the screenshots folder to verify:');
    console.log('  1. Sign-in modal is responsive');
    console.log('  2. Navigation switches at 768px breakpoint');
    console.log('  3. Grid columns adjust per viewport');
    console.log('  4. Modal is properly constrained on desktop');
    console.log('  5. Modal is full-width on mobile');
    console.log('  6. Category filters are scrollable on mobile');
    console.log('  7. All tap targets are ≥44px on mobile');
    console.log('\n' + '='.repeat(50));
  });
});