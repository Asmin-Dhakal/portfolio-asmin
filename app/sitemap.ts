import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: site.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  };
  const archive = {
    url: `${site.url}/projects`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  };
  const cases = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [home, archive, ...cases];
}
