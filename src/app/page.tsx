import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import { Hero } from "@/components/home/hero";
import { CollectionsCarousel } from "@/components/home/collections-carousel";
import { MaterialsGrid } from "@/components/home/materials-grid";
import { ProductGrid } from "@/components/home/product-grid";

const FRESH_PRODUCTS_QUERY = `*[_type == "products" && isNew == true] | order(_createdAt desc) [0...4]{

  _id, 

  name, 

  slug, 

  price, 

  images, 

  isNew

}`;



const FEATURED_PRODUCTS_QUERY = `*[_type == "products" && isFeatured == true] | order(_createdAt desc) [0...5]{

  _id, 

  name, 

  slug, 

  price, 

  images, 

  isFeatured

}`;



const options = { next: { revalidate: 30 } };



export default async function IndexPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const [freshProducts, featuredProducts] = await Promise.all([

    client.fetch<any[]>(FRESH_PRODUCTS_QUERY, {}, options),

    client.fetch<any[]>(FEATURED_PRODUCTS_QUERY, {}, options)

  ]);



  return (

    <main className="flex flex-col gap-y-4 pb-12">

      <Hero featuredProducts={featuredProducts} />

      <CollectionsCarousel />

      <MaterialsGrid />

      <ProductGrid products={freshProducts} title="Freshly Baked" />

    </main>

  );

}
