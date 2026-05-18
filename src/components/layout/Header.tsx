"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";

const navLinks = [
  { href: "/trending", label: "Trending" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-5 h-15 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-zinc-900 shrink-0"
          suppressHydrationWarning
        >
          KeywordFinder
          <span className="ml-1.5 text-xs font-medium text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded" suppressHydrationWarning>
            Beta
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active
                    ? "text-zinc-900 bg-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:block flex-1 max-w-sm">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
