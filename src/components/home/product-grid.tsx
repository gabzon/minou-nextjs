"use client";

import Link from "next/link"
import { ProductCard, type Product } from "@/components/product/product-card";
import { useLanguage } from "@/lib/i18n";

interface Props {
  products: Product[];
  title: string;
}

export function ProductGrid({ products, title }: Props) {
  const { t } = useLanguage();

  // Simple mapping for the title if it matches a known key, otherwise pass through
  const displayTitle = title === "Freshly Baked" ? t('common.freshlyBaked') : title;

  return (
    <section className="px-4 pt-4">
      <div className="container mx-auto max-w-7xl px-0">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">{displayTitle}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="mt-8 mb-8 text-center">
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center gap-2 border-2 border-primary/20 hover:border-primary text-primary font-bold py-3 px-8 rounded-full transition-colors text-sm"
          >
            {t('common.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
