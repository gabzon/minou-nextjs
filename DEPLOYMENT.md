# Cloudflare Pages Deployment Guide

This guide covers deploying the Minou Jewelry Next.js application to Cloudflare Pages.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Building for Production](#building-for-production)
4. [Deployment Process](#deployment-process)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- **Cloudflare Account**: A free Cloudflare account with Pages enabled
- **Wrangler CLI**: Installed globally `npm install -g wrangler`
- **Sanity CMS Access**: Your Sanity project ID and configured dataset
- **Git Repository**: Your code pushed to a Git provider (GitHub, GitLab)

### Install Wrangler

```bash
npm install -g wrangler
```

Login to Cloudflare:

```bash
wrangler login
```

---

## Environment Setup

### Local Development

1. Create your local environment file:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your Sanity credentials:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=5nz4uhz2
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Cloudflare Pages Dashboard

Before deploying, configure environment variables in your Cloudflare Pages project:

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Navigate to Settings → Environment Variables
3. Add the following **Production** variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `5nz4uhz2` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | API version date |

**Note**: For Preview/Development environments, use `staging` or `development` dataset.

---

## Building for Production

This project uses `@opennextjs/cloudflare` adapter to build for Cloudflare Pages.

### Build Command

```bash
npm run build:cf
```

This will:

1. Build your Next.js application
2. Optimize for Cloudflare Workers runtime
3. Generate output in `.open-next` directory

### What Gets Built

The build process creates:
- `.open-next/assets` - Static assets for Cloudflare Pages
- `.open-next/worker.js` - Cloudflare Worker code
- Optimized images and fonts
- Server-side rendering bundles

---

## Deployment Process

### Option 1: Command Line Deployment

Deploy directly from your terminal:

```bash
npm run deploy
```

You'll be prompted for:
- **Project name**: Choose a name (e.g., `minou-jewelry`)
- **Production branch**: Usually `main` or `master`

The deployment will:
1. Build the project (if not already built)
2. Upload assets to Cloudflare Pages
3. Deploy the Worker
4. Provide a deployment URL

### Option 2: Git Integration

Connect your Git repository for automatic deployments:

1. Create new Pages project in Cloudflare Dashboard
2. Connect your GitHub/GitLab repository
3. Configure build settings:

```
Framework preset: Next.js
Build command: npm run build:cf
Build output directory: .open-next/assets
Node.js version: 20.x
```

4. Add environment variables (see [Environment Setup](#environment-setup))
5. Deploy!

### Preview Deployments

Every commit to non-production branches creates a preview deployment automatically when using Git integration.

---

## Post-Deployment Verification

After deployment, verify everything works correctly:

### ✅ Basic Functionality

- [ ] Homepage loads without errors
- [ ] Navigation menu works
- [ ] Theme toggle (light/dark mode) functions
- [ ] Responsive design works on mobile

### ✅ Sanity Data Fetching

- [ ] Homepage shows products from Sanity
- [ ] Product detail pages load data correctly
- [ ] Shop page filters work
- [ ] All images load from Sanity CDN

### ✅ Static Pages

- [ ] About page loads
- [ ] FAQ page loads with questions from Sanity
- [ ] Shipping & Returns pages load

### ✅ Browser Console

Open browser console and verify:
- [ ] No JavaScript errors
- [ ] No missing environment variable warnings
- [ ] No 404 errors for assets

### ✅ Performance

- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Lighthouse score > 90

---

## Troubleshooting

### Build Fails

**Error**: `Missing required environment variables`

**Solution**:
```bash
# Check your .env.local exists
cat .env.local

# Verify required variables are set
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
```

**Error**: `Module not found: @opennextjs/cloudflare`

**Solution**:
```bash
# Install dependencies
npm install
```

### Deployment Fails

**Error**: `Invalid worker configuration`

**Solution**:
- Verify `wrangler.json` exists and is valid
- Check that `.open-next` directory exists after build
- Ensure `wrangler.json` points to `.open-next/worker.js`

**Error**: Environment variables not working in production

**Solution**:
- Verify variables are set in Cloudflare Pages dashboard
- Variables must be prefixed with `NEXT_PUBLIC_` for client access
- Check spelling and case sensitivity

### Runtime Issues

**Error**: Product images not loading

**Solution**:
- Verify Sanity API access (check projectId and dataset)
- Check browser network tab for failed requests
- Ensure images have correct URLs in Sanity

**Error**: Blank page or infinite loading

**Solution**:
- Check browser console for JavaScript errors
- Verify `.open-next` build completed successfully
- Try clearing browser cache

### Sanity Connection Issues

**Error**: `Unable to resolve DNS for sanity.io`

**Solution**:
- Check network connectivity
- Verify API version is correct (format: YYYY-MM-DD)
- Confirm dataset exists in Sanity dashboard

---

## Advanced Configuration

### Custom Domain

To use a custom domain:

1. Go to Cloudflare Pages → Your Project → Custom Domains
2. Add your domain (e.g., `shop.minoujewelry.com`)
3. Update DNS records as instructed
4. Configure SSL/TLS settings

### Environment-Specific Configs

For multiple environments (staging, production):

**Cloudflare Pages Dashboard**:
- Add environment variables to each environment separately
- Use different Sanity datasets per environment
- Example: `staging` dataset for preview deployments

### Build Optimization

Adjust build settings in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
};
```

---

## CI/CD Integration

For automated deployments using GitHub Actions:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build:cf
      - uses: cloudflare/wrangler-action@v2
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: pages deploy .open-next/assets
```

---

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [OpenNext.js Cloudflare](https://opennextjs.org/cloudflare)

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local development server |
| `npm run build:cf` | Build for Cloudflare Pages |
| `npm run preview` | Preview Cloudflare build locally |
| `npm run deploy` | Deploy to Cloudflare Pages |
| `npm run test` | Run tests |
| `npm run lint` | Run linting |

---

**Last Updated**: January 2026  
**Maintainer**: Development Team
