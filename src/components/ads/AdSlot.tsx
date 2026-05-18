interface AdSlotProps {
  position: "leaderboard" | "rectangle" | "halfpage" | "large-rectangle";
  className?: string;
}

const sizeMap = {
  leaderboard: { w: 728, h: 90, label: "Ad · 728×90", monetagSlot: "leaderboard" },
  rectangle: { w: 300, h: 250, label: "Ad · 300×250", monetagSlot: "rectangle" },
  halfpage: { w: 300, h: 600, label: "Ad · 300×600", monetagSlot: "halfpage" },
  "large-rectangle": { w: 336, h: 280, label: "Ad · 336×280", monetagSlot: "large-rectangle" },
};

export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const { w, h, label, monetagSlot } = sizeMap[position];
  const siteId = process.env.NEXT_PUBLIC_MONETAG_SITE_ID;

  if (siteId) {
    return (
      <div
        className={`mx-auto ${className}`}
        style={{ maxWidth: w, minHeight: h }}
        data-monetag-slot={monetagSlot}
      >
        <div
          className="flex items-center justify-center w-full h-full rounded-2xl bg-zinc-50/50 border border-dashed border-zinc-200/60"
          style={{ minHeight: h }}
        >
          <span className="text-xs text-zinc-300 font-medium tracking-wide uppercase">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-200/60 ${className}`}
      style={{ maxWidth: w, minHeight: h }}
    >
      <span className="text-xs text-zinc-300 font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}
