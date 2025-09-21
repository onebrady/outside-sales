import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';

export interface ViewportConfig {
  width: number;
  height: number;
  label: string;
  deviceScaleFactor?: number;
  isMobile?: boolean;
  hasTouch?: boolean;
}

// Standard viewport configurations
export const VIEWPORTS = {
  // Desktop viewports
  desktop: {
    xl: { width: 1920, height: 1080, label: 'Desktop XL' },
    lg: { width: 1440, height: 900, label: 'Desktop Large' },
    md: { width: 1366, height: 768, label: 'Desktop Medium' },
    sm: { width: 1024, height: 768, label: 'Desktop Small' },
  },
  // Tablet viewports
  tablet: {
    landscape: { width: 1024, height: 768, label: 'Tablet Landscape' },
    portrait: { width: 768, height: 1024, label: 'Tablet Portrait' },
    air: { width: 820, height: 1180, label: 'iPad Air', deviceScaleFactor: 2 },
    mini: { width: 768, height: 1024, label: 'iPad Mini', deviceScaleFactor: 2 },
  },
  // Mobile viewports
  mobile: {
    'iphone-14-pro': {
      width: 393,
      height: 852,
      label: 'iPhone 14 Pro',
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
    'iphone-12': {
      width: 390,
      height: 844,
      label: 'iPhone 12',
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
    'iphone-se': {
      width: 375,
      height: 667,
      label: 'iPhone SE',
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    'pixel-7': {
      width: 412,
      height: 915,
      label: 'Pixel 7',
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
    },
    'galaxy-s21': {
      width: 384,
      height: 854,
      label: 'Galaxy S21',
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true,
    },
  },
};

// Breakpoint definitions matching Tailwind CSS
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Helper to generate consistent screenshot paths
export async function generateScreenshotPath(
  category: string,
  viewport: string,
  testName: string,
  suffix: string = ''
): Promise<string> {
  const timestamp = new Date().toISOString().split('T')[0];
  const cleanName = testName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const dir = path.join('screenshots', category, timestamp, viewport);

  // Ensure directory exists
  await fs.mkdir(dir, { recursive: true });

  return path.join(dir, `${cleanName}${suffix}.png`);
}

// Wait for all images to load on the page
export async function waitForImages(page: Page): Promise<void> {
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images)
        .filter(img => !img.complete)
        .map(img => new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve); // Resolve even on error to not block
          setTimeout(resolve, 5000); // Timeout after 5 seconds
        }))
    );
  });
}

// Check if an element is visible at current viewport
export async function isElementVisibleAtViewport(
  page: Page,
  selector: string
): Promise<boolean> {
  const element = await page.locator(selector).first();
  if (await element.count() === 0) return false;

  return await element.isVisible();
}

// Get current breakpoint based on viewport width
export function getCurrentBreakpoint(width: number): string {
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
}

// Verify responsive classes are applied correctly
export async function verifyResponsiveClasses(
  page: Page,
  selector: string,
  expectedClasses: { [breakpoint: string]: string[] }
): Promise<{ passed: boolean; details: string[] }> {
  const element = await page.locator(selector).first();
  if (await element.count() === 0) {
    return { passed: false, details: ['Element not found'] };
  }

  const classList = await element.getAttribute('class') || '';
  const viewport = await page.viewportSize();
  if (!viewport) {
    return { passed: false, details: ['No viewport size set'] };
  }

  const currentBreakpoint = getCurrentBreakpoint(viewport.width);
  const expected = expectedClasses[currentBreakpoint] || [];
  const details: string[] = [];
  let passed = true;

  for (const expectedClass of expected) {
    if (!classList.includes(expectedClass)) {
      passed = false;
      details.push(`Missing expected class: ${expectedClass}`);
    } else {
      details.push(`✓ Found class: ${expectedClass}`);
    }
  }

  return { passed, details };
}

