import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

/**
 * The culture half of the Brief pair, at /brief/culture. Deliberately built to
 * the same five-section rhythm and the same 90-second budget as BriefAI.tsx,
 * so the two read as siblings. If one grows, grow the other or neither.
 *
 * Every number here traces to Joe's July 2026 culture CV. The 450-person client
 * is never named.
 */

const css = `
  :root {
    --brc-dark: #1E2B3A;
    --brc-caramel: #B5895A;
    --brc-caramel-deep: #9C7144;
    --brc-cream: #FBF8F1;
    --brc-white: #FFFFFF;
    --brc-body: #4A4036;
    --brc-muted: #8A7E70;
    --brc-line: #E7DECF;
  }
  html { scroll-behavior: smooth; scroll-padding-top: 72px; }
  body { margin: 0; }
  .brc-page { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: var(--brc-body); background: var(--brc-cream); line-height: 1.7; -webkit-font-smoothing: antialiased; }
  .brc-page * { box-sizing: border-box; }
  .brc-wrap { max-width: 940px; margin: 0 auto; padding: 0 2rem; }
  .brc-kicker { font-size: 0.74rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2.5px; color: var(--brc-caramel); }

  .brc-hero { background: var(--brc-dark); padding: 4.5rem 0 5rem; position: relative; overflow: hidden; }
  .brc-hero::after { content: ''; position: absolute; top: -45%; right: -10%; width: 620px; height: 620px; background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 70%); border-radius: 50%; }
  .brc-hero .brc-wrap { position: relative; z-index: 1; }
  .brc-hero .brc-kicker { display: block; margin-bottom: 1.4rem; }
  .brc-hero h1 { font-family: 'DM Serif Display', serif; font-weight: 600; color: #fff; font-size: clamp(2.6rem, 6vw, 4.2rem); line-height: 1.05; max-width: 16ch; margin-bottom: 1.6rem; }
  .brc-hero .brc-dek { font-size: 1.15rem; color: rgba(255,255,255,0.8); max-width: 640px; margin-bottom: 2.2rem; }
  .brc-read-time { display: inline-block; font-size: 0.78rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; padding: 0.3rem 0.9rem; margin-bottom: 1.6rem; }
  .brc-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
  .brc-btn { display: inline-block; background: var(--brc-caramel); color: #fff; padding: 0.95rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: background 0.2s, transform 0.2s; }
  .brc-btn:hover { background: var(--brc-caramel-deep); transform: translateY(-1px); }
  .brc-hero .brc-quiet { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
  .brc-hero .brc-quiet a { color: var(--brc-caramel); text-decoration: none; }

  .brc-section { padding: 4rem 0; }
  .brc-section.on-white { background: var(--brc-white); }
  .brc-section.on-cream { background: var(--brc-cream); }
  .brc-section.on-dark { background: var(--brc-dark); color: rgba(255,255,255,0.8); }
  .brc-snum { font-family: 'DM Serif Display', serif; font-size: 1.4rem; font-weight: 600; color: var(--brc-caramel); margin-bottom: 0.5rem; }
  .brc-h2 { font-family: 'DM Serif Display', serif; font-weight: 600; color: var(--brc-dark); font-size: clamp(1.9rem, 4vw, 2.7rem); line-height: 1.12; margin-bottom: 1rem; max-width: 22ch; }
  .on-dark .brc-h2 { color: #fff; }
  .brc-lead { font-size: 1.08rem; max-width: 660px; margin: 0 0 0.5rem; }
  .brc-lead strong { color: var(--brc-dark); font-weight: 600; }
  .on-dark .brc-lead { color: rgba(255,255,255,0.82); }
  .on-dark .brc-lead strong { color: #fff; }
  .brc-pullout { font-family: 'DM Serif Display', serif; font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 500; font-style: italic; color: var(--brc-caramel); max-width: 24ch; line-height: 1.25; margin-top: 2rem; }

  .brc-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2rem; }
  .brc-tile { border: 1px solid var(--brc-line); border-radius: 12px; padding: 1.2rem; background: var(--brc-white); display: flex; flex-direction: column; }
  .brc-tile.hard { border-color: var(--brc-caramel); }
  .brc-tile .tn { font-family: 'DM Serif Display', serif; font-size: 1.25rem; font-weight: 600; color: var(--brc-caramel); line-height: 1; }
  .brc-tile h3 { font-size: 1rem; color: var(--brc-dark); margin: 0.35rem 0 0.4rem; font-weight: 600; }
  .brc-tile p { font-size: 0.86rem; color: var(--brc-body); margin: 0; line-height: 1.45; }
  .brc-tile .tag { margin-top: auto; padding-top: 0.7rem; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 1px; color: var(--brc-caramel); font-weight: 700; }

  .brc-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0 1.2rem; }
  .brc-stat { border-top: 2px solid var(--brc-caramel); padding-top: 1rem; }
  .brc-stat .n { font-family: 'DM Serif Display', serif; font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1; display: block; margin-bottom: 0.4rem; }
  .brc-stat .l { font-size: 0.92rem; color: rgba(255,255,255,0.65); }

  .brc-creds { list-style: none; margin: 1.6rem 0 0; padding: 0; }
  .brc-cred { display: grid; grid-template-columns: 210px 1fr; gap: 1.5rem; padding: 0.9rem 0; border-top: 1px solid var(--brc-line); }
  .brc-cred:last-child { border-bottom: 1px solid var(--brc-line); }
  .brc-cred .role { font-weight: 600; color: var(--brc-dark); font-size: 0.96rem; }
  .brc-cred .role span { display: block; color: var(--brc-caramel); font-weight: 600; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }
  .brc-cred p { font-size: 0.95rem; margin: 0; }

  .brc-cta-band { background: var(--brc-dark); color: #fff; padding: 4rem 0; text-align: center; }
  .brc-cta-band h2 { font-family: 'DM Serif Display', serif; font-weight: 600; font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1rem; color: #fff; }
  .brc-cta-band p { font-size: 1.05rem; color: rgba(255,255,255,0.9); max-width: 540px; margin: 0 auto 2rem; }
  .brc-cta-band .brc-btn-light { display: inline-block; background: var(--brc-caramel); color: #fff; padding: 1rem 2.4rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1.05rem; transition: background 0.2s, transform 0.2s; }
  .brc-cta-band .brc-btn-light:hover { background: var(--brc-caramel-deep); transform: translateY(-1px); }
  .brc-cta-links { margin-top: 1.4rem; font-size: 0.92rem; color: rgba(255,255,255,0.55); }
  .brc-cta-links a { color: var(--brc-caramel); text-decoration: none; }

  .brc-footer { background: var(--brc-dark); padding: 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); }
  .brc-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .brc-footer a { color: var(--brc-caramel); text-decoration: none; }

  @media (max-width: 820px) {
    .brc-grid4 { grid-template-columns: repeat(2, 1fr); }
    .brc-stats { grid-template-columns: 1fr; gap: 1.2rem; }
    .brc-cred { grid-template-columns: 1fr; gap: 0.3rem; }
    .brc-section { padding: 3.25rem 0; }
  }
  @media (max-width: 520px) {
    .brc-grid4 { grid-template-columns: 1fr; }
  }
`;

