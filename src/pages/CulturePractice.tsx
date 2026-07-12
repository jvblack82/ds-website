import { useEffect } from "react";
import { Link } from "react-router-dom";
import joeBlackPhoto from "@/assets/joe-black.jpg";
import heroTalk from "@/assets/culture-hero-talk.jpg";
import inspirePhoto from "@/assets/culture-inspire.jpg";
import buildPhoto from "@/assets/culture-build.jpg";
import implementPhoto from "@/assets/culture-implement.jpg";
import { COMPANY_LOGOS } from "@/data/companyLogos";
import { usePageMeta } from "@/hooks/usePageMeta";

const DISCOVERY = "https://discovery.dreamscope.win/culture";

const css = `
  :root {
    --dark: #1E2B3A;
    --teal: #0C7C8A;
    --teal-light: #0E96A6;
    --cream: #F7F4EF;
    --sand: #EDE8E0;
    --warm-white: #FDFCFA;
    --body: #3A3A3A;
    --muted: #7A7A7A;
    --accent-bg: #E8F4F5;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .cp-page {
    font-family: 'DM Sans', sans-serif;
    color: var(--body);
    background: var(--warm-white);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  .cp-page * { box-sizing: border-box; }
  .cp-wrap { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
  .cp-section { padding: 5rem 0; }
  .cp-label {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 2px; color: var(--teal); margin-bottom: 1rem;
  }
  .cp-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.5rem);
    color: var(--dark); margin-bottom: 1.2rem; font-weight: 400; line-height: 1.2;
    max-width: 20ch;
  }
  .cp-sub {
    font-size: 1.05rem; color: var(--muted); max-width: 640px;
    line-height: 1.7; margin-bottom: 2.5rem;
  }

  /* HERO */
  .cp-hero { background: var(--dark); color: #fff; padding: 4.5rem 0 5rem; position: relative; overflow: hidden; }
  .cp-hero::after {
    content: ''; position: absolute; top: -45%; right: -10%;
    width: 620px; height: 620px;
    background: radial-gradient(circle, rgba(12,124,138,0.18) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cp-hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 3rem; align-items: center; }
  .cp-kicker {
    display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 2.5px; color: var(--teal-light); margin-bottom: 1.3rem;
  }
  .cp-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.5rem, 5.5vw, 4rem); line-height: 1.08; font-weight: 400;
    margin-bottom: 1.4rem; max-width: 16ch;
  }
  .cp-hero p.cp-hero-sub {
    font-size: 1.15rem; color: rgba(255,255,255,0.78); max-width: 640px;
    line-height: 1.7; margin-bottom: 2.4rem;
  }
  .cp-hero-btns { display: flex; flex-wrap: wrap; gap: 1rem; }
  .cp-btn {
    display: inline-block; padding: 0.95rem 2rem; border-radius: 8px;
    text-decoration: none; font-weight: 600; font-size: 1rem;
    transition: transform 0.2s, background 0.2s, border-color 0.2s, color 0.2s;
  }
  .cp-btn.teal { background: var(--teal); color: #fff; }
  .cp-btn.teal:hover { background: var(--teal-light); transform: translateY(-1px); }
  .cp-btn.outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.35); }
  .cp-btn.outline:hover { border-color: var(--teal-light); color: var(--teal-light); }
  .cp-hero-photo {
    position: relative; border-radius: 14px; overflow: hidden;
    box-shadow: 0 24px 60px -28px rgba(0,0,0,0.6); aspect-ratio: 4 / 3;
  }
  .cp-hero-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cp-hero-photo::before { content: ''; position: absolute; inset: 0; z-index: 1; background: linear-gradient(140deg, rgba(30,43,58,0) 40%, rgba(30,43,58,0.55) 100%); }

  /* CREDIBILITY STRIP */
  .cp-cred { background: var(--cream); padding: 3rem 0; border-bottom: 1px solid var(--sand); }
  .cp-cred-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center; }
  .cp-cred-num { font-family: 'DM Serif Display', serif; font-size: 2.4rem; color: var(--dark); display: block; margin-bottom: 0.4rem; line-height: 1; }
  .cp-cred-label { font-size: 0.86rem; color: var(--muted); line-height: 1.5; }

  /* LOGO STRIP */
  .cp-logos { background: var(--cream); padding: 2.5rem 0 3rem; border-bottom: 1px solid var(--sand); }
  .cp-logos-eyebrow { text-align: center; font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin-bottom: 1.8rem; }
  .cp-logos-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 2.4rem 2.8rem; }
  .cp-logo { height: 32px; width: auto; max-width: 140px; object-fit: contain; filter: grayscale(100%); opacity: 0.55; transition: filter 0.3s, opacity 0.3s; }
  .cp-logo:hover { filter: grayscale(0%); opacity: 1; }
  .cp-logos-note { text-align: center; font-size: 0.85rem; color: var(--muted); margin-top: 1.8rem; }

  /* PREMISE */
  .cp-premise { background: var(--warm-white); }
  .cp-premise-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 3.5rem; align-items: center; }
  .cp-premise-text p { font-size: 1.08rem; line-height: 1.8; margin-bottom: 1.2rem; }
  .cp-premise-text p strong { color: var(--dark); }
  .cp-pullout {
    font-family: 'DM Serif Display', serif; font-style: italic; color: var(--teal);
    font-size: 1.6rem; line-height: 1.4; border-left: 3px solid var(--teal); padding-left: 1.5rem;
  }

  /* FRAMEWORK */
  .cp-framework-intro { background: var(--cream); padding-bottom: 3rem; }
  .cp-stepper { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
  .cp-step { display: flex; align-items: baseline; gap: 0.5rem; background: #fff; border: 1px solid var(--sand); border-radius: 50px; padding: 0.5rem 1.2rem; }
  .cp-step-num { font-family: 'DM Serif Display', serif; color: var(--teal); font-size: 0.95rem; }
  .cp-step-name { font-size: 0.9rem; font-weight: 600; color: var(--dark); }

  .cp-phase { padding: 4.5rem 0; }
  .cp-phase.light { background: var(--warm-white); }
  .cp-phase.cream { background: var(--cream); }
  .cp-phase.dark { background: var(--dark); color: #fff; }
  .cp-phase-eyebrow { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--teal); margin-bottom: 0.7rem; }
  .cp-phase.dark .cp-phase-eyebrow { color: var(--teal-light); }
  .cp-phase h3 { font-family: 'DM Serif Display', serif; font-size: clamp(1.6rem, 3vw, 2.1rem); font-weight: 400; color: var(--dark); margin-bottom: 1rem; line-height: 1.2; }
  .cp-phase.dark h3 { color: #fff; }
  .cp-phase-lead { font-size: 1.05rem; line-height: 1.75; max-width: 640px; margin-bottom: 2rem; }
  .cp-phase.dark .cp-phase-lead { color: rgba(255,255,255,0.78); }

  .cp-split { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .cp-split.rev .cp-split-media { order: -1; }
  .cp-media { border-radius: 14px; overflow: hidden; box-shadow: 0 18px 44px -22px rgba(30,43,58,0.4); aspect-ratio: 4 / 3; }
  .cp-media img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .cp-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 2.5rem; }
  .cp-pillar { background: var(--cream); border-radius: 12px; padding: 1.6rem; border-top: 3px solid var(--teal); }
  .cp-phase.cream .cp-pillar { background: #fff; }
  .cp-pillar h4 { font-size: 1rem; font-weight: 700; color: var(--dark); margin-bottom: 0.5rem; }
  .cp-pillar p { font-size: 0.92rem; color: var(--muted); line-height: 1.6; }

  .cp-deliv { margin-top: 2.2rem; }
  .cp-deliv-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); margin-bottom: 1rem; }
  .cp-phase.dark .cp-deliv-title { color: rgba(255,255,255,0.55); }
  .cp-deliv-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem 1.8rem; }
  .cp-deliv-list li { font-size: 0.96rem; line-height: 1.5; padding-left: 1.4rem; position: relative; }
  .cp-deliv-list li::before { content: '→'; position: absolute; left: 0; color: var(--teal); }
  .cp-phase.dark .cp-deliv-list li::before { color: var(--teal-light); }
  .cp-phase.dark .cp-deliv-list li { color: rgba(255,255,255,0.82); }

  .cp-phase-pullout { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.2rem; line-height: 1.5; margin-top: 2.2rem; color: var(--teal); max-width: 700px; }
  .cp-phase.dark .cp-phase-pullout { color: var(--teal-light); }

  /* Discover convergence visual */
  .cp-converge { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin: 2.6rem 0; }
  .cp-converge-sources { display: flex; flex-direction: column; gap: 0.8rem; }
  .cp-src { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); border-radius: 10px; padding: 0.8rem 1.3rem; min-width: 200px; }
  .cp-src .cp-src-k { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--teal-light); display: block; margin-bottom: 0.15rem; }
  .cp-src .cp-src-v { font-size: 0.95rem; color: #fff; font-weight: 600; }
  .cp-converge-arrow { font-size: 1.8rem; color: var(--teal-light); }
  .cp-converge-target { background: var(--teal); border-radius: 12px; padding: 1.4rem 1.8rem; text-align: center; max-width: 240px; }
  .cp-converge-target .cp-tg-num { font-family: 'DM Serif Display', serif; font-size: 2.2rem; line-height: 1; display: block; margin-bottom: 0.3rem; }
  .cp-converge-target .cp-tg-label { font-size: 0.9rem; color: rgba(255,255,255,0.9); }

  .cp-chip-link {
    display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 2rem;
    background: var(--accent-bg); color: var(--teal); border-radius: 50px;
    padding: 0.7rem 1.4rem; font-weight: 600; font-size: 0.95rem; text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .cp-chip-link:hover { background: #fff; transform: translateY(-1px); }

  /* Foundation chain (Build phase) */
  .cp-chain { display: flex; flex-wrap: wrap; align-items: stretch; gap: 0.6rem; margin: 2.4rem 0 2.6rem; }
  .cp-chain-node { background: #fff; border: 1px solid var(--sand); border-radius: 10px; padding: 0.8rem 1.1rem; font-weight: 600; color: var(--dark); font-size: 0.95rem; display: flex; align-items: center; }
  .cp-chain-arrow { display: flex; align-items: center; color: var(--teal); font-size: 1.1rem; }
  .cp-chain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.3rem; }
  .cp-chain-item h4 { font-size: 0.98rem; font-weight: 700; color: var(--dark); margin-bottom: 0.35rem; }
  .cp-chain-item p { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }
  .cp-callout { margin-top: 2.6rem; background: var(--dark); color: #fff; border-radius: 14px; padding: 1.8rem 2rem; font-family: 'DM Serif Display', serif; font-size: 1.2rem; line-height: 1.5; }
  .cp-callout span { color: var(--teal-light); }
  .cp-callout-body { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; line-height: 1.65; color: rgba(255,255,255,0.72); margin: 0.9rem 0 0; }

  /* Implement Live + Sustain */
  .cp-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-top: 1rem; }
  .cp-duo-col h4 { font-family: 'DM Serif Display', serif; font-size: 1.4rem; font-weight: 400; color: var(--dark); margin-bottom: 0.5rem; }
  .cp-duo-col .cp-duo-lead { font-size: 0.98rem; color: var(--muted); line-height: 1.6; margin-bottom: 1.1rem; }
  .cp-duo-col ul { list-style: none; padding: 0; margin: 0; }
  .cp-duo-col li { font-size: 0.95rem; line-height: 1.5; padding: 0.45rem 0 0.45rem 1.4rem; position: relative; border-top: 1px solid var(--sand); }
  .cp-duo-col li:first-child { border-top: none; }
  .cp-duo-col li::before { content: '·'; position: absolute; left: 0.4rem; color: var(--teal); font-weight: 700; }

  /* PLAYBOOK */
  .cp-playbook { background: var(--accent-bg); }
  .cp-playbook-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; margin-top: 2.5rem; }
  .cp-pb-card { background: #fff; border-radius: 14px; padding: 1.8rem; }
  .cp-pb-icon { font-size: 1.5rem; margin-bottom: 0.7rem; }
  .cp-pb-card h4 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 0.5rem; }
  .cp-pb-card p { font-size: 0.92rem; color: var(--muted); line-height: 1.6; }

  /* WHY DREAMSCOPE */
  .cp-why { background: var(--cream); }
  .cp-why-grid { display: grid; grid-template-columns: 1.5fr 0.7fr; gap: 3rem; align-items: center; }
  .cp-why-text p { font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.2rem; }
  .cp-why-text p strong { color: var(--dark); }
  .cp-why-pullout { font-family: 'DM Serif Display', serif; font-style: italic; color: var(--teal); font-size: 1.3rem; line-height: 1.45; margin-top: 1.5rem; }
  .cp-why-photo { width: 180px; height: 180px; border-radius: 50%; overflow: hidden; margin: 0 auto; border: 4px solid var(--warm-white); box-shadow: 0 14px 36px -16px rgba(30,43,58,0.4); }
  .cp-why-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* FIT */
  .cp-fit { background: var(--accent-bg); }
  .cp-fit-tags { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.5rem; }
  .cp-fit-tag { background: #fff; border: 1px solid var(--sand); border-radius: 50px; padding: 0.5rem 1.3rem; font-size: 0.9rem; color: var(--dark); font-weight: 500; }

  /* ENGAGEMENT */
  .cp-engage { background: var(--dark); color: #fff; }
  .cp-engage .cp-label { color: var(--teal-light); }
  .cp-engage .cp-title { color: #fff; }
  .cp-engage .cp-sub { color: rgba(255,255,255,0.6); }
  .cp-engage-lead { font-size: 1.18rem; line-height: 1.8; color: rgba(255,255,255,0.85); max-width: 720px; }

  /* CLOSING CTA */
  .cp-cta { background: var(--dark); color: #fff; text-align: center; padding: 5.5rem 0; }
  .cp-cta h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.9rem, 3.5vw, 2.8rem); font-weight: 400; margin-bottom: 1rem; }
  .cp-cta p { color: rgba(255,255,255,0.65); font-size: 1.08rem; max-width: 580px; margin: 0 auto 2rem; line-height: 1.7; }
  .cp-cta-email { margin-top: 1.4rem; font-size: 0.9rem; color: rgba(255,255,255,0.45); }
  .cp-cta-email a { color: var(--teal-light); text-decoration: none; }

  /* FOOTER */
  .cp-footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.08); padding: 2rem; text-align: center; }
  .cp-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .cp-footer a { color: var(--teal-light); text-decoration: none; }

  @media (prefers-reduced-motion: no-preference) {
    @keyframes cpFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .cp-hero h1, .cp-hero .cp-hero-sub, .cp-hero-btns { animation: cpFadeUp 0.6s ease-out both; }
    .cp-hero .cp-hero-sub { animation-delay: 0.12s; }
    .cp-hero-btns { animation-delay: 0.24s; }
  }

  @media (max-width: 900px) {
    .cp-hero-inner { grid-template-columns: 1fr; }
    .cp-hero-photo { display: none; }
    .cp-cred-grid { grid-template-columns: repeat(2, 1fr); gap: 1.8rem; }
    .cp-premise-grid, .cp-why-grid, .cp-split, .cp-duo { grid-template-columns: 1fr; gap: 2rem; }
    .cp-split.rev .cp-split-media { order: 0; }
    .cp-pillars, .cp-chain-grid, .cp-playbook-cards, .cp-engage-cards { grid-template-columns: 1fr; }
    .cp-deliv-list { grid-template-columns: 1fr; }
    .cp-why-photo { margin-bottom: 1.5rem; }
  }
  @media (max-width: 560px) {
    .cp-cred-grid { grid-template-columns: 1fr; }
    .cp-section, .cp-phase { padding: 3.5rem 0; }
    .cp-converge { flex-direction: column; }
    .cp-converge-arrow { transform: rotate(90deg); }
  }
`;

