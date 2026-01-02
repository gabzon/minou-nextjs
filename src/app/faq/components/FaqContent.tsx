"use client";

import { useLanguage } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  _key: string;
  question: unknown;
  answer: unknown;
}

export default function FaqContent({ faqs }: { faqs: FaqItem[] }) {
  const { getLocalized } = useLanguage();

  return (
    <main className="pb-20 pt-10">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-center">FAQ</h1>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item) => (
            <AccordionItem key={item._key} value={item._key}>
              <AccordionTrigger className="text-left font-bold py-6 hover:text-primary transition-colors">
                {getLocalized(item.question) as string}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 whitespace-pre-line">
                {getLocalized(item.answer) as string}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
