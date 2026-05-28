"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { seedKeywords, seedCategories } from "@/lib/seed-data";
import KeywordCard from "@/components/keyword/KeywordCard";
import Pagination from "@/components/ui/Pagination";

const PER_PAGE = 20;

function matchQuery(keyword: string, categoryName: string, query: string): boolean {
  const tWords = `${keyword} ${categoryName}`.toLowerCase().split(/\s+/);
  const qWords = query.toLowerCase().split(/\s+/);
  return qWords.some((qw) =>
    tWords.some((tw) => tw.includes(qw) || qw.includes(tw))
  );
}

export default function TrendingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const query = searchParams.get("q") || "";

  const enriched = useMemo(() => {
    return seedKeywords.map((k) => {
      const cat = seedCategories.find((c) => c.id === k.category_id);
      return { ...k, categoryName: cat?.name || "" };
    });
  }, []);

  const filtered = query
    ? enriched.filter((k) => matchQuery(k.keyword, k.categoryName, query))
    : enriched;

  const handleDeleteQuery = useCallback(() => {
    router.push("/trending");
  }, [router]);

  const displayKeywords = filtered;
  const totalPages = Math.max(1, Math.ceil(displayKeywords.length / PER_PAGE));

  return (
    <>
      {query && (
        <p className="mb-6 text-sm">
          <span className="text-zinc-400">Results for </span>
          <span className="font-medium text-zinc-700">&ldquo;{query}&rdquo;</span>
          <span className="text-zinc-400">
            {" "}
            — {displayKeywords.length} keyword{displayKeywords.length !== 1 ? "s" : ""} found
          </span>
          <button
            onClick={handleDeleteQuery}
            className="ml-3 text-blue-600 hover:text-blue-700 underline text-xs"
          >
            Clear search
          </button>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayKeywords
          .slice((page - 1) * PER_PAGE, page * PER_PAGE)
          .map((kw) => (
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
    </>
  );
}
