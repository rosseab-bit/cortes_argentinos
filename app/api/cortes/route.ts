import { NextResponse } from "next/server";
import { getCortes } from "../../../lib/cortes";
import { parseLocale, translateCorte } from "../../../lib/i18n";

export const runtime = "nodejs";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const locale = parseLocale(params.get("locale") ?? undefined);
  const query = params.get("q")?.trim().toLocaleLowerCase(locale) ?? "";
  const cortes = getCortes()
    .map((corte) => translateCorte(corte, locale))
    .filter((corte) => !query || corte.nombre.toLocaleLowerCase(locale).includes(query));
  return NextResponse.json({ cortes });
}
