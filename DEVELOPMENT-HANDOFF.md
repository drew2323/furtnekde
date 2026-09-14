# Development Handoff – Furt někde / vizuální základ

```text
TASK: První schvalovací prototyp webu Furt někde
STATUS: HANDOFF_READY
APPROVED BY: David Brázda (2026-09-14 – pokyn vytvořit web podle dohodnutého zadání a použít vývojové workflow)

SCOPE:
- Implementovat první schvalovací prototyp podle pořadí dodání v produktovém briefu §13: vizuální základ, homepage, jedna prodejní stránka a vzorový článek.
- Vytvořit veřejné routy:
  - `/` – homepage jako rozcestník tří obchodních cest;
  - `/kurzy/letadlem-s-miminkem-a-malymi-detmi` – detail kurzu létání;
  - `/blog/vzorovy-clanek` – vzorová struktura článku.
- Homepage musí mít: jasný přínos pro rodiče cestující s miminkem/malými dětmi; hlavní CTA přesně „Vybrat, s čím potřebujete pomoct“; rozcestník kurz létání / kurz plánování / plánování na míru; vybrané články; jeden vstup do e-mailové komunikace; závěrečný rozcestník.
- Kurz létání: cena přesně 1 390 Kč, jednorázová platba bez splátek; 14 praktických částí; dlouhodobý přístup bez časového tlaku; možnost položit otázku; jasné pro koho je/není; výsledek, obsah, materiály, cena, CTA a FAQ. Neimplementovat reálnou platbu ani FAPI embed v tomto prototypu; CTA označit jako přechod k objednávce bez falešného úspěchu.
- Vzorový článek: jeden H1, perex, datum věcné aktualizace, autor pouze pokud je ověřený (jinak bez vymyšlené osoby), obsah s odkazy na kapitoly, H2/H3, informační box, zdroje, tematické CTA, FAQ, související články a newsletter.
- Vytvořit řízený design systém z tokenů: cream #FAF6F1, sand #E8D4BF, brand-pink #F28FB2, ink #2F3442, apricot #F2B38F, sage #B8C7A3, seafoam #BED9D6. Primární CTA růžová s ink textem; nejvýše dva dominantní akcenty na viewport; žádné velké růžové plochy.
- Styl: svěží, radostný a cestovatelský, ale klidný a světlý; jemné ruční linky/papírová textura střídmě; ne infantilní blog, luxusní cestovka, korporátní šablona ani generický AI web.
- Zachovat/rozšířit Payload kolekci Pages a přidat pouze takový minimální obsahový model/bloky, aby Tereza mohla upravit copy a obsah prototypových stránek bez změny kódu. Žádná duplicitní globální cena na více místech.
- Přidat základní komponenty Button, Container, Section, Heading a Card a skládat z nich doménové bloky.
- Zachovat `/api/health`, migrace, Dockerfile a deployment kontrakt beze změny.
- Testovací/preview prostředí musí být `noindex`.

ACCEPTANCE CRITERIA:
- Všechny tři routy vrací HTTP 200, jsou česky, používají vykání a neobsahují lorem ipsum, generické AI fráze ani vymyšlená čísla/reference/partnerství.
- Homepage během prvního viewportu vysvětlí komu Furt někde pomáhá a nabízí přesné hlavní CTA.
- Kurz / služba na míru / obsah zdarma působí jako tři odlišné cesty.
- Kurz létání obsahuje pouze schválené ceny a fakta ze SPEC/briefu.
- Vzorový článek demonstruje požadovanou redakční strukturu; proměnlivá tvrzení nejsou vydána za ověřené aktuální informace bez primárního zdroje a data kontroly.
- Design dodržuje schválenou paletu a kontrast; bílý text se nepoužívá na pastelových plochách.
- Mobil 375 px a desktop 1366 px: bez horizontálního overflow, s viditelným focus stavem a ovladatelností klávesnicí.
- Payload admin zůstává funkční; model prototypových stránek má verzovanou migraci.
- Preview má robots noindex; produkční testovací sslip host nesmí být zaměněn za souhlas se spuštěním live domény.
- `scripts/quality.sh` končí `LOCAL_OK`; CI je zelené; PR preview projde `PREVIEW_OK`.

INPUTS:
- `SPEC.md`
- `ARCHITECTURE.md`
- `WEB_PLATFORM.md`
- `PROJECT-INFRASTRUCTURE.md` (STATUS: INFRASTRUCTURE_READY)
- `AGENTS.md`
- `/home/david/Projects/mini-team/projects/automaticke-weby/FURT-NEKDE-WEB-BRIEF-V1.md`
- `/home/david/Projects/mini-team/projects/automaticke-weby/FURT-NEKDE-VISUAL-DIRECTION.md`
- `/home/david/Projects/mini-team/projects/automaticke-weby/assets/furt-nekde/finalni-barevna-paleta.jpg`

TARGET:
- repository: https://github.com/drew2323/furtnekde
- branch: `feat/initial-visual-prototype`

WORKER:
- Codex CLI

EXPECTED RESULT:
- Implementace pouze první schvalovací etapy.
- Verzované schema/migrace a automatické testy acceptance criteria.
- Passing local gates přes `scripts/quality.sh` (`LOCAL_OK`).
- Commit, push a pull request.
- CI green a Coolify preview URL `https://pr-<id>.furtnekde.2.56.97.3.sslip.io`, nebo explicitní blocker.
- Stručný seznam věcí vyžadujících schválení Terezy/Davida před další etapou.

OUT OF SCOPE:
- Rozpracování všech zbývajících stránek před schválením vizuálního směru.
- Reálné FAPI/Ecomail/Mighty credentials a produkční integrace.
- Vymyšlené reference, mediální loga, důkazní čísla, fotografie, kontaktní e-mail, role osob nebo právní texty.
- Generované rodinné fotografie, generická fotobanka nebo Reel snímky s textovým overlayem jako hero.
- Migrace WordPress obsahu/URL, změna DNS, live `furtnekde.cz` nebo jeho indexace.
- Změna deployment mechanismu, Dockerfile, start/migration/health skriptů, Coolify konfigurace nebo DB hranic.
- `scripts/preflight.sh --infrastructure` – infrastrukturní gate zodpovědnosti Team Agent/Hermes; worker ho neprovádí.
```
