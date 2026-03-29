import { Suspense } from "react";
import { ArticleContent } from "@/components/article-content";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense>
      <ArticleContent params={params} />
    </Suspense>
  );
}

