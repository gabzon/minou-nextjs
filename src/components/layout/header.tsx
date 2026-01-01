"use client"

import * as React from "react"
import { Menu, ShoppingBag } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 py-3 relative">
        {/* Left: Menu */}
        <div className="flex items-center">
          <button 
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
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
          {/* Language Toggle Placeholder */}
          <button className="text-xs font-bold px-2 py-1 rounded-full hover:bg-muted text-muted-foreground transition-colors uppercase">
            HR
          </button>
          
          <ModeToggle />
          
          <button 
            className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors relative"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-2 right-1.5 w-2 h-2 bg-primary rounded-full ring-1 ring-background" />
          </button>
        </div>
      </div>
    </header>
  )
}
