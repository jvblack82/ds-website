import { useEffect } from "react";
import { Link } from "react-router-dom";
import joeBlackPhoto from "@/assets/joe-black.jpg";
import beachCircle from "@/assets/landing-beach-circle.jpg";
import { COMPANY_LOGOS } from "@/data/companyLogos";

const css = `
  :root {
    --dark: #1E2B3A;
    --teal: #0C7C8A;
    --teal-light: #0E96A6;
    --caramel: #B5895A;
    --caramel-deep: #9C7144;
    --cream: #F7F4EF;
    --sand: #EDE8E0;
    --warm-white: #FDFCFA;
    --body: #3A3A3A;
    --muted: #7A7A7A;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .land-page {
    font-family: 'DM Sans', sans-serif;
    color: var(--body);
    background: var(--warm-white);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  .land-page * { box-sizing: border-box; }
  .land-wrap { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

  /* HERO */
  .land-hero {
    background: var(--dark);
    color: #fff;
    padding: 5rem 0 5.5rem;
    position: relative;
    overflow: hidden;
  }
  .land-hero::after {
    content: '';
    position: absolute;
    top: -40%; right: -15%;
    width: 620px; height: 620px;
    background: radial-gradient(circle, rgba(12,124,138,0.18) 0%, transparent 70%);
    border-radius: 50%;
  }
  .land-hero-inner { position: relative; z-index: 1; }
  .land-kicker {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--teal-light);
    margin-bottom: 1.4rem;
  }
  .land-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.6rem, 6vw, 4.2rem);
    line-height: 1.08;
    font-weight: 400;
    margin-bottom: 1.5rem;
    max-width: 16ch;
  }
  .land-hero p.land-sub {
    font-size: 1.18rem;
    color: rgba(255,255,255,0.78);
    max-width: 640px;
    line-height: 1.7;
    margin-bottom: 2.6rem;
  }
  .land-hero-btns { display: flex; flex-wrap: wrap; gap: 1rem; }
  .land-btn {
    display: inline-block;
    padding: 0.95rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: transform 0.2s, background 0.2s;
  }
  .land-btn.teal { background: var(--teal); color: #fff; }
  .land-btn.teal:hover { background: var(--teal-light); transform: translateY(-1px); }
  .land-btn.caramel { background: var(--caramel); color: #fff; }
  .land-btn.caramel:hover { background: var(--caramel-deep); transform: translateY(-1px); }
  .land-btn.white-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.5); }
  .land-btn.white-outline:hover { background: #fff; color: var(--dark); transform: translateY(-1px); }

  /* CREDIBILITY BAR */
  .land-cred {
    background: var(--cream);
    padding: 3rem 0;
    border-bottom: 1px solid var(--sand);
  }
  .land-cred-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
  }
  .land-cred-num {
    font-family: 'DM Serif Display', serif;
    font-size: 2.4rem;
    color: var(--dark);
    display: block;
    margin-bottom: 0.4rem;
    line-height: 1;
  }
  .land-cred-label { font-size: 0.86rem; color: var(--muted); line-height: 1.5; }

  /* COMPANY LOGO STRIP */
  .land-logos { background: var(--cream); padding: 0 0 3rem; border-bottom: 1px solid var(--sand); }
  .land-logos-eyebrow { text-align: center; font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin-bottom: 1.8rem; }
  .land-logos-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 2.2rem 2.6rem; }
  .land-logo { height: 30px; width: auto; max-width: 135px; object-fit: contain; filter: grayscale(100%); opacity: 0.5; transition: filter 0.3s, opacity 0.3s; }
  .land-logo:hover { filter: grayscale(0%); opacity: 1; }

  /* TWO PRACTICES */
  .land-practices { padding: 5.5rem 0; background: var(--warm-white); }
  .land-practices-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .land-practice {
    display: block;
    text-decoration: none;
    color: inherit;
    background: #fff;
    border: 1px solid var(--sand);
    border-top: 4px solid var(--teal);
    border-radius: 14px;
    padding: 2.5rem;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }
  .land-practice:hover { transform: translateY(-3px); box-shadow: 0 16px 40px -18px rgba(30,43,58,0.25); }
  .land-practice.aim { border-top-color: var(--caramel); }
  .land-practice .lp-eyebrow {
    font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.8rem;
  }
  .land-practice.ce .lp-eyebrow { color: var(--teal); }
  .land-practice.aim .lp-eyebrow { color: var(--caramel); }
  .land-practice h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.8rem; font-weight: 400; color: var(--dark); margin-bottom: 1rem; line-height: 1.15;
  }
  .land-practice p { font-size: 1rem; color: var(--body); margin-bottom: 1rem; line-height: 1.65; }
  .land-practice p.lp-detail { font-size: 0.92rem; color: var(--muted); }
  .land-practice .lp-more { font-weight: 600; font-size: 0.95rem; }
  .land-practice.ce .lp-more { color: var(--teal); }
  .land-practice.aim .lp-more { color: var(--caramel); }

  /* PHOTO BAND */
  .land-band { line-height: 0; }
  .land-band img {
    width: 100%;
    height: clamp(240px, 34vw, 440px);
    object-fit: cover;
    object-position: 50% 72%;
    display: block;
  }

  /* ABOUT */
  .land-about { background: var(--cream); padding: 5.5rem 0; }
  .land-about-inner { max-width: 760px; margin: 0 auto; text-align: center; }
  .land-about-photo {
    width: 128px; height: 128px; margin: 0 auto 2rem; border-radius: 50%;
    overflow: hidden; border: 4px solid var(--warm-white); box-shadow: 0 10px 30px -12px rgba(30,43,58,0.35);
  }
  .land-about-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .land-about h2 { font-family: 'DM Serif Display', serif; font-size: 2rem; font-weight: 400; color: var(--dark); margin-bottom: 0.8rem; }
  .land-about .land-about-quote { font-size: 1.2rem; font-style: italic; color: var(--teal); margin-bottom: 2rem; }
  .land-about p { font-size: 1.02rem; color: var(--body); line-height: 1.75; margin-bottom: 1.1rem; max-width: 640px; margin-left: auto; margin-right: auto; }
  .land-about p strong { color: var(--dark); font-weight: 600; }

  /* CLOSING CTA */
  .land-cta { background: var(--dark); color: #fff; text-align: center; padding: 5.5rem 0; }
  .land-cta h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.9rem, 3.5vw, 2.8rem); font-weight: 400; margin-bottom: 1rem; }
  .land-cta p { color: rgba(255,255,255,0.65); font-size: 1.08rem; max-width: 540px; margin: 0 auto 2rem; }
  .land-cta-btns { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
  .land-cta-email { margin-top: 1.4rem; font-size: 0.9rem; color: rgba(255,255,255,0.45); }
  .land-cta-email a { color: var(--teal-light); text-decoration: none; }

  /* FOOTER */
  .land-footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.08); padding: 2rem; text-align: center; }
  .land-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .land-footer a { color: var(--teal-light); text-decoration: none; }

  @media (max-width: 860px) {
    .land-cred-grid { grid-template-columns: repeat(2, 1fr); gap: 1.8rem; }
    .land-practices-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .land-cred-grid { grid-template-columns: 1fr; }
  }
`;

