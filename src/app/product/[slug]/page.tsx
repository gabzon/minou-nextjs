import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ImageGallery from "./components/ImageGallery";
import ProductDetails from "./components/ProductDetails";
import ProductBreadcrumbs from "./components/ProductBreadcrumbs";
import { getLocalizedValue } from "@/lib/utils/i18n-helpers";



interface Product {
  _id: string;
  name: unknown;
  slug: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  color?: Array<{ name: string; hex: string }>;
  materials?: { name: unknown }[];
  weight?: number;
  sizeOptions?: string[];
  dimensions?: { length?: number; width?: number; height?: number };
  inStock?: boolean;
  quantity?: number;
  sku?: string;
  seo?: { metaTitle?: unknown; metaDescription?: unknown };
}

const PRODUCT_QUERY = `{
  "product": *[_type == "products" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    images,
    description,
    careInstructions,
    price,
    discount,
    currency,
    type->{name, slug},
    category->{name},
    collection->{name, slug},
    tags,
    isCustomizable,
    isFeatured,
    isNew,
    color[]->{name, hex},
    materials[]->{name},
    weight,
    sizeOptions,
    dimensions{length, width, height},
    inStock,
    quantity,
    sku,
    seo{metaTitle, metaDescription}
  },
  "phone": *[_type == "siteSettings"][0].phone
}`;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await client.fetch<{ product: Product }>(PRODUCT_QUERY, { slug });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  // Fallback to 'en' for SSR metadata
  const name = getLocalizedValue(product.name, 'en');
  const desc = getLocalizedValue(product.description, 'en');
  const metaTitle = getLocalizedValue(product.seo?.metaTitle, 'en');
  const metaDesc = getLocalizedValue(product.seo?.metaDescription, 'en');

  return {
    title: (metaTitle as string) || (typeof name === 'string' ? name : 'Product Details'),
    description: (metaDesc as string) || (typeof desc === 'string' ? desc : undefined),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { product, phone } = await client.fetch<{ product: Product, phone: string }>(PRODUCT_QUERY, { slug });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-7xl px-0 sm:px-4 py-0 sm:py-8">
      <ProductBreadcrumbs product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <div className="w-full">
          <ImageGallery images={product.images} />
        </div>

        <ProductDetails product={product as any} phone={phone} />
      </div>
    </div>
  );
}