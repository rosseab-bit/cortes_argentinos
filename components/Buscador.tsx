"use client";

import { useState } from "react";
import type { Corte } from "../lib/types";

type BuscadorProps = { cortes: Corte[]; value: string; onChange: (value: string) => void };

export function Buscador({ cortes, value, onChange }: BuscadorProps) {
  const [focused, setFocused] = useState(false);
  const suggestions = value.trim()
    ? cortes.filter((corte) => corte.nombre.toLocaleLowerCase("es-AR").includes(value.trim().toLocaleLowerCase("es-AR"))).slice(0, 5)
    : [];

  return (
    <div className={`search-wrap${focused ? " is-focused" : ""}`}>
      <label className="sr-only" htmlFor="corte-search">Buscar un corte</label>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        id="corte-search"
        type="search"
        placeholder="Buscá un corte…"
        autoComplete="off"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => window.setTimeout(() => setFocused(false), 140)}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onChange("");
            event.currentTarget.blur();
          }
        }}
        aria-describedby="search-hint"
      />
      <span id="search-hint" className="sr-only">Escribí para filtrar y resaltar cortes en el mapa.</span>
      {value && <button type="button" className="search-clear" aria-label="Borrar búsqueda" onClick={() => onChange("")}>×</button>}
      {focused && suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((corte) => <li key={corte.slug}><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => onChange(corte.nombre)}>{corte.nombre}<span>↗</span></button></li>)}
        </ul>
      )}
    </div>
  );
}
