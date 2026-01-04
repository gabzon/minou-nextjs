"use server";

import { client } from "@/sanity/client";
import { type Product } from "@/components/product/product-card";

export async function fetchMoreProducts(offset: number, limit: number, filters: {
  type?: string;
  collection?: string;
  material?: string;
  category?: string;
  color?: string;
}) {
  const typeFilter = filters.type ? `&& type->slug.current == "${filters.type}"` : "";
  const collectionFilter = filters.collection ? `&& collection->slug.current == "${filters.collection}"` : "";
  const materialFilter = filters.material ? `&& count((materials[]->slug.current)[@ == "${filters.material}"]) > 0` : "";
  const categoryFilter = filters.category ? `&& category->slug.current == "${filters.category}"` : "";
  const colorFilter = filters.color ? `&& count((color[]->slug.current)[@ == "${filters.color}"]) > 0` : "";

  const query = `*[_type == "products" && inStock == true && quantity > 0 ${typeFilter} ${collectionFilter} ${materialFilter} ${categoryFilter} ${colorFilter}] | order(_createdAt desc)[${offset}...${offset + limit}]{
    _id,
    name,
    slug,
    price,
    discount,
    images,
    isNew,
    inStock,
    quantity,
    category->{name, "slug": slug.current},
    color[]->{name, hex, "slug": slug.current}
  }`;

  return client.fetch<Product[]>(query, {}, { next: { revalidate: 0 } });
}
