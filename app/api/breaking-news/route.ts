import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.BREAKING_NEWS_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Breaking news API is not configured" },
      { status: 503 }
    );
  }

  // Placeholder response until the external API is connected
  const breakingNews = {
    headline:
      "Next.js 16 officially released with groundbreaking performance improvements and new rendering strategies",
    url: "#",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(breakingNews);
}
