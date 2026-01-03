"use client";

import { useLanguage } from "@/lib/i18n";
import { type FilterOption } from "./ShopContent";

interface CategorySelectProps {
  categories: FilterOption[];
  selectedCategory?: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({ categories, selectedCategory, onChange }: CategorySelectProps) {
  const { getLocalized, t } = useLanguage();

  return (
    <select
      value={selectedCategory || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer hover:border-primary/50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: `right 0.5rem center`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `1.5em 1.5em`,
        paddingRight: `2.5rem`
      }}
    >
      <option value="">{t('shop.filters.all') || 'All'}</option>
      {categories.map((c) => (
        <option key={c._id} value={c.slug ?? ""}>
          {getLocalized(c.name) as string}
        </option>
      ))}
    </select>
  );
}
