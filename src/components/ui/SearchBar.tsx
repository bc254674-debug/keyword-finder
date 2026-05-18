"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/trending?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='What niche are you in? e.g. "cat food", "home fitness", "SaaS tools", "skincare routine"...'
        className={`w-full rounded-xl border border-zinc-300 bg-white px-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
          large ? "py-3.5 pr-16 text-base shadow-sm shadow-zinc-200/50" : "py-2 pr-12 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors font-medium ${
          large ? "px-5 py-2 text-sm" : "px-3 py-1 text-xs"
        }`}
      >
        Search
      </button>
    </form>
  );
}
