import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FRAMEWORK_HEADER,
  FRAMEWORK_LOOP,
  FRAMEWORK_PHASES,
  FRAMEWORK_PLACES,
  FRAMEWORK_PLACES_LINE,
  type FrameworkBlock,
  type FrameworkPhaseId,
} from "@/data/framework";
import { motionSafeScrollBehavior } from "@/lib/utils";

// The Dreamscope Framework as "the map that opens" (/culture#framework).
// One DOM order (card 1, panel 1, ... card 4, panel 4, loop and places) is
// laid out two ways. At or above LAPTOP_MIN_WIDTH the cards sit in one row,
// the one open panel full width right under them, then the loop and places;
// under it everything stacks and each card opens in place, several at once.
// /culture#discover (and the old #phase-discover links) open that phase;
// Layout scrolls to it.
const LAPTOP_MIN_WIDTH = 900;
const LAPTOP_QUERY = `(min-width: ${LAPTOP_MIN_WIDTH}px)`;
// Cards also answer to their old #phase-* anchors, which links out there still use.
const LEGACY_ANCHOR_PREFIX = "phase-";

const css = `
  .fwm {
    --fwm-dark: #1E2B3A;
    --fwm-teal: #0C7C8A;
    --fwm-teal-light: #0E96A6;
    --fwm-cream: #F7F4EF;
    --fwm-sand: #EDE8E0;
    --fwm-body: #3A3A3A;
    --fwm-muted: #575E66;
    --fwm-accent: #E8F4F5;
    --fwm-gap: 1.6rem;
    --fwm-line: 3px;
    --fwm-out: 1.1rem;
  }

  .fwm-eyebrow { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--fwm-teal); margin-bottom: 1rem; }
  .fwm-title { font-family: 'DM Serif Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 400; line-height: 1.2; color: var(--fwm-dark); margin: 0 0 0.8rem; max-width: 22ch; }
  .fwm-sub { font-size: 1.15rem; line-height: 1.6; color: var(--fwm-body); margin: 0 0 0.35rem; max-width: 640px; }
  .fwm-entry { font-size: 1rem; line-height: 1.6; color: var(--fwm-muted); margin: 0 0 2.6rem; max-width: 640px; }

  .fwm-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  /* Up by the card's 4px top border, so an old #phase-* link lands on the card's edge */
  .fwm-anchor { position: absolute; top: -4px; left: 0; }

  /* Phone first: everything stacks in DOM order */
  .fwm-map { position: relative; display: flex; flex-direction: column; gap: 1.5rem; }

  .fwm-card {
    position: relative; display: flex; flex-direction: column; gap: 0.35rem;
    background: var(--fwm-cream); border-top: 4px solid var(--fwm-teal); border-radius: 14px;
    padding: 1.3rem 1.3rem 1.2rem;
  }
  .fwm-card.is-open { box-shadow: 0 0 0 2px var(--fwm-teal); }
  /* 24px makes this large text, which teal on cream passes (small text would not) */
  .fwm-num { font-family: 'DM Serif Display', serif; color: var(--fwm-teal); font-size: 1.5rem; line-height: 1; }
  .fwm-name { font-family: 'DM Serif Display', serif; font-weight: 400; font-size: 1.7rem; line-height: 1.1; color: var(--fwm-dark); margin: 0.15rem 0 0; }
  .fwm-promise { font-size: 1.02rem; font-weight: 500; line-height: 1.5; color: var(--fwm-body); margin: 0 0 0.7rem; }
  .fwm-youget { margin-top: auto; background: #fff; border-left: 3px solid var(--fwm-teal); border-radius: 8px; padding: 0.7rem 0.85rem; }
  .fwm-youget-label { display: block; font-size: 0.68rem; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: var(--fwm-teal); margin-bottom: 0.2rem; }
  .fwm-youget-text { display: block; font-size: 0.95rem; font-weight: 700; line-height: 1.4; color: var(--fwm-dark); }

  .fwm-toggle {
    align-self: flex-start; display: inline-flex; align-items: center; gap: 0.45rem;
    min-height: 44px; margin-top: 0.85rem; padding: 0.5rem 1.1rem;
    background: #fff; color: var(--fwm-teal); border: 1px solid var(--fwm-teal); border-radius: 50px;
    font-family: 'DM Sans', sans-serif; font-size: 0.92rem; font-weight: 600; cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .fwm-toggle::after { content: ''; position: absolute; inset: 0; border-radius: 14px; }
  .fwm-toggle:hover, .fwm-card.is-open .fwm-toggle { background: var(--fwm-teal); color: #fff; }
  .fwm-toggle:focus-visible { outline: 3px solid var(--fwm-teal-light); outline-offset: 3px; }
  .fwm-toggle-sign { font-size: 1.1rem; line-height: 1; }

  /* Chevron before cards 2-4: points down while stacked, right in a row */
  .fwm-map > .fwm-card:not(:first-of-type)::before {
    content: ''; position: absolute; left: 50%; top: -0.75rem;
    width: 0.6rem; height: 0.6rem;
    border-right: var(--fwm-line) solid var(--fwm-teal); border-bottom: var(--fwm-line) solid var(--fwm-teal);
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .fwm-panel { background: #fff; border: 1px solid var(--fwm-sand); border-radius: 14px; padding: 1.4rem 1.3rem 1.2rem; margin-top: -0.6rem; }
  /* Tailwind's preflight [hidden] rule loses to any class that sets display */
  .fwm-panel[hidden] { display: none; }
  .fwm-cols { display: flex; flex-direction: column; }

  .fwm-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.6px; color: var(--fwm-teal); margin: 0 0 0.8rem; line-height: 1.5; }
  .fwm-terms { list-style: none; margin: 0 0 1.3rem; padding: 0; display: flex; flex-direction: column; gap: 0.7rem; }
  .fwm-terms li { font-size: 0.98rem; line-height: 1.5; color: var(--fwm-muted); }
  .fwm-terms strong { color: var(--fwm-dark); font-weight: 700; }
  .fwm-steps { list-style: none; margin: 0 0 1.2rem; padding: 0; display: flex; flex-direction: column; gap: 0.8rem; }
  .fwm-step { display: grid; grid-template-columns: 1.75rem 1fr; gap: 0.75rem; align-items: start; }
  .fwm-step-n { display: flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 50%; border: 2px solid var(--fwm-teal); color: var(--fwm-teal); font-size: 0.85rem; font-weight: 700; }
  .fwm-step strong { display: block; font-size: 1rem; color: var(--fwm-dark); line-height: 1.35; }
  .fwm-step-x { display: block; font-size: 0.93rem; line-height: 1.45; color: var(--fwm-muted); }
  .fwm-line { font-size: 1rem; line-height: 1.6; color: var(--fwm-body); margin: 0 0 0.85rem; }
  .fwm-line.is-muted { font-size: 0.95rem; color: var(--fwm-muted); margin-bottom: 0.45rem; }
  .fwm-pills { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0 0 1.1rem; padding: 0; }
  .fwm-pill { background: #fff; border: 1px solid var(--fwm-sand); border-top: 3px solid var(--fwm-teal); border-radius: 8px; padding: 0.35rem 0.75rem; font-size: 0.88rem; font-weight: 600; color: var(--fwm-dark); }
  .fwm-rhythm { display: grid; grid-template-columns: max-content 1fr; gap: 0.6rem 1.1rem; margin: 0 0 1.3rem; }
  .fwm-rhythm dt { font-size: 0.93rem; font-weight: 700; color: var(--fwm-dark); }
  .fwm-rhythm dd { margin: 0; font-size: 0.93rem; line-height: 1.45; color: var(--fwm-muted); }
  .fwm-note { font-size: 0.98rem; line-height: 1.55; color: var(--fwm-muted); margin: 0 0 1rem; }
  .fwm-note strong { color: var(--fwm-dark); }
  .fwm-closer { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.15rem; line-height: 1.5; color: var(--fwm-teal); margin: 0.2rem 0 1rem; }
  .fwm-loopfull { border-top: 1px solid var(--fwm-sand); padding-top: 1rem; margin-top: 0.4rem; }
  .fwm-loopfull .fwm-label { margin-bottom: 0.45rem; }
  .fwm-loopfull-text { margin: 0; font-size: 0.98rem; line-height: 1.6; color: var(--fwm-body); }
  .fwm-terms + .fwm-line { margin-top: -0.5rem; }
  .fwm-link {
    display: inline-flex; align-items: center; min-height: 44px; padding: 0.55rem 1.2rem;
    background: #fff; color: var(--fwm-teal); border: 1px solid var(--fwm-teal); border-radius: 50px;
    font-size: 0.93rem; font-weight: 600; text-decoration: none; transition: background 0.2s, color 0.2s;
  }
  .fwm-link:hover { background: var(--fwm-teal); color: #fff; }

  /* The loop and the seven places */
  .fwm-under { display: flex; flex-direction: column; gap: 1.6rem; }
  .fwm-places { order: 1; }
  .fwm-loop { order: 2; display: flex; flex-direction: column; }
  .fwm-loop-copy { order: 1; }
  .fwm-survey { order: 2; }
  .fwm-places-line { font-size: 1.02rem; font-weight: 700; line-height: 1.45; color: var(--fwm-dark); margin: 0 0 0.75rem; }
  .fwm-loop-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.6px; color: var(--fwm-teal); margin: 0 0 0.35rem; }
  .fwm-loop-text { font-size: 1rem; font-weight: 600; line-height: 1.5; color: var(--fwm-dark); margin: 0; }
  .fwm-survey {
    position: relative; align-self: flex-end; margin-top: 0.9rem;
    background: var(--fwm-accent); border: 2px solid var(--fwm-teal); border-radius: 50px;
    padding: 0.4rem 1rem; font-size: 0.9rem; font-weight: 700; color: var(--fwm-dark); line-height: 1.3;
  }
  /* The loop reads once: while Implement is open its panel ends with the
     full loop text, right above the map's short version */
  .fwm-map.loop-in-panel .fwm-loop-copy { display: none; }

  /* Phone rail: from the survey back up to Discover */
  .fwm-map::after {
    content: ''; position: absolute; right: calc(-1 * var(--fwm-out)); top: 2.2rem; bottom: 1.15rem;
    width: var(--fwm-out);
    border: var(--fwm-line) solid var(--fwm-teal); border-left: none; border-radius: 0 14px 14px 0;
    pointer-events: none;
  }
  .fwm-map::before {
    content: ''; position: absolute; right: -0.05rem; top: 2.2rem; z-index: 1;
    width: 0.6rem; height: 0.6rem;
    border-left: var(--fwm-line) solid var(--fwm-teal); border-bottom: var(--fwm-line) solid var(--fwm-teal);
    transform: translate(0, -50%) translateY(1.5px) rotate(45deg);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    @keyframes fwmIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    .fwm-panel:not([hidden]) { animation: fwmIn 0.25s ease-out; }
  }

  @media ${LAPTOP_QUERY} {
    /* Rows: the cards, the open panel, then the loop and places. Margins, not
       row-gap, space them, so the panel row takes no room while all are closed */
    .fwm-map { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: var(--fwm-gap); row-gap: 0; }
    .fwm-map::before, .fwm-map::after { display: none; }
    .fwm-map > .fwm-card { grid-row: 1; }
    .fwm-map > .fwm-card:nth-of-type(1) { grid-column: 1; }
    .fwm-map > .fwm-card:nth-of-type(2) { grid-column: 2; }
    .fwm-map > .fwm-card:nth-of-type(3) { grid-column: 3; }
    .fwm-map > .fwm-card:nth-of-type(4) { grid-column: 4; }
    .fwm-name { font-size: clamp(1.35rem, 2.1vw, 1.7rem); }
    .fwm-map > .fwm-card:not(:first-of-type)::before {
      left: calc(-1 * var(--fwm-gap) / 2); top: auto; bottom: 4.2rem;
      border-bottom: none; border-top: var(--fwm-line) solid var(--fwm-teal);
      transform: translate(-50%, 50%) rotate(45deg);
    }

    .fwm-under {
      grid-row: 3; grid-column: 1 / -1; position: relative; margin-top: 1.4rem;
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: var(--fwm-gap);
      padding-bottom: 2.6rem;
    }
    .fwm-loop { grid-column: 1 / span 2; order: 0; }
    .fwm-places { grid-column: 3 / span 2; order: 0; }
    .fwm-survey { order: 0; align-self: flex-start; margin: 0; left: calc((100% - var(--fwm-gap)) / 4); transform: translateX(-50%); }
    .fwm-loop-copy { order: 0; margin: 1.5rem 0 0 calc((100% - var(--fwm-gap)) / 4 + 1.6rem); }
    /* Arrowhead under the survey pill, where the loop comes back up */
    .fwm-survey::after {
      content: ''; position: absolute; left: 50%; bottom: -0.95rem;
      width: 0.6rem; height: 0.6rem;
      border-left: var(--fwm-line) solid var(--fwm-teal); border-top: var(--fwm-line) solid var(--fwm-teal);
      transform: translate(-50%, 0) rotate(45deg);
    }
    /* The loop: up from the survey, along the bottom, then up past the places
       and any open panel to card 04. Three pieces, one per row, overlapping
       at the joins: card 04's stub, the open panel's edge, the places' edge. */
    .fwm-under::before {
      content: ''; position: absolute; pointer-events: none;
      left: calc((100% - 3 * var(--fwm-gap)) / 8 - var(--fwm-line) / 2);
      right: calc(-1 * var(--fwm-out)); top: 2.75rem; bottom: 0;
      border: var(--fwm-line) solid var(--fwm-teal); border-top: none; border-radius: 0 0 16px 16px;
    }
    .fwm-under::after {
      content: ''; position: absolute; pointer-events: none;
      right: calc(-1 * var(--fwm-out)); width: var(--fwm-out);
      top: 0; height: 2.75rem;
      border-right: var(--fwm-line) solid var(--fwm-teal);
    }
    .fwm-map > .fwm-card:nth-of-type(4)::after {
      content: ''; position: absolute; pointer-events: none;
      right: calc(-1 * var(--fwm-out)); width: var(--fwm-out);
      top: calc(100% - 4.2rem); bottom: -1.8rem;
      border-top: var(--fwm-line) solid var(--fwm-teal); border-right: var(--fwm-line) solid var(--fwm-teal);
      border-top-right-radius: 16px;
    }
    /* 1px further out: the panel's own border sits inside this box */
    .fwm-map > .fwm-panel::after {
      content: ''; position: absolute; pointer-events: none;
      right: calc(-1 * var(--fwm-out) - 1px); width: var(--fwm-out);
      top: calc(-1.8rem - 1px); bottom: calc(-1.4rem - 1px);
      border-right: var(--fwm-line) solid var(--fwm-teal);
    }

    .fwm-map > .fwm-panel { grid-row: 2; grid-column: 1 / -1; position: relative; margin-top: 1.8rem; padding: 2rem 2.2rem 1.6rem; }
    .fwm-map > section:nth-of-type(1) { --fwm-i: 0; }
    .fwm-map > section:nth-of-type(2) { --fwm-i: 1; }
    .fwm-map > section:nth-of-type(3) { --fwm-i: 2; }
    .fwm-map > section:nth-of-type(4) { --fwm-i: 3; }
    .fwm-panel::before {
      content: ''; position: absolute; top: -9px;
      left: calc(var(--fwm-i) * ((100% - 3 * var(--fwm-gap)) / 4 + var(--fwm-gap)) + (100% - 3 * var(--fwm-gap)) / 8 - 8px);
      width: 16px; height: 16px; background: #fff;
      border-left: 1px solid var(--fwm-sand); border-top: 1px solid var(--fwm-sand);
      transform: rotate(45deg);
    }
    .fwm-cols { display: grid; grid-template-columns: 1fr 1fr; column-gap: 2.6rem; }
  }
`;

