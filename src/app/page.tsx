import { client } from "@/sanity/client";
import { Hero } from "@/components/home/hero";
import { CollectionsCarousel } from "@/components/home/collections-carousel";
import { GenreGrid } from "@/components/home/genre-grid";
import { ProductGrid } from "@/components/home/product-grid";
import { type Product } from "@/components/product/product-card";
import { type SanityImageSource } from "@sanity/image-url";

export const runtime = 'edge';

interface Collection {
  _id: string
  name: unknown
  slug: string
  image: SanityImageSource
}

interface Genre {
  _id: string
  name: unknown
  slug: { current: string } | null
  image?: SanityImageSource
}

const FRESH_PRODUCTS_QUERY = `*[_type == "products" && isNew == true] | order(_createdAt desc) [0...5]{

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



const COLLECTIONS_QUERY = `*[_type == "collection" && isFeatured == true] | order(_createdAt desc) [0...8]{
  _id,
  name,
  "slug": slug.current,
  image
}`;

const GENRES_QUERY = `*[_type == "genre"] | order(name asc){
  _id,
  name,
  slug,
  image
}`;

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  coverImage
}`;

const options = { next: { revalidate: 30 } };



export default async function IndexPage() {

  const [freshProducts, featuredProducts, collections, genres, settings] = await Promise.all([

    client.fetch<Product[]>(FRESH_PRODUCTS_QUERY, {}, options),

    client.fetch<Product[]>(FEATURED_PRODUCTS_QUERY, {}, options),

    client.fetch<Collection[]>(COLLECTIONS_QUERY, {}, options),

    client.fetch<Genre[]>(GENRES_QUERY, {}, options),

    client.fetch<{ coverImage: SanityImageSource }>(SETTINGS_QUERY, {}, options)

  ]);



  return (

    <main className="flex flex-col gap-y-4 pb-12">

      <Hero featuredProducts={featuredProducts} coverImage={settings?.coverImage} />

      <GenreGrid genres={genres} />

      <CollectionsCarousel collections={collections} />

      <ProductGrid products={freshProducts} title="Freshly Baked" />

    </main>

  );

}
