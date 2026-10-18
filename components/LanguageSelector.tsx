"use client";

import { parseLocale, translate } from "../lib/i18n";
import { useLocale } from "./LocaleProvider";

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  return (
    <label className="language-selector">
      <span className="sr-only">{translate(locale, "language")}</span>
      <select
        aria-label={translate(locale, "language")}
        value={locale}
        onChange={(event) => setLocale(parseLocale(event.target.value))}
      >
        <option value="es">ES · {translate(locale, "languageSpanish")}</option>
        <option value="en">EN · {translate(locale, "languageEnglish")}</option>
        <option value="pt">PT · {translate(locale, "languagePortuguese")}</option>
      </select>
    </label>
  );
}
