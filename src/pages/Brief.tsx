import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const css = `
  :root {
    --brf-dark: #1E2B3A;
    --brf-caramel: #B5895A;
    --brf-caramel-deep: #9C7144;
    --brf-cream: #FBF8F1;
    --brf-white: #FFFFFF;
    --brf-body: #4A4036;
    --brf-muted: #8A7E70;
    --brf-line: #E7DECF;
  }
  html { scroll-behavior: smooth; scroll-padding-top: 72px; }
  body { margin: 0; }
  .brf-page { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: var(--brf-body); background: var(--brf-cream); line-height: 1.7; -webkit-font-smoothing: antialiased; }
  .brf-page * { box-sizing: border-box; }
  .brf-wrap { max-width: 940px; margin: 0 auto; padding: 0 2rem; }
  .brf-kicker { font-size: 0.74rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2.5px; color: var(--brf-caramel); }

  .brf-hero { background: var(--brf-dark); padding: 4.5rem 0 5rem; position: relative; overflow: hidden; }
  .brf-hero::after { content: ''; position: absolute; top: -45%; right: -10%; width: 620px; height: 620px; background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 70%); border-radius: 50%; }
  .brf-hero .brf-wrap { position: relative; z-index: 1; }
  .brf-hero .brf-kicker { display: block; margin-bottom: 1.4rem; }
  .brf-hero h1 { font-family: 'DM Serif Display', serif; font-weight: 600; color: #fff; font-size: clamp(2.6rem, 6vw, 4.2rem); line-height: 1.05; max-width: 16ch; margin-bottom: 1.6rem; }
  .brf-hero .brf-dek { font-size: 1.15rem; color: rgba(255,255,255,0.8); max-width: 640px; margin-bottom: 2.2rem; }
  .brf-read-time { display: inline-block; font-size: 0.78rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; padding: 0.3rem 0.9rem; margin-bottom: 1.6rem; }
  .brf-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
  .brf-btn { display: inline-block; background: var(--brf-caramel); color: #fff; padding: 0.95rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: background 0.2s, transform 0.2s; }
  .brf-btn:hover { background: var(--brf-caramel-deep); transform: translateY(-1px); }
  .brf-hero .brf-quiet { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
  .brf-hero .brf-quiet a { color: var(--brf-caramel); text-decoration: none; }

  .brf-section { padding: 4rem 0; }
  .brf-section.on-white { background: var(--brf-white); }
  .brf-section.on-cream { background: var(--brf-cream); }
  .brf-section.on-dark { background: var(--brf-dark); color: rgba(255,255,255,0.8); }
  .brf-snum { font-family: 'DM Serif Display', serif; font-size: 1.4rem; font-weight: 600; color: var(--brf-caramel); margin-bottom: 0.5rem; }
  .brf-h2 { font-family: 'DM Serif Display', serif; font-weight: 600; color: var(--brf-dark); font-size: clamp(1.9rem, 4vw, 2.7rem); line-height: 1.12; margin-bottom: 1rem; max-width: 22ch; }
  .on-dark .brf-h2 { color: #fff; }
  .brf-lead { font-size: 1.08rem; max-width: 660px; margin: 0 0 0.5rem; }
  .brf-lead strong { color: var(--brf-dark); font-weight: 600; }
  .on-dark .brf-lead { color: rgba(255,255,255,0.82); }
  .on-dark .brf-lead strong { color: #fff; }
  .brf-pullout { font-family: 'DM Serif Display', serif; font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 500; font-style: italic; color: var(--brf-caramel); max-width: 24ch; line-height: 1.25; margin-top: 2rem; }

  .brf-figure { margin: 2.2rem 0 0; }
  .brf-figure img { width: 100%; height: auto; display: block; }
  .brf-figcap { font-size: 0.92rem; color: var(--brf-muted); font-style: italic; margin-top: 1rem; }
  .on-dark .brf-figcap { color: rgba(255,255,255,0.6); }

  .brf-grid5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 2rem; }
  .brf-tile { border: 1px solid var(--brf-line); border-radius: 12px; padding: 1.1rem; background: var(--brf-white); display: flex; flex-direction: column; }
  .brf-tile.hard { border-color: var(--brf-caramel); }
  .brf-tile .tn { font-family: 'DM Serif Display', serif; font-size: 1.25rem; font-weight: 600; color: var(--brf-caramel); line-height: 1; }
  .brf-tile h3 { font-size: 0.96rem; color: var(--brf-dark); margin: 0.35rem 0 0.4rem; font-weight: 600; }
  .brf-tile p { font-size: 0.84rem; color: var(--brf-body); margin: 0; line-height: 1.45; }
  .brf-tile .tag { margin-top: auto; padding-top: 0.6rem; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 1px; color: var(--brf-caramel); font-weight: 700; }

  .brf-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0 1.2rem; }
  .brf-stat { border-top: 2px solid var(--brf-caramel); padding-top: 1rem; }
  .brf-stat .n { font-family: 'DM Serif Display', serif; font-size: 2.4rem; font-weight: 600; color: #fff; line-height: 1; display: block; margin-bottom: 0.4rem; }
  .brf-stat .l { font-size: 0.92rem; color: rgba(255,255,255,0.65); }

  .brf-creds { list-style: none; margin: 1.6rem 0 0; padding: 0; }
  .brf-cred { display: grid; grid-template-columns: 210px 1fr; gap: 1.5rem; padding: 0.9rem 0; border-top: 1px solid var(--brf-line); }
  .brf-cred:last-child { border-bottom: 1px solid var(--brf-line); }
  .brf-cred .role { font-weight: 600; color: var(--brf-dark); font-size: 0.96rem; }
  .brf-cred .role span { display: block; color: var(--brf-caramel); font-weight: 600; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }
  .brf-cred p { font-size: 0.95rem; margin: 0; }

  .brf-demo { background: var(--brf-caramel); padding: 4rem 0; }
  .brf-demo .brf-snum { color: rgba(255,255,255,0.85); }
  .brf-demo h2 { font-family: 'DM Serif Display', serif; font-weight: 600; color: #fff; font-size: clamp(1.9rem, 4vw, 2.6rem); line-height: 1.12; margin-bottom: 1rem; max-width: 22ch; }
  .brf-demo p { color: rgba(255,255,255,0.92); font-size: 1.05rem; max-width: 680px; margin: 0; }
  .brf-demo p strong { color: #fff; }

  .brf-cta-band { background: var(--brf-dark); color: #fff; padding: 4rem 0; text-align: center; }
  .brf-cta-band h2 { font-family: 'DM Serif Display', serif; font-weight: 600; font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1rem; color: #fff; }
  .brf-cta-band p { font-size: 1.05rem; color: rgba(255,255,255,0.9); max-width: 540px; margin: 0 auto 2rem; }
  .brf-cta-band .brf-btn-light { display: inline-block; background: var(--brf-caramel); color: #fff; padding: 1rem 2.4rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1.05rem; transition: background 0.2s, transform 0.2s; }
  .brf-cta-band .brf-btn-light:hover { background: var(--brf-caramel-deep); transform: translateY(-1px); }
  .brf-cta-links { margin-top: 1.4rem; font-size: 0.92rem; color: rgba(255,255,255,0.55); }
  .brf-cta-links a { color: var(--brf-caramel); text-decoration: none; }

  .brf-footer { background: var(--brf-dark); padding: 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); }
  .brf-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .brf-footer a { color: var(--brf-caramel); text-decoration: none; }

  @media (max-width: 820px) {
    .brf-grid5 { grid-template-columns: repeat(2, 1fr); }
    .brf-stats { grid-template-columns: 1fr; gap: 1.2rem; }
    .brf-cred { grid-template-columns: 1fr; gap: 0.3rem; }
    .brf-section { padding: 3.25rem 0; }
  }
  @media (max-width: 520px) {
    .brf-grid5 { grid-template-columns: 1fr; }
  }
`;

