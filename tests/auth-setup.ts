import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// This setup file helps with authentication for testing
// In a real scenario, you would use actual test credentials
// For now, this provides a framework for handling authentication

setup.describe('Authentication Setup', () => {
  setup('authenticate', async ({ page, context }) => {
    // Navigate to the application
    await page.goto('/', {
      waitUntil: 'networkidle',
    });

    // Check if we're on the sign-in page
    const signInForm = await page.locator('[data-clerk-sign-in]').count();

    if (signInForm > 0) {
      console.log('⚠️  Authentication required. Please set up test credentials.');
      console.log('To use authenticated tests, you need to:');
      console.log('1. Set up test user credentials in your Clerk dashboard');
      console.log('2. Add CLERK_TEST_EMAIL and CLERK_TEST_PASSWORD to your .env.local');
      console.log('3. Update this file to use those credentials');

      // Example of how authentication would work with test credentials:
      /*
      const testEmail = process.env.CLERK_TEST_EMAIL;
      const testPassword = process.env.CLERK_TEST_PASSWORD;

      if (testEmail && testPassword) {
        // Fill in email
        await page.fill('input[name="identifier"]', testEmail);
        await page.click('button[data-localization-key="formButtonPrimary"]');

        // Wait for password field
        await page.waitForSelector('input[name="password"]', { timeout: 5000 });

        // Fill in password
        await page.fill('input[name="password"]', testPassword);
        await page.click('button[data-localization-key="formButtonPrimary"]');

        // Wait for successful authentication
        await page.waitForURL('/', { timeout: 10000 });

        // Save authentication state
        await context.storageState({ path: authFile });
        console.log('✅ Authentication successful, state saved');
      }
      */
    } else {
      console.log('✅ Already authenticated or auth not required');
    }
  });
});

// Helper function to bypass authentication for development testing
export async function bypassAuth(page: any): Promise<void> {
  // This is a placeholder for development testing
  // In production, you would use proper authentication
  await page.evaluate(() => {
    // Set any necessary localStorage or sessionStorage items
    // that would indicate an authenticated state
    console.log('Attempting to bypass authentication for testing...');
  });
}

// Helper to check if user is authenticated
export async function isAuthenticated(page: any): Promise<boolean> {
  // Check for presence of authenticated elements
  const hasGrid = await page.locator('.grid').count() > 0;
  const hasUserButton = await page.locator('[data-clerk-user-button]').count() > 0;
  const hasSignIn = await page.locator('[data-clerk-sign-in]').count() > 0;

  return (hasGrid || hasUserButton) && !hasSignIn;
}

// Mock authentication for testing without real credentials
export async function mockAuthentication(page: any): Promise<void> {
  // This would typically involve:
  // 1. Setting up mock API responses
  // 2. Setting authentication cookies/tokens
  // 3. Bypassing Clerk authentication in test mode

  // For now, we'll just log that mocking is needed
  console.log('📝 Mock authentication would be set up here');
  console.log('Consider using Clerk\'s test mode or mock responses');

  // Example of setting a mock cookie (adjust based on your auth setup)
  /*
  await page.context().addCookies([
    {
      name: '__session',
      value: 'mock-session-token',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    }
  ]);
  */
}

// Export authentication utilities
export const authHelpers = {
  authFile,
  bypassAuth,
  isAuthenticated,
  mockAuthentication,
};

export default authHelpers;