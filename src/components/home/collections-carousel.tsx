import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const SAMPLE_COLLECTIONS = [
  { id: 1, title: "Summer Rays", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=400" },
  { id: 2, title: "Winter Sparkle", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce33e?auto=format&fit=crop&q=80&w=400" },
  { id: 3, title: "Everyday Fun", image: "https://images.unsplash.com/photo-1535633302723-997f85430cde?auto=format&fit=crop&q=80&w=400" },
  { id: 4, title: "Gold Essentials", image: "https://images.unsplash.com/photo-1611085583191-a3b136340921?auto=format&fit=crop&q=80&w=400" },
]

export function CollectionsCarousel() {
  return (
    <section className="pt-8 pb-4">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight">Collections</h2>
        <Link 
          href="/collections" 
          className="text-sm font-semibold text-primary flex items-center gap-0.5"
        >
          See All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x no-scrollbar">
        {SAMPLE_COLLECTIONS.map((collection) => (
          <div 
            key={collection.id} 
            className="flex flex-col gap-2 min-w-[120px] snap-start group cursor-pointer"
          >
            <div className="w-[120px] h-[160px] rounded-[2rem] overflow-hidden relative shadow-md">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <p className="text-xs font-bold text-center group-hover:text-primary transition-colors">
              {collection.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
