# Architektura – Furt někde

**Status:** ARCHITECTURE_READY
**Owner:** David Brázda
**Last updated:** 2026-09-14
**Kanonický zdroj:** [Standard agentně spravovaných webů](../mini-team/standards/agent-friendly-web-architecture.md), [WEB_PLATFORM.md](WEB_PLATFORM.md), [WEB_INFRASTRUCTURE.md](../mini-team/standards/WEB_INFRASTRUCTURE.md)

## System purpose

Nový web Furt někde – Next.js + Payload CMS + PostgreSQL na vlastním VPS s Coolify, doručovaný přes GitHub PR → Coolify Preview → lidské schválení → merge → produkce. Zachová FAPI, Ecomail a Mighty Networks; WordPress se nahrazuje úplně.

## Stack a integrace

```text
Next.js + Payload CMS + PostgreSQL
                ↓
              FAPI
                ↓
        Ecomail / Mighty Networks
```

- Payload je součástí TypeScript projektu; CMS konfigurace, datový model a bloky patří do Git historie.
- Obsahové stránky se skládají ze schválených bloků (Hero, Text, Image+Text, Features, Testimonials, CTA, FAQ, Blog grid, Product/Course card).
- Tailwind CSS + design tokeny; vlastní komponenty `Button`, `Container`, `Section`, `Heading`, `Card`; žádné inline styly; arbitrary Tailwind hodnoty jen výjimečně.
- FAPI: objednávkové formuláry, platby, fakturace, česká obchodní logika (embed/integrace; bližší integraci určí se v Phase 2 po inventuře).
- Ecomail: newsletter, mailing, kontakty, marketingové automatizace.
- Mighty Networks: přístup do kurzů a komunity, mimo web.
- Medusa se pro Furt někde nepoužije.

## Development en delivery model

```text
Agent → feature branch → commit/push → GitHub PR → Coolify Preview → lidská kontrola → merge do main → Coolify Production
```

- Preview a produkce používají oddělené prostředí a tajné proměnné.
- Produkční data a klíče nejsou v PR ani v Git historii.
- Databázové migrace verzované, zálohované a vratné; startup migrace pod PostgreSQL advisory lockem.
- Merge do `main` vyžaduje úspěšné kontroly a lidské schválení; produkční nasazení s healthcheck a dohledatelným rollbackem.
- Agent standardně nehazuje do produkce přes SSH.

## Domény a prostředí (bootstrap)

- Nový web se staví v neveřejném testovacím prostředí (brief §11). Skeleton bootstrap jde na dočasný host `furtnekde.2.56.97.3.sslip.io`; live `furtnekde.cz` zůstává netknutý.
- Preview: `pr-<n>.furtnekde.2.56.97.3.sslip.io`.
- Na realnou doménu `furtnekde.cz` se přeje pouze při skutečném spuštění, po lidském schválení, se zachováním/page-redirect plánem (SEO migrace) a se živým stavbím na produkci.
- Preview/produkce oddělené PostgreSQL.

## Projektové výjimky od WEB_PLATFORM

- Žádné v bootstrapu. Realná doména, FAPI/Ecomail integrační specificity a produkční secrets se určí v Phase 2 Development Handoffu jako schválené výjimky, pokud budou potřeba.