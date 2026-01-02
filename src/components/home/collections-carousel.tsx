"use client";

import Link from "next/link"
import { urlFor } from "@/sanity/client"
import { type SanityImageSource } from "@sanity/image-url"
import { useLanguage } from "@/lib/i18n"

interface Collection {
  _id: string
  name: unknown
  slug: string
  image: SanityImageSource
}

interface CollectionsCarouselProps {
  collections: Collection[]
}

export function CollectionsCarousel({ collections }: CollectionsCarouselProps) {
  const { t, getLocalized } = useLanguage();

  if (!collections || collections.length === 0) return null

  return (
    <section className="pt-8 pb-4">
      <div className="container mx-auto max-w-7xl px-0">
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-xl font-bold tracking-tight">{t('nav.collections')}</h2>
        </div>
        
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory">
          {collections.map((collection) => (
          <Link 
            key={collection._id} 
            href={`/shop?collection=${collection.slug}`}
            className="flex flex-col gap-2 min-w-[calc(50%-1rem)] sm:min-w-[calc(33.33%-1rem)] lg:min-w-[calc(16.66%-1rem)] snap-start group cursor-pointer"
          >
            <div className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden relative shadow-md">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: collection.image ? `url(${urlFor(collection.image).width(400).url()})` : undefined }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <p className="text-xs font-bold text-center group-hover:text-primary transition-colors">
              {getLocalized(collection.name) as string}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </section>
  )
}
