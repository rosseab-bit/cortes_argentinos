import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CortePanel } from "../../../components/CortePanel";
import { getCorteBySlug } from "../../../lib/cortes";

type CortePageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CortePageProps): Promise<Metadata> {
  const { slug } = await params;
  const corte = getCorteBySlug(slug);
  if (!corte) return { title: "Corte no encontrado" };
  return {
    title: corte.nombre,
    description: `${corte.descripcion} Ideas de cocción y usos para ${corte.nombre.toLowerCase()}.`,
    openGraph: { title: `${corte.nombre} — Cortes Argentinos`, description: corte.descripcion }
  };
}

export default async function CortePage({ params }: CortePageProps) {
  const { slug } = await params;
  const corte = getCorteBySlug(slug);
  if (!corte) notFound();

  return (
    <main className="detail-page">
      <header className="detail-topbar">
        <Link href="/" className="brand brand-link">
          <span className="brand-mark" aria-hidden="true">CA</span>
          <span>Cortes <em>Argentinos</em></span>
        </Link>
        <Link href="/" className="back-link">← Volver al mapa</Link>
      </header>
      <div className="detail-page-content">
        <p className="eyebrow">Guía de cortes · Argentina</p>
        <CortePanel corte={corte} standalone />
        <Link href="/" className="text-link">Explorar todos los cortes <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
