import type { MetadataRoute } from "next";
import { getAllKeywordSlugs, getAllCategorySlugs } from "@/lib/supabase";
import { seedKeywords, seedCategories } from "@/lib/seed-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://keywordfinder.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [kwSlugs, catSlugs] = await Promise.all([
    getAllKeywordSlugs(),
    getAllCategorySlugs(),
  ]);

  const kSlugs = kwSlugs.length > 0 ? kwSlugs : seedKeywords.map((k) => ({ slug: k.slug, last_updated: k.last_updated }));
  const cSlugs = catSlugs.length > 0 ? catSlugs : seedCategories.map((c) => ({ slug: c.slug }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/trending`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/blog/what-are-blue-ocean-keywords`, lastModified: "2025-05-10", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/how-to-find-low-competition-keywords`, lastModified: "2025-05-12", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/content-strategy-for-niche-sites`, lastModified: "2025-05-14", changeFrequency: "monthly", priority: 0.6 },
    ...cSlugs.map((c: { slug: string }) => ({
      url: `${BASE_URL}/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...kSlugs.map((k: { slug: string; last_updated?: string }) => ({
      url: `${BASE_URL}/keyword/${k.slug}`,
      lastModified: k.last_updated ? new Date(k.last_updated) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return staticPages;
}
