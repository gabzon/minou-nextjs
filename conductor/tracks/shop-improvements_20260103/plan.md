# Track Plan: Shop Page Improvements

## Phase 1: Data Fetching & Taxonomy Updates
- [x] Task: Update Sanity queries to fetch `categories` and `colors`.
- [x] Task: Update the `Product` interface to include category and color data.
- [x] Task: Create helper functions to extract unique filter options (Types, Collections, Categories, Colors) from the fetched product set.
- [~] Task: Conductor - User Manual Verification 'Data Fetching & Taxonomy Updates' (Protocol in workflow.md)

## Phase 2: Filter Logic & State Management
- [ ] Task: Refactor `useFilter` hook (or equivalent) to support:
    - Renaming "Genre" to "Type".
    - Single-select logic for "Categories".
    - Color filtering logic.
    - Preserving existing Collection logic.
- [ ] Task: Update URL parameter handling to sync new filter states (`category`, `color`, `type`) with the browser URL.
- [ ] Task: Conductor - User Manual Verification 'Filter Logic & State Management' (Protocol in workflow.md)

## Phase 3: Desktop Filter UI Components
- [ ] Task: Update `FilterSidebar` component structure to match the new order: Type > Category > Collection > Color.
- [ ] Task: Implement `CategorySelect` component (Dropdown/Select).
- [ ] Task: Implement `ColorSwatches` component.
    - Render circles with background color from `hex` field.
    - Show tooltip on hover with color name.
    - Indicate selected state clearly (e.g., ring border).
- [ ] Task: Rename "Genre" section header to "Type".
- [ ] Task: Conductor - User Manual Verification 'Desktop Filter UI Components' (Protocol in workflow.md)

## Phase 4: Mobile Filter Drawer
- [ ] Task: Create a `MobileFilterTrigger` button component (visible only on mobile).
- [ ] Task: Implement a `FilterSheet` component using `shadcn/ui` Sheet.
- [ ] Task: Move the `FilterSidebar` content into the `FilterSheet` for mobile.
- [ ] Task: Ensure close button and "Apply" (or live update) functionality works within the drawer.
- [ ] Task: Conductor - User Manual Verification 'Mobile Filter Drawer' (Protocol in workflow.md)

## Phase 5: "Load More" Functionality
- [ ] Task: Update the main product query to support pagination (limit/offset or cursor-based).
- [ ] Task: Create `ProductGrid` state to hold the *accumulated* list of products.
- [ ] Task: Implement `LoadMoreButton` component.
    - Logic to check if `totalProducts > displayedProducts`.
    - Click handler to fetch next page and append to state.
- [ ] Task: Conductor - User Manual Verification '"Load More" Functionality' (Protocol in workflow.md)

## Phase 6: Final Polish & Localization
- [ ] Task: Add new UI strings (Category, Color, Load More) to `i18n` dictionary.
- [ ] Task: Ensure localized names for Categories are displayed correctly.
- [ ] Task: Translate the page subtitle (currently English only) using `siteSettings` or i18n dictionary.
- [ ] Task: Translate the "All" option in all filter components.
- [ ] Task: Verify responsive styles and spacing for the new filter components.
- [ ] Task: Conductor - User Manual Verification 'Final Polish & Localization' (Protocol in workflow.md)