const Brief = () => {
  usePageMeta({
    title: "The Dreamscope Brief",
    description:
      "An end-to-end culture practice and AI Maestro, where expert work gets trained into AI. 20+ years operating, based in Ho Chi Minh City, working anywhere.",
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
    <div className="brf-page">
      {/* HERO */}
      <header className="brf-hero">
        <div className="brf-wrap">
          <span className="brf-kicker">Dreamscope · The Brief</span>
          <h1>Months of expert work becomes days.</h1>
          <p className="brf-dek">
            I'm an operator, not a developer. I take the expert work that lives
            in one person's head and train AI to do it. Here's the whole idea,
            mostly in pictures.
          </p>
          <span className="brf-read-time">90-second read</span>
          <div className="brf-cta-row">
            <a className="brf-btn" href="https://discovery.dreamscope.win/ai_maestro">
              Take the 15-minute discovery →
            </a>
            <span className="brf-quiet">
              or email{" "}
              <a href="mailto:joe@dreamscope.win?subject=The%20Brief%20-%20Let's%20talk">
                joe@dreamscope.win
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* 01 THE IDEA */}
      <section className="brf-section on-white">
        <div className="brf-wrap">
          <div className="brf-snum">01 / The idea</div>
          <h2 className="brf-h2">I train AI on the judgment, not just the task.</h2>
          <p className="brf-lead">
            AI doesn't fail because the model is weak. It fails because no one
            taught it the judgment the work needs.{" "}
            <strong>Tech teams build tools. I build judgment.</strong>
          </p>
          <div className="brf-figure">
            <img
              src="/brief-diagram-1-pattern.svg"
              alt="My expert judgment is trained into AI, which then produces expert work in days, not months."
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <p className="brf-figcap">
              The expert is multiplied, not replaced. Work that used to take
              months takes days.
            </p>
          </div>
        </div>
      </section>

      {/* 02 WHERE IT PLAYS */}
      <section className="brf-section on-cream">
        <div className="brf-wrap">
          <div className="brf-snum">02 / Where it plays</div>
          <h2 className="brf-h2">Five places expert work compresses.</h2>
          <p className="brf-lead">Most engagements are one of these five.</p>
          <div className="brf-grid5">
            <div className="brf-tile">
              <span className="tn">01</span>
              <h3>Process compression</h3>
              <p>Map a process end to end, then train AI on the steps that carry real judgment.</p>
            </div>
            <div className="brf-tile">
              <span className="tn">02</span>
              <h3>Reporting and insight</h3>
              <p>The data exists, the report doesn't. AI builds it and flags what's off.</p>
            </div>
            <div className="brf-tile">
              <span className="tn">03</span>
              <h3>The company brain</h3>
              <p>Feed it everything. It answers any question with full context.</p>
            </div>
            <div className="brf-tile">
              <span className="tn">04</span>
              <h3>Knowledge consolidation</h3>
              <p>Scattered tribal knowledge becomes structured, searchable, validated.</p>
            </div>
            <div className="brf-tile hard">
              <span className="tn">05</span>
              <h3>Customer-facing intelligence</h3>
              <p>Inbound, routing, recommendations, demand sensing.</p>
              <span className="tag">Hardest · data-gated</span>
            </div>
          </div>
        </div>
      </section>

      {/* 03 PROOF */}
      <section className="brf-section on-dark">
        <div className="brf-wrap">
          <div className="brf-snum">03 / Proof</div>
          <h2 className="brf-h2">Proven on real data, not a slide.</h2>
          <p className="brf-lead">
            I've done this work by hand at company after company for 20+ years,
            and built parts of the AI version at another. The Culture Engine is
            the whole system, end to end. I ran it on a 450-person company: a
            year of data, 40 leadership interviews, 290 survey responses. The
            receipts:
          </p>
          <div className="brf-stats">
            <div className="brf-stat">
              <span className="n">5 for 5</span>
              <span className="l">flight-risk flags validated in a blind retrospective, all 5 among the 7 real departures</span>
            </div>
            <div className="brf-stat">
              <span className="n">-87%</span>
              <span className="l">supervisor sentiment crisis caught, invisible to all 40 interviewed leaders</span>
            </div>
            <div className="brf-stat">
              <span className="n">161</span>
              <span className="l">working practices documented from their own top performers</span>
            </div>
          </div>
          <p className="brf-lead">Work that took an expert months now takes days.</p>
        </div>
      </section>

      {/* 04 HOW IT'S BUILT */}
      <section className="brf-section on-cream">
        <div className="brf-wrap">
          <div className="brf-snum">04 / How it's built</div>
          <h2 className="brf-h2">AI gets things wrong. The loop is the fix.</h2>
          <p className="brf-lead">
            Anyone selling you AI that never makes mistakes is lying. The fix is
            a correction loop you run like coaching a sharp new hire, week after
            week.
          </p>
          <div className="brf-figure">
            <img
              src="/brief-diagram-3-loop.svg"
              alt="A loop: AI does the work, I say what's wrong in plain words, it's versioned and past cases re-run, it flags its own uncertainty. Every cycle makes it sharper."
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <p className="brf-pullout">The decisions stay yours. The grind doesn't.</p>
          </div>
        </div>
      </section>

      {/* 05 THE OPERATOR */}
      <section className="brf-section on-white">
        <div className="brf-wrap">
          <div className="brf-snum">05 / The operator</div>
          <h2 className="brf-h2">Twenty years operating. Nine across Asia.</h2>
          <ul className="brf-creds">
            <li className="brf-cred">
              <div className="role">
                Pizza 4P's<span>Culture &amp; Ops Excellence Director</span>
              </div>
              <p>40+ locations, 5 countries, 3,700 employees. 260+ SOPs into one backbone. eNPS up 20 points.</p>
            </li>
            <li className="brf-cred">
              <div className="role">
                Seller Candy<span>Interim COO</span>
              </div>
              <p>Built the operational foundation through 7-to-70 headcount and 6x revenue.</p>
            </li>
            <li className="brf-cred">
              <div className="role">
                Dreamplex<span>Director of Central Operations</span>
              </div>
              <p>Full operations stack and BPM automation. Roughly 4,056 hours a year taken out of the work.</p>
            </li>
            <li className="brf-cred">
              <div className="role">
                Dreamscope<span>The Culture Engine</span>
              </div>
              <p>Trained AI to do expert work that used to take months. Now it takes days.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="brf-cta-band">
        <div className="brf-wrap">
          <h2>The next step is 15 minutes.</h2>
          <p>
            Five categories, one priority pick, three free-text questions. I
            read every one. If your problem fits, we'll book a call.
          </p>
          <a className="brf-btn-light" href="https://discovery.dreamscope.win/ai_maestro">
            Take the discovery →
          </a>
          <div className="brf-cta-links">
            Email{" "}
            <a href="mailto:joe@dreamscope.win?subject=The%20Brief%20-%20Let's%20talk">
              joe@dreamscope.win
            </a>{" "}
            · Prefer paper?{" "}
            <a href="/Dreamscope_Brief.pdf">Download as a PDF</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="brf-footer">
        <p>
          Dreamscope · <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a> ·{" "}
          <Link to="/#about">About</Link> · © 2026
        </p>
      </footer>
    </div>
  );
};

export default Brief;
