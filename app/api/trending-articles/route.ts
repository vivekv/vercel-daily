import { NextResponse } from "next/server";

export async function GET() {
  const trendingArticles = [
    {
      id: "1",
      headline: "Vercel Expands Global Edge Network to 30 New Regions",
      category: "Infrastructure",
      publishDate: "2026-03-21",
      slug: "global-edge-network-expansion",
      imageSrc: "/next.svg",
      imageAlt: "Global edge network expansion",
    },
    {
      id: "2",
      headline: "React Server Components in Production: A Case Study",
      category: "Engineering",
      publishDate: "2026-03-19",
      slug: "react-server-components-production",
      imageSrc: "/next.svg",
      imageAlt: "React Server Components case study",
    },
    {
      id: "3",
      headline: "Building a Design System That Scales: Lessons from Vercel",
      category: "Design",
      publishDate: "2026-03-23",
      slug: "design-system-that-scales",
      imageSrc: "/next.svg",
      imageAlt: "Design system article",
    },
    {
      id: "4",
      headline: "Community Spotlight: Open Source Projects Powered by Vercel",
      category: "Community",
      publishDate: "2026-03-17",
      slug: "community-spotlight-open-source",
      imageSrc: "/next.svg",
      imageAlt: "Community spotlight",
    },
  ];

  return NextResponse.json(trendingArticles);
}
