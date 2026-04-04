import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;

  if (!baseUrl || !token) {
    return NextResponse.json(
      { error: "API is not configured" },
      { status: 503 }
    );
  }

  const { searchParams } = request.nextUrl;
  const params = new URLSearchParams();

  const page = searchParams.get("page");
  if (page) params.set("page", page);

  const limit = searchParams.get("limit");
  if (limit) params.set("limit", limit);

  const category = searchParams.get("category");
  if (category) params.set("category", category);

  const search = searchParams.get("search");
  if (search) params.set("search", search);

  const featured = searchParams.get("featured");
  if (featured) params.set("featured", featured);

  const qs = params.toString();
  const res = await fetch(`${baseUrl}/articles${qs ? `?${qs}` : ""}`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to search articles" },
      { status: res.status }
    );
  }

  const json = await res.json();

  if (!json.success) {
    return NextResponse.json(
      { error: "Search unavailable" },
      { status: 502 }
    );
  }

  return NextResponse.json({
    articles: json.data,
    pagination: json.meta.pagination,
  });
}
