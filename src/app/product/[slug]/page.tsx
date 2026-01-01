import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ImageGallery from "./components/ImageGallery";
import PortableTextRenderer from "./components/PortableText";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  shortDescription?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any;
  careInstructions?: string;
  price: number;
  discount?: number;
  currency?: string;
  category?: { name: string };
  collection?: { name: string };
  tags?: string[];
  isCustomizable?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  color?: { name: string }[];
  materials?: { name: string }[];
  weight?: number;
  sizeOptions?: string[];
  dimensions?: { length?: number; width?: number; height?: number };
  inStock?: boolean;
  quantity?: number;
  sku?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
}

const PRODUCT_QUERY = `*[_type == "products" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  images,
  shortDescription,
  description,
  careInstructions,
  price,
  discount,
  currency,
  category->{name},
  collection->{name},
  tags,
  isCustomizable,
  isFeatured,
  isNew,
  color->{name},
  materials->{name},
  weight,
  sizeOptions,
  dimensions{length, width, height},
  inStock,
  quantity,
  sku,
  seo{metaTitle, metaDescription}
}`;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch<Product>(PRODUCT_QUERY, { slug });
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.seo?.metaTitle || product.name,
    description: product.seo?.metaDescription || product.shortDescription || product.name,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await client.fetch<Product>(PRODUCT_QUERY, { slug });
  
  if (!product) {
    notFound();
  }

  const formatDimensions = () => {
    const dims = [];
    if (product.dimensions?.length) dims.push(`${product.dimensions.length}mm`);
    if (product.dimensions?.width) dims.push(`${product.dimensions.width}mm`);
    if (product.dimensions?.height) dims.push(`${product.dimensions.height}mm`);
    return dims.join(' × ');
  };

  return (
    <div className="container mx-auto max-w-7xl px-0 sm:px-4 py-0 sm:py-8">
      <nav className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mb-6 px-4 sm:px-0">
        <Link href="/" className="hover:text-rose-500">Home</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="hidden sm:block px-4 sm:px-0">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            ← Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <div className="w-full">
          <ImageGallery images={product.images} />
        </div>

        <div className="space-y-6 px-4 sm:px-0 pb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>
              {product.discount && (
                <span className="text-xl line-through text-muted-foreground">
                  ${product.discount}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.materials && product.materials.length > 0 && product.materials.map((m, idx) => (
                <Badge key={idx} variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none uppercase text-[10px] tracking-wider">
                  ✨ {m.name}
                </Badge>
              ))}
              {product.isNew && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none uppercase text-[10px] tracking-wider">
                  New Arrival
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-bold text-lg">Description</h3>
             
             {product.shortDescription && (
                <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>
              )}
             
             {product.description && (
                <div className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
                  <PortableTextRenderer content={product.description} />
                </div>
              )}
          </div>

        </div>
      </div>
    </div>
  );
}