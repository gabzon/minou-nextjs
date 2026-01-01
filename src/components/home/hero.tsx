import { ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from '@/sanity/client'

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source)
}

interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[]
}

interface HeroProps {
  featuredProducts?: Product[]
}

export function Hero({ featuredProducts = [] }: HeroProps) {
  return (
    <section className="px-4 pt-4 pb-2">
      <div className="container mx-auto max-w-7xl px-0">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          
          {/* 1. Branding / Intro Card */}
          <div className="snap-center shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] aspect-[9/14] sm:aspect-[9/16] rounded-[2rem] overflow-hidden group shadow-lg bg-muted relative">
             <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1611085583191-a3b136340921?auto=format&fit=crop&q=80&w=1000")' 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start gap-4">
              <div className="flex flex-col gap-1">
                <span className="px-3 py-1 bg-accent-butter text-foreground text-[10px] font-bold rounded-full w-fit uppercase tracking-wider">
                  New Season
                </span>
                <h2 className="text-white text-4xl font-extrabold leading-[1.1] tracking-tight drop-shadow-sm">
                  Wear the<br />Joy.
                </h2>
                <p className="text-white/90 text-sm font-medium mt-1 max-w-[200px]">
                  Handmade jewelry for your everyday play.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/30">
                Shop New Drops
                <ArrowRight className="h-4 w-4" />
              </button>
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
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              {/* Product Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-lg truncate drop-shadow-md">{product.name}</h3>
                <p className="text-white/90 font-medium text-sm drop-shadow-md">${product.price}</p>
              </div>

              <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95">
                <ShoppingBag className="h-5 w-5 fill-current" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
