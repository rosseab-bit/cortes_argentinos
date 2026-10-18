import { NextResponse } from "next/server";
import { getCortes, searchCortes } from "../../../lib/cortes";

export const runtime = "nodejs";

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const cortes = query ? searchCortes(query) : getCortes();
  return NextResponse.json({ cortes });
}
