import type { Metadata } from "next";
import { MapaCortesPage } from "../../components/MapaCortesPage";
import { getCortes } from "../../lib/cortes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mapa interactivo de cortes",
  description: "Explorá la ubicación de los cortes vacunos argentinos en una vista lateral de la res."
};

export default function MapaPage() {
  return <MapaCortesPage cortes={getCortes()} />;
}
