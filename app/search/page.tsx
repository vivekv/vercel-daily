import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchContent } from "@/components/search-content";

export const metadata: Metadata = {
  title: "Search Articles – Vercel Daily",
  description: "Search and browse the latest articles, tutorials, and news on Vercel Daily.",
  openGraph: {
    title: "Search Articles – Vercel Daily",
    description: "Search and browse the latest articles, tutorials, and news on Vercel Daily.",
  },
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
