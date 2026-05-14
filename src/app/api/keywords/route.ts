import { NextRequest, NextResponse } from "next/server";
import { getKeywordsPaginated } from "@/lib/supabase";
import { seedKeywords } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "20"));
  const category = searchParams.get("category") || undefined;
  const language = searchParams.get("lang") || undefined;

  const { keywords, total } = await getKeywordsPaginated(page, limit, {
    language,
    categoryId: category ? parseInt(category) : undefined,
  });

  if (keywords.length > 0) {
    return NextResponse.json({ keywords, total, page, limit });
  }

  let filtered = seedKeywords;
  if (language) filtered = filtered.filter((k) => k.language === language);
  if (category) {
    const catId = parseInt(category);
    filtered = filtered.filter((k) => k.category_id === catId);
  }

  const start = (page - 1) * limit;
  return NextResponse.json({
    keywords: filtered.slice(start, start + limit),
    total: filtered.length,
    page,
    limit,
  });
}
