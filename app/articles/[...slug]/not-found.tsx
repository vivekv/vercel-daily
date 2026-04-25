import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-background px-16 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Article not found
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The article you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Back to home
          </Link>
          <Link
            href="/search"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            Search articles &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
