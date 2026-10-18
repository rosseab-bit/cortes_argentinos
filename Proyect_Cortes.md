
# Prompt de desarrollo: Mapa interactivo de cortes vacunos argentinos

Desarrollá una webapp en **Next.js** (App Router, TypeScript) con **SQLite** como base de datos. La aplicación muestra una silueta de vaca dibujada en **SVG** como si fuera un mapa, donde cada corte argentino es una región SVG independiente que el usuario puede clickear. Al hacer click, se abre un panel o página con el nombre del corte y sus posibles usos culinarios.

## 1. Stack y requisitos técnicos

- **Framework:** Next.js 14+ con App Router y TypeScript estricto.
- **Estilos:** Tailwind CSS (o CSS Modules si preferís), diseño responsive mobile first, usando los tokens de color de la sección de paleta. Breakpoints: 375px (mobile), 768px (tablet), 1024px+ (escritorio).
- **Base de datos:** SQLite con **better-sqlite3** o **Drizzle ORM** + `drizzle-kit`. El archivo de la base debe estar en `/data/cortes.db`.
- **Seed:** script `npm run db:seed` que crea las tablas y carga los datos iniciales desde un JSON o un archivo TS.
- **API:** Route Handlers en `app/api/cortes/route.ts` (listado) y `app/api/cortes/[slug]/route.ts` (detalle).
- **Render:** el SVG de la vaca se importa como componente React (`<CowMap />`), con cada corte como `<path>` o `<g>` con `id` y `data-slug`.
- **Accesibilidad:** cada región debe ser navegable por teclado (`tabIndex`, `role="button"`, `aria-label` con el nombre del corte, activación con Enter/Espacio).
- **Sin dependencias de red en runtime** para el SVG: los archivos van en `/public/vaca.svg` o inline en el componente.

## 2. Modelo de datos (SQLite)

```sql
CREATE TABLE cortes (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT UNIQUE NOT NULL,        -- ej: "asado-de-tira"
  nombre        TEXT NOT NULL,               -- ej: "Asado de tira"
  descripcion   TEXT NOT NULL,               -- qué es, dónde está en la res
  zona          TEXT NOT NULL,               -- delantera | media | trasera | costado | cabeza
  textura       TEXT,                        -- blanda, firme, con grasa, etc.
  coccion       TEXT,                        -- parrilla, horno, guiso, plancha...
  precio_ref    TEXT,                        -- opcional, texto libre
  svg_id        TEXT NOT NULL                -- id del <path> en el SVG
);

CREATE TABLE usos (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  corte_id  INTEGER NOT NULL REFERENCES cortes(id) ON DELETE CASCADE,
  titulo    TEXT NOT NULL,                   -- ej: "Asado a la parrilla"
  detalle   TEXT NOT NULL,
  tiempo    TEXT                             -- ej: "20-30 min"
);
```

Poblá la base con al menos estos cortes (no exhaustivo, ampliar a gusto):

| Zona | Cortes |
|---|---|
| Delantera | Garrón, Brazuelo, Paleta, Cogote, Aguja, Tapa de asado, Costilla |
| Media | Asado de tira, Vacío, Entraña, Bife angosto, Lomo, Bife ancho |
| Trasera | Cuadril, Colita de cuadril, Nalga, Bola de lomo, Peceto, Tapa de nalga, Garrón trasero |
| Costado | Matambre, Falda, Bife de chorizo |
| Cabeza / otros | Lengua, Cola, Osobuco |

Para cada corte cargá entre 2 y 4 usos (parrilla, horno, guiso, milanesa, carpaccio, cocción lenta, etc.) con tiempos orientativos.

## 3. Mapa SVG de la vaca

- Creá un SVG con viewBox fijo (por ejemplo `0 0 1000 600`) con la silueta de la vaca.
- Dividí la silueta en **regiones cerradas**, una por corte. Cada región es un `<path>` con `id="corte-{slug}"` y `data-slug="{slug}"`.
- Las líneas de separación entre cortes deben ser visibles (stroke oscuro fino).
- **Estados visuales:**
  - Hover: relleno más saturado y tooltip con el nombre.
  - Focus: outline visible para teclado.
  - Seleccionado: borde grueso y color de acento.
- Las regiones tienen `cursor: pointer`. Usá `transition` suave en `fill`.
- Incluí una leyenda con las zonas por color (delantera, media, trasera, costado, cabeza), usando los tokens de la paleta. En mobile la leyenda va colapsable o debajo del mapa.
- Opcional: una vista lateral (costado) y una vista de la vaca completa con las dos mitades.
- **Adaptación mobile del SVG:** el `<svg>` usa `viewBox` con `width: 100%` y `height: auto` para escalar sin perder proporción.
- **Área táctil mínima de 44x44 px:** los cortes chicos (lengua, cola, osobuco, bife angosto) necesitan un `<path>` transparente más grande superpuesto como zona de toque, sin cambiar el dibujo visible.
- **Zoom y paneo:** en mobile, permitir pinch-zoom sobre el mapa con `touch-action` o una librería liviana, y un botón para resetear la vista.
- **Etiquetas:** en desktop, los nombres de los cortes se muestran sobre el mapa al hover. En mobile, al tocar un corte se muestra el nombre en un chip flotante, sin tooltip de hover.
- **Orientación:** en pantallas menores a 768px, el mapa puede usar un viewBox alternativo más alto para aprovechar la pantalla vertical (opcional).

