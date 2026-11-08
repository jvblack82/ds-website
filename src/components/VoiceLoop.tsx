import { useLayoutEffect, useRef, type CSSProperties } from "react";

// The Voice Engine loop (/culture-engine), from Joe's 6 Nov whiteboard:
// three inputs feed the engine, the engine gives two outputs, the To Do list
// becomes action, and the loop runs back to all three inputs.
//
// One DOM in reading order, laid out two ways. From LAPTOP_MIN_WIDTH up, the
// nodes sit on a fixed-aspect stage drawn on a STAGE_W x STAGE_H grid (each
// node's --x/--y/--w/--h), text sized in container-query units so the whole
// diagram scales as one, and an aria-hidden SVG on the same viewBox draws the
// lines. Under it the same nodes stack, with small aria-hidden arrows.
//
// Animation: "vl-armed" (hidden start state) is set before paint only when
// motion is allowed and IntersectionObserver exists; "vl-play" is set once
// the figure scrolls into view. Without either class the finished state shows.
const LAPTOP_MIN_WIDTH = 900;
const STAGE_W = 1100;
const STAGE_H = 490;

type Box = { x: number; y: number; w: number; h: number };
const pos = (b: Box, d: number): CSSProperties =>
  ({ "--x": b.x, "--y": b.y, "--w": b.w, "--h": b.h, "--d": `${d}s` }) as CSSProperties;
const delay = (d: number, t?: number): CSSProperties =>
  ({ "--d": `${d}s`, ...(t ? { "--t": `${t}s` } : {}) }) as CSSProperties;

const INPUTS = [
  { name: "eNPS survey", cadence: "every quarter", box: { x: 60, y: 40, w: 240, h: 84 }, d: 0 },
  { name: "Leadership interviews", cadence: "every year", box: { x: 60, y: 178, w: 240, h: 84 }, d: 0.12 },
  { name: "Focus groups", cadence: "every year", box: { x: 60, y: 316, w: 240, h: 84 }, d: 0.24 },
];
const ENGINE: Box = { x: 384, y: 140, w: 240, h: 160 };
const BEFORE: Box = { x: 384, y: 92, w: 240, h: 36 };
const NOW: Box = { x: 384, y: 312, w: 240, h: 48 };
const OUTPUTS = [
  { name: "What matters most", note: "20 indicators of workplace satisfaction, ranked", box: { x: 704, y: 80, w: 220, h: 100 } },
  { name: "The To Do list", note: "fixes your own people suggested", box: { x: 704, y: 260, w: 220, h: 100 } },
];
const ACTION: Box = { x: 964, y: 260, w: 116, h: 100 };
const LOOP_LABEL: Box = { x: 368, y: 432, w: 310, h: 36 };

// Rightward arrowhead whose tip sits at (x, y).
const head = (x: number, y: number) => `M${x - 8} ${y - 5.5} L${x} ${y} L${x - 8} ${y + 5.5} Z`;

