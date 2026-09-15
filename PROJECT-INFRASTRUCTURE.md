# Project Infrastructure – Furt někde

**Status:** INFRASTRUCTURE READY
**Project:** Furt někde web
**Owner:** David Brázda
**Produkt/obsah:** Tereza
**Ověřeno:** 2026-09-14

## Workspace and repository

- Local workspace: `/home/david/Projects/furtnekde`
- GitHub repository: `https://github.com/drew2323/furtnekde`
- Default branch: `main`
- Bootstrap commit: `77858fc9637d79120177889a59d47570a4f837ac`

## Environments

| Environment | Domain | Coolify application | Database | Source |
| --- | --- | --- | --- | --- |
| Production | `https://furtnekde.2.56.97.3.sslip.io` | project `5xqfxydbaoysdreesu6hpefe`; app `c74mexfmnyaiwvhle25gs9uc` | `d0x1o7hxd8vs3myiarbahirx` | `main` |
| Preview | `https://pr-<id>.furtnekde.2.56.97.3.sslip.io` | PR deployments app `c74mexfmnyaiwvhle25gs9uc` | `54zradk9ixpspdb8flrbgjuw` | pull request |
| Real launch | `furtnekde.cz` – přechod pouze po samostatném schválení spuštění | TBD | TBD | `main` |

Coolify environments: production `fixmoxpfcwpcr3ighopor5hm`, preview `2guu37psgioixsbsbkwolupk`.
Preview database strategy: `shared-preview`; současně smí běžet jen jedna změna s migrací.
Live WordPress na `furtnekde.cz` zůstává během vývoje netknutý.

## Deployment contract

- Preflight: `./scripts/preflight.sh --infrastructure`
- Local quality gate: `./scripts/quality.sh`
- Build: `corepack pnpm build`
- Start: `./scripts/start.sh`
- Migrations: `./scripts/migrate.sh` (`migrate.mjs`, PostgreSQL advisory lock, `lock_timeout=120s`)
- Coolify pre-deploy: prázdný; migrace probíhají před startem serveru
- Verification: `./scripts/verify.sh <base-url>`
- Production gate: `PRODUCTION_HOST=<host> ./scripts/verify-production.sh <url>`
- Preview gate: `PREVIEW_HOST_SUFFIX=<host> ./scripts/verify-preview.sh <pr> <url>`
- Internal port: `3000`
- Health endpoint: `/api/health`
- Build pack: `Dockerfile`

## Persistent resources and secrets

- PostgreSQL production: `d0x1o7hxd8vs3myiarbahirx` (`running:healthy`, DB `furtnekde`)
- PostgreSQL preview: `54zradk9ixpspdb8flrbgjuw` (`running:healthy`, DB `furtnekde_preview`)
- Runtime production container používá production DB; PR container používá preview DB (ověřeno Docker inspectem pouze podle hostname, bez vypsání credentials).
- `DATABASE_URL` a `PAYLOAD_SECRET`: oddělené pro production/preview; Coolify read-back `is_buildtime=false`, `is_runtime=true`.
- Secrets nejsou v Git; lokální `.env` je gitignored.
- Upload/file storage: kontejnerové úložiště skeletonu; trvalé produkční uploady musí být rozhodnuté v implementační architektuře před migrací reálných médií.
- Backup policy: před každou produkční datovou změnou PostgreSQL backup; rollback aplikace nenahrazuje restore databáze.

## Infrastructure verification evidence

- Preflight: `PREFLIGHT_OK`.
- Local gates: `LOCAL_OK`; lint, typecheck, integration tests, production build a 12 E2E testů prošly.
- Production URL: `https://furtnekde.2.56.97.3.sslip.io` → `PRODUCTION_OK`, HTTPS 200, health `{"status":"ok"}`.
- Initial production deployment: `24s1fepgc6hxabewezfyiudk`; startup migrace na čisté production DB prošly.
- GitHub webhook: hook `679176477`; podepsané `push` i `pull_request` eventy přijaty Coolify.
- Testovací PR: `https://github.com/drew2323/furtnekde/pull/1` (zavřen bez merge).
- Preview deployment: `dbp7ic2pjsdkmuswnypnosu4`, commit `7335c0fc8267011b9828ecc603736a7b5e0c2bec`, CI run `34871356004`.
- Preview URL: `https://pr-1.furtnekde.2.56.97.3.sslip.io` → `PREVIEW_OK`; marker, homepage a health HTTP 200.
- Preview DB isolation: container `c74mexfmnyaiwvhle25gs9uc-pr-1` používal DB host `54zradk9ixpspdb8flrbgjuw`; production container DB host `d0x1o7hxd8vs3myiarbahirx`.
- Preview teardown: po zavření PR kontejner odstraněn; route následně HTTP 503 (žádný běžící preview kontejner).
- Production webhook test: commit `11bf1c29e8db9643e2941d797c7c5e3a70a7833b`; deployment `ajsqbecg631vmt6uovwke4e7` → `finished`.
- Rollback: deployment `rrcmsulvrq8mx6utxmuwycjm` → `finished`, `rollback=true`; běžící production image vrácen na plný SHA `77858fc9637d79120177889a59d47570a4f837ac`; následně `PRODUCTION_OK`.

## Launch boundary

`INFRASTRUCTURE_READY` potvrzuje testovací delivery pipeline, nikoli souhlas nahradit live WordPress. Přechod `furtnekde.cz`, DNS, reálné FAPI/Ecomail credentials, migrace obsahu a produkční indexace vyžadují samostatné lidské schválení, zálohu a launch checklist.