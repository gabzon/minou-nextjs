import { client } from "@/sanity/client";
import InfoPageContent from "@/components/layout/InfoPageContent";

export const runtime = 'edge';

export default async function ShippingPage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ shipping }`);

  return (
    <InfoPageContent 
      title="Shipping & Delivery" 
      content={settings?.shipping} 
    />
  );
}
