export function ArticleLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Article Header Skeleton */}
      <header className="border-b border-border bg-background px-16 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-4 w-4 rounded bg-muted" />
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
          <div className="h-10 w-full rounded bg-muted" />
          <div className="mt-3 h-10 w-3/4 rounded bg-muted" />
          <div className="mt-4 h-5 w-40 rounded bg-muted" />
        </div>
      </header>

      {/* Featured Image Skeleton */}
      <div className="w-full bg-muted">
        <div className="mx-auto max-w-4xl px-16 py-8">
          <div className="aspect-video w-full rounded-lg bg-muted-foreground/10" />
        </div>
      </div>

      {/* Article Body Skeleton */}
      <div className="bg-background px-16 py-12">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-5/6 rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-4/6 rounded bg-muted" />
          <div className="mt-8 h-7 w-1/2 rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-3/4 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
