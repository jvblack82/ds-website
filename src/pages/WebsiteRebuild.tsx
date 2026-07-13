import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const css = `
  :root {
    --wr-dark: #1E2B3A;
    --wr-caramel: #B5895A;
    --wr-caramel-deep: #9C7144;
    --wr-cream: #FBF8F1;
    --wr-white: #FFFFFF;
    --wr-body: #4A4036;
    --wr-muted: #8A7E70;
    --wr-line: #E7DECF;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .wr-page {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--wr-body);
    background: var(--wr-cream);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  .wr-page * { box-sizing: border-box; }

  .wr-wrap { max-width: 1080px; margin: 0 auto; padding: 0 2rem; }

  .wr-kicker {
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--wr-caramel);
  }

  /* TOP BAND */
  .wr-topband {
    background: #F6EBDD;
    border-bottom: 1px solid rgba(156,113,68,0.25);
    padding: 0.7rem 0;
  }
  .wr-topband p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--wr-body);
    margin: 0;
    text-align: center;
  }
  .wr-topband a {
    color: var(--wr-caramel-deep);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid var(--wr-caramel);
    padding-bottom: 1px;
    white-space: nowrap;
  }
  .wr-topband a:hover { color: var(--wr-caramel); }

  /* HERO */
  .wr-hero {
    background: var(--wr-dark);
    padding: 5rem 0 5.5rem;
    position: relative;
    overflow: hidden;
  }
  .wr-hero::after {
    content: '';
    position: absolute;
    top: -45%; right: -10%;
    width: 620px; height: 620px;
    background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 70%);
    border-radius: 50%;
  }
  .wr-hero .wr-wrap { position: relative; z-index: 1; }
  .wr-hero .wr-kicker { display: block; margin-bottom: 1.4rem; }
  .wr-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: #fff;
    font-size: clamp(2.8rem, 6vw, 4.6rem);
    line-height: 1.05;
    max-width: 15ch;
    margin-bottom: 1.6rem;
  }
  .wr-hero .wr-dek {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.78);
    max-width: 620px;
    margin-bottom: 2.4rem;
  }
  .wr-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
  .wr-btn {
    display: inline-block;
    background: var(--wr-caramel);
    color: #fff;
    padding: 0.95rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s, transform 0.2s;
  }
  .wr-btn:hover { background: var(--wr-caramel-deep); transform: translateY(-1px); }
  .wr-hero .wr-link {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.98rem;
    border-bottom: 1px solid var(--wr-caramel);
    padding-bottom: 2px;
  }
  .wr-hero .wr-link:hover { color: var(--wr-caramel); }
  .wr-hero-note {
    margin-top: 1.6rem;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.6);
    max-width: 560px;
  }

  /* SECTIONS */
  .wr-section { padding: 5.5rem 0; }
  .wr-section.on-white { background: var(--wr-white); }
  .wr-section.on-cream { background: var(--wr-cream); }
  .wr-section.on-dark { background: var(--wr-dark); color: rgba(255,255,255,0.8); }

  .wr-snum {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--wr-caramel);
    margin-bottom: 0.6rem;
  }
  .wr-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: var(--wr-dark);
    font-size: clamp(2rem, 4vw, 2.9rem);
    line-height: 1.12;
    margin-bottom: 1.4rem;
    max-width: 20ch;
  }
  .on-dark .wr-h2 { color: #fff; }
  .wr-lead { font-size: 1.12rem; max-width: 660px; margin-bottom: 1.2rem; }
  .wr-body-p { font-size: 1.02rem; max-width: 660px; margin-bottom: 1.1rem; }
  .wr-body-p strong { color: var(--wr-dark); font-weight: 600; }
  .on-dark .wr-body-p strong { color: #fff; }
  .wr-aside { font-size: 0.92rem; font-style: italic; color: var(--wr-muted); max-width: 660px; margin-top: 1.4rem; }
  .wr-live { margin-top: 1.5rem; font-size: 1.05rem; }
  .wr-live a { color: var(--wr-caramel-deep); font-weight: 700; text-decoration: none; border-bottom: 2px solid var(--wr-caramel); padding-bottom: 2px; }
  .wr-live a:hover { color: var(--wr-caramel); }

  .wr-pullout {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2.1rem);
    font-weight: 500;
    font-style: italic;
    color: var(--wr-caramel);
    max-width: 24ch;
    line-height: 1.25;
    margin-top: 2.4rem;
  }

  /* METHOD STEPS */
  .wr-steps { display: flex; align-items: stretch; gap: 0.9rem; flex-wrap: wrap; margin-top: 2rem; }
  .wr-step {
    flex: 1;
    min-width: 240px;
    background: var(--wr-white);
    border: 1px solid var(--wr-line);
    border-top: 3px solid var(--wr-caramel);
    border-radius: 10px;
    padding: 1.5rem 1.5rem 1.4rem;
    box-shadow: 0 14px 34px -24px rgba(30,43,58,0.35);
  }
  .wr-step .sn {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--wr-caramel-deep);
  }
  .wr-step h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--wr-dark);
    margin: 0.3rem 0 0.5rem;
  }
  .wr-step p { font-size: 0.95rem; line-height: 1.55; color: var(--wr-body); margin: 0; }
  .wr-step-arrow { align-self: center; font-size: 1.4rem; color: var(--wr-muted); flex: 0; }

  .wr-speed {
    margin-top: 3rem;
    background: #F6EBDD;
    border: 1px solid rgba(156,113,68,0.35);
    border-radius: 10px;
    padding: 2.2rem 2.4rem;
    text-align: center;
  }
  .wr-speed .sk {
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--wr-caramel-deep);
  }
  .wr-speed .sv {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4.5vw, 3.1rem);
    font-weight: 600;
    color: var(--wr-dark);
    line-height: 1.1;
    margin-top: 0.5rem;
  }

  /* WALK AWAY LIST */
  .wr-keep { list-style: none; margin: 1.5rem 0 0; padding: 0; max-width: 720px; }
  .wr-keep li {
    display: grid;
    grid-template-columns: 1.6rem 1fr;
    gap: 1rem;
    padding: 1.1rem 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    font-size: 1.05rem;
    color: rgba(255,255,255,0.82);
  }
  .wr-keep li:last-child { border-bottom: 1px solid rgba(255,255,255,0.12); }
  .wr-keep .x { color: var(--wr-caramel); font-weight: 600; font-size: 1.1rem; }
  .wr-keep strong { color: #fff; font-weight: 600; }
  .wr-keep-note { margin-top: 1.6rem; font-size: 0.92rem; font-style: italic; color: rgba(255,255,255,0.55); max-width: 640px; }

  /* QUOTE */
  .wr-quote {
    margin-top: 2.8rem;
    max-width: 760px;
    border-left: 3px solid var(--wr-caramel);
    padding: 0.4rem 0 0.4rem 2rem;
    position: relative;
  }
  .wr-quote::before {
    content: '\\201C';
    position: absolute;
    left: 0.9rem;
    top: -1.9rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem;
    color: rgba(181,137,90,0.35);
    line-height: 1;
  }
  .wr-quote blockquote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.35rem, 2.6vw, 1.75rem);
    font-weight: 500;
    font-style: italic;
    line-height: 1.4;
    color: var(--wr-dark);
    margin: 0;
  }
  .wr-quote figcaption { margin-top: 1.1rem; font-size: 0.92rem; color: var(--wr-muted); font-style: normal; }
  .wr-quote figcaption a {
    color: var(--wr-caramel-deep);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid var(--wr-caramel);
  }
  .wr-quote figcaption a:hover { color: var(--wr-caramel); }

  /* CTA */
  .wr-cta-band { background: var(--wr-dark); color: #fff; padding: 5rem 0; text-align: center; }
  .wr-cta-band h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-size: clamp(2.1rem, 4vw, 3rem);
    margin-bottom: 1rem;
    color: #fff;
  }
  .wr-cta-band p { font-size: 1.08rem; color: rgba(255,255,255,0.9); max-width: 580px; margin: 0 auto 2rem; }
  .wr-cta-band .wr-btn-light {
    display: inline-block;
    background: var(--wr-caramel);
    color: #fff;
    padding: 1rem 2.4rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.05rem;
    transition: background 0.2s, transform 0.2s;
  }
  .wr-cta-band .wr-btn-light:hover { background: var(--wr-caramel-deep); transform: translateY(-1px); }
  .wr-cta-email { margin-top: 1.4rem; font-size: 0.92rem; color: rgba(255,255,255,0.55); }
  .wr-cta-email a { color: var(--wr-caramel); text-decoration: none; }

  .wr-footer { background: var(--wr-dark); padding: 2rem; text-align: center; }
  .wr-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .wr-footer a { color: var(--wr-caramel); text-decoration: none; }

  @media (max-width: 820px) {
    .wr-section { padding: 4rem 0; }
    .wr-steps { flex-direction: column; }
    .wr-step-arrow { transform: rotate(90deg); align-self: flex-start; margin-left: 1.4rem; }
  }
`;

