import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";

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

      <AdSlot position="leaderboard" className="mt-12" />

      <div className="mt-10 text-sm">
        <Link href="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
      </div>
    </article>
  );
}
