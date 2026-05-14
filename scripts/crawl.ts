/**
 * BlueOcean Keyword Crawler
 *
 * Fetches keyword suggestions from Google Suggest API,
 * estimates search volume via Google Trends, and computes
 * competition scores via allintitle result counts.
 *
 * Run: npx tsx scripts/crawl.ts
 * Scheduled via: .github/workflows/crawl.yml
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

interface RawKeyword {
  keyword: string;
  source: string;
}

async function fetchGoogleSuggest(query: string): Promise<string[]> {
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BlueOceanBot/1.0)" },
    });
    const data = await res.json();
    return (data[1] || []) as string[];
  } catch (err) {
    console.error(`Suggest fetch failed for "${query}":`, err);
    return [];
  }
}

async function fetchGoogleTrends(keyword: string): Promise<{
  score: number;
  direction: "up" | "down" | "stable";
}> {
  // Simplified trend estimation using Google Trends unofficial API
  // In production, use pytrends or a paid Trends API
  try {
    const url = `https://trends.google.com/trends/api/explore?q=${encodeURIComponent(keyword)}&hl=en-US&tz=0`;
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const text = await res.text();

    // Parse the embedded JSON from Google Trends response
    const jsonMatch = text.match(/\{.*\}/);
    if (!jsonMatch) return { score: 50, direction: "stable" };

    const trendData = JSON.parse(jsonMatch);
    const timelineData =
      trendData?.widgets?.[0]?.data?.default?.timelineData || [];

    if (!timelineData.length) return { score: 50, direction: "stable" };

    const values: number[] = timelineData
      .map((d: { value: number[] }) => d.value?.[0] || 0)
      .filter((v: number) => v > 0);

    if (values.length < 3) return { score: 50, direction: "stable" };

    const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length;
    const recent = values.slice(-4).reduce((a: number, b: number) => a + b, 0) / Math.min(4, values.slice(-4).length);

    const normalized = Math.min(100, Math.round((avg / 100) * 100));
    const direction =
      recent > avg * 1.1 ? "up" : recent < avg * 0.9 ? "down" : "stable";

    return { score: normalized, direction };
  } catch {
    return { score: 50, direction: "stable" };
  }
}

async function fetchAllintitleCount(keyword: string): Promise<number> {
  try {
    const url = `https://www.google.com/search?q=allintitle:${encodeURIComponent(`"${keyword}"`)}&hl=en`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BlueOceanBot/1.0)" },
    });
    const html = await res.text();

    // Extract result count from "About X results"
    const match = html.match(/About ([\d,]+) results/);
    if (!match) return 100000;
    return parseInt(match[1].replace(/,/g, ""));
  } catch {
    return 100000;
  }
}

function computeOpportunityScore(
  trendScore: number,
  allintitleCount: number
): number {
  const competitionFactor = Math.sqrt(allintitleCount + 1);
  const raw = (trendScore * 100) / competitionFactor;
  return Math.min(100, Math.round(raw));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("[Crawler] Starting keyword discovery run...");

  const seedQueries = [
    "best", "how to", "DIY", "cheap", "easy", "homemade",
    "for beginners", "for seniors", "for small business", "free",
    "vs", "review", "alternative", "ideas", "guide",
  ];

  const allKeywords: RawKeyword[] = [];

  // Fetch suggestions for each seed query
  for (const query of seedQueries) {
    console.log(`  Fetching suggestions for: "${query}"`);
    const suggestions = await fetchGoogleSuggest(query);
    for (const s of suggestions) {
      allKeywords.push({ keyword: s, source: "suggest" });
    }
    // Be nice to Google's servers
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`  Collected ${allKeywords.length} raw suggestions.`);

  // Deduplicate
  const unique = allKeywords.filter(
    (kw, i, arr) =>
      arr.findIndex((k) => k.keyword.toLowerCase() === kw.keyword.toLowerCase()) === i
  );

  console.log(`  ${unique.length} unique keywords.`);

  // Process each keyword
  const results = [];
  for (const kw of unique.slice(0, 20)) {
    console.log(`  Analyzing: "${kw.keyword}"`);
    const [trends, allintitleCount] = await Promise.all([
      fetchGoogleTrends(kw.keyword),
      fetchAllintitleCount(kw.keyword),
    ]);

    const opportunity = computeOpportunityScore(trends.score, allintitleCount);

    results.push({
      slug: slugify(kw.keyword),
      keyword: kw.keyword,
      language: "en",
      trend_score: trends.score,
      trend_direction: trends.direction,
      result_count: allintitleCount,
      opportunity_score: opportunity,
      competition_score: Math.min(100, Math.round((allintitleCount / 1000000) * 100)),
      search_volume_estimate: Math.round(trends.score * 100),
      is_trending: opportunity >= 70,
      last_updated: new Date().toISOString(),
    });

    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`  Processed ${results.length} keywords.`);

  // Write to Supabase if configured
  if (SUPABASE_URL && SUPABASE_KEY) {
    console.log("  Writing to Supabase...");
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    for (const kw of results) {
      const { error } = await supabase.from("keywords").upsert(kw, {
        onConflict: "slug",
      });
      if (error) {
        console.error(`    Failed to upsert "${kw.keyword}":`, error.message);
      }
    }
    console.log("  Supabase write complete.");
  } else {
    console.log("  Supabase not configured. Results:");
    console.log(JSON.stringify(results.slice(0, 5), null, 2));
  }

  console.log("[Crawler] Done.");
}

main().catch(console.error);
