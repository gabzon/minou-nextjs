# Minou Jewelry - Project Specification

## Project Overview

**Minou** is a headless e-commerce catalog for a homemade jewelry brand featuring casual, playful pieces made from polymer clay and UV resin. The website serves as a digital showroom where users browse products and are redirected to a Google Form to place orders manually.

**Brand Vibe:** "Sophisticated Playful" - colorful products with a clean UI that lets products shine.

**Key Features:**
- Product catalog (no full checkout)
- Dual language support (Croatian default, English secondary)
- Light/Dark theme toggle
- Robust filtering system
- Image galleries with 9:16 portrait ratio
- Newsletter integration via Kit (ConvertKit)

---

## Tech Stack

### Frontend Framework
- **Next.js 16 (App Router)** - Leveraging React features, server components, and optimized routing

### Language
- **TypeScript** - Type safety and better developer experience across the codebase
  - Following Google TypeScript Style Guide
  - No `var`, no default exports, strict type checking

### Content Management System
- **Sanity.io** - Headless CMS for flexible, structured content
  - Integration: `next-sanity`
  - MCP Server configured for local AI context
  - Field-level or document-level translation for HR/EN support
  - Project ID: `5nz4uhz2`
  - Dataset: `production`

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS with modern compiler
- **shadcn/ui** - Accessible UI primitives (Radix UI + Tailwind)
- **next-themes** - Persistent theme switching (Light/Dark mode)
- **Lucide React** - Icon library
- **Typography:** Plus Jakarta Sans font

### Testing
- **Vitest** - Unit test framework
- **React Testing Library** - React component testing

### Media & Interaction
- **yet-another-react-lightbox** - High-fidelity product image galleries
- **Sanity Image URL** - Optimized image delivery and transformations

### External Integrations
- **Google Forms** - Manual ordering system via URL parameters
- **Kit (ConvertKit)** - Newsletter integration

### Hosting & Deployment
- **Cloudflare Pages** - Primary hosting platform
- **@opennextjs/cloudflare** - Cloudflare adapter for Next.js

---

## Project Structure

```
minou-nextjs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [slug]/            # Dynamic product pages
│   │   ├── shop/              # Product listing page
│   │   ├── about/             # About page
│   │   ├── faq/               # FAQ page
│   │   ├── returns/           # Returns page
│   │   ├── shipping/          # Shipping page
│   │   ├── custom-orders/     # Custom orders page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── home/              # Homepage components
│   │   ├── layout/            # Layout components (header, footer)
│   │   ├── product/           # Product components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── i18n.tsx           # Internationalization
│   │   ├── utils/             # Utilities (i18n helpers)
│   │   └── env.ts             # Environment variables
│   └── sanity/
│       ├── client.ts          # Sanity client configuration
│       └── env.ts             # Sanity environment variables
├── public/                    # Static assets
├── scripts/                   # Build and utility scripts
└── openspec/                  # Project specifications (this file)
```

---

## Code Conventions

