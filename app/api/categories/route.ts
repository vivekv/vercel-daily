import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.VERCEL_API_BASE_URL;
  const token = process.env.VERCEL_API_TOKEN;

  if (!baseUrl || !token) {
    return NextResponse.json(
      { error: "API is not configured" },
      { status: 503 }
    );
  }

  const res = await fetch(`${baseUrl}/categories`, {
    headers: { "x-vercel-protection-bypass": token },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: res.status }
    );
  }

  const json = await res.json();

  if (!json.success) {
    return NextResponse.json(
      { error: "Categories unavailable" },
      { status: 502 }
    );
  }

  return NextResponse.json(json.data);
}
