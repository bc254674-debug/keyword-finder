import { NextResponse } from "next/server";
import { getCategories } from "@/lib/supabase";
import { seedCategories } from "@/lib/seed-data";

export async function GET() {
  const data = await getCategories();

  if (data.length > 0) {
    return NextResponse.json({ categories: data });
  }

  return NextResponse.json({ categories: seedCategories });
}
