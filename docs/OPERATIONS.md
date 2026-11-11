# Operations

Tento dokument obsahuje pouze stabilní provozní kontrakt. Aktuální změny, incidenty, rollout rozhodnutí a důkazy patří do příslušného issue.

## Prostředí

| Prostředí | URL | Data | Účel |
|---|---|---|---|
| Local | `http://localhost:3000` | lokální PostgreSQL z `docker-compose.yml` | vývoj a testy |
| Preview | URL vytvořená Coolify a vložená do PR | oddělená sdílená preview DB | lidské review PR |
| Test production | dočasná doména z Coolify (viz Coolify aplikace) | testovací production DB | ověření `main` před spuštěním značky |
| Live WordPress | `https://furtnekde.cz` | stávající produkční data | zůstává beze změny do schváleného launch issue |

Health endpoint je `/api/health`. Preview ani lokální vývoj nesmí používat testovací nebo živá produkční data a secrets. Preview DB je sdílená; současně smí běžet jen jedna změna s migrací.

## Vlastnictví systémů

- Git: `https://github.com/drew2323/furtnekde`, výchozí branch `main`
- Stabilní produktový kontext: `https://github.com/drew2323/dreamteam-docs/tree/main/src/content/docs/projects/furt-nekde`
- Plánování a stav práce: aktuální projektový nástroj, projekt **Furt někde**
- CI: GitHub Actions, workflow `.github/workflows/ci.yml`
- Runtime a preview: Coolify; test production a preview mají samostatné Coolify databáze.
- Konkrétní instance (Coolify aplikace, databáze, server, interní URL) nejsou v repu: zjistí se v Coolify podle repa (`coolify where <app>`). Repo je public.

Přístupy a secrets jsou v příslušných systémech, nikdy v repozitáři nebo komentáři issue.

## Delivery workflow

1. Zadavatel nebo Dev Lead vytvoří issue v aktuálním projektovém nástroji s outcome, scope a acceptance criteria.
2. Dev Lead předá implementačně připravené issue jednomu vývojovému agentovi. Agent vytvoří branch s identifikátorem issue.
3. Agent implementuje pouze issue; průběžný stav a blockery píše do issue.
4. U změny aplikace/runtime spustí `./scripts/quality.sh`; docs-only změna používá cílené kontroly z `AGENTS.md`. Potom pushne branch a otevře draft PR.
5. Coolify vytvoří preview. Agent ověří `./scripts/verify.sh <preview-url>` a vloží URL i výsledek do PR a issue.
6. Agent předá issue Dev Leadovi. Lead zkontroluje scope, gates a důkazy a rozhodne, zda práci vrátit, dále ověřit nebo vyžádat lidské review.
7. Pouze člověk schválí merge do `main`. Merge spustí deployment test production.
8. Po deployi se ověří `./scripts/verify.sh <test-production-url>`. Issue se uzavře až po požadovaném ověření.

Chybějící CI nebo preview je blocker review. Agent nesmí použít production deployment jako náhradu preview.

## Runtime kontrakt

- Build se provádí z repozitářového `Dockerfile`; interní port je `3000`.
- `./scripts/start.sh` před spuštěním aplikace provede verzované databázové migrace pod PostgreSQL advisory lockem.
- `/api/health` vrací úspěch jen při připravené aplikaci a dosažitelné databázi.
- Produkční a preview databáze jsou oddělené.
- Trvalé produkční media nesmějí záviset na zapisovatelné vrstvě kontejneru; jejich cílové úložiště musí být schválené před migrací reálných médií.

## Standardní příkazy

```bash
# kompletní lokální quality gate
PLAYWRIGHT_EXECUTABLE_PATH=/usr/bin/chromium ./scripts/quality.sh

# ověření nasazeného prostředí
./scripts/verify.sh https://example.invalid

# databázové migrace
./scripts/migrate.sh
```

## Produkční bezpečnost a launch boundary

- Žádné ruční změny v běžícím kontejneru a žádný přímý push do `main`.
- Žádná produkční migrace, import nebo změna CMS dat bez explicitního issue, čerstvé zálohy, preview ověření, rollback plánu a lidského schválení.
- Rollback aplikace používá předchozí úspěšný Coolify deployment s plným commit SHA; datový rollback se řídí konkrétním plánem issue.
- DNS, `furtnekde.cz`, reálné FAPI/Ecomail credentials, migrace obsahu, redirects a indexace vyžadují samostatné launch issue a lidské schválení.