const css = `
  .vl {
    --vl-dark: #1E2B3A;
    --vl-teal: #0C7C8A;
    /* Text set straight on --vl-bg: the site teal is only 4.4:1 there */
    --vl-teal-text: #0A6B77;
    --vl-bg: #E8F4F5;
    --vl-line: #8FA9AD;
    --vl-card-line: #CFE3E6;
    --vl-muted: #5F6B6E;
    background: var(--vl-bg);
    padding: 5rem 2rem;
    overflow-x: clip;
    font-family: 'DM Sans', sans-serif;
  }
  .vl * { box-sizing: border-box; }
  .vl-inner { max-width: 1100px; margin: 0 auto; }
  .vl-kicker {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
    color: var(--vl-teal-text); margin: 0 0 1rem;
  }
  .vl-title {
    font-family: 'DM Serif Display', serif; font-weight: 400;
    font-size: clamp(1.8rem, 3.5vw, 2.5rem); line-height: 1.2;
    color: var(--vl-dark); margin: 0;
  }
  .vl-fig { margin: 2.25rem 0 0; }
  .vl-sr {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }
  .vl-list { list-style: none; margin: 0; padding: 0; }
  .vl-node strong { display: block; font-weight: 700; color: inherit; }

  /* ---------- Phone first: one stacked column ---------- */
  .vl-stage { position: relative; display: flex; flex-direction: column; gap: 0.55rem; }
  .vl-lines { display: none; }
  .vl-inputs { display: grid; gap: 0.5rem; }
  .vl-in {
    background: #fff; border: 1px solid var(--vl-card-line); border-radius: 10px;
    padding: 0.75rem 1rem; color: var(--vl-dark);
    display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem;
  }
  .vl-in strong { font-size: 1rem; }
  .vl-in span { font-size: 0.88rem; color: var(--vl-muted); white-space: nowrap; }
  .vl-engine {
    background: var(--vl-dark); color: #fff; border-radius: 14px;
    padding: 1.3rem 1.25rem; text-align: center;
  }
  .vl-engine strong { font-family: 'DM Serif Display', serif; font-weight: 400; font-size: 1.55rem; line-height: 1.2; }
  .vl-engine span { display: block; margin-top: 0.3rem; font-size: 0.95rem; color: rgba(255,255,255,0.8); }
  .vl-before, .vl-now { margin: 0; text-align: center; }
  .vl-before { font-size: 0.98rem; color: var(--vl-muted); }
  .vl-before s { text-decoration: none; position: relative; display: inline-block; }
  .vl-before s::after {
    content: ''; position: absolute; left: -2px; right: -2px; top: 52%; height: 0;
    /* A border, not a background, so the strike prints and survives forced colors */
    border-top: 2px solid currentColor; transform-origin: left center;
  }
  /* Shrink to the text so the armed scale(1.3) stays inside the gutter */
  .vl-now { align-self: center; font-size: 1.6rem; line-height: 1.2; font-weight: 700; color: var(--vl-teal-text); }
  .vl-outputs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
  .vl-out {
    background: #fff; border: 2px solid var(--vl-dark); border-radius: 12px;
    padding: 0.85rem 0.9rem; color: var(--vl-dark); text-align: center;
  }
  .vl-out strong { font-size: 1rem; line-height: 1.3; }
  .vl-out span { display: block; margin-top: 0.25rem; font-size: 0.85rem; line-height: 1.4; color: var(--vl-muted); }
  .vl-action {
    margin: 0; background: var(--vl-teal); color: #fff; border-radius: 12px;
    padding: 0.85rem 0.9rem; text-align: center; font-size: 1rem; line-height: 1.35;
    align-self: flex-end; width: calc(50% - 0.3rem);
  }
  .vl-loop {
    margin: 0.4rem 0 0; display: flex; align-items: center; gap: 0.7rem;
    color: var(--vl-teal-text); font-weight: 700; font-size: 1.12rem;
  }
  .vl-loop svg { flex: none; width: 46px; height: 40px; }
  /* Phone arrows */
  .vl-ph { display: block; height: 22px; position: relative; }
  .vl-ph::before {
    content: ''; position: absolute; left: 50%; top: 0; bottom: 3px; width: 2px;
    margin-left: -1px; background: var(--vl-line);
  }
  .vl-ph::after {
    content: ''; position: absolute; left: 50%; bottom: 2px; width: 9px; height: 9px;
    border-right: 2px solid var(--vl-line); border-bottom: 2px solid var(--vl-line);
    transform: translateX(-50%) rotate(45deg);
  }
  .vl-ph-half { align-self: flex-end; width: calc(50% - 0.3rem); }

  /* ---------- Laptop: the drawn diagram ---------- */
  @media (min-width: ${LAPTOP_MIN_WIDTH}px) {
    .vl-stage {
      display: block; aspect-ratio: ${STAGE_W} / ${STAGE_H};
      container-type: inline-size;
    }
    .vl-ph, .vl-loop svg { display: none; }
    .vl-lines { display: block; position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .vl-node, .vl-before, .vl-now, .vl-loop {
      position: absolute; margin: 0;
      left: calc(var(--x) * 100% / ${STAGE_W}); top: calc(var(--y) * 100% / ${STAGE_H});
      width: calc(var(--w) * 100% / ${STAGE_W}); height: calc(var(--h) * 100% / ${STAGE_H});
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center;
    }
    .vl-in { padding: 0 1cqw; border-radius: 1.1cqw; gap: 0.3cqw; }
    .vl-in strong { font-size: 1.68cqw; line-height: 1.25; white-space: nowrap; }
    .vl-in span { font-size: max(0.8rem, 1.36cqw); }
    .vl-engine { padding: 0 1.4cqw; border-radius: 1.5cqw; }
    .vl-engine strong { font-size: 2.3cqw; white-space: nowrap; }
    .vl-engine span { font-size: max(0.8rem, 1.36cqw); line-height: 1.45; margin-top: 0.6cqw; }
    .vl-before { font-size: max(0.8rem, 1.55cqw); }
    .vl-now { font-size: 2.73cqw; }
    .vl-out { padding: 0 1.4cqw; border-radius: 1.1cqw; }
    .vl-out strong { font-size: 1.73cqw; }
    .vl-out span { font-size: max(0.78rem, 1.32cqw); margin-top: 0.4cqw; }
    .vl-action { padding: 0 0.8cqw; border-radius: 1.1cqw; font-size: 1.64cqw; line-height: 1.3; }
    .vl-loop { background: var(--vl-bg); font-size: max(0.9rem, 1.64cqw); white-space: nowrap; }
  }

  .vl-path { fill: none; stroke: var(--vl-line); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .vl-path.vl-teal { stroke: var(--vl-teal); stroke-width: 2.5; }
  .vl-head { fill: var(--vl-line); }
  .vl-head.vl-teal { fill: var(--vl-teal); }

  /* ---------- The play-in ---------- */
  .vl-armed .vl-anim { opacity: 0; transform: translateY(8px); }
  .vl-armed .vl-in.vl-anim { transform: translateX(-12px); }
  .vl-armed .vl-now.vl-anim { transform: scale(1.3); }
  .vl-armed .vl-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
  .vl-armed .vl-head { opacity: 0; }
  .vl-armed .vl-before s::after { transform: scaleX(0); }

  .vl-armed.vl-play .vl-anim {
    opacity: 1; transform: none;
    transition: opacity 0.5s ease-out var(--d, 0s), transform 0.5s ease-out var(--d, 0s);
  }
  .vl-armed.vl-play .vl-now.vl-anim {
    transition: opacity 0.18s ease-out var(--d), transform 0.3s cubic-bezier(0.2, 1.5, 0.4, 1) var(--d);
  }
  .vl-armed.vl-play .vl-draw {
    stroke-dashoffset: 0; transition: stroke-dashoffset var(--t, 0.35s) ease-in-out var(--d, 0s);
  }
  .vl-armed.vl-play .vl-head { opacity: 1; transition: opacity 0.2s ease-out var(--d, 0s); }
  .vl-armed.vl-play .vl-before s::after { transform: scaleX(1); transition: transform 0.35s ease-in-out calc(var(--d, 0s) + 0.4s); }

  @media (prefers-reduced-motion: reduce) {
    .vl-armed .vl-anim, .vl-armed .vl-head { opacity: 1 !important; transform: none !important; transition: none !important; }
    .vl-armed .vl-draw { stroke-dashoffset: 0 !important; transition: none !important; }
    .vl-armed .vl-before s::after { transform: none !important; transition: none !important; }
  }
  @media print {
    .vl-armed .vl-anim, .vl-armed .vl-head { opacity: 1 !important; transform: none !important; }
    .vl-armed .vl-draw { stroke-dashoffset: 0 !important; }
    .vl-armed .vl-before s::after { transform: none !important; }
  }
  @media (max-width: 600px) {
    .vl { padding: 3.5rem 1.5rem; }
  }
`;

