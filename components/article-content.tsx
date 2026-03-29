"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Article {
  slug: string;
  headline: string;
  category: string;
  publishDate: string;
  author: string;
  imageSrc: string;
  imageAlt: string;
  body: string;
}

interface TrendingArticle {
  id: string;
  headline: string;
  category: string;
  publishDate: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
}

export function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [trending, setTrending] = useState<TrendingArticle[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/articles/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data: Article | null) => {
        if (data) setArticle(data);
      })
      .catch(() => setNotFound(true));

    fetch("/api/trending-articles")
      .then((res) => res.json())
      .then((data: TrendingArticle[]) => setTrending(data))
      .catch(() => setTrending([]));
  }, [slug]);

  if (notFound) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <p className="mt-2 text-muted-foreground">Article not found</p>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Article Header */}
      <header className="border-b border-border bg-background px-16 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{article.category}</span>
            <span>·</span>
            <time dateTime={article.publishDate}>
              {new Date(article.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {article.headline}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            By {article.author}
          </p>
        </div>
      </header>

      {/* Featured Image */}
      <div className="w-full bg-muted">
        <div className="mx-auto max-w-4xl px-16 py-8">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={article.imageSrc}
              alt={article.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="bg-background px-16 py-12">
        <div className="prose prose-neutral mx-auto max-w-3xl text-foreground">
          {article.body.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={i} className="mt-8 mb-4 text-xl font-semibold text-foreground">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-foreground">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>

      {/* Subscribe CTA */}
      <section className="border-y border-border bg-muted/50 px-16 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Stay up to date
          </h2>
          <p className="mt-2 text-muted-foreground">
            Get the latest articles and news delivered straight to your inbox.
          </p>
          <div className="mt-6">
            {subscribed ? (
              <p className="font-medium text-primary">
                Thanks for subscribing!
              </p>
            ) : (
              <Button size="lg" onClick={() => setSubscribed(true)}>
                Subscribe to Newsletter
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Trending Articles */}
      {trending.length > 0 && (
        <section className="bg-background px-16 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Trending Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trending.map((item) => (
                <Link
                  key={item.id}
                  href={`/articles/${item.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-shadow group-hover:shadow-lg">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardDescription>
                        <span className="font-semibold text-primary">
                          {item.category}
                        </span>
                        <span className="mx-2">·</span>
                        <time dateTime={item.publishDate}>
                          {new Date(item.publishDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </CardDescription>
                      <CardTitle className="line-clamp-2 text-sm group-hover:underline">
                        {item.headline}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
