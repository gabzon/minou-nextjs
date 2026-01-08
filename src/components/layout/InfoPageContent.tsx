"use client";

import { useLanguage } from "@/lib/i18n";
import PortableTextRenderer from "@/app/product/[slug]/components/PortableText";

interface InfoPageContentProps {
  title: string;
  titleKey?: string;
  content: unknown; // Localized block content
}

export default function InfoPageContent({ title, titleKey, content }: InfoPageContentProps) {
  const { getLocalized, t } = useLanguage();
  const localizedContent = getLocalized(content);
  
  const displayTitle = titleKey ? t(titleKey) : title;

  return (
    <main className="pb-20 pt-10">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-10">{displayTitle}</h1>
        <div className="prose prose-rose dark:prose-invert max-w-none">
          <PortableTextRenderer content={localizedContent as Parameters<typeof PortableTextRenderer>[0]['content']} />
        </div>
      </div>
    </main>
  );
}
