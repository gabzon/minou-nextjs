# Track Spec: Homepage Setup & Theme Infrastructure

## Overview
This track focuses on establishing the core visual and structural foundation of the "Minou" web application. We will implement the "Sophisticated Playful" design system, focusing on theme persistence, responsive layout, and the primary homepage components (Hero and Collections).

## Objectives
-   Implement the "Sophisticated Playful" design system using Tailwind CSS v4.
-   Setup persistent Light/Dark mode with the specified palette.
-   Create a mobile-first, responsive main layout.
-   Build the Homepage Hero and Collections carousel sections.

## Design Requirements
-   **Vibe:** Sophisticated Playful.
-   **Typography:** Plus Jakarta Sans.
-   **Colors:**
    -   *Light:* Cream/Soft White (`#FAFAF5`).
    -   *Dark:* Deep Charcoal (`#221015`).
    -   *Accents:* Pastel Mint, Blush, and Butter.
-   **Imagery:** 9:16 Portrait Ratio for the Hero banner and Collection thumbnails.
-   **Components:** Large rounded corners (`rounded-xl` to `rounded-3xl`).

## Technical Requirements
-   Next.js 16 App Router.
-   Tailwind CSS v4.
-   Persistent theme storage (e.g., `next-themes` or local storage with hydration safety).
-   High test coverage for UI logic and theme switching.
