import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;

  if (!baseUrl || !token) {
    return NextResponse.json(
      { error: "API is not configured" },
      { status: 503 }
    );
  }

  const res = await fetch(`${baseUrl}/articles/${encodeURIComponent(slug)}`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (res.status === 404) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: res.status }
    );
  }

  const json = await res.json();

  if (!json.success) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(json.data);
}