### TypeScript (Google Style Guide)
- **Variables:** Use `const` by default, `let` when needed. Never `var`
- **Modules:** ES6 modules (`import`/`export`). No `namespace`
- **Exports:** Named exports (`export {MyClass}`). No default exports
- **Classes:** 
  - Use `private` modifier (not `#private` fields)
  - Mark immutable properties with `readonly`
  - Never use `public` modifier (it's the default)
- **Functions:** Prefer function declarations, arrow functions for callbacks
- **Strings:** Single quotes (`'`), template literals for interpolation
- **Equality:** Always `===` and `!==`
- **Type Assertions:** Avoid `as` and `!`. Provide clear justification if needed
- **Arrays:** `T[]` for simple types, `Array<T>` for complex unions
- **No `{}` type:** Use `unknown`, `Record<string, unknown>`, or `object`

### General Principles
- **Readability:** Code should be easy to read. Avoid overly clever constructs
- **Consistency:** Follow existing patterns in the codebase
- **Simplicity:** Prefer simple solutions. Break down complex problems
- **Maintainability:** Write code that's easy to modify. Minimize coupling
- **Documentation:** Document *why*, not *what*. Keep docs updated
- **No comments:** Do not add comments unless explicitly asked

### Naming Conventions
- **UpperCamelCase:** Classes, interfaces, types, enums, decorators
- **lowerCamelCase:** Variables, parameters, functions, methods, properties
- **CONSTANT_CASE:** Global constants, enum values
- **No `_` prefix/suffix:** Don't use underscores for private properties

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build Next.js application |
| `npm run build:cf` | Build for Cloudflare Pages (with adapter) |
| `npm run preview` | Preview Cloudflare build locally |
| `npm run deploy` | Deploy to Cloudflare Pages |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |

---

## Environment Variables

### Required
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=5nz4uhz2
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Setup
1. Copy `.env.example` to `.env.local`
2. Add your Sanity credentials
3. For Cloudflare Pages, add these to Environment Variables in the dashboard

---

## Design & Theming

### Color Palette
- **Light Mode:** Cream/Soft white background with pastel accents (Mint, Blush, Butter)
- **Dark Mode:** Deep charcoal background with desaturated pastel accents
- **Theme Toggle:** Persistent switch for light/dark mode

### Image Requirements
- **Aspect Ratio:** 9:16 Portrait (vertical, like Instagram Stories)
- **Format:** All product imagery must follow this ratio
- **UI:** Cards and containers designed for tall format without cropping

### Typography
- **Font Family:** Plus Jakarta Sans
- **Style:** Sophisticated, modern look

---

## Site Architecture

### Global Elements
- **Navigation:** Home, Shop (Dropdown), About, How to Order, Language Toggle (HR/EN), Theme Toggle
- **Footer:** Newsletter signup, Social Links (Instagram), Copyright

### Pages
1. **Homepage**
   - Hero Section with headline
   - Collections Carousel
   - Materials Grid
   - New Arrivals/Highlights
   - About Snippet

2. **Shop / Product Listing Page (PLP)**
   - Filter by Type (Earrings, Necklaces, Rings, Bracelets)
   - Filter by Collection (Christmas, Winter, Summer, etc.)
   - Filter by Material (Polymer clay, UV resin)
   - Card Design: Photo, Name, Price, "Details" button

3. **Product Detail Page (PDP)**
   - Image Gallery (Carousel/Grid)
   - Product Title, Price, Description (multilingual)
   - Material & Care info
   - CTA: "Order This Item" (links to Google Form with pre-filled parameters)

4. **Informational Pages**
   - About Us
   - How to Order / Shipping
   - FAQ (from Sanity)
   - Returns
   - Custom Orders

---

## Key Functional Requirements

### Ordering Logic
- "Order" button links to external Google Form
- URL parameters pass Product Name/ID to pre-fill form
- Example: `googleform.com/viewform?entry.12345=RedEarrings`

### Localization
- Dual language: Croatian (default) / English
- Sanity schemas support field-level or document-level translation
- Language toggle in navigation

### Newsletter Integration
- Kit (ConvertKit) integration
- Simple email input in footer
- Submit to Kit API

### Search
- Global search bar for products by name or tag

---

## Deployment

### Platform
- **Cloudflare Pages** with @opennextjs/cloudflare adapter

### Build Process
1. Run `npm run build:cf` to build for Cloudflare
2. Output generated in `.open-next/assets`
3. Deploy with `npm run deploy` or Git integration

### Environment Variables in Cloudflare
Add to Cloudflare Pages → Settings → Environment Variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

---

## Testing

### Framework
- **Vitest** for unit tests
- **React Testing Library** for component tests

### Test Files
- Located alongside component files (`.test.tsx` or `.test.ts`)
- Example: `src/components/home/hero.test.tsx`

### Running Tests
```bash
npm run test
```

---

## References

- Design mockups: `setup/Stitch Minou Homepage/`, `setup/Stitch Minou Catalog/`, `setup/Stitch Minou Product detail/`
- Code style guides: `conductor/code_styleguides/`
- Tech stack: `conductor/tech-stack.md`
- Deployment: `DEPLOYMENT.md`

---

## Notes

- Design files are mobile-first but must support desktop and tablet
- Follow existing component patterns when adding new features
- Always run `npm run lint` and `npm run test` after changes
- No shopping cart - all orders go through Google Form
- Product images must be 9:16 portrait ratio
