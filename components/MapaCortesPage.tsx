"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { CowMap } from "./CowMap";
import type { Corte } from "../lib/types";

type MapaCortesPageProps = { cortes: Corte[] };

export function MapaCortesPage({ cortes }: MapaCortesPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const selectedCorte = cortes.find((corte) => corte.slug === selectedSlug);

  return (
    <main className="map-only-page">
      <header className="map-only-header">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">CA</span>
          <span>Cortes <em>Argentinos</em></span>
        </Link>
        <Link href="/" className="back-link">← Volver al inicio</Link>
      </header>
      <section className="map-only-content" aria-label="Mapa interactivo de cortes vacunos">
        <div className="map-only-title">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />MAPA DE CORTES · VISTA LATERAL</p>
            <h1>La res, corte por corte.</h1>
          </div>
          <div className="map-only-actions">
            {selectedCorte && (
              <Link className="map-only-detail-link" href={`/cortes/${selectedCorte.slug}`}>
                Ver {selectedCorte.nombre} <span aria-hidden="true">↗</span>
              </Link>
            )}
            <div className="zoom-controls map-only-zoom-controls" aria-label="Controles de zoom">
              <button type="button" onClick={() => setZoom((current) => Math.min(1.6, Number((current + 0.2).toFixed(1))))} aria-label="Acercar mapa">+</button>
              <button type="button" onClick={() => setZoom((current) => Math.max(1, Number((current - 0.2).toFixed(1))))} aria-label="Alejar mapa">−</button>
              <button type="button" onClick={() => setZoom(1)} aria-label="Restablecer zoom">↺</button>
            </div>
          </div>
        </div>
        <div className="map-only-card">
          <div className="map-only-zoom" style={{ "--map-zoom": zoom } as CSSProperties}>
            <CowMap
              cortes={cortes}
              selectedSlug={selectedSlug}
              highlightedSlug={null}
              onSelect={setSelectedSlug}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
