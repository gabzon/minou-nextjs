"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

interface ProductBreadcrumbsProps {
  product: {
    name: unknown;
    type?: { name: unknown; slug: { current: string } };
    collection?: { name: unknown; slug: { current: string } };
  }
}

export default function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  const { t, getLocalized } = useLanguage();

  return (
    <nav className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mb-6 px-4 sm:px-0">
      <Link href="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
      <span>/</span>
      
      <Link href="/shop" className="hover:text-primary transition-colors">{t('nav.shop')}</Link>
      <span>/</span>

      {product.type && (
        <>
          <Link href={`/shop?type=${product.type.slug.current}`} className="hover:text-primary transition-colors">
            {getLocalized(product.type.name) as string}
          </Link>
          <span>/</span>
        </>
      )}

      {product.collection && (
        <>
          <Link href={`/shop?collection=${product.collection.slug.current}`} className="hover:text-primary transition-colors">
            {getLocalized(product.collection.name) as string}
          </Link>
          <span>/</span>
        </>
      )}

      <span className="text-foreground font-medium">{getLocalized(product.name) as string}</span>
    </nav>
  );
}
