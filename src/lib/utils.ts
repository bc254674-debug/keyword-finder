export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function scoreToStars(score: number): number {
  if (score >= 80) return 5;
  if (score >= 60) return 4;
  if (score >= 40) return 3;
  if (score >= 20) return 2;
  return 1;
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-lime-600";
  if (score >= 40) return "text-yellow-600";
  if (score >= 20) return "text-orange-600";
  return "text-red-600";
}

export function scoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-100";
  if (score >= 60) return "bg-lime-100";
  if (score >= 40) return "bg-yellow-100";
  if (score >= 20) return "bg-orange-100";
  return "bg-red-100";
}

export function competitionLabel(score: number): string {
  if (score <= 20) return "Very Low";
  if (score <= 40) return "Low";
  if (score <= 60) return "Medium";
  if (score <= 80) return "High";
  return "Very High";
}

export function competitionColor(score: number): string {
  if (score <= 20) return "bg-green-500";
  if (score <= 40) return "bg-lime-500";
  if (score <= 60) return "bg-yellow-500";
  if (score <= 80) return "bg-orange-500";
  return "bg-red-500";
}

export function trendIcon(direction: string): string {
  if (direction === "up") return "↗";
  if (direction === "down") return "↘";
  return "→";
}

export function trendColor(direction: string): string {
  if (direction === "up") return "text-green-600";
  if (direction === "down") return "text-red-600";
  return "text-gray-500";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}