### Paleta de colores y estilo visual

La paleta se inspira en el campo argentino, el cuero y la parrilla. Definila como variables CSS o tokens de Tailwind (`--color-...`).

| Token | Uso | Hex |
|---|---|---|
| `fondo` | Fondo general, tono crema de papel o cuero claro | `#F5EFE6` |
| `tinta` | Texto principal, trazos del mapa | `#2B1D14` |
| `cuero` | Títulos, bordes de paneles, detalles | `#6B4226` |
| `delantera` | Zona delantera (cuarto delantero) | `#9C3D2E` (colorado tierra) |
| `media` | Zona media (lomo y costillar) | `#D9A441` (ocre pampa) |
| `trasera` | Zona trasera (cuarto trasero) | `#5E7D3A` (verde pampa) |
| `costado` | Costado y falda | `#4A7FA7` (azul río) |
| `cabeza` | Cabeza y otros cortes | `#A0673B` (caramelo) |
| `acento` | Corte seleccionado, botones primarios | `#E4572E` (brasa) |
| `hover` | Versión más saturada de la zona al pasar el mouse | 15% más de saturación que la zona |
| `mate` | Encabezado y elementos de marca | `#2F4A2A` (verde mate oscuro) |

Reglas de estilo:
- Tipografía con una serif cálida para títulos (por ejemplo Fraunces o Lora) y una sans limpia para el cuerpo (por ejemplo Inter).
- Contraste mínimo WCAG AA para todo el texto. Verificar especialmente texto sobre `media` y `costado`.
- Bordes del mapa de 1 a 1.5 px en `tinta`, con esquinas redondeadas suaves.
- Modo oscuro opcional: fondo `#1E1610`, texto `#F5EFE6`, mismas zonas con ligera reducción de luminosidad.

## 4. Interacción y UI

1. Al cargar, la página muestra el mapa a la izquierda (o arriba en mobile) y un panel vacío a la derecha con el texto "Tocá un corte para ver sus usos".
2. Al hacer click en una región:
   - Se resalta el corte en el SVG.
   - Se hace fetch a `/api/cortes/[slug]`.
   - El panel muestra: nombre, zona, descripción, textura, método de cocción sugerido y la lista de usos con título, detalle y tiempo.
3. Versión mobile (menor a 768px): el mapa ocupa todo el ancho y el buscador queda fijo arriba. Al tocar un corte se abre un bottom sheet arrastrable con dos alturas de anclaje (40% y 90% de la pantalla) que muestra el detalle. Usar `dvh` para evitar que la barra del navegador tape el contenido. Además, existe la ruta `/cortes/[slug]` como vista completa y para compartir.
4. Incluí un buscador que filtre cortes por nombre y resalte la región correspondiente en el mapa.
5. Cada corte debe tener una URL propia (`/cortes/[slug]`) para compartir y para SEO, con `generateMetadata`.
6. Estados de carga y error claros; si un slug no existe, mostrar 404 con `notFound()`.

## 5. Estructura de carpetas sugerida

```
app/
  page.tsx                  # mapa + panel
  cortes/[slug]/page.tsx    # detalle por corte
  api/cortes/route.ts
  api/cortes/[slug]/route.ts
components/
  CowMap.tsx                # SVG interactivo
  CortePanel.tsx
  Buscador.tsx
  Leyenda.tsx
lib/
  db.ts                     # conexión SQLite
  cortes.ts                 # queries
db/
  schema.ts
  seed.ts
data/
  cortes.db
public/
  vaca.svg                  # opcional
```

## 6. Entregables esperados

- Proyecto Next.js completo y ejecutable con `npm install && npm run dev`.
- Script de seed funcional con los cortes listados.
- README con instrucciones de instalación, cómo agregar un corte nuevo y cómo editar las regiones del SVG.
- Tests básicos para las queries y la API (Vitest o Jest).
- Revisión visual en 375px, 768px y 1280px, en modo claro y, si se implementa, en modo oscuro.

## 7. Criterios de calidad

- Código tipado, sin `any`.
- Componentes del mapa separados de la lógica de datos.
- Ningún dato de cortes hardcodeado en los componentes: todo sale de la base.
- Nombres de cortes y textos en **español rioplatense neutro**, con los nombres argentinos tradicionales.
