import type { Metadata } from "next";
import { getCategories } from "@/lib/supabase";
import { seedCategories } from "@/lib/seed-data";
import CategoryGrid from "@/components/home/CategoryGrid";

export const metadata: Metadata = {
  title: "All Categories — Browse Keywords by Niche",
  description:
    "Browse blue-ocean keywords by niche. Find untapped long-tail keywords in health, finance, pets, food, tech, and more categories.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const displayCategories = categories.length > 0 ? categories : seedCategories;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        All Categories
      </h1>
      <p className="text-gray-500 mb-8">
        Browse blue-ocean keywords organized by niche. Each category contains
        hand-picked keywords with low competition and real search volume.
      </p>

      <CategoryGrid categories={displayCategories} />
    </div>
  );
}
