import { getCategories, getTrendingKeywords } from "@/lib/supabase";
import { seedCategories, seedKeywords } from "@/lib/seed-data";
import HeroSearch from "@/components/home/HeroSearch";
import TrendingKeywords from "@/components/home/TrendingKeywords";
import CategoryGrid from "@/components/home/CategoryGrid";
import AdSlot from "@/components/ads/AdSlot";

export default async function HomePage() {
  const [categories, trending] = await Promise.all([
    getCategories(),
    getTrendingKeywords(8),
  ]);

  const displayCategories = categories.length > 0 ? categories : seedCategories;
  const displayTrending = trending.length > 0 ? trending : seedKeywords.filter((k) => k.is_trending).slice(0, 8);

  return (
    <div>
      <HeroSearch />

      <AdSlot position="leaderboard" className="mb-8 mx-4" />

      <TrendingKeywords keywords={displayTrending} />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdSlot position="rectangle" />
      </div>

      <CategoryGrid categories={displayCategories} />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3">
            From idea to ranking in three steps
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            Built for indie bloggers who want to grow organic traffic without
            paying $100/month for enterprise SEO tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm mb-4">1</div>
            <h3 className="font-semibold text-zinc-900 mb-2">Tell us your blog topic</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Running a pet blog? A SaaS review site? Type your niche into the
              search bar. No complex filters or settings — just tell us what you
              write about.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-semibold text-sm mb-4">2</div>
            <h3 className="font-semibold text-zinc-900 mb-2">Pick keywords with high opportunity</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Each keyword gets an opportunity score. High score means real
              search volume + weak competition. You see exactly why a keyword is
              worth targeting — and which domains you need to beat.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold text-sm mb-4">3</div>
            <h3 className="font-semibold text-zinc-900 mb-2">Write what Google wants</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Every keyword page includes a content strategy — recommended angle,
              H2 suggestions, and exactly what the current top results are
              missing. Publish the article and watch it climb.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
