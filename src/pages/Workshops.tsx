import { useEffect } from "react";
import { Link } from "react-router-dom";
import handsOnPhoto from "@/assets/workshops-hands-on.jpg";
import { usePageMeta } from "@/hooks/usePageMeta";

const css = `
  :root {
    --ws-dark: #1E2B3A;
    --ws-caramel: #B5895A;
    --ws-caramel-deep: #9C7144;
    --ws-cream: #FBF8F1;
    --ws-white: #FFFFFF;
    --ws-body: #4A4036;
    --ws-muted: #8A7E70;
    --ws-line: #E7DECF;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .ws-page {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--ws-body);
    background: var(--ws-cream);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  .ws-page * { box-sizing: border-box; }

  .ws-wrap { max-width: 1080px; margin: 0 auto; padding: 0 2rem; }

  .ws-kicker {
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--ws-caramel);
  }

  /* HERO */
  .ws-hero {
    background: var(--ws-dark);
    padding: 5rem 0 3.5rem;
    position: relative;
    overflow: hidden;
  }
  .ws-hero::after {
    content: '';
    position: absolute;
    top: -45%; right: -10%;
    width: 620px; height: 620px;
    background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 70%);
    border-radius: 50%;
  }
  .ws-hero .ws-wrap { position: relative; z-index: 1; }
  .ws-hero .ws-kicker { display: block; margin-bottom: 1.4rem; }
  .ws-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: #fff;
    font-size: clamp(2.8rem, 6vw, 4.6rem);
    line-height: 1.05;
    margin-bottom: 1.6rem;
  }
  .ws-hero .ws-dek {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.78);
    max-width: 640px;
    margin-bottom: 1.8rem;
  }
  .ws-hero-line {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
    color: #fff;
    margin-bottom: 2.2rem;
  }
  .ws-hero-line span { color: var(--ws-caramel); }
  .ws-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
  .ws-btn {
    display: inline-block;
    background: var(--ws-caramel);
    color: #fff;
    padding: 0.95rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s, transform 0.2s;
  }
  .ws-btn:hover { background: var(--ws-caramel-deep); transform: translateY(-1px); }
  .ws-link {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.98rem;
    border-bottom: 1px solid var(--ws-caramel);
    padding-bottom: 2px;
  }
  .ws-link:hover { color: var(--ws-caramel); }
  .ws-proof {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-top: 3.2rem;
    padding-top: 2.6rem;
    border-top: 1px solid rgba(255,255,255,0.12);
  }
  .ws-proof .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.3rem;
    font-weight: 600;
    line-height: 1;
    color: #fff;
  }
  .ws-proof .num.accent { color: var(--ws-caramel); }
  .ws-proof .lab { font-size: 0.82rem; line-height: 1.45; color: rgba(255,255,255,0.6); margin-top: 0.6rem; max-width: 24ch; }

  /* SECTIONS */
  .ws-section { padding: 5.5rem 0; }
  .ws-section.on-white { background: var(--ws-white); }
  .ws-section.on-cream { background: var(--ws-cream); }
  .ws-section.on-dark { background: var(--ws-dark); color: rgba(255,255,255,0.8); }

  .ws-snum {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--ws-caramel);
    margin-bottom: 0.6rem;
  }
  .ws-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: var(--ws-dark);
    font-size: clamp(2rem, 4vw, 2.9rem);
    line-height: 1.12;
    margin-bottom: 1.4rem;
    max-width: 20ch;
  }
  .ws-lead { font-size: 1.12rem; max-width: 660px; margin-bottom: 1.2rem; }
  .ws-note {
    margin-top: 2rem;
    font-size: 0.92rem;
    font-style: italic;
    color: var(--ws-muted);
    max-width: 660px;
  }
  .ws-note strong { color: var(--ws-body); font-weight: 600; font-style: normal; }
  .ws-note a { color: var(--ws-caramel-deep); font-weight: 600; text-decoration: none; border-bottom: 1px solid var(--ws-caramel); }
  .ws-note a:hover { color: var(--ws-caramel); }

  /* STEPLINE */
  .ws-stepline { margin: 2.2rem 0 0.5rem; }
  .ws-stepline svg { display: block; width: 100%; height: auto; }

  /* TIERS */
  .ws-tiers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1.4rem; }
  .ws-tier {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--ws-white);
    border: 1px solid var(--ws-line);
    border-radius: 10px;
    padding: 1.5rem 1.35rem 1.35rem;
    box-shadow: 0 14px 34px -24px rgba(30,43,58,0.35);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .ws-tier:hover { transform: translateY(-2px); box-shadow: 0 24px 50px -28px rgba(30,43,58,0.4); }
  .ws-tier.featured { border-top: 3px solid var(--ws-caramel); }
  .ws-t-badge {
    position: absolute;
    top: -12px; right: 14px;
    background: #F6EBDD;
    color: var(--ws-caramel-deep);
    border: 1px solid rgba(156,113,68,0.35);
    border-radius: 999px;
    padding: 2px 12px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .ws-t-spine {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ws-caramel-deep);
  }
  .ws-t-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem;
    font-weight: 600;
    line-height: 1.1;
    margin: 0.5rem 0 0;
    color: var(--ws-dark);
  }
  .ws-t-meta { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.8rem 0 0; }
  .ws-t-meta span {
    background: var(--ws-cream);
    border: 1px solid var(--ws-line);
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--ws-body);
    white-space: nowrap;
  }
  .ws-t-desc { font-size: 0.86rem; line-height: 1.55; color: var(--ws-body); margin: 0.9rem 0 0; }
  .ws-t-desc strong { color: var(--ws-dark); font-weight: 600; }
  .ws-t-desc a { color: var(--ws-caramel-deep); font-weight: 600; text-decoration: none; border-bottom: 1px solid var(--ws-caramel); }
  .ws-t-desc a:hover { color: var(--ws-caramel); }
  .ws-t-wlab {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ws-dark);
    margin: 1.1rem 0 0;
  }
  .ws-t-walk { list-style: none; margin: 0.5rem 0 0; padding: 0; }
  .ws-t-walk li {
    position: relative;
    padding: 0.35rem 0 0.35rem 1.35rem;
    font-size: 0.84rem;
    line-height: 1.45;
    color: var(--ws-body);
    border-top: 1px solid var(--ws-line);
  }
  .ws-t-walk li:first-child { border-top: none; }
  .ws-t-walk li::before {
    content: "\\2192";
    position: absolute;
    left: 2px;
    color: var(--ws-caramel-deep);
    font-weight: 700;
  }
  .ws-t-spacer { flex: 1; }
  .ws-t-prep {
    display: inline-block;
    align-self: flex-start;
    margin-top: 0.9rem;
    font-size: 0.86rem;
    font-weight: 700;
    color: var(--ws-caramel-deep);
    text-decoration: none;
    border-bottom: 1px solid var(--ws-caramel);
    padding-bottom: 1px;
  }
  .ws-t-prep:hover { color: var(--ws-caramel); }
  .ws-t-outcome {
    background: var(--ws-cream);
    border-radius: 8px;
    padding: 0.75rem 0.9rem;
    margin: 1rem 0 0;
    font-size: 0.82rem;
    line-height: 1.5;
    color: var(--ws-body);
  }
  .ws-t-outcome strong { color: var(--ws-dark); }

  /* LEADERSHIP BENCH BAND */
  .ws-bench .ws-kicker { display: block; margin-bottom: 1.2rem; }
  .ws-bench .ws-h2 { color: #fff; }
  .ws-bench .ws-note { color: rgba(255,255,255,0.55); }
  .ws-bench .ws-note strong { color: rgba(255,255,255,0.9); }
  .ws-tiers.ws-tiers-pair { grid-template-columns: repeat(2, 1fr); max-width: 920px; }
  @media (max-width: 640px) {
    .ws-tiers.ws-tiers-pair { grid-template-columns: 1fr; }
  }

  /* HOW EVERY SESSION RUNS */
  .ws-run-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
    margin-top: 1rem;
  }
  .ws-promise {
    display: grid;
    grid-template-columns: 1.6rem 1fr;
    gap: 1.2rem;
    padding: 1.5rem 0;
    border-top: 1px solid var(--ws-line);
  }
  .ws-promise:last-child { border-bottom: 1px solid var(--ws-line); }
  .ws-promise .n {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ws-caramel);
    padding-top: 0.2rem;
  }
  .ws-promise h3 { font-size: 1.12rem; color: var(--ws-dark); margin: 0 0 0.3rem; font-weight: 600; }
  .ws-promise p { font-size: 0.96rem; color: var(--ws-body); margin: 0; }
  .ws-run-photo {
    margin: 0.4rem 0 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 24px 50px -28px rgba(30,43,58,0.4);
  }
  .ws-run-photo img { width: 100%; height: auto; display: block; }

  .ws-prereq {
    margin-top: 2.4rem;
    background: var(--ws-white);
    border: 1px solid var(--ws-line);
    border-radius: 10px;
    padding: 1.2rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }
  .ws-prereq .pk {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ws-caramel-deep);
    margin-right: 0.4rem;
  }
  .ws-prereq .pi {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ws-dark);
    background: var(--ws-cream);
    border: 1px solid var(--ws-line);
    border-radius: 999px;
    padding: 0.35rem 0.9rem;
  }
  .ws-prereq .pi span { color: var(--ws-muted); font-weight: 500; }
  .ws-prereq .pwhy { font-size: 0.85rem; line-height: 1.5; color: var(--ws-muted); flex-basis: 100%; margin: 0.3rem 0 0; }

  .ws-pullquote {
    margin-top: 2.6rem;
    border-left: 3px solid var(--ws-caramel);
    padding: 0.4rem 0 0.4rem 1.6rem;
    max-width: 720px;
  }
  .ws-pullquote p {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.3rem, 2.4vw, 1.65rem);
    font-weight: 500;
    font-style: italic;
    line-height: 1.35;
    color: var(--ws-dark);
    margin: 0;
  }

  /* OUTCOMES MENU */
  .ws-menu { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2.5rem; margin-top: 1.6rem; }
  .ws-mitem {
    display: grid;
    grid-template-columns: 2.1rem 1fr;
    gap: 0.8rem;
    padding: 1.1rem 0;
    border-top: 1px solid var(--ws-line);
  }
  .ws-mitem .mn {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--ws-caramel-deep);
  }
  .ws-mitem h4 { font-size: 1.02rem; font-weight: 600; margin: 0 0 0.25rem; color: var(--ws-dark); }
  .ws-mitem h4 a { color: var(--ws-dark); text-decoration: none; border-bottom: 1px solid var(--ws-caramel); }
  .ws-mitem h4 a:hover { color: var(--ws-caramel-deep); }
  .ws-mitem p { font-size: 0.9rem; line-height: 1.5; color: var(--ws-body); margin: 0; }
  .ws-mbig {
    grid-column: 1 / -1;
    margin-top: 1.6rem;
    background: #F6EBDD;
    border: 1px solid rgba(156,113,68,0.35);
    border-radius: 10px;
    padding: 1.8rem 2rem;
    text-align: center;
  }
  .ws-mbig h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 600;
    color: var(--ws-dark);
    margin: 0;
  }
  .ws-mbig p { font-size: 0.95rem; line-height: 1.5; color: var(--ws-body); margin: 0.5rem 0 0; }

  /* DONE FOR YOU */
  .ws-dfy { display: grid; grid-template-columns: 1.15fr 1fr; gap: 1.3rem; margin-top: 1.6rem; }
  .ws-dfy-main {
    background: var(--ws-white);
    border: 1px solid var(--ws-line);
    border-top: 3px solid var(--ws-caramel);
    border-radius: 10px;
    padding: 1.8rem 1.8rem 1.6rem;
    box-shadow: 0 14px 34px -24px rgba(30,43,58,0.35);
  }
  .ws-dfy-main h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem;
    font-weight: 600;
    margin: 0;
    color: var(--ws-dark);
  }
  .ws-dfy-main p { font-size: 0.96rem; line-height: 1.6; color: var(--ws-body); margin: 0.8rem 0 0; }
  .ws-dfy-main p strong { color: var(--ws-dark); font-weight: 600; }
  .ws-dfy-steps { display: flex; flex-direction: column; gap: 0.8rem; }
  .ws-dstep {
    background: var(--ws-white);
    border: 1px solid var(--ws-line);
    border-radius: 10px;
    padding: 1rem 1.15rem;
    display: grid;
    grid-template-columns: 1.9rem 1fr;
    gap: 0.8rem;
  }
  .ws-dstep .dn {
    width: 1.65rem; height: 1.65rem;
    border-radius: 50%;
    background: var(--ws-caramel);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    display: grid;
    place-items: center;
  }
  .ws-dstep h4 { font-size: 0.96rem; font-weight: 600; margin: 0.1rem 0 0.2rem; color: var(--ws-dark); }
  .ws-dstep p { font-size: 0.85rem; line-height: 1.5; color: var(--ws-body); margin: 0; }

  /* WHERE THIS LEADS */
  .ws-funnel { display: flex; align-items: stretch; gap: 0.8rem; flex-wrap: wrap; margin-top: 1.8rem; }
  .ws-fstep {
    flex: 1;
    min-width: 220px;
    background: var(--ws-white);
    border: 1px solid var(--ws-line);
    border-radius: 10px;
    padding: 1.15rem 1.3rem;
  }
  .ws-fstep .fk {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ws-muted);
  }
  .ws-fstep .fv { font-size: 1rem; font-weight: 600; color: var(--ws-dark); margin-top: 0.4rem; line-height: 1.35; }
  .ws-fstep.accent { background: #F6EBDD; border-color: rgba(156,113,68,0.35); }
  .ws-fstep.accent .fk { color: var(--ws-caramel-deep); }
  .ws-farrow { align-self: center; font-size: 1.3rem; color: var(--ws-muted); flex: 0; }

  /* CTA */
  .ws-cta-band { background: var(--ws-dark); color: #fff; padding: 5rem 0; text-align: center; }
  .ws-cta-band h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-size: clamp(2.1rem, 4vw, 3rem);
    margin-bottom: 1rem;
    color: #fff;
  }
  .ws-cta-band p { font-size: 1.08rem; color: rgba(255,255,255,0.9); max-width: 560px; margin: 0 auto 2rem; }
  .ws-cta-band .ws-btn-light {
    display: inline-block;
    background: var(--ws-caramel);
    color: #fff;
    padding: 1rem 2.4rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.05rem;
    transition: background 0.2s, transform 0.2s;
  }
  .ws-cta-band .ws-btn-light:hover { background: var(--ws-caramel-deep); transform: translateY(-1px); }
  .ws-cta-email { margin-top: 1.4rem; font-size: 0.92rem; color: rgba(255,255,255,0.55); }
  .ws-cta-email a { color: var(--ws-caramel); text-decoration: none; }

  .ws-footer { background: var(--ws-dark); padding: 2rem; text-align: center; }
  .ws-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .ws-footer a { color: var(--ws-caramel); text-decoration: none; }

  @media (max-width: 1080px) {
    .ws-tiers { grid-template-columns: 1fr 1fr; }
    .ws-stepline { display: none; }
  }
  @media (max-width: 820px) {
    .ws-section { padding: 4rem 0; }
    .ws-run-grid { grid-template-columns: 1fr; gap: 2rem; }
    .ws-run-photo { max-width: 440px; }
    .ws-dfy { grid-template-columns: 1fr; }
    .ws-proof { grid-template-columns: 1fr 1fr; gap: 2rem 1.5rem; }
  }
  @media (max-width: 640px) {
    .ws-tiers { grid-template-columns: 1fr; }
    .ws-menu { grid-template-columns: 1fr; }
    .ws-funnel { flex-direction: column; }
    .ws-farrow { transform: rotate(90deg); align-self: flex-start; margin-left: 1.3rem; }
  }
`;

