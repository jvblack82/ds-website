// The Dreamscope Framework (v3), the copy behind the map on /culture#framework.
// Copy master: the Claude Design canvas "DS Framework 2.0", artboards
// V3Main (page 1: header, cards, loop, places) and V3Inside (page 2: what
// each card opens). Edit the canvas first, then this file. BriefCulture.tsx
// reads the phase names and "You get" lines from here; the culture brief PDF
// generator (scripts/build_culture_brief_pdf.py) keeps its own hand-typed copy.

export type FrameworkPhaseId = "discover" | "inspire" | "build" | "implement";

export type FrameworkBlock =
  | { t: "label"; x: string }
  | { t: "terms"; items: { term: string; x?: string }[] }
  | { t: "steps"; items: { n: number; term: string; x: string }[] }
  | { t: "line"; x: string; muted?: boolean }
  | { t: "pills"; items: string[] }
  | { t: "rhythm"; rows: { when: string; x: string }[] }
  | { t: "note"; strong: string; x: string }
  | { t: "closer"; x: string }
  // Words wrapped in *asterisks* render in italics.
  | { t: "loop"; label: string; x: string }
  | { t: "link"; label: string; to: string };

// What a card opens. On a laptop the panel puts `left` and `right` side by
// side, with `top` and `bottom` full width; on a phone it all runs in order.
export interface FrameworkDetail {
  top?: FrameworkBlock[];
  left: FrameworkBlock[];
  right: FrameworkBlock[];
  bottom?: FrameworkBlock[];
}

export interface FrameworkPhase {
  id: FrameworkPhaseId;
  num: string;
  name: string;
  promise: string;
  youGet: string;
  detail: FrameworkDetail;
}

export const FRAMEWORK_PLACES = [
  "Who you hire",
  "How you onboard",
  "How you train",
  "How you meet",
  "What and when you recognize",
  "What you measure",
  "How you decide",
];

export const FRAMEWORK_HEADER = {
  eyebrow: "The Dreamscope Framework",
  title: "Culture is how your strategy gets done.",
  sub: "Find out first. Everything after is built on what you found.",
  // Site copy kept from the old /culture intro, not canvas copy: any phase
  // can run alone (Joe, 25 Oct 2026).
  entry: "Run as one engagement, or any single phase on its own.",
};

export const FRAMEWORK_LOOP = {
  pill: "Employee survey",
  label: "The quarterly loop",
  short:
    "The same short survey, every quarter. KPIs say whether it works. Your people say why.",
  full:
    "The same short survey every quarter, plus deep-dive questions on what the last round raised or an initiative you're running. Managers discuss their own team's results with the team first, then act together. KPIs say *whether* it works. Your people say *why*.",
};

export const FRAMEWORK_PLACES_LINE =
  "The culture lives in seven places you already run.";

