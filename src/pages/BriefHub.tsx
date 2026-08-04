import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

/**
 * The chooser at /brief. Both briefs are 90-second single-argument reads, so
 * rather than merge them this page does the sorting and hands the reader the
 * right one in a single tap.
 *
 * /brief used to BE the AI Maestro brief. That content now lives at /brief/ai,
 * so any link already in the wild lands here and is one tap from where it was.
 */

const css = `
  :root {
    --brh-dark: #1E2B3A;
    --brh-caramel: #B5895A;
    --brh-caramel-deep: #9C7144;
    --brh-cream: #FBF8F1;
    --brh-white: #FFFFFF;
    --brh-body: #4A4036;
    --brh-muted: #8A7E70;
    --brh-line: #E7DECF;
  }
  body { margin: 0; }
  .brh-page {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    color: var(--brh-body); background: var(--brh-dark);
    line-height: 1.7; -webkit-font-smoothing: antialiased;
    min-height: 100dvh; display: flex; flex-direction: column;
  }
  .brh-page * { box-sizing: border-box; }
  .brh-wrap { max-width: 940px; margin: 0 auto; padding: 0 2rem; width: 100%; }

  .brh-top {
    position: relative; overflow: hidden;
    padding: 4.5rem 0 2.6rem; text-align: center;
  }
  .brh-top::after {
    content: ''; position: absolute;
    top: -55%; left: 50%; transform: translateX(-50%);
    width: 760px; height: 760px;
    background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 68%);
    pointer-events: none;
  }
  .brh-top .brh-wrap { position: relative; z-index: 1; }
  .brh-kicker {
    display: block; font-size: 0.74rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 2.5px;
    color: var(--brh-caramel); margin-bottom: 1.4rem;
  }
  .brh-creed {
    font-family: 'DM Serif Display', serif; font-weight: 600; color: #fff;
    font-size: clamp(2.1rem, 5vw, 3.4rem); line-height: 1.08;
    max-width: 17ch; margin: 0 auto 1.4rem;
  }
  .brh-sub {
    font-size: 1.1rem; color: rgba(255,255,255,0.75);
    max-width: 560px; margin: 0 auto;
  }

  /* THE CHOICE */
  .brh-choice {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.4rem;
    padding-bottom: 3rem;
  }
  .brh-card {
    display: flex; flex-direction: column;
    background: var(--brh-cream); border-radius: 16px;
    padding: 1.9rem 1.7rem 1.7rem;
    text-decoration: none; color: var(--brh-body);
    border: 1px solid transparent;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .brh-card:hover {
    transform: translateY(-4px);
    border-color: var(--brh-caramel);
    box-shadow: 0 24px 50px -22px rgba(0,0,0,0.55);
  }
  .brh-eyebrow {
    font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.6px; color: var(--brh-caramel); margin-bottom: 0.7rem;
  }
  .brh-card h2 {
    font-family: 'DM Serif Display', serif; font-weight: 600;
    color: var(--brh-dark); font-size: clamp(1.6rem, 3vw, 2.05rem);
    line-height: 1.14; margin: 0 0 0.75rem; max-width: 15ch;
  }
  .brh-card p { font-size: 0.99rem; margin: 0 0 1.2rem; }

  .brh-points { list-style: none; margin: 0 0 1.5rem; padding: 0; }
  .brh-points li {
    font-size: 0.88rem; color: var(--brh-body);
    padding-left: 0.9rem; border-left: 2px solid var(--brh-caramel);
    margin-bottom: 0.55rem; line-height: 1.45;
  }
  .brh-points li:last-child { margin-bottom: 0; }
  .brh-points strong { color: var(--brh-dark); font-weight: 700; }

  .brh-go {
    margin-top: auto; display: flex; align-items: center; gap: 0.5rem;
    font-weight: 700; font-size: 0.98rem; color: var(--brh-caramel-deep);
  }
  .brh-card:hover .brh-go { color: var(--brh-dark); }
  .brh-time {
    display: block; font-size: 0.72rem; font-weight: 600;
    letter-spacing: 1.4px; text-transform: uppercase;
    color: var(--brh-muted); margin-top: 0.4rem;
  }

  .brh-foot {
    margin-top: auto; padding: 1.8rem 0 2.4rem; text-align: center;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .brh-foot p { font-size: 0.86rem; color: rgba(255,255,255,0.5); margin: 0; }
  .brh-foot a { color: var(--brh-caramel); text-decoration: none; }
  .brh-foot a:hover { color: #fff; }

  @media (max-width: 760px) {
    .brh-choice { grid-template-columns: 1fr; }
    .brh-top { padding: 3.2rem 0 2rem; }
  }
`;

const BriefHub = () => {
  usePageMeta({
    title: "The Dreamscope Brief",
    description:
      "Two practices, two 90-second reads. Culture and operations for growing companies, and AI Maestro, where expert work gets trained into AI.",
    noindex: true,
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="brh-page">
      <header className="brh-top">
        <div className="brh-wrap">
          <span className="brh-kicker">Dreamscope · The Brief</span>
          <h1 className="brh-creed">
            Everything works better if people love what they do.
          </h1>
          <p className="brh-sub">
            Two practices come out of that. Pick the one you came for. Each is a
            90-second read.
          </p>
        </div>
      </header>

      <div className="brh-wrap">
        <div className="brh-choice">
          <Link className="brh-card" to="/brief/culture">
            <span className="brh-eyebrow">Culture and operations</span>
            <h2>Your people already know what's broken.</h2>
            <p>
              They know how to fix it too. I surface their answers and turn them
              into how the place actually runs.
            </p>
            <ul className="brh-points">
              <li>
                For companies growing faster than their systems can handle
              </li>
              <li>
                <strong>5 of 7</strong> leadership departures flagged before
                they happened
              </li>
              <li>
                <strong>20 points</strong> of eNPS at a 3,700-person company
              </li>
            </ul>
            <span className="brh-go">Read the culture brief →</span>
            <span className="brh-time">90-second read</span>
          </Link>

          <Link className="brh-card" to="/brief/ai">
            <span className="brh-eyebrow">AI Maestro</span>
            <h2>Months of expert work becomes days.</h2>
            <p>
              I take the expert work that lives in one person's head and train
              AI to do it. I'm an operator, not a developer.
            </p>
            <ul className="brh-points">
              <li>
                For work that only one person in the building can currently do
              </li>
              <li>
                <strong>Five places</strong> expert work reliably compresses
              </li>
              <li>
                <strong>4,056 hours</strong> a year taken out of the work at one
                company
              </li>
            </ul>
            <span className="brh-go">Read the AI Maestro brief →</span>
            <span className="brh-time">90-second read</span>
          </Link>
        </div>
      </div>

      <footer className="brh-foot">
        <div className="brh-wrap">
          <p>
            Not sure which?{" "}
            <a href="mailto:joe@dreamscope.win?subject=The%20Brief%20-%20Let's%20talk">
              joe@dreamscope.win
            </a>{" "}
            · <Link to="/">Dreamscope</Link> · © 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BriefHub;
