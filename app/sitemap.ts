import type { MetadataRoute } from "next";
import { getCortes } from "../lib/cortes";

export const dynamic = "force-dynamic";

const siteUrl = "https://cortefino.fyi";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/mapa`, changeFrequency: "monthly", priority: 0.8 }
  ];

  for (const corte of getCortes()) {
    pages.push({
      url: `${siteUrl}/cortes/${encodeURIComponent(corte.slug)}`,
      changeFrequency: "monthly",
      priority: 0.7
    });
  }

  return pages;
}