export const FRAMEWORK_PHASES: FrameworkPhase[] = [
  {
    id: "discover",
    num: "01",
    name: "Discover",
    promise: "Find out what's really going on.",
    youGet: "A State of Culture report, and what to do first.",
    detail: {
      left: [
        { t: "label", x: "Every view, wide and deep" },
        {
          t: "terms",
          items: [
            { term: "Employee survey", x: "everyone, anonymous, in their own words" },
            { term: "Leadership interviews", x: "how differently each leader sees the company" },
            { term: "Focus groups", x: "what the frontline won't say in front of a manager" },
            { term: "What already exists", x: "what's on paper, to test against what's lived" },
          ],
        },
      ],
      right: [
        { t: "label", x: "Read by the Culture Engine (AI)" },
        {
          t: "terms",
          items: [
            {
              term: "The 20 Dreamscope Factors",
              x: "from pay to managers: every open answer sorted into them, then counted",
            },
            { term: "Connects the dots", x: "which problems show up together, and in which teams or sites" },
            { term: "A profile of every leader we interview", x: "and the people already doing what works" },
            {
              term: "A director's view for every manager",
              x: "their own team's combined results, only when 5 or more answered, plus what they mean and what to do next",
            },
            { term: "Insight to action", x: "next steps ranked by your strategy and goals" },
          ],
        },
      ],
      bottom: [
        { t: "closer", x: "The AI reads everything. A person decides everything." },
        { t: "link", label: "The Culture Engine is the deep dive on this phase →", to: "/culture-engine" },
      ],
    },
  },
  {
    id: "inspire",
    num: "02",
    name: "Inspire",
    promise: "See what culture really is, and why it matters.",
    youGet: "Leaders who want the changes the data calls for.",
    detail: {
      left: [
        { t: "line", x: "Never skipped: once people are excited, the whole project goes better." },
        { t: "line", x: "A workshop for leadership, built from what Discover found. It opens the build." },
      ],
      right: [
        {
          t: "terms",
          items: [
            { term: "Culture is behavior", x: "not perks or posters" },
            { term: "Events fade, systems stay" },
            { term: "Natural Leader", x: "promote people who grow people" },
          ],
        },
      ],
    },
  },
  {
    id: "build",
    num: "03",
    name: "Build or Refresh",
    promise: "Build what isn't there. Fix what doesn't fit.",
    youGet: "The Culture Playbook, and the plan to roll it out.",
    detail: {
      left: [
        { t: "label", x: "The culture elements: created with the company, decided by leadership" },
        {
          t: "steps",
          items: [
            { n: 1, term: "Vision and mission", x: "The why and the how, at company level" },
            { n: 2, term: "The North Star", x: "What a customer should feel, every time" },
            { n: 3, term: "Behaviors", x: "What we would have to do to deliver that feeling" },
            { n: 4, term: "Values", x: "The behaviors, grouped and named" },
            {
              n: 5,
              term: "Team actions and definitions",
              x: "What each value looks like in each team, then one line that defines it",
            },
          ],
        },
      ],
      right: [
        { t: "label", x: "The implementation plan" },
        {
          t: "steps",
          items: [{ n: 6, term: "The seven places", x: "Where the values live every week, each with an owner" }],
        },
        { t: "pills", items: FRAMEWORK_PLACES },
        {
          t: "note",
          strong: "No fixed order.",
          x: "The Discover results and the new elements pick the first places.",
        },
      ],
    },
  },
  {
    id: "implement",
    num: "04",
    name: "Implement",
    promise: "Live it. Then sustain it.",
    youGet: "Seven places running, each with an owner.",
    detail: {
      top: [{ t: "line", x: "The culture lives in operations and grows in systems." }],
      left: [
        { t: "label", x: "Embed it" },
        { t: "terms", items: [{ term: "Leaders, then managers, then everyone" }] },
        { t: "line", x: "Every manager gets the Inspire workshop.", muted: true },
        { t: "line", x: "The CEO announces it, and something real changes that week.", muted: true },
      ],
      right: [
        { t: "label", x: "The systems, on a rhythm" },
        {
          t: "rhythm",
          rows: [
            { when: "Every day", x: "Recognition in the moment. Meetings where people connect." },
            { when: "Every week", x: "Stories of the values, shared in team meetings" },
            { when: "Every month", x: "Recognition by nomination, with the story" },
            { when: "Every quarter", x: "The quarterly loop, below. Town halls. Development plans." },
            { when: "Every year", x: "Interviews, focus groups, the annual event." },
            { when: "Every hire", x: "A culture fit interview, then an onboarding built on the values" },
            { when: "Every training", x: "Each skill taught with the reason behind it, tied to a value" },
            { when: "Every hard decision", x: "Checked against the North Star and the values" },
          ],
        },
      ],
      bottom: [
        { t: "note", strong: "All seven places live in operations.", x: "Nothing sits in HR alone." },
        { t: "loop", label: FRAMEWORK_LOOP.label, x: FRAMEWORK_LOOP.full },
      ],
    },
  },
];
