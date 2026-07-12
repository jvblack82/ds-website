import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const css = `
  :root {
    --aco-dark: #1E2B3A;
    --aco-caramel: #B5895A;
    --aco-caramel-deep: #9C7144;
    --aco-cream: #FBF8F1;
    --aco-white: #FFFFFF;
    --aco-body: #4A4036;
    --aco-muted: #8A7E70;
    --aco-line: #E7DECF;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .aco-page {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--aco-body);
    background: var(--aco-cream);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  .aco-page * { box-sizing: border-box; }

  .aco-wrap { max-width: 1080px; margin: 0 auto; padding: 0 2rem; }

  .aco-kicker {
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--aco-caramel);
  }

  /* HERO */
  .aco-hero {
    background: var(--aco-dark);
    padding: 5rem 0 4.5rem;
    position: relative;
    overflow: hidden;
  }
  .aco-hero::after {
    content: '';
    position: absolute;
    top: -45%; right: -10%;
    width: 620px; height: 620px;
    background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 70%);
    border-radius: 50%;
  }
  .aco-hero .aco-wrap { position: relative; z-index: 1; }
  .aco-hero .aco-kicker { display: block; margin-bottom: 1.4rem; }
  .aco-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: #fff;
    font-size: clamp(2.8rem, 6vw, 4.6rem);
    line-height: 1.05;
    max-width: 15ch;
    margin-bottom: 1.6rem;
  }
  .aco-hero .aco-dek {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.78);
    max-width: 640px;
    margin-bottom: 1.8rem;
  }
  .aco-hero-line {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
    color: #fff;
    margin-bottom: 2.2rem;
  }
  .aco-hero-line span { color: var(--aco-caramel); }
  .aco-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
  .aco-btn {
    display: inline-block;
    background: var(--aco-caramel);
    color: #fff;
    padding: 0.95rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s, transform 0.2s;
  }
  .aco-btn:hover { background: var(--aco-caramel-deep); transform: translateY(-1px); }
  .aco-hero .aco-link {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.98rem;
    border-bottom: 1px solid var(--aco-caramel);
    padding-bottom: 2px;
  }
  .aco-hero .aco-link:hover { color: var(--aco-caramel); }

  /* SECTIONS */
  .aco-section { padding: 5.5rem 0; }
  .aco-section.on-white { background: var(--aco-white); }
  .aco-section.on-cream { background: var(--aco-cream); }

  .aco-snum {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--aco-caramel);
    margin-bottom: 0.6rem;
  }
  .aco-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: var(--aco-dark);
    font-size: clamp(2rem, 4vw, 2.9rem);
    line-height: 1.12;
    margin-bottom: 1.4rem;
    max-width: 22ch;
  }
  .aco-lead { font-size: 1.12rem; max-width: 660px; margin-bottom: 1.2rem; }
  .aco-note {
    margin-top: 2rem;
    font-size: 0.92rem;
    font-style: italic;
    color: var(--aco-muted);
    max-width: 660px;
  }
  .aco-note a { color: var(--aco-caramel-deep); font-weight: 600; text-decoration: none; border-bottom: 1px solid var(--aco-caramel); }
  .aco-note a:hover { color: var(--aco-caramel); }

  /* TWO WAYS IN */
  .aco-ways { display: grid; grid-template-columns: 1.25fr 1fr; gap: 1.3rem; margin-top: 1.6rem; }
  .aco-way {
    display: flex;
    flex-direction: column;
    background: var(--aco-white);
    border: 1px solid var(--aco-line);
    border-radius: 10px;
    padding: 1.8rem 1.8rem 1.6rem;
    box-shadow: 0 14px 34px -24px rgba(30,43,58,0.35);
  }
  .aco-way.featured { border-top: 3px solid var(--aco-caramel); }
  .aco-way-spine {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--aco-caramel-deep);
  }
  .aco-way h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.1;
    margin: 0.5rem 0 0;
    color: var(--aco-dark);
  }
  .aco-way p { font-size: 0.96rem; line-height: 1.6; color: var(--aco-body); margin: 0.9rem 0 0; }
  .aco-way p strong { color: var(--aco-dark); font-weight: 600; }
  .aco-way-list { list-style: none; margin: 1.1rem 0 0; padding: 0; }
  .aco-way-list li {
    position: relative;
    padding: 0.45rem 0 0.45rem 1.35rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--aco-body);
    border-top: 1px solid var(--aco-line);
  }
  .aco-way-list li:first-child { border-top: none; }
  .aco-way-list li::before {
    content: "\\2192";
    position: absolute;
    left: 2px;
    color: var(--aco-caramel-deep);
    font-weight: 700;
  }
  .aco-way-spacer { flex: 1; }
  .aco-way-outcome {
    background: var(--aco-cream);
    border-radius: 8px;
    padding: 0.75rem 0.9rem;
    margin: 1.1rem 0 0;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--aco-body);
  }
  .aco-way-outcome strong { color: var(--aco-dark); }
  .aco-way-go {
    display: inline-block;
    align-self: flex-start;
    margin-top: 1rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--aco-caramel-deep);
    text-decoration: none;
    border-bottom: 1px solid var(--aco-caramel);
    padding-bottom: 1px;
  }
  .aco-way-go:hover { color: var(--aco-caramel); }

  /* OUTCOMES MENU */
  .aco-menu { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2.5rem; margin-top: 1.6rem; }
  .aco-mitem {
    display: grid;
    grid-template-columns: 2.1rem 1fr;
    gap: 0.8rem;
    padding: 1.1rem 0;
    border-top: 1px solid var(--aco-line);
  }
  .aco-mitem .mn {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--aco-caramel-deep);
  }
  .aco-mitem h4 { font-size: 1.02rem; font-weight: 600; margin: 0 0 0.25rem; color: var(--aco-dark); }
  .aco-mitem h4 a { color: var(--aco-dark); text-decoration: none; border-bottom: 1px solid var(--aco-caramel); }
  .aco-mitem h4 a:hover { color: var(--aco-caramel-deep); }
  .aco-mitem p { font-size: 0.9rem; line-height: 1.5; color: var(--aco-body); margin: 0; }
  .aco-mbig {
    grid-column: 1 / -1;
    margin-top: 1.6rem;
    background: #F6EBDD;
    border: 1px solid rgba(156,113,68,0.35);
    border-radius: 10px;
    padding: 1.8rem 2rem;
    text-align: center;
  }
  .aco-mbig h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 600;
    color: var(--aco-dark);
    margin: 0;
  }
  .aco-mbig p { font-size: 0.95rem; line-height: 1.5; color: var(--aco-body); margin: 0.5rem 0 0; }

  /* PROOF QUOTE */
  .aco-quote {
    margin-top: 2.6rem;
    max-width: 760px;
    border-left: 3px solid var(--aco-caramel);
    padding: 0.4rem 0 0.4rem 2rem;
    position: relative;
  }
  .aco-quote::before {
    content: '\\201C';
    position: absolute;
    left: 0.9rem;
    top: -1.9rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem;
    color: rgba(181,137,90,0.35);
    line-height: 1;
  }
  .aco-quote blockquote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.35rem, 2.6vw, 1.75rem);
    font-weight: 500;
    font-style: italic;
    line-height: 1.4;
    color: var(--aco-dark);
    margin: 0;
  }
  .aco-quote figcaption { margin-top: 1.1rem; font-size: 0.92rem; color: var(--aco-muted); font-style: normal; }
  .aco-quote figcaption a {
    color: var(--aco-caramel-deep);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid var(--aco-caramel);
  }
  .aco-quote figcaption a:hover { color: var(--aco-caramel); }

  /* WORKED EXAMPLE */
  .aco-example {
    display: block;
    background: var(--aco-white);
    border: 1px solid var(--aco-line);
    border-top: 3px solid var(--aco-caramel);
    border-radius: 10px;
    padding: 1.8rem 2rem 1.7rem;
    margin-top: 1.6rem;
    max-width: 720px;
    text-decoration: none;
    box-shadow: 0 14px 34px -24px rgba(30,43,58,0.35);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .aco-example:hover { transform: translateY(-2px); box-shadow: 0 24px 50px -28px rgba(30,43,58,0.4); }
  .aco-example .ek {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--aco-caramel-deep);
  }
  .aco-example h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--aco-dark);
    margin: 0.4rem 0 0.5rem;
  }
  .aco-example p { font-size: 0.98rem; line-height: 1.6; color: var(--aco-body); margin: 0 0 0.9rem; }
  .aco-example .go { font-size: 0.92rem; font-weight: 600; color: var(--aco-caramel-deep); }

  /* CTA */
  .aco-cta-band { background: var(--aco-dark); color: #fff; padding: 5rem 0; text-align: center; }
  .aco-cta-band h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-size: clamp(2.1rem, 4vw, 3rem);
    margin-bottom: 1rem;
    color: #fff;
  }
  .aco-cta-band p { font-size: 1.08rem; color: rgba(255,255,255,0.9); max-width: 560px; margin: 0 auto 2rem; }
  .aco-cta-band .aco-btn-light {
    display: inline-block;
    background: var(--aco-caramel);
    color: #fff;
    padding: 1rem 2.4rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.05rem;
    transition: background 0.2s, transform 0.2s;
  }
  .aco-cta-band .aco-btn-light:hover { background: var(--aco-caramel-deep); transform: translateY(-1px); }
  .aco-cta-email { margin-top: 1.4rem; font-size: 0.92rem; color: rgba(255,255,255,0.55); }
  .aco-cta-email a { color: var(--aco-caramel); text-decoration: none; }

  .aco-footer { background: var(--aco-dark); padding: 2rem; text-align: center; }
  .aco-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .aco-footer a { color: var(--aco-caramel); text-decoration: none; }

  @media (max-width: 820px) {
    .aco-section { padding: 4rem 0; }
    .aco-ways { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .aco-menu { grid-template-columns: 1fr; }
  }
`;

