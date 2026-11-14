---
title: Operations Practice on the Site - Plan
type: feat
date: 2026-11-14
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-plan-bootstrap
execution: code
---

# Operations Practice on the Site - Plan

## Goal Capsule

- **Objective:** a visitor to dreamscope.win sees two practices, Culture and Operations, and can read on one page what Operations does, how the Ops Audit starts it, where the fixes land, and how to reach Joe, with every existing URL still working.
- **Means:** a new Warm-palette `/operations` page built on the `/ai-maestro` page pattern, with the nav group, home page and AI Maestro page re-pointed to it (KTD1, KTD2).
- **Authority:** the approved mock (Joe, 14 Nov 2026: "this is all approved, build and deploy it") wins on copy and layout; the `dreamscope-website` skill's public-copy guardrails win on anything the mock does not cover; this plan wins on mechanism.
- **Stop conditions:** stop and ask Joe if reproducing the mock needs copy the mock does not hold, or if a guardrail and the mock conflict in a way not listed under Assumptions.
- **Execution profile:** one branch (`feat/operations-practice`), one PR, merge-gated by a ce-code-review receipt; Joe gave the deploy go in chat on 14 Nov for everything the mock holds, and the few strings it does not hold wait for his yes (Definition of Done).

---

## Product Contract

### Summary

Add `/operations` as the second practice page, switch the top menu's AI Maestro group to Operations, point the home page's hero line, hero button, practice card, search description and tab title at Operations, and mark `/ai-maestro` as part of Operations. Copy and layout come from sections 1 to 3 of the approved mock, without its review sheet, grey notes and yellow highlights.

### Problem Frame

On 13 Nov 2026 Joe split Dreamscope into two practices: Culture, and Operations with AI Maestro as its method and the Ops Audit as its way in. The site still sells AI Maestro as the second practice, so a buyer reads "AI consultant" when two of the three fix areas (People Systems, Custom Software Solutions) are not AI. The mock went through a review round, a Fable sign-off and Joe's 13 comments before approval.

### Requirements

**Menu**

- R1. The second nav group is labeled "Operations" and its trigger links to `/operations`.
- R2. Its items, in order: The Practice (`/operations`), The Ops Audit (`/operations#audit`), AI Maestro (`/ai-maestro`), AI Coaching (`/coaching`), The Self-Updating Website (`/website`); no discovery-form item.
- R3. On mobile the group shows "Operations overview" first, as the Culture group does today.
- R4. On `/operations`, "The Ops Audit" item does not show as active alongside "The Practice".

**The Operations page**

- R5. `/operations` reproduces the mock's section 3 copy and order: hero, 01 The problem, 02 The work behind it, 03 The way in (`#audit`), 04 Where the fixes land, 05 After the plan, 06 The method behind the AI work, contact band, footer.
- R6. The page offers contact only: email `joe@dreamscope.win` and LinkedIn `https://www.linkedin.com/in/joevblack/`; it links to no discovery form.
- R7. The page links to `/ai-maestro` from the AI area card and the section 06 button.
- R8. The page is in `public/sitemap.xml`.

**Home and AI Maestro**

- R9. The home page hero second line, hero button (to `/operations`), practice card (eyebrow "Operator-led", title "Operations", new body, link to `/operations`) and search description match the mock's "Becomes" column; the search description replaces only its first sentence and keeps "20 years operating, based in Ho Chi Minh City, working anywhere."; the bottom "AI Maestro: see where to start" button stays.
- R10. `/ai-maestro` shows the kicker "Dreamscope · Operations · AI Maestro" and one line under the hero, "Part of Operations. See how it starts →", linking to `/operations`.

**Contracts that stay**

- R11. No URL is removed or moved, so no redirect is added.
- R12. Changed copy holds the site guardrails: no em-dashes, American English, no "consultant", "consulting", "platform" or "solution" except Joe's area name "Custom Software Solutions" and the fixed "Dreamscope Consulting" brand name (footers and the home-page title prefix).

### Key Decisions

