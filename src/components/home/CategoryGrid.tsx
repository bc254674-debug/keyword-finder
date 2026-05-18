import Link from "next/link";
import type { Category } from "@/lib/types";

const iconMap: Record<string, string> = {
  health: "🏥", finance: "💰", pets: "🐾", food: "🍳", tech: "💻",
  travel: "✈️", home: "🏠", fashion: "👗", education: "📚", sports: "⚽",
  beauty: "💄", business: "📊", automotive: "🚗", gardening: "🌱", parenting: "👶",
};

interface Props { categories: Category[] }

export default function CategoryGrid({ categories }: Props) {
  if (!categories.length) return null;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Browse keywords by niche
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            AI-optimized, consumer-intent keywords organized by market vertical
          </p>
        </div>
        <Link
          href="/categories"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-zinc-200/50 border border-transparent hover:border-zinc-200/80 transition-all duration-200 text-center"
          >
            <span className="text-2xl">{iconMap[cat.icon] || "📌"}</span>
            <span className="font-medium text-sm text-zinc-700">{cat.name}</span>
            <span className="text-xs text-zinc-400">{cat.keyword_count} keywords</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
