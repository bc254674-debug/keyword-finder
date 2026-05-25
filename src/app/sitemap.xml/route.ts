import { type NextRequest } from "next/server";

const BASE_URL = "https://www.keywordfind.asia";

interface Entry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function buildXml(): string {
  const entries: Entry[] = [
    { loc: BASE_URL, lastmod: new Date().toISOString(), changefreq: "daily", priority: 1 },
    { loc: `${BASE_URL}/trending`, lastmod: new Date().toISOString(), changefreq: "daily", priority: 0.9 },
    { loc: `${BASE_URL}/categories`, lastmod: new Date().toISOString(), changefreq: "weekly", priority: 0.8 },
    { loc: `${BASE_URL}/blog`, lastmod: new Date().toISOString(), changefreq: "weekly", priority: 0.7 },
    { loc: `${BASE_URL}/privacy`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: 0.3 },

    { loc: `${BASE_URL}/blog/what-are-blue-ocean-keywords`, lastmod: "2025-05-10", changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/blog/how-to-find-low-competition-keywords`, lastmod: "2025-05-12", changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/blog/content-strategy-for-niche-sites`, lastmod: "2025-05-14", changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/blog/geo-ai-search-keywords-guide`, lastmod: "2025-05-16", changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/blog/consumer-search-intent-keywords`, lastmod: "2025-05-17", changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/blog/free-keyword-research-no-paid-tools`, lastmod: "2025-05-19", changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/blog/what-is-keyword-difficulty-how-to-judge`, lastmod: "2025-05-20", changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/blog/internal-linking-for-seo-guide`, lastmod: "2025-05-22", changefreq: "monthly", priority: 0.6 },
  ];

  const categorySlugs = [
    "pets", "health", "finance", "food", "tech", "home", "travel",
    "education", "beauty", "business", "sports", "automotive", "gardening",
    "parenting", "fashion",
  ];
  for (const slug of categorySlugs) {
    entries.push({ loc: `${BASE_URL}/category/${slug}`, lastmod: new Date().toISOString(), changefreq: "weekly", priority: 0.7 });
  }

  const keywordSlugs = [
    "diy-dog-wash-station", "best-cat-food-sensitive-stomach", "puppy-training-schedule-by-age",
    "homemade-dog-food-crockpot", "couch-to-5k-plan-for-seniors", "intermittent-fasting-for-women-over-40",
    "best-yoga-poses-for-back-pain", "high-dividend-etf-monthly-payout", "best-credit-card-for-freelancers",
    "how-to-build-emergency-fund-fast", "sourdough-discard-crackers-recipe", "meal-prep-ideas-for-weight-loss",
    "air-fryer-recipes-for-beginners", "cursor-ai-vs-copilot-2025", "best-password-manager-for-families",
    "how-to-speed-up-windows-11", "small-bathroom-storage-rental", "how-to-paint-kitchen-cabinets",
    "diy-accent-wall-ideas-bedroom", "workation-visa-digital-nomad-2025", "budget-travel-japan-itinerary",
    "best-travel-insurance-for-seniors", "notion-template-student-planner", "best-online-course-platforms-for-creators",
    "korean-skincare-routine-oily-skin", "best-retinol-for-beginners-sensitive-skin", "ai-marketing-automation-small-business",
    "how-to-start-a-newsletter", "resistance-band-workout-plan-pdf", "home-gym-setup-small-space",
    "ev-battery-replacement-cost-2025", "best-dash-cam-for-night-driving", "raised-garden-bed-vegetable-layout",
    "indoor-herb-garden-apartment", "montessori-bedroom-ideas-toddler", "screen-free-activities-for-toddlers",
    "capsule-wardrobe-2025-checklist", "best-sneakers-for-wide-feet-women", "product-research-tools-ecommerce",
    "shopify-vs-woocommerce-comparison", "social-media-marketing-strategy-small-business",
    "best-side-hustles-from-home-2025", "best-ai-writing-tools-2025", "best-ai-art-generators-2025",
    "chatgpt-tips-and-tricks-2025", "air-fryer-recipes-for-beginners-2025", "cheap-meal-prep-for-weight-loss",
    "how-to-fall-asleep-fast-naturally", "how-to-manage-anxiety-without-medication", "index-fund-investing-for-beginners",
    "self-employed-tax-deductions-guide", "ats-friendly-resume-template-2025", "best-language-learning-apps-2025",
    "first-time-cat-owner-guide", "best-national-parks-road-trip-itinerary", "small-apartment-studio-design-ideas",
    "seo-guide-for-beginners-2025", "affiliate-marketing-for-beginners-2025",
  ];
  for (const slug of keywordSlugs) {
    entries.push({ loc: `${BASE_URL}/keyword/${slug}`, lastmod: "2025-05-14", changefreq: "weekly", priority: 0.8 });
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const e of entries) {
    xml += "<url>\n";
    xml += `<loc>${e.loc}</loc>\n`;
    xml += `<lastmod>${e.lastmod}</lastmod>\n`;
    xml += `<changefreq>${e.changefreq}</changefreq>\n`;
    xml += `<priority>${e.priority}</priority>\n`;
    xml += "</url>\n";
  }
  xml += "</urlset>";
  return xml;
}

const xmlContent = buildXml();

export function GET(_request: NextRequest): Response {
  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export const dynamic = "force-static";
