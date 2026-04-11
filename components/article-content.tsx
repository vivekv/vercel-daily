import Image from "next/image";
import { Suspense } from "react";
import { ArticleBody } from "@/components/article-body";

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

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="flex flex-col">
      {/* Article Header */}
      <header className="border-b border-border bg-background px-16 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{article.category}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {article.title}
          </h1>
          {article.author && (
            <p className="mt-4 text-lg text-muted-foreground">
              By {article.author.name}
            </p>
          )}
        </div>
      </header>

      {/* Featured Image */}
      <div className="w-full bg-muted">
        <div className="mx-auto max-w-4xl px-16 py-8">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Article Body — server-side paywall check */}
      <Suspense>
        <ArticleBody article={article} />
      </Suspense>
    </div>
  );
}
