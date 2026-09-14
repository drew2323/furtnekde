# Furt někde – web

Nový web Family-Travel značky Furt někde (Next.js + Payload CMS + PostgreSQL). Live produkci `furtnekde.cz` (WordPress) se během stavby nemění; skeleton se staví v neveřejném testovacím prostředí.

## Lokální spuštění

```sh
cp .env.example .env
docker compose up -d postgres
corepack pnpm install --frozen-lockfile
set -a; . ./.env; set +a
./scripts/migrate.sh
corepack pnpm dev
```

Aplikace běží na `http://localhost:3000`, health endpoint na `/api/health`, Payload admin na `/admin`.

## Ověření

```sh
./scripts/preflight.sh --infrastructure
PLAYWRIGHT_EXECUTABLE_PATH=/usr/bin/chromium ./scripts/quality.sh
```

## Dokumentace

- `SPEC.md` – zadanie a acceptance criteria (kanonický detail: mini-team brief).
- `ARCHITECTURE.md` – schválená architektura (stack, integrace, delivery model, domény).
- `WEB_PLATFORM.md` – projektový delivery kontrakt.
- `PROJECT-INFRASTRUCTURE.md` – skutečné prostředky a ověřovací důkazy bootstrapu.