const Workshops = () => {
  usePageMeta({
    title: "AI Workshops · Walk Out With It Running",
    description:
      "First Win, Build Day, The Cohort, The Loop, plus Team Win and Team Build for your bench. Hands-on Claude workshops where you hand AI real work and leave with it running.",
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="ws-page">
      {/* HERO */}
      <header className="ws-hero">
        <div className="ws-wrap">
          <span className="ws-kicker">Dreamscope · Operator-led Claude workshops</span>
          <h1>AI Workshops</h1>
          <p className="ws-dek">
            Most people use AI like an advisor: ask a question, get help, do
            the work yourself. These workshops move you to the other side. You
            hand Claude real work, and it comes back done. In your accounts, on
            your machine, bespoke to you.
          </p>
          <p className="ws-hero-line">
            You didn't buy a chatbot. You <span>hired a coworker</span>.
          </p>
          <div className="ws-cta-row">
            <a
              className="ws-btn"
              href="mailto:joe@dreamscope.win?subject=AI%20Workshops%20-%20First%20Win"
            >
              Book a First Win →
            </a>
            <a className="ws-link" href="#ladder">
              See the ways in ↓
            </a>
          </div>
          <div className="ws-proof">
            <div>
              <div className="num">20+ yrs</div>
              <div className="lab">building operations across Asia</div>
            </div>
            <div>
              <div className="num">3,700</div>
              <div className="lab">
                employees at Pizza 4P's as Culture and Ops Excellence Director
              </div>
            </div>
            <div>
              <div className="num accent">6x</div>
              <div className="lab">revenue as interim COO at Seller Candy</div>
            </div>
            <div>
              <div className="num">4,056</div>
              <div className="lab">hours automated per year at Dreamplex</div>
            </div>
          </div>
        </div>
      </header>

      {/* 01 THE LADDER */}
      <section className="ws-section on-white" id="ladder">
        <div className="ws-wrap">
          <div className="ws-snum">01 / The ladder</div>
          <h2 className="ws-h2">Four ways in for leaders. One system.</h2>
          <p className="ws-lead">
            Win once. Build the system. Make it stick. Keep it sharp. Every
            rung is bespoke: you leave with something built for you, and the
            higher you climb, the more hands-on we go. Bringing your whole
            bench? Two classroom formats are below.
          </p>

          <div className="ws-stepline" aria-hidden="true">
            <svg viewBox="0 0 1128 74" xmlns="http://www.w3.org/2000/svg">
              <polyline
                points="8,62 274,62 274,46 556,46 556,30 838,30 838,14 1120,14"
                fill="none"
                stroke="#B5895A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="62" r="4" fill="#B5895A" />
              <circle cx="274" cy="46" r="4" fill="#B5895A" />
              <circle cx="556" cy="30" r="4" fill="#B5895A" />
              <circle cx="838" cy="14" r="4" fill="#B5895A" />
              <text x="16" y="52" fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="1.4" fill="#8A7E70">HALF DAY</text>
              <text x="282" y="36" fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="1.4" fill="#8A7E70">1 DAY</text>
              <text x="564" y="20" fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="1.4" fill="#8A7E70">1 DAY + 2 HALF DAYS</text>
              <text x="846" y="8" fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="1.4" fill="#8A7E70">MONTHLY</text>
            </svg>
          </div>

          <div className="ws-tiers">
            <article className="ws-tier">
              <div className="ws-t-spine">Win once</div>
              <h3 className="ws-t-name">First Win</h3>
              <div className="ws-t-meta">
                <span>half day</span>
                <span>3 to 5 seats</span>
                <span>Cowork only</span>
              </div>
              <p className="ws-t-desc">
                One morning, one shift:{" "}
                <strong>
                  stop asking AI questions, start handing it work.
                </strong>{" "}
                A tiny bit of show, then your hands on your machine, doing a
                real job you brought with you.
              </p>
              <div className="ws-t-wlab">You walk out with</div>
              <ul className="ws-t-walk">
                <li>Claude Cowork live on your machine, connected and working</li>
                <li>
                  One real piece of your work, done before you leave (screened
                  in pre-work so it fits the window)
                </li>
                <li>
                  The field guide, loaded with exercises to keep building on
                  your own
                </li>
              </ul>
              <div className="ws-t-spacer" />
              <div className="ws-t-outcome">
                <strong>
                  You now know the difference between chat and a coworker
                </strong>
                , because yours already did something.
              </div>
            </article>

            <article className="ws-tier featured">
              <div className="ws-t-badge">Flagship</div>
              <div className="ws-t-spine">Build the system</div>
              <h3 className="ws-t-name">Build Day</h3>
              <div className="ws-t-meta">
                <span>full day</span>
                <span>1 to 5 seats</span>
                <span>Code as needed</span>
              </div>
              <p className="ws-t-desc">
                Very hands-on, very bespoke.{" "}
                <strong>We float between seats while you build.</strong> Cowork
                set up, connections into your real tools, and Code brought in
                only where your build needs it. Planned with you in pre-work,
                so nothing is generic.
              </p>
              <div className="ws-t-wlab">You walk out with</div>
              <ul className="ws-t-walk">
                <li>
                  Cowork set up and connected to your real tools, Code added if
                  your build calls for it
                </li>
                <li>
                  A real routine running, plus your first custom skill, built
                  to how you work
                </li>
                <li>1 hour of BFF time after the day: a call or two, any questions answered</li>
              </ul>
              <div className="ws-t-spacer" />
              <div className="ws-t-outcome">
                <strong>Something is now set to run.</strong> Monday starts
                different.
              </div>
            </article>

            <article className="ws-tier">
              <div className="ws-t-spine">Make it stick</div>
              <h3 className="ws-t-name">The Cohort</h3>
              <div className="ws-t-meta">
                <span>Build Day + 2 half days</span>
                <span>1 to 5 seats</span>
              </div>
              <p className="ws-t-desc">
                <strong>Build Day, plus.</strong> Start with the full day, then
                two more sessions to go deep on a complete build, with a
                curriculum written for each person. Think:{" "}
                <Link to="/website">your website rebuilt</Link>, and from then
                on Claude makes your updates on command.
              </p>
              <div className="ws-t-wlab">You walk out with</div>
              <ul className="ws-t-walk">
                <li>Everything in Build Day, then two more sessions of depth</li>
                <li>
                  A complete working build: your website, your reporting, your
                  pick from pre-work
                </li>
                <li>
                  2 hours of BFF time after the program, plus your personal
                  curriculum
                </li>
              </ul>
              <div className="ws-t-spacer" />
              <div className="ws-t-outcome">
                <strong>Not a taste. A finished build</strong> you drive
                yourself.
              </div>
            </article>

            <article className="ws-tier">
              <div className="ws-t-spine">Keep it sharp</div>
              <h3 className="ws-t-name">The Loop</h3>
              <div className="ws-t-meta">
                <span>monthly half day</span>
                <span>alumni only</span>
                <span>10 members max</span>
              </div>
              <p className="ws-t-desc">
                The comeback room, for{" "}
                <strong>Build Day and Cohort alumni only.</strong> What changed
                in AI this month and what it means for your work, plus help on
                whatever you are stuck on.
              </p>
              <div className="ws-t-wlab">Every month</div>
              <ul className="ws-t-walk">
                <li>
                  A half-day working session: the month in AI, translated to
                  your work
                </li>
                <li>
                  Unstuck help: the part you can't figure out, worked through
                  together
                </li>
                <li>
                  Teaching on request: heard about something? Ask, and it's on
                  the agenda
                </li>
              </ul>
              <div className="ws-t-spacer" />
              <div className="ws-t-outcome">
                <strong>Most people plateau a month after training.</strong>{" "}
                Alumni don't.
              </div>
            </article>
          </div>

          <p className="ws-note">
            <strong>BFF time</strong> happens after the class, not during it:
            direct access in the weeks that follow, one call or two, your
            questions, anything.
          </p>
        </div>
      </section>

      {/* 02 HOW EVERY SESSION RUNS */}
      <section className="ws-section on-cream">
        <div className="ws-wrap">
          <div className="ws-snum">02 / How every session runs</div>
          <h2 className="ws-h2">Engineered so the change actually happens.</h2>
          <p className="ws-lead">
            Most AI training is a lecture plus an hour of playing with a
            chatbot. People leave entertained and unchanged. Four rules make
            this one different.
          </p>
          <div className="ws-run-grid">
            <div>
              <div className="ws-promise">
                <div className="n">1</div>
                <div>
                  <h3>The right target, first</h3>
                  <p>
                    Before any session, a guided questionnaire helps you pick 3
                    to 5 jobs you wish someone would just handle, and shows you
                    what fits the format. We screen the list and feed back what
                    we think fits the window. Nobody arrives blind, and nothing
                    gets promised that can't ship.
                  </p>
                </div>
              </div>
              <div className="ws-promise">
                <div className="n">2</div>
                <div>
                  <h3>Set up before you arrive</h3>
                  <p>
                    Accounts, installs and access are handled in pre-work. Not
                    one live minute is spent watching an install bar. Setup
                    friction is our problem, not yours.
                  </p>
                </div>
              </div>
              <div className="ws-promise">
                <div className="n">3</div>
                <div>
                  <h3>Launch, teach, reveal</h3>
                  <p>
                    AI needs minutes to build real things. So every long build
                    is launched, the next concept is taught while it runs, and
                    you return to a finished result. Nobody watches a spinner.
                  </p>
                </div>
              </div>
              <div className="ws-promise">
                <div className="n">4</div>
                <div>
                  <h3>Runs, or we stay</h3>
                  <p>
                    The deliverable is a running system, not notes. If yours is
                    not running when the session ends, we keep working until it
                    is. In writing, right here.
                  </p>
                </div>
              </div>
            </div>
            <figure className="ws-run-photo">
              <img
                src={handsOnPhoto}
                alt="Joe Black working shoulder to shoulder with a workshop participant"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <div className="ws-prereq">
            <span className="pk">Prerequisites</span>
            <span className="pi">
              First Win <span>· a Claude Pro account</span>
            </span>
            <span className="pi">
              Build Day &amp; The Cohort <span>· Claude Max</span>
            </span>
            <p className="pwhy">
              Real building burns through a Pro allowance too fast to ship
              anything. Both accounts get sorted with you in pre-work.
            </p>
          </div>

          <div className="ws-pullquote">
            <p>
              It is a Claude workshop on purpose. Claude is currently best at
              the thing that matters here: doing the work, not talking about
              it. Instead of just bouncing ideas and answering questions,
              Claude gets real work done.
            </p>
          </div>
        </div>
      </section>

      {/* FOR YOUR LEADERSHIP BENCH */}
      <section className="ws-section on-dark ws-bench" id="bench">
        <div className="ws-wrap">
          <span className="ws-kicker">For your leadership bench</span>
          <h2 className="ws-h2">The same shift, sized for a room.</h2>
          <p className="ws-lead">
            First Win and Build Day run on individual outcomes with heavy
            hands-on attention. These two run the same shift for middle
            management: a classroom of up to 20 seats, working toward one
            outcome the room picks ahead of the day, still customized to your
            company or group.
          </p>
          <p className="ws-lead">
            A 20-seat room works because the day is guided together rather
            than one-on-one: everyone follows the build on their own machine,
            with less hand-holding by design. Mixed rooms are welcome too:
            groups of 5 from different companies, each group bringing its own
            outcome, up to around 20 in the room.
          </p>

          <div className="ws-tiers ws-tiers-pair">
            <article className="ws-tier">
              <div className="ws-t-spine">Win as a room</div>
              <h3 className="ws-t-name">Team Win</h3>
              <div className="ws-t-meta">
                <span>half day</span>
                <span>up to 20 seats</span>
                <span>one shared outcome</span>
              </div>
              <p className="ws-t-desc">
                The First Win shift, for a class of your middle managers:{" "}
                <strong>the advisor-to-worker reframe</strong>, live demos on
                real work, and the room's chosen outcome built along together
                during the session.
              </p>
              <div className="ws-t-wlab">You walk out with</div>
              <ul className="ws-t-walk">
                <li>The advisor-to-worker shift, made concrete on real work</li>
                <li>
                  The room's outcome running on the host account, with
                  everyone's replication steps
                </li>
                <li>The field guide to finish yours solo</li>
              </ul>
              <div className="ws-t-spacer" />
              <div className="ws-t-outcome">
                <strong>
                  Your bench now knows the difference between chat and a
                  coworker
                </strong>
                , because the room just built one outcome together.
              </div>
            </article>

            <article className="ws-tier">
              <div className="ws-t-spine">Build as a room</div>
              <h3 className="ws-t-name">Team Build</h3>
              <div className="ws-t-meta">
                <span>full day</span>
                <span>up to 20 seats</span>
                <span>one shared outcome</span>
              </div>
              <p className="ws-t-desc">
                The Build Day arc, for a class: setup verified in pre-work
                before the day, then{" "}
                <strong>
                  the morning teaches the core routine on the room's real
                  work, and the afternoon ships the room's chosen outcome
                </strong>
                , step by step, everyone building along on their own accounts.
              </p>
              <div className="ws-t-wlab">You walk out with</div>
              <ul className="ws-t-walk">
                <li>The shared outcome, built along on your own machine</li>
                <li>The replication kit for the room's build</li>
                <li>A ranked list of what the room should build next</li>
              </ul>
              <div className="ws-t-spacer" />
              <div className="ws-t-outcome">
                <strong>One outcome, shipped on every machine in the room.</strong>{" "}
                Monday starts different for the whole bench.
              </div>
            </article>
          </div>

          <p className="ws-note">
            <strong>The room's outcome comes from pre-work:</strong> everyone
            submits their candidates, and the submissions pick the shared
            target ahead of the day. Account prerequisites are confirmed in
            pre-work before the day.
          </p>
        </div>
      </section>

      {/* 03 THE OUTCOMES MENU */}
      <section className="ws-section on-white">
        <div className="ws-wrap">
          <div className="ws-snum">03 / What people get done</div>
          <h2 className="ws-h2">
            The outcome is yours to pick. These are the favorites.
          </h2>
          <p className="ws-lead">
            Every engagement starts with your list of jobs you want off your
            plate. This menu exists to seed that list, nothing more.
          </p>
          <div className="ws-menu">
            <div className="ws-mitem">
              <div className="mn">01</div>
              <div>
                <h4>
                  <Link to="/website">Your website, run by Claude</Link>
                </h4>
                <p>
                  Refreshed, redesigned if needed, and from then on updated by
                  telling Claude what you want.
                </p>
              </div>
            </div>
            <div className="ws-mitem">
              <div className="mn">02</div>
              <div>
                <h4>A design system for your brand</h4>
                <p>
                  Every deck, document and one-pager comes out looking like
                  you, without a designer in the loop.
                </p>
              </div>
            </div>
            <div className="ws-mitem">
              <div className="mn">03</div>
              <div>
                <h4>Morning email triage</h4>
                <p>
                  Inbox read, summarized, replies drafted and waiting for your
                  review. Junk flagged.
                </p>
              </div>
            </div>
            <div className="ws-mitem">
              <div className="mn">04</div>
              <div>
                <h4>Reporting that writes itself</h4>
                <p>
                  The weekly or monthly report assembles from your live numbers
                  instead of your Sunday night.
                </p>
              </div>
            </div>
            <div className="ws-mitem">
              <div className="mn">05</div>
              <div>
                <h4>A live business dashboard</h4>
                <p>
                  One page, always current, pulled from the tools you already
                  use.
                </p>
              </div>
            </div>
            <div className="ws-mitem">
              <div className="mn">06</div>
              <div>
                <h4>Meeting capture</h4>
                <p>
                  Recorded, summarized, action items out, the follow-up
                  scheduled before you leave the room.
                </p>
              </div>
            </div>
            <div className="ws-mitem">
              <div className="mn">07</div>
              <div>
                <h4>Your voice, as a skill</h4>
                <p>
                  Drafts that sound like you on the first try. Posts, emails,
                  replies, all of it.
                </p>
              </div>
            </div>
            <div className="ws-mitem">
              <div className="mn">08</div>
              <div>
                <h4>Ask-your-files</h4>
                <p>
                  Your documents organized so Claude answers from them
                  instantly, instead of you digging.
                </p>
              </div>
            </div>
            <div className="ws-mbig">
              <h4>Insert your idea here.</h4>
              <p>
                These eight are seeds, not the catalog. If it is work you want
                off your plate, it is a candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 DONE FOR YOU */}
      <section className="ws-section on-cream">
        <div className="ws-wrap">
          <div className="ws-snum">04 / Done For You</div>
          <h2 className="ws-h2">Or skip the learning. We build it, you keep it.</h2>
          <p className="ws-lead">
            Everything above is do-it-with-you: you build, you learn, you own
            it. There is a second door.
          </p>
          <div className="ws-dfy">
            <div className="ws-dfy-main">
              <h3>The finished build, handed over.</h3>
              <p>
                Pick the outcome, from the menu or your own list, and hand it
                to us. It comes back{" "}
                <strong>
                  built, tested, documented, and running in your accounts
                </strong>
                , with a handover session so you can drive it from day one.
                Anything a Build Day or Cohort could produce, we can simply
                deliver.
              </p>
              <p>
                You skip the learning and the weeks.{" "}
                <strong>You still own everything.</strong>
              </p>
            </div>
            <div className="ws-dfy-steps">
              <div className="ws-dstep">
                <div className="dn">1</div>
                <div>
                  <h4>Pick the outcome</h4>
                  <p>
                    From the menu, or the job you already know you want gone.
                  </p>
                </div>
              </div>
              <div className="ws-dstep">
                <div className="dn">2</div>
                <div>
                  <h4>We build it in your accounts</h4>
                  <p>
                    You keep full visibility the whole way. Nothing lives on
                    our side.
                  </p>
                </div>
              </div>
              <div className="ws-dstep">
                <div className="dn">3</div>
                <div>
                  <h4>The handover</h4>
                  <p>
                    Documented, running, plus a session that teaches you to
                    drive it.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="ws-note">
            Prefer one-on-one? That's{" "}
            <Link to="/coaching">AI Coaching →</Link>
          </p>
        </div>
      </section>

      {/* 05 WHERE THIS LEADS */}
      <section className="ws-section on-white">
        <div className="ws-wrap">
          <div className="ws-snum">05 / Where this leads</div>
          <h2 className="ws-h2">The workshop is the front door.</h2>
          <p className="ws-lead">
            The thing you set up is not the real value. The understanding is.
            Once you have put one real piece of work through an AI that gets
            things done, you hold the keys: the same move works on the next
            hundred jobs, and the thousand after that. Who knows what you will
            come up with.
          </p>
          <div className="ws-funnel">
            <div className="ws-fstep">
              <div className="fk">Day one</div>
              <div className="fv">One real piece of your work, running</div>
            </div>
            <div className="ws-farrow">→</div>
            <div className="ws-fstep">
              <div className="fk">What it unlocks</div>
              <div className="fv">
                You understand how get-it-done AI actually works
              </div>
            </div>
            <div className="ws-farrow">→</div>
            <div className="ws-fstep accent">
              <div className="fk">From there</div>
              <div className="fv">A thousand more uses, yours to invent</div>
            </div>
          </div>
          <p className="ws-note">
            And when a whole process is worth compressing end to end, months of
            expert work into days, that conversation is{" "}
            <Link to="/ai-maestro">Dreamscope AI Maestro</Link>. Alumni walk
            into it already knowing what to point it at.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="ws-cta-band">
        <div className="ws-wrap">
          <h2>Your Monday will never feel the same.</h2>
          <p>
            First Win is half a day, 3 to 5 seats. Claude Cowork live on your
            machine, one real piece of your work done before you leave, and a
            field guide to keep going.
          </p>
          <a
            className="ws-btn-light"
            href="mailto:joe@dreamscope.win?subject=AI%20Workshops%20-%20First%20Win"
          >
            Book a First Win →
          </a>
          <div className="ws-cta-email">
            Or email directly:{" "}
            <a href="mailto:joe@dreamscope.win?subject=AI%20Workshops">
              joe@dreamscope.win
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ws-footer">
        <p>
          Dreamscope Consulting ·{" "}
          <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a> ·{" "}
          <a
            href="https://www.linkedin.com/in/joevblack"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>{" "}
          · <Link to="/#about">About</Link> ·{" "}
          <Link to="/insights">Insights</Link> · © 2026
        </p>
      </footer>
    </div>
  );
};

export default Workshops;
