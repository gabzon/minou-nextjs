# Track Plan: Cloudflare Deployment

## Phase 1: Adapter Setup
- [x] Task: Install `@opennextjs/cloudflare` adapter and `wrangler`.
- [x] Task: Configure `runtime: 'edge'` for all dynamic routes.
- [x] Task: Update `package.json` with build and deployment scripts.

## Phase 2: Configuration
- [x] Task: Add `nodejs_compat` compatibility flag requirement.
- [x] Task: Configure build output directory to `.open-next/assets`.
- [x] Task: Setup `wrangler.json` configuration.

## Phase 3: Environment Variables (Added 2026-01-03)
- [x] Task: Create centralized environment validation in `src/lib/env.ts`
- [x] Task: Create Sanity-specific environment config in `src/sanity/env.ts`
- [x] Task: Update Sanity client to use environment variables
- [x] Task: Create `.env.example` template
- [x] Task: Create `.env.local` for local development

## Phase 4: Documentation (Added 2026-01-03)
- [x] Task: Update `README.md` with Cloudflare deployment instructions
- [x] Task: Create comprehensive `DEPLOYMENT.md` guide
- [x] Task: Add environment setup section to README

## Phase 5: Final Verification
- [x] Task: Local production build verification (`npm run build:cf`)
- [x] Task: Build-time environment validation in `next.config.ts`
- [x] Task: Pre-deployment checklist creation
- [ ] Task: Deploy to Cloudflare Pages and verify
