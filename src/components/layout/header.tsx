"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { href: "/about", label: "nav.about" },
    { href: "/custom-orders", label: "nav.customOrders" },
    { href: "/shipping", label: "nav.shipping" },
    { href: "/returns", label: "nav.returns" },
    { href: "/faq", label: "nav.faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 py-3 relative">
        {/* Left: Menu */}
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button 
                className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] px-6">
              <SheetHeader className="text-left px-0">
                <SheetTitle className="text-2xl font-extrabold text-primary font-display">
                  Minou
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-bold hover:text-primary transition-colors border-b border-border pb-2"
                  >
                    {t(link.label)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <h1 className="text-xl font-extrabold tracking-tight text-primary font-display">
              Minou
            </h1>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(language === "en" ? "hr" : "en")}
            className="text-xs font-bold px-2 py-1 rounded-full hover:bg-muted text-muted-foreground transition-colors uppercase min-w-[2rem]"
          >
            {language === "en" ? "hr" : "en"}
          </button>
          
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
