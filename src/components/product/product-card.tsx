"use client";

import Link from "next/link"
import { urlFor } from '@/sanity/client';
import { type SanityImageSource } from "@sanity/image-url";
import { useLanguage } from "@/lib/i18n";

export interface Product {
  _id: string;
  name: unknown; // localized
  price: number;
  slug: { current: string };
  images: SanityImageSource[];
  isNew?: boolean;
  discount?: number;
  inStock?: boolean;
  quantity?: number;
  category?: {
    name: unknown;
    slug: { current: string };
  };
  color?: {
    name: string;
    hex: string;
  };
}

export function ProductCard({ product }: { product: Product }) {
  const { t, getLocalized } = useLanguage();
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).width(400).url() : '';

  return (
    <div className="relative group">
      <Link href={`/product/${product.slug.current}`}>
        <div className="relative w-full aspect-[9/14] rounded-2xl overflow-hidden bg-muted">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={imageUrl} 
              alt={getLocalized(product.name) as string}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
              {t('common.newArrival')}
            </span>
          )}
        </div>
        <div className="mt-3">
          <h3 className="font-bold text-sm truncate">{getLocalized(product.name) as string}</h3>
          <p className="text-primary font-bold text-sm mt-0.5">{product.price} €</p>
        </div>
      </Link>
    </div>
  );
}
