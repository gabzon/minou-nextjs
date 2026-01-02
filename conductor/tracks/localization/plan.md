# Track Plan: Localization (i18n)

## Phase 1: Infrastructure & State
- [ ] Task: Create `src/lib/i18n.ts` with `LanguageContext`, `LanguageProvider`, and `useLanguage` hook.
- [ ] Task: Implement `getLocalized(value, lang)` utility to safely handle both localized objects (`{en, hr}`) and legacy strings.
- [ ] Task: Update `src/app/layout.tsx` to wrap the application in `LanguageProvider`.
- [ ] Task: Update `Header` component to make the "HR/EN" toggle functional (persisting to localStorage/cookie).

## Phase 2: Content Adaptation (Components)
- [ ] Task: Update `ProductPage` to use `getLocalized` for Materials, Name, and Description.
- [ ] Task: Update `GenreGrid` (Homepage) to use `getLocalized` for genre names.
- [ ] Task: Update `CollectionsCarousel` to use `getLocalized` for collection names.
- [ ] Task: Update `ShopPage` filters to use `getLocalized`.
- [ ] Task: Localize hardcoded UI labels (e.g., "Add to Cart", "In Stock", "Dimensions") using a dictionary in `i18n.ts`.

## Phase 3: Informational Pages
- [ ] Task: Create `src/app/shipping/page.tsx` fetching and displaying localized text from `siteSettings`.
- [ ] Task: Create `src/app/returns/page.tsx` fetching and displaying localized text from `siteSettings`.
- [ ] Task: Create `src/app/faq/page.tsx` fetching and displaying localized text from `siteSettings`.
- [ ] Task: Conductor - User Manual Verification 'Localization'
