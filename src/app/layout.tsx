import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MonetagAd from "@/components/ads/MonetagAd";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  verification: {
    google: "2FL3q88IIuMuQOXKE1pDzkaTdDIJNF5DKUrbb_sZH4k",
  },
  title: {
    default: "KeywordFinder — Free Keyword Research Tool | Discover Untapped Keywords & GEO Topics",
    template: "%s | KeywordFinder",
  },
  description:
    "Free keyword research tool for indie bloggers, niche site builders, and content creators. Discover untapped long-tail keywords, AI-friendly search queries, and GEO-optimized topics with real search volume and genuinely weak competition. Find what your potential customers are searching for — no expensive tools required.",
  keywords: [
    "keyword research",
    "long-tail keywords",
    "SEO tool",
    "niche keywords",
    "blue ocean keywords",
    "low competition keywords",
    "GEO optimization",
    "AI search keywords",
    "generative engine optimization",
    "consumer search intent",
    "content marketing strategy",
    "keyword discovery tool",
    "search volume analysis",
    "competition analysis",
    "SERP analysis",
  ],
  openGraph: {
    title: "KeywordFinder — Free Keyword Research Tool | Discover Untapped Keywords & GEO Topics",
    description:
      "Free keyword research for indie bloggers. Find long-tail keywords, AI-optimized search queries, and low-competition topics with real volume. Discover what your audience is searching for — no expensive tools required.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MonetagAd />
        <Analytics />
      </body>
    </html>
  );
}
