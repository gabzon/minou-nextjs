import { client } from "@/sanity/client";
import InfoPageContent from "@/components/layout/InfoPageContent";

interface SiteSettings {
  about: any;
  aboutImage?: any;
}

export default async function AboutPage() {
  const settings = await client.fetch<SiteSettings>(`*[_type == "siteSettings"][0]{ about, aboutImage }`);

  return (
    <InfoPageContent
      title="About Minou"
      titleKey="nav.about"
      content={settings?.about}
      image={settings?.aboutImage}
    />
  );
}
