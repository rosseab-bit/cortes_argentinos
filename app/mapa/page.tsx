import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MapaCortesPage } from "../../components/MapaCortesPage";
import { getCortes } from "../../lib/cortes";
import { parseLocale, translate } from "../../lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = parseLocale((await cookies()).get("locale")?.value);
  const title = translate(locale, "mapRouteTitle");
  const description = translate(locale, "mapRouteAria");
  const openGraphLocale = locale === "pt" ? "pt_BR" : locale === "en" ? "en_US" : "es_AR";
  return {
    title,
    description,
    alternates: { canonical: "/mapa" },
    openGraph: {
      type: "website",
      url: "https://cortefino.fyi/mapa",
      siteName: translate(locale, "appTitle").split(" — ")[0],
      title,
      description,
      locale: openGraphLocale
    },
    twitter: { card: "summary", title, description }
  };
}

export default function MapaPage() {
  return <MapaCortesPage cortes={getCortes()} />;
}
