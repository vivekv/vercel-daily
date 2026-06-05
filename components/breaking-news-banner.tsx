import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";

interface BreakingNews {
  headline: string;
  summary: string;
  articleId: string;
  category: string;
  publishedAt: string;
  urgent: boolean;
}

async function getBreakingNews(): Promise<BreakingNews | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("breaking-news");

  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;
  if (!baseUrl || !token) return null;

  const res = await fetch(`${baseUrl}/breaking-news`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) return null;
  const json = await res.json();
  if (!json.success) return null;

  return json.data as BreakingNews;
}

export async function BreakingNewsBanner() {
  "use cache";
  cacheLife("minutes");
  cacheTag("breaking-news-banner");

  const news = await getBreakingNews();

  if (!news) return null;

  return (
    <div className="w-full bg-destructive text-primary-foreground">
      <div className="flex items-center gap-3 px-16 py-2">
        <span className="shrink-0 rounded bg-primary-foreground px-2 py-0.5 text-xs font-bold uppercase text-destructive">
          Breaking News
        </span>
        <Link href={`/articles/${news.articleId}`} className="truncate text-sm font-medium hover:underline">
          {news.headline}
        </Link>
      </div>
    </div>
  );
}
