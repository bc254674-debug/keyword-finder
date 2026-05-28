import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured =
  supabaseUrl &&
  !supabaseUrl.includes("your-project-id") &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes("your-");

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (!isConfigured) return null;
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}

// Supabase free tier pauses after inactivity. A cold start takes 5-10s,
// which exceeds Vercel's 10s function timeout. This wrapper returns the
// fallback value if the query doesn't complete within the time budget,
// so pages can degrade to seed data instead of timing out entirely.
async function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  const timer = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  return Promise.race([promise, timer]);
}

const DB_TIMEOUT_MS = 4000;

export async function getCategories() {
  const supabase = getClient();
  if (!supabase) return [];
  const promise = (async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("keyword_count", { ascending: false });
    if (error) return [];
    return data;
  })();
  return withTimeout(promise, DB_TIMEOUT_MS, []);
}

export async function getTrendingKeywords(limit = 8) {
  const supabase = getClient();
  if (!supabase) return [];
  const promise = (async () => {
    const { data, error } = await supabase
      .from("keywords")
      .select("*, category:categories(*)")
      .eq("is_trending", true)
      .order("opportunity_score", { ascending: false })
      .limit(limit);
    if (error) return [];
    return data;
  })();
  return withTimeout(promise, DB_TIMEOUT_MS, []);
}

export async function getKeywordsByCategory(
  categorySlug: string,
  page = 1,
  limit = 20
) {
  const supabase = getClient();
  if (!supabase) return { keywords: [], total: 0 };
  const promise = (async () => {
    const { data: catData } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();
    if (!catData) return { keywords: [], total: 0 };
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, count, error } = await supabase
      .from("keywords")
      .select("*, category:categories(*)", { count: "exact" })
      .eq("category_id", catData.id)
      .order("opportunity_score", { ascending: false })
      .range(from, to);
    if (error) return { keywords: [], total: 0 };
    return { keywords: data, total: count || 0 };
  })();
  return withTimeout(promise, DB_TIMEOUT_MS, { keywords: [], total: 0 });
}

export async function getKeywordBySlug(slug: string) {
  const supabase = getClient();
  if (!supabase) return null;
  const promise = (async () => {
    const { data, error } = await supabase
      .from("keywords")
      .select("*, category:categories(*)")
      .eq("slug", slug)
      .single();
    if (error) return null;
    return data;
  })();
  return withTimeout(promise, DB_TIMEOUT_MS, null);
}

export async function getAllKeywordSlugs() {
  const supabase = getClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("keywords")
    .select("slug, last_updated");
  if (error) return [];
  return data;
}

export async function getAllCategorySlugs() {
  const supabase = getClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("slug");
  if (error) return [];
  return data;
}

export async function getKeywordsPaginated(
  page = 1,
  limit = 20,
  filters?: { language?: string; categoryId?: number }
) {
  const supabase = getClient();
  if (!supabase) return { keywords: [], total: 0 };
  const promise = (async () => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    let query = supabase
      .from("keywords")
      .select("*, category:categories(*)", { count: "exact" });
    if (filters?.language) query = query.eq("language", filters.language);
    if (filters?.categoryId) query = query.eq("category_id", filters.categoryId);
    const { data, count, error } = await query
      .order("opportunity_score", { ascending: false })
      .range(from, to);
    if (error) return { keywords: [], total: 0 };
    return { keywords: data, total: count || 0 };
  })();
  return withTimeout(promise, DB_TIMEOUT_MS, { keywords: [], total: 0 });
}
