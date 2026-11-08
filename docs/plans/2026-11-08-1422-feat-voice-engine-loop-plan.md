---
title: Voice Engine loop on /culture-engine - Plan
type: feat
date: 2026-11-08
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-plan-bootstrap
execution: code
---

# Voice Engine loop on /culture-engine - Plan

## Goal Capsule

- **Objective:** A visitor to /culture-engine sees, in one calm animated diagram, how three listening inputs become a ranked read and a To Do list in 2 days instead of 2 to 3 months, and how the action loops back to the inputs; it reads correctly on a laptop, on a phone, with reduced motion and with a screen reader.
- **Means:** a self-contained `VoiceLoop` component (own injected styles, like `FrameworkMap`) inserted after the Problem section (KTD1, KTD2).
- **Authority:** Joe's fixed content in the build brief (every word on the diagram), then the canvas "The Voice Engine loop", artboard "The loop (diagram)", for the shape, then the site design system in the `dreamscope-website` skill, then this plan.
- **Stop and ask Joe when:** any wording would need to change or be added beyond the fixed content, or a step would push, merge or deploy.
- **Execution profile:** worktree `C:\Code\DS website-voice-loop` on branch `feat/voice-loop`; the repo has no test runner, so proof is `npm run build` plus browser checks at 1440 and 390 wide, with and without reduced motion.
- **Tail ownership:** `/ce-work` builds and verifies, `/ce-code-review` reviews, one local commit; Joe previews and says ship before any merge or push.

## Product Contract

### Summary

Add the Voice Engine loop Joe drew on 6 Nov as an animated section on /culture-engine, restyled from the deck look into the site's Cool palette.

### Problem Frame

The page explains the Culture Engine in prose and stat tiles but never shows the loop that makes it work: what goes in, how fast it is read, what comes out, and that it repeats. Joe's whiteboard version of that loop "really clicked" with people, and it carries his positioning (months of expert work becomes days) in one picture.

### Requirements

- R1. Content exactly as fixed: kicker "THE VOICE ENGINE"; headline "Your people already wrote the fix."; inputs eNPS survey (every quarter), Leadership interviews (every year), Focus groups (every year); engine "The Voice Engine" ("reads every answer, in any language"); "By hand: 2 to 3 months" struck through, then "Now: 2 days"; outputs "What matters most" (20 indicators of workplace satisfaction, ranked; Joe changed this from "the 20 Dreamscope Factors, ranked" on 8 Nov because readers do not know the Dreamscope Factors) and "The To Do list" (fixes your own people suggested); "Action, mapped to goals"; loop label "Repeat, and see what moved".
- R2. Flow as drawn: all three inputs merge into the engine; the engine splits to both outputs; only the To Do list flows to Action; the loop runs from Action back to all three inputs.
- R3. On first scroll into view it plays once, in order: inputs flow in, the months line is struck and "Now: 2 days" snaps in, outputs appear, the loop closes. Short and calm, about 4 seconds.
- R4. With prefers-reduced-motion, without IntersectionObserver, or in print, the finished state shows with no animation. (The site is client-rendered, so a no-JavaScript visitor gets no page at all; that is out of scope.)
- R5. Below 900px wide it stacks vertically, and the loop becomes a return arrow at the bottom.
- R6. All content is real HTML text in reading order; decorative SVG is aria-hidden.
- R7. Site Cool palette and fonts (navy, teal, DM Serif Display, DM Sans), never the deck charcoal and gold; text contrast at least 4.5:1.

### Scope Boundaries

- No other copy on the page changes.
- No new nav entry, route or dependency.

## Planning Contract

### Key Technical Decisions

