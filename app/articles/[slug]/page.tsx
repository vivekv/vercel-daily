import { notFound } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { ArticleContent } from "@/components/article-content";
import { TrendingArticles } from "@/components/trending-articles";

interface Article {
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

interface TrendingArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`article-${slug}`);

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

async function getTrending(): Promise<TrendingArticle[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("trending");

  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;
  if (!baseUrl || !token) return [];

  const res = await fetch(`${baseUrl}/articles/trending`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) return [];
  const json = await res.json();
  if (!json.success) return [];
  return json.data as TrendingArticle[];
}

async function ArticlePageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}

async function TrendingSection({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [article, trending] = await Promise.all([
    getArticle(slug),
    getTrending(),
  ]);

  const filteredTrending = article
    ? trending.filter((item) => item.id !== article.id)
    : trending;

  return <TrendingArticles articles={filteredTrending} />;
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      <ArticlePageContent params={params} />
      <Suspense>
        <TrendingSection params={params} />
      </Suspense>
    </>
  );
}

