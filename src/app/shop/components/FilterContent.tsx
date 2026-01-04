"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useFilter } from "../hooks/use-filter";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import ColorSwatches from "./ColorSwatches";
import { type FilterOption } from "./ShopContent";

interface FilterContentProps {
  filters: {
    genres: FilterOption[];
    collections: FilterOption[];
    categories: FilterOption[];
    colors: FilterOption[];
  };
  resolvedParams: { [key: string]: string | string[] | undefined };
  className?: string;
  isMobile?: boolean;
}

export default function FilterContent({ filters, resolvedParams, className, isMobile }: FilterContentProps) {
  const { t, getLocalized } = useLanguage();
  const { getFilterUrl, setFilter } = useFilter();

  const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
  const collection = typeof resolvedParams.collection === 'string' ? resolvedParams.collection : undefined;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const color = typeof resolvedParams.color === 'string' ? resolvedParams.color : undefined;

  const filterSectionClass = cn("flex flex-col gap-3", isMobile ? "w-full" : "");

  return (
    <div className={cn("flex flex-wrap items-end gap-x-10 gap-y-8", className)}>
      
      {/* 1. Type Filter */}
      <div className={filterSectionClass}>
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

      {/* 2. Category Filter */}
      <div className={filterSectionClass}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('product.category')}</h3>
        <div className="flex flex-wrap gap-2">
          <Link 
            href={getFilterUrl('category', '')}
            className={cn(
              "text-sm px-3 py-1 rounded-full transition-colors border",
              !category ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
            )}
          >
            {t('shop.filters.all') || 'All'}
          </Link>
          {filters.categories.map(c => (
            <Link 
              key={c._id}
              href={getFilterUrl('category', c.slug ?? '')}
              className={cn(
                "text-sm px-3 py-1 rounded-full transition-colors border",
                category === c.slug ? "bg-primary text-white border-primary" : "bg-transparent hover:bg-muted border-border"
              )}
            >
              {getLocalized(c.name) as string}
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Collection Filter */}
      <div className={filterSectionClass}>
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

      {/* 4. Color Filter */}
      <div className={filterSectionClass}>
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

      {(type || collection || category || color) && (
        <div className={cn("pt-4 border-t border-border mt-4", isMobile ? "w-full" : "w-full flex justify-end")}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              window.location.href = '/shop';
            }}
            className="text-muted-foreground hover:text-destructive flex items-center gap-2"
          >
            <RotateCcw className="w-3 h-3" />
            {t('shop.filters.clear')}
          </Button>
        </div>
      )}

    </div>
  );
}
