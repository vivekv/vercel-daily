import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { fetchArticles } from "@/lib/searchquery";
import type { Article } from "@/lib/article-utils";

export async function FeaturedArticles() {
  const data = await fetchArticles("featured=true&limit=6");
  const articles: Article[] = data?.articles ?? [];

  if (articles.length === 0) return null;

  return (
    <section className="w-full bg-background px-16 py-12">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
        Featured Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}/${article.id}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardDescription>
                  <span className="font-semibold text-primary">
                    {article.category}
                  </span>
                  <span className="mx-2">·</span>
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </CardDescription>
                <CardTitle className="line-clamp-2 group-hover:underline">
                  {article.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
