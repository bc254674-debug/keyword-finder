import type { MetadataRoute } from "next";

const BASE_URL = "https://www.keywordfind.asia";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/trending`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const blogPosts: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/blog/what-are-blue-ocean-keywords`, lastModified: new Date("2025-05-10"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/how-to-find-low-competition-keywords`, lastModified: new Date("2025-05-12"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/content-strategy-for-niche-sites`, lastModified: new Date("2025-05-14"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/geo-ai-search-keywords-guide`, lastModified: new Date("2025-05-16"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/consumer-search-intent-keywords`, lastModified: new Date("2025-05-17"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/free-keyword-research-no-paid-tools`, lastModified: new Date("2025-05-19"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/what-is-keyword-difficulty-how-to-judge`, lastModified: new Date("2025-05-20"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/internal-linking-for-seo-guide`, lastModified: new Date("2025-05-22"), changeFrequency: "monthly", priority: 0.6 },
  ];

  const categories: MetadataRoute.Sitemap = [
    "pets", "health", "finance", "food", "tech", "home", "travel",
    "education", "beauty", "business", "sports", "automotive", "gardening",
    "parenting", "fashion",
  ].map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const keywords: MetadataRoute.Sitemap = [
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
  ].map((slug) => ({
    url: `${BASE_URL}/keyword/${slug}`,
    lastModified: new Date("2025-05-14"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...categories, ...keywords];
}
