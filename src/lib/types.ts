export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  icon: string;
  keyword_count: number;
  created_at: string;
}

export interface Keyword {
  id: number;
  slug: string;
  keyword: string;
  category_id: number;
  language: "en" | "zh";
  search_volume_estimate: number;
  trend_direction: "up" | "down" | "stable";
  trend_score: number;
  competition_score: number;
  opportunity_score: number;
  result_count: number;
  top_domains: string[];
  content_suggestion: string;
  related_keywords: string[];
  faq: { q: string; a: string }[];
  is_trending: boolean;
  last_updated: string;
  created_at: string;
  category?: Category;
}

export interface AdSlotConfig {
  id: string;
  position: "leaderboard" | "rectangle" | "halfpage" | "large-rectangle";
  className?: string;
}