const AICoaching = () => {
  usePageMeta({
    title: "AI Coaching · One-on-One, In Your Accounts",
    description:
      "You hand Claude real work and learn to run the system yourself. One-on-one in your own accounts, or in a group through the workshops. The self-updating website is one example.",
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
    <div className="aco-page">
      {/* HERO */}
      <header className="aco-hero">
        <div className="aco-wrap">
          <span className="aco-kicker">Dreamscope · AI Coaching</span>
          <h1>An AI coach, not a course.</h1>
          <p className="aco-dek">
            Most people ask AI questions and do the work themselves. Coaching
            moves you to the other side: you hand Claude real work, it comes
            back done, and you learn to run the whole system yourself. Set up
            once, in your accounts, and the possibilities compound from there.
          </p>
          <p className="aco-hero-line">
            The coursework is <span>your actual work</span>.
          </p>
          <div className="aco-cta-row">
            <a
              className="aco-btn"
              href="mailto:joe@dreamscope.win?subject=AI%20Coaching"
            >
              Start a conversation →
            </a>
            <a className="aco-link" href="#ways">
              Two ways in ↓
            </a>
          </div>
        </div>
      </header>

      {/* 01 TWO WAYS IN */}
      <section className="aco-section on-white" id="ways">
        <div className="aco-wrap">
          <div className="aco-snum">01 / Two ways in</div>
          <h2 className="aco-h2">One-on-one, or in a room.</h2>
          <p className="aco-lead">
            Same system, same outcomes. The difference is how many chairs are
            in the session.
          </p>
          <div className="aco-ways">
            <article className="aco-way featured">
              <div className="aco-way-spine">The coaching engagement</div>
              <h3>One-on-one</h3>
              <p>
                Not lessons about AI.{" "}
                <strong>Your work, moving, while you learn to drive.</strong>
              </p>
              <ul className="aco-way-list">
                <li>A clear goal, set together before anything gets built</li>
                <li>Your accounts and your machine. Nothing lives on our side</li>
                <li>Custom learning materials, matched to your level</li>
                <li>Real builds shipped during the engagement, not after it</li>
                <li>Follow-up while it sticks</li>
              </ul>
              <div className="aco-way-spacer" />
              <div className="aco-way-outcome">
                <strong>When it ends, you run the whole system yourself.</strong>{" "}
                That is the point.
              </div>
            </article>
            <article className="aco-way">
              <div className="aco-way-spine">In a group</div>
              <h3>The workshops</h3>
              <p>
                Same outcomes, a room at a time. Four formats, from a half-day
                first win to a monthly alumni loop, every seat working on its
                own real job.
              </p>
              <div className="aco-way-spacer" />
              <Link className="aco-way-go" to="/workshops">
                See the workshops →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 02 THE OUTCOMES MENU */}
      <section className="aco-section on-cream">
        <div className="aco-wrap">
          <div className="aco-snum">02 / The outcomes menu</div>
          <h2 className="aco-h2">
            The outcome is yours to pick. These are the favorites.
          </h2>
          <p className="aco-lead">
            Every engagement starts with your list of jobs you want off your
            plate. This menu exists to seed that list. Any of these
            one-on-one, or in a workshop room.
          </p>
          <div className="aco-menu">
            <div className="aco-mitem">
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
            <div className="aco-mitem">
              <div className="mn">02</div>
              <div>
                <h4>A design system for your brand</h4>
                <p>
                  Every deck, document and one-pager comes out looking like
                  you, without a designer in the loop.
                </p>
              </div>
            </div>
            <div className="aco-mitem">
              <div className="mn">03</div>
              <div>
                <h4>Morning email triage</h4>
                <p>
                  Inbox read, summarized, replies drafted and waiting for your
                  review. Junk flagged.
                </p>
              </div>
            </div>
            <div className="aco-mitem">
              <div className="mn">04</div>
              <div>
                <h4>Reporting that writes itself</h4>
                <p>
                  The weekly or monthly report assembles from your live numbers
                  instead of your Sunday night.
                </p>
              </div>
            </div>
            <div className="aco-mitem">
              <div className="mn">05</div>
              <div>
                <h4>A live business dashboard</h4>
                <p>
                  One page, always current, pulled from the tools you already
                  use.
                </p>
              </div>
            </div>
            <div className="aco-mitem">
              <div className="mn">06</div>
              <div>
                <h4>Meeting capture</h4>
                <p>
                  Recorded, summarized, action items out, the follow-up
                  scheduled before you leave the room.
                </p>
              </div>
            </div>
            <div className="aco-mitem">
              <div className="mn">07</div>
              <div>
                <h4>Your voice, as a skill</h4>
                <p>
                  Drafts that sound like you on the first try. Posts, emails,
                  replies, all of it.
                </p>
              </div>
            </div>
            <div className="aco-mitem">
              <div className="mn">08</div>
              <div>
                <h4>Ask-your-files</h4>
                <p>
                  Your documents organized so Claude answers from them
                  instantly, instead of you digging.
                </p>
              </div>
            </div>
            <div className="aco-mbig">
              <h4>Insert your idea here.</h4>
              <p>
                These eight are seeds, not the catalog. If it is work you want
                off your plate, it is a candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 THE PROOF */}
      <section className="aco-section on-white">
        <div className="aco-wrap">
          <div className="aco-snum">03 / The proof</div>
          <h2 className="aco-h2">He came for a website.</h2>
          <p className="aco-lead">
            Look what he actually got: a clear goal, a working build, and a
            system he keeps using without us.
          </p>
          <figure className="aco-quote">
            <blockquote>
              Joe set a very clear goal for what we were going to do with AI,
              in my case, with Claude. That made a huge difference! Our goal
              was to update my website automatically and keep it updated on a
              continuous basis, and that's exactly what we built. What makes it
              so useful is that you end up with something you can actually keep
              using going forward. I'd wholeheartedly recommend the AI Maestro
              program!
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

      {/* 04 THE WORKED EXAMPLE */}
      <section className="aco-section on-cream">
        <div className="aco-wrap">
          <div className="aco-snum">04 / The worked example</div>
          <h2 className="aco-h2">What one engagement looks like, written up.</h2>
          <Link className="aco-example" to="/website">
            <span className="ek">One coaching engagement, end to end</span>
            <h3>The Self-Updating Website</h3>
            <p>
              Off WordPress, SEO intact, and he updates it himself now. The
              full shape of the work: what got preserved, what got rebuilt,
              and what he walked away owning.
            </p>
            <span className="go">Read the build →</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="aco-cta-band">
        <div className="aco-wrap">
          <h2>Start a conversation.</h2>
          <p>
            Tell me what you want off your plate. If one-on-one fits, we set
            the goal and get to work. If a room fits better, I'll say so.
          </p>
          <a
            className="aco-btn-light"
            href="mailto:joe@dreamscope.win?subject=AI%20Coaching"
          >
            Start a conversation →
          </a>
          <div className="aco-cta-email">
            Or email directly:{" "}
            <a href="mailto:joe@dreamscope.win?subject=AI%20Coaching">
              joe@dreamscope.win
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="aco-footer">
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

export default AICoaching;
