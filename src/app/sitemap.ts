import type { MetadataRoute } from "next";
import { services, sectors, articles } from "@/lib/content";

const BASE = "https://eseis-pestcontrol.fr";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url:             `${BASE}/services/${s.slug}`,
    lastModified:    new Date(),
    changeFrequency: "monthly",
    priority:        0.8,
  }));

  const sectorRoutes: MetadataRoute.Sitemap = sectors.map((s) => ({
    url:             `${BASE}/secteurs/${s.slug}`,
    lastModified:    new Date(),
    changeFrequency: "monthly",
    priority:        0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url:             `${BASE}/ressources/${a.slug}`,
    lastModified:    new Date(a.date),
    changeFrequency: "monthly",
    priority:        0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...sectorRoutes, ...articleRoutes];
}
