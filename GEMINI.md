# Project Context: Minou Next.js

## Project Overview
This is a Next.js 16 web application, likely a product showcase or e-commerce site, integrated with Sanity.io for content management. It utilizes modern frontend tooling including TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Tech Stack
-   **Framework:** Next.js 16.1.1 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS v4
-   **UI Library:** shadcn/ui (Radix UI primitives + Tailwind)
-   **Icons:** Lucide React
-   **CMS:** Sanity.io (`next-sanity`) + Sanity MCP Server (AI context)
-   **Image/Media:** `yet-another-react-lightbox`

## Key Architecture
-   **App Router:** The project uses the Next.js App Router (`src/app`).
-   **Dynamic Routes:** Product pages are handled dynamically via `src/app/product/[slug]/`.
-   **CMS Integration:**
    -   Client configuration: `src/sanity/client.ts`
    -   Sanity components: `src/app/product/[slug]/components/PortableText.tsx` (Rich text rendering).
-   **Component Library:** Reusable UI components are located in `src/components/ui/` (e.g., button, badge, separator).
-   **Utilities:** Shared helper functions in `src/lib/utils.ts` (likely `cn` helper for class merging).

## Building and Running

### Prerequisites
-   Node.js (LTS recommended)
-   npm (or yarn/pnpm/bun)

### Key Commands
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000` |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality issues |

## Development Conventions

### File Structure
-   `src/app/`: Page routes and layouts.
-   `src/components/ui/`: Generic, reusable UI components (shadcn/ui).
-   `src/lib/`: Utility functions.
-   `src/sanity/`: Sanity CMS configuration and utilities.

### Styling
-   Use Tailwind CSS utility classes for styling.
-   Use the `cn()` utility (from `@/lib/utils`) when conditionally merging classes.
-   Global styles are defined in `src/app/globals.css`.

### Components
-   Follow the shadcn/ui pattern: encapsulated, accessible components built on Radix UI.
-   Icons should be imported from `lucide-react`.

### Data Fetching
-   Data is fetched from Sanity.io. Ensure environment variables (if any) are set up for the Sanity project ID and dataset, although `src/sanity/client.ts` currently has them hardcoded (Review this for production security).
-   **MCP Integration:** This project is configured with the Sanity MCP server (`npx sanity@latest mcp configure`). This allows AI agents to directly query the CMS content and schema during development.

### Aliases
The project is configured with the following path aliases (mapped in `tsconfig.json` and `components.json`):
-   `@/components` -> `src/components`
-   `@/lib` -> `src/lib`
-   `@/ui` -> `src/components/ui`
