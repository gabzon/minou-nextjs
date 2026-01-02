# Track Plan: Localization (i18n)

## Phase 1: Infrastructure & State
- [x] Task: Create `src/lib/i18n.ts` with `LanguageContext`, `LanguageProvider`, and `useLanguage` hook.
- [x] Task: Implement `getLocalized(value, lang)` utility to safely handle both localized objects (`{en, hr}`) and legacy strings.
- [x] Task: Update `src/app/layout.tsx` to wrap the application in `LanguageProvider`.
- [x] Task: Update `Header` component to make the "HR/EN" toggle functional (persisting to localStorage/cookie).

## Phase 2: Content Adaptation (Components)
- [x] Task: Update `ProductPage` to use `getLocalized` for Materials, Name, and Description.
- [x] Task: Update `GenreGrid` (Homepage) to use `getLocalized` for genre names.
- [x] Task: Update `CollectionsCarousel` to use `getLocalized` for collection names.
- [x] Task: Update `ShopPage` filters to use `getLocalized`.
- [x] Task: Localize hardcoded UI labels (e.g., "Add to Cart", "In Stock", "Dimensions") using a dictionary in `i18n.ts`.

## Phase 3: Informational Pages
- [x] Task: Create `src/app/shipping/page.tsx` fetching and displaying localized text from `siteSettings`.
- [x] Task: Create `src/app/returns/page.tsx` fetching and displaying localized text from `siteSettings`.
- [x] Task: Create `src/app/faq/page.tsx` fetching and displaying localized text from `siteSettings`.
- [x] Task: Conductor - User Manual Verification 'Localization'