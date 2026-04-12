import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchArticles } from "@/lib/searchquery";

export async function GET(request: NextRequest) {
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
  const data = await fetchArticles(qs);

  if (!data) {
    return NextResponse.json(
      { error: "Failed to search articles" },
      { status: 502 }
    );
  }

  return NextResponse.json(data);
}
