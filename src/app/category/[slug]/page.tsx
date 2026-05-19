import type { Metadata } from "next";
import Link from "next/link";
import { getKeywordsByCategory, getAllCategorySlugs } from "@/lib/supabase";
import { seedCategories, seedKeywords } from "@/lib/seed-data";
import KeywordCard from "@/components/keyword/KeywordCard";
import Pagination from "@/components/ui/Pagination";

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
    title: `${name} Keywords — Low Competition & High Opportunity | KeywordFinder`,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${categoryName} Keywords — Blue-Ocean Keyword Opportunities`,
        description:
          category?.description ||
          `Untapped, low-competition ${categoryName.toLowerCase()} keywords with real search volume and content suggestions.`,
        url: `https://www.keywordfind.asia/category/${slug}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: displayKeywords
            .slice(0, 20)
            .map((kw: typeof displayKeywords[0], i: number) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.keywordfind.asia/keyword/${kw.slug}`,
              name: kw.keyword,
            })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.keywordfind.asia/" },
          { "@type": "ListItem", position: 2, name: "Categories", item: "https://www.keywordfind.asia/categories" },
          { "@type": "ListItem", position: 3, name: categoryName, item: `https://www.keywordfind.asia/category/${slug}` },
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          `Untapped, low-competition keyword opportunities in ${categoryName.toLowerCase()} — discover what your audience is searching for.`}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayKeywords.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((kw) => (
          <div key={kw.id}>
            <KeywordCard keyword={kw} />
          </div>
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
