import { notFound } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import type { Metadata } from "next";
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

async function getTrending(exclude?: string): Promise<TrendingArticle[]> {
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

export async function generateStaticParams() {
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
    slug: [article.slug, article.id],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articleId = slug[slug.length - 1];
  const article = await getArticle(articleId);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author.name] : undefined,
      images: [{ url: article.image, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

async function ArticlePageContent({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const articleId = slug[slug.length - 1];
  const article = await getArticle(articleId);

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}

async function TrendingSection({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const articleId = slug[slug.length - 1];
  const trending = await getTrending(articleId);

  return <TrendingArticles articles={trending} />;
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
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

