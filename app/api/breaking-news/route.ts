import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;

  if (!baseUrl || !token) {
    return NextResponse.json(
      { error: "Breaking news API is not configured" },
      { status: 503 }
    );
  }

  const res = await fetch(`${baseUrl}/breaking-news`, {
    headers: { "x-vercel-protection-bypass": token },
    next: { revalidate: 180 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch breaking news" },
      { status: res.status }
    );
  }

  const json = await res.json();

  if (!json.success) {
    return NextResponse.json(
      { error: "Breaking news unavailable" },
      { status: 502 }
    );
  }

  const { headline, summary, articleId, category, publishedAt, urgent } = json.data;

  const response = NextResponse.json({
    headline,
    summary,
    articleId,
    category,
    publishedAt,
    urgent,
  });

  response.headers.set("Cache-Control", "public, s-maxage=180, stale-while-revalidate=60");

  return response;
}
