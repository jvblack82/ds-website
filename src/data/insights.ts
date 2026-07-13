export type InsightBlock =
  | { t: "p"; x: string }
  | { t: "h2"; x: string }
  | { t: "quote"; x: string }
  | { t: "ul"; x: string[] };

export interface InsightLink {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}

export interface Insight {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  blocks: InsightBlock[];
  band: {
    heading: string;
    body: string;
    links: InsightLink[];
  };
}

const DISCOVERY_CULTURE = "https://discovery.dreamscope.win/culture";

export const INSIGHTS: Insight[] = [
  {
    slug: "culture-accident-or-on-purpose",
    title: "Is your culture growing by accident or on purpose?",
    description:
      "Every company has a culture, and it is growing right now. The hand-raise test, the Dunbar thresholds, what accident culture looks like in the wild, and what deliberate culture actually involves.",
    date: "2026-07-12",
    minutes: 5,
    blocks: [
      {
        t: "p",
        x: "There's a moment I run in every leadership workshop. Put your hand up if your company has a culture. Every hand goes up. Now keep it up if that culture was created on purpose. The hands drop.",
      },
      {
        t: "p",
        x: "That drop is the whole subject. Every company has a culture, including yours, and it is growing right now. The only question is whether it grows by accident or on purpose. The default is accident.",
      },
      { t: "h2", x: "Culture is behavior" },
      {
        t: "p",
        x: "Strip the mystery first. Culture is not perks. Happy hours are not the asset, and neither is the poster in reception. Culture is how your people treat each other and how they treat your customers. Behavior. That definition matters because behavior can be observed, taught, measured, and changed. A vibe can't.",
      },
      {
        t: "p",
        x: "I learned this before I had the vocabulary for it. For nine years I ran a landscaping company with my best friend. No frameworks, no HR, one rule: we do what we said we'd do, when we said we'd do it. We had accidentally built a culture around a single value, integrity, and once we noticed, we started driving it on purpose. Everything I've done in the 20+ years since, 9 of them across Asia, is that discovery at scale.",
      },
      { t: "quote", x: "Culture is behavior. Everything else is just a nice idea." },
      { t: "h2", x: "Why the accident stops working" },
      {
        t: "p",
        x: "Anthropologist Robin Dunbar mapped the limits on human relationships, and they explain why the culture that just worked stops working. Under about 15 people, the culture is the founder. Every conversation transmits it. Around 50, no leader holds a personal relationship with everyone, and the transmission starts to skip. Past 150, the tribe fractures into sub-groups, and whatever norms exist begin to set, with or without your input.",
      },
      {
        t: "p",
        x: "None of that is a management failure. It's anthropology. But it means that past a certain headcount, culture has to be spread deliberately or it sets by accident. The companies that hold together as they scale are the ones where the culture is actually built. The ones that fall apart are usually the ones that copied a values list off another company's website.",
      },
      { t: "h2", x: "Accident culture in the wild" },
      {
        t: "p",
        x: "Provenance shows fast when you read a company's values. There are values googled in a weekend because an investor checklist asked for them. There's the CEO who got told on a golf course that he should work on his culture, nodded, and had someone copy another company's website by Friday. The words are on the wall. Nobody can say what they mean here, and nobody's Tuesday changed.",
      },
      {
        t: "p",
        x: "The subtler version is the event trap. I measured it at Pizza 4P's, where I ran culture and operations excellence. The company spent over half a yearly culture budget on a Culture Day across five cities. People genuinely loved it. eNPS jumped 10 points immediately. One quarter later the score was back exactly where it started, because nothing in daily work was holding the gain. I call it the Monday Effect. Friday is the event, the energy, the high-fives. Monday is the same behaviors. Events are a springboard, not a structure.",
      },
      {
        t: "p",
        x: "And the cost of leaving it to accident isn't abstract. Gallup's Q12 meta-analysis, built on 183,000+ business units, puts highly engaged teams at +23% profitability, +18% productivity, 21% to 51% lower turnover, and +10% customer loyalty. Culture is the system that produces that engagement. People who like what they do, do it a lot better. The claim is commercial, not sentimental.",
      },
      { t: "h2", x: "What on purpose looks like" },
      {
        t: "p",
        x: "Start with how your people make decisions when you're not in the room. Rules-based companies answer every problem with a new rule. The manual thickens, autonomy drops, and the best people leave or stop thinking. Values-based companies face the same rising complexity, but a value guides behavior in a thousand situations no rule anticipated. Rules stay where safety demands them. They just stop being the management style. Rules are a map. Values are a compass. Maps fail when the territory changes. A compass always points True North.",
      },
      { t: "p", x: "On purpose, concretely, looks like this:" },
      {
        t: "ul",
        x: [
          "Values written as behaviors, with definitions in the company's own words and 2 to 5 observable actions per value, per division. A value looks different on a factory line than in an office.",
          "A North Star for every team. One sentence defining the experience the team delivers, emotional enough to feel, concrete enough to act on under pressure.",
          "Recognition designed for the story, not the prize. In the moment, value named, story attached.",
          "Values in performance reviews, weighted heavily enough to move promotions and raises. If living the values doesn't affect anyone's pay, you have posters, not values.",
          "Middle managers holding their own team's culture data, with a simple protocol for acting on it.",
          "A quarterly measurement loop that scores all of it, about 30 seconds per employee.",
        ],
      },
      {
        t: "p",
        x: "None of those items is exotic. What makes them on purpose is that they exist deliberately, they fit how the company actually operates, and they get measured. Accidental culture has some of these too, sometimes good ones. The difference is that nobody is steering, so nobody notices when one quietly breaks.",
      },
      { t: "h2", x: "The test" },
      {
        t: "p",
        x: "Run the workshop moment on yourself. Does your company have a culture? Yes. Was it created on purpose? If the honest answer is no, that's a starting position, not a verdict. Some of the best work I've seen started with a company self-aware enough to say: we have nothing formal, and we know it. That honesty beats a wall of borrowed values every time.",
      },
      {
        t: "p",
        x: "Your culture is growing either way. The only question is who's steering it.",
      },
    ],
    band: {
      heading: "Find out where yours actually stands.",
      body: "Eight things culture work could change for you. Pick the three that matter most, answer three questions on where the work would fit. We read every one.",
      links: [
        {
          label: "Take the 15-minute culture discovery →",
          href: DISCOVERY_CULTURE,
          external: true,
          primary: true,
        },
        { label: "See the full culture practice →", href: "/culture" },
      ],
    },
  },
  {
    slug: "what-290-employees-said",
    title: "What 290 employees said that 40 leaders missed",
    description:
      "290 survey responses described a crisis at one level of the company. 40 leadership interviews barely mentioned it. The visibility wall, and how three data layers read against one framework caught what leaders could not see.",
    date: "2026-07-12",
    minutes: 5,
    blocks: [
      {
        t: "p",
        x: "At a 450-person company across 20+ locations, 290 employees answered a survey. Their comments, classified against the framework we use on every engagement, showed sentiment about supervisors down 87%. Not soft, not ambiguous. A crisis, in writing, at one specific level of the company.",
      },
      {
        t: "p",
        x: "At the same company, 40 leaders sat for long-form interviews. Across all 40 conversations, the topic surfaced 5 times.",
      },
      {
        t: "p",
        x: "290 people were describing a crisis. 40 leaders barely mentioned it. And nobody was lying. That last part is why this piece exists.",
      },
      { t: "h2", x: "The visibility wall" },
      {
        t: "p",
        x: "Leadership cannot see what happens at the levels of the company it doesn't work at. That is not a competence problem. It's structural. Information travels upward through summary: each management layer compresses what it heard, softens what's awkward, and forwards what it believes matters. By the time reality reaches the executive floor, it has been filtered three or four times.",
      },
      {
        t: "p",
        x: "Classic workplace studies show the end state. Ask top management what drives their people, and salary tops the list. Ask the employees, and feeling involved and recognition rank higher, with salary third. Leaders and employees are describing different companies, both in good faith.",
      },
      {
        t: "p",
        x: "The standard tools don't break the wall. Annual engagement surveys measure too slowly to manage anything. Long question batteries capture what people think they should say rather than what they mean. And the traditional diagnostic samples: a handful of interviews, a site visit, a report anchored on the loudest voices in the building.",
      },
      { t: "h2", x: "Three layers, one coordinate system" },
      {
        t: "p",
        x: "The diagnostic that caught the supervisor problem runs on three layers. An employee survey built on eNPS: one question, how likely are you to recommend working here to friends and family, and why. The why is the whole method, because what people write unprompted is what's genuinely top of mind. Then leadership interviews, built as story-first conversations rather than interrogations. Then focus groups with frontline staff, managers banned from the room, where projective prompts give people safe ways to be honest. At one client, the prompt was which superhero the company's culture would be, and what its kryptonite was. Indirect questions produce direct truths.",
      },
      {
        t: "p",
        x: "The design decision that makes the system work isn't any single layer. It's that every piece of data from all three layers gets classified against the same 19 research-validated drivers of workplace happiness, covering the organization, the people, the job itself, and wellbeing. A survey comment, an interview passage, and a focus-group exchange all land in the same categories with sentiment attached. Three datasets in one coordinate system means convergence and divergence become computable instead of impressionistic. At this company, the three layers produced 1,541 classified data points.",
      },
      { t: "h2", x: "Why a machine does the reading" },
      {
        t: "p",
        x: "Volume breaks humans. One classification run handled roughly 7,000 responses, applying the same framework to response 7,000 as to response 1. A human reader stays accurate for a couple of hundred, then decays, anchoring on the loudest voices and the most recent page. The system also came to read more in the text than I do, and I built it. It would tag a response with four drivers where I saw two, and when I challenged it, its reasoning held. Every classification arrives with its reasoning attached, which makes findings defensible instead of atmospheric.",
      },
      { t: "h2", x: "The divergence is the finding" },
      {
        t: "p",
        x: "Where survey, interviews, and focus groups agree, confidence is high and action is easy to justify. Where they diverge, the divergence is itself the finding. The supervisor case is the template. The gap between what 290 employees wrote and what 40 leaders said was the diagnosis. Leadership wasn't hiding the problem. It genuinely could not see the level where the problem lived. The system caught what the humans missed, not by being smarter, but by reading everything in one coordinate system.",
      },
      {
        t: "p",
        x: "The same convergence work kills naive fixes. In one market at this company, performance was down and the dominant complaint was salary. The obvious move was raises. The correlations showed salary complaints traveling with bad internal processes and a bad relationship with supervisors, and the thread led through about seven managers to a single regional manager whose working habits set the tone for the whole market. The fix was a coaching conversation, not a payroll increase. Not vague low morale. A nameable, fixable chain.",
      },
      { t: "h2", x: "What it proved out" },
      {
        t: "p",
        x: "One more result, stated precisely because the precision is the point. In a blind retrospective, the system flagged 5 employees as flight risks. All 5 were among the 7 who left. 1 was flagged before departure. That capability is early warning for a conversation, not a verdict on a person.",
      },
      {
        t: "p",
        x: "And the report is built to end in decisions, not charts. The analysis produced roughly six recommended initiatives, each carrying its evidence and its tie to what leadership said it wanted to accomplish. Leadership pared the list to three, each scoped in the room with a definition, next actions, and an owner. Year over year, eNPS moved +9.",
      },
      { t: "h2", x: "What to do with this" },
      {
        t: "p",
        x: "The wall is structural, so the fix has to be structural. You will not interview your way through it, and you cannot fix it by being more approachable, because the filter isn't about you. What the leaders missed was never hidden. It was distributed across 290 comments that no human had time to read properly, sitting in plain sight the whole time.",
      },
      {
        t: "p",
        x: "The companies that get ahead of this are the ones that read every voice in one system, so that what leadership believes and what the frontline lives can be compared directly. That comparison is where the truth was.",
      },
    ],
    band: {
      heading: "This is what the Culture Engine does.",
      body: "Three data layers, 19 research-validated drivers, one convergent diagnosis. The full methodology is written up, and the discovery takes 15 minutes.",
      links: [
        {
          label: "See how the Culture Engine works →",
          href: "/culture-engine",
          primary: true,
        },
        {
          label: "Take the 15-minute culture discovery →",
          href: DISCOVERY_CULTURE,
          external: true,
        },
      ],
    },
  },
  {
    slug: "four-phase-culture-framework",
    title: "The four-phase culture framework, explained",
    description:
      "Inspire, Discover, Build or Refresh, Implement. A guided tour of the Dreamscope practice: why the order is fixed, what each phase produces, and how the quarterly loop keeps the whole thing alive.",
    date: "2026-07-12",
    minutes: 6,
    blocks: [
      {
        t: "p",
        x: "Culture work has a shape. After 20+ years operating, 9 of them across Asia, the practice has settled into four phases that run in a fixed order: Inspire, Discover, Build or Refresh, Implement. Run it as one engagement or enter at a single phase, the shape stays the same. Get the people in, find the truth, build what holds, make it live. Here's the tour, and the reasoning behind the order.",
      },
      { t: "h2", x: "Phase 1: Inspire" },
      {
        t: "p",
        x: "Inspire sits first because buy-in decides everything downstream. Culture work fails when people are told what culture is instead of pulled into building it, so before anything gets measured or built, leadership gets a working session, not a lecture. What culture actually is, what it isn't, and why it matters for the company they're trying to build.",
      },
      {
        t: "p",
        x: "The definition does most of the heavy lifting. Culture is behavior: how your people treat each other and how they treat your customers. Not perks, not the poster. Every company already has one, growing by accident or on purpose. From there the session makes the case from the human side. Self-Determination Theory gives a leader three levers: sense of control, sense of progress, sense of connectedness. The 5 I's ladder gives a manager the diagnostic: does each person show up for the paycheck, for company pride, for the team, for personal growth, or for higher purpose? Each rung buys more effort. The paycheck rung buys the minimum.",
      },
      {
        t: "p",
        x: "Inspire runs twice. Once at the start, with the founder and leadership. Again later, when the work has matured enough to roll out to middle management, because middle managers are the ones who live it day to day. Without their buy-in, the work doesn't land.",
      },
      { t: "h2", x: "Phase 2: Discover" },
      {
        t: "p",
        x: "Discover is where culture stops being anecdote and becomes evidence. It sits second because prescribing before diagnosing is malpractice. Three layers of data get collected: an eNPS survey, one question plus a why, about 30 seconds per employee; leadership interviews, built as story-first conversations; and frontline focus groups, managers banned from the room so the truth can walk in. Everything from all three layers is classified against the same 19 research-validated drivers of workplace happiness, which is what lets you lay the reads on top of each other. Where the layers agree, confidence is high. Where they diverge, the divergence is itself the finding.",
      },
      {
        t: "p",
        x: "The output is a State of Culture report that ends in recommendations rather than charts, and a diagnosis that determines the next phase. What gets built next is decided by data, not assumption.",
      },
      { t: "h2", x: "Phase 3: Build or Refresh" },
      {
        t: "p",
        x: "The slash means or. Build a culture because there isn't one, or refresh the one that exists because it's broken. Only the Discover evidence can say which job you're facing, which is why this phase sits third. In practice there are three outcomes: build, when nothing exists; refresh, when the artifacts are dated, broken, or never fit how the company operates; and complete, when the values are genuinely lived but the layers that make them operational were never built. That last one is better news than it sounds. The culture is real. It just outgrew word of mouth.",
      },
      {
        t: "p",
        x: "The construction walks a foundation chain: Vision, Mission, Values, Value Definitions, Value Actions, North Star. Vision is why the company exists long term, written for the team and daring enough that someone could disagree. Mission is present tense, what you deliver and what makes you different. Values are behaviors, not word-picking, and the whole company feeds the draft before the cut: five values, seven at the ceiling, because focus on too many things is focus on nothing.",
      },
      {
        t: "p",
        x: "Inside definitions and actions, the order is counterintuitive: actions first, definitions second. The company crowdsources real stories of the values being lived. Teams turn those stories into 2 to 5 observable actions per value, per division, because a value looks different on a factory line than in an office. Then candidate definitions get reverse-engineered from the teams' own actions, and the room votes. The definitions end up carrying the company's fingerprints, which is why people remember and use them. Generic values mean nothing.",
      },
      {
        t: "p",
        x: "The North Star closes the chain. Vision inspires and mission directs, but neither tells anyone what to do on a Tuesday afternoon. The North Star does: one sentence per team defining the experience it delivers, emotional enough to feel, concrete enough to act on under pressure. It works when people repeat it unprompted.",
      },
      {
        t: "p",
        x: "Everything the build creates lands in one designed document, the Culture Playbook. The values with their definitions, each division's North Star, and the teams' own values-in-action stories. More than half of it is application: culture in hiring, onboarding, feedback, recognition, and meetings. Two versions ship, a workshop takeaway and a sendable edition for everyone who wasn't in the room. A map is not meant to sit on a shelf.",
      },
      { t: "h2", x: "Phase 4: Implement" },
      {
        t: "p",
        x: "Implement is where culture becomes how the place runs, and it splits into Live and Sustain. The rollout is sequenced by quick wins, easiest first, so visible wins land from day one while the bigger systems build. The actual order gets re-derived per client from their data and their named goal. Retention, customer experience, whatever the evidence says. Not a template.",
      },
      {
        t: "p",
        x: "Live is the day-to-day layer. Recognition designed for the story, not the prize: in the moment, value named, micro-story attached, plus a nomination-by-story monthly program feeding quarterly and annual awards. Meetings run as connection opportunities instead of calendar debris. Town halls where questions are pre-collected and upvoted, and the CEO has agreed up front that every top question gets answered, because one defensive answer costs two quarters of questions. And middle managers, the layer that actually carries culture, each holding their own team's culture data with a simple protocol for acting on it.",
      },
      {
        t: "p",
        x: "Sustain is the part that keeps working without me in the building. eNPS every quarter, about 30 seconds per employee, plus 1 to 3 deep-dive questions earned by whatever the last round couldn't answer. Every initiative gets scored by the next round: KPIs tell you whether it's working, your people tell you why. Values go into performance reviews, weighted heavily enough to move promotions, raises, and improvement plans, because if living the values doesn't affect anyone's pay, the company has posters, not values. Hiring and onboarding screen for values at the door. And the whole thing runs on a strengths lens: make what is great greater, give the weaknesses bumpers, not the spotlight.",
      },
      {
        t: "quote",
        x: "A diagnosis tells you where you are. The quarterly loop tells you whether you're moving.",
      },
      { t: "h2", x: "One system, not four projects" },
      {
        t: "p",
        x: "The phases compound. Inspire creates the want. Discover replaces assumptions with evidence. Build or Refresh constructs the operating layer. Implement wires it into daily work, and the quarterly loop feeds new evidence back so the system steers itself. Skip Inspire and you get polite compliance. Skip Discover and you're prescribing blind. Skip the build and there's nothing to implement. Skip Implement and you've bought a binder.",
      },
      {
        t: "p",
        x: "If a company can fund exactly one system, my answer is the listening loop, because nothing moves a culture faster than people seeing their feedback acted on. And if you want the whole framework in one line, it's the line the practice runs on: people who like what they do, do it a lot better.",
      },
    ],
    band: {
      heading: "See the practice in full.",
      body: "The four phases, the deliverables, and how an engagement actually starts. All on one page.",
      links: [
        {
          label: "Explore the culture practice →",
          href: "/culture",
          primary: true,
        },
      ],
    },
  },
];

export function getInsight(slug: string | undefined): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}
