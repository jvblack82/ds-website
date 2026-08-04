# Dreamscope website (ds-website)

Marketing site for Dreamscope Consulting. Deployed to **www.dreamscope.win** via Vercel (auto-deploys from `main`).

**Full playbook** (design system, content guardrails, source material, roadmap) lives in the **`dreamscope-website` skill**. Edit the working copy at `C:\DS Local\Plugins\dreamscope-website\skills\dreamscope-website\SKILL.md` (git-backed marketplace repo `jvblack82/dreamscope-plugins`; bump `plugin.json`, commit, push, then `marketplace update` + reinstall to go live). The old `C:\DS Local\skills\dreamscope-website\` staging path is retired/stale, kept only as a fallback copy. Load the skill before any non-trivial change.

## Fast facts

- **Stack:** Vite + React 18 + TS + Tailwind + shadcn. Content pages use injected inline CSS scoped per page, one prefix class per page (e.g. `.land-page` / `.aim-page` / `.ws-page`; full page/prefix/palette table in the skill), not Tailwind utility classes.
- **Routes** (`src/App.tsx`, all under `<Layout>`): `/` Landing, `/culture` CulturePractice, `/culture-engine` CultureEngine, `/ai-maestro` AIMaestro, `/coaching` AICoaching, `/workshops` Workshops, `/check/culture` CultureCheck, `/website` WebsiteRebuild, `/brief` BriefHub (chooser between the two briefs), `/brief/ai` BriefAI, `/brief/culture` BriefCulture (all three unlinked from nav, leave-behind long-reads), `/insights` + `/insights/:slug` Insights/Insight, `*` NotFound. `/joeblack` Card is the digital business card and is deliberately routed OUTSIDE `<Layout>` so it renders with no navbar. `WorkshopPrep.tsx` exists in `src/pages/` but is currently unrouted (taken down between workshop engagements, not deleted; see skill for the re-enable steps). Non-Landing routes are lazy-loaded (`React.lazy` + `Suspense`). `Layout` provides the sticky navbar + scroll manager; footers are per-page.
- **Navbar** has dropdown groups (Culture, AI Maestro), not a flat link list. Full structure in the skill.
- **Verify before pushing:** `npm run build` must exit 0. Push to `main` = production deploy.
- **`vercel.json`** currently holds only the SPA fallback rewrite (direct hits to sub-routes serve `index.html`). Do not delete it. No gated static deck is live right now: the one that existed, `/betterworks`, and its `middleware.ts` were both removed 2026-06-23 when that bid closed (pattern documented in the skill for reuse, not currently active).
- **Package manager is npm** (`package-lock.json`). No bun.
- **Palettes:** Cool (navy `#1E2B3A` / teal `#0C7C8A`, DM Serif Display + DM Sans) on Landing, CulturePractice, CultureEngine, CultureCheck, Insights/Insight. Warm (caramel `#B5895A` / cream `#FBF8F1`, Cormorant Garamond + Inter) on AIMaestro, AICoaching, Workshops, WebsiteRebuild. Brief uses Warm colors with a different font pairing (DM Serif Display + Plus Jakarta Sans, both load correctly; Jakarta via the `@import` in `src/index.css`). Full table in the skill, not duplicated here.
- **Brand decision (Joe, 2026-07-03):** this site identity is canonical for the web. The official Dreamscope Design System (charcoal + gold + Plus Jakarta Sans, in `C:\DS Local\Design Systems\`) is the DECK surface and documents these web tokens in its WEB SURFACE annex. Do not reskin the site to deck tokens.

## Non-negotiables (public copy under Joe's name)

- No em-dashes. Percentages, not decimals.
- Verify every proof point and number against the CV (`Personal\Joe_Black_CV_May_2026.docx`) and the AI Maestro sales brief. Never fabricate or misattribute.
- Do not name the Culture Engine client (Marou) publicly as the case-study source; say "a 450-person company". (Marou's logo alone in the credibility strip is fine, same rule as Lixibox.)
- AI Maestro family pages (`/ai-maestro`, `/coaching`, `/workshops`, `/website`) avoid: consultant, consulting, consultancy, solution, platform.
- Optimize images before committing (`npx sharp-cli`; bands ~2400px q78 under 400KB, inline ~1600px under 250KB, logos under 12KB).
- Commit messages end with the Co-Authored-By line. In PowerShell, no double quotes inside the here-string message.
