# Furt někde

Nový web rodinné cestovatelské značky Furt někde. Veřejný web propojuje obsah, kurzy a plánování dovolené na míru; obsah spravuje Payload CMS.

## Stack

- Next.js + React + TypeScript
- Payload CMS
- PostgreSQL
- Tailwind CSS
- Vitest + Playwright
- Docker image nasazovaný přes Coolify

Aktuální chování a datový model určují kód, migrace a testy. Stabilní produktový kontext je v [DreamTeam docs](https://github.com/drew2323/dreamteam-docs/tree/main/src/content/docs/projects/furt-nekde). Zadání změn, acceptance criteria, rozhodnutí a průběžný stav patří do projektu **Furt někde** v Multica, nikoli do nových handoff/spec souborů v repozitáři.

## Lokální spuštění

```sh
cp .env.example .env
docker compose up -d postgres
corepack pnpm install --frozen-lockfile
set -a; . ./.env; set +a
./scripts/migrate.sh
corepack pnpm dev
```

- web: `http://localhost:3000`
- administrace: `http://localhost:3000/admin`
- health: `http://localhost:3000/api/health`

## Ověření změny

```sh
PLAYWRIGHT_EXECUTABLE_PATH=/usr/bin/chromium ./scripts/quality.sh
```

Quality gate spouští lint, typecheck, integrační testy, produkční build a E2E testy.

## Jak přispívat

Před prací si přečti `AGENTS.md`. Stabilní informace o prostředích, preview, nasazení a rollbacku jsou v `docs/OPERATIONS.md`.

Standardní tok je:

`Multica ticket → samostatná branch → testy → draft PR + preview → Hermes PM → lidské review → merge → produkční ověření`

Bez aktivního Multica ticketu se změna nezačíná. Produkční merge, deploy ani práci s produkčními daty agent neschvaluje sám.
