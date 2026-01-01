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
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-rose-500">Home</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <Link href="/">
        <Button variant="ghost" className="mb-6">
          ← Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ImageGallery images={product.images} />

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="flex flex-wrap gap-2">
            {product.isFeatured && <Badge>Featured</Badge>}
            {product.isNew && <Badge>New Arrival</Badge>}
            {product.isCustomizable && <Badge>Customizable</Badge>}
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-rose-600">
              ${product.price}
            </span>
            {product.discount && (
              <span className="text-xl line-through text-muted-foreground">
                ${product.discount}
              </span>
            )}
            <Badge variant="outline">{product.currency || 'USD'}</Badge>
          </div>

          {product.shortDescription && (
            <p className="text-muted-foreground">{product.shortDescription}</p>
          )}

          <div className="flex items-center gap-4">
            <Badge variant={product.inStock ? "default" : "destructive"}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
            {product.inStock && product.quantity && (
              <span className="text-sm text-muted-foreground">
                {product.quantity} available
              </span>
            )}
          </div>

          {product.inStock && (
            <Button className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90" asChild>
              <a 
                href={`https://docs.google.com/forms/d/e/1FAIpQLSfYourFormId/viewform?usp=pp_url&entry.123456789=${encodeURIComponent(product.name)}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Order This Item
              </a>
            </Button>
          )}

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold">Classification</h3>
            <div className="space-y-2">
              {product.category && (
                <p><span className="font-medium">Category:</span> {product.category.name}</p>
              )}
              {product.collection && (
                <p><span className="font-medium">Collection:</span> {product.collection.name}</p>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold">Specifications</h3>
            <div className="space-y-2">
              {product.color && product.color.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.color.map((c, idx) => (
                    <Badge key={idx} variant="outline">{c.name}</Badge>
                  ))}
                </div>
              )}
              {product.materials && product.materials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((m, idx) => (
                    <Badge key={idx} variant="outline">{m.name}</Badge>
                  ))}
                </div>
              )}
              {product.weight && (
                <p><span className="font-medium">Weight:</span> {product.weight}g</p>
              )}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.sizeOptions.map((size, idx) => (
                    <Badge key={idx} variant="secondary">{size}</Badge>
                  ))}
                </div>
              )}
              {product.dimensions && formatDimensions() && (
                <p><span className="font-medium">Dimensions:</span> {formatDimensions()}</p>
              )}
            </div>
          </div>

          <Separator />

          {product.careInstructions && (
            <div className="space-y-2">
              <h3 className="font-semibold">Care Instructions</h3>
              <p className="text-muted-foreground">{product.careInstructions}</p>
            </div>
          )}

          <Separator />

          {product.description && (
            <div className="space-y-3">
              <h3 className="font-semibold">Description</h3>
              <PortableTextRenderer content={product.description} />
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold">SEO Settings</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Meta Title:</p>
                <p>{product.seo?.metaTitle || product.name}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Meta Description:</p>
                <p className="text-muted-foreground">
                  {product.seo?.metaDescription || product.shortDescription || 'No description'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}