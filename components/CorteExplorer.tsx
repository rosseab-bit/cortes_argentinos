"use client";

import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import { useMemo, useState } from "react";
import { Buscador } from "./Buscador";
import { CortePanel } from "./CortePanel";
import { CowMap } from "./CowMap";
import type { Corte, CorteDetalle } from "../lib/types";

type CorteExplorerProps = { cortes: Corte[] };

export function CorteExplorer({ cortes }: CorteExplorerProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<CorteDetalle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const visibleCortes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es-AR");
    return query ? cortes.filter((corte) => corte.nombre.toLocaleLowerCase("es-AR").includes(query)) : cortes;
  }, [cortes, search]);
  const highlightedSlug = visibleCortes.length === 1 && search.trim() ? visibleCortes[0].slug : null;

  async function selectCorte(slug: string) {
    setSelectedSlug(slug);
    setLoading(true);
    setError(null);
    setSheetExpanded(false);
    try {
      const response = await fetch(`/api/cortes/${encodeURIComponent(slug)}`, { cache: "no-store" });
      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error ?? `No se pudo cargar el corte (${response.status}).`);
      }
      const body = (await response.json()) as { corte: CorteDetalle };
      setDetail(body.corte);
    } catch (caught) {
      setDetail(null);
      setError(caught instanceof Error ? caught.message : "Ocurrió un error al cargar el corte.");
    } finally {
      setLoading(false);
    }
  }

  function onSearch(value: string) {
    setSearch(value);
    const match = cortes.find((corte) => corte.nombre.toLocaleLowerCase("es-AR") === value.trim().toLocaleLowerCase("es-AR"));
    if (match) void selectCorte(match.slug);
  }

  function onSheetPointerUp(event: PointerEvent<HTMLButtonElement>) {
    const distance = (event.currentTarget.dataset.startY ? Number(event.currentTarget.dataset.startY) : event.clientY) - event.clientY;
    if (distance > 32) setSheetExpanded(true);
    else if (distance < -32) setSheetExpanded(false);
    else setSheetExpanded((current) => !current);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">CA</span>
          <span>Cortes <em>Argentinos</em></span>
        </Link>
        <div className="topbar-note"><span className="status-dot" />Una guía de nuestra carne</div>
        <Link href="/mapa" className="topbar-link">Ver solo el mapa <span aria-hidden="true">↗</span></Link>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />EL MAPA DE LA CARNE ARGENTINA</p>
          <h1>Cada corte tiene<br />su <em>historia.</em></h1>
          <p className="hero-description">Un recorrido por los cortes vacunos de siempre, cómo reconocerlos y la mejor forma de llevarlos a la mesa.</p>
        </div>
        <div className="hero-stamp" aria-label={`${cortes.length} cortes para descubrir`}>
          <span>{String(cortes.length).padStart(2, "0")}</span>
          <small>cortes<br />para descubrir</small>
        </div>
      </section>
      <section className="explorer" id="explorar" aria-label="Explorador de cortes vacunos">
        <div className="explorer-toolbar">
          <div><span className="eyebrow">EL DESPOSTE</span><h2>Conocé cada corte</h2></div>
          <Buscador cortes={cortes} value={search} onChange={onSearch} />
        </div>
        <div className="explorer-grid">
          <section className="map-card" aria-label="Mapa de la vaca">
            <div className="map-card-heading"><span>01 <i /> MAPA INTERACTIVO</span><div className="zoom-controls" aria-label="Controles de zoom"><button type="button" onClick={() => setZoom((current) => Math.min(1.4, Number((current + 0.1).toFixed(1))))} aria-label="Acercar mapa">+</button><button type="button" onClick={() => setZoom((current) => Math.max(0.8, Number((current - 0.1).toFixed(1))))} aria-label="Alejar mapa">−</button><button type="button" onClick={() => setZoom(1)} aria-label="Restablecer zoom">↺</button></div></div>
            <div className="map-zoom" style={{ "--map-zoom": zoom } as CSSProperties}>
              <CowMap cortes={visibleCortes} selectedSlug={selectedSlug} highlightedSlug={highlightedSlug ?? (search ? visibleCortes[0]?.slug ?? null : null)} onSelect={(slug) => void selectCorte(slug)} />
            </div>
          </section>
          <aside className={`detail-card${detail ? " has-selection" : ""}`} aria-live="polite">
            {loading && <div className="panel-state"><span className="loader" /><p>Buscando el corte…</p></div>}
            {!loading && error && <div className="panel-state error-state"><span className="state-icon">!</span><h3>No pudimos cargarlo</h3><p>{error}</p><button className="text-button" onClick={() => selectedSlug && void selectCorte(selectedSlug)}>Intentar de nuevo</button></div>}
            {!loading && !error && detail && <CortePanel corte={detail} />}
            {!loading && !error && !detail && (
              <div className="empty-state">
                <div className="empty-illustration" aria-hidden="true"><span>✳</span><i /><b /></div>
                <span className="eyebrow">A TU RITMO</span>
                <h3>Elegí por dónde<br />empezar.</h3>
                <p>Tocá un corte para ver sus usos, sus características y formas de cocinarlo.</p>
                <div className="empty-rule"><span>BUEN PROVECHO</span><i /></div>
              </div>
            )}
          </aside>
        </div>
        <div className="results-note" aria-live="polite">
          {search && <span>{visibleCortes.length ? `${visibleCortes.length} ${visibleCortes.length === 1 ? "corte encontrado" : "cortes encontrados"}` : "No encontramos cortes con ese nombre"}</span>}
          {cortes.length === 0 && <span className="seed-warning">Todavía no hay cortes cargados. Ejecutá <code>npm run db:seed</code>.</span>}
        </div>
      </section>
      <footer className="site-footer"><span>Hecho para compartir la mesa.</span><span>BUENOS AIRES · ARGENTINA</span></footer>
      {detail && (
        <section className={`mobile-sheet${sheetExpanded ? " is-expanded" : ""}`} aria-label={`Detalle de ${detail.nombre}`}>
          <button
            type="button"
            className="sheet-handle"
            aria-label={sheetExpanded ? "Reducir panel" : "Expandir panel"}
            onPointerDown={(event) => { event.currentTarget.dataset.startY = String(event.clientY); }}
            onPointerUp={onSheetPointerUp}
          ><span /></button>
          <div className="sheet-content"><CortePanel corte={detail} /></div>
        </section>
      )}
    </main>
  );
}
