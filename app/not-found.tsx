import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 · Corte no encontrado</span>
      <h1>Ese corte no está en el mapa.</h1>
      <p>Revisá el enlace o volvé a explorar los cortes vacunos argentinos.</p>
      <Link href="/" className="button-primary">Volver al mapa</Link>
    </main>
  );
}