- KTD1. Placement: /culture-engine, right after the Problem section. The Discover panel of the framework map already sends readers here ("The Culture Engine is the deep dive on this phase"), and the Problem section ends on "your own people's solutions to your own problems", which the headline answers.
- KTD2. One DOM, two layouts. Nodes are real elements in reading order; from 900px up they sit absolutely on a fixed-aspect stage (design grid 1100 x 490, positions as percentages, text sized in container-query units so the whole diagram scales as one); below 900px the same elements fall into a stacked flex column. Connectors are an aria-hidden SVG on desktop (same viewBox, so lines meet the boxes exactly) and small aria-hidden arrow glyphs on phone.
- KTD3. Animation is CSS transitions keyed off two classes: `vl-armed` (hidden start state) is added in an effect only when motion is allowed and IntersectionObserver exists; `vl-play` is added once on intersect. Lines draw with `pathLength="1"` dash offsets; per-element delays come from a `--d` custom property. Never arming is the fallback, so R4 holds by default.
- KTD4. Section background is the page's light teal (`#E8F4F5`), distinct from the warm-white Problem section above and the cream Approach section below. Engine navy, Action in the gold from Joe's diagram (#E7B008) with navy text at 7:1 (his call, 8 Nov, over the site teal), outputs white with a navy border, inputs white. Text sitting directly on the light teal (kicker, "Now: 2 days", loop label) uses a darker teal #0A6B77 (5.5:1), and muted text uses #5F6B6E (4.9:1); the site --teal (4.4:1) and --muted fail there.

## Implementation Units

### U1. VoiceLoop component

- **Goal:** the diagram, its two layouts and its animation.
- **Requirements:** R1 to R7.
- **Files:** `src/components/VoiceLoop.tsx` (new).
- **Approach:** follow `src/components/FrameworkMap.tsx` for injected, prefixed styles (`.vl-`); scope palette variables on the component root, not `:root`. Strike via `<s>`; inputs and outputs as lists. The diagram is a `<figure>` whose `aria-label` states the flow in R1's own words; the struck line carries a visually hidden "Before:" so its meaning does not depend on `<s>` being announced. A print rule shows the finished state.
- **Timing (about 4s):** inputs and their lines together with a 0.12s stagger (0 to 0.9s), engine as they land (0.8s); strike draws (1.3s), "Now: 2 days" snaps (1.65s); engine-to-output lines and both outputs together (2.0 to 2.4s); To Do-to-Action line (2.5s), Action (2.7s); loop line draws back to all three inputs (3.0 to 3.9s), its label last.
- **Phone order:** inputs, merge arrow, engine with its before and now lines, split arrow, the two outputs side by side, an arrow under the To Do list only, Action, then the return arrow carrying "Repeat, and see what moved".
- **Test scenarios:** desktop 1440: every line meets its box, the loop enters all three inputs, label sits on the bottom line; 900 to 1000 wide: no text overflows a box and the smallest diagram text is at least 12px; 390: stacked, no horizontal scroll, return arrow last, only the To Do list points to Action; reduced motion: finished state on load; scroll into view: plays once in the timing order and does not replay on scroll back; load with the section already in view or reached by hash: it still plays and finishes.
- **Verification:** screenshots at 1440 and 390 of the finished state, a check at 900 to 1000 wide, and a mid-animation check of order.

### U2. Insert on /culture-engine

- **Goal:** the section on the page.
- **Requirements:** R1, KTD1.
- **Files:** `src/pages/CultureEngine.tsx`.
- **Approach:** import and render `<VoiceLoop />` between the Problem and Approach sections.
- **Test scenarios:** page renders, neighbors unchanged.
- **Verification:** build passes; page loads in preview with no console errors.

## Verification Contract

- `npm run build` exits 0.
- Browser checks in the preview at 1440, 900 to 1000 and 390, plus a reduced-motion check, as in U1.
- A copy sweep of the new file: no em-dashes, no "Happiness", American spelling, wording matches R1.

## Definition of Done

- U1 and U2 built and verified as above, no experimental leftovers in the diff.
- `/ce-code-review` receipt in hand.
- One local commit on `feat/voice-loop`; nothing pushed or merged.
