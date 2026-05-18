import SearchBar from "@/components/ui/SearchBar";

const popularTerms = [
  "best cat food for indoor cats",
  "home workout for beginners",
  "SaaS tools for small business",
  "healthy recipes for weight loss",
  "AI keyword research guide",
];

export default function HeroSearch() {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 text-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.06), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.04), transparent 60%)",
        }}
      />

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 max-w-4xl mx-auto leading-[1.08]">
        Find untapped keywords your blog{" "}
        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          can actually rank for
        </span>
      </h1>

      <p className="mt-5 text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed">
        No expensive tools, no SEO degree required. Tell us your blog topic
        and discover long-tail keywords with real search volume and genuinely
        weak competition.
      </p>

      <p className="mt-4 text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        Powered by GEO intelligence: we surface AI-friendly search queries,
        consumer intent keywords, and question-based topics that ChatGPT,
        Perplexity, and Google AI Overviews love to reference.
      </p>

      <div className="mt-10 max-w-lg mx-auto">
        <SearchBar large />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-400">
        <span className="text-zinc-300">Try:</span>
        {popularTerms.map((term) => (
          <a
            key={term}
            href={`/trending?q=${encodeURIComponent(term)}`}
            className="px-3 py-1 rounded-full border border-zinc-200 bg-white hover:border-zinc-300 hover:text-zinc-600 transition-colors text-zinc-500"
          >
            {term}
          </a>
        ))}
      </div>
    </section>
  );
}
