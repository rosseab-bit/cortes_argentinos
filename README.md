# Cortes Argentinos

Guía interactiva de cortes vacunos argentinos: explorá el mapa de la res, conocé las características de cada corte y encontrá ideas para cocinarlo.

## Requisitos

- Node.js 22.12 o superior
- npm

## Instalación y desarrollo

```bash
npm install
npm run db:seed
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). La base SQLite se crea en `data/cortes.db`; se puede cambiar la ubicación definiendo `CORTES_DB_PATH` con una ruta absoluta. El seed es idempotente: vuelve a cargar el catálogo y sus usos.

## Docker

La imagen inicia únicamente la aplicación Next.js en el puerto `3020`. `docker-compose.yml` publica el puerto solo en `127.0.0.1`, para que un Nginx instalado en el host pueda actuar como proxy inverso:

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f cortes-argentinos
```

La aplicación queda disponible localmente en `http://127.0.0.1:3020`. Compose conserva SQLite en el volumen `cortes_data`; al crearlo por primera vez, Docker lo inicializa con la base sembrada que viene en la imagen. Para detener el proyecto sin borrar los datos:

```bash
docker compose down
```

La configuración de Nginx es independiente de Docker y está en [`nginx/cortes-argentinos.conf`](./nginx/cortes-argentinos.conf). Copiala a la configuración de sitios de Nginx del host, reemplazá `cortes.example.com` por tu dominio y luego validá y recargá Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

El archivo de Nginx hace proxy a `127.0.0.1:3020`; no agrega Nginx al contenedor ni al Compose.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia Next.js en modo desarrollo |
| `npm run build` | Genera la aplicación de producción |
| `npm run start` | Inicia la compilación de producción |
| `npm run db:seed` | Crea las tablas y carga los cortes iniciales |
| `npm test` | Ejecuta pruebas de queries y API |
| `npm run typecheck` | Verifica los tipos TypeScript |
| `npm run lint` | Ejecuta ESLint |

## Datos y API

- `GET /api/cortes`: devuelve el catálogo; acepta `?q=nalga` para filtrar por nombre.
- `GET /api/cortes/:slug`: devuelve un corte y sus usos; responde 404 si no existe.
- `/cortes/:slug`: página compartible con metadatos SEO.
- `/mapa`: vista independiente del mapa lateral con todos los cortes, sin panel de detalle.

El esquema vive en `db/schema.ts`, el catálogo inicial en `db/seed-data.ts` y las consultas en `lib/cortes.ts`.

## Agregar un corte

1. Sumá una entrada a `cortesSeed` en `db/seed-data.ts`, con slug, nombre, descripción, zona, textura, cocción, `svg_id` y entre dos y cuatro usos.
2. Agregá una región geométrica al arreglo `shapes` de `components/CowMap.tsx`. El `slug` debe coincidir con el de los datos y el `id` SVG se genera desde el valor `svg_id` guardado en SQLite.
3. Ejecutá `npm run db:seed` y verificá el mapa y la página `/cortes/tu-slug`.

Las zonas válidas son `delantera`, `media`, `trasera`, `costado` y `cabeza`. El mapa mantiene la geometría en el componente SVG; nombres, descripciones, datos culinarios y etiquetas accesibles se leen desde SQLite.

## Editar el mapa

El mapa es SVG inline en `components/CowMap.tsx`, con `viewBox` adaptable y una región interactiva por corte. Editá el `path` correspondiente en `shapes` para cambiar el contorno; las regiones tienen activación por teclado, estados de foco y zonas de toque ampliadas. El zoom se puede restablecer con el control ↺. Los colores y breakpoints están centralizados en `app/globals.css`.
