# Project Infrastructure – Furt někde

**Status:** BOOTSTRAPPING (bude `INFRASTRUCTURE_READY` jen po ověřenom průchodu Git → Coolify → VPS → HTTPS + preview)
**Project:** Furt někde web
**Owner:** David Brázda
**Produkt/obsah:** Tereza

## Workspace and repository

- Local workspace: `/home/david/Projects/furtnekde`
- GitHub repository: `drew2323/furtnekde` (mode new; skreac až po vytvoření)
- Default branch: `main`
- Bootstrap commit: TBD

## Environments

| Environment | Domain                                              | Coolify application | Database | Source       |
| ----------- | --------------------------------------------------- | ------------------- | -------- | ------------ |
| Production  | `https://furtnekde.2.56.97.3.sslip.io`               | TBD                 | TBD      | `main`       |
| Preview     | `https://pr-<id>.furtnekde.2.56.97.3.sslip.io`      | TBD (PR deployments)| TBD      | pull request |
| Real launch | `furtnekde.cz` (přechod pouze při spuštění, live zůstává netknutý) | –                  | –        | –            |

Preview database strategy: `shared-preview`. Současně smí běžet jen jedna změna s migrací.

## Deployment contract

- Preflight: `./scripts/preflight.sh --infrastructure`
- Local quality gate: `./scripts/quality.sh`
- Build: `corepack pnpm build`
- Start: `./scripts/start.sh`
- Migrations: `./scripts/migrate.sh` (`migrate.mjs`, advisory lock, `lock_timeout=120s`)
- Coolify pre-deploy: prázdný; migrace proběhne před startem serveru
- Verification: `./scripts/verify.sh <base-url>`
- Production gate: `PRODUCTION_HOST=<host> ./scripts/verify-production.sh <production-url>`
- Preview gate: `PREVIEW_HOST_SUFFIX=<host> ./scripts/verify-preview.sh <pr-number> <preview-url>`
- Internal port: `3000`
- Health endpoint: `/api/health`
- Coolify build pack: `Dockerfile`

## Persistent resources

- PostgreSQL production: TBD (provisioning)
- PostgreSQL preview: TBD (provisioning)
- Upload/file storage: lokální kontejnerové úložiště (placeholder pro realné testy)
- Backup policy: před datovou změnou Coolify/PostgreSQL backup
- Restore test: pro skeleton nahrazen ověřeným aplikačním rollbackom

Secrets jsou uloženy mimo Git v Coolify (runtime-only) nebo lokálním necommitovaném `.env`.

## First deployment proof

- Skeleton commit: TBD
- Production deployment URL: TBD
- Preview PR + URL: TBD
- HTTPS verified: TBD
- Healthcheck verified: TBD
- Git webhook verified: TBD
- Runtime-only secrets verified: TBD
- Preview teardown verified: TBD
- Rollback verified: TBD

Status lze změnit na `INFRASTRUCTURE_READY` pouze po úspěšném průchodu Git → Coolify → VPS → HTTPS a ověření preview z testovacího PR.