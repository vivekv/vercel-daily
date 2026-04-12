import { cacheLife, cacheTag } from "next/cache";

export async function fetchArticles(qs: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("search", `search-${qs}`);

  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;
  if (!baseUrl || !token) return null;

  const res = await fetch(`${baseUrl}/articles${qs ? `?${qs}` : ""}`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) return null;
  const json = await res.json();
  if (!json.success) return null;

  return {
    articles: json.data,
    pagination: json.meta.pagination,
  };
}
