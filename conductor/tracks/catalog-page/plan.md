# Track Plan: Catalog & Filtering

## Phase 1: Basic Shop Page Layout
- [ ] Task: Create `src/app/shop/page.tsx` with a basic server-side fetch of all products.
- [ ] Task: Implement the responsive product grid using the existing `ProductCard` logic (or shared component).
- [ ] Task: Add a page header with title and breadcrumbs.

## Phase 2: Filter Sidebar/UI
- [ ] Task: Create a Filter sidebar (desktop) and Drawer/Accordion (mobile).
- [ ] Task: Fetch available Genres, Collections, and Materials from Sanity to populate filters.
- [ ] Task: Implement "Active Filters" tags that can be cleared.

## Phase 3: Filtering Logic
- [ ] Task: Handle URL search parameters (`type`, `collection`, `material`) in the Sanity query.
- [ ] Task: Implement client-side navigation updates when filters are selected.
- [ ] Task: Add a "No products found" state with a clear-filters button.

## Phase 4: Refinement & Testing
- [ ] Task: Write tests for the Catalog page filtering logic.
- [ ] Task: Ensure 9:16 portrait ratio is maintained for product cards.
- [ ] Task: Implement price formatting (Euro) and consistent styling.
- [ ] Task: Conductor - User Manual Verification 'Catalog Page'
