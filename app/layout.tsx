import type { ReactNode } from "react";
import { cookies } from "next/headers";
import Script from "next/script";
import { LocaleProvider } from "../components/LocaleProvider";
import { parseLocale, translate } from "../lib/i18n";
import "./globals.css";

export async function generateMetadata() {
  const locale = parseLocale((await cookies()).get("locale")?.value);
  const title = translate(locale, "appTitle");
  const description = translate(locale, "appDescription");
  const openGraphLocale = locale === "pt" ? "pt_BR" : locale === "en" ? "en_US" : "es_AR";
  return {
    metadataBase: new URL("https://cortefino.fyi"),
    title: { default: title, template: `%s | ${title.split(" — ")[0]}` },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "https://cortefino.fyi/",
      siteName: title.split(" — ")[0],
      title,
      description,
      locale: openGraphLocale,
      alternateLocale: ["es_AR", "en_US", "pt_BR"].filter((value) => value !== openGraphLocale)
    },
    twitter: { card: "summary", title, description },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = parseLocale((await cookies()).get("locale")?.value);
  return (
    <html lang={locale === "pt" ? "pt-BR" : locale === "en" ? "en" : "es-AR"}>
      <body>
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        <Script
          src="https://analytics.bitsar.com.ar/script.js"
          data-website-id="87fb1fb8-cd3e-49a0-a17f-5e0bf8aec098"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
