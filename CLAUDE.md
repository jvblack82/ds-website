# Dreamscope website (dream-team-builder)

Marketing site for Dreamscope Consulting. Deployed to **www.dreamscope.win** via Vercel (auto-deploys from `main`).

**Full playbook** (design system, content guardrails, source material, roadmap) lives in the **`dreamscope-website` skill** (installed Dreamscope plugin; editable staging source at `C:\DS Local\skills\dreamscope-website\SKILL.md`, which only goes live when repackaged and re-added). Load it before any non-trivial change.

## Fast facts

- **Stack:** Vite + React 18 + TS + Tailwind + shadcn. Content pages use injected inline CSS scoped per page (`.land-page` / `.ce-page` / `.aim-page`), not Tailwind utility classes.
- **Routes** (`src/App.tsx`, all under `<Layout>`): `/` Landing, `/culture` CulturePractice, `/culture-engine`, `/ai-maestro`, `/brief` (leave-behind long-read, unlinked), `*` NotFound. Non-Landing routes are lazy-loaded (`React.lazy` + `Suspense`). `Layout` provides the sticky navbar + scroll manager; footers are per-page.
- **Verify before pushing:** `npm run build` must exit 0. Push to `main` = production deploy.
- **`vercel.json`** holds the SPA fallback rewrite (direct hits to sub-routes serve `index.html`). Do not delete it.
- **Package manager is npm** (`package-lock.json`). No bun.
- **Palettes:** Landing + `/culture` + Culture Engine = navy `#1E2B3A` / teal `#0C7C8A` (DM Serif Display + DM Sans). AI Maestro + Brief = caramel `#B5895A` / cream `#FBF8F1` (Cormorant Garamond + Inter).
- **Brand decision (Joe, 2026-07-03):** this site identity is canonical for the web. The official Dreamscope Design System (charcoal + gold + Plus Jakarta Sans, in `C:\DS Local\Design Systems\`) is the DECK surface and documents these web tokens in its WEB SURFACE annex. Do not reskin the site to deck tokens.

## Non-negotiables (public copy under Joe's name)

- No em-dashes. Percentages, not decimals.
- Verify every proof point and number against the CV (`Personal\Joe_Black_CV_May_2026.docx`) and the AI Maestro sales brief. Never fabricate or misattribute.
- Do not name the Culture Engine client (Marou) publicly; say "a 450-person company".
- AI Maestro page avoids: consultant, consulting, consultancy, solution, platform.
- Optimize images before committing (`npx sharp-cli`; bands ~2400px q78 under 400KB, inline ~1600px under 250KB, logos under 12KB).
- Commit messages end with the Co-Authored-By line. In PowerShell, no double quotes inside the here-string message.
