"use client";

import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import { useMemo, useState } from "react";
import { Buscador } from "./Buscador";
import { CortePanel } from "./CortePanel";
import { CowMap } from "./CowMap";
import { LanguageSelector } from "./LanguageSelector";
import { useLocale } from "./LocaleProvider";
import { translate, translateCorte } from "../lib/i18n";
import type { Corte, CorteDetalle } from "../lib/types";

type CorteExplorerProps = { cortes: Corte[] };

export function CorteExplorer({ cortes }: CorteExplorerProps) {
  const { locale } = useLocale();
  const localizedCortes = useMemo(() => cortes.map((corte) => translateCorte(corte, locale)), [cortes, locale]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<CorteDetalle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const visibleCortes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase(locale);
    return query ? localizedCortes.filter((corte) => corte.nombre.toLocaleLowerCase(locale).includes(query)) : localizedCortes;
  }, [localizedCortes, locale, search]);
  const highlightedSlug = visibleCortes.length === 1 && search.trim() ? visibleCortes[0].slug : null;
  const localizedDetail = detail ? translateCorte(detail, locale) : null;

  async function selectCorte(slug: string) {
    setSelectedSlug(slug);
    setLoading(true);
    setError(null);
    setSheetExpanded(false);
    try {
      const response = await fetch(`/api/cortes/${encodeURIComponent(slug)}?locale=${locale}`, { cache: "no-store" });
      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error ?? `${translate(locale, "loadErrorTitle")} (${response.status}).`);
      }
      const body = (await response.json()) as { corte: CorteDetalle };
      setDetail(body.corte);
    } catch (caught) {
      setDetail(null);
      setError(caught instanceof Error ? caught.message : translate(locale, "loadErrorTitle"));
    } finally {
      setLoading(false);
    }
  }

  function onSearch(value: string) {
    setSearch(value);
    const match = localizedCortes.find((corte) => corte.nombre.toLocaleLowerCase(locale) === value.trim().toLocaleLowerCase(locale));
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
        <div className="topbar-note"><span className="status-dot" />{translate(locale, "brandTagline")}</div>
        <div className="topbar-actions"><LanguageSelector /><Link href="/mapa" className="topbar-link">{translate(locale, "viewMapOnly")} <span aria-hidden="true">↗</span></Link></div>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{translate(locale, "mapEyebrow")}</p>
          <h1>{translate(locale, "heroFirst")}<br />{translate(locale, "heroSecond")} <em>{translate(locale, "heroAccent")}</em></h1>
          <p className="hero-description">{translate(locale, "heroDescription")}</p>
        </div>
        <div className="hero-stamp" aria-label={`${cortes.length} ${translate(locale, "cutsToDiscover")}`}>
          <span>{String(cortes.length).padStart(2, "0")}</span>
          <small>{translate(locale, "cutsToDiscover")}</small>
        </div>
      </section>
      <section className="explorer" id="explorar" aria-label={translate(locale, "explorerAria")}>
        <div className="explorer-toolbar">
          <div><span className="eyebrow">{translate(locale, "sectionEyebrow")}</span><h2>{translate(locale, "sectionTitle")}</h2></div>
          <Buscador cortes={cortes} value={search} onChange={onSearch} />
        </div>
        <div className="explorer-grid">
          <section className="map-card" aria-label={translate(locale, "mapAria")}>
            <div className="map-card-heading"><span>01 <i /> {translate(locale, "interactiveMap")}</span><div className="zoom-controls" aria-label={translate(locale, "zoomControls")}><button type="button" onClick={() => setZoom((current) => Math.min(1.4, Number((current + 0.1).toFixed(1))))} aria-label={translate(locale, "zoomIn")}>+</button><button type="button" onClick={() => setZoom((current) => Math.max(0.8, Number((current - 0.1).toFixed(1))))} aria-label={translate(locale, "zoomOut")}>−</button><button type="button" onClick={() => setZoom(1)} aria-label={translate(locale, "resetZoom")}>↺</button></div></div>
            <div className="map-zoom" style={{ "--map-zoom": zoom } as CSSProperties}>
              <CowMap cortes={visibleCortes} selectedSlug={selectedSlug} highlightedSlug={highlightedSlug ?? (search ? visibleCortes[0]?.slug ?? null : null)} onSelect={(slug) => void selectCorte(slug)} />
            </div>
          </section>
          <aside className={`detail-card${detail ? " has-selection" : ""}`} aria-live="polite">
            {loading && <div className="panel-state"><span className="loader" /><p>{translate(locale, "loadingCut")}</p></div>}
            {!loading && error && <div className="panel-state error-state"><span className="state-icon">!</span><h3>{translate(locale, "loadErrorTitle")}</h3><p>{error}</p><button className="text-button" onClick={() => selectedSlug && void selectCorte(selectedSlug)}>{translate(locale, "retry")}</button></div>}
            {!loading && !error && localizedDetail && <CortePanel corte={localizedDetail} />}
            {!loading && !error && !detail && (
              <div className="empty-state">
                <div className="empty-illustration" aria-hidden="true"><span>✳</span><i /><b /></div>
                <span className="eyebrow">{translate(locale, "emptyEyebrow")}</span>
                <h3>{translate(locale, "emptyTitle")}<br />{translate(locale, "emptyTitleSecond")}</h3>
                <p>{translate(locale, "emptyDescription")}</p>
                <div className="empty-rule"><span>{translate(locale, "bonAppetit")}</span><i /></div>
              </div>
            )}
          </aside>
        </div>
        <div className="results-note" aria-live="polite">
          {search && <span>{visibleCortes.length ? `${visibleCortes.length} ${translate(locale, visibleCortes.length === 1 ? "searchResultsOne" : "searchResultsMany")}` : translate(locale, "noSearchResults")}</span>}
          {cortes.length === 0 && <span className="seed-warning">{translate(locale, "emptyCatalog")} <code>npm run db:seed</code>.</span>}
        </div>
      </section>
      <footer className="site-footer"><span>{translate(locale, "madeToShare")}</span><span>{translate(locale, "location")}</span></footer>
      {localizedDetail && (
        <section className={`mobile-sheet${sheetExpanded ? " is-expanded" : ""}`} aria-label={`${translate(locale, "detailOpen")} ${localizedDetail.nombre}`}>
          <button
            type="button"
            className="sheet-handle"
            aria-label={sheetExpanded ? translate(locale, "collapsePanel") : translate(locale, "expandPanel")}
            onPointerDown={(event) => { event.currentTarget.dataset.startY = String(event.clientY); }}
            onPointerUp={onSheetPointerUp}
          ><span /></button>
          <div className="sheet-content"><CortePanel corte={localizedDetail} /></div>
        </section>
      )}
    </main>
  );
}
