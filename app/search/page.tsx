import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { SearchContent } from "@/components/search-content";
import { getCategories } from "@/lib/article-utils";
import { fetchArticles } from "@/lib/searchquery";

export const metadata: Metadata = {
  title: "Search Articles – Vercel Daily",
  description: "Search and browse the latest articles, tutorials, and news on Vercel Daily.",
  openGraph: {
    title: "Search Articles – Vercel Daily",
    description: "Search and browse the latest articles, tutorials, and news on Vercel Daily.",
  },
};

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  await connection();
  const { q, category } = await searchParams;

  const params = new URLSearchParams();
  if (q) params.set("search", q);
  if (category) params.set("category", category);
  params.set("limit", "5");

  const [categories, initialData] = await Promise.all([
    getCategories(),
    fetchArticles(params.toString()),
  ]);

  return (
    <SearchContent
      categories={categories}
      initialArticles={initialData?.articles ?? []}
      initialPagination={initialData?.pagination ?? null}
    />
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  return (
    <Suspense>
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}
