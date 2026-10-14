# scalewithsteelwater.com — CTLYST site & toolbox

Static site (plain HTML/CSS/JS, no build step) deployed on Vercel to **www.scalewithsteelwater.com**.
Owner: Chandler Rust (independent life insurance agent; agency **CTLYST**, under the IMO **Everlife**; legal entity **Steelwater Strategies**).

## Deploying
- Pushing to `main` on GitHub deploys to production (Vercel Git integration).
- Manual deploy from this folder: `vercel deploy --prod --yes` (needs access to the Vercel project).
- `vercel.json` sets `cleanUrls` (so `/chans-toolbox/pitch-flowchart` serves `pitch-flowchart.html`) and `noindex` headers for everything under `/chans-toolbox`.
- After deploying, verify on the live URL with a cache-busting query (e.g. `?v=123`); phones cache aggressively.

## Pages
| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | Recruiting opt-in landing page (Instagram bio link). Form posts to `/api/lead`. |
| `/opt-in` | `opt-in.html` | SMS opt-in page for A2P 10DLC registration (unchecked consent checkbox). |
| `/privacy-policy`, `/terms` | `privacy-policy.html`, `terms.html` | Legal pages for Steelwater Strategies (Lehi, UT; contact@steelwaterstrategies.com). Contain required SMS language — don't remove it. |
| `/chans-toolbox` | `chans-toolbox.html` | **CTLYST Toolbox** (unlisted, noindex). Toolchest with 3 drawers. |
| `/chans-toolbox/*` | `chans-toolbox/*.html` | Tools linked from the toolbox (see below). |
| `/api/lead` | `api/lead.js` | Vercel function: validates name/phone, honeypot (`company`), forwards JSON to the Make webhook in env var `LEAD_WEBHOOK_URL`. Sends `sms_consent`, `consent_text`, `page`, `source`. |

## The toolbox (`chans-toolbox.html`)
- All drawers/tools are defined in the `DRAWERS` array in the `<script>` — edit there. Drawers: `vision` (Catch the Vision), `start` (Get Started, numbered steps), `axe` (Sharpen the Axe).
- Tool entry: `{ name, url, icon }`. `url: ""` shows "Coming soon". `menu: { title, options: [...] }` opens a pop-up; options can have a `note` (instructions) and `url: ""` (link coming soon). `id` on a tool makes it deep-linkable (`/chans-toolbox#leads`).
- Deep links: `#vision`, `#start`, `#axe` open a drawer; `#leads` opens the lead-setup pop-up.
- Get Started videos: `chans-toolbox/get-started.html`, `STEPS` array (`youtube` = video ID). Pages are `/chans-toolbox/get-started#1`…`#9`.

## Tools in `chans-toolbox/`
- `pitch-flowchart.html` (Mortgage Protection), `veteran-pitch.html`, `inbound-fex-pitch.html` — branching flowcharts. **The Health section is shared logic: keep it identical across all three** when changing carriers/branches.
  - Layout classes: `.fc` 2-col / `.fc.three` 3-col grid; `.main` (left path), `.side` (branch; first `.cond` sits on the arrow), `.out` (3rd-column condition→carrier fan-out), `.down` (labeled down arrow), `.carrier` boxes with a `.skip` link. Return arrows: put `data-to="<target id>"` on the branch card; JS draws the dashed arrow into the top of the target box.
  - Mobile: columns are one screen wide, horizontal scroll with snap. Keep `.cond` labels short enough to fit on the arrow gap.
  - Current carriers: Americo, Aflac, Instabrain (GIWL), plus Ethos Term (>$450K, <65) and Americo Instant IUL in the all-clear recommendations.
- `lead-spend-planner.html` — calculator. Channel order: Inbound Mortgage Protection ($30) → Inbound Final Expense ($35) → Meta Ad Pool ($20) → aged leads ($1), capped at `agedHr` (default 30) dials/hour; unused budget is shown, not converted to deals.
- `state-licensing.html` — licensing groups (Group 2 = high-volume/override states).
- `recruiting-deck.html` — 12-slide deck (CTLYST-branded; slide 3 = authority/compensation diagram).
- `vision-calculator.html`, `new-agent-roadmap.html` (+ `.pdf`), `mp-appointment-setter.html` (unlinked), `va/*.pdf` (VA scripts & assistant crash course).

## Brand (CTLYST)
- Logo files in `brand/` (`ctlyst-logo.png` transparent, `ctlyst-mark.png`, icons, `ctlyst-og.png` link preview).
- Colors: bg `#2B3B38`, brand green `#445C58`, cards `#344743`, lines `#4C625E`, text `#F6F4F2`, muted `#B3C1BA`, sage accent `#A3B3AB` / light `#B9CBC2` / `#C4D1CA`, dark text on sage `#1C2826`.
- Fonts: Manrope (UI), DM Serif Display (titles). Dark theme.

## Compliance rules (keep these)
- Never say or imply affiliation with the VA, government, a bank/lender, or a "benefits office"; don't call Chandler an "underwriter".
- Unlicensed callers (VA/assistant scripts) don't quote prices, name carriers, or ask health questions.
- SMS: consent checkbox unchecked by default; include frequency, msg & data rates, STOP/HELP, links to Terms/Privacy; "no mobile information shared with third parties for marketing".
- Don't make income guarantees; examples are illustrations.
