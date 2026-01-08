import { client } from "@/sanity/client";
import InfoPageContent from "@/components/layout/InfoPageContent";

export default async function AboutPage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ about }`);

  return (
    <InfoPageContent
      title="About Minou"
      titleKey="nav.about"
      content={settings?.about}
    />
  );
}
