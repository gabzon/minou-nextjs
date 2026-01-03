"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ProductCard, type Product } from "@/components/product/product-card";
import { useLanguage } from "@/lib/i18n";
import FilterSheet from "./FilterSheet";
import FilterContent from "./FilterContent";
import LoadMoreButton from "./LoadMoreButton";
import { fetchMoreProducts } from "../actions";

// --- Types ---
export interface FilterOption {
  _id: string;
  name: unknown; // localized
  slug?: string;
  hex?: string; // For colors
}

export interface ShopContentProps {
  filters: {
    genres: FilterOption[];
    collections: FilterOption[];
    materials: FilterOption[];
    categories: FilterOption[];
    colors: FilterOption[];
  };
  products: Product[];
  total: number;
  resolvedParams: { [key: string]: string | string[] | undefined };
}

export default function ShopContent({ filters, products: initialProducts, total, resolvedParams }: ShopContentProps) {
  const { t } = useLanguage();
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state when initialProducts (server data) change (e.g. on filter)
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
  const collection = typeof resolvedParams.collection === 'string' ? resolvedParams.collection : undefined;
  const material = typeof resolvedParams.material === 'string' ? resolvedParams.material : undefined;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const color = typeof resolvedParams.color === 'string' ? resolvedParams.color : undefined;

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextProducts = await fetchMoreProducts(products.length, 12, {
        type,
        collection,
        material,
        category,
        color
      });
      setProducts(prev => [...prev, ...nextProducts]);
    } catch (error) {
      console.error("Failed to fetch more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasMore = products.length < total;

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Header */}
      <div className="py-8 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{t('nav.shop')}</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of handmade jewelry.
        </p>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden flex justify-end mb-6">
        <FilterSheet filters={filters} resolvedParams={resolvedParams} />
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block border-y border-border py-6 mb-8">
        <FilterContent filters={filters} resolvedParams={resolvedParams} />
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-muted-foreground">
          {t('shop.showing')} <span className="text-foreground font-bold">{products.length}</span> {t('shop.of')} <span className="text-foreground font-bold">{total}</span> {t('shop.products')}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <LoadMoreButton 
        hasMore={hasMore} 
        isLoading={isLoading} 
        onLoadMore={handleLoadMore} 
      />

      {products.length === 0 && (
        <div className="py-20 text-center bg-muted/30 rounded-3xl">
          <h2 className="text-xl font-bold">{t('shop.notFound.title')}</h2>
          <p className="text-muted-foreground mt-2">
            {t('shop.notFound.desc')}
          </p>
          <Link href="/shop" className="mt-4 inline-block text-primary font-bold hover:underline">
            {t('shop.filters.clear')}
          </Link>
        </div>
      )}
    </div>
  );
}
