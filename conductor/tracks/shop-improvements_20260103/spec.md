# Track Specification: Shop Page Improvements

## Overview
Enhance the `/shop` catalog page to improve usability, navigation, and product discovery. This includes a reorganization of the filtering system, a mobile-optimized filter UI, and the introduction of a manual infinite scroll (Load More) to handle larger product sets.

## Functional Requirements

### 1. Updated Filtering Taxonomy & UI
- **Renaming:** Rename the current "Genre" filter to **"Type"** in the UI.
- **New Filters:**
    - **Categories:** Add a single-select dropdown filter for Categories (fetched from Sanity).
    - **Colors:** Replace the "Materials" filter with a **Color** filter.
- **Filter Order:** Reorder filters as follows:
    1. Type (Genre)
    2. Categories (Single-select dropdown)
    3. Collections
    4. Colors (Visual swatches)
- **Visual Swatches:** The Color filter must display visual color circles using the `hex` code from Sanity, with a tooltip or label for the color name.

### 2. Mobile Filter UI
- Implement a **Filter Drawer (Sheet)** for mobile viewports.
- A "Filters" button will trigger a full-height side/bottom sheet containing all filter options.
- The drawer should show the count of active filters.

### 3. Manual Infinite Scroll
- Implement a **"Load More"** button at the bottom of the product grid.
- Initially load a set number of products (e.g., 12 or 20).
- Clicking "Load More" fetches the next batch and appends them to the current grid without a full page reload.
- The button should be hidden if all products matching the criteria are already displayed.

### 4. Localization
- Ensure all new filter labels ("Type", "Categories", "Colors", "Load More", "All") are added to the i18n dictionary.
- Fetch and display localized names for Categories from Sanity.
- Translate the page subtitle (currently English only).
- Translate the "All" option in all filter components.

## Acceptance Criteria
- [ ] Filters are displayed in the specified order: Type, Categories, Collections, Colors.
- [ ] Color filter correctly renders visual swatches using hex codes.
- [ ] "Categories" functions as a single-select dropdown.
- [ ] On mobile, filters are hidden behind a button that opens a `Sheet` component.
- [ ] "Load More" button successfully fetches and appends products.
- [ ] All UI strings are localized (HR/EN).
- [ ] Filter state is correctly reflected in the URL parameters.
- [ ] Page subtitle is localized.
- [ ] "All" filter options are localized.

## Out of Scope
- Server-side pagination (keeping it client-side/Sanity-query based for now).
- Automatic infinite scroll (scroll-triggered).
- Search bar improvements (unless directly related to filter state).
