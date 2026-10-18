import Link from "next/link";
import type { CorteDetalle, Zona } from "../lib/types";

const zonaNombre: Record<Zona, string> = {
  delantera: "Cuarto delantero",
  media: "Zona media",
  trasera: "Cuarto trasero",
  costado: "Costado",
  cabeza: "Cabeza y otros"
};

type CortePanelProps = { corte: CorteDetalle; standalone?: boolean };

export function CortePanel({ corte, standalone = false }: CortePanelProps) {
  return (
    <article className={`corte-detail zone-${corte.zona}${standalone ? " standalone-detail" : ""}`}>
      <div className="detail-heading">
        <div>
          <span className="zone-kicker"><span className="legend-dot" aria-hidden="true" />{zonaNombre[corte.zona]}</span>
          <h2>{corte.nombre}</h2>
        </div>
        {!standalone && <Link href={`/cortes/${corte.slug}`} className="share-link" aria-label={`Abrir página de ${corte.nombre}`}>↗</Link>}
      </div>
      <p className="detail-description">{corte.descripcion}</p>
      <dl className="detail-facts">
        <div><dt>Textura</dt><dd>{corte.textura ?? "Consultar en carnicería"}</dd></div>
        <div><dt>Ideal para</dt><dd>{corte.coccion ?? "Preparaciones variadas"}</dd></div>
        {corte.precio_ref && <div><dt>Precio de referencia</dt><dd>{corte.precio_ref}</dd></div>}
      </dl>
      <div className="uses-heading">
        <div><span className="eyebrow">En la cocina</span><h3>Ideas para prepararlo</h3></div>
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
      {standalone && <p className="detail-footnote">Los tiempos son orientativos; pueden variar según el grosor, el equipo y el punto de cocción.</p>}
    </article>
  );
}
