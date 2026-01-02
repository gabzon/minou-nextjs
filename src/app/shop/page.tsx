import { client } from "@/sanity/client";
import { type Product } from "@/components/product/product-card";
import ShopContent from "./components/ShopContent";

// --- Types ---
interface FilterOption {
  _id: string;
  name: unknown;
  slug: string;
}

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// --- Queries ---
const FILTERS_QUERY = `{
  "genres": *[_type == "genre"] | order(name asc) { _id, name, "slug": slug.current },
  "collections": *[_type == "collection" && isFeatured == true] | order(name asc) { _id, name, "slug": slug.current },
  "materials": *[_type == "material"] | order(name asc) { _id, name, "slug": slug.current }
}`;

const options = { next: { revalidate: 0 } };

// --- Page Component ---
export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
  const collection = typeof resolvedParams.collection === 'string' ? resolvedParams.collection : undefined;
  const material = typeof resolvedParams.material === 'string' ? resolvedParams.material : undefined;

  // Build the product query dynamically
  const typeFilter = type ? `&& type->slug.current == "${type}"` : "";
  const collectionFilter = collection ? `&& collection->slug.current == "${collection}"` : "";
  const materialFilter = material ? `&& count((materials[]->slug.current)[@ == "${material}"]) > 0` : "";

  const PRODUCTS_QUERY = `*[_type == "products" && inStock == true && quantity > 0 ${typeFilter} ${collectionFilter} ${materialFilter}] | order(_createdAt desc){
    _id,
    name,
    slug,
    price,
    images,
    isNew,
    inStock,
    quantity
  }`;

  // Fetch data in parallel
  const [filters, products] = await Promise.all([
    client.fetch<{ genres: FilterOption[], collections: FilterOption[], materials: FilterOption[] }>(FILTERS_QUERY, {}, options),
    client.fetch<Product[]>(PRODUCTS_QUERY, {}, options)
  ]);

  return (
    <main className="pb-12 bg-background min-h-screen">
      <ShopContent 
        filters={filters} 
        products={products} 
        resolvedParams={resolvedParams} 
      />
    </main>
  );
}
