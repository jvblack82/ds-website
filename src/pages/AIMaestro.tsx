import { useEffect } from "react";
import { Link } from "react-router-dom";
import operatorPhoto from "@/assets/aim-operator-title.jpg";
import { usePageMeta } from "@/hooks/usePageMeta";

const css = `
  :root {
    --aim-dark: #1E2B3A;
    --aim-caramel: #B5895A;
    --aim-caramel-deep: #9C7144;
    --aim-cream: #FBF8F1;
    --aim-white: #FFFFFF;
    --aim-body: #4A4036;
    --aim-muted: #8A7E70;
    --aim-line: #E7DECF;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .aim-page {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--aim-body);
    background: var(--aim-cream);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  .aim-page * { box-sizing: border-box; }

  .aim-wrap { max-width: 1080px; margin: 0 auto; padding: 0 2rem; }

  .aim-kicker {
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--aim-caramel);
  }

  .aim-display {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: var(--aim-dark);
    line-height: 1.1;
    letter-spacing: 0.3px;
  }

  /* HERO */
  .aim-hero {
    background: var(--aim-dark);
    padding: 5rem 0 5.5rem;
    position: relative;
    overflow: hidden;
  }
  .aim-hero::after {
    content: '';
    position: absolute;
    top: -45%; right: -10%;
    width: 620px; height: 620px;
    background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 70%);
    border-radius: 50%;
  }
  .aim-hero .aim-wrap { position: relative; z-index: 1; }
  .aim-hero .aim-kicker { display: block; margin-bottom: 1.4rem; }
  .aim-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: #fff;
    font-size: clamp(2.8rem, 6vw, 4.6rem);
    line-height: 1.05;
    max-width: 14ch;
    margin-bottom: 1.6rem;
  }
  .aim-hero .aim-dek {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.78);
    max-width: 600px;
    margin-bottom: 2.4rem;
  }
  .aim-hero .aim-link { color: rgba(255,255,255,0.85); }
  .aim-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; }
  .aim-btn {
    display: inline-block;
    background: var(--aim-caramel);
    color: #fff;
    padding: 0.95rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background 0.2s, transform 0.2s;
  }
  .aim-btn:hover { background: var(--aim-caramel-deep); transform: translateY(-1px); }
  .aim-link {
    color: var(--aim-dark);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.98rem;
    border-bottom: 1px solid var(--aim-caramel);
    padding-bottom: 2px;
  }
  .aim-link:hover { color: var(--aim-caramel); }

  /* SECTIONS */
  .aim-section { padding: 5.5rem 0; }
  .aim-section.on-white { background: var(--aim-white); }
  .aim-section.on-cream { background: var(--aim-cream); }
  .aim-section.on-dark { background: var(--aim-dark); color: rgba(255,255,255,0.8); }

  .aim-snum {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--aim-caramel);
    margin-bottom: 0.6rem;
  }
  .aim-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    color: var(--aim-dark);
    font-size: clamp(2rem, 4vw, 2.9rem);
    line-height: 1.12;
    margin-bottom: 1.4rem;
    max-width: 18ch;
  }
  .on-dark .aim-h2 { color: #fff; }
  .aim-lead {
    font-size: 1.12rem;
    max-width: 640px;
    margin-bottom: 1.2rem;
  }
  .aim-body-p { font-size: 1.02rem; max-width: 640px; margin-bottom: 1.1rem; }
  .aim-body-p strong { color: var(--aim-dark); font-weight: 600; }
  .on-dark .aim-body-p strong { color: #fff; }

  .aim-pullout {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2.1rem);
    font-weight: 500;
    font-style: italic;
    color: var(--aim-caramel);
    max-width: 20ch;
    line-height: 1.25;
    margin-top: 2.4rem;
  }
  .on-dark .aim-pullout { color: var(--aim-caramel); }

  /* SECTION 01 */
  .aim-why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }
  .aim-why-statement {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.7rem, 3.2vw, 2.4rem);
    font-weight: 600;
    color: var(--aim-dark);
    line-height: 1.2;
  }
  .aim-why-statement span { color: var(--aim-caramel); }

  /* SECTION 02 categories */
  .aim-cats { display: flex; flex-direction: column; gap: 0; margin-top: 1rem; }
  .aim-cat {
    display: grid;
    grid-template-columns: 1.6rem 1fr;
    gap: 1.2rem;
    padding: 1.8rem 0;
    border-top: 1px solid var(--aim-line);
  }
  .aim-cat:last-child { border-bottom: 1px solid var(--aim-line); }
  .aim-cat-n {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--aim-caramel);
    padding-top: 0.2rem;
  }
  .aim-cat h3 { font-size: 1.18rem; color: var(--aim-dark); margin-bottom: 0.3rem; font-weight: 600; }
  .aim-cat p { font-size: 1rem; color: var(--aim-body); margin-bottom: 0.5rem; }
  .aim-cat .aim-proof { font-size: 0.92rem; color: var(--aim-muted); font-style: italic; }
  .aim-note {
    margin-top: 2rem;
    font-size: 0.92rem;
    font-style: italic;
    color: var(--aim-muted);
    max-width: 640px;
  }

  /* SECTION 03 stays-yours */
  .aim-keep { list-style: none; margin: 1.5rem 0 0; padding: 0; max-width: 720px; }
  .aim-keep li {
    display: grid;
    grid-template-columns: 1.6rem 1fr;
    gap: 1rem;
    padding: 1.1rem 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    font-size: 1.05rem;
    color: rgba(255,255,255,0.82);
  }
  .aim-keep li:last-child { border-bottom: 1px solid rgba(255,255,255,0.12); }
  .aim-keep .x { color: var(--aim-caramel); font-weight: 600; font-size: 1.1rem; }
  .aim-keep strong { color: #fff; font-weight: 600; }

  /* SECTION 05 credentials */
  .aim-operator-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
  }
  .aim-operator-photo {
    margin: 1.8rem 0 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 24px 50px -28px rgba(30,43,58,0.4);
  }
  .aim-operator-photo img { width: 100%; height: auto; display: block; }
  .aim-creds { list-style: none; margin: 1.8rem 0 0; padding: 0; }
  .aim-cred {
    display: grid;
    grid-template-columns: 230px 1fr;
    gap: 1.5rem;
    padding: 1.2rem 0;
    border-top: 1px solid var(--aim-line);
  }
  .aim-cred:last-child { border-bottom: 1px solid var(--aim-line); }
  .aim-cred .aim-cred-role { font-weight: 600; color: var(--aim-dark); font-size: 0.98rem; }
  .aim-cred .aim-cred-role span { display: block; color: var(--aim-caramel); font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }
  .aim-cred p { font-size: 0.98rem; color: var(--aim-body); }
  .aim-operator-grid .aim-cred { grid-template-columns: 190px 1fr; gap: 1.2rem; }

  /* CTA */
  .aim-cta-band { background: var(--aim-dark); color: #fff; padding: 5rem 0; text-align: center; }
  .aim-cta-band h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-size: clamp(2.1rem, 4vw, 3rem);
    margin-bottom: 1rem;
    color: #fff;
  }
  .aim-cta-band p { font-size: 1.08rem; color: rgba(255,255,255,0.9); max-width: 540px; margin: 0 auto 2rem; }
  .aim-cta-band .aim-btn-light {
    display: inline-block;
    background: var(--aim-caramel);
    color: #fff;
    padding: 1rem 2.4rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.05rem;
    transition: background 0.2s, transform 0.2s;
  }
  .aim-cta-band .aim-btn-light:hover { background: var(--aim-caramel-deep); transform: translateY(-1px); }
  .aim-cta-email { margin-top: 1.4rem; font-size: 0.92rem; color: rgba(255,255,255,0.55); }
  .aim-cta-email a { color: var(--aim-caramel); text-decoration: none; }

  /* SECTION 06 more ways in */
  .aim-doors { display: grid; grid-template-columns: 1fr 1fr; gap: 1.3rem; margin-top: 1.6rem; }
  .aim-door {
    display: block;
    background: var(--aim-white);
    border: 1px solid var(--aim-line);
    border-top: 3px solid var(--aim-caramel);
    border-radius: 10px;
    padding: 1.6rem 1.7rem 1.5rem;
    text-decoration: none;
    box-shadow: 0 14px 34px -24px rgba(30,43,58,0.35);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .aim-door:hover { transform: translateY(-2px); box-shadow: 0 24px 50px -28px rgba(30,43,58,0.4); }
  .aim-door .dk {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--aim-caramel-deep);
  }
  .aim-door h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem;
    font-weight: 600;
    color: var(--aim-dark);
    margin: 0.4rem 0 0.5rem;
  }
  .aim-door p { font-size: 0.95rem; line-height: 1.55; color: var(--aim-body); margin: 0 0 0.9rem; }
  .aim-door .go { font-size: 0.92rem; font-weight: 600; color: var(--aim-caramel-deep); }

  .aim-quote {
    margin-top: 3rem;
    max-width: 720px;
    border-left: 3px solid var(--aim-caramel);
    padding: 0.3rem 0 0.3rem 1.6rem;
  }
  .aim-quote blockquote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.3rem, 2.4vw, 1.6rem);
    font-weight: 500;
    font-style: italic;
    line-height: 1.4;
    color: var(--aim-dark);
    margin: 0;
  }
  .aim-quote figcaption { margin-top: 0.9rem; font-size: 0.9rem; color: var(--aim-muted); }
  .aim-quote figcaption a {
    color: var(--aim-caramel-deep);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid var(--aim-caramel);
  }
  .aim-quote figcaption a:hover { color: var(--aim-caramel); }

  .aim-footer { background: var(--aim-dark); padding: 2rem; text-align: center; }
  .aim-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .aim-footer a { color: var(--aim-caramel); text-decoration: none; }

  @media (max-width: 820px) {
    .aim-doors { grid-template-columns: 1fr; }
    .aim-why-grid { grid-template-columns: 1fr; gap: 2rem; }
    .aim-operator-grid { grid-template-columns: 1fr; gap: 2rem; }
    .aim-cred, .aim-operator-grid .aim-cred { grid-template-columns: 1fr; gap: 0.4rem; }
    .aim-section { padding: 4rem 0; }
  }
`;

