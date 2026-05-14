import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "BlueOcean — Untapped Keywords Your Blog Can Actually Rank For",
    template: "%s | BlueOcean",
  },
  description:
    "Free keyword research tool for indie bloggers and niche site builders. Discover untapped long-tail keywords with real search volume and genuinely weak competition — no expensive tools required.",
  keywords: [
    "keyword research",
    "long-tail keywords",
    "SEO tool",
    "niche keywords",
    "blue ocean keywords",
    "low competition keywords",
  ],
  openGraph: {
    title: "BlueOcean — Untapped Keywords Your Blog Can Actually Rank For",
    description:
      "Free keyword research for indie bloggers. Find long-tail keywords with real volume and weak competition — no expensive tools required.",
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
      </body>
    </html>
  );
}
