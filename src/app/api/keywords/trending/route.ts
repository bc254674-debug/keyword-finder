import { NextRequest, NextResponse } from "next/server";
import { getTrendingKeywords } from "@/lib/supabase";
import { seedKeywords } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "10"));

  const data = await getTrendingKeywords(limit);

  if (data.length > 0) {
    return NextResponse.json({ keywords: data });
  }

  const trending = seedKeywords
    .filter((k) => k.is_trending)
    .sort((a, b) => b.opportunity_score - a.opportunity_score)
    .slice(0, limit);

  return NextResponse.json({ keywords: trending });
}
