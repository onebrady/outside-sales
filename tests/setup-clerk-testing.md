# Setting Up Clerk Test Credentials

## Option 1: Using Clerk's Test Mode (Recommended)

### Step 1: Enable Test Mode in Clerk Dashboard
1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **Settings** → **API Keys**
4. Toggle "Test mode" ON
5. Copy the test API keys

### Step 2: Create Test Users
1. In Clerk Dashboard, go to **Users** section
2. Click **Create user**
3. Create a test user with:
   - Email: `test@example.com` (or your preferred test email)
   - Password: `TestPassword123!`
4. Verify the email if required

### Step 3: Set Environment Variables
Create or update `.env.test.local` file:

```env
# Test environment Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_test_publishable_key
CLERK_SECRET_KEY=your_test_secret_key

# Test credentials for Playwright
CLERK_TEST_EMAIL=test@example.com
CLERK_TEST_PASSWORD=TestPassword123!
```

## Option 2: Using Development Instance with Test User

### Step 1: Create a Dedicated Test User
In your development Clerk instance:
1. Go to Clerk Dashboard → Users
2. Create a new user specifically for testing
3. Use a memorable email like `playwright@test.com`
4. Set a strong but consistent password

### Step 2: Store Test Credentials Securely
Add to `.env.local` (make sure this is in .gitignore):

```env
CLERK_TEST_EMAIL=playwright@test.com
CLERK_TEST_PASSWORD=YourTestPassword123!
```

## Option 3: Bypass Authentication for Testing (Development Only)

For rapid development testing without real authentication, you can use Clerk's unsafe metadata to bypass auth.

### Implementation Steps:

1. **Update Clerk Middleware** for test mode
2. **Create mock authentication** helper
3. **Use Playwright with test credentials**

---

## Quick Setup Script

Run this to set up test environment variables:

```bash
# Create test environment file
cat > .env.test.local << 'EOF'
# Clerk Test Credentials
CLERK_TEST_EMAIL=test@example.com
CLERK_TEST_PASSWORD=TestPassword123!

# Copy your Clerk keys here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
EOF

echo "✅ Created .env.test.local - Add your Clerk keys"
```

## Security Notes

⚠️ **Important Security Considerations:**
- Never commit test credentials to version control
- Add `.env.test.local` to `.gitignore`
- Use separate Clerk instances for production and testing
- Rotate test passwords regularly
- Consider using Clerk's JWT templates for testing

## Testing Without Real Authentication

If you need to test immediately without setting up Clerk credentials, you can:

1. Use the `CLERK_SKIP_AUTH` environment variable (if supported)
2. Mock the Clerk provider in tests
3. Use Playwright's request interception to bypass auth

## Next Steps

After setting up credentials:

1. Update `tests/auth-setup.ts` with your credentials
2. Run: `npm run test:screenshots`
3. Screenshots will capture authenticated views

---

## Troubleshooting

### Common Issues:

**"Sign-in page keeps appearing"**
- Check if test user email is verified
- Ensure test mode is enabled in Clerk
- Verify API keys match the environment

**"Authentication fails in tests"**
- Check if password meets Clerk's requirements
- Ensure no 2FA is enabled for test user
- Try clearing Clerk cookies

**"Can't find sign-in form fields"**
- Clerk's UI might have changed
- Use Playwright's codegen to find selectors: `npx playwright codegen`

---

For more information, see [Clerk's Testing Documentation](https://clerk.com/docs/testing/overview)