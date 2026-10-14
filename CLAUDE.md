# CTLYST Toolbox

Static site (plain HTML/CSS/JS, no build step) deployed on Vercel at **https://ctlyst-toolbox.vercel.app** (Vercel project `ctlyst-toolbox`). Unlisted: every page sends `noindex` (see `vercel.json`).
Owner: Chandler Rust (independent life insurance agent; agency **CTLYST**, under the IMO **Everlife**).

The recruiting intake form, opt-in page, privacy policy, terms and the `/api/lead` → Make webhook live in a **separate** site/project (scalewithsteelwater.com, Vercel project `steelwater-scaling`), not in this repo. Old `scalewithsteelwater.com/chans-toolbox/...` links redirect here.

## Deploying
- Pushing to `main` on GitHub deploys to production (once the Vercel Git integration is connected).
- Manual deploy from this folder: `vercel deploy --prod --yes`.
- `vercel.json` sets `cleanUrls` (so `/pitch-flowchart` serves `pitch-flowchart.html`).
- After deploying, check the live URL with a cache-busting query (e.g. `?v=123`); phones cache aggressively.

## The toolbox (`index.html`)
- All drawers/tools are defined in the `DRAWERS` array in the `<script>`. Drawers: `vision` (Catch the Vision), `start` (Get Started, numbered steps), `axe` (Sharpen the Axe).
- Tool entry: `{ name, url, icon }`. `url: ""` shows "Coming soon". `menu: { title, options: [...] }` opens a pop-up; options can have a `note` and `url: ""` ("Link coming soon"). `id` on a tool makes it deep-linkable.
- Deep links: `/#vision`, `/#start`, `/#axe` open a drawer; `/#leads` opens the lead-setup pop-up.
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

## Brand (CTLYST)
- `brand/`: `ctlyst-logo.png` (transparent), `ctlyst-mark.png`, icons, `ctlyst-og.png` (link preview).
- Colors: bg `#2B3B38`, brand green `#445C58`, cards `#344743`, lines `#4C625E`, text `#F6F4F2`, muted `#B3C1BA`, sage accent `#A3B3AB` / `#B9CBC2` / `#C4D1CA`, dark text on sage `#1C2826`.
- Fonts: Manrope (UI), DM Serif Display (titles). Dark theme.

## Compliance rules (keep these)
- Never say or imply affiliation with the VA, government, a bank/lender, or a "benefits office"; don't call Chandler an "underwriter".
- Unlicensed callers (VA/assistant scripts) don't quote prices, name carriers, or ask health questions.
- Don't make income guarantees; examples are illustrations.
