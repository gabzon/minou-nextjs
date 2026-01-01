# Project Brief: Headless E-Commerce Catalog for "Minou"

## 1. Project Overview 
"Minou" is a homemade jewelry brand featuring casual, playful pieces (polymer clay, UV resin). We require a high-performance Product Catalog (not a full checkout shop). The website will serve as a digital showroom where users browse products and are redirected to a Google Form to place an order manually.

## 2. Tech Stack Requirements (Strict)

Frontend: Next.js (React).
Content Management System (CMS): Sanity.io.
Hosting: Vercel or Netlify (Open to recommendation).
Styling: Tailwind CSS (recommended) or CSS Modules.

## 3. Design & Brand Identity

Vibe: "Sophisticated Playful." The jewelry is colorful, so the UI must be clean to let the products shine.
Color Palette:
Light Mode: Cream/Soft White background with pastel accents (Mint, Blush, Butter).
Dark Mode: Deep Charcoal background (not pure black) with desaturated pastel accents.
Theme Toggle: Persistent switch for Light/Dark mode.

## 4. Localization

Languages: Dual language support required (Croatian default, English secondary).

CMS Requirement: Sanity schemas must be set up for field-level translation or document-level translation to easily manage both languages.

## 5. Site Architecture & Pages

Global Elements:

Navigation: Home, Shop (Dropdown), About, How to Order, Language Toggle (HR/EN), Theme Toggle.

Footer: Newsletter signup (Kit/ConvertKit integration), Social Links (Instagram), Copyright.

Homepage Structure (Top to Bottom):

Hero Section: Visual banner with headline.

Collections Carousel: A horizontal slider displaying key collections (e.g., Christmas, Summer, Valentine's).

Materials Grid: A visual grid (images or icons) representing materials (e.g., Polymer Clay, UV Resin). Clicking one takes the user to a pre-filtered view of products made with that material.
"New Arrivals" or "Highlights": A grid snippet of latest products.
Brief "About" Snippet: Short text introduction.
Catalog / Product Listing Page (PLP):
Filtering: A robust sidebar or top-bar filter system is essential.
Filter by Type: Earrings, Necklaces, Rings, Bracelets.
Filter by Collection: Christmas, Winter, Summer, World Cup, etc.
Filter by Material: Polymer clay, UV resin.
Card Design: Photo, Name, Price, "Details" button.
Single Product Page (PDP):
Image Gallery (Carousel/Grid).
Product Title, Price, Description (Multilanguage).
Material & Care info.
Primary CTA Button: "Order This Item" (See logic in Section 6).
Informational Pages:
About Us: Brand story.
How to Order / Shipping: A static text page explaining the manual ordering process and shipping info.

Follow the designs of stitch minou hompage, catalog and product details which include a screenview and an html example of the design for inspiration, these designs are mobile first, but you should also make it available for desktop and tablet

## 6. Functional Features

Image Aspect Ratio: All product imagery (thumbnails and galleries) must strictly follow a 9:16 Portrait Ratio (Vertical, like Instagram Stories). The UI cards and containers must be designed to accommodate this tall format without cropping key details.

The "Order" Logic:

Since there is no shopping cart, the "Order" button on a product page should link to an external Google Form (or a similar form solution).

Technical Requirement: The button must pass the Product Name/ID to the Google Form via URL parameters so the form is pre-filled for the user (e.g. googleform.com/viewform?entry.12345=RedEarrings).

Newsletter:

Integration with Kit (formerly ConvertKit).

Simple input field in the footer: "Enter email" > Submit to Kit API.

Search:

Global search bar to find products by name or tag.