import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { ArticleContent } from "@/components/article-content";
import { TrendingArticles } from "@/components/trending-articles";
import { ArticleLoading } from "@/components/article-loading";
import { getArticle, getTrending, getAllArticleSlugs } from "@/lib/article-utils";

export async function generateStaticParams() {
  const articles = await getAllArticleSlugs();
  return articles.map((article) => ({
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
    }
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
      <Suspense fallback={<ArticleLoading />}>
        <ArticlePageContent params={params} />
      </Suspense>
      <Suspense>
        <TrendingSection params={params} />
      </Suspense>
    </>
  );
}

