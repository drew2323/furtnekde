# Zadání – Furt někde web

**Status:** SPEC_READY
**Owner:** David Brázda (hranice realizačního workflow); obsah a produkt Tereza
**Schváleno:** 2026-09-14 (David – rozsah a zahájení bootstrapu)
**Kanonický detailní zdroj:** [FURT-NEKDE-WEB-BRIEF-V1.md](../mini-team/projects/automaticke-weby/FURT-NEKDE-WEB-BRIEF-V1.md)

## Cíl

Vytvořit nový web Furt někde, který nahrazí WordPress, propojí obsah a nabídky do jednoho srozumitelného systému a zachová FAPI / Ecomail / Mighty Networks. WordPress zmizí úplně.

## Scope (prvý prototyp / initial implementation)

Jádro první verze (dle briefu §6):

- Homepage – rozcestník tří obchodních cest (kurz létání, kurz plánování, poptávka plánování na míru); hlavní CTA „Vybrat, s čím potřebujete pomoct“.
- Jak vám pomůžeme.
- Přehled kurzů, detail kurzu létání (1 390 Kč), detail kurzu plánování (1 790 Kč).
- Plánování dovolené na míru – pouze akviziční stránka + poptávková cesta (realizace služby mimo web); 4 900 Kč, jedno kolo úprav, max 4–5 plánovaní měsíčně.
- Blog rozcestník + šablona článku.
- O nás, Kontakt.
- Obsah zdarma: balicí seznam a e-book zdarma (obsahový základ stávající https://furtnekde.cz/odber-e-book/).
- Newsletter / Cestovací úterý.
- Pro média a značky (neveřejně propagovaná, `noindex`).
- Právní a systémové stránky.

Zachované externí služby: FAPI (objednávky, platby, fakturace), Ecomail (newsletter, kontakty), Mighty Networks (kurzy, komunita). Medusa se nepoužije.

## Acceptance criteria

- Vše schválené stránky a stavy existí.
- Návštěvník rychle pochopí nabídku a další krok; kurz / služba / obsah zdarma sú jasně rozlišené.
- Bez placeholders, rozpory, neověřených údaj ani technických chyb.
- CTA, formuláry, e-maily, objednávky a přístupy prošly testem.
- Tereza sama publikuje testový článek a změní cenu, CTA, referenci a globální údaj (Paylоад admin, page builder ze schválených bloků).
- Hodnotné URL zachované nebo správno přesměrované (SEO migrace).
- Mobil i desktop použitelné a konzistentné; přístupnost, výkon, klávesnická ovladatelnost.
- Testovací prostředí neindexované; produkce má správné indexační nastavení.
- Detail v briefu §14.

## Out of scope (prvý verze, bez samostatného schválení)

- Nový členský systém, vlastní platební řešení, cestovatelská aplikace, automatický generátor itinerářů, uživatelské účty, pokročilá personalizace, vícejazyčnost, plně automaticko publikování AI článků, další nové produkty.
- Zmena deployment mechanismu, sdílené webové platformy, anebo merge do produkce bez lidského schválení preview.
- Stávající live produkce na `furtnekde.cz` se během stavby nemění (brief §11); nový web se staví v neveřejném testovacím prostředí.