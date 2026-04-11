"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useSubscription } from "@/components/subscription-provider";
import { SubscribeButton } from "@/components/subscribe-button";

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

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const { subscribed } = useSubscription();

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

      {/* Article Body / Paywall */}
      {subscribed ? (
        <>
          <article className="bg-background px-16 py-12">
            <div className="prose prose-neutral mx-auto max-w-3xl text-foreground">
              {article.excerpt && (
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
              )}
              {article.content.map((block, i) => {
                if (typeof block === "string") {
                  return (
                    <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                      {block}
                    </p>
                  );
                }
                const b = block as { type?: string; text?: string };
                if (b.type === "heading") {
                  return (
                    <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-foreground">
                      {b.text}
                    </h2>
                  );
                }
                if (b.type === "paragraph" && b.text) {
                  return (
                    <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                      {b.text}
                    </p>
                  );
                }
                return null;
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
                <p className="font-medium text-primary">
                  Thanks for subscribing!
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-background px-16 py-12">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
            <div className="relative">
              <div className="pointer-events-none h-24 bg-gradient-to-b from-transparent to-background" />
              <div className="border-t border-border pt-8 text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  Subscribe to read the full article
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Get unlimited access to all Vercel Daily articles.
                </p>
                <div className="mt-6">
                  <SubscribeButton />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
