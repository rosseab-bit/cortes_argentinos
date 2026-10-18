"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { CowMap } from "./CowMap";
import { LanguageSelector } from "./LanguageSelector";
import { useLocale } from "./LocaleProvider";
import { translate, translateCorte } from "../lib/i18n";
import type { Corte } from "../lib/types";

type MapaCortesPageProps = { cortes: Corte[] };

export function MapaCortesPage({ cortes }: MapaCortesPageProps) {
  const { locale } = useLocale();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const selectedCorte = cortes.find((corte) => corte.slug === selectedSlug);
  const localizedSelectedCorte = selectedCorte ? translateCorte(selectedCorte, locale) : null;

  return (
    <main className="map-only-page">
      <header className="map-only-header">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">CA</span>
          <span>Cortes <em>Argentinos</em></span>
        </Link>
        <div className="map-only-header-actions"><LanguageSelector /><Link href="/" className="back-link">{translate(locale, "backHome")}</Link></div>
      </header>
      <section className="map-only-content" aria-label={translate(locale, "mapRouteAria")}>
        <div className="map-only-title">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />{translate(locale, "mapRouteEyebrow")}</p>
            <h1>{translate(locale, "mapRouteTitle")}</h1>
          </div>
          <div className="map-only-actions">
            {localizedSelectedCorte && (
              <Link className="map-only-detail-link" href={`/cortes/${localizedSelectedCorte.slug}`}>
                {translate(locale, "seeCut")} {localizedSelectedCorte.nombre} <span aria-hidden="true">↗</span>
              </Link>
            )}
            <div className="zoom-controls map-only-zoom-controls" aria-label={translate(locale, "zoomControls")}>
              <button type="button" onClick={() => setZoom((current) => Math.min(1.6, Number((current + 0.2).toFixed(1))))} aria-label={translate(locale, "zoomIn")}>+</button>
              <button type="button" onClick={() => setZoom((current) => Math.max(1, Number((current - 0.2).toFixed(1))))} aria-label={translate(locale, "zoomOut")}>−</button>
              <button type="button" onClick={() => setZoom(1)} aria-label={translate(locale, "resetZoom")}>↺</button>
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
