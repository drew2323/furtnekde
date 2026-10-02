# Agent Rules

1. **Multica ticket je jediný zdroj pravdy pro změnu.** Musí obsahovat outcome, scope, acceptance criteria a vlastníka. Handoff, průběžný stav, rozhodnutí a blockery zapisuj do ticketu; nevytvářej pro ně nové Markdown dokumenty.
2. Před zahájením přečti ticket a `README.md`. Stabilní produktový kontext čti v [DreamTeam docs](https://github.com/drew2323/dreamteam-docs/tree/main/src/content/docs/projects/furt-nekde). `docs/OPERATIONS.md` čti při změně runtime, dat, deploye nebo infrastruktury.
3. Pracuj na samostatné branchi z aktuálního `main`; název musí obsahovat identifikátor ticketu (např. `codex/dt-123-short-name`). Jeden ticket = jedna branch = jeden PR.
4. Neměň nic mimo scope ticketu. Nutnou vedlejší změnu nejprve popiš v ticketu; bez schválení ji nedělej.
5. Behaviorální změny vyvíjej test-first. U změn aplikace nebo runtime spusť `./scripts/quality.sh`. U docs-only změny stačí kontrola odkazů a formátu; u samostatné změny shell skriptu minimálně `sh -n <script>`. Vždy přesně uveď, co proběhlo a co ne.
6. PR musí odkazovat na Multica ticket a obsahovat shrnutí, testy, rizika a ověřenou Coolify preview URL. U čistě dokumentační změny napiš `Preview: not required (docs-only)`.
7. Agent smí commitnout, pushnout a otevřít draft PR. Po dokončení předá ticket Hermes PM. Agent nesmí sám mergeovat, spouštět produkční deploy, předávat práci přímo člověku ani uzavřít ticket jako `done`.
8. Hermes PM vyhodnotí důkazy a rozhodne o opravě, dalším ověření nebo lidském review. Připomínky se opravují na stejné branchi. Ticket jde do `done` až po schváleném merge a ověření cílového prostředí.
9. Produkční data, tajemství, migrace, importy, změny Coolify a přechod živé domény vyžadují explicitní scope ticketu, zálohu a rollback plán. Tajemství nikdy necommituj ani nevypisuj.
10. Pokud je ticket nejasný nebo preview/CI nefunguje, zastav se a zapiš konkrétní blocker. Nerozšiřuj práci odhadem.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

Before any Next.js work, read the relevant documentation in `node_modules/next/dist/docs/`. The bundled docs are the source of truth for the installed version.

<!-- END:nextjs-agent-rules -->
