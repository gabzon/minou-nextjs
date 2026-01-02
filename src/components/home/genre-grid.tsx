"use client";

import Link from "next/link"
import { urlFor } from "@/sanity/client"
import { type SanityImageSource } from "@sanity/image-url"
import { useLanguage } from "@/lib/i18n"

interface Genre {
  _id: string;
  name: unknown; // can be string or localized object
  slug: { current: string } | null; // Handle potential null slug if not migrated yet
  image?: SanityImageSource
}

interface GenreGridProps {
  genres: Genre[]
}

const FALLBACK_IMAGES: Record<string, string> = {
  "Rings": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400",
  "Earrings": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400",
  "Necklaces": "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=400",
  "Bracelets": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400",
  "default": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce33e?auto=format&fit=crop&q=80&w=400"
}

export function GenreGrid({ genres }: GenreGridProps) {
  const { t, getLocalized } = useLanguage();

  if (!genres || genres.length === 0) return null

  return (
    <section className="py-6 bg-card dark:bg-card my-4">
      <div className="container mx-auto max-w-7xl px-0">
        <div className="px-4 mb-5">
          <h2 className="text-xl font-bold tracking-tight">{t('common.shopByType')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {genres.map((genre) => {
            const name = getLocalized(genre.name);
            const slug = genre.slug?.current;
            
            // Fallback for image mapping using English name if possible, or just the localized one
            // We'll use the raw name object to try and find 'en' for mapping if available
            const enName = (genre.name as Record<string, unknown>)?.en as string || (typeof genre.name === 'string' ? genre.name : name);
            
            const imageUrl = genre.image 
              ? urlFor(genre.image).width(200).url()
              : (FALLBACK_IMAGES[enName as string] || FALLBACK_IMAGES["default"])

            if (!slug) return null; // Skip if no slug (sanity check)

            return (
              <Link 
                key={genre._id} 
                href={`/shop?type=${slug}`}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-muted group-hover:border-primary/50 transition-all overflow-hidden shadow-sm">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label={name as string}
                    style={{ backgroundImage: `url("${imageUrl}")` }}
                  />
                </div>
                <span className="text-sm font-bold group-hover:text-primary transition-colors">{name as string}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
