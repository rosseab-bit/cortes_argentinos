import { NextResponse } from "next/server";
import { getCorteBySlug } from "../../../../lib/cortes";
import { parseLocale, translate, translateCorte } from "../../../../lib/i18n";

export const runtime = "nodejs";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const corte = getCorteBySlug(slug);
  const locale = parseLocale(new URL(request.url).searchParams.get("locale") ?? undefined);
  if (!corte) return NextResponse.json({ error: translate(locale, "detailNotFound") }, { status: 404 });
  return NextResponse.json({ corte: translateCorte(corte, locale) });
}
