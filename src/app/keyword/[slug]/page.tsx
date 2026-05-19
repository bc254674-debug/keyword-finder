import type { Metadata } from "next";
import Link from "next/link";
import { getKeywordBySlug, getAllKeywordSlugs } from "@/lib/supabase";
import { seedKeywords, seedCategories } from "@/lib/seed-data";
import type { Keyword } from "@/lib/types";
import {
  formatNumber,
  trendIcon,
  trendColor,
  scoreToStars,
  competitionLabel,
} from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllKeywordSlugs();
  if (slugs.length > 0) return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  return seedKeywords.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kw = seedKeywords.find((k) => k.slug === slug);
  const keyword = kw?.keyword || slug.replace(/-/g, " ");
  const stars = kw ? scoreToStars(kw.opportunity_score) : 3;
  const volume = kw ? formatNumber(kw.search_volume_estimate) : "N/A";
  const competition = kw ? competitionLabel(kw.competition_score) : "Unknown";

  return {
    title: `${keyword} — Keyword Analysis & Content Opportunity`,
    description: `Analyze "${keyword}" — monthly volume ${volume}, competition: ${competition}, opportunity: ${"★".repeat(stars)}. Get data-driven content suggestions to rank for this blue-ocean keyword.`,
    keywords: [keyword, "blue ocean keyword", "long-tail SEO", "content gap analysis", "low competition keyword"],
    openGraph: {
      title: `${keyword} — Blue-Ocean Keyword Analysis`,
      description: `Search volume: ${volume} · Competition: ${competition} · Opportunity: ${stars}/5. See why this keyword is a ranking opportunity.`,
      type: "article",
      publishedTime: kw?.created_at,
      modifiedTime: kw?.last_updated,
    },
  };
}

