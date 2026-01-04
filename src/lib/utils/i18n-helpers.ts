// --- Types ---
export type Language = "en" | "hr";

// --- Static Dictionary ---
export const DICTIONARY: Record<string, Record<Language, string>> = {
  "nav.home": { en: "Home", hr: "Naslovnica" },
  "nav.shop": { en: "Shop", hr: "Trgovina" },
  "nav.collections": { en: "Collections", hr: "Kolekcije" },
  "nav.about": { en: "About", hr: "O meni" },
  "nav.customOrders": { en: "Custom Order", hr: "Personalizirane narudžbe" },
  "nav.shipping": { en: "Shipping", hr: "Dostava" },
  "nav.returns": { en: "Returns", hr: "Povrati" },
  "nav.faq": { en: "FAQ", hr: "Česta pitanja" },
  "nav.menu": { en: "Menu", hr: "Izbornik" },
  "common.newArrival": { en: "New Arrival", hr: "Novo" },
  "common.inStock": { en: "In Stock", hr: "Dostupno" },
  "common.outOfStock": { en: "Out of Stock", hr: "Rasprodano" },
  "common.customizable": { en: "Customizable", hr: "Prilagodljivo" },
  "common.viewAll": { en: "View All Products", hr: "Pogledaj sve" },
  "common.shopByType": { en: "Shop by Type", hr: "Kupuj po vrsti" },
  "common.freshlyBaked": { en: "New arrivals", hr: "Novo u ponudi" },
  "product.details": { en: "Specifications", hr: "Specifikacije" },
  "product.care": { en: "Care Instructions", hr: "Upute za njegu" },
  "product.category": { en: "Category", hr: "Kategorija" },
  "product.materials": { en: "Materials", hr: "Materijali" },
  "product.dimensions": { en: "Dimensions", hr: "Dimenzije" },
  "product.weight": { en: "Weight", hr: "Težina" },
  "product.sku": { en: "SKU", hr: "Šifra" },
  "product.colors": { en: "Color", hr: "Boja" },
  "product.sizes": { en: "Size", hr: "Veličina" },
  "product.customizable": { en: "Customizable", hr: "Prilagodljivo" },
  "shop.filters.clear": { en: "Clear all filters", hr: "Očisti filtere" },
  "shop.filters.type": { en: "Type", hr: "Vrsta" },
  "shop.filters.collection": { en: "Collection", hr: "Kolekcija" },
  "shop.filters.material": { en: "Material", hr: "Materijal" },
  "shop.filters.all": { en: "All", hr: "Sve" },
  "shop.showing": { en: "Showing", hr: "Prikazano" },
  "shop.of": { en: "of", hr: "od" },
  "shop.products": { en: "products", hr: "proizvoda" },
  "shop.loadMore": { en: "Load More", hr: "Učitaj više" },
  "shop.subtitle": { en: "Browse our complete collection of handmade jewelry.", hr: "Pregledajte našu cijelu kolekciju ručno rađenog nakita." },
  "shop.notFound.title": { en: "No products found", hr: "Nema pronađenih proizvoda" },
  "shop.notFound.desc": { en: "Try adjusting your filters or check back later.", hr: "Pokušajte prilagoditi filtere ili navratite kasnije." },
  "footer.joinClub": { en: "Join the Club", hr: "Pridruži se klubu" },
  "footer.newsletterDesc": { en: "Get updates on new drops and exclusive offers.", hr: "Saznaj prvi za nove kolekcije i ponude." },
  "footer.subscribe": { en: "Subscribe", hr: "Pretplati se" },
  "footer.shipping": { en: "Shipping", hr: "Dostava" },
  "footer.returns": { en: "Returns", hr: "Povrati" },
  "footer.faq": { en: "FAQ", hr: "Česta pitanja" },
  "footer.madeWithLove": { en: "Handmade with love.", hr: "Ručni rad s puno ljubavi." },
  "hero.newSeason": { en: "New Season", hr: "Nova Sezona" },
  "hero.title": { en: "Wear the\nJoy.", hr: "Nosi\nRadost." },
  "hero.description": { en: "Handmade jewelry for your everyday play.", hr: "Ručno rađen nakit za tvoju svakodnevnu igru." },
  "hero.cta": { en: "Shop New Drops", hr: "Istraži Novo" },
};

// --- Standalone Helper for Server Components ---
export const getLocalizedValue = (value: unknown, language: Language): unknown => {
  if (value === undefined || value === null) return value;

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    const val = value as Record<string, unknown>;
    if (val[language]) {
      return val[language];
    }
    if (val["en"]) {
      return val["en"];
    }
    return value;
  }

  return value;
};