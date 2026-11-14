---
title: Same-URL hash nav click does not scroll, and the phone menu skews the scroll target
date: 2026-11-14
category: ui-bugs
module: Navbar and Layout scroll manager
problem_type: ui_bug
component: frontend
symptoms:
  - Clicking a nav item that points at a hash on the current page (The Ops Audit on /operations#audit) does nothing after the visitor has scrolled away
  - On a phone, the same tap with the mobile menu open lands about the menu's height past the section (heading at -303px instead of 72px)
  - The phone bug does not show in a Chromium preview, only with scroll anchoring off (Safari behaves that way)
root_cause: async_timing
resolution_type: code_fix
severity: medium
framework_version: react-router-dom 6.30.1, react 18.3
tags: [react-router, hash-link, scroll, navbar, mobile-menu, flushsync, scroll-anchoring]
---

# Same-URL hash nav click does not scroll, and the phone menu skews the scroll target

## Problem
A nav link to a section on the page the visitor is already on (`/operations#audit`) silently does nothing. Once the click handler scrolls by itself, a phone visitor with the menu open lands in the middle of the next section.

## Symptoms
- Desktop and phone: on `/operations#audit`, scroll up, click The Ops Audit, and nothing moves.
- Phone with the scroll fix but no menu fix: the heading ends up about 375px (the open menu's height) above the viewport top.
- Chromium hides the phone bug through CSS scroll anchoring. It reproduces only with `overflow-anchor: none`, which is how Safari behaves.

## What Didn't Work
- Relying on `src/components/Layout.tsx`'s scroll effect. It is keyed on `[pathname, hash]` (line 53), and react-router 6.30 turns a same-URL `Link` click into a replace with the same pathname and hash, so the effect never re-runs.
- Calling `close()` and then `scrollIntoView` in the same handler. React 18 batches `setMobileOpen(false)` until the handler returns, so the scroll target is measured with the open menu still in flow inside the sticky nav. The menu then collapses and the page jumps up by its height.

## Solution
In `src/components/Navbar.tsx` (PR #2):
- Render hash items as a plain `Link`. A `NavLink` matches the pathname only, so it would also show as active.
- Let the handler commit the menu close first, then scroll itself only when the URL already matches:

```tsx
const hashItemClick = (to: string, after: () => void) => () => {
  flushSync(after); // commit the closed menu before measuring
  const alreadyOnTargetSoLayoutWontScroll = pathname + hash === to;
  if (alreadyOnTargetSoLayoutWontScroll) {
    document.getElementById(to.split("#")[1])
      ?.scrollIntoView({ behavior: motionSafeScrollBehavior() });
  }
};
```

A different-URL click still goes through Layout's effect, which runs after the commit and already measures the closed menu.

## Why This Works
The same-URL case has no router change to react to, so the click handler is the only place that can scroll. `flushSync` makes the menu's collapse land before `scrollIntoView` reads layout, so the target is measured where it will actually sit.

## Prevention
- Any new same-page hash link (for example the existing `/#contact` CTA or the `/#about` footer link) has the same dead same-URL click. Route it through the same handler, or key Layout's scroll effect on `location.key`. That would also scroll to the top on a same-URL click of a non-hash link.
- Test phone scroll fixes with `document.documentElement.style.overflowAnchor = 'none'`, or on an iPhone. A Chromium pass alone proves nothing for in-flow menus.

## Related Issues
- PR #2 (the Operations page), review run 20261114-142311-84825d7c, finding #1.
