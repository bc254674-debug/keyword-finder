import type { Metadata } from "next";
import Link from "next/link";
import { getKeywordsByCategory, getAllCategorySlugs } from "@/lib/supabase";
import { seedCategories, seedKeywords } from "@/lib/seed-data";
import KeywordCard from "@/components/keyword/KeywordCard";
import Pagination from "@/components/ui/Pagination";
import AdSlot from "@/components/ads/AdSlot";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

const PER_PAGE = 20;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  if (slugs.length > 0) return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  return seedCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = seedCategories.find((c) => c.slug === slug);
  const name = category?.name || slug.replace(/-/g, " ");

  return {
    title: `${name} — Blue-Ocean Keywords`,
    description: `Discover untapped long-tail keywords in the ${name.toLowerCase()} niche. Low competition, real search volume, and content suggestions to help you rank.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1"));

  const category = seedCategories.find((c) => c.slug === slug);
  const categoryName = category?.name || slug.replace(/-/g, " ");

  const { keywords, total } = await getKeywordsByCategory(slug, page, PER_PAGE);
  const displayKeywords =
    keywords.length > 0
      ? keywords
      : seedKeywords.filter((k) => k.category_id === category?.id);
  const totalPages = Math.max(1, Math.ceil((total || displayKeywords.length) / PER_PAGE));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-blue-600">Categories</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{categoryName}</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        {categoryName} Keywords
      </h1>
      <p className="text-gray-500 mb-8">
        {category?.description ||
          `Blue-ocean keyword opportunities in ${categoryName.toLowerCase()}.`}
      </p>

      <AdSlot position="leaderboard" className="mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayKeywords.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((kw, i) => (
          <>
            <KeywordCard key={kw.id} keyword={kw} />
            {i === 5 && <AdSlot position="rectangle" />}
          </>
        ))}
      </div>

      {displayKeywords.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          No keywords found in this category yet.
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={`/category/${slug}`}
      />
    </div>
  );
}
