# Specification: Add About Image to About Page

## 1. Overview
The goal of this track is to integrate and display a newly added `aboutImage` field from Sanity on the "About" page. This image will complement the brand's storytelling by providing a visual element to the "About Minou" description.

## 2. Functional Requirements
-   **Data Fetching:** Update the GROQ query in `src/app/about/page.tsx` to include the `aboutImage` field from the `siteSettings` schema.
-   **Component Update:** Update the `InfoPageContent` component (or the `AboutPage` wrapper) to handle and render the `aboutImage`.
-   **Layout & Positioning:**
    -   Place the image immediately below the page title ("About Minou") and above the rich text content.
    -   The image must be contained within the same width as the text content (max-w-3xl).
-   **Responsive Rendering:** Use `next-sanity` or standard `next/image` patterns to ensure the image is optimized and responsive.

## 3. Non-Functional Requirements
-   **Styling Consistency:** The image should follow the project's visual identity, including `rounded-3xl` corners.
-   **Flexible Aspect Ratio:** Unlike product imagery, this image does NOT strictly require a 9:16 ratio. It should support landscape, square, or portrait orientations as uploaded by the user.
-   **Performance:** Ensure lazy loading and appropriate image sizing.

## 4. Acceptance Criteria
-   The "About" page displays the image fetched from Sanity.
-   The image is correctly positioned between the title and the text.
-   The image respects the container width (max-w-3xl).
-   The image has rounded corners matching the UI guidelines.
-   The page remains responsive on mobile.

## 5. Out of Scope
-   Adding image galleries or carousels to the About page.
-   Updating the Sanity schema (already completed by the user).
