"use client";

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { urlFor } from '@/sanity/client'
import { type SanityImageSource } from "@sanity/image-url"
import { useLanguage } from "@/lib/i18n"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Product {
  _id: string
  name: unknown // localized
  slug: { current: string }
  price: number
  images: SanityImageSource[]
}

interface HeroProps {
  featuredProducts?: Product[]
  coverImage?: SanityImageSource
}

export function Hero({ featuredProducts = [], coverImage }: HeroProps) {
  const { getLocalized, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 1 + (featuredProducts?.length || 0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Calculate active index based on scroll position and item width
      // In mobile/tablet, items are roughly 50% or 100% width, but snap logic handles the alignment.
      // We can approximate by dividing scrollLeft by the width of the first child or just clientWidth if 1 item per view.
      // Given the complex breakpoints (w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]), simpler is better:
      // use the center point.

      const itemWidth = scrollRef.current.children[0]?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(0, index), totalSlides - 1));
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      // Initial check
      handleScroll();
    }

    return () => el?.removeEventListener('scroll', handleScroll);
  }, [totalSlides]);

  return (
    <section className="px-4 pt-4 pb-2 relative group/hero">
      <div className="container mx-auto max-w-7xl px-0">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >

          {/* 1. Branding / Intro Card */}
          <div className="snap-center shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] aspect-[9/14] sm:aspect-[9/16] rounded-[2rem] overflow-hidden group shadow-lg bg-muted relative">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url("${coverImage ? urlFor(coverImage).url() : 'https://images.unsplash.com/photo-1611085583191-a3b136340921?auto=format&fit=crop&q=80&w=1000'}")`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start gap-4">
              <div className="flex flex-col gap-1">
                {/* <span className="px-3 py-1 bg-accent-butter text-foreground text-[10px] font-bold rounded-full w-fit uppercase tracking-wider">
                  {t("hero.newSeason")}
                </span> */}
                <h2 className="text-white text-4xl font-extrabold leading-[1.1] tracking-tight drop-shadow-sm whitespace-pre-line">
                  {t("hero.title")}
                </h2>
                <p className="text-white/90 text-sm font-medium mt-1 max-w-[200px]">
                  {t("hero.description")}
                </p>
              </div>
              <Link
                href="/shop"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/30"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 2. Featured Products */}
          {featuredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug.current}`}
              className="snap-center shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] aspect-[9/14] sm:aspect-[9/16] rounded-[2rem] overflow-hidden group shadow-md bg-muted relative"
            >
              {product.images?.[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(product.images[0]).width(600).height(1067).url()}
                  alt={getLocalized(product.name) as string}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Product Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 w-full p-6 mb-3 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-lg truncate drop-shadow-md">{getLocalized(product.name) as string}</h3>
                <p className="text-white/90 font-medium text-sm drop-shadow-md">{product.price} €</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile/Tablet Indicators */}
        <div className="flex justify-center gap-2 mt-2 lg:hidden">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-primary/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}