const CulturePractice = () => {
  usePageMeta({
    title: "Culture Consulting · The Four-Phase Dreamscope Practice",
    description:
      "Inspire, Discover, Build, Implement. An end-to-end culture practice for companies scaling fast, run by an operator with 20+ years, 9 of them across Asia.",
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
    <div className="cp-page">
      {/* A - HERO */}
      <header className="cp-hero">
        <div className="cp-wrap cp-hero-inner">
          <div>
            <span className="cp-kicker">Dreamscope · The Culture Practice</span>
            <h1>Build the place people want to do their best work.</h1>
            <p className="cp-hero-sub">
              An end-to-end culture practice for companies that are scaling,
              scaling fast, or stuck. Built from 20+ years of operating, 9 of
              them across Asia, and refined in the work itself.
            </p>
            <div className="cp-hero-btns">
              <a className="cp-btn teal" href={DISCOVERY}>
                Take the 15-minute discovery →
              </a>
              <a className="cp-btn outline" href="#framework">
                See how it works ↓
              </a>
            </div>
          </div>
          <div className="cp-hero-photo">
            <img src={heroTalk} alt="Joe Black presenting at a leadership event" />
          </div>
        </div>
      </header>

      {/* B - CREDIBILITY STRIP */}
      <div className="cp-cred">
        <div className="cp-wrap">
          <div className="cp-cred-grid">
            <div>
              <span className="cp-cred-num">9 yrs</span>
              <span className="cp-cred-label">
                Building culture across Vietnam, Cambodia, India, and Japan
              </span>
            </div>
            <div>
              <span className="cp-cred-num">7 to 10,000+</span>
              <span className="cp-cred-label">
                The range of company sizes built within, startup to enterprise
              </span>
            </div>
            <div>
              <span className="cp-cred-num">8 cities</span>
              <span className="cp-cred-label">
                Where Christina's scaled, 50 to 500+ employees
              </span>
            </div>
            <div>
              <span className="cp-cred-num">260+</span>
              <span className="cp-cred-label">
                Culture-led SOPs built so the work runs on its own
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* C - COMPANY LOGO STRIP */}
      <section className="cp-logos">
        <div className="cp-wrap">
          <div className="cp-logos-eyebrow">Where the practice has been built</div>
          <div className="cp-logos-row">
            {COMPANY_LOGOS.map((logo) => (
              <img
                key={logo.alt}
                className="cp-logo"
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                style={logo.scale ? { height: `${Math.round(32 * logo.scale)}px` } : undefined}
              />
            ))}
          </div>
          <p className="cp-logos-note">
            Direct operating roles and independent consulting across these
            companies and others.
          </p>
        </div>
      </section>

      {/* D - THE PREMISE */}
      <section className="cp-section cp-premise" id="premise">
        <div className="cp-wrap">
          <div className="cp-premise-grid">
            <div className="cp-premise-text">
              <div className="cp-label">The premise</div>
              <h2 className="cp-title">
                People who like what they do, do it a lot better.
              </h2>
              <p>
                I've spent my career inside companies trying to grow fast
                without losing what made them good. Pizza 4P's through 5
                countries and 3,700 people. Christina's from 50 to 500+ people
                across 8 cities. Seller Candy from 7 to 70.
              </p>
              <p>
                Every one of them taught me the same thing. The companies that
                hold together as they scale are the ones where the culture is{" "}
                <strong>actually built, not posted on a wall</strong>. The ones
                that don't are the ones that copied a values list off another
                company's website.
              </p>
              <p>Dreamscope is the practice for the first kind.</p>
            </div>
            <div className="cp-pullout">
              Culture is behavior. Everything else is just a nice idea.
            </div>
          </div>
        </div>
      </section>

      {/* E - THE DS FRAMEWORK */}
      <section className="cp-section cp-framework-intro" id="framework">
        <div className="cp-wrap">
          <div className="cp-label">The DS Framework</div>
          <h2 className="cp-title">Four phases. One practice.</h2>
          <p className="cp-sub">
            Run as one engagement, or any single phase on its own. The shape
            stays the same. Get the people in, find the truth, build what holds,
            and make it live.
          </p>
          <div className="cp-stepper">
            <div className="cp-step"><span className="cp-step-num">01</span><span className="cp-step-name">Inspire</span></div>
            <div className="cp-step"><span className="cp-step-num">02</span><span className="cp-step-name">Discover</span></div>
            <div className="cp-step"><span className="cp-step-num">03</span><span className="cp-step-name">Build or Refresh</span></div>
            <div className="cp-step"><span className="cp-step-num">04</span><span className="cp-step-name">Implement</span></div>
          </div>
        </div>
      </section>

      {/* Phase 1 - Inspire */}
      <section className="cp-phase light">
        <div className="cp-wrap">
          <div className="cp-split">
            <div>
              <div className="cp-phase-eyebrow">Phase 01 · Inspire</div>
              <h3>Get the people into the work.</h3>
              <p className="cp-phase-lead">
                Culture work fails when people are told what it is instead of
                pulled into building it. The Inspire phase is where the
                leadership team gets clear on what culture actually is, what it
                isn't, and why it matters for the company they're trying to
                build. It happens twice. Once at the start, with the founder and
                leadership. Again later, when the work has matured enough to roll
                out to middle management.
              </p>
            </div>
            <div className="cp-split-media">
              <div className="cp-media">
                <img src={inspirePhoto} alt="Participants in an active culture workshop discussion" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="cp-pillars">
            <div className="cp-pillar">
              <h4>Leadership Inspiration</h4>
              <p>A working session, not a lecture. The leadership team sees the case for culture in their own language and their own context.</p>
            </div>
            <div className="cp-pillar">
              <h4>Why it matters</h4>
              <p>The 5 I's of motivation, Self-Determination Theory, the 5 Why's. Tools that make the case from the human reasons people do their best work, not from a poster.</p>
            </div>
            <div className="cp-pillar">
              <h4>Second-wave Inspire</h4>
              <p>Once the values and the playbook exist, the same session runs for middle managers. They live it day to day. Without their buy-in, the work doesn't land.</p>
            </div>
          </div>
          <div className="cp-deliv">
            <div className="cp-deliv-title">What it produces</div>
            <ul className="cp-deliv-list">
              <li>Leadership Inspiration Workshop</li>
              <li>Train-the-Trainer cascade for middle-management Inspire</li>
              <li>Inspiration Workshop materials built per company</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phase 2 - Discover */}
      <section className="cp-phase dark">
        <div className="cp-wrap">
          <div className="cp-phase-eyebrow">Phase 02 · Discover</div>
          <h3>Find the truth that's already in the building.</h3>
          <p className="cp-phase-lead">
            Most companies don't lack data. They lack the means to turn it into
            something they can act on. The Discover phase pulls the truth out of
            three layers, employees, leaders, and frontline teams, and converges
            them, so what leadership believes and what the floor lives can be
            compared directly. The Culture Engine is the tool that does this
            layer. It's why we built it.
          </p>
          <div className="cp-converge">
            <div className="cp-converge-sources">
              <div className="cp-src"><span className="cp-src-k">Layer one</span><span className="cp-src-v">Employee surveys</span></div>
              <div className="cp-src"><span className="cp-src-k">Layer two</span><span className="cp-src-v">Leadership interviews</span></div>
              <div className="cp-src"><span className="cp-src-k">Layer three</span><span className="cp-src-v">Frontline focus groups</span></div>
            </div>
            <div className="cp-converge-arrow">→</div>
            <div className="cp-converge-target">
              <span className="cp-tg-num">19</span>
              <span className="cp-tg-label">research-validated drivers of workplace happiness. Every layer classified against the same framework.</span>
            </div>
          </div>
          <div className="cp-deliv">
            <div className="cp-deliv-title">What it produces</div>
            <ul className="cp-deliv-list">
              <li>A State of Culture report: three data layers converged into one picture, with year-over-year and division-level views</li>
              <li>A leader-by-leader profile, each quantified with a leadership score against the framework and, where available, the company's own values and competencies</li>
              <li>A practice matrix: the best practices already working inside the company, mapped to its goals</li>
              <li>A queryable knowledge base leadership can ask questions of, with cited evidence</li>
              <li>A co-created action strategy: specific projects, named owners, and 90-day targets</li>
            </ul>
          </div>
          <p className="cp-phase-pullout">
            Three independent sources. One framework. Where they agree,
            confidence is high. Where they diverge, the divergence is itself the
            finding, and what gets built next is decided by data, not
            assumption.
          </p>
          <Link to="/culture-engine" className="cp-chip-link">
            The Culture Engine is the deep dive on this phase →
          </Link>
        </div>
      </section>

      {/* Phase 3 - Build / Refresh */}
      <section className="cp-phase cream">
        <div className="cp-wrap">
          <div className="cp-split rev">
            <div className="cp-split-media">
              <div className="cp-media">
                <img src={buildPhoto} alt="Joe Black running a hands-on training session" loading="lazy" decoding="async" />
              </div>
            </div>
            <div>
              <div className="cp-phase-eyebrow">Phase 03 · Build or Refresh</div>
              <h3>Build what isn't there. Fix what was built wrong.</h3>
              <p className="cp-phase-lead">
                Some companies have nothing yet. Some have things that don't fit
                how they actually operate, values copied from another company,
                definitions that were never made concrete, a North Star that
                doesn't survive contact with a customer. And some have values
                that are genuinely lived but were never made operational. The
                Discover evidence says which job it is, and you make the call
                with that evidence on the table. Then Build or Refresh walks the
                foundation back to first principles and rebuilds only what needs
                rebuilding.
              </p>
            </div>
          </div>

          <div className="cp-chain">
            <div className="cp-chain-node">Vision</div>
            <div className="cp-chain-arrow">→</div>
            <div className="cp-chain-node">Mission</div>
            <div className="cp-chain-arrow">→</div>
            <div className="cp-chain-node">Values</div>
            <div className="cp-chain-arrow">→</div>
            <div className="cp-chain-node">Value Definitions</div>
            <div className="cp-chain-arrow">→</div>
            <div className="cp-chain-node">Value Actions</div>
            <div className="cp-chain-arrow">→</div>
            <div className="cp-chain-node">North Star</div>
          </div>

          <div className="cp-chain-grid">
            <div className="cp-chain-item">
              <h4>Vision</h4>
              <p>Why the company exists long term. Written for the team, and daring enough that someone could disagree.</p>
            </div>
            <div className="cp-chain-item">
              <h4>Mission</h4>
              <p>Present tense: what you deliver and what makes you different. The lever that converts vision into work.</p>
            </div>
            <div className="cp-chain-item">
              <h4>Values</h4>
              <p>Behaviors, not word-picking. The whole company feeds the draft, then comes the cut: five values, seven at the ceiling, because focus on too many things is focus on nothing.</p>
            </div>
            <div className="cp-chain-item">
              <h4>Value Definitions</h4>
              <p>What each value actually means here, built from the teams' own stories so the definitions carry the company's fingerprints. Generic values mean nothing.</p>
            </div>
            <div className="cp-chain-item">
              <h4>Value Actions</h4>
              <p>Two to five observable behaviors per value, written per division, because a value looks different on a factory line than in an office.</p>
            </div>
            <div className="cp-chain-item">
              <h4>North Star</h4>
              <p>The one line each team carries into a customer interaction, simple enough to use under pressure. It works internally too. The internal customer of HR is the rest of the company.</p>
            </div>
          </div>

          <div className="cp-callout">
            The output is the <span>Culture Playbook</span>. The field guide that
            turns the foundation into daily practice.
            <p className="cp-callout-body">
              Inside: the values with their definitions, each division's North
              Star, and the teams' own values-in-action stories. More than half
              of it is application, culture in hiring, onboarding, feedback,
              recognition, and meetings. Two versions ship, a workshop takeaway
              and a sendable edition for everyone who wasn't in the room.
            </p>
          </div>
        </div>
      </section>

      {/* Phase 4 - Implement */}
      <section className="cp-phase light">
        <div className="cp-wrap">
          <div className="cp-split">
            <div>
              <div className="cp-phase-eyebrow">Phase 04 · Implement</div>
              <h3>Live it. Then sustain it.</h3>
              <p className="cp-phase-lead">
                The culture moves off the page and into how Monday morning
                actually feels. Then the systems keep it growing. The rollout
                runs on quick wins: easiest first, so visible wins land from day
                one while the bigger systems build, in an order derived from
                your data and your goal, not a template. If you're not growing,
                you're dying. Culture is no different.
              </p>
            </div>
            <div className="cp-split-media">
              <div className="cp-media">
                <img src={implementPhoto} alt="A company team-building event in full swing" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
          <div className="cp-duo">
            <div className="cp-duo-col">
              <h4>Live</h4>
              <p className="cp-duo-lead">Day-to-day implementation. The first roll, where culture moves from a binder into the work.</p>
              <ul>
                <li>Recognition as an on-the-spot habit: in the moment, value named, story attached. Designed for the story, not the prize</li>
                <li>Recognition as a program: nomination-by-story monthly awards feeding quarterly and annual</li>
                <li>Middle managers as the lead carriers of culture: each gets their own team's culture data and a simple protocol for acting on it</li>
                <li>Rockstar identification and utilization: find who's already winning, make their methods the standard</li>
                <li>Culture-led meetings and town halls: connection opportunities, not calendar debris</li>
                <li>Culture-led training</li>
              </ul>
            </div>
            <div className="cp-duo-col">
              <h4>Sustain</h4>
              <p className="cp-duo-lead">The ongoing systems that keep culture growing instead of decaying.</p>
              <ul>
                <li>Culture Engine Quarterly: eNPS each quarter, about 30 seconds per employee, plus the few deep-dive questions the last round earned</li>
                <li>Every initiative scored by the next round: KPIs tell you whether it's working, your people tell you why</li>
                <li>L&amp;D and SOPs built around the why, not just the how</li>
                <li>Values in performance reviews, weighted heavily enough to move promotions, raises, and improvement plans</li>
                <li>Values-based hiring and onboarding, so culture is screened in at the door</li>
                <li>KPI and metric design that treats culture as an input, not a separate column</li>
                <li>Strategic goal-setting at every level, with culture as a strategic input</li>
              </ul>
            </div>
          </div>
          <p className="cp-phase-pullout">
            Culture is strategic. Treated as a system, it compounds. Treated as a
            poster, it fades. A diagnosis tells you where you are. The quarterly
            loop tells you whether you're moving.
          </p>
        </div>
      </section>

      {/* F - THE CULTURE PLAYBOOK */}
      <section className="cp-section cp-playbook">
        <div className="cp-wrap">
          <div className="cp-label">The bridge artifact</div>
          <h2 className="cp-title">The Culture Playbook.</h2>
          <p className="cp-sub">
            The field guide that turns the foundation into how the company
            actually behaves. Values, definitions, North Star, day-to-day
            decisions, recruitment, feedback, recognition, meetings. One
            operating document the whole company runs against.
          </p>
          <div className="cp-playbook-cards">
            <div className="cp-pb-card">
              <div className="cp-pb-icon">◆</div>
              <h4>Values, defined</h4>
              <p>Each value with its definition and the concrete actions that make it real at your company.</p>
            </div>
            <div className="cp-pb-card">
              <div className="cp-pb-icon">★</div>
              <h4>North Stars in the moment</h4>
              <p>What every team carries into customer interactions and into how they treat each other.</p>
            </div>
            <div className="cp-pb-card">
              <div className="cp-pb-icon">▣</div>
              <h4>Operational guidance</h4>
              <p>Day-to-day decisions, recruitment, feedback, recognition, meetings. How to actually run on this.</p>
            </div>
          </div>
        </div>
      </section>

      {/* G - WHY DREAMSCOPE */}
      <section className="cp-section cp-why" id="why-dreamscope">
        <div className="cp-wrap">
          <div className="cp-why-grid">
            <div className="cp-why-text">
              <div className="cp-label">Why Dreamscope</div>
              <h2 className="cp-title">An operator, not a consultant.</h2>
              <p>
                I'm an operator who's spent 20+ years building the systems that
                let companies scale. Pizza 4P's through 5 countries and 3,700
                people. Seller Candy from 7 to 70 and 6x revenue. Christina's
                from 50 to 500+ people across 8 cities.
              </p>
              <p>
                A consultant hands you a deck and wishes you luck. I build the
                culture into how the company actually runs, the meetings, the
                reviews, the hiring, the recognition, the daily decisions, so it
                lives in the work instead of sitting in a binder. Then I build the
                systems that keep it going, so your team sustains its own culture
                long after I'm gone.
              </p>
              <p className="cp-why-pullout">
                My job is to inspire people into purpose-driven action, then leave
                behind the systems that keep it alive without me.
              </p>
            </div>
            <div>
              <div className="cp-why-photo">
                <img src={joeBlackPhoto} alt="Joe Black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* I - WHO THIS IS FOR */}
      <section className="cp-section cp-fit" id="who-this-is-for">
        <div className="cp-wrap">
          <div className="cp-label">Is this for you?</div>
          <h2 className="cp-title">
            Companies growing fast enough that culture starts to slip.
          </h2>
          <div className="cp-fit-tags">
            <span className="cp-fit-tag">200 to 10,000 employees</span>
            <span className="cp-fit-tag">Multi-location or single-site</span>
            <span className="cp-fit-tag">Retail &amp; Hospitality</span>
            <span className="cp-fit-tag">F&amp;B</span>
            <span className="cp-fit-tag">Services</span>
            <span className="cp-fit-tag">Corporate</span>
            <span className="cp-fit-tag">Founder-led or institutional</span>
            <span className="cp-fit-tag">Tried things that didn't stick</span>
            <span className="cp-fit-tag">Scaling fast across a region</span>
          </div>
        </div>
      </section>

      {/* J - HOW WE START */}
      <section className="cp-section cp-engage" id="engagement">
        <div className="cp-wrap">
          <div className="cp-label">How we start</div>
          <h2 className="cp-title">Wherever you're starting from.</h2>
          <p className="cp-engage-lead">
            There's no template. Every company is different, and every one is
            starting from a different place. So the first thing I do is sit down
            and listen to what's actually going on. From there we work out what
            the work should be, and we align on it together before anything
            starts. Wherever you are, that's where we begin.
          </p>
        </div>
      </section>

      {/* K - CLOSING CTA */}
      <section className="cp-cta" id="contact">
        <div className="cp-wrap">
          <h2>Want to know where to start?</h2>
          <p>
            The discovery questionnaire takes about 15 minutes. Eight things
            culture work could change for you. Pick the three that matter most,
            and answer three questions on where the work would fit. We read every
            one.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
            <a className="cp-btn teal" href={DISCOVERY}>
              Take the culture discovery →
            </a>
          </div>
          <div className="cp-cta-email">
            Or email directly: <a href="mailto:joe@dreamscope.win?subject=Dreamscope%20Culture%20-%20Let's%20talk">joe@dreamscope.win</a>
          </div>
        </div>
      </section>

      {/* L - FOOTER */}
      <footer className="cp-footer">
        <p>
          Dreamscope Consulting ·{" "}
          <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a> ·{" "}
          <a href="https://www.linkedin.com/in/joevblack" target="_blank" rel="noreferrer">
            LinkedIn
          </a>{" "}
          · <Link to="/#about">About</Link> ·{" "}
          <Link to="/insights">Insights</Link> · © 2026
        </p>
      </footer>
    </div>
  );
};

export default CulturePractice;
