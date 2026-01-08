# Track Plan: Localization Fix & Default Language Update

## Phase 1: Default Language Configuration [checkpoint: f620f79]
- [x] Task: Write tests for the `LanguageProvider` default state logic.
- [x] Task: Update `src/lib/i18n.tsx` (or where the provider lives) to default to `hr` if no preference is found.
- [x] Task: Update `src/app/layout.tsx` or related components to ensure the `html lang` attribute and initial client state reflect the new default.
- [x] Task: Conductor - User Manual Verification 'Default Language Configuration' (Protocol in workflow.md)

## Phase 2: Page Title Localization [checkpoint: 3596e8d]
- [x] Task: Write tests for the page title localization in the sidebar-linked pages.
- [x] Task: Update `src/app/about/page.tsx` to use localized title from i18n dictionary.
- [x] Task: Update `src/app/shipping/page.tsx` to use localized title from i18n dictionary.
- [x] Task: Update `src/app/returns/page.tsx` to use localized title from i18n dictionary.
- [x] Task: Update `src/app/faq/page.tsx` to use localized title from i18n dictionary.
- [x] Task: Update `src/app/custom-orders/page.tsx` to use localized title from i18n dictionary.
- [x] Task: Conductor - User Manual Verification 'Page Title Localization' (Protocol in workflow.md)

## Phase 3: Final Verification & Polish
- [x] Task: Verify the language switcher still works correctly and persists user choice.
- [x] Task: Ensure all breadcrumbs or other UI elements related to these pages are also localized (if applicable).
- [x] Task: Conductor - User Manual Verification 'Final Verification & Polish' (Protocol in workflow.md)
