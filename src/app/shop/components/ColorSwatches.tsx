"use client";

import { cn } from "@/lib/utils";
import { type FilterOption } from "./ShopContent";

interface ColorSwatchesProps {
  colors: FilterOption[];
  selectedColor?: string;
  onSelect: (value: string) => void;
}

export default function ColorSwatches({ colors, selectedColor, onSelect }: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => {
        const value = c.slug || (c.name as string);
        return (
          <button
            key={c._id}
            type="button"
            onClick={() => onSelect(value)}
            title={c.name as string}
            className={cn(
              "w-6 h-6 rounded-full border border-black/10 transition-all hover:scale-110",
              selectedColor === value ? "ring-2 ring-primary ring-offset-2 scale-110" : "hover:border-primary/50"
            )}
            style={{ backgroundColor: c.hex }}
          >
            <span className="sr-only">{c.name as string}</span>
          </button>
        );
      })}
    </div>
  );
}