const WebsiteRebuild = () => {
  usePageMeta({
    title: "The Self-Updating Website · Off WordPress, SEO Intact",
    description:
      "We rebuild your site into something you own and update by talking to Claude. Your Google ranking carried across, live in about two weeks. Start with a free teardown.",
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
    <div className="wr-page">
      {/* TOP BAND */}
      <div className="wr-topband">
        <div className="wr-wrap">
          <p>
            This whole page is one coaching engagement, end to end.{" "}
            <Link to="/coaching">About AI Coaching →</Link>
          </p>
        </div>
      </div>

      {/* HERO */}
      <header className="wr-hero">
        <div className="wr-wrap">
          <span className="wr-kicker">Dreamscope · Website rebuilds</span>
          <h1>The Self-Updating Website</h1>
          <p className="wr-dek">
            Get your site off WordPress and onto something fast that you own,
            keep your Google ranking, and stop chasing a developer. After this,
            you update your own site just by talking to Claude.
          </p>
          <div className="wr-cta-row">
            <a
              className="wr-btn"
              href="mailto:joe@dreamscope.win?subject=Website%20Teardown"
            >
              Start with a free Website Teardown →
            </a>
            <a className="wr-link" href="#method">
              How it works ↓
            </a>
          </div>
          <p className="wr-hero-note">
            Tell us your site; we come back within 48 hours with what's broken,
            what's worth keeping, and an honest read on the SEO risk.
          </p>
        </div>
      </header>

      {/* 01 THE TRAP */}
      <section className="wr-section on-white">
        <div className="wr-wrap">
          <div className="wr-snum">01 / The trap you're in</div>
          <h2 className="wr-h2">Slow, fragile, and someone else's problem.</h2>
          <p className="wr-lead">
            Your WordPress site is slow, a plugin keeps breaking, an embed is
            dead, and you are a little afraid to touch it. Every change means
            paying someone or waiting on a web guy who may have vanished.
          </p>
          <p className="wr-pullout">
            Agencies sell a prettier version of the same trap: a new site plus
            a monthly retainer.
          </p>
        </div>
      </section>

      {/* 02 WHAT WE DO INSTEAD */}
      <section className="wr-section on-cream">
        <div className="wr-wrap">
          <div className="wr-snum">02 / What we do instead</div>
          <h2 className="wr-h2">A site you own and update by talking to Claude.</h2>
          <p className="wr-lead">
            We rebuild your site into something you own outright and update
            yourself, by talking to Claude.
          </p>
          <p className="wr-pullout">
            The site is the deliverable. Changing it in one sentence is the
            point.
          </p>
        </div>
      </section>

      {/* 03 HOW IT WORKS */}
      <section className="wr-section on-white" id="method">
        <div className="wr-wrap">
          <div className="wr-snum">03 / How it works</div>
          <h2 className="wr-h2">Preserve → Rebuild → Hand Back.</h2>
          <div className="wr-steps">
            <div className="wr-step">
              <div className="sn">Step 1</div>
              <h3>Preserve</h3>
              <p>
                Your Google ranking is the first thing we protect, not the
                last. We map every URL, carry your SEO across, and verify it
                page by page.
              </p>
            </div>
            <div className="wr-step-arrow">→</div>
            <div className="wr-step">
              <div className="sn">Step 2</div>
              <h3>Rebuild</h3>
              <p>
                A modern, fast site on your own accounts, designed around what
                your visitors need, not a template.
              </p>
            </div>
            <div className="wr-step-arrow">→</div>
            <div className="wr-step">
              <div className="sn">Step 3</div>
              <h3>Hand Back</h3>
              <p>
                You walk away owning the repo and a one-prompt update skill.
                Want a change? Tell Claude, it is done.
              </p>
            </div>
          </div>
          <div className="wr-speed">
            <div className="sk">How fast</div>
            <div className="sv">Live in about two weeks.</div>
          </div>
        </div>
      </section>

      {/* 04 WHAT YOU WALK AWAY WITH */}
      <section className="wr-section on-dark">
        <div className="wr-wrap">
          <div className="wr-snum">04 / What you walk away with</div>
          <h2 className="wr-h2">Yours, fast, and intact.</h2>
          <ul className="wr-keep">
            <li>
              <span className="x">×</span>
              <span>
                <strong>A fast site you own.</strong> The repo, the accounts,
                everything.
              </span>
            </li>
            <li>
              <span className="x">×</span>
              <span>
                <strong>Your SEO intact.</strong> The ranking you built carries
                across, verified page by page.
              </span>
            </li>
            <li>
              <span className="x">×</span>
              <span>
                <strong>The power to update it yourself anytime.</strong> Tell
                Claude what you want changed, and it is done.
              </span>
            </li>
          </ul>
          <p className="wr-keep-note">
            Optional: a bespoke interactive assessment as your lead magnet.
          </p>
        </div>
      </section>

      {/* 05 PROOF */}
      <section className="wr-section on-cream">
        <div className="wr-wrap">
          <div className="wr-snum">05 / Proof</div>
          <h2 className="wr-h2">Already running, off WordPress.</h2>
          <p className="wr-lead">
            We just took Betterworks Asia off WordPress and onto a site the
            owner now updates by talking to Claude, with the SEO carried across
            intact.
          </p>
          <p className="wr-live">
            <a
              href="https://betterworks.asia"
              target="_blank"
              rel="noreferrer"
            >
              See it live at betterworks.asia →
            </a>
          </p>
          <p className="wr-aside">
            (And yes, I rebuilt my own site the same way while I played padel.)
          </p>
          <figure className="wr-quote">
            <blockquote>
              Our goal was to update my website automatically and keep it
              updated on a continuous basis, and that's exactly what we built.
              What makes it so useful is that you end up with something you
              can actually keep using going forward.
            </blockquote>
            <figcaption>
              <a
                href="https://www.linkedin.com/in/thijsv1/"
                target="_blank"
                rel="noreferrer"
              >
                Thijs Van Loon MSc.
              </a>
              , Skills Development Facilitator, Betterworks Asia
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="wr-cta-band">
        <div className="wr-wrap">
          <h2>Stop chasing a developer.</h2>
          <p>
            Start with a free Website Teardown. Tell us your site; we come back
            within 48 hours with what's broken, what's worth keeping, and an
            honest read on the SEO risk.
          </p>
          <a
            className="wr-btn-light"
            href="mailto:joe@dreamscope.win?subject=Website%20Teardown"
          >
            Get the free Website Teardown →
          </a>
          <div className="wr-cta-email">
            Or email directly:{" "}
            <a href="mailto:joe@dreamscope.win?subject=Website%20Teardown">
              joe@dreamscope.win
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wr-footer">
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

export default WebsiteRebuild;
