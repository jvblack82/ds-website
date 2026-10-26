import { useEffect } from "react";
import { Link } from "react-router-dom";
import joeBlackPhoto from "@/assets/joe-black.jpg";
import heroTalk from "@/assets/culture-hero-talk.jpg";
import inspirePhoto from "@/assets/culture-inspire.jpg";
import buildPhoto from "@/assets/culture-build.jpg";
import implementPhoto from "@/assets/culture-implement.jpg";
import FrameworkMap from "@/components/FrameworkMap";
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
  /* index.css also sets smooth scrolling, so this override has to be explicit */
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }

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

  /* FRAMEWORK (the map styles itself: src/components/FrameworkMap.tsx) */
  .cp-framework { background: var(--warm-white); border-top: 1px solid var(--sand); }
  .cp-framework-cta { margin-top: 2.6rem; }

  /* PHOTOS (one row after the framework, swipeable on a phone) */
  .cp-photos { background: var(--warm-white); padding: 0 0 5rem; }
  .cp-photo-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
  .cp-media { border-radius: 14px; overflow: hidden; box-shadow: 0 18px 44px -22px rgba(30,43,58,0.4); aspect-ratio: 4 / 3; }
  .cp-media img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* HOW WE START steps */
  .cp-method { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; margin-top: 2rem; }
  .cp-method-step { border-top: 2px solid var(--teal-light); padding-top: 1rem; }
  .cp-method-num { font-family: 'DM Serif Display', serif; color: var(--teal-light); font-size: 1.3rem; }
  .cp-method-name { color: #fff; font-weight: 600; font-size: 1.1rem; margin: 0.3rem 0 0.5rem; }
  .cp-method-desc { color: rgba(255,255,255,0.72); font-size: 0.98rem; line-height: 1.6; margin: 0; }
  @media (max-width: 820px) { .cp-method { grid-template-columns: 1fr; } }

  .cp-chip-link {
    display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 2rem;
    background: var(--accent-bg); color: var(--teal); border-radius: 50px;
    padding: 0.7rem 1.4rem; font-weight: 600; font-size: 0.95rem; text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .cp-chip-link:hover { background: #fff; transform: translateY(-1px); }

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
    .cp-premise-grid, .cp-why-grid { grid-template-columns: 1fr; gap: 2rem; }
    .cp-why-photo { margin-bottom: 1.5rem; }

    /* Photos become a swipeable row that runs to the screen edges */
    .cp-photo-row {
      display: flex; gap: 0.9rem; overflow-x: auto; scroll-snap-type: x mandatory;
      margin: 0 -2rem; padding: 0 2rem 0.5rem; scrollbar-width: none;
    }
    .cp-photo-row::-webkit-scrollbar { display: none; }
    .cp-photo-row .cp-media { flex: 0 0 78%; scroll-snap-align: center; }
  }
  @media (max-width: 560px) {
    .cp-cred-grid { grid-template-columns: 1fr; }
    .cp-section { padding: 3.5rem 0; }
  }
`;

const CulturePractice = () => {
  usePageMeta({
    title: "Culture Consulting · The Four-Phase Dreamscope Practice",
    description:
      "Discover, Inspire, Build or Refresh, Implement. An end-to-end culture practice for companies scaling fast, run by an operator with 20 years running teams, the last ten in Vietnam.",
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
              scaling fast, or stuck. Built from 20 years of running teams, the
              last ten in Vietnam, and refined in the work itself.
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
              <span className="cp-cred-num">10 yrs</span>
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
                width={logo.width}
                height={logo.height}
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
                Everything works better if people love what they do.
              </h2>
              <p>
                I've spent my career inside companies trying to grow fast
                without losing what made them good. Pizza 4P's through 4
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

      {/* E - THE DREAMSCOPE FRAMEWORK */}
      <section className="cp-section cp-framework" id="framework">
        <div className="cp-wrap">
          <FrameworkMap />
          <div className="cp-framework-cta">
            <a className="cp-btn teal" id="framework-discovery" href={DISCOVERY}>
              Get a free read on your culture →
            </a>
          </div>
        </div>
      </section>

      {/* F - PHOTOS FROM THE WORK */}
      <div className="cp-photos">
        <div className="cp-wrap">
          <div className="cp-photo-row">
            <div className="cp-media">
              <img src={inspirePhoto} alt="Participants in an active culture workshop discussion" loading="lazy" decoding="async" />
            </div>
            <div className="cp-media">
              <img src={buildPhoto} alt="Joe Black running a hands-on training session" loading="lazy" decoding="async" />
            </div>
            <div className="cp-media">
              <img src={implementPhoto} alt="A company team-building event in full swing" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>

      {/* G - WHY DREAMSCOPE */}
      <section className="cp-section cp-why" id="why-dreamscope">
        <div className="cp-wrap">
          <div className="cp-why-grid">
            <div className="cp-why-text">
              <div className="cp-label">Why Dreamscope</div>
              <h2 className="cp-title">An operator, not a consultant.</h2>
              <p>
                I'm an operator who's spent 20 years building the systems that
                let companies scale. Pizza 4P's through 4 countries and 3,700
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
          <h2 className="cp-title">Listen first. Then build.</h2>
          <p className="cp-engage-lead">
            There's no template. Every company is different, and every one is
            starting from a different place. So the first thing I do is sit down
            and listen to what's actually going on, before a word about what to
            build. It runs in three passes.
          </p>
          <div className="cp-method">
            <div className="cp-method-step">
              <div className="cp-method-num">1</div>
              <p className="cp-method-name">Listen</p>
              <p className="cp-method-desc">
                I sit down and learn what's really going on. What's working, what
                people actually feel, where the culture is quietly costing you.
              </p>
            </div>
            <div className="cp-method-step">
              <div className="cp-method-num">2</div>
              <p className="cp-method-name">Reflect</p>
              <p className="cp-method-desc">
                I come back with what I heard and we sharpen it together. This is
                where the real problem separates from the obvious one.
              </p>
            </div>
            <div className="cp-method-step">
              <div className="cp-method-num">3</div>
              <p className="cp-method-name">Align</p>
              <p className="cp-method-desc">
                We agree on what the work should be and where it starts, together,
                before anything begins. Wherever you are, that's where we begin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* K - CLOSING CTA */}
      <section className="cp-cta" id="contact">
        <div className="cp-wrap">
          <h2>Get a free read on where your culture is quietly costing you.</h2>
          <p>
            Fifteen minutes: eight things culture work could change, pick the
            three that matter most, three questions on where the work would fit.
            We read every one and come back within two working days with what
            we'd look at first. No pitch.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
            <a className="cp-btn teal" href={DISCOVERY}>
              Take the culture discovery →
            </a>
          </div>
          <Link to="/check/culture" className="cp-chip-link">
            Take the 2-minute culture check →
          </Link>
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
