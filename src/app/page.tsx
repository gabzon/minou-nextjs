import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";

const PRODUCTS_QUERY = `*[_type == "products" && defined(slug.current)]{_id, name, slug, price}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options);

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <ul className="flex flex-col gap-y-4">
        {products.map((product) => (
          <li key={product._id} className="hover:underline">
            <Link href={`/product/${product.slug.current}`}>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              {product.price && <p>${product.price}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
