import { competitionLabel, competitionColor } from "@/lib/utils";

export default function CompetitionMeter({ score }: { score: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Competition</span>
        <span>{competitionLabel(score)}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${competitionColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
