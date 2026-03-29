"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  id: string;
  headline: string;
  category: string;
  publishDate: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

interface SearchResponse {
  articles: Article[];
  categories: string[];
}

export function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(
    !!searchParams.get("q") || !!searchParams.get("category")
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      const qs = params.toString();
      router.replace(`/search${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  const performSearch = useCallback(
    async (q: string, cat: string) => {
      setLoading(true);
      setHasSearched(true);
      updateUrl(q, cat);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (cat) params.set("category", cat);
        const res = await fetch(`/api/search?${params.toString()}`);
        const data: SearchResponse = await res.json();
        setArticles(data.articles);
        if (data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    },
    [updateUrl]
  );

  // Load initial results (either from URL params or default recent articles)
  useEffect(() => {
    const initialQ = searchParams.get("q") ?? "";
    const initialCat = searchParams.get("category") ?? "";
    if (initialQ || initialCat) {
      performSearch(initialQ, initialCat);
    } else {
      // Load recent articles as default
      setLoading(true);
      fetch("/api/search")
        .then((res) => res.json())
        .then((data: SearchResponse) => {
          setArticles(data.articles);
          setCategories(data.categories);
        })
        .catch(() => setArticles([]))
        .finally(() => setLoading(false));
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length >= 3) {
      debounceRef.current = setTimeout(() => {
        performSearch(value, category);
      }, 300);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    performSearch(query, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    performSearch(query, category);
  };

  return (
    <div className="w-full bg-background px-16 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Search Articles
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-4 sm:flex-row">
          <input
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50"
          />
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[30vh] items-center justify-center">
            <div className="flex items-center gap-3 text-muted-foreground">
              <svg
                className="size-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Searching...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            {/* Section heading */}
            <h2 className="mb-6 text-lg font-medium text-muted-foreground">
              {hasSearched
                ? `${articles.length} result${articles.length !== 1 ? "s" : ""} found`
                : "Recent Articles"}
            </h2>

            {articles.length === 0 ? (
              <div className="flex min-h-[30vh] items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground">
                    No articles found
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search terms or clearing the category
                    filter.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={article.href}
                    className="group"
                  >
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
                            {new Date(
                              article.publishDate
                            ).toLocaleDateString("en-US", {
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
