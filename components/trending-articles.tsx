import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface TrendingArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
}

export function TrendingArticles({
  articles,
}: {
  articles: TrendingArticle[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-background px-16 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          Trending Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((item) => (
            <Link
              key={item.id}
              href={`/articles/${item.slug}/${item.id}`}
              className="group"
            >
              <Card className="h-full transition-shadow group-hover:shadow-lg">
                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
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
                    <time dateTime={item.publishedAt}>
                      {new Date(item.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </CardDescription>
                  <CardTitle className="line-clamp-2 text-sm group-hover:underline">
                    {item.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
