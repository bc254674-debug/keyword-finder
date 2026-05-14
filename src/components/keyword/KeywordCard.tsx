import Link from "next/link";
import type { Keyword } from "@/lib/types";
import { trendIcon, trendColor, formatNumber } from "@/lib/utils";

function scoreBar(score: number) {
  const color =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
        ? "bg-lime-500"
        : score >= 40
          ? "bg-amber-500"
          : "bg-zinc-400";
  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="h-1.5 flex-1 bg-zinc-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium text-zinc-400 tabular-nums w-8 text-right">
        {score.toFixed(0)}
      </span>
    </div>
  );
}

export default function KeywordCard({ keyword }: { keyword: Keyword }) {
  return (
    <Link
      href={`/keyword/${keyword.slug}`}
      className="group block p-5 bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
          {keyword.keyword}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <div className="text-zinc-400 text-xs mb-0.5">Volume</div>
          <div className="font-semibold text-zinc-700 tabular-nums">
            {formatNumber(keyword.search_volume_estimate)}
          </div>
        </div>
        <div>
          <div className="text-zinc-400 text-xs mb-0.5">Results</div>
          <div className="font-semibold text-zinc-700 tabular-nums">
            {formatNumber(keyword.result_count)}
          </div>
        </div>
        <div>
          <div className="text-zinc-400 text-xs mb-0.5">Trend</div>
          <div className={`font-semibold tabular-nums ${trendColor(keyword.trend_direction)}`}>
            {trendIcon(keyword.trend_direction)} {keyword.trend_score.toFixed(0)}
          </div>
        </div>
      </div>

      {scoreBar(keyword.opportunity_score)}

      {keyword.category && (
        <span className="inline-block mt-3 text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
          {keyword.category.name}
        </span>
      )}
    </Link>
  );
}
