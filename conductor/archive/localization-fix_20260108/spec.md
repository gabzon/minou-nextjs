# Specification: Localization Fix & Default Language Update

## 1. Overview
This track addresses two main issues related to site localization:
1.  **Untranslated Page Titles:** Pages linked from the sidebar (About, Shipping, FAQ, Returns, Custom Orders) currently display hardcoded English titles instead of localized strings.
2.  **Default Language Change:** The website's default language should be changed from English (EN) to Croatian (HR) for new visitors.

## 2. Functional Requirements
-   **Localized Page Titles:** Update the following pages to use the `i18n` dictionary for their main titles:
    -   `src/app/about/page.tsx`
    -   `src/app/shipping/page.tsx`
    -   `src/app/returns/page.tsx`
    -   `src/app/faq/page.tsx`
    -   `src/app/custom-orders/page.tsx`
-   **Reuse Sidebar Keys:** Use the same translation keys currently utilized by the sidebar navigation to ensure consistency and avoid duplication.
-   **Default Language:** Update the `LanguageProvider` or relevant initialization logic to set `hr` as the default language if no preference is stored in `localStorage` or cookies.

## 3. Non-Functional Requirements
-   **Consistency:** The page title localization must follow the established pattern used in other localized components (using `useLanguage` and the translation dictionary).
-   **Maintainability:** Avoid introducing new hardcoded strings; keep all UI labels in the `i18n` dictionary.

## 4. Acceptance Criteria
-   Navigating to the "About" page (and others) displays the title in Croatian by default.
-   Toggling the language switcher to "EN" updates the page titles to English.
-   A first-time visitor (or after clearing site data) sees the website in Croatian.
-   The sidebar links and the corresponding page titles match perfectly in both languages.

## 5. Out of Scope
-   Changing the URL structure to include locale prefixes (e.g., `/hr/about`).
-   Refactoring the entire `i18n` system beyond the default state change.