const Landing = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="land-page">
      {/* HERO */}
      <header className="land-hero">
        <div className="land-wrap land-hero-inner">
          <span className="land-kicker">Dreamscope Consulting</span>
          <h1>Two practices. One operator mindset.</h1>
          <p className="land-sub">
            Two parent practices. One operator who's spent 20+ years building the
            systems that let companies scale. Culture, end to end. AI Maestro,
            for any process bottlenecked on one person's expert judgment.
          </p>
          <div className="land-hero-btns">
            <Link className="land-btn teal" to="/culture">
              Explore the Culture Practice →
            </Link>
            <Link className="land-btn caramel" to="/ai-maestro">
              Explore AI Maestro →
            </Link>
          </div>
        </div>
      </header>

      {/* CREDIBILITY BAR */}
      <div className="land-cred">
        <div className="land-wrap">
          <div className="land-cred-grid">
            <div>
              <span className="land-cred-num">20+ yrs</span>
              <span className="land-cred-label">
                Operating and building the systems that let companies scale
              </span>
            </div>
            <div>
              <span className="land-cred-num">40+</span>
              <span className="land-cred-label">
                Pizza 4P's locations across 5 countries
              </span>
            </div>
            <div>
              <span className="land-cred-num">6x</span>
              <span className="land-cred-label">
                Revenue growth steered as interim COO at Seller Candy
              </span>
            </div>
            <div>
              <span className="land-cred-num">4,056</span>
              <span className="land-cred-label">
                Hours a year automated out of the work at Dreamplex
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* COMPANY LOGO STRIP */}
      <section className="land-logos">
        <div className="land-wrap">
          <div className="land-logos-eyebrow">Where the practice has been built</div>
          <div className="land-logos-row">
            {COMPANY_LOGOS.map((logo) => (
              <img
                key={logo.alt}
                className="land-logo"
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                style={logo.scale ? { height: `${Math.round(30 * logo.scale)}px` } : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TWO PRACTICES */}
      <section className="land-practices">
        <div className="land-wrap">
          <div className="land-practices-grid">
            <Link to="/culture" className="land-practice ce">
              <div className="lp-eyebrow">End-to-end culture practice</div>
              <h2>Culture</h2>
              <p>
                Inspire, Discover, Build, Implement. The four-phase Dreamscope
                framework, applied as one engagement or any piece in isolation.
                The Culture Engine is the AI tool that powers the Discover phase.
              </p>
              <p className="lp-detail">
                Vision and values that hold up under pressure. Leadership and
                frontline data converged into a single playbook. Implementation
                that lives in the work, not in a binder.
              </p>
              <span className="lp-more">See the practice →</span>
            </Link>
            <Link to="/ai-maestro" className="land-practice aim">
              <div className="lp-eyebrow">Operator + AI</div>
              <h2>AI Maestro</h2>
              <p>
                I take expert work, break it down, and train AI to do it. Months
                of work becomes days.
              </p>
              <p className="lp-detail">
                Process compression, reporting and insight, the company brain,
                knowledge consolidation, customer-facing intelligence. Five
                categories. One operator who knows where AI gets it right and
                where it gets it wrong.
              </p>
              <span className="lp-more">Read more →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PHOTO BAND */}
      <div className="land-band">
        <img
          src={beachCircle}
          alt="A team seated in a circle on the beach for a morning culture session at a company retreat"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ABOUT */}
      <section className="land-about" id="about">
        <div className="land-wrap">
          <div className="land-about-inner">
            <div className="land-about-photo">
              <img src={joeBlackPhoto} alt="Joe Black" />
            </div>
            <h2>From landscaping to leadership</h2>
            <p className="land-about-quote">
              "Everything works better if people love what they do."
            </p>
            <p>
              Joe spent four years consulting with the internationally
              acclaimed corporate culture transformation specialist, Delivering
              Happiness. He worked with clients such as VPBank, Seller Candy,
              and Sathapana Bank, and served as the Culture and Operations
              Excellence Director at Pizza 4P's, one of the fastest-growing
              restaurant chains in SE Asia, with over 40 locations and 3,700
              employees in 5 countries.
            </p>
            <p>
              Through all of it he found that{" "}
              <strong>everything works better if people love what they do</strong>.
              The company does better, and people live better lives.
            </p>
            <p>
              Joe founded Dreamscope with the mission to{" "}
              <strong>positively impact 100,000 lives</strong> by enabling
              leaders to build high-performing, purpose-driven teams across
              Southeast Asia and beyond by 2030.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="land-cta" id="contact">
        <div className="land-wrap">
          <h2>Let's start with a conversation.</h2>
          <p>
            30 minutes. No pitch. Just understanding what you're dealing with,
            and whether either practice can help.
          </p>
          <div className="land-cta-btns">
            <a className="land-btn teal" href="https://discovery.dreamscope.win/culture">
              Take the Culture discovery →
            </a>
            <a className="land-btn caramel" href="https://discovery.dreamscope.win/ai_maestro">
              Take the AI Maestro discovery →
            </a>
            <a className="land-btn white-outline" href="mailto:joe@dreamscope.win?subject=Dreamscope%20-%20Let's%20talk">
              Book a conversation
            </a>
          </div>
          <div className="land-cta-email">
            Or email directly: <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="land-footer">
        <p>
          Dreamscope Consulting · <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a> ·{" "}
          <a href="https://www.linkedin.com/in/joevblack" target="_blank" rel="noreferrer">
            LinkedIn
          </a>{" "}
          · <Link to="/#about">About</Link> · © 2026
        </p>
      </footer>
    </div>
  );
};

export default Landing;
