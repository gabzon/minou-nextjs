This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your Sanity CMS credentials:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Deploy on Cloudflare Pages

This project is configured for deployment on Cloudflare Pages using `@opennextjs/cloudflare`.

### Prerequisites
- Cloudflare account with Pages enabled
- Wrangler CLI installed globally
- Environment variables configured in Cloudflare dashboard

### Quick Deploy

1. Install dependencies:
```bash
npm install
```

2. Build for Cloudflare:
```bash
npm run build:cf
```

3. Deploy to Cloudflare Pages:
```bash
npm run deploy
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).
