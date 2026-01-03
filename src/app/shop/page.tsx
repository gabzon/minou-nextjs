import { client } from "@/sanity/client";
import { type Product } from "@/components/product/product-card";
import ShopContent, { type FilterOption, type ShopContentProps } from "./components/ShopContent";

// --- Types ---
// Imported from ShopContent

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// --- Queries ---
const FILTERS_QUERY = `{
  "genres": *[_type == "genre"] | order(name asc) { _id, name, "slug": slug.current },
  "collections": *[_type == "collection" && isFeatured == true] | order(name asc) { _id, name, "slug": slug.current },
  "materials": *[_type == "material"] | order(name asc) { _id, name, "slug": slug.current },
  "categories": *[_type == "category"] | order(name.en asc) { _id, name, "slug": slug.current },
  "colors": *[_type == "color"] | order(name asc) { _id, name, hex }
}`;

const options = { next: { revalidate: 0 } };

// --- Page Component ---
export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
  const collection = typeof resolvedParams.collection === 'string' ? resolvedParams.collection : undefined;
  const material = typeof resolvedParams.material === 'string' ? resolvedParams.material : undefined;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const color = typeof resolvedParams.color === 'string' ? resolvedParams.color : undefined;

  // Build the product query dynamically
  const typeFilter = type ? `&& type->slug.current == "${type}"` : "";
  const collectionFilter = collection ? `&& collection->slug.current == "${collection}"` : "";
  const materialFilter = material ? `&& count((materials[]->slug.current)[@ == "${material}"]) > 0` : "";
  const categoryFilter = category ? `&& category->slug.current == "${category}"` : "";
  // Color filter might need adjustment depending on how it's stored on product. 
  // Assuming strict reference:
  const colorFilter = color ? `&& color->name == "${color}"` : ""; // Or use ID/Slug if available. 
  // Color schema provided earlier didn't have slug, just name and hex. So filtering by name.

  const PRODUCTS_QUERY = `{
    "items": *[_type == "products" && inStock == true && quantity > 0 ${typeFilter} ${collectionFilter} ${materialFilter} ${categoryFilter} ${colorFilter}] | order(_createdAt desc)[0...12]{
      _id,
      name,
      slug,
      price,
      images,
      isNew,
      inStock,
      quantity,
      category->{name, "slug": slug.current},
      color->{name, hex}
    },
    "total": count(*[_type == "products" && inStock == true && quantity > 0 ${typeFilter} ${collectionFilter} ${materialFilter} ${categoryFilter} ${colorFilter}])
  }`;

  // Fetch data in parallel
  const [filters, productData] = await Promise.all([
    client.fetch<{ 
      genres: FilterOption[], 
      collections: FilterOption[], 
      materials: FilterOption[],
      categories: FilterOption[],
      colors: FilterOption[]
    }>(FILTERS_QUERY, {}, options),
    client.fetch<{ items: Product[], total: number }>(PRODUCTS_QUERY, {}, options)
  ]);

  return (
    <main className="pb-12 bg-background min-h-screen">
      <ShopContent
        filters={filters}
        products={productData.items}
        total={productData.total}
        resolvedParams={resolvedParams}
      />
    </main>
  );
}
