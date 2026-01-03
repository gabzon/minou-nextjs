"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import FilterContent from "./FilterContent";
import { useLanguage } from "@/lib/i18n";
import { type FilterOption } from "./ShopContent";

interface FilterSheetProps {
  filters: {
    genres: FilterOption[];
    collections: FilterOption[];
    categories: FilterOption[];
    colors: FilterOption[];
  };
  resolvedParams: { [key: string]: string | string[] | undefined };
}

export default function FilterSheet({ filters, resolvedParams }: FilterSheetProps) {
  const { t } = useLanguage();
  
  const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : undefined;
  const collection = typeof resolvedParams.collection === 'string' ? resolvedParams.collection : undefined;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const color = typeof resolvedParams.color === 'string' ? resolvedParams.color : undefined;
  
  const activeCount = [type, collection, category, color].filter(Boolean).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full lg:hidden h-10 px-4">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-bold text-xs uppercase tracking-widest">Filters</span>
          {activeCount > 0 && (
            <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[1.2rem]">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto rounded-t-[2rem] px-6">
        <SheetHeader className="pb-6 border-b mb-6">
          <SheetTitle className="text-left font-extrabold text-2xl">Filters</SheetTitle>
        </SheetHeader>
        <FilterContent 
          filters={filters} 
          resolvedParams={resolvedParams} 
          isMobile 
          className="flex-col items-start gap-10"
        />
        <div className="py-10">
           {/* Bottom spacing for scroll */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
