import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { CortePanel } from "../../../components/CortePanel";
import { getCorteBySlug } from "../../../lib/cortes";
import { parseLocale, translate, translateCorte } from "../../../lib/i18n";
import { LanguageSelector } from "../../../components/LanguageSelector";

type CortePageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CortePageProps): Promise<Metadata> {
  const { slug } = await params;
  const corte = getCorteBySlug(slug);
  const locale = parseLocale((await cookies()).get("locale")?.value);
  if (!corte) return { title: translate(locale, "notFoundTitle") };
  const localized = translateCorte(corte, locale);
  const title = `${localized.nombre} — ${translate(locale, "appTitle").split(" — ")[0]}`;
  const description = `${localized.descripcion} ${translate(locale, "ideas")} ${localized.nombre.toLowerCase()}.`;
  const openGraphLocale = locale === "pt" ? "pt_BR" : locale === "en" ? "en_US" : "es_AR";
  return {
    title: localized.nombre,
    description,
    alternates: { canonical: `/cortes/${encodeURIComponent(slug)}` },
    openGraph: {
      type: "article",
      url: `https://cortefino.fyi/cortes/${encodeURIComponent(slug)}`,
      siteName: translate(locale, "appTitle").split(" — ")[0],
      title,
      description,
      locale: openGraphLocale
    },
    twitter: { card: "summary", title, description }
  };
}

export default async function CortePage({ params }: CortePageProps) {
  const { slug } = await params;
  const locale = parseLocale((await cookies()).get("locale")?.value);
  const storedCorte = getCorteBySlug(slug);
  const corte = storedCorte ? translateCorte(storedCorte, locale) : null;
  if (!corte) notFound();

  return (
    <main className="detail-page">
      <header className="detail-topbar">
        <Link href="/" className="brand brand-link">
          <span className="brand-mark" aria-hidden="true">CA</span>
          <span>Cortes <em>Argentinos</em></span>
        </Link>
        <div className="detail-topbar-actions"><LanguageSelector /><Link href="/" className="back-link">{translate(locale, "backToMap")}</Link></div>
      </header>
      <div className="detail-page-content">
        <p className="eyebrow">{translate(locale, "guideEyebrow")}</p>
        <CortePanel corte={corte} standalone />
        <Link href="/" className="text-link">{translate(locale, "exploreAll")} <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