- **The discovery form stays on AI Maestro; Operations shows contact only** (session-settled: user-directed — chosen over pointing the Operations buttons at the AI Maestro discovery form: its questions lean AI, and an Operations questionnaire is a separate task for after 22 Nov). Governs R2, R6, R9.
- **"Custom Software Solutions" keeps its name** (session-settled: user-directed — chosen over "Custom Software": Joe's canonical area name, 14 Nov "This is fine"). Governs R12.
- **The proof strip ships as approved** (session-settled: user-directed — chosen over waiting for new case studies: Joe kept it for now and scheduled the case-study interview for 24 Nov). Governs R5.

### Scope Boundaries

- No Operations discovery questionnaire (Notion task, 23 Nov) and no new case studies (Notion task, 24 Nov).
- No edits to `/brief`, `/brief/ai`, `/joeblack` or other pages that still say AI Maestro.
- No separate Ops Audit page; the Ops Audit is the `#audit` section.

#### Deferred to Follow-Up Work

- Update the `dreamscope-website` skill (nav structure, routes, page-prefix table) in the plugin marketplace repo after the merge.

---

## Planning Contract

### Key Technical Decisions

- KTD1. **The page's look is the mock's section-3 CSS, renamed `.op-` to `.ops-`; only the mechanics come from `src/pages/AIMaestro.tsx`.** From the mock: its tokens (caramel-deep `#8C6339`, muted `#6E6355`, dark `#1E2B3A` text on caramel buttons, which hold 4.5:1 contrast where the AIMaestro values do not), the small uppercase numbered labels, the all-cream sections with hairline dividers, the caramel contact band and the 860px stacking rules. From AIMaestro: style and font-link injection with cleanup, `usePageMeta`, router `Link` for internal links, and the `aim-footer` markup and copy (email, LinkedIn, About, Insights), restyled to the mock's footer row; the mock's two-item footer abbreviates the site footer. The page sets `scroll-padding-top: 72px` so `#audit` clears the sticky nav.
- KTD2. **Hash items in the nav render as plain `Link`, not `NavLink`, with their own click handler.** `NavLink` matches the pathname only, so `/operations#audit` would light up with The Practice (R4). A nav item whose `to` holds a `#` renders as a plain link in the desktop dropdown and mobile accordion, keeps the existing close-menu handlers, and when the current pathname and hash already equal its target, scrolls the target into view itself with `motionSafeScrollBehavior()`, because a same-URL click changes neither and `Layout.tsx` scrolls only on a change.
- KTD3. **Nav group id becomes `operations`.** The `id` drives the dropdown's element id and open state only; nothing else reads `maestro`.

### Assumptions

- Two home-page strings the mock does not hold, so the card and tab title don't contradict the change: the practice card's second paragraph (today the five AI categories) becomes "Three common areas: People Systems, Process Enhancement with AI, and Custom Software Solutions. AI Maestro is how the AI work gets done.", and the title "Culture and AI, Run by an Operator" becomes "Culture and Operations, Run by an Operator" (in `usePageMeta` and the static `index.html` tags). Both go to Joe in chat before merge under the Goal Capsule stop condition.
- The `/operations` title is "Operations · Find What's Slowing You Down" and its meta description is the mock's Operations-only lines: "Find what's slowing a company down and fix it. It starts with the Ops Audit: we find out how the work really runs, then fix it with People Systems, AI and custom software."
- The mock's in-page placeholders (hero "Let's talk →" to `#start`, the contact band id `start`) carry over as written.

### Sources

- Spec (outside the repo): `C:\DS Local\_Working Notes\Operations page mock.html`, published at https://claude.ai/artifact/KUmCjRYdxetqyvTPKgsVXJ (v5). Copy text from it with the `.chg` / `.chg-b` / `.chg-tag` highlight markup and the `.rv`, `.note` and `.sec-h` review-sheet parts removed.
- Patterns: `src/pages/AIMaestro.tsx` (page shell, meta, fonts, CTA band, footer), `src/components/Navbar.tsx` (groups), `src/components/Layout.tsx` (hash scroll), `src/App.tsx` (lazy routes above the catch-all).

---

## Implementation Units

### U1. The Operations page

- **Goal:** `/operations` renders the mock's section 3.
- **Requirements:** R5, R6, R7, R8, R12.
- **Dependencies:** none.
- **Files:** create `src/pages/Operations.tsx`; modify `src/App.tsx`, `public/sitemap.xml`.
- **Approach:**
  1. Build the page per KTD1, copying copy verbatim from the spec; section ids `audit`, `maestro`, `start` as in the mock.
  2. Contact band: "Email joe@dreamscope.win →" as a `mailto:` button plus "Connect on LinkedIn"; the audit-end card shows the email and a LinkedIn link (R6).
  3. AI area link and section 06 button use router `Link` to `/ai-maestro` (R7).
  4. Lazy-load the page in `src/App.tsx` and add its route above the `*` catch-all; add a sitemap entry with lastmod 2026-11-14.
- **Patterns to follow:** `src/pages/AIMaestro.tsx`.
- **Test scenarios** (the repo has no automated test suite; these are preview checks):
  - Opening `/operations` at 1280px shows the hero and sections 01 to 06 in the mock's order with the mock's copy.
  - At 390px every grid stacks to one column, the "After the plan" stages keep their numbers, and the page body never scrolls sideways.
  - Opening `/operations#audit` directly lands on "The Ops Audit" heading below the sticky nav.
  - No element on the page links to `discovery.dreamscope.win`.
  - "This is AI Maestro →" and "How AI Maestro works →" open `/ai-maestro`.
  - Section labels, caramel small text and both button styles hold 4.5:1 contrast.
- **Verification:** the rendered page matches the mock's section 3 side by side, and the build exits 0.

### U2. The Operations nav group

- **Goal:** the menu reads Culture | Operations | Workshops.
- **Requirements:** R1, R2, R3, R4.
- **Dependencies:** U1.
- **Files:** modify `src/components/Navbar.tsx`.
- **Approach:**
  1. Replace the `maestro` group with the `operations` group per R1, R2 and KTD3.
  2. Render items whose `to` holds `#` as plain links in the desktop dropdown and mobile accordion (KTD2).
- **Patterns to follow:** the existing Culture group and its external-link branch.
- **Test scenarios:**
  - On `/operations` the dropdown shows The Practice active and The Ops Audit not active.
  - Clicking The Ops Audit from `/` lands on the `#audit` section of `/operations`.
  - From `/operations#audit`, scroll to the top, open the menu and click The Ops Audit: the page lands on `#audit` and the menu closes, on desktop and phone.
  - On `/ai-maestro` the Operations trigger shows active.
  - The phone menu's Operations accordion lists Operations overview, The Ops Audit, AI Maestro, AI Coaching, The Self-Updating Website.
- **Verification:** the desktop dropdown and phone menu match the mock's section 1.

### U3. Home page edits

- **Goal:** the home page names Operations as the second practice.
- **Requirements:** R9, R12.
- **Dependencies:** U1.
- **Files:** modify `src/pages/Landing.tsx`, `index.html`.
- **Approach:** apply R9 and the two Assumptions strings; set `index.html`'s `<title>`, meta description, `og:title` and `og:description` to the same strings `usePageMeta` gets, since link-preview crawlers read only the static file; leave the bottom AI Maestro button and everything else as is.
- **Test scenarios:**
  - View-source of `/` shows the new title and description.
  - The hero second button reads "Explore Operations →" and opens `/operations`.
  - The practice card reads Operator-led, Operations and the new body, and opens `/operations`.
  - The closing section still shows "AI Maestro: see where to start →" pointing at the AI Maestro form.
- **Verification:** the home page text matches the mock's section 2.

### U4. AI Maestro marked as part of Operations

- **Goal:** `/ai-maestro` says where it sits.
- **Requirements:** R10, R11.
- **Dependencies:** U1.
- **Files:** modify `src/pages/AIMaestro.tsx`.
- **Approach:** change the hero kicker and add the one line under the hero's button row, styled like the existing `aim-link`, as a router `Link` to `/operations`.
- **Test scenarios:**
  - The hero kicker reads "Dreamscope · Operations · AI Maestro".
  - "Part of Operations. See how it starts →" opens `/operations`.
- **Verification:** the AI Maestro hero shows both changes and nothing else on the page changed.

### U5. Repo notes

- **Goal:** the repo's own notes describe the new nav and route.
- **Requirements:** R1, R5.
- **Dependencies:** U1, U2.
- **Files:** modify `CLAUDE.md`.
- **Approach:** add `/operations` to the routes line, the Warm palette page list and the consultant/solution guardrail page list, and name the nav groups as Culture and Operations.
- **Test expectation:** none -- documentation only.
- **Verification:** `CLAUDE.md` lists `/operations` in all three places and names the Operations group.

---

## Verification Contract

| Check | Command or method | Done signal |
|---|---|---|
| Build | `npm run build` | exits 0 |
| Lint on changed files | `npx eslint src/pages/Operations.tsx src/components/Navbar.tsx src/pages/Landing.tsx src/pages/AIMaestro.tsx src/App.tsx` | no new errors |
| Em-dash sweep | search the changed files for the em-dash character | none in user-facing copy |
| Banned words | search `src/pages/Operations.tsx` for consultant, consulting, platform, solution | only "Custom Software Solutions" and the footer brand name |
| Visual match | local preview at 1280px and 390px, `/`, `/operations`, `/operations#audit`, `/ai-maestro`, compared with the mock | screenshots match sections 1 to 3 |
| Code review | ce-code-review on the PR branch | verdict "Ready to merge" or "Ready with fixes", receipt on the PR |
| Live | `https://www.dreamscope.win/operations` and `/ai-maestro` after merge | `/operations` shows "Find what's slowing you down. Fix it." and `/ai-maestro` shows "Dreamscope · Operations · AI Maestro" (a 200 alone proves nothing, the SPA rewrite serves every path) |

## Definition of Done

- Every unit's verification holds and the Verification Contract rows pass.
- The PR carries the review receipt line and desktop and phone screenshots.
- No highlight markup, review-sheet text or abandoned code is in the diff.
- Joe answers yes in chat to the two home-page strings the mock does not hold (Assumptions); everything else rides on his 14 Nov go.
- Then the PR is merged and the live routes are confirmed.
