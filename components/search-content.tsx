"use client";

import { useEffect, useRef, useState } from "react";
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
import type { Article } from "@/lib/article-utils";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface SearchResponse {
  articles: Article[];
  pagination: Pagination;
}

export function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // For Persistent Search State req. using URL as source of truth
  const qParam = searchParams.get("q") ?? "";
  const catParam = searchParams.get("category") ?? "";

  // Control and update URL params on user input
  const [inputValue, setInputValue] = useState(qParam);
  const [selectedCategory, setSelectedCategory] = useState(catParam);

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigate to new search URL (triggers the fetch effect below)
  function updateUrl(q: string, cat: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    const qs = params.toString();
    router.replace(`/search${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  // Fetch results whenever URL params change (refresh, share, back/forward, search)
  useEffect(() => {
    setLoading(true);
    // Sync input state from URL (handles browser back/forward)
    setInputValue(qParam);
    setSelectedCategory(catParam);

    const params = new URLSearchParams();
    if (qParam) params.set("search", qParam);
    if (catParam) params.set("category", catParam);
    params.set("limit", "5");

    fetch(`/api/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data: SearchResponse) => {
        setArticles(data.articles);
        setPagination(data.pagination);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [qParam, catParam]);

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: { slug: string; name: string }[]) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length >= 3) {
      debounceRef.current = setTimeout(() => {
        updateUrl(value, selectedCategory);
      }, 300);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateUrl(inputValue, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    updateUrl(inputValue, selectedCategory);
  };

  const hasSearched = !!(qParam || catParam);

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
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50"
          />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
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
                ? `${pagination?.total ?? articles.length} result${(pagination?.total ?? articles.length) !== 1 ? "s" : ""} found`
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
                    href={`/articles/${article.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-shadow group-hover:shadow-lg">
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                        <Image
                          src={article.image}
                          alt={article.title}
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
                          <time dateTime={article.publishedAt}>
                            {new Date(
                              article.publishedAt
                            ).toLocaleDateString("en-US", {
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
