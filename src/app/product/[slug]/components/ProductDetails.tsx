"use client";

import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PortableTextRenderer from "./PortableText";
import { useLanguage } from "@/lib/i18n";

interface Product {
  _id: string;
  name: unknown;
  slug: { current: string };
  images: any[];
  description?: any;
  careInstructions?: string;
  price: number;
  discount?: number;
  currency?: string;
  type?: { name: unknown; slug: { current: string } };
  category?: { name: unknown };
  collection?: { name: unknown; slug: { current: string } };
  tags?: string[];
  isCustomizable?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  color?: { name: string; hex: string }[];
  materials?: { name: unknown }[];
  weight?: number;
  sizeOptions?: string[];
  dimensions?: { length?: number; width?: number; height?: number };
  inStock?: boolean;
  quantity?: number;
  sku?: string;
}

export default function ProductDetails({ product }: { product: Product }) {
  const { t, getLocalized, language } = useLanguage();

  const formatDimensions = () => {
    const dims = [];
    if (product.dimensions?.length) dims.push(`L: ${product.dimensions.length}mm`);
    if (product.dimensions?.width) dims.push(`W: ${product.dimensions.width}mm`);
    if (product.dimensions?.height) dims.push(`H: ${product.dimensions.height}mm`);
    return dims.join(' × ');
  };

  const productName = getLocalized(product.name) as string;

  return (
    <div className="space-y-8 px-4 sm:px-0 pb-10">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold">{productName}</h1>
          {product.isNew && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none uppercase text-[10px] tracking-wider">
              {t('common.newArrival')}
            </Badge>
          )}
        </div>
        
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-3xl font-extrabold text-primary">
            {product.discount ? product.discount : product.price} €
          </span>
          {product.discount && (
            <span className="text-xl text-muted-foreground line-through decoration-2 decoration-destructive/50">
              {product.price} €
            </span>
          )}
        </div>

        {/* Quick Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
           {product.inStock ? (
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                {t('common.inStock')}
              </Badge>
           ) : (
              <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                {t('common.outOfStock')}
              </Badge>
           )}
           {product.isCustomizable && (
              <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
                {t('common.customizable')}
              </Badge>
           )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
         {product.description && (
            <div className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
              <PortableTextRenderer content={getLocalized(product.description) as Parameters<typeof PortableTextRenderer>[0]['content']} />
            </div>
          )}
      </div>

      {/* Order Button */}
      <div className="pt-4">
        <a 
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfYourFormId/viewform?entry.123456=${encodeURIComponent(productName)}&entry.789012=${product.sku || ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full text-base transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <ShoppingBag className="h-5 w-5" />
          {language === 'en' ? 'Order This Item' : 'Naruči ovaj proizvod'}
        </a>
        <p className="text-center text-xs text-muted-foreground mt-3 italic">
          {language === 'en' ? 'Orders are processed manually via Google Form' : 'Narudžbe se obrađuju ručno putem Google obrasca'}
        </p>
      </div>

      <div className="h-px bg-border my-6" />

      {/* Accordion Details */}
      <Accordion type="single" collapsible defaultValue="details" className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger className="font-bold">{t('product.details')}</AccordionTrigger>
          <AccordionContent>
            <dl className="grid grid-cols-1 gap-y-2 text-sm">
              {product.category && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b border-border/50 pb-2">
                  <dt className="font-medium text-muted-foreground">{t('product.category')}</dt>
                  <dd className="col-span-2">{getLocalized(product.category.name) as string}</dd>
                </div>
              )}
              {product.materials && product.materials.length > 0 && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b border-border/50 pb-2">
                  <dt className="font-medium text-muted-foreground">{t('product.materials')}</dt>
                  <dd className="col-span-2">
                    {product.materials.map(m => getLocalized(m.name) as string).join(', ')}
                  </dd>
                </div>
              )}
              {product.color && product.color.length > 0 && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b border-border/50 pb-2">
                  <dt className="font-medium text-muted-foreground">{t('product.colors')}</dt>
                  <dd className="col-span-2 flex flex-wrap gap-2">
                    {product.color.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-muted px-2 py-0.5 rounded-full ring-1 ring-border">
                        <div 
                          className="w-3 h-3 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[10px] font-medium">{c.name}</span>
                      </div>
                    ))}
                  </dd>
                </div>
              )}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b border-border/50 pb-2">
                  <dt className="font-medium text-muted-foreground">{t('product.sizes')}</dt>
                  <dd className="col-span-2">{product.sizeOptions.join(', ')}</dd>
                </div>
              )}
              {product.isCustomizable && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b border-border/50 pb-2">
                  <dt className="font-medium text-muted-foreground">{t('product.customizable')}</dt>
                  <dd className="col-span-2">{language === 'en' ? 'Yes' : 'Da'}</dd>
                </div>
              )}
              {product.dimensions && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b border-border/50 pb-2">
                  <dt className="font-medium text-muted-foreground">{t('product.dimensions')}</dt>
                  <dd className="col-span-2">{formatDimensions()}</dd>
                </div>
              )}
              {product.weight && (
                <div className="grid grid-cols-3 gap-4 py-1 border-b border-border/50 pb-2">
                  <dt className="font-medium text-muted-foreground">{t('product.weight')}</dt>
                  <dd className="col-span-2">{product.weight}g</dd>
                </div>
              )}
              {product.sku && (
                 <div className="grid grid-cols-3 gap-4 py-1">
                  <dt className="font-medium text-muted-foreground">{t('product.sku')}</dt>
                  <dd className="col-span-2 font-mono text-xs">{product.sku}</dd>
                </div>
              )}
            </dl>
          </AccordionContent>
        </AccordionItem>

        {product.careInstructions && (
          <AccordionItem value="care">
            <AccordionTrigger className="font-bold">{t('product.care')}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {product.careInstructions}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
         <div className="pt-4 flex flex-wrap gap-2">
          {product.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}