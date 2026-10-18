import { NextResponse } from "next/server";
import { getCorteBySlug } from "../../../../lib/cortes";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const corte = getCorteBySlug(slug);
  if (!corte) return NextResponse.json({ error: "No encontramos ese corte." }, { status: 404 });
  return NextResponse.json({ corte });
}
