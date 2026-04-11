import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SubscribeButton } from "@/components/subscribe-button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center gap-8 px-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Image
            src="/vercelLogo.svg"
            alt="Vercel Daily logo"
            width={24}
            height={24}
            className="dark:invert"
          />
          Vercel Daily
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Search
          </Link>
        </nav>
        <div className="ml-auto">
          <Suspense>
            <SubscribeButton showUnsubscribe refreshOnToggle />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
