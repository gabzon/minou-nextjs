import { client } from "@/sanity/client";
import InfoPageContent from "@/components/layout/InfoPageContent";

export const runtime = 'edge';

export default async function CustomOrdersPage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ customOrders }`);

  return (
    <InfoPageContent 
      title="Custom Orders" 
      content={settings?.customOrders} 
    />
  );
}
