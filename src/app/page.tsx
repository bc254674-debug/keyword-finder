import type { Metadata } from "next";
import { getCategories, getTrendingKeywords } from "@/lib/supabase";
import { seedCategories, seedKeywords } from "@/lib/seed-data";
import HeroSearch from "@/components/home/HeroSearch";
import TrendingKeywords from "@/components/home/TrendingKeywords";
import CategoryGrid from "@/components/home/CategoryGrid";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "x-default": "/" },
  },
};

export default async function HomePage() {
  const [categories, trending] = await Promise.all([
    getCategories(),
    getTrendingKeywords(8),
  ]);

  const displayCategories = categories.length > 0 ? categories : seedCategories;
  const displayTrending = trending.length > 0 ? trending : seedKeywords.filter((k) => k.is_trending).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "KeywordFinder",
        url: "https://www.keywordfind.asia",
        description:
          "Free keyword research tool for discovering untapped long-tail keywords, AI-friendly search queries, and GEO-optimized topics.",
        sameAs: ["https://github.com/bc254674-debug/keyword-finder"],
      },
      {
        "@type": "WebSite",
        name: "KeywordFinder",
        url: "https://www.keywordfind.asia",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.keywordfind.asia/trending?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSearch />

      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-3 px-6 bg-white rounded-2xl border border-zinc-200/60 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            AI-friendly keyword discovery
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            GEO-optimized search queries
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            50,000+ untapped keywords tracked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            100% free — no registration required
          </span>
        </div>
      </div>

      <TrendingKeywords keywords={displayTrending} />

      <CategoryGrid categories={displayCategories} />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3">
            AI-optimized keywords: what search engines love in 2025
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Generative engines like ChatGPT, Perplexity, and Google AI Overviews
            prioritize different keyword patterns than traditional search. We
            help you target the queries AI actually references.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-semibold text-sm mb-4">Q</div>
            <h3 className="font-semibold text-zinc-900 mb-2">Question-based queries</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              AI engines prefer natural language questions: "What is the best...",
              "How do I...", "Why does..." — we surface these for your niche.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">Informational intent</span>
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">Conversational</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold text-sm mb-4">VS</div>
            <h3 className="font-semibold text-zinc-900 mb-2">Comparison & alternative queries</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              "X vs Y", "best alternatives to...", "competitor comparison" —
              these comparison keywords are heavily cited by AI overviews.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">Commercial intent</span>
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">Decision-making</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-semibold text-sm mb-4">T</div>
            <h3 className="font-semibold text-zinc-900 mb-2">Transactional intent keywords</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              "Best X for Y", "top rated...", "affordable... near me" — these
              buyer-intent keywords signal purchase readiness to AI agents.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">Buyer intent</span>
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">High conversion</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm mb-4">L</div>
            <h3 className="font-semibold text-zinc-900 mb-2">Long-tail modifier keywords</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Keywords with modifiers like "for beginners", "step-by-step",
              "2025 guide", "checklist" — AI loves structured, actionable content.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">Educational</span>
              <span className="text-xs px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-100">Actionable</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 via-white to-violet-50 rounded-3xl border border-blue-100/50 p-8 md:p-10">
          <h3 className="text-xl font-semibold text-zinc-900 mb-4 text-center">
            Think like your customer: what would they search?
          </h3>
          <p className="text-zinc-500 text-center mb-6 max-w-2xl mx-auto">
            Put yourself in your consumer&apos;s shoes. If you sell <strong>cat food</strong>,
            here&apos;s what your potential buyers are actually typing into search
            engines and AI chatbots every day:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {[
              "best cat food for indoor cats 2025",
              "healthy cat food without fillers",
              "grain free wet cat food brands",
              "affordable natural cat food delivery",
              "cat food for sensitive stomach and vomiting",
              "best kitten food for healthy growth",
              "organic cat food vs regular — which is better",
              "high protein cat food for weight loss",
              "what should I feed my senior cat",
              "best dry cat food recommended by vets",
              "cat food nutrition comparison chart",
              "where to buy raw cat food online",
            ].map((kw) => (
              <a
                key={kw}
                href={`/trending?q=${encodeURIComponent(kw)}`}
                className="px-4 py-2.5 bg-white rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all truncate"
              >
                {kw}
              </a>
            ))}
          </div>

          <p className="text-xs text-zinc-400 text-center mt-5">
            These are real consumer search intent keywords — the kind AI
            engines surface in their answers. Target these and you&apos;ll be
            visible wherever your customers search.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3">
            From idea to ranking: your GEO keyword workflow
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Built for indie bloggers, content marketers, and niche site builders
            who want to grow organic traffic without paying $100/month for
            enterprise SEO tools. Optimize for Google, ChatGPT, Perplexity, and
            AI-powered search — all in one workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Step 1 */}
          <div className="p-7 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-lg hover:border-blue-200 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-blue-100 transition-colors">1</div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-3">
              Tell us what you sell or write about — thinking like your customer
            </h3>
            <div className="space-y-3 text-sm text-zinc-500 leading-relaxed">
              <p>
                <strong className="text-zinc-700">Describe your niche, product, or audience.</strong> Running a
                pet nutrition blog? Selling premium cat food online? Reviewing SaaS tools
                for small business owners? Just tell us what you do — our AI engine
                reverse-engineers what your <em>customers</em> would type into search.
              </p>
              <p>
                We generate a <strong className="text-zinc-700">search intent map</strong> for your niche:
                informational queries your audience uses to research, commercial
                investigation queries they use to compare options, and transactional
                queries they type when ready to buy. No complex filters, no SEO jargon —
                just real consumer search behavior decoded.
              </p>
              <div className="mt-4 p-3 bg-zinc-50 rounded-xl text-xs">
                <p className="font-medium text-zinc-500 mb-2">AI-friendly keyword templates we surface:</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">best [product] for [specific need]</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">[product A] vs [product B] comparison</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">what is the best [product] for [condition]</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">how to choose [product] for beginners</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">[product] review and buying guide 2025</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">where to buy affordable [product] online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-7 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-lg hover:border-violet-200 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-violet-100 transition-colors">2</div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-3">
              Discover untapped blue-ocean keywords with high opportunity score
            </h3>
            <div className="space-y-3 text-sm text-zinc-500 leading-relaxed">
              <p>
                <strong className="text-zinc-700">Every keyword gets a multi-dimensional opportunity score.</strong>{" "}
                We analyze search volume, keyword difficulty, SERP competition, domain
                authority of current ranking pages, content freshness, and — uniquely —
                <strong className="text-zinc-700"> GEO citation potential</strong>: how
                likely this keyword is to be picked up by ChatGPT, Perplexity, and
                Google AI Overviews.
              </p>
              <p>
                You&apos;ll see <strong className="text-zinc-700">exactly which domains</strong> you
                need to beat to rank on page one. If the top 3 results are Reddit threads,
                Quora posts, and 4-year-old blog posts with zero backlinks — that&apos;s a
                golden blue-ocean opportunity. We flag competitive red oceans vs. wide-open
                blue oceans at a glance.
              </p>
              <div className="mt-4 p-3 bg-zinc-50 rounded-xl text-xs">
                <p className="font-medium text-zinc-500 mb-2">Keywords AI engines prioritize citing:</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">question-based + long-tail combinations</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">comparison intent + decision framework</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">step-by-step + actionable checklist</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">beginner-friendly + comprehensive guide</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">data-driven + expert recommendations</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">problem-solution + real-world examples</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-7 bg-white rounded-2xl border border-zinc-200/80 hover:shadow-lg hover:border-emerald-200 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-emerald-100 transition-colors">3</div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-3">
              Create GEO-optimized content that wins in Google AND AI search
            </h3>
            <div className="space-y-3 text-sm text-zinc-500 leading-relaxed">
              <p>
                <strong className="text-zinc-700">Stop writing and hoping. Start writing what search engines actually reward.</strong>{" "}
                Every keyword page gives you a complete GEO content blueprint: a
                recommended content angle backed by SERP analysis, AI-friendly H2
                headings and sub-topic clusters, the content depth and word count the
                topic deserves, and the exact gaps the current top 10 results are
                leaving open.
              </p>
              <p>
                We also tell you <strong className="text-zinc-700">what format wins</strong> for
                each query — is it a definitive guide, a comparison table, a
                step-by-step tutorial, a checklist, a video-backed article, or a
                data-rich roundup? Publish the right format and watch it rank in{" "}
                <strong className="text-zinc-700">Google page one, featured snippets, and AI Overviews</strong>,
                all from a single piece of content.
              </p>
              <div className="mt-4 p-3 bg-zinc-50 rounded-xl text-xs">
                <p className="font-medium text-zinc-500 mb-2">GEO content formats AI prefers to cite:</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">comprehensive guide with H2 + H3 structure</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">pros-and-cons comparison framework</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">step-by-step tutorial with actionable takeaways</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">expert roundup with data-backed insights</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">FAQ-structured Q&A with concise answers</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-zinc-100 text-zinc-500">checklist-style actionable resource</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus: Consumer-thinking keyword formulas for multiple niches */}
        <div className="bg-zinc-50 rounded-3xl p-8 md:p-10 border border-zinc-200/50">
          <h3 className="text-lg font-semibold text-zinc-900 mb-3 text-center">
            Think like YOUR customer: keyword formulas for every niche
          </h3>
          <p className="text-sm text-zinc-500 text-center mb-8 max-w-xl mx-auto">
            Swap in your product or topic. These AI-citable keyword formulas work
            across any industry — the search engines and AI chatbots are trained to
            recognize and prioritize these query patterns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[
              {
                niche: "Pet supplies (cat food)",
                keywords: [
                  "best grain free cat food for sensitive stomach",
                  "wet vs dry cat food — which is healthier for indoor cats",
                  "what should I feed my kitten at 8 weeks",
                  "how to transition cat to new food without digestive issues",
                  "top vet recommended cat food for urinary health",
                  "affordable high protein cat food without by-products",
                ],
              },
              {
                niche: "SaaS & software tools",
                keywords: [
                  "best project management tool for remote teams under 50 employees",
                  "Notion vs ClickUp vs Asana — honest comparison for startups",
                  "what is the best CRM for small business with email marketing",
                  "how to choose accounting software for freelancers step by step",
                  "affordable AI writing tools for content marketers review",
                  "project management software ROI calculator and buyer guide",
                ],
              },
              {
                niche: "Home fitness",
                keywords: [
                  "best adjustable dumbbells for small apartment home gym",
                  "how to build muscle at home without equipment for beginners",
                  "home workout vs gym — which gets better results for weight loss",
                  "what is the best yoga mat for hot yoga on hardwood floors",
                  "30-day bodyweight workout plan for women over 40",
                  "best resistance bands for glute activation physical therapy",
                ],
              },
              {
                niche: "Healthy cooking",
                keywords: [
                  "easy healthy meal prep recipes for weight loss on a budget",
                  "best air fryer for family of 4 healthy cooking",
                  "how to cook quinoa perfectly fluffy every time step by step",
                  "Mediterranean diet meal plan for beginners with grocery list",
                  "best non-toxic cookware set without PFAS or Teflon 2025",
                  "quick high protein vegetarian dinner ideas under 30 minutes",
                ],
              },
            ].map((group) => (
              <div key={group.niche} className="bg-white rounded-2xl p-5 border border-zinc-200/80">
                <h4 className="text-sm font-semibold text-zinc-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  {group.niche}
                </h4>
                <div className="space-y-1.5">
                  {group.keywords.map((kw) => (
                    <a
                      key={kw}
                      href={`/trending?q=${encodeURIComponent(kw)}`}
                      className="block text-xs text-zinc-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition-colors"
                    >
                      {kw}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-400 text-center mt-6 max-w-xl mx-auto">
            These are the exact query patterns AI search engines like ChatGPT,
            Perplexity, and Google AI Overviews are trained to surface. Question-based +
            modifier-rich + intent-specific = the GEO keyword trifecta.
          </p>
        </div>
      </section>
    </div>
  );
}
