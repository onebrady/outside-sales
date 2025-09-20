# Repository Guidelines

## Project Structure & Module Organization
Source routes live in `src/app`; the Outside Sales portal currently renders from `src/app/page.tsx` (surfaced at `/outside-sales` thanks to `basePath`) with supporting UI/modules living under feature folders in `src/app` or shared in `src/lib` and `src/components`. The shared shadcn-style primitives live in `src/components/ui`, and persistent chrome such as the header nav is colocated with the page until it graduates into a layout component. DevLink-generated Webflow widgets remain in `src/devlink`—treat them as generated code and only edit via Webflow exports. Static assets stay in `public`, and config (TypeScript, ESLint, Tailwind, Wrangler) lives in the root. SmartSuite helpers reside in `src/lib/smartsuite.ts`, and the in-stock inventory API is exposed at `src/app/api/inventory/in-stock/route.ts`.

## Build, Test, and Development Commands
Use `npm run dev` for the Next.js dev server and `npm run build` + `npm run start` to validate a production bundle. `npm run lint` enforces ESLint rules, `npm run preview` runs the OpenNext Cloudflare build for end-to-end checks, `npm run deploy` triggers the Webflow Cloud publish pipeline, and `npm run cf-typegen` regenerates Cloudflare worker typings after env changes.

## Coding Style & Naming Conventions
Write React components in TypeScript with PascalCase filenames (e.g., `InventoryGrid.tsx`), colocate feature-specific styles with CSS modules, and reserve inline styles for quick layout tweaks. Use the shadcn-inspired primitives in `src/components/ui` for consistent Radix/Tailwind styling, and expose shared helpers through `src/lib`.

## Testing Guidelines
Adopt Jest + React Testing Library for new code, storing component specs alongside the file (`Component.test.tsx`) or under `src/__tests__`. Mock HubSpot/SmartSuite HTTP calls with MSW so CI has deterministic fixtures. Aim to cover filtering, sorting, and record-detail flows for the sales portal. Document any manual verification (e.g., HubSpot sandbox runs) in the PR when automated coverage is not feasible.

## Commit & Pull Request Guidelines
Write commits in imperative mood with optional Conventional Commit prefixes (`feat:`, `fix:`). Each PR should summarize business context, outline testing (`npm run preview`, staged screenshots, HubSpot sandbox IDs), link related tickets, and flag any data migrations or new secrets. Request review from the owners of affected areas (app UI vs. integrations) and wait for lint/build/preview greenlights before merge.

## Auth, Cloudflare & Integrations
Wrap the root layout with `ClerkProvider` (ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set), let `middleware.ts` enforce auth on private routes while leaving `/outside-sales` available for the embedded Clerk sign-in, and use Clerk server helpers to keep HubSpot/SmartSuite calls session-aware. Define server-side connectors (e.g., `src/lib/hubspot.ts`, `src/lib/smartsuite.ts`) that accept typed filters and return normalized trailer records. Cache read-heavy inventory fetches with `fetch(..., { next: { revalidate: 300 } })` and invalidate after updates. Register external secrets through Webflow Cloud or Wrangler vars only.

SmartSuite access requires `SMARTSUITE_API_TOKEN`, `SMARTSUITE_WORKSPACE_ID`, and optional overrides (`SMARTSUITE_BASE_URL`, `SMARTSUITE_STATUS_IN_STOCK_VALUE`) to be populated in the deployment environment and mirrored in `cloudflare-env.d.ts`.
