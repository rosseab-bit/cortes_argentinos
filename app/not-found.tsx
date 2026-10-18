"use client";

import Link from "next/link";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLocale } from "../components/LocaleProvider";
import { translate } from "../lib/i18n";

export default function NotFound() {
  const { locale } = useLocale();
  return (
    <main className="not-found">
      <div className="not-found-actions"><LanguageSelector /></div>
      <span className="eyebrow">{translate(locale, "notFoundEyebrow")}</span>
      <h1>{translate(locale, "notFoundHeading")}</h1>
      <p>{translate(locale, "notFoundDescription")}</p>
      <Link href="/" className="button-primary">{translate(locale, "backToMap")}</Link>
    </main>
  );
}
