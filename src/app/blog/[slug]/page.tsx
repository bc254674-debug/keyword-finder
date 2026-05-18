import type { Metadata } from "next";
import Link from "next/link";

const blogPosts: Record<string, { title: string; date: string; body: string[] }> = {
  "what-are-blue-ocean-keywords": {
    title: "What Are Blue-Ocean Keywords? A Complete Guide",
    date: "2025-05-10",
    body: [
      "In the world of SEO, most people are fishing in the same crowded pond. They target keywords like 'best credit cards' or 'how to lose weight' — terms where the first page is dominated by billion-dollar companies with thousands of backlinks. Blue-ocean keywords are the opposite: they are search queries with real volume but virtually no competition from authoritative sites.",
      "The term 'blue ocean' comes from the business strategy book Blue Ocean Strategy, which argues that companies should create uncontested market space rather than fight in crowded 'red oceans.' Applied to SEO, a blue-ocean keyword is one where the search intent is clear, the volume is meaningful (200+ monthly searches), but no dedicated, well-structured content exists to answer the query.",
      "The beauty of blue-ocean keywords is that they allow new websites to rank quickly. Without established authority, a brand-new site has almost zero chance of ranking for 'best protein powder' — but it can absolutely rank for 'best protein powder for seniors with diabetes' if the existing content is thin or non-existent.",
      "The key is finding these keywords before they become competitive. This is what our tool does: it scans search data to identify queries where the gap between search volume and content quality is widest.",
      "Once you find a blue-ocean keyword, the strategy is simple: create the single best piece of content on the internet for that specific query. Cover it comprehensively, structure it well, and Google will reward you with rankings — often within weeks, not months.",
    ],
  },
  "how-to-find-low-competition-keywords": {
    title: "How to Find Low-Competition Keywords That Actually Rank",
    date: "2025-05-12",
    body: [
      "Finding low-competition keywords is both an art and a science. The science part involves using tools to gather data — search volumes, competition scores, domain authority of ranking pages. The art part is interpreting that data to judge whether you can realistically outrank the current results.",
      "The most reliable method for identifying low-competition keywords is the 'allintitle' technique. By searching allintitle:'your keyword' on Google, you can see exactly how many pages are specifically targeting that phrase in their title tag. If the number is under 100, you have found a genuine blue-ocean opportunity.",
      "Another powerful signal is the presence of user-generated content sites (Reddit, Quora, forums) on the first page. Google only surfaces these when there is a lack of authoritative, dedicated content. If a Reddit thread from 2022 is ranking in the top 3, the door is wide open for you.",
      "You should also check the domain authority (DA) of the ranking pages. If the top results have DA under 30, a new site with good content can compete. Tools like MozBar (free) or Ahrefs (paid) can give you these metrics.",
      "Finally, look at the content quality of the current results. Are the pages comprehensive? Are they well-structured with clear headings? Do they answer the user's question thoroughly? Often, you will find that the existing content is thin, outdated, or poorly organized — which is your opportunity to create something much better.",
    ],
  },
  "content-strategy-for-niche-sites": {
    title: "Content Strategy for Niche Sites: From 0 to 10K Monthly Visitors",
    date: "2025-05-14",
    body: [
      "Building a niche site from zero to 10,000 monthly visitors requires a strategic approach to content creation. The most common mistake new site builders make is writing about whatever interests them, rather than what people are actually searching for.",
      "A blue-ocean content strategy starts with keyword clustering. Instead of targeting one keyword per article, you should identify a cluster of related low-competition keywords and create a pillar page that covers the main topic, supported by cluster pages that dive deep into specific subtopics.",
      "The content pyramid works like this: at the top, you have your pillar content — a comprehensive guide (3,000+ words) covering a broad topic. Below that, you have cluster content — shorter, focused articles targeting specific long-tail variations. All cluster articles link back to the pillar, and the pillar links out to each cluster article. This internal linking structure signals topical authority to Google.",
      "Consistency is also key. Publishing 3-5 articles per week for the first 3 months is a proven cadence for new sites. Each article should be at least 1,500 words and cover its topic thoroughly. Google's algorithms are increasingly good at detecting thin content, so depth matters more than volume.",
      "Finally, update your content regularly. Google favors fresh content. Set a calendar reminder to review and update your top-performing articles every 3-6 months. Add new information, refresh outdated statistics, and ensure all links still work.",
    ],
  },
  "geo-ai-search-keywords-guide": {
    title: "GEO Optimization: What Types of Keywords Do AI Search Engines Love?",
    date: "2025-05-16",
    body: [
      "Generative Engine Optimization (GEO) is the practice of optimizing your content to be surfaced and cited by AI-powered search engines like ChatGPT, Perplexity, Claude, and Google AI Overviews. As more users shift from typing keywords into Google to asking natural language questions in AI chatbots, the rules of content optimization are fundamentally changing.",
      "AI search engines don't just match keywords — they understand intent, synthesize information from multiple sources, and prioritize content that is clear, structured, and authoritative. This means traditional keyword optimization is no longer enough. You need to understand what types of queries AI models are trained to value.",
      "The number one keyword type that AI search engines love is the question-based query. Instead of searching for 'cat food nutrition,' AI users ask 'What is the healthiest cat food for indoor cats?' or 'How do I choose the best cat food for a cat with kidney disease?' These natural language questions map perfectly to how AI models process information — they are trained on conversational data and prefer to cite content that directly answers specific questions.",
      "Comparison keywords are another AI favorite. Queries like 'grain free vs grain inclusive cat food,' 'wet cat food vs dry cat food pros and cons,' or 'best affordable cat food brands compared' are gold mines for AI visibility. AI engines love citing content that presents balanced, structured comparisons because it helps them generate authoritative answers. If your content includes comparison tables, pros-and-cons sections, and decision frameworks, AI tools are far more likely to reference it.",
      "Long-tail modifier keywords are also highly valued by AI. These include terms with modifiers like 'for beginners,' 'step-by-step guide,' '2025 checklist,' 'complete tutorial,' or 'expert tips.' AI models recognize these as signaling structured, educational, and actionable content — exactly what they want to recommend to users seeking comprehensive answers. A keyword like 'how to start an indoor cat feeding routine step by step' will be prioritized over just 'cat feeding schedule' by AI engines.",
      "Transactional intent keywords are underrated in GEO. When users search for 'best high protein cat food for overweight cats' or 'where to buy organic grain free cat food online,' they have clear purchase intent. AI shopping agents and recommendation engines specifically look for content that matches these transactional patterns. If your product pages or buying guides are optimized for these phrases, you will capture traffic from AI-powered shopping assistants.",
      "Finally, topical authority clusters are essential for GEO. AI engines reward sites that demonstrate comprehensive expertise on a subject. Instead of publishing one article about cat food, build out an entire content cluster: best cat food, kitten nutrition, senior cat diet, cat food for health conditions, raw vs commercial diets, understanding cat food labels, and so on. When an AI engine sees cross-linked, in-depth content covering all angles of a topic, it trusts your site as an authoritative source — and cites you more often.",
      "The key takeaway is this: GEO optimization is about understanding how AI models think. They reward clarity, structure, comprehensiveness, and direct answers to real human questions. Write for humans asking real questions, structure your content for machine readability, and cover topics with genuine depth — the AI visibility will follow.",
    ],
  },
  "consumer-search-intent-keywords": {
    title: "Think Like Your Customer: Consumer Search Intent Keywords That Drive Sales",
    date: "2025-05-17",
    body: [
      "The most powerful SEO strategy is deceptively simple: think like your customer. If you were your own potential buyer, what would you type into Google, ChatGPT, or Perplexity? This exercise in empathy is the foundation of consumer search intent keyword research — and it is the most underutilized tactic in content marketing.",
      "Let's use a concrete example. Imagine you sell premium cat food. Your product is natural, grain-free, and made with real meat. Your instinct might be to optimize for 'premium cat food' or 'natural cat food' — but those are generic terms with massive competition from big brands. Instead, ask yourself: what would a caring cat owner actually search for?",
      "A cat owner whose cat has digestive issues would search: 'best cat food for sensitive stomach and vomiting,' 'cat food for IBS cats recommendations,' 'probiotic cat food for gut health,' or 'veterinary recommended cat food for digestive problems.' A new kitten owner would search: 'best kitten food for healthy growth and development,' 'how much should I feed my kitten chart,' or 'kitten food wet vs dry pros and cons.' A cat owner with an overweight cat would search: 'high protein low carb cat food for weight loss,' 'best indoor cat food for weight management,' or 'how to help my cat lose weight safely.'",
      "These are the real search queries that drive traffic and sales — because they come from real people with specific problems who are actively looking for solutions. Each of these phrases represents a potential customer at a different stage of awareness: some are researching (informational intent), some are comparing options (commercial intent), and some are ready to buy (transactional intent).",
      "The consumer search intent framework maps all keyword types onto the buying journey. Informational keywords ('what should I feed my senior cat') attract top-of-funnel visitors. Commercial investigation keywords ('best organic cat food vs regular cat food') capture comparison shoppers. Transactional keywords ('buy grain free wet cat food online delivery') capture ready-to-buy customers. Navigational keywords ('Blue Buffalo cat food reviews') capture brand-aware searchers.",
      "To find these keywords for your own business, start with a brainstorming session. List out every question your customers have ever asked you, every problem your product solves, and every comparison your prospects make. Then expand each one: add modifiers like 'best,' 'top rated,' 'affordable,' 'for beginners,' 'step by step,' '2025,' 'guide,' 'checklist,' 'review,' 'comparison,' 'vs,' 'near me,' and 'online delivery.' This alone can generate hundreds of consumer intent keywords.",
      "Remember, the best keyword opportunities are not the ones with the highest search volume — they are the ones where search intent, low competition, and your expertise perfectly intersect. A keyword like 'how to transition cat to new food without diarrhea' may only get 150 monthly searches, but if you sell cat food, every single one of those searchers is a qualified buyer. That is the power of consumer search intent.",
    ],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.body[0].slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{post.title}</h1>
      <time className="text-sm text-gray-400 mb-8 block">{post.date}</time>

      <div className="prose prose-slate max-w-none space-y-4 text-gray-700 leading-relaxed">
        {post.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-10 text-sm">
        <Link href="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
      </div>
    </article>
  );
}
