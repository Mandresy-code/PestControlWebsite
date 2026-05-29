import type { MetadataRoute } from "next";
import { getServiceSlugs, getSectorSlugs, getArticleSlugs } from "@/lib/db";

const BASE = "https://eseis-pestcontrol.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, sectorSlugs, articleSlugs] = await Promise.all([
    getServiceSlugs(),
    getSectorSlugs(),
    getArticleSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/secteurs`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/methode`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/a-propos`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ressources`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/diagnostic`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/contact`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8,
  }));

  const sectorRoutes: MetadataRoute.Sitemap = sectorSlugs.map((slug) => ({
    url: `${BASE}/secteurs/${slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${BASE}/ressources/${slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...sectorRoutes, ...articleRoutes];
}
