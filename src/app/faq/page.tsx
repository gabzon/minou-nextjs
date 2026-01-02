import { client } from "@/sanity/client";
import FaqContent from "./components/FaqContent";

export const runtime = 'edge';

export default async function FaqPage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ faq }`);

  return (
    <FaqContent faqs={settings?.faq || []} />
  );
}