export default async function KeywordPage({ params }: Props) {
  const { slug } = await params;
  const data = await getKeywordBySlug(slug);
  const kw: Keyword | null =
    data || seedKeywords.find((k) => k.slug === slug) || null;

  if (!kw) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-32 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-xl font-semibold text-zinc-900 mb-2">Keyword not found</h1>
        <p className="text-zinc-500 mb-8">This page doesn&apos;t exist or has moved.</p>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Back to Home →
        </Link>
      </div>
    );
  }

  const catName =
    kw.category?.name ||
    seedCategories.find((c) => c.id === kw.category_id)?.name ||
    "General";
  const catSlug =
    kw.category?.slug ||
    seedCategories.find((c) => c.id === kw.category_id)?.slug ||
    "";
  const relatedKws = seedKeywords
    .filter(
      (rk) =>
        rk.id !== kw.id &&
        (kw.related_keywords || []).some((r: string) =>
          rk.keyword.toLowerCase().includes(r.toLowerCase().slice(0, 10))
        )
    )
    .slice(0, 5);

  const BASE = "https://www.keywordfind.asia";

  // ── JSON-LD ────────────────────────────────────────────
  const jsonLdGraph: Record<string, unknown>[] = [
    {
      "@type": "AnalysisNewsArticle",
      headline: `"${kw.keyword}" — Blue-Ocean Keyword Analysis`,
      description: `Keyword opportunity analysis for "${kw.keyword}". Search volume: ${formatNumber(kw.search_volume_estimate)}, competition: ${competitionLabel(kw.competition_score)}.`,
      datePublished: kw.created_at,
      dateModified: kw.last_updated,
      author: { "@type": "Organization", name: "KeywordFinder" },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE}/keyword/${kw.slug}`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: catName, item: `${BASE}/category/${catSlug}` },
        { "@type": "ListItem", position: 3, name: kw.keyword, item: `${BASE}/keyword/${kw.slug}` },
      ],
    },
  ];

  if (kw.faq && kw.faq.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      mainEntity: kw.faq.map((item: { q: string; a: string }) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": jsonLdGraph };

  // ── Helpers ─────────────────────────────────────────────
  const oppTier =
    kw.opportunity_score >= 80
      ? { label: "Excellent", color: "text-emerald-600 bg-emerald-50" }
      : kw.opportunity_score >= 60
        ? { label: "Strong", color: "text-lime-600 bg-lime-50" }
        : kw.opportunity_score >= 40
          ? { label: "Moderate", color: "text-amber-600 bg-amber-50" }
          : { label: "Niche", color: "text-zinc-500 bg-zinc-100" };

  const trendLabel =
    kw.trend_direction === "up"
      ? "Rising — growing user interest, keyword is gaining momentum"
      : kw.trend_direction === "down"
        ? "Declining — steady residual volume but long-term trend is downward"
        : "Stable — consistent search demand, not a seasonal fad";

  const whyAnalysis = (() => {
    const hasForum = kw.top_domains?.some((d: string) =>
      ["reddit.com", "quora.com", "forums.", "pinterest.com"].some((t) =>
        d.includes(t)
      )
    );
    if (hasForum) {
      return `The first page of Google for "${kw.keyword}" includes user-generated content from forums and social platforms. This is the single strongest signal of a blue-ocean opportunity: when Google surfaces Reddit threads or Quora answers on page one, it means no authoritative, well-structured content exists to satisfy the query. A dedicated article targeting this keyword has a high probability of outranking these results.`;
    }
    return `Current top-ranking content for "${kw.keyword}" consists largely of broad overviews from authority sites. These pages cover the general topic but lack the depth and specificity that a focused, comprehensive article can provide. By creating content that directly and thoroughly answers this specific query, you can fill a genuine content gap in the SERP.`;
  })();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-5 py-10 md:py-14">
        {/* ── Breadcrumb ─────────────────────────────── */}
        <nav className="text-xs text-zinc-400 mb-8 tracking-wide" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-zinc-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${catSlug}`} className="hover:text-zinc-600 transition-colors">{catName}</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-500">{kw.keyword}</span>
        </nav>

        {/* ── Header ──────────────────────────────────── */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${oppTier.color}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {oppTier.label} opportunity
            </span>
            <span className="text-xs text-zinc-400">
              Score: {kw.opportunity_score.toFixed(0)}/100
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight tracking-tight">
            &ldquo;{kw.keyword}&rdquo;
          </h1>
          <p className="mt-3 text-zinc-500 max-w-2xl">
            A data-driven analysis of search volume, competition level, and
            content opportunity for this blue-ocean keyword.
          </p>
        </header>

        {/* ── Metrics Strip ───────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            {
              label: "Est. Monthly Volume",
              value: formatNumber(kw.search_volume_estimate),
              accent: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Trend Score",
              value: `${trendIcon(kw.trend_direction)} ${kw.trend_score.toFixed(0)}`,
              accent: trendColor(kw.trend_direction),
              bg: "bg-zinc-50",
            },
            {
              label: "Indexed Results",
              value: formatNumber(kw.result_count),
              accent: "text-violet-600",
              bg: "bg-violet-50",
            },
            {
              label: "Competition",
              value: competitionLabel(kw.competition_score),
              accent:
                kw.competition_score <= 30
                  ? "text-emerald-600"
                  : kw.competition_score <= 60
                    ? "text-amber-600"
                    : "text-rose-600",
              bg: "bg-zinc-50",
            },
          ].map((m) => (
            <div
              key={m.label}
              className={`${m.bg} rounded-2xl p-4 text-center`}
            >
              <div className={`text-xl md:text-2xl font-bold ${m.accent} tabular-nums`}>
                {m.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{m.label}</div>
            </div>
          ))}
        </section>

        {/* ── Competition Bar ──────────────────────────── */}
        <div className="mb-10 bg-white rounded-2xl border border-zinc-200/80 p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-zinc-700">Competition level</span>
            <span className="text-zinc-400">{competitionLabel(kw.competition_score)}</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${kw.competition_score}%`,
                background:
                  kw.competition_score <= 30
                    ? "linear-gradient(90deg, #10b981, #34d399)"
                    : kw.competition_score <= 60
                      ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                      : "linear-gradient(90deg, #f43f5e, #fb7185)",
              }}
            />
          </div>
          <p className="text-xs text-zinc-400 mt-3">{trendLabel}</p>
        </div>

        {/* ── Analysis ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Why this is an opportunity */}
            <section>
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Why this keyword is an opportunity
              </h2>
              <div className="prose prose-zinc max-w-none text-zinc-600 text-sm leading-relaxed space-y-3">
                <p>
                  <strong>&ldquo;{kw.keyword}&rdquo;</strong> receives an
                  estimated{" "}
                  <strong>
                    {formatNumber(kw.search_volume_estimate)} searches per month
                  </strong>{" "}
                  with approximately{" "}
                  <strong>
                    {formatNumber(kw.result_count)} indexed results
                  </strong>{" "}
                  on Google. The search-volume-to-result ratio indicates a{" "}
                  <strong>{competitionLabel(kw.competition_score).toLowerCase()}-competition</strong>{" "}
                  landscape — ideal for a new or growing site to enter.
                </p>
                <p>{whyAnalysis}</p>
                <p>
                  The trend direction is{" "}
                  <strong>
                    {kw.trend_direction === "up"
                      ? "rising"
                      : kw.trend_direction === "down"
                        ? "declining"
                        : "stable"}
                  </strong>{" "}
                  with a trend score of{" "}
                  <strong>{kw.trend_score.toFixed(0)}/100</strong>.{" "}
                  {kw.trend_direction === "up"
                    ? "Interest in this topic is actively growing, meaning the keyword will likely become more valuable over time. Publishing content now positions you ahead of the curve."
                    : kw.trend_direction === "down"
                      ? "While the broader trend may be cooling, there remains steady residual search demand worth capturing — especially if you can be the definitive resource before competitors exit the space."
                      : "The consistent search demand suggests this is an evergreen topic. Content created today will continue to attract traffic for years with minimal updates."}
                </p>
                <p>
                  Our opportunity algorithm scores this keyword at{" "}
                  <strong>{kw.opportunity_score.toFixed(0)}/100</strong>{" "}
                  ({oppTier.label.toLowerCase()} tier). A well-optimized,
                  comprehensive article targeting this query has strong potential
                  to reach the first page of Google within 3–6 months of
                  publication.
                </p>
              </div>
            </section>

            {/* Content suggestions */}
            <section className="bg-white rounded-2xl border border-zinc-200/80 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                Content strategy
              </h2>
              <p className="text-sm text-zinc-500 mb-5">
                How to create the best piece of content for this keyword.
              </p>
              <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>{kw.content_suggestion}</p>
              </div>
              <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200/60">
                <p className="text-sm font-medium text-amber-800 mb-1">
                  Optimization tip
                </p>
                <p className="text-sm text-amber-700">
                  Place the exact phrase &ldquo;{kw.keyword}&rdquo; in your H1
                  title, meta description, and at least one H2. Use related
                  long-tail variations in H3 subheadings to capture adjacent
                  queries.
                </p>
              </div>
            </section>

            {/* FAQ */}
            {kw.faq && kw.faq.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-zinc-900 mb-5">
                  Frequently asked questions
                </h2>
                <div className="space-y-3">
                  {kw.faq.map((item: { q: string; a: string }, i: number) => (
                    <details
                      key={i}
                      className="group bg-white rounded-2xl border border-zinc-200/80 overflow-hidden"
                    >
                      <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors select-none list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                        {item.q}
                        <span className="text-zinc-300 group-open:rotate-45 transition-transform text-lg leading-none">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-4 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ── Sidebar ────────────────────────────────── */}
          <aside className="space-y-6">

            {/* Current top domains */}
            <div className="bg-white rounded-2xl border border-zinc-200/80 p-5">
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Current top-ranking domains
              </h3>
              <ul className="space-y-2">
                {(kw.top_domains || []).map((d: string, i: number) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 text-sm text-zinc-600"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-xs font-medium text-zinc-500 tabular-nums">
                      {i + 1}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related keywords */}
            {relatedKws.length > 0 && (
              <div className="bg-white rounded-2xl border border-zinc-200/80 p-5">
                <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                  Related keywords
                </h3>
                <div className="space-y-1">
                  {relatedKws.map((rk) => (
                    <Link
                      key={rk.id}
                      href={`/keyword/${rk.slug}`}
                      className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-zinc-50 transition-colors text-sm text-zinc-600 hover:text-blue-600"
                    >
                      <span className="truncate">{rk.keyword}</span>
                      <span className="text-xs text-zinc-400 ml-2 shrink-0 tabular-nums">
                        {rk.opportunity_score.toFixed(0)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Data freshness */}
            <p className="text-xs text-zinc-400">
              Data updated{" "}
              {new Date(kw.last_updated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </aside>
        </div>
      </article>
    </>
  );
}
