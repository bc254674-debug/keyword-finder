import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-semibold text-zinc-900 mb-2">KeywordFinder</p>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Free keyword research tool for discovering untapped long-tail keywords,
              AI-friendly search queries, and GEO-optimized topics with real search
              volume and low competition. Built for indie bloggers, affiliate
              marketers, niche site builders, and content creators who want to rank
              everywhere — Google, ChatGPT, Perplexity, and beyond.
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900 mb-2">Explore</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/trending" className="text-zinc-500 hover:text-zinc-700 transition-colors">Trending</Link>
              <Link href="/categories" className="text-zinc-500 hover:text-zinc-700 transition-colors">Categories</Link>
              <Link href="/blog" className="text-zinc-500 hover:text-zinc-700 transition-colors">Blog</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-zinc-900 mb-2">About</p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We analyze millions of search queries to find blue-ocean
              opportunities, AI-optimized keywords, and consumer search intent
              patterns. Our algorithm scores each keyword by
              search-volume-to-competition ratio, GEO relevance, trend
              direction, and content gap analysis — so you rank everywhere
              your audience searches.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-zinc-100 text-center text-xs text-zinc-400">
          &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> KeywordFinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
