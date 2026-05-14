import { scoreToStars } from "@/lib/utils";

export default function OpportunityBadge({ score }: { score: number }) {
  const stars = scoreToStars(score);

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${
        stars >= 4
          ? "bg-green-100 text-green-700"
          : stars >= 3
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
      }`}
    >
      <span className="text-xs tracking-tight">
        {Array.from({ length: 5 }, (_, i) => (i < stars ? "★" : "☆"))}
      </span>
      <span>{score.toFixed(0)}</span>
    </span>
  );
}
