import { CorteExplorer } from "../components/CorteExplorer";
import { getCortes } from "../lib/cortes";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <CorteExplorer cortes={getCortes()} />;
}
