"use server";

import { cookies } from "next/headers";
import { fetchArticles } from "@/lib/searchquery";
import type { Article } from "@/lib/article-utils";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export async function searchArticles(opts: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<{ articles: Article[]; pagination: Pagination } | null> {
  const params = new URLSearchParams();
  if (opts.search) params.set("search", opts.search);
  if (opts.category) params.set("category", opts.category);
  if (opts.page) params.set("page", String(opts.page));
  params.set("limit", String(opts.limit ?? 5));

  return fetchArticles(params.toString());
}

export async function toggleSubscription(): Promise<boolean> {
  const cookieStore = await cookies();
  const current = cookieStore.get("vercel-daily-subscribed")?.value === "true";
  const next = !current;

  cookieStore.set("vercel-daily-subscribed", String(next), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return next;
}