const AIMaestro = () => {
  usePageMeta({
    title: "AI Maestro · Expert Work, Trained Into AI",
    description:
      "An operator takes your expert work, breaks it down, and trains AI to do it. Months of work becomes days.",
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
    <div className="aim-page">
      {/* HERO */}
      <header className="aim-hero">
        <div className="aim-wrap">
          <span className="aim-kicker">Dreamscope · AI Maestro</span>
          <h1>The operations mind that understands AI.</h1>
          <p className="aim-dek">
            I'm an operator, not a developer, who takes expert work and trains
            AI to do it. Months of work becomes days.
          </p>
          <div className="aim-cta-row">
            <a className="aim-btn" href="https://discovery.dreamscope.win/ai_maestro">
              Take the 15-minute discovery →
            </a>
            <a className="aim-link" href="#plays">
              See where it plays ↓
            </a>
          </div>
        </div>
      </header>

      {/* 01 WHY THIS EXISTS */}
      <section className="aim-section on-white">
        <div className="aim-wrap">
          <div className="aim-snum">01 / Why this exists</div>
          <div className="aim-why-grid">
            <div>
              <p className="aim-why-statement">
                AI doesn't fail because the model is weak. It fails because no
                one taught it the judgment the work actually requires.{" "}
                <span>Tech teams build tools. Operators build judgment.</span>
              </p>
            </div>
            <div>
              <p className="aim-body-p">
                I've spent nine years building the systems that run companies:
                SOP suites, KPI structures, and BPM rollouts at Christina's,
                Dreamplex, Seller Candy, and Pizza 4P's. Then I built the Culture
                Engine, where I trained AI to do expert work that used to take
                months.
              </p>
              <p className="aim-body-p">
                AI Maestro is that same move, pointed at whatever process in your
                company is bottlenecked on one person's expertise. Not a pivot.
                An upgrade.
              </p>
              <p className="aim-body-p">
                The hard part isn't getting AI to do the work once. It's knowing
                where it quietly gets the work <strong>wrong</strong> inside your
                domain, and engineering the checks that catch it before you have
                to. That is earned building, not a setting you toggle.
              </p>
              <p className="aim-pullout">
                You're getting the operations mind that understands AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 WHERE IT PLAYS */}
      <section className="aim-section on-cream" id="plays">
        <div className="aim-wrap">
          <div className="aim-snum">02 / Where AI Maestro plays</div>
          <h2 className="aim-h2">Five places expert work compresses.</h2>
          <div className="aim-cats">
            <div className="aim-cat">
              <div className="aim-cat-n">01</div>
              <div>
                <h3>Process compression</h3>
                <p>
                  Map a process end to end, then train AI on the steps that
                  carry real judgment.
                </p>
                <p className="aim-proof">
                  Interim COO at Seller Candy through 7-to-70 headcount and 6x
                  revenue. Three end-to-end BPM rollouts. ~4,056 hours a year
                  automated out of one operation at Dreamplex.
                </p>
              </div>
            </div>
            <div className="aim-cat">
              <div className="aim-cat-n">02</div>
              <div>
                <h3>Reporting and insight</h3>
                <p>
                  The data exists. The report doesn't. AI pulls it together,
                  writes the narrative, and flags the thing that's off.
                </p>
                <p className="aim-proof">
                  On the Culture Engine, leaders query their own data in plain
                  English and get cited answers in seconds, live in the room.
                </p>
              </div>
            </div>
            <div className="aim-cat">
              <div className="aim-cat-n">03</div>
              <div>
                <h3>The company brain</h3>
                <p>
                  Feed it everything (values, history, customers, processes) and
                  it answers with full context.
                </p>
                <p className="aim-proof">
                  The Culture Engine is the built proof. Three data sources, 19
                  drivers, AI-classified and queryable. On a 450-person company
                  it flagged 5 flight risks in a blind retrospective, all 5
                  among the 7 real departures, and caught a -87% sentiment
                  crisis that 40 leaders missed.
                </p>
              </div>
            </div>
            <div className="aim-cat">
              <div className="aim-cat-n">04</div>
              <div>
                <h3>Knowledge consolidation</h3>
                <p>
                  Scattered tribal knowledge becomes structured, searchable, and
                  validated.
                </p>
                <p className="aim-proof">
                  260+ frontline SOPs at Pizza 4P's consolidated into one
                  operating backbone, then wired into the training so managers
                  learn the playbook they run.
                </p>
              </div>
            </div>
            <div className="aim-cat">
              <div className="aim-cat-n">05</div>
              <div>
                <h3>Customer-facing intelligence</h3>
                <p>
                  Inbound questions, order routing, recommendations, demand
                  sensing.
                </p>
                <p className="aim-proof">
                  The hardest of the five, because data quality gates it. We say
                  so up front.
                </p>
              </div>
            </div>
          </div>
          <p className="aim-note">
            If the work is pure repetition with no judgment, there are simpler
            automation tools for that, and we'll point you to them. Where the
            judgment changes case by case is where AI needs an operator, and
            where we belong.
          </p>
        </div>
      </section>

      {/* 03 WHAT STAYS YOURS */}
      <section className="aim-section on-dark">
        <div className="aim-wrap">
          <div className="aim-snum">03 / What stays yours</div>
          <h2 className="aim-h2">AI runs the loop. You decide what the loop is for.</h2>
          <ul className="aim-keep">
            <li>
              <span className="x">×</span>
              <span>
                <strong>The strategic picks.</strong> Which work matters this
                year. Which problem moves the company.
              </span>
            </li>
            <li>
              <span className="x">×</span>
              <span>
                <strong>The standards themselves.</strong> What "good" means at
                your company.
              </span>
            </li>
            <li>
              <span className="x">×</span>
              <span>
                <strong>The judgment calls.</strong> Cash flow, hiring,
                structural moves. The shape of the company.
              </span>
            </li>
            <li>
              <span className="x">×</span>
              <span>
                <strong>The final say.</strong> AI runs the loop. You decide
                what the loop is for.
              </span>
            </li>
          </ul>
          <p className="aim-pullout">
            The right hand helps you make the call. It does not make the call for
            you.
          </p>
        </div>
      </section>

      {/* 04 HOW WE START */}
      <section className="aim-section on-white">
        <div className="aim-wrap">
          <div className="aim-snum">04 / How we start</div>
          <h2 className="aim-h2">Built around how you actually operate.</h2>
          <p className="aim-lead">
            The first thing I do is listen. With AI Maestro the hunt is for the
            biggest wins, the things eating the most time, or slowing down your
            decisions and growth. This isn't off-the-shelf software you bend
            your work around. It's built around what matters to you and how
            you actually operate.
          </p>
        </div>
      </section>

      {/* 05 CREDENTIALS */}
      <section className="aim-section on-cream">
        <div className="aim-wrap">
          <div className="aim-snum">05 / The operator</div>
          <h2 className="aim-h2">Twenty-plus years operating. Nine across Asia.</h2>
          <p className="aim-lead">
            Vietnam, Cambodia, India, Japan. The career has been one long run of
            building the systems that let companies scale without losing what
            made them good.
          </p>
          <div className="aim-operator-grid">
            <ul className="aim-creds">
              <li className="aim-cred">
                <div className="aim-cred-role">
                  Pizza 4P's<span>Culture &amp; Ops Excellence Director</span>
                </div>
                <p>
                  Built Culture and L&amp;D from zero across 40+ locations, 5
                  countries, 3,700 employees. 260+ SOPs into one backbone. eNPS
                  up 20 points, happiness up 18-20%.
                </p>
              </li>
              <li className="aim-cred">
                <div className="aim-cred-role">
                  Seller Candy<span>Interim COO</span>
                </div>
                <p>
                  Built the operational foundation through 7-to-70 headcount and
                  6x revenue. KPI structure, full SOP suite, HR, Finance,
                  Training and Ops from scratch.
                </p>
              </li>
              <li className="aim-cred">
                <div className="aim-cred-role">
                  Dreamplex<span>Director of Central Operations</span>
                </div>
                <p>
                  Full operations stack and BPM automation across all locations.
                  Roughly 4,056 hours a year taken out of the work.
                </p>
              </li>
              <li className="aim-cred">
                <div className="aim-cred-role">
                  Christina's Vietnam<span>Operations Team Leader</span>
                </div>
                <p>
                  Led operations through scaling from 3 to 8 cities and 50 to
                  500+ employees. Built the manual and SOP suite from scratch.
                </p>
              </li>
              <li className="aim-cred">
                <div className="aim-cred-role">
                  Dreamscope<span>The Culture Engine</span>
                </div>
                <p>
                  The most recent build and the most demonstrable. An operator
                  trained AI to do expert work that used to take months. Now the
                  AI does it in days.
                </p>
              </li>
            </ul>
            <figure className="aim-operator-photo">
              <img
                src={operatorPhoto}
                alt="Joe Black presenting to a leadership team"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 06 MORE WAYS IN */}
      <section className="aim-section on-white">
        <div className="aim-wrap">
          <div className="aim-snum">06 / More ways in</div>
          <h2 className="aim-h2">Two more doors into the same work.</h2>
          <p className="aim-lead">
            AI Maestro compresses a whole process end to end. If you want to
            learn the move yourself, or start with a single build, start here.
          </p>
          <div className="aim-doors">
            <Link className="aim-door" to="/workshops">
              <span className="dk">Learn it yourself</span>
              <h3>AI Workshops</h3>
              <p>
                Hands-on sessions where you hand Claude real work and it comes
                back done. In your accounts, on your machine, bespoke to you.
              </p>
              <span className="go">See the workshops →</span>
            </Link>
            <Link className="aim-door" to="/website">
              <span className="dk">A build, done for you</span>
              <h3>The Self-Updating Website</h3>
              <p>
                Off WordPress and onto a fast site you own, SEO intact. From
                then on you update it by talking to Claude.
              </p>
              <span className="go">See how it works →</span>
            </Link>
          </div>
          <figure className="aim-quote">
            <blockquote>
              Our goal was to update my website automatically and keep it
              updated on a continuous basis, and that's exactly what we built.
              I'd wholeheartedly recommend the AI Maestro program!
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
      <section className="aim-cta-band">
        <div className="aim-wrap">
          <h2>Take the 15-minute discovery.</h2>
          <p>
            Five categories, one priority pick, three free-text questions. We
            read every one. If your problem fits, we'll book a call.
          </p>
          <a className="aim-btn-light" href="https://discovery.dreamscope.win/ai_maestro">
            Take the discovery →
          </a>
          <div className="aim-cta-email">
            Or email directly:{" "}
            <a href="mailto:joe@dreamscope.win?subject=AI%20Maestro%20-%20Let's%20talk">
              joe@dreamscope.win
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="aim-footer">
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

export default AIMaestro;
