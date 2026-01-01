import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from '@/sanity/client';

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source);
}

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  isNew?: boolean;
  discount?: number;
}

interface Props {
  products: Product[];
  title: string;
}

export function ProductGrid({ products, title }: Props) {
  return (
    <section className="px-4 pt-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="mt-8 mb-8 text-center">
        <Link 
          href="/products" 
          className="inline-flex items-center justify-center gap-2 border-2 border-primary/20 hover:border-primary text-primary font-bold py-3 px-8 rounded-full transition-colors text-sm"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).width(400).url() : '';

  return (
    <div className="relative group">
      <Link href={`/product/${product.slug.current}`}>
        <div className="relative w-full aspect-[9/14] rounded-2xl overflow-hidden bg-muted">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={imageUrl} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 dark:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-lg active:scale-90 transition-transform">
            <ShoppingBag className="h-5 w-5 fill-current" />
          </button>
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
        <div className="mt-3">
          <h3 className="font-bold text-sm truncate">{product.name}</h3>
          <p className="text-primary font-bold text-sm mt-0.5">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}
