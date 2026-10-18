"use client";

import Link from "next/link";
import { translate } from "../lib/i18n";
import type { CorteDetalle, Zona } from "../lib/types";
import { useLocale } from "./LocaleProvider";

const zonaKey: Record<Zona, "zoneFront" | "zoneMiddle" | "zoneRear" | "zoneSide" | "zoneOther"> = {
  delantera: "zoneFront",
  media: "zoneMiddle",
  trasera: "zoneRear",
  costado: "zoneSide",
  cabeza: "zoneOther"
};

type CortePanelProps = { corte: CorteDetalle; standalone?: boolean };

export function CortePanel({ corte, standalone = false }: CortePanelProps) {
  const { locale } = useLocale();
  return (
    <article className={`corte-detail zone-${corte.zona}${standalone ? " standalone-detail" : ""}`}>
      <div className="detail-heading">
        <div>
          <span className="zone-kicker"><span className="legend-dot" aria-hidden="true" />{translate(locale, zonaKey[corte.zona])}</span>
          <h2>{corte.nombre}</h2>
        </div>
        {!standalone && <Link href={`/cortes/${corte.slug}`} className="share-link" aria-label={`${translate(locale, "detailOpen")} ${corte.nombre}`}>↗</Link>}
      </div>
      <p className="detail-description">{corte.descripcion}</p>
      <dl className="detail-facts">
        <div><dt>{translate(locale, "texture")}</dt><dd>{corte.textura ?? translate(locale, "askButcher")}</dd></div>
        <div><dt>{translate(locale, "cooking")}</dt><dd>{corte.coccion ?? translate(locale, "variousPreparations")}</dd></div>
        {corte.precio_ref && <div><dt>{translate(locale, "priceReference")}</dt><dd>{corte.precio_ref}</dd></div>}
      </dl>
      <div className="uses-heading">
        <div><span className="eyebrow">{translate(locale, "inKitchen")}</span><h3>{translate(locale, "ideas")}</h3></div>
        <span className="uses-count">{String(corte.usos.length).padStart(2, "0")}</span>
      </div>
      <ul className="uses-list">
        {corte.usos.map((uso) => (
          <li key={uso.id}>
            <div className="use-title-row"><h4>{uso.titulo}</h4>{uso.tiempo && <span className="cook-time">{uso.tiempo}</span>}</div>
            <p>{uso.detalle}</p>
          </li>
        ))}
      </ul>
      {standalone && <p className="detail-footnote">{translate(locale, "timeNote")}</p>}
    </article>
  );
}
