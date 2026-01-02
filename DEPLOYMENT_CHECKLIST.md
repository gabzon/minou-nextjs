# Pre-Deployment Checklist

Use this checklist before deploying to Cloudflare Pages to ensure everything is configured correctly.

## Environment Configuration

- [ ] `.env.local` exists with current Sanity credentials
- [ ] `.env.example` is up to date with all required variables
- [ ] Environment variables added to Cloudflare Pages dashboard:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `NEXT_PUBLIC_SANITY_API_VERSION`

## Code Changes

- [ ] All new features are committed to Git
- [ ] `.gitignore` verified (no `.env` files committed)
- [ ] Sanity client configured to use environment variables
- [ ] All pages use `runtime = 'edge'` where appropriate
- [ ] No hardcoded credentials in source code

## Build Verification

- [ ] `npm run build:cf` completes successfully
- [ ] No TypeScript errors
- [ ] No build warnings (or warnings are acceptable)
- [ ] `.open-next` directory created successfully
- [ ] Environment validation passes

## Local Testing

- [ ] `npm run preview` works locally
- [ ] Homepage loads correctly
- [ ] Navigation menu functions
- [ ] Product pages fetch data from Sanity
- [ ] Images load properly
- [ ] No JavaScript errors in console
- [ ] Theme toggle (light/dark) works

## Static Pages

- [ ] About page loads
- [ ] FAQ page loads with content
- [ ] Shipping page loads
- [ ] Returns page loads
- [ ] Custom orders page loads

## Performance

- [ ] Lighthouse score checked (if possible in preview mode)
- [ ] Images are optimized
- [ ] No large bundle sizes
- [ ] Fast initial load time

## Documentation

- [ ] `README.md` updated with Cloudflare instructions
- [ ] `DEPLOYMENT.md` is comprehensive and up-to-date
- [ ] `conductor/tracks/deployment/plan.md` reflects current state
- [ ] Any breaking changes documented

## Sanity CMS Verification

- [ ] Sanity project ID is correct
- [ ] Dataset name is correct
- [ ] API version is valid (format: YYYY-MM-DD)
- [ ] At least one product exists in Sanity
- [ ] Site settings are configured (FAQ, cover image, etc.)
- [ ] Images are properly uploaded to Sanity

## Cloudflare Configuration

- [ ] `wrangler.json` configuration is correct
- [ ] Build output directory is set to `.open-next`
- [ ] Compatibility flags are appropriate (`nodejs_compat`)
- [ ] Project name is set

## Deployment Preparation

- [ ] Git repository is clean (working tree)
- [ ] All changes are committed and pushed
- [ ] Branch is ready for production (usually `main` or `master`)
- [ ] Review completed by team member (if applicable)

## Post-Deployment Plan

- [ ] Monitoring set up (if available)
- [ ] Error tracking configured (if applicable)
- [ ] Analytics ready (if using)
- [ ] URL structure verified
- [ ] Custom domain configured (if applicable)

---

## Quick Deploy Commands

```bash
# Verify build
npm run build:cf

# Test locally
npm run preview

# Deploy to Cloudflare
npm run deploy
```

---

## Notes

- Check items as you complete them
- Complete all mandatory items before deployment
- Optional items can be skipped depending on your needs
- Document any issues encountered during testing

**Last Updated**: January 2026
