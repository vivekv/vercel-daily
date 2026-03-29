"use client";

import { useEffect, useState } from "react";

interface BreakingNews {
  headline: string;
  url: string;
  timestamp: string;
}

export function BreakingNewsBanner() {
  const [news, setNews] = useState<BreakingNews | null>(null);

  useEffect(() => {
    fetch("/api/breaking-news")
      .then((res) => res.json())
      .then((data: BreakingNews) => setNews(data))
      .catch(() => setNews(null));
  }, []);

  if (!news) return null;

  return (
    <div className="w-full bg-destructive text-primary-foreground">
      <div className="flex items-center gap-3 px-16 py-2">
        <span className="shrink-0 rounded bg-primary-foreground px-2 py-0.5 text-xs font-bold uppercase text-destructive">
          Breaking News
        </span>
        <a href={news.url} className="truncate text-sm font-medium hover:underline">
          {news.headline}
        </a>
      </div>
    </div>
  );
}
