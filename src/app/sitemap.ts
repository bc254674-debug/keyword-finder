import type { MetadataRoute } from "next";
import { getAllKeywordSlugs, getAllCategorySlugs } from "@/lib/supabase";
import { seedKeywords, seedCategories } from "@/lib/seed-data";

const BASE_URL = "https://www.keywordfind.asia";

async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  const timer = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  return Promise.race([promise, timer]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [kwSlugs, catSlugs] = await Promise.all([
    withTimeout(getAllKeywordSlugs(), 5000, []),
    withTimeout(getAllCategorySlugs(), 5000, []),
  ]);

  const kSlugs = kwSlugs.length > 0 ? kwSlugs : seedKeywords.map((k) => ({ slug: k.slug, last_updated: k.last_updated }));
  const cSlugs = catSlugs.length > 0 ? catSlugs : seedCategories.map((c) => ({ slug: c.slug }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/trending`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/blog/what-are-blue-ocean-keywords`, lastModified: "2025-05-10", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/how-to-find-low-competition-keywords`, lastModified: "2025-05-12", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/content-strategy-for-niche-sites`, lastModified: "2025-05-14", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/geo-ai-search-keywords-guide`, lastModified: "2025-05-16", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/consumer-search-intent-keywords`, lastModified: "2025-05-17", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/free-keyword-research-no-paid-tools`, lastModified: "2025-05-19", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/what-is-keyword-difficulty-how-to-judge`, lastModified: "2025-05-20", changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/internal-linking-for-seo-guide`, lastModified: "2025-05-22", changeFrequency: "monthly", priority: 0.6 },
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
