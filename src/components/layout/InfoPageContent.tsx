"use client";

import { useLanguage } from "@/lib/i18n";
import PortableTextRenderer from "@/app/product/[slug]/components/PortableText";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface InfoPageContentProps {
  title: string;
  titleKey?: string;
  content: unknown; // Localized block content
  image?: any;
}

export default function InfoPageContent({ title, titleKey, content, image }: InfoPageContentProps) {
  const { getLocalized, t } = useLanguage();
  const localizedContent = getLocalized(content);
  
  const displayTitle = titleKey ? t(titleKey) : title;

  return (
    <main className="pb-20 pt-10">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-10">{displayTitle}</h1>
        
        {image && (
          <div className="mb-10 overflow-hidden rounded-3xl">
            <Image
              src={urlFor(image).url()}
              alt={displayTitle}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-rose dark:prose-invert max-w-none">
          <PortableTextRenderer content={localizedContent as Parameters<typeof PortableTextRenderer>[0]['content']} />
        </div>
      </div>
    </main>
  );
}
