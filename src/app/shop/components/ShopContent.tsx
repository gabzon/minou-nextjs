"use client";

import Link from "next/link";
import { ProductCard, type Product } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useFilter } from "../hooks/use-filter";

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
  resolvedParams: { [key: string]: string | string[] | undefined };
}

export default function ShopContent({ filters, products, resolvedParams }: ShopContentProps) {
  const { t, getLocalized } = useLanguage();
  const { getFilterUrl } = useFilter();

  const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
  const collection = typeof resolvedParams.collection === 'string' ? resolvedParams.collection : undefined;
  const material = typeof resolvedParams.material === 'string' ? resolvedParams.material : undefined;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const color = typeof resolvedParams.color === 'string' ? resolvedParams.color : undefined;

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Header */}
      <div className="py-8 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{t('nav.shop')}</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of handmade jewelry.
        </p>
      </div>

      {/* Filters (Simple Top Bar) */}
      <div className="flex flex-wrap gap-x-8 gap-y-6 mb-8 border-y border-border py-6">
        
        {/* Collection/Theme Filter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('shop.filters.collection')}</h3>
          <div className="flex flex-wrap gap-2">
            <Link 
              href={getFilterUrl('collection', '')}
              className={cn(
                "text-sm px-3 py-1 rounded-full transition-colors border",
                !collection ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
              )}
            >
              All
            </Link>
            {filters.collections.map(c => (
              <Link 
                key={c._id}
                href={getFilterUrl('collection', c.slug ?? '')}
                className={cn(
                  "text-sm px-3 py-1 rounded-full transition-colors border",
                  collection === c.slug ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
                )}
              >
                {getLocalized(c.name) as string}
              </Link>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('shop.filters.type')}</h3>
          <div className="flex flex-wrap gap-2">
            <Link 
              href={getFilterUrl('type', '')}
              className={cn(
                "text-sm px-3 py-1 rounded-full transition-colors border",
                !type ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
              )}
            >
              All
            </Link>
            {filters.genres.map(g => (
              <Link 
                key={g._id}
                href={getFilterUrl('type', g.slug ?? '')}
                className={cn(
                  "text-sm px-3 py-1 rounded-full transition-colors border",
                  type === g.slug ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
                )}
              >
                {getLocalized(g.name) as string}
              </Link>
            ))}
          </div>
        </div>

        {/* Material Filter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('shop.filters.material')}</h3>
          <div className="flex flex-wrap gap-2">
            <Link 
              href={getFilterUrl('material', '')}
              className={cn(
                "text-sm px-3 py-1 rounded-full transition-colors border",
                !material ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
              )}
            >
              All
            </Link>
            {filters.materials.map(m => (
              <Link 
                key={m._id}
                href={getFilterUrl('material', m.slug ?? '')}
                className={cn(
                  "text-sm px-3 py-1 rounded-full transition-colors border",
                  material === m.slug ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
                )}
              >
                {getLocalized(m.name) as string}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-muted-foreground">
          {t('shop.showing')} <span className="text-foreground font-bold">{products.length}</span> {t('shop.products')}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

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