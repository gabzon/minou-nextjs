import { client } from "@/sanity/client";
import InfoPageContent from "@/components/layout/InfoPageContent";



export default async function ReturnsPage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ returns }`);

  return (
    <InfoPageContent
      title="Returns & Exchanges"
      titleKey="nav.returns"
      content={settings?.returns}
    />
  );
}
