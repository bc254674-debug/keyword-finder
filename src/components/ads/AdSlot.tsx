interface AdSlotProps {
  position: "leaderboard" | "rectangle" | "halfpage" | "large-rectangle";
  className?: string;
}

const sizeMap = {
  leaderboard: { w: 728, h: 90, label: "Ad · 728×90" },
  rectangle: { w: 300, h: 250, label: "Ad · 300×250" },
  halfpage: { w: 300, h: 600, label: "Ad · 300×600" },
  "large-rectangle": { w: 336, h: 280, label: "Ad · 336×280" },
};

export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const { w, h, label } = sizeMap[position];

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
