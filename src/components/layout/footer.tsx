"use client"

import { Mail, Instagram, Facebook, Youtube } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export interface FooterSettings {
  contactEmail?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  }
}

interface FooterProps {
  settings?: FooterSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const { t } = useLanguage();

  const socialLinks = settings?.socialLinks;
  const contactEmail = settings?.contactEmail;

  return (
    <footer className="bg-card dark:bg-card py-12 px-6 text-center border-t border-border mt-auto">
      <div className="max-w-xs mx-auto mb-8">
        <h3 className="font-bold text-lg mb-2">{t('footer.joinClub')}</h3>
        <p className="text-muted-foreground text-sm mb-4">{t('footer.newsletterDesc')}</p>
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
            {t('footer.subscribe')}
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex justify-center gap-6">
          {contactEmail && (
            <a 
              href={`mailto:${contactEmail}`} 
              className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
              aria-label="Email Us"
            >
              <Mail className="h-6 w-6" />
            </a>
          )}
          
          {socialLinks?.instagram && (
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          )}

          {socialLinks?.facebook && (
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
          )}

          {socialLinks?.tiktok && (
            <a 
              href={socialLinks.tiktok} 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-6 w-6" />
            </a>
          )}

          {socialLinks?.youtube && (
            <a 
              href={socialLinks.youtube} 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform"
              aria-label="YouTube"
            >
              <Youtube className="h-6 w-6" />
            </a>
          )}
        </div>
        {/* Removed text email as requested */}
      </div>

      <div className="flex justify-center gap-4 text-xs font-semibold text-muted-foreground mb-6">
        <Link href="/shipping" className="hover:text-primary transition-colors">{t('footer.shipping')}</Link>
        <span className="text-border">•</span>
        <Link href="/returns" className="hover:text-primary transition-colors">{t('footer.returns')}</Link>
        <span className="text-border">•</span>
        <Link href="/faq" className="hover:text-primary transition-colors">{t('footer.faq')}</Link>
      </div>

      <p className="text-[10px] text-muted-foreground/60">
        © {new Date().getFullYear()} Minou Jewelry. {t('footer.madeWithLove')}
      </p>
    </footer>
  );
}