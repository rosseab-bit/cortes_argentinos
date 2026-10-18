import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"]
    },
    sitemap: "https://cortefino.fyi/sitemap.xml",
    host: "https://cortefino.fyi"
  };
}
