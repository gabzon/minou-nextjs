import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/lib/i18n";
import { client } from "@/sanity/client";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minou Jewelry",
  description: "Handmade jewelry for your everyday play.",
};

async function getSiteSettings() {
  try {
    const data = await client.fetch(`*[_type == "siteSettings"][0]{
      email,
      instagram,
      facebook,
      tiktok,
      youtube
    }`);

    if (!data) return null;

    return {
      contactEmail: data.email,
      socialLinks: {
        instagram: data.instagram,
        facebook: data.facebook,
        tiktok: data.tiktok,
        youtube: data.youtube,
      },
    };
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakartaSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <MainLayout>
              <Header />
              {children}
              <Footer settings={settings} />
            </MainLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}