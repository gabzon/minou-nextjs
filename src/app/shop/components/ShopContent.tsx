"use client";

import Link from "next/link";
import { ProductCard, type Product } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useFilter } from "../hooks/use-filter";
import CategorySelect from "./CategorySelect";
import ColorSwatches from "./ColorSwatches";

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
  const { getFilterUrl, setFilter } = useFilter();

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
      <div className="flex flex-wrap items-end gap-x-10 gap-y-6 mb-8 border-y border-border py-6">
        
        {/* 1. Type Filter */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('shop.filters.type')}</h3>
          <div className="flex flex-wrap gap-2">
            <Link 
              href={getFilterUrl('type', '')}
              className={cn(
                "text-sm px-3 py-1 rounded-full transition-colors border",
                !type ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
              )}
            >
              {t('shop.filters.all') || 'All'}
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

        {/* 2. Category Filter (Dropdown) */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('product.category')}</h3>
          <CategorySelect 
            categories={filters.categories}
            selectedCategory={category}
            onChange={(val) => setFilter('category', val)}
          />
        </div>

        {/* 3. Collection Filter */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('shop.filters.collection')}</h3>
          <div className="flex flex-wrap gap-2">
            <Link 
              href={getFilterUrl('collection', '')}
              className={cn(
                "text-sm px-3 py-1 rounded-full transition-colors border",
                !collection ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
              )}
            >
              {t('shop.filters.all') || 'All'}
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

        {/* 4. Color Filter (Swatches) */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('product.colors')}</h3>
          <div className="flex items-center gap-4">
             <Link 
                href={getFilterUrl('color', '')}
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded transition-colors",
                  !color ? "text-primary font-bold underline underline-offset-4" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t('shop.filters.all') || 'All'}
              </Link>
              <ColorSwatches 
                colors={filters.colors}
                selectedColor={color}
                onSelect={(val) => setFilter('color', val)}
              />
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
