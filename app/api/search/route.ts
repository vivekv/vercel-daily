import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allArticles = [
  {
    id: "1",
    headline: "Introducing Next.js 16: A New Era of Web Development",
    category: "Product",
    publishDate: "2026-03-27",
    imageSrc: "/next.svg",
    imageAlt: "Next.js 16 announcement",
    href: "/articles/introducing-nextjs-16",
  },
  {
    id: "2",
    headline: "How We Reduced Cold Starts by 90% with Edge Functions",
    category: "Engineering",
    publishDate: "2026-03-25",
    imageSrc: "/next.svg",
    imageAlt: "Edge Functions deep dive",
    href: "/articles/reducing-cold-starts-edge-functions",
  },
  {
    id: "3",
    headline: "Building a Design System That Scales: Lessons from Vercel",
    category: "Design",
    publishDate: "2026-03-23",
    imageSrc: "/next.svg",
    imageAlt: "Design system article",
    href: "/articles/design-system-that-scales",
  },
  {
    id: "4",
    headline: "Vercel Expands Global Edge Network to 30 New Regions",
    category: "Infrastructure",
    publishDate: "2026-03-21",
    imageSrc: "/next.svg",
    imageAlt: "Global edge network expansion",
    href: "/articles/global-edge-network-expansion",
  },
  {
    id: "5",
    headline: "React Server Components in Production: A Case Study",
    category: "Engineering",
    publishDate: "2026-03-19",
    imageSrc: "/next.svg",
    imageAlt: "React Server Components case study",
    href: "/articles/react-server-components-production",
  },
  {
    id: "6",
    headline: "Community Spotlight: Open Source Projects Powered by Vercel",
    category: "Community",
    publishDate: "2026-03-17",
    imageSrc: "/next.svg",
    imageAlt: "Community spotlight",
    href: "/articles/community-spotlight-open-source",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const category = searchParams.get("category") ?? "";

  let results = allArticles;

  if (category) {
    results = results.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    results = results.filter((a) =>
      a.headline.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    articles: results.slice(0, 5),
    categories: [...new Set(allArticles.map((a) => a.category))],
  });
}
