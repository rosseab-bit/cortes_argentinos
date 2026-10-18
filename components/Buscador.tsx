"use client";

import { useState } from "react";
import { translate, translateCorte } from "../lib/i18n";
import type { Corte } from "../lib/types";
import { useLocale } from "./LocaleProvider";

type BuscadorProps = { cortes: Corte[]; value: string; onChange: (value: string) => void };

export function Buscador({ cortes, value, onChange }: BuscadorProps) {
  const [focused, setFocused] = useState(false);
  const { locale } = useLocale();
  const localizedCuts = cortes.map((corte) => translateCorte(corte, locale));
  const suggestions = value.trim()
    ? localizedCuts.filter((corte) => corte.nombre.toLocaleLowerCase(locale).includes(value.trim().toLocaleLowerCase(locale))).slice(0, 5)
    : [];

  return (
    <div className={`search-wrap${focused ? " is-focused" : ""}`}>
      <label className="sr-only" htmlFor="corte-search">{translate(locale, "searchLabel")}</label>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        id="corte-search"
        type="search"
        placeholder={translate(locale, "searchPlaceholder")}
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
      <span id="search-hint" className="sr-only">{translate(locale, "searchHint")}</span>
      {value && <button type="button" className="search-clear" aria-label={translate(locale, "clearSearch")} onClick={() => onChange("")}>×</button>}
      {focused && suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((corte) => <li key={corte.slug}><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => onChange(corte.nombre)}>{corte.nombre}<span>↗</span></button></li>)}
        </ul>
      )}
    </div>
  );
}
