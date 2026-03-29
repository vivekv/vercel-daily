"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Article {
  id: string;
  headline: string;
  category: string;
  publishDate: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/featured-articles")
      .then((res) => res.json())
      .then((data: Article[]) => setArticles(data))
      .catch(() => setArticles([]));
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="w-full bg-background px-16 py-12">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
        Featured Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={article.href} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                <Image
                  src={article.imageSrc}
                  alt={article.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardDescription>
                  <span className="font-semibold text-primary">
                    {article.category}
                  </span>
                  <span className="mx-2">·</span>
                  <time dateTime={article.publishDate}>
                    {new Date(article.publishDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </CardDescription>
                <CardTitle className="line-clamp-2 group-hover:underline">
                  {article.headline}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
