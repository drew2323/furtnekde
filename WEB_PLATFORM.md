# Furt někde – Web Platform delivery kontrakt

## Platforma

Next.js + Payload CMS + PostgreSQL + TypeScript; GitHub; Coolify na vlastním VPS (`vpswebfarma`). Odchylka vyžaduje zdůvodnění v `ARCHITECTURE.md` a schválení Davida.

## Build a runtime contract

- Package manager: `pnpm` přes Corepack; lockfile commitnutý.
- `pnpm build` vytváří produkční build; build nemění databází.
- `pnpm start` spouští server na `0.0.0.0:3000`.
- `scripts/start.sh` spustí verzované migrace (advisory lock, `lock_timeout=120s`) a teprve potom server.
- `scripts/migrate.sh` / `migrate.mjs` – verzované Payload/PostgreSQL migrace.
- `/api/health` vrací úspěch jen při připravené aplikaci a dosažitelné DB.
- Coolify pre-deploy command je prázdný (`scripts/pre-deploy.sh` je deprecated guard).
- Image: repository-owned `Dockerfile`, build pack Dockerfile, port 3000.

## Quality gates

- `./scripts/preflight.sh --infrastructure` → `PREFLIGHT_OK` (gate zodpovědnosti Team Agent/Hermes, před externími zásahy; worker neprovádí).
- `./scripts/quality.sh` → `LOCAL_OK` (install, lint, typecheck, integrační test, produkční build, E2E).
- CI (GitHub Actions): install → migrace CI DB → lint → typecheck → test:int → build → Playwright install → test:e2e.
- Po deploymentu: `./scripts/verify.sh <url>`, `PRODUCTION_HOST=... verify-production.sh`, `PREVIEW_HOST_SUFFIX=... verify-preview.sh`.

## Delivery regulace

- Změna na samostatné branchi + PR; scope odpovídá schválenému zadání.
- Merge do `main` vyžaduje zelené gates a lidské schválení preview.
- Produkce se nasazuje po merge do `main` (webhook); agent standardně nesahá do produkce.
- Migrace kompatibilné se současně běžící předchozí verzi nebo schválené maintenance okno.
- Rollback = návrat aplikace i kompatibilné databáze; Coolify rollback vyžaduje plný commit SHA.

## Povinné soubory

`SPEC.md`, `ARCHITECTURE.md`, `PROJECT-INFRASTRUCTURE.md`, `WEB_PLATFORM.md`, `AGENTS.md`, aktivní `DEVELOPMENT-HANDOFF.md`.

Při konfliktu: explicitně schválená `ARCHITECTURE.md` → tento standard → obecné preference coding workera.