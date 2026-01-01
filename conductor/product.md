# Initial Concept
A high-end product showcase website built with Next.js and Sanity CMS, designed to highlight product quality through immersive storytelling and visual galleries. The project, "Minou", is a homemade jewelry brand featuring casual, playful pieces (polymer clay, UV resin). It requires a high-performance Product Catalog that serves as a digital showroom where users browse products and are redirected to a Google Form to place an order manually.

# Product Guide

## Target Audience
- **Potential Customers:** Individuals looking for high-quality, uniquely designed handmade jewelry (polymer clay, UV resin) who value detailed information and aesthetic presentation.
- **Brand Enthusiasts:** Loyal followers of the brand who seek deeper stories, craftsmanship details, and an immersive brand experience.

## Goals
- **Design & Quality Showcase:** Effectively communicate the "Sophisticated Playful" vibe and build quality of products through high-fidelity visuals (9:16 portrait ratio) and rich content.
- **Engaging Experience:** Provide a seamless, performant, and visually captivating mobile-first user journey.
- **Manual Ordering:** Facilitate orders via a seamless redirection to a pre-filled Google Form, as there is no traditional shopping cart.

## Brand Identity & Design
- **Vibe:** "Sophisticated Playful" - colorful jewelry in a clean UI to let products shine.
- **Color Palette:**
    -   *Light Mode:* Cream/Soft White background (`#FAFAF5` or similar) with pastel accents (Mint, Blush, Butter).
    -   *Dark Mode:* Deep Charcoal background (`#221015`) with desaturated pastel accents.
-   **Typography:** Modern sans-serif (e.g., "Plus Jakarta Sans") for a clean, accessible look.
-   **Imagery:** Strict 9:16 Portrait Ratio for all product imagery to resemble Instagram Stories.

## Core Features
- **Localization:** Dual language support (Croatian default, English secondary) managed via Sanity.
- **Catalog & Filtering:** Robust filtering by Type (Earrings, Necklaces, etc.), Collection (Christmas, Summer, etc.), and Material (Polymer clay, UV Resin).
- **Product Pages:**
    -   Immersive image galleries (carousel/grid).
    -   Rich text descriptions and technical specs.
    -   **"Order This Item" CTA:** Links to an external Google Form with URL parameters to pre-fill the product name/ID.
-   **Homepage:**
    -   Hero section with visual banner.
    -   Collections carousel.
    -   Materials grid (visual navigation).
    -   "New Arrivals" or "Highlights" grid.
-   **Global Elements:**
    -   Theme Toggle (Light/Dark).
    -   Newsletter signup (Kit/ConvertKit integration) in the footer.
    -   Global search bar.

## Tech Stack (Strict)
-   **Frontend:** Next.js 16 (App Router)
-   **CMS:** Sanity.io
-   **Styling:** Tailwind CSS v4
-   **Icons:** Lucide React (or Material Symbols per design specs)
-   **Hosting:** Vercel (implied by Next.js)