const VoiceLoop = () => {
  const rootRef = useRef<HTMLElement>(null);
  const figRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const fig = figRef.current;
    if (!root || !fig) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;
    root.classList.add("vl-armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          root.classList.add("vl-play");
          io.disconnect();
        }
      },
      // Fire when the figure's top crosses 60% of the viewport. A ratio
      // threshold would never be reached by a stacked figure taller than the
      // screen (400% zoom, large text), leaving the diagram hidden.
      { threshold: 0, rootMargin: "0px 0px -40% 0px" },
    );
    io.observe(fig);
    return () => {
      io.disconnect();
      root.classList.remove("vl-armed", "vl-play");
    };
  }, []);

  return (
    <section className="vl" id="voice-engine" ref={rootRef} aria-labelledby="vl-title">
      <div className="vl-inner">
        <p className="vl-kicker">The Voice Engine</p>
        <h2 className="vl-title" id="vl-title">
          Your people already wrote the fix.
        </h2>
        <figure
          className="vl-fig"
          ref={figRef}
          aria-label="The Voice Engine loop: three inputs feed the Voice Engine, it gives two outputs, the To Do list becomes action mapped to goals, and the loop repeats back to all three inputs."
        >
          <div className="vl-stage">
            <svg
              className="vl-lines"
              viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
              aria-hidden="true"
              focusable="false"
            >
              {/* Inputs merge into the engine */}
              <path className="vl-path vl-draw" pathLength={1} style={delay(0.3)} d="M300 82 H340" />
              <path className="vl-path vl-draw" pathLength={1} style={delay(0.42)} d="M300 220 H340" />
              <path className="vl-path vl-draw" pathLength={1} style={delay(0.54)} d="M300 358 H340" />
              <path className="vl-path vl-draw" pathLength={1} style={delay(0.55, 0.3)} d="M340 82 V358" />
              <path className="vl-path vl-draw" pathLength={1} style={delay(0.7, 0.2)} d="M340 220 H377" />
              <path className="vl-head vl-anim" style={delay(0.85)} d={head(384, 220)} />
              {/* Engine splits to the two outputs */}
              <path className="vl-path vl-draw" pathLength={1} style={delay(2.0, 0.15)} d="M624 220 H664" />
              <path className="vl-path vl-draw" pathLength={1} style={delay(2.1, 0.2)} d="M664 130 V310" />
              <path className="vl-path vl-draw" pathLength={1} style={delay(2.2, 0.15)} d="M664 130 H697" />
              <path className="vl-path vl-draw" pathLength={1} style={delay(2.2, 0.15)} d="M664 310 H697" />
              <path className="vl-head vl-anim" style={delay(2.3)} d={head(704, 130)} />
              <path className="vl-head vl-anim" style={delay(2.3)} d={head(704, 310)} />
              {/* Only the To Do list flows to action */}
              <path className="vl-path vl-draw" pathLength={1} style={delay(2.55, 0.2)} d="M924 310 H957" />
              <path className="vl-head vl-anim" style={delay(2.7)} d={head(964, 310)} />
              {/* The loop: from action back to all three inputs */}
              <path
                className="vl-path vl-teal vl-draw"
                pathLength={1}
                style={delay(3.0, 0.8)}
                d="M1022 360 V436 Q1022 450 1008 450 H38 Q24 450 24 436 V96 Q24 82 38 82 H53"
              />
              <path className="vl-path vl-teal vl-draw" pathLength={1} style={delay(3.65, 0.15)} d="M24 220 H53" />
              <path className="vl-path vl-teal vl-draw" pathLength={1} style={delay(3.55, 0.15)} d="M24 358 H53" />
              <path className="vl-head vl-teal vl-anim" style={delay(3.75)} d={head(60, 82)} />
              <path className="vl-head vl-teal vl-anim" style={delay(3.75)} d={head(60, 220)} />
              <path className="vl-head vl-teal vl-anim" style={delay(3.7)} d={head(60, 358)} />
            </svg>

            <ul className="vl-list vl-inputs">
              {INPUTS.map((i) => (
                <li key={i.name} className="vl-node vl-in vl-anim" style={pos(i.box, i.d)}>
                  <strong>{i.name}</strong>
                  <span>{i.cadence}</span>
                </li>
              ))}
            </ul>
            <span className="vl-ph vl-anim" style={delay(0.6)} aria-hidden="true" />

            <div className="vl-node vl-engine vl-anim" style={pos(ENGINE, 0.8)}>
              <strong>The Voice Engine</strong>
              <span>reads every answer, in any language</span>
            </div>
            <p className="vl-before vl-anim" style={pos(BEFORE, 0.9)}>
              <span className="vl-sr">Before: </span>
              <s>By hand: 2 to 3 months</s>
            </p>
            <p className="vl-now vl-anim" style={pos(NOW, 1.65)}>
              Now: 2 days
            </p>
            <span className="vl-ph vl-anim" style={delay(2.0)} aria-hidden="true" />

            <ul className="vl-list vl-outputs">
              {OUTPUTS.map((o) => (
                <li key={o.name} className="vl-node vl-out vl-anim" style={pos(o.box, 2.25)}>
                  <strong>{o.name}</strong>
                  <span>{o.note}</span>
                </li>
              ))}
            </ul>
            <span className="vl-ph vl-ph-half vl-anim" style={delay(2.55)} aria-hidden="true" />

            <p className="vl-node vl-action vl-anim" style={pos(ACTION, 2.75)}>
              <strong>Action,</strong>
              mapped to goals
            </p>

            <p className="vl-loop vl-anim" style={pos(LOOP_LABEL, 3.4)}>
              <svg viewBox="0 0 46 40" aria-hidden="true" focusable="false">
                <path
                  className="vl-path vl-teal"
                  d="M38 3 V22 Q38 34 26 34 H20 Q8 34 8 22 V7"
                />
                <path className="vl-head vl-teal" d="M2.5 11 L8 3 L13.5 11 Z" />
              </svg>
              <span>Repeat, and see what moved</span>
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default VoiceLoop;
