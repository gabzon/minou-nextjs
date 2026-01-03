# Deployment Fixes and Instructions

## Summary of Changes
I fixed a configuration error in `wrangler.json` where the `ASSETS` binding name conflicted with Cloudflare Pages reserved keywords. This was likely the cause of the "multiple things" error you were seeing during build/deployment.

The local build `npm run build:cf` now passes successfully!

## Environment Variables
For your application to work correctly on Cloudflare Pages, you need to ensure Environment Variables are set up in the **Cloudflare Dashboard**. 

**Standard `.env` files are NOT automatically uploaded to Cloudflare Pages.**

### 1. Required Variables
You need to add the following variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

(You can find these values in your `.env.local` file)

### 2. How to Add in Cloudflare
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Navigate to **Pages** -> **Your Project** -> **Settings** -> **Environment Variables**.
3. Add the variables listed above for both **Production** and **Preview** environments.

## How to Deploy

### Option A: Using Git Integration (Recommended)
If your project is connected to GitHub/GitLab:
1. Ensure the Changes I made to `wrangler.json` are committed and pushed.
2. Cloudflare should automatically detect the commit and rebuild.
3. If it fails, check the "Build" logs in Cloudflare Dashboard.

### Option B: Using Command Line (Manual)
If you want to deploy from your machine:
1. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```
2. Deploy the application:
   ```bash
   npm run deploy
   ```