// Test horizontal scroll on mobile devices
export async function testHorizontalScroll(
  page: Page,
  selector: string,
  scrollDistance: number = 200
): Promise<{ canScroll: boolean; scrollWidth: number; clientWidth: number }> {
  const element = await page.locator(selector).first();

  if (await element.count() === 0) {
    return { canScroll: false, scrollWidth: 0, clientWidth: 0 };
  }

  // Get scroll dimensions
  const dimensions = await element.evaluate((el) => ({
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
    scrollLeft: el.scrollLeft,
  }));

  const canScroll = dimensions.scrollWidth > dimensions.clientWidth;

  if (canScroll) {
    // Perform scroll
    await element.evaluate((el, distance) => {
      el.scrollLeft = distance;
    }, scrollDistance);

    // Wait for scroll animation
    await page.waitForTimeout(300);
  }

  return {
    canScroll,
    scrollWidth: dimensions.scrollWidth,
    clientWidth: dimensions.clientWidth,
  };
}

// Check minimum tap target size for mobile
export async function verifyTapTargetSize(
  page: Page,
  selector: string,
  minSize: number = 44
): Promise<{ valid: boolean; width: number; height: number }> {
  const element = await page.locator(selector).first();

  if (await element.count() === 0) {
    return { valid: false, width: 0, height: 0 };
  }

  const box = await element.boundingBox();
  if (!box) {
    return { valid: false, width: 0, height: 0 };
  }

  const valid = box.width >= minSize && box.height >= minSize;

  return {
    valid,
    width: box.width,
    height: box.height,
  };
}

// Test element visibility across breakpoints
export async function testVisibilityAcrossBreakpoints(
  page: Page,
  selector: string,
  expectedVisibility: { [breakpoint: string]: boolean }
): Promise<{ [breakpoint: string]: boolean }> {
  const results: { [breakpoint: string]: boolean } = {};

  for (const [breakpoint, width] of Object.entries(BREAKPOINTS)) {
    await page.setViewportSize({ width, height: 800 });
    await page.waitForTimeout(300); // Wait for resize

    const isVisible = await isElementVisibleAtViewport(page, selector);
    results[breakpoint] = isVisible;

    const expected = expectedVisibility[breakpoint];
    if (expected !== undefined && expected !== isVisible) {
      console.warn(
        `Visibility mismatch at ${breakpoint}: expected ${expected}, got ${isVisible}`
      );
    }
  }

  return results;
}

// Capture element screenshot with proper wait
export async function captureElementScreenshot(
  page: Page,
  selector: string,
  screenshotPath: string,
  options: { fullPage?: boolean; padding?: number } = {}
): Promise<boolean> {
  const element = await page.locator(selector).first();

  if (await element.count() === 0) {
    console.warn(`Element not found: ${selector}`);
    return false;
  }

  // Wait for element to be stable
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  // Take screenshot
  await element.screenshot({
    path: screenshotPath,
    ...options,
  });

  return true;
}

// Test focus trap within modal or dialog
export async function testFocusTrap(
  page: Page,
  containerSelector: string
): Promise<{ isTrapped: boolean; focusableElements: number }> {
  const container = await page.locator(containerSelector).first();

  if (await container.count() === 0) {
    return { isTrapped: false, focusableElements: 0 };
  }

  // Find all focusable elements
  const focusableSelectors = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableElements = await container.locator(focusableSelectors).count();

  // Test if Tab cycles within container
  let isTrapped = true;
  for (let i = 0; i < focusableElements + 2; i++) {
    await page.keyboard.press('Tab');

    const activeElement = await page.evaluate(() => {
      return document.activeElement?.closest('[role="dialog"]') !== null;
    });

    if (!activeElement && i < focusableElements) {
      isTrapped = false;
      break;
    }
  }

  return {
    isTrapped,
    focusableElements,
  };
}

// Utility to set up viewport with device emulation
export async function setDeviceViewport(
  page: Page,
  viewport: ViewportConfig
): Promise<void> {
  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });

  if (viewport.deviceScaleFactor || viewport.isMobile || viewport.hasTouch) {
    await page.evaluate((config) => {
      // This would typically be handled by Playwright's device emulation
      // but we can add custom viewport meta tags if needed
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.setAttribute('content',
          `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`
        );
      }
    }, viewport);
  }
}