const BriefCulture = () => {
  usePageMeta({
    title: "The Dreamscope Brief | Culture",
    description:
      "Your people already know what's broken and how to fix it. I surface their answers and turn them into how the place runs. A 90-second read.",
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
    <div className="brc-page">
      {/* HERO */}
      <header className="brc-hero">
        <div className="brc-wrap">
          <span className="brc-kicker">Dreamscope · The Brief</span>
          <h1>Your people already know what's broken.</h1>
          <p className="brc-dek">
            They know how to fix it too. Almost nobody asks them in a way that
            gets a straight answer. I do, and then I turn what they said into
            how the place actually runs.
          </p>
          <span className="brc-read-time">90-second read</span>
          <div className="brc-cta-row">
            <a
              className="brc-btn"
              href="https://discovery.dreamscope.win/culture"
            >
              Take the 15-minute discovery →
            </a>
            <span className="brc-quiet">
              or email{" "}
              <a href="mailto:joe@dreamscope.win?subject=The%20Brief%20-%20Culture">
                joe@dreamscope.win
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* 01 THE IDEA */}
      <section className="brc-section on-white">
        <div className="brc-wrap">
          <div className="brc-snum">01 / The idea</div>
          <h2 className="brc-h2">I don't bring you a culture. I surface yours.</h2>
          <p className="brc-lead">
            You already have one. The only question is whether it got built on
            purpose. Somewhere in your company people are already doing what
            works, and nobody wrote it down. Most culture programs skip that and
            install someone else's values instead.{" "}
            <strong>I start with your people, not a framework.</strong>
          </p>
          <p className="brc-pullout">
            Everything works better if people love what they do.
          </p>
        </div>
      </section>

      {/* 02 THE WORK */}
      <section className="brc-section on-cream">
        <div className="brc-wrap">
          <div className="brc-snum">02 / The work</div>
          <h2 className="brc-h2">Four phases. Start wherever it hurts.</h2>
          <p className="brc-lead">
            You don't need all four. Most engagements start in Discover, because
            you cannot fix what you cannot see.
          </p>
          <div className="brc-grid4">
            <div className="brc-tile">
              <span className="tn">01</span>
              <h3>Inspire</h3>
              <p>
                Vision, mission, values, and what each one means during a shift.
              </p>
            </div>
            <div className="brc-tile hard">
              <span className="tn">02</span>
              <h3>Discover</h3>
              <p>
                Interviews, focus groups, surveys, read together by AI that
                catches what no single source shows.
              </p>
              <span className="tag">Most start here</span>
            </div>
            <div className="brc-tile">
              <span className="tn">03</span>
              <h3>Build</h3>
              <p>
                Middle managers, and training and SOPs built from what your top
                performers already do.
              </p>
            </div>
            <div className="brc-tile">
              <span className="tn">04</span>
              <h3>Implement</h3>
              <p>
                Recognition, meetings, onboarding, reviews. Where culture stops
                being a deck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 PROOF */}
      <section className="brc-section on-dark">
        <div className="brc-wrap">
          <div className="brc-snum">03 / Proof</div>
          <h2 className="brc-h2">Proven on real data, not a slide.</h2>
          <p className="brc-lead">
            I ran the Culture Engine on a 450-person company across 20+
            locations. A year of data, 40 leadership interviews, 290 survey
            responses. The receipts:
          </p>
          <div className="brc-stats">
            <div className="brc-stat">
              <span className="n">5 of 7</span>
              <span className="l">
                leadership departures flagged before they happened, validated in
                a blind retrospective
              </span>
            </div>
            <div className="brc-stat">
              <span className="n">-87%</span>
              <span className="l">
                supervisor sentiment crisis surfaced, invisible to all 40
                interviewed leaders
              </span>
            </div>
            <div className="brc-stat">
              <span className="n">50</span>
              <span className="l">
                working practices pulled from their own top performers and
                mapped to strategic goals
              </span>
            </div>
          </div>
          <p className="brc-lead">
            None of that came from me. It came from their people. My job was to
            make it legible.
          </p>
        </div>
      </section>

      {/* 04 THE HONEST PART */}
      <section className="brc-section on-cream">
        <div className="brc-wrap">
          <div className="brc-snum">04 / The honest part</div>
          <h2 className="brc-h2">Most culture work stops at the poster.</h2>
          <p className="brc-lead">
            Values on a wall change nothing and everyone who works there knows
            it. It only counts once it reaches what people touch every week: how
            they get hired, trained, recognized, reviewed, and run.{" "}
            <strong>I'm an operator, so that is where I take it.</strong> At
            Pizza 4P's that meant 260+ frontline SOPs folded into one backbone
            managers train against.
          </p>
          <p className="brc-pullout">
            Culture you can point at on a wall isn't culture. It's decor.
          </p>
        </div>
      </section>

      {/* 05 THE OPERATOR */}
      <section className="brc-section on-white">
        <div className="brc-wrap">
          <div className="brc-snum">05 / The operator</div>
          <h2 className="brc-h2">Twenty years operating. Nine across Asia.</h2>
          <ul className="brc-creds">
            <li className="brc-cred">
              <div className="role">
                Pizza 4P's<span>Culture &amp; Ops Excellence Director</span>
              </div>
              <p>
                Built Culture and L&amp;D from zero across 40+ locations, 5
                countries, 3,700 employees. eNPS up 20 points, happiness up 18
                to 20%.
              </p>
            </li>
            <li className="brc-cred">
              <div className="role">
                Seller Candy<span>Interim COO</span>
              </div>
              <p>
                Built the operational foundation through 10x team growth and 6x
                revenue.
              </p>
            </li>
            <li className="brc-cred">
              <div className="role">
                Christina's<span>Operations Team Leader</span>
              </div>
              <p>
                Led operations from 3 to 8 cities and 50 to 500+ employees.
                Wrote the employee manual and the full SOP suite.
              </p>
            </li>
            <li className="brc-cred">
              <div className="role">
                Delivering Happiness<span>Certified Coachsultant</span>
              </div>
              <p>
                Corporate culture transformation on the Zappos methodology.
                Engagements with VPBank, Sathapana Bank, and TP Bank.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="brc-cta-band">
        <div className="brc-wrap">
          <h2>The next step is 15 minutes.</h2>
          <p>
            A few questions about what you are actually dealing with. I read
            every one. If it fits, we'll book a call.
          </p>
          <a
            className="brc-btn-light"
            href="https://discovery.dreamscope.win/culture"
          >
            Take the discovery →
          </a>
          <div className="brc-cta-links">
            Email{" "}
            <a href="mailto:joe@dreamscope.win?subject=The%20Brief%20-%20Culture">
              joe@dreamscope.win
            </a>{" "}
            · Here for the AI side?{" "}
            <Link to="/brief/ai">Read the AI Maestro brief</Link> · Prefer
            paper?{" "}
            <a href="/Dreamscope_Brief_Culture.pdf">Download as a PDF</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="brc-footer">
        <p>
          Dreamscope · <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a>{" "}
          · <Link to="/#about">About</Link> · © 2026
        </p>
      </footer>
    </div>
  );
};

export default BriefCulture;
