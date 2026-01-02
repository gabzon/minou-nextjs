"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type Language, DICTIONARY, getLocalizedValue } from "./utils/i18n-helpers";

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Helper for static UI labels
  getLocalized: (value: unknown) => unknown; // Helper for Sanity data
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("minou-lang") as Language;
    if (saved && (saved === "en" || saved === "hr")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("minou-lang", lang);
  };

  const t = (key: string): string => {
    return DICTIONARY[key]?.[language] || key;
  };

  const getLocalized = (value: unknown): unknown => {
    return getLocalizedValue(value, language);
  };

  // Prevent hydration mismatch by not rendering anything until mounted
  // OR rendering a fallback. 
  // If we render null, the page is blank for a split second.
  // If we render with 'en' default, it might flicker to 'hr'.
  // flicker is better than blank for SEO (though this is client-side context anyway).
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, getLocalized }}>
      {/* We only show the UI after mounting to ensure localStorage is respected 
          and we don't get hydration errors. */}
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}