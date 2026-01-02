# Track Plan: Catalog & Filtering

## Phase 1: Basic Shop Page Layout
- [x] Task: Create `src/app/shop/page.tsx` with a basic server-side fetch of all products.
- [x] Task: Implement the responsive product grid using the existing `ProductCard` logic (or shared component).
- [x] Task: Add a page header with title and breadcrumbs.

## Phase 2: Filter Sidebar/UI
- [x] Task: Create a Filter sidebar (desktop) and Drawer/Accordion (mobile).
- [x] Task: Fetch available Genres, Collections, and Materials from Sanity to populate filters.
- [x] Task: Implement "Active Filters" tags that can be cleared.

## Phase 3: Filtering Logic
- [x] Task: Handle URL search parameters (`type`, `collection`, `material`) in the Sanity query.
- [x] Task: Implement client-side navigation updates when filters are selected.
- [x] Task: Add a "No products found" state with a clear-filters button.

## Phase 4: Refinement & Testing
- [x] Task: Write tests for the Catalog page filtering logic.
- [x] Task: Ensure 9:16 portrait ratio is maintained for product cards.
- [x] Task: Implement price formatting (Euro) and consistent styling.
- [x] Task: Conductor - User Manual Verification 'Catalog Page'