import type { Metadata } from "next";
import { Suspense } from "react";
import TrendingContent from "@/components/trending/TrendingContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Trending Keywords — High Opportunity, Low Competition | KeywordFinder",
  description:
    "Browse the hottest low-competition keywords with high ranking potential. Updated daily with fresh keyword opportunities across all niches.",
  alternates: {
    canonical: "/trending",
    languages: { "en-US": "/trending", "x-default": "/trending" },
  },
};

export default function TrendingPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
        Trending Keywords
      </h1>
      <p className="text-zinc-500 mb-8">
        Keywords with high opportunity scores that you can rank for right now.
      </p>

      <Suspense fallback={<div className="text-center py-10 text-zinc-400">Loading...</div>}>
        <TrendingContent />
      </Suspense>
    </div>
  );
}
