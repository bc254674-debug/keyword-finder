import Link from "next/link";
import type { Keyword } from "@/lib/types";
import KeywordCard from "@/components/keyword/KeywordCard";

interface Props {
  keywords: Keyword[];
}

export default function TrendingKeywords({ keywords }: Props) {
  if (!keywords.length) return null;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          Trending Blue-Ocean Keywords
        </h2>
        <Link
          href="/trending"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keywords.map((kw) => (
          <KeywordCard key={kw.id} keyword={kw} />
        ))}
      </div>
    </section>
  );
}
