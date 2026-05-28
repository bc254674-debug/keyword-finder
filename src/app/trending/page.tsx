import type { Metadata } from "next";
import { seedKeywords, seedCategories } from "@/lib/seed-data";
import KeywordCard from "@/components/keyword/KeywordCard";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "Trending Keywords — High Opportunity, Low Competition | KeywordFinder",
  description:
    "Browse the hottest low-competition keywords with high ranking potential. Updated daily with fresh keyword opportunities across all niches.",
  alternates: {
    canonical: "/trending",
    languages: { "en-US": "/trending", "x-default": "/trending" },
  },
};

const PER_PAGE = 20;

function matchQuery(keyword: string, categoryName: string, query: string): boolean {
  const tWords = `${keyword} ${categoryName}`.toLowerCase().split(/\s+/);
  const qWords = query.toLowerCase().split(/\s+/);
  return qWords.some((qw) =>
    tWords.some((tw) => tw.includes(qw) || qw.includes(tw))
  );
}

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1"));
  const query = params.q || "";

  // Use seed data directly — no Supabase dependency
  const enriched = seedKeywords.map((k) => {
    const cat = seedCategories.find((c) => c.id === k.category_id);
    return { ...k, categoryName: cat?.name || "" };
  });

  const filtered = query
    ? enriched.filter((k) => matchQuery(k.keyword, k.categoryName, query))
    : enriched;

  const displayKeywords = filtered;
  const totalPages = Math.max(1, Math.ceil(displayKeywords.length / PER_PAGE));

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
        Trending Keywords
      </h1>
      <p className="text-zinc-500 mb-8">
        Keywords with high opportunity scores that you can rank for right now.
      </p>

      {query && (
        <p className="mb-6 text-sm">
          <span className="text-zinc-400">Results for </span>
          <span className="font-medium text-zinc-700">&ldquo;{query}&rdquo;</span>
          <span className="text-zinc-400"> — {displayKeywords.length} keyword{displayKeywords.length !== 1 ? "s" : ""} found</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayKeywords
          .slice((page - 1) * PER_PAGE, page * PER_PAGE)
          .map((kw, i) => (
            <div key={kw.id}>
              <KeywordCard keyword={kw} />
            </div>
          ))}
      </div>

      {displayKeywords.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔎</p>
          <p className="text-zinc-600 font-medium mb-1">No keywords found</p>
          <p className="text-zinc-400 text-sm">
            Try a different search term or browse{" "}
            <a href="/categories" className="text-blue-600 hover:underline">
              all categories
            </a>
            .
          </p>
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/trending"
      />
    </div>
  );
}
