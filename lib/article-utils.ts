import { cacheLife, cacheTag } from "next/cache";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown[];
  category: string;
  author: { name: string; avatar: string } | null;
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

export interface TrendingArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;
  if (!baseUrl || !token) return null;

  const res = await fetch(`${baseUrl}/articles/${encodeURIComponent(slug)}`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) return null;
  const json = await res.json();
  if (!json.success) return null;
  return json.data as Article;
}

export async function getTrending(exclude?: string): Promise<TrendingArticle[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("trending");

  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;
  if (!baseUrl || !token) return [];

  const url = new URL(`${baseUrl}/articles/trending`);
  if (exclude) url.searchParams.set("exclude", exclude);

  const res = await fetch(url, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) return [];
  const json = await res.json();
  if (!json.success) return [];
  return json.data as TrendingArticle[];
}

export async function getAllArticleSlugs(): Promise<{ slug: string; id: string }[]> {
  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;
  if (!baseUrl || !token) return [];

  const res = await fetch(`${baseUrl}/articles?limit=100`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) return [];
  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) return [];

  return json.data.map((article: { slug: string; id: string }) => ({
    slug: article.slug,
    id: article.id,
  }));
}
