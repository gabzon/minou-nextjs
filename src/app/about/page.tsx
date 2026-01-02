import { client } from "@/sanity/client";
import InfoPageContent from "@/components/layout/InfoPageContent";

export const runtime = 'edge';

export default async function AboutPage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ about }`);

  return (
    <InfoPageContent 
      title="About Minou" 
      content={settings?.about} 
    />
  );
}
