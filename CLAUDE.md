# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development Server**
```bash
npm run dev      # Start Next.js development server on localhost:3000
```

**Build & Production**
```bash
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Deployment & Preview**
```bash
npm run preview  # Build and preview with OpenNext Cloudflare
npm run deploy   # Deploy to Webflow Cloud
npm run cf-typegen  # Regenerate Cloudflare worker typings after env changes
```

## Architecture Overview

This is a Next.js 15 application for an Outside Sales portal, deployed to Webflow Cloud/Cloudflare Workers. The application integrates with SmartSuite for trailer inventory management and uses Clerk for authentication.

### Key Integration Points

**SmartSuite Integration**
- Core client in `src/lib/smartsuite.ts` handles all API communication
- Environment variables required: `SMARTSUITE_API_TOKEN`, `SMARTSUITE_WORKSPACE_ID`
- Optional: `SMARTSUITE_BASE_URL`, `SMARTSUITE_STATUS_IN_STOCK_VALUE`
- Trailers table ID hardcoded: `67b5712e741daeee563c2092`
- In-stock inventory endpoint: `/api/inventory/in-stock` (GET with offset/limit params)

**Authentication (Clerk)**
- Middleware configuration in `middleware.ts`
- Public route: `/outside-sales` (embedded sign-in)
- Protected routes require authentication
- Environment variable: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

**Deployment Architecture**
- Uses OpenNext.js for Cloudflare Workers deployment
- Configuration in `open-next.config.ts` and `wrangler.json`
- Webflow Cloud framework configuration in `webflow.json`

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main Outside Sales portal page
│   ├── api/               # API routes
│   │   └── inventory/
│   │       └── in-stock/  # SmartSuite inventory endpoint
│   ├── _components/       # Page-specific components
│   ├── sign-in/          # Clerk sign-in pages
│   └── sign-up/          # Clerk sign-up pages
├── components/
│   └── ui/               # Shared shadcn/Radix UI components
├── lib/
│   └── smartsuite.ts     # SmartSuite API client
└── devlink/              # Webflow-generated components (DO NOT EDIT)
```

## Important Implementation Notes

1. **SmartSuite Records**: Use field slugs (not display labels) when working with the API. Empty fields are omitted from responses.

2. **API Safety**: Never expose SmartSuite credentials client-side. All API calls go through Next.js Route Handlers.

3. **Caching**: The in-stock inventory endpoint uses 60-second cache headers. Consider fetch cache options for read-heavy operations.

4. **Error Handling**: SmartSuite API errors should be caught and logged server-side, with sanitized messages for production.

5. **Testing**: Mock SmartSuite/HubSpot calls with MSW for deterministic tests. Document manual verification in PRs when automated testing isn't feasible.

6. **DevLink Components**: Files in `src/devlink/` are Webflow-generated. Never edit directly - only update via Webflow exports.

7. **Environment Variables**: Required secrets must be set through Webflow Cloud or Wrangler. Update `cloudflare-env.d.ts` when adding new env vars.