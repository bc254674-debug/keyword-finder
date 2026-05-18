import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Keyword Research Guides, GEO Optimization & SEO Tips",
  description:
    "Learn how to find blue-ocean keywords, discover AI-friendly search queries, analyze competition, and create content that ranks in both Google and AI search engines. In-depth guides for indie bloggers and niche site builders.",
  keywords: [
    "GEO optimization",
    "AI search keywords",
    "consumer search intent",
    "keyword research guide",
    "blue ocean keywords",
    "long-tail keywords",
    "content marketing",
    "SEO tips",
  ],
};

const posts = [
  {
    slug: "consumer-search-intent-keywords",
    title: "Think Like Your Customer: Consumer Search Intent Keywords That Drive Sales",
    excerpt:
      "Learn the empathy-driven approach to keyword research. Using a cat food business as a case study, discover how thinking like your customer reveals untapped buyer-intent keywords.",
    date: "2025-05-17",
  },
  {
    slug: "geo-ai-search-keywords-guide",
    title: "GEO Optimization: What Types of Keywords Do AI Search Engines Love?",
    excerpt:
      "Generative engines like ChatGPT, Perplexity, and Google AI Overviews prioritize specific keyword patterns. Learn which query types AI prefers to cite and how to optimize for GEO.",
    date: "2025-05-16",
  },
  {
    slug: "content-strategy-for-niche-sites",
    title: "Content Strategy for Niche Sites: From 0 to 10K Monthly Visitors",
    excerpt:
      "How to structure your content plan around blue-ocean keywords to build topical authority and grow organic traffic sustainably.",
    date: "2025-05-14",
  },
  {
    slug: "how-to-find-low-competition-keywords",
    title: "How to Find Low-Competition Keywords That Actually Rank",
    excerpt:
      "A step-by-step methodology for discovering keywords with real search volume and weak competition — using free and paid tools.",
    date: "2025-05-12",
  },
  {
    slug: "what-are-blue-ocean-keywords",
    title: "What Are Blue-Ocean Keywords? A Complete Guide",
    excerpt:
      "Learn the definition of blue-ocean keywords, how they differ from traditional long-tail keywords, and why they are the fastest path to ranking on Google.",
    date: "2025-05-10",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Blog</h1>
      <p className="text-gray-500 mb-8">
        In-depth guides on keyword research, SEO strategy, and building content
        that ranks.
      </p>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-2 hover:text-blue-600">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3">{post.excerpt}</p>
              <time className="text-xs text-gray-400">{post.date}</time>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
