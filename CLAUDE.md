# CTLYST Toolbox

Static site (plain HTML/CSS/JS, no build step) deployed on Vercel at **https://ctlyst-toolbox.vercel.app** (Vercel project `ctlyst-toolbox`). Unlisted: every page sends `noindex` (see `vercel.json`).
Owner: Chandler Rust (independent life insurance agent; agency **CTLYST**, under the IMO **Everlife**).

The recruiting intake form, opt-in page, privacy policy, terms and the `/api/lead` → Make webhook live in a **separate** site/project (scalewithsteelwater.com, Vercel project `steelwater-scaling`), not in this repo. Old `scalewithsteelwater.com/chans-toolbox/...` links show a "toolbox has moved" notice with a button to the matching page here.

## Deploying
- Pushing to `main` on GitHub deploys to production automatically (Vercel Git integration). The repo is **public** (that's what lets collaborators' pushes deploy on Vercel's free plan), so never commit secrets, tokens or private links you don't want public.
- Manual deploy from this folder: `vercel deploy --prod --yes`.
- `vercel.json` sets `cleanUrls` (so `/pitch-flowchart` serves `pitch-flowchart.html`).
- After deploying, check the live URL with a cache-busting query (e.g. `?v=123`); phones cache aggressively.

## The toolbox (`index.html`)
- All drawers/tools are defined in the `DRAWERS` array in the `<script>`. Drawers: `vision` (Catch the Vision), `start` (Get Started, numbered steps), `axe` (Sharpen the Axe).
- Tool entry: `{ name, url, icon }`. `url: ""` shows "Coming soon". `menu: { title, options: [...] }` opens a pop-up; options can have a `note` and `url: ""` ("Link coming soon"). `id` on a tool makes it deep-linkable.
- Drawers also include `team` (Team & Training, added by Corbin).
- Deep links: `/#vision`, `/#start`, `/#team`, `/#axe` open a drawer; `/#leads` opens the lead-setup pop-up; `/#pay` opens How You're Paid.
- Home-screen app: `manifest.webmanifest` + `brand/ctlyst-icon-*.png`.

## Tools
- `get-started.html` — Get Started videos; `STEPS` array (`youtube` = video ID). URLs `/get-started#1`…`#9`.
- `pitch-flowchart.html` (Mortgage Protection), `veteran-pitch.html`, `inbound-fex-pitch.html` — branching flowcharts. **Keep the Health section identical across all three** when changing carriers/branches.
  - Classes: `.fc` 2-col / `.fc.three` 3-col grid; `.main` (left path), `.side` (branch; first `.cond` sits on the arrow), `.out` (3rd-column condition→carrier fan-out), `.down` (labeled down arrow), `.carrier` boxes with a `.skip` link. Return arrows: `data-to="<target id>"` on the branch card; JS draws a dashed arrow into the top of the target box.
  - Mobile: columns are one screen wide with horizontal snap scroll; keep `.cond` labels short.
  - Carriers: Americo, Aflac, Instabrain (GIWL), plus Ethos Term (>$450K, <65) and Americo Instant IUL in the all-clear recommendations.
- `lead-spend-planner.html` — order: Inbound Mortgage Protection ($30) → Inbound Final Expense ($35) → Meta Ad Pool ($20) → aged leads ($1, capped at `agedHr` default 30/hour; unused budget shown, not turned into deals). Links to `/#leads`.
- `state-licensing.html` — licensing groups (Group 2 = high-volume/override states).
- `recruiting-deck.html` (+ `recruiting-deck/cabo.jpg`) — 12-slide CTLYST deck; slide 3 = authority/compensation diagram.
- `vision-calculator.html`, `new-agent-roadmap.html` (+ `.pdf`), `mp-appointment-setter.html` (unlinked), `va/*.pdf` (VA scripts & assistant crash course).

## Corbin's additions (merged 2026-10-14 from his Agent Toolkit)
Corbin (GitHub `gitworkdunn`) added these; keep his wording when editing.
- How You're Paid (`/#pay` menu): `how-youre-paid.html` (overview + Producer/VP toggle calc), `comp-plan.html`, `producer-bonus.html`, `vp-bonus.html`, `annuity-pay.html`, `medicare-pay.html`. Calculators are inline vanilla JS. Source docs in `everlife/` and `ffl/`. Comp/annuity data is confidential to the agency (site is noindex).
- `everlife-onboarding.html` — EverLife onboarding checklist (5 phases, steps `#1`–`#18`, progress saved in localStorage).
- `everlife-recruiting-deck.html` (+ `everlife/deck/slide-*.jpg`), `agent-resources.html` (Weekly Calls & Trainings, + `ctlyst/agent-resources.pdf`).
- `guides/pitch-flowchart.html` (general call flow), `guides/objections.html`, `guides/lead-sources.html`.
- `new-agent-roadmap.html`: phase 6 "Add Annuities" (Months 6–12, links `/annuity-pay`); Medicare is 7, taxes 8. Regenerate the PDF after roadmap edits (headless Chrome print-to-pdf; a print rule hides the buttons).
- Corbin's call scripts are not included yet (pending a compliance rewrite against the rules below).

## Brand (CTLYST)
- Source: the CTLYST brand kit (Google Drive folder from Chandler; guidelines PDF + logo SVGs).
- `brand/`: `ctlyst-wordmark-dark.svg` / `ctlyst-wordmark-light.svg` (cropped from the kit's logo SVGs), `ctlyst-emblem-light.svg` (the C mark), icons `ctlyst-icon-*.png` (emblem on carbon), `ctlyst-og.png` (link preview). `ctlyst-logo.png` / `ctlyst-mark.png` are the older green-era files still used by inner pages.
- Toolbox main page (`index.html`) uses the brand-kit palette: Carbon Black `#171717` (bg), Deep Graphite `#303331` (drawers), Light Grey `#E2E2DF` (text, pill nameplate/handles), Soft Sand `#D8C7B5` / Pale Sand `#DDD8CE` (accent), Deep Espresso `#362B26` (unused so far). Font: **Geist**. Graphic element: oversized emblem cropped off the page edges.
- Inner pages still use the older green theme (bg `#2B3B38`, brand green `#445C58`, Manrope + DM Serif Display) until they're restyled.

## Compliance rules (keep these)
- Never say or imply affiliation with the VA, government, a bank/lender, or a "benefits office"; don't call Chandler an "underwriter".
- Unlicensed callers (VA/assistant scripts) don't quote prices, name carriers, or ask health questions.
- Don't make income guarantees; examples are illustrations.
