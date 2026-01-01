import { Mail, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card dark:bg-card py-12 px-6 text-center border-t border-border mt-auto">
      <div className="max-w-xs mx-auto mb-8">
        <h3 className="font-bold text-lg mb-2">Join the Club</h3>
        <p className="text-muted-foreground text-sm mb-4">Get updates on new drops and exclusive offers.</p>
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="px-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
          <button 
            type="submit" 
            className="bg-primary text-white py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-all active:scale-95"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="flex justify-center gap-6 mb-8">
        <a 
          href="mailto:hello@minou.com" 
          className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
        >
          <Mail className="h-6 w-6" />
        </a>
        <a 
          href="https://instagram.com/minou" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
        >
          <Instagram className="h-6 w-6" />
        </a>
      </div>

      <div className="flex justify-center gap-4 text-xs font-semibold text-muted-foreground mb-6">
        <a href="#" className="hover:text-primary transition-colors">Shipping</a>
        <span className="text-border">•</span>
        <a href="#" className="hover:text-primary transition-colors">Returns</a>
        <span className="text-border">•</span>
        <a href="#" className="hover:text-primary transition-colors">FAQ</a>
      </div>

      <p className="text-[10px] text-muted-foreground/60">
        © {new Date().getFullYear()} Minou Jewelry. Handmade with love.
      </p>
    </footer>
  );
}