const PHASE_IDS = FRAMEWORK_PHASES.map((p) => p.id);
const isLaptop = () => window.matchMedia(LAPTOP_QUERY).matches;
const panelId = (id: FrameworkPhaseId) => `fwm-panel-${id}`;
const nameId = (id: FrameworkPhaseId) => `fwm-name-${id}`;

function phaseFromHash(hash: string): FrameworkPhaseId | null {
  const raw = hash.replace(/^#/, "");
  const id = raw.startsWith(LEGACY_ANCHOR_PREFIX) ? raw.slice(LEGACY_ANCHOR_PREFIX.length) : raw;
  return PHASE_IDS.find((p) => p === id) ?? null;
}

// A laptop holds one open phase; a phone adds it as the most recently opened.
function withPhaseOpen(prev: FrameworkPhaseId[], id: FrameworkPhaseId, laptop: boolean): FrameworkPhaseId[] {
  if (laptop) return prev.length === 1 && prev[0] === id ? prev : [id];
  return prev[prev.length - 1] === id ? prev : [...prev.filter((p) => p !== id), id];
}

function withEmphasis(text: string): ReactNode[] {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

function renderBlock(block: FrameworkBlock, key: number): ReactNode {
  switch (block.t) {
    case "label":
      return <p className="fwm-label" key={key}>{block.x}</p>;
    case "terms":
      return (
        <ul className="fwm-terms" key={key}>
          {block.items.map((item) => (
            <li key={item.term}>
              <strong>{item.term}</strong>
              {item.x ? ` ${item.x}` : null}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="fwm-steps" key={key}>
          {block.items.map((item) => (
            <li className="fwm-step" key={item.n}>
              <span className="fwm-step-n" aria-hidden="true">{item.n}</span>
              <span>
                <strong>{item.term}</strong>
                <span className="fwm-step-x">{item.x}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "line":
      return <p className={"fwm-line" + (block.muted ? " is-muted" : "")} key={key}>{block.x}</p>;
    case "pills":
      return (
        <ul className="fwm-pills" key={key}>
          {block.items.map((item) => <li className="fwm-pill" key={item}>{item}</li>)}
        </ul>
      );
    case "rhythm":
      return (
        <dl className="fwm-rhythm" key={key}>
          {block.rows.map((row) => (
            <Fragment key={row.when}>
              <dt>{row.when}</dt>
              <dd>{row.x}</dd>
            </Fragment>
          ))}
        </dl>
      );
    case "note":
      return <p className="fwm-note" key={key}><strong>{block.strong}</strong> {block.x}</p>;
    case "closer":
      return <p className="fwm-closer" key={key}>{block.x}</p>;
    case "loop":
      return (
        <div className="fwm-loopfull" key={key}>
          <p className="fwm-label">{block.label}</p>
          <p className="fwm-loopfull-text">{withEmphasis(block.x)}</p>
        </div>
      );
    case "link":
      return <Link className="fwm-link" to={block.to} key={key}>{block.label}</Link>;
    default: {
      // A block type added to the data without a renderer fails to compile here.
      const unhandled: never = block;
      return unhandled;
    }
  }
}

function renderBlocks(blocks: FrameworkBlock[] | undefined): ReactNode[] {
  return (blocks ?? []).map((block, i) => renderBlock(block, i));
}

const FrameworkMap = () => {
  // Open phases, oldest first. A laptop holds at most one.
  const [open, setOpen] = useState<FrameworkPhaseId[]>(() => {
    const phase = phaseFromHash(window.location.hash);
    return phase ? [phase] : [];
  });
  // Once a visitor toggles, the address bar follows the open phase.
  const toggled = useRef(false);
  const scrollToPanel = useRef<FrameworkPhaseId | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(LAPTOP_QUERY);
    const onChange = () => {
      if (mql.matches) setOpen((prev) => (prev.length > 1 ? prev.slice(-1) : prev));
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Hash changes after load (back or forward, a plain <a href="#..."> link, an
  // address-bar edit). React Router's location can't be used: it goes stale
  // once a toggle has rewritten the hash with replaceState. A router <Link> to
  // a phase fires no hashchange, so in-page phase links stay plain anchors.
  useEffect(() => {
    const onHashChange = () => {
      const phase = phaseFromHash(window.location.hash);
      if (!phase) return;
      const laptop = isLaptop();
      setOpen((prev) => withPhaseOpen(prev, phase, laptop));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!toggled.current) return;
    const newest = open[open.length - 1];
    const hash = newest ? `#${newest}` : "#framework";
    if (window.location.hash !== hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
    }
  }, [open]);

  // On a laptop the panel opens under the card row, so a card clicked low on
  // the screen can open it below the fold. Bring its top to about a third of
  // the way down.
  useEffect(() => {
    const id = scrollToPanel.current;
    scrollToPanel.current = null;
    const panel = id ? document.getElementById(panelId(id)) : null;
    if (!panel) return;
    const top = panel.getBoundingClientRect().top;
    const viewport = window.innerHeight;
    if (top > (viewport * 2) / 3) {
      window.scrollTo({ top: window.scrollY + top - viewport / 3, behavior: motionSafeScrollBehavior() });
    }
  }, [open]);

  const toggle = (id: FrameworkPhaseId) => {
    toggled.current = true;
    const laptop = isLaptop();
    if (laptop && !open.includes(id)) scrollToPanel.current = id;
    setOpen((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : withPhaseOpen(prev, id, laptop)));
  };

  return (
    <div className="fwm">
      <div className="fwm-eyebrow">{FRAMEWORK_HEADER.eyebrow}</div>
      <h2 className="fwm-title">{FRAMEWORK_HEADER.title}</h2>
      <p className="fwm-sub">{FRAMEWORK_HEADER.sub}</p>
      <p className="fwm-entry">{FRAMEWORK_HEADER.entry}</p>

      <div className={"fwm-map" + (open.includes("implement") ? " loop-in-panel" : "")}>
        {FRAMEWORK_PHASES.map((phase) => {
          const isOpen = open.includes(phase.id);
          const { top, left, right, bottom } = phase.detail;
          return (
            <Fragment key={phase.id}>
              <article id={phase.id} className={"fwm-card" + (isOpen ? " is-open" : "")}>
                <span id={`${LEGACY_ANCHOR_PREFIX}${phase.id}`} className="fwm-anchor" aria-hidden="true" />
                <div className="fwm-num" aria-hidden="true">{phase.num}</div>
                <h3 className="fwm-name" id={nameId(phase.id)}>{phase.name}</h3>
                <p className="fwm-promise">{phase.promise}</p>
                <div className="fwm-youget">
                  <span className="fwm-youget-label">You get</span>
                  <span className="fwm-youget-text">{phase.youGet}</span>
                </div>
                <button
                  type="button"
                  className="fwm-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId(phase.id)}
                  onClick={() => toggle(phase.id)}
                >
                  {isOpen ? "Close" : "More details"}
                  <span className="fwm-sr">{isOpen ? ` ${phase.name}` : ` on ${phase.name}`}</span>
                  <span className="fwm-toggle-sign" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
              </article>
              <section
                id={panelId(phase.id)}
                className="fwm-panel"
                aria-labelledby={nameId(phase.id)}
                hidden={!isOpen}
              >
                {renderBlocks(top)}
                <div className="fwm-cols">
                  <div>{renderBlocks(left)}</div>
                  <div>{renderBlocks(right)}</div>
                </div>
                {renderBlocks(bottom)}
              </section>
            </Fragment>
          );
        })}

        <div className="fwm-under">
          <div className="fwm-loop">
            <span className="fwm-survey">{FRAMEWORK_LOOP.pill}</span>
            <div className="fwm-loop-copy">
              <p className="fwm-loop-label">{FRAMEWORK_LOOP.label}</p>
              <p className="fwm-loop-text">{FRAMEWORK_LOOP.short}</p>
            </div>
          </div>
          <div className="fwm-places">
            <p className="fwm-places-line">{FRAMEWORK_PLACES_LINE}</p>
            <ul className="fwm-pills">
              {FRAMEWORK_PLACES.map((place) => <li className="fwm-pill" key={place}>{place}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkMap;
