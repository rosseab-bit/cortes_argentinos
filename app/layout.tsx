import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cortes Argentinos — Mapa de la carne",
    template: "%s | Cortes Argentinos"
  },
  description: "Explorá los cortes vacunos argentinos, sus características y formas de cocinarlos."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
