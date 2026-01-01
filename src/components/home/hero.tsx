import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="px-4 pt-4 pb-2">
      <div className="relative w-full aspect-[9/14] sm:aspect-[9/16] rounded-[2rem] overflow-hidden group shadow-lg bg-muted">
        {/* Background Image Placeholder */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1611085583191-a3b136340921?auto=format&fit=crop&q=80&w=1000")' 
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        
        {/* Content */}
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
    </section>
  )
}
