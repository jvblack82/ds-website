import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const css = `
  html { scroll-padding-top: 72px; }

  .ops-page {
    --ops-dark: #1E2B3A;
    --ops-car: #B5895A;
    --ops-car-deep: #8C6339;
    --ops-cream: #FBF8F1;
    --ops-white: #FFFFFF;
    --ops-body: #4A4036;
    --ops-muted: #6E6355;
    --ops-line: #E7DECF;
    --ops-serif: 'Cormorant Garamond', Georgia, serif;
    --ops-sans: 'Inter', system-ui, sans-serif;

    font-family: var(--ops-sans);
    font-size: 15px;
    line-height: 1.55;
    color: var(--ops-body);
    background: var(--ops-cream);
    -webkit-font-smoothing: antialiased;
  }
  .ops-page * { box-sizing: border-box; }
  :where(.ops-page) a { color: inherit; }
  .ops-in { max-width: 980px; margin: 0 auto; padding-left: max(20px, env(safe-area-inset-left, 0px)); padding-right: max(20px, env(safe-area-inset-right, 0px)); }
  .ops-page h2 { font: 600 clamp(30px, 4.4vw, 42px)/1.1 var(--ops-serif); color: var(--ops-dark); margin: 0 0 14px; text-wrap: balance; letter-spacing: -0.005em; }
  .ops-page h3 { font: 600 24px/1.2 var(--ops-serif); color: var(--ops-dark); margin: 0; }
  .ops-page p { margin: 0; }
  .ops-kick, .ops-snum { display: block; font: 600 11.5px/1 var(--ops-sans); letter-spacing: .16em; text-transform: uppercase; color: var(--ops-car-deep); margin-bottom: 14px; }
  .ops-lead { font-size: 17.5px; line-height: 1.6; max-width: 62ch; color: var(--ops-body); }
  .ops-sec { padding-block: 72px; }
  .ops-sec + .ops-sec { border-top: 1px solid var(--ops-line); }
  .ops-btn { display: inline-block; font: 600 15px/1 var(--ops-sans); padding: 15px 24px; border-radius: 8px; text-decoration: none; }
  .ops-btn.car { background: var(--ops-car); color: var(--ops-dark); }
  .ops-btn.light { background: var(--ops-cream); color: var(--ops-dark); }
  .ops-link { color: var(--ops-car-deep); font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(140,99,57,.4); }
  .ops-tlink { color: rgba(255,255,255,.85); font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.35); }

  .ops-hero { background: var(--ops-dark); padding-block: 84px 90px; }
  .ops-hero .ops-kick { color: var(--ops-car); }
  .ops-hero h1 { font: 600 clamp(40px, 6.4vw, 66px)/1.03 var(--ops-serif); color: var(--ops-white); margin: 0 0 22px; max-width: 14ch; text-wrap: balance; letter-spacing: -0.01em; }
  .ops-hero .ops-dek { font-size: 19px; line-height: 1.6; color: rgba(255,255,255,.8); max-width: 56ch; margin-bottom: 32px; }
  .ops-ctas { display: flex; flex-wrap: wrap; gap: 22px; align-items: center; }

  .ops-ways { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 34px; }
  .ops-way { background: var(--ops-white); border: 1px solid var(--ops-line); border-radius: 12px; padding: 24px 26px; display: flex; flex-direction: column; gap: 8px; }
  .ops-way h3 { font-size: 27px; }

  .ops-proof { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 30px; }
  .ops-pf { background: var(--ops-white); border: 1px solid var(--ops-line); border-radius: 12px; padding: 22px 22px 20px; min-width: 0; }
  .ops-pf b { display: block; font: 600 46px/1 var(--ops-serif); color: var(--ops-dark); margin-bottom: 10px; font-variant-numeric: tabular-nums; }
  .ops-pf small { display: block; font: 600 11px/1.3 var(--ops-sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ops-car-deep); margin-top: 10px; }

  .ops-steps { list-style: none; margin: 36px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px; counter-reset: s; }
  .ops-steps li { display: grid; grid-template-columns: 38px 1fr; gap: 14px; padding: 18px 0; border-top: 1px solid var(--ops-line); min-width: 0; }
  .ops-steps li::before { counter-increment: s; content: counter(s); width: 34px; height: 34px; border-radius: 50%; background: var(--ops-dark); color: var(--ops-white); font: 600 14px/34px var(--ops-sans); text-align: center; }
  .ops-steps b { display: block; color: var(--ops-dark); font-size: 16.5px; margin-bottom: 3px; }
  .ops-steps li.plan { grid-column: 1 / -1; background: var(--ops-white); border: 2px solid var(--ops-car); border-radius: 12px; padding: 20px 22px; }
  .ops-steps li.plan::before { background: var(--ops-car); color: var(--ops-dark); }
  .ops-audit-foot { display: grid; grid-template-columns: 1.1fr 1fr; gap: 18px; margin-top: 26px; }
  .ops-af { background: var(--ops-white); border: 1px solid var(--ops-line); border-radius: 12px; padding: 20px 22px; min-width: 0; }
  .ops-af h4 { font: 600 11.5px/1 var(--ops-sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ops-car-deep); margin: 0 0 12px; }
  .ops-af ul { list-style: disc; margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; }
  .ops-af.end { background: var(--ops-dark); border-color: var(--ops-dark); color: rgba(255,255,255,.85); grid-column: 1 / -1; font-size: 16.5px; display: flex; flex-wrap: wrap; gap: 16px 28px; align-items: center; justify-content: space-between; }
  .ops-af.end p { max-width: 52ch; }
  .ops-af.end b { color: var(--ops-white); }

  .ops-areas { display: grid; grid-template-columns: 1fr 1.3fr 1fr; gap: 16px; margin-top: 34px; align-items: stretch; }
  .ops-area { background: var(--ops-white); border: 1px solid var(--ops-line); border-top: 5px solid var(--ops-dark); border-radius: 12px; padding: 22px 22px 24px; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  .ops-area.ai { border-top-color: var(--ops-car); }
  .ops-area.sw { border-top-color: var(--ops-car-deep); }
  .ops-area ul { list-style: disc; margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 5px; }
  .ops-five { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px; }
  .ops-five li { display: grid; grid-template-columns: 26px 1fr; font-size: 14.5px; line-height: 1.45; }
  .ops-five li span { font-weight: 700; color: var(--ops-car-deep); }
  .ops-five li b { color: var(--ops-dark); font-weight: 600; }
  .ops-five-h { font: 600 10.5px/1.3 var(--ops-sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ops-car-deep); }

  .ops-flow { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; margin: 34px 0 0; counter-reset: f; }
  .ops-fl { position: relative; padding: 22px 24px 0 0; border-top: 3px solid var(--ops-dark); }
  .ops-fl:not(:last-child)::after { content: ""; position: absolute; top: -9px; right: 10px; border-left: 11px solid var(--ops-dark); border-top: 7.5px solid transparent; border-bottom: 7.5px solid transparent; }
  .ops-fl h3 { font-size: 23px; margin-bottom: 8px; display: flex; gap: 10px; align-items: baseline; }
  .ops-fl h3::before { counter-increment: f; content: counter(f); font: 700 13px/1 var(--ops-sans); color: var(--ops-car-deep); }
  .ops-fl p { font-size: 15px; }
  .ops-fl:last-child { border-top-color: var(--ops-car); }

  .ops-maestro { background: var(--ops-dark); color: rgba(255,255,255,.82); }
  .ops-page .ops-maestro h2 { color: var(--ops-white); }
  .ops-maestro .ops-snum { color: var(--ops-car); }
  .ops-m-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: start; }
  .ops-m-quote { font: 500 clamp(24px, 3vw, 30px)/1.3 var(--ops-serif); color: var(--ops-white); margin: 0 0 22px; }
  .ops-m-side { display: flex; flex-direction: column; gap: 14px; font-size: 17px; }
  .ops-m-side b { color: var(--ops-white); }

  .ops-cta { background: var(--ops-car); color: var(--ops-dark); }
  .ops-page .ops-cta h2 { color: var(--ops-dark); }
  .ops-cta .ops-lead { color: var(--ops-dark); }
  .ops-cta .ops-ctas { margin-top: 26px; }
  .ops-cta .ops-link { color: var(--ops-dark); border-bottom-color: rgba(30,43,58,.45); }

  .ops-foot { background: var(--ops-dark); color: rgba(255,255,255,.65); font-size: 13px; padding-block: 26px; }
  .ops-foot .ops-in { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .ops-foot a { color: var(--ops-car); text-decoration: none; }

  @media (max-width: 860px) {
    .ops-ways, .ops-steps, .ops-audit-foot, .ops-areas, .ops-m-grid, .ops-proof { grid-template-columns: 1fr; }
    .ops-flow { grid-template-columns: 1fr; gap: 22px; }
    .ops-fl { padding-right: 0; }
    .ops-fl:not(:last-child)::after { display: none; }
    .ops-sec { padding-block: 54px; }
  }
`;

const Operations = () => {
  usePageMeta({
    title: "Operations · Find What's Slowing You Down",
    description:
      "Find what's slowing a company down and fix it. It starts with the Ops Audit: we find out how the work really runs, then fix it with People Systems, AI and custom software.",
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
    <div className="ops-page">
      <header className="ops-hero">
        <div className="ops-in">
          <span className="ops-kick">Dreamscope · Operations</span>
          <h1>Find what's slowing you down. Fix it.</h1>
          <p className="ops-dek">
            20 years running teams, the last ten in Vietnam. I start by finding
            out how the work really runs, from the people who do it. Then we
            agree on what to fix, put the fixes in, and hand them over so the
            company keeps getting better.
          </p>
          <div className="ops-ctas">
            <a className="ops-btn car" href="#start">
              Let's talk →
            </a>
            <a className="ops-tlink" href="#audit">
              How the Ops Audit works ↓
            </a>
          </div>
        </div>
      </header>

      <section className="ops-sec">
        <div className="ops-in">
          <span className="ops-snum">01 / The problem</span>
          <h2>Everyone feels it. Nobody sees all of it.</h2>
          <p className="ops-lead">
            Work waits on one person's signature. New staff learn by watching
            whoever is free. The same numbers get typed into three systems. Each
            leader sees their own piece, and the owner sees the results without
            the cause.
          </p>
          <div className="ops-ways">
            <div className="ops-way">
              <h3>"Fix this."</h3>
              <p>
                You know what's broken and you're tired of the complaints about
                it. We start there.
              </p>
            </div>
            <div className="ops-way">
              <h3>"Make things better."</h3>
              <p>
                You know it could run better, and you're not sure what AI can do
                for you. We look at the whole company and show you where to
                start.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ops-sec">
        <div className="ops-in">
          <span className="ops-snum">02 / The work behind it</span>
          <h2>I've been doing this for years. Now it's enhanced by AI.</h2>
          <div className="ops-proof">
            <div className="ops-pf">
              <b>7 → 70</b>
              <p>People, with revenue up 6x, as interim COO.</p>
              <small>Seller Candy</small>
            </div>
            <div className="ops-pf">
              <b>260+</b>
              <p>
                Frontline SOPs pulled into one backbone, across 37 locations in
                4 countries.
              </p>
              <small>Pizza 4P's</small>
            </div>
            <div className="ops-pf">
              <b>~4,056</b>
              <p>Hours a year automated out of one operation.</p>
              <small>Dreamplex</small>
            </div>
          </div>
        </div>
      </section>

      <section className="ops-sec" id="audit">
        <div className="ops-in">
          <span className="ops-snum">03 / The way in</span>
          <h2>The Ops Audit: find out what's really going on.</h2>
          <p className="ops-lead">
            Before anything gets built, we learn how the work really runs, from
            the leaders down to the people who do it every day. Whether you came
            to fix one thing or to make everything better, we run every step.
          </p>
          <ol className="ops-steps">
            <li>
              <div>
                <b>The goal</b>
                What "better" looks like, the biggest problems in your words,
                and who leads the project on your side.
              </div>
            </li>
            <li>
              <div>
                <b>The leaders</b>
                We talk to the leaders who own the problem. For a whole-company
                look, we talk to every department head.
              </div>
            </li>
            <li>
              <div>
                <b>The survey</b>
                One short, anonymous survey for the whole team, in any language.
                It asks where work gets stuck and how they would fix it. AI
                reads every answer.
              </div>
            </li>
            <li>
              <div>
                <b>The people who do the work</b>
                The one or two who are best at the job show us how it really
                runs, the workarounds, and who already solved it.
              </div>
            </li>
            <li>
              <div>
                <b>The maps, made with AI</b>
                They record the job by voice, screen or video, and AI turns it
                into step-by-step maps that mark every handoff, wait, approval
                and double entry.
              </div>
            </li>
            <li>
              <div>
                <b>Numbers and tools</b>
                We agree up front which numbers (KPIs) you want to move, and
                shape the work to move them. For tools, we start from what you
                use now: a better way to use it, or a new tool where it pays
                off.
              </div>
            </li>
            <li className="plan">
              <div>
                <b>The plan, built together</b>
                We solve what you came for, and the process also finds other
                places to improve. We rank everything by impact and effort, so
                you get the best bang for buck. You pick, and you agree on the
                plan before anything gets built.
              </div>
            </li>
          </ol>
          <div className="ops-audit-foot">
            <div className="ops-af">
              <h4>What you get</h4>
              <ul>
                <li>A plan you helped build and already agree with.</li>
                <li>Step-by-step maps of how your core work really runs.</li>
                <li>Clear numbers (KPIs) for every fix, so progress is measurable.</li>
              </ul>
            </div>
            <div className="ops-af">
              <h4>What we need from you</h4>
              <ul>
                <li>Time with the leaders who own the problem.</li>
                <li>Your team's survey answers.</li>
                <li>One-on-one time with the people who do the work.</li>
                <li>A project lead on your side.</li>
              </ul>
            </div>
            <div className="ops-af end">
              <p>
                <b>The audit ends with the plan.</b> The fixes are a separate
                decision, and you make it with the plan in hand.
              </p>
              <p>
                Talk to me:{" "}
                <a className="ops-tlink" href="mailto:joe@dreamscope.win">
                  joe@dreamscope.win
                </a>{" "}
                ·{" "}
                <a
                  className="ops-tlink"
                  href="https://www.linkedin.com/in/joevblack/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ops-sec">
        <div className="ops-in">
          <span className="ops-snum">04 / Where the fixes land</span>
          <h2>Three common areas. The list stays open.</h2>
          <p className="ops-lead">
            Most fixes land in one of three areas. When the audit finds
            something that fits none of them, it gets its own.
          </p>
          <div className="ops-areas">
            <div className="ops-area">
              <h3>People Systems</h3>
              <p>How people are hired, trained, led and kept.</p>
              <ul>
                <li>Managers and how they lead</li>
                <li>Training, and how new staff learn</li>
                <li>Hiring and onboarding</li>
                <li>Recognition</li>
                <li>Meetings</li>
              </ul>
            </div>
            <div className="ops-area ai">
              <h3>Process Enhancement with AI</h3>
              <p>
                Who decides, who signs, and how work passes between teams. Then
                AI where it helps most.
              </p>
              <span className="ops-five-h">Where AI helps most</span>
              <ol className="ops-five">
                <li>
                  <span>01</span>
                  <div>
                    <b>Process compression:</b> we map the process, then train
                    AI on the steps that carry real judgment.
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <b>Reporting and insight:</b> the report builds itself and
                    flags what's off.
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <b>The company brain:</b> it knows your company and answers
                    with full context.
                  </div>
                </li>
                <li>
                  <span>04</span>
                  <div>
                    <b>Knowledge consolidation:</b> scattered know-how in one
                    place.
                  </div>
                </li>
                <li>
                  <span>05</span>
                  <div>
                    <b>Customer-facing intelligence:</b> answer and route
                    customer questions. The hardest of the five, because it
                    needs clean data.
                  </div>
                </li>
              </ol>
              <Link className="ops-link" to="/ai-maestro">
                This is AI Maestro →
              </Link>
            </div>
            <div className="ops-area sw">
              <h3>Custom Software Solutions</h3>
              <p>
                Software shaped to how you work, when what you have can't do the
                job.
              </p>
              <ul>
                <li>Connect the tools you already have.</li>
                <li>Build what's missing.</li>
              </ul>
              <p>
                Tailored by Dreamscope and built by trusted partners, to
                enterprise standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ops-sec">
        <div className="ops-in">
          <span className="ops-snum">05 / After the plan</span>
          <h2>Fix it, prove it, hand it over.</h2>
          <ol className="ops-flow">
            <li className="ops-fl">
              <h3>Put the fixes in</h3>
              <p>Your project lead signs off each fix before it goes live.</p>
            </li>
            <li className="ops-fl">
              <h3>Track and tweak</h3>
              <p>
                We measure against the numbers from the audit and adjust until
                it works.
              </p>
            </li>
            <li className="ops-fl">
              <h3>Hand it over</h3>
              <p>SOPs for the new way of working, and a plan to keep them current.</p>
            </li>
            <li className="ops-fl">
              <h3>Keep improving</h3>
              <p>
                Run it yourselves, or we come back on a regular cycle: survey,
                audit, improve.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="ops-sec ops-maestro" id="maestro">
        <div className="ops-in">
          <span className="ops-snum">06 / The method behind the AI work</span>
          <h2>AI Maestro: expert work, trained into AI.</h2>
          <div className="ops-m-grid">
            <div>
              <p className="ops-m-quote">
                "I'm an operator, not a developer, who takes expert work and
                trains AI to do it. Months of work becomes days."
              </p>
              <Link className="ops-btn car" to="/ai-maestro">
                How AI Maestro works →
              </Link>
            </div>
            <div className="ops-m-side">
              <p>
                <b>The decisions stay yours.</b> The grind doesn't.
              </p>
              <p>Tech teams build tools. Operators build judgment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ops-sec ops-cta" id="start">
        <div className="ops-in">
          <h2>Let's start with a conversation.</h2>
          <p className="ops-lead">
            Tell me where work gets stuck. The first conversation is 30 minutes,
            with no pitch.
          </p>
          <div className="ops-ctas">
            <a
              className="ops-btn light"
              href="mailto:joe@dreamscope.win?subject=Operations"
            >
              Email joe@dreamscope.win →
            </a>
            <a
              className="ops-link"
              href="https://www.linkedin.com/in/joevblack/"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="ops-foot">
        <div className="ops-in">
          <span>
            Dreamscope Consulting ·{" "}
            <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a> ·{" "}
            <a
              href="https://www.linkedin.com/in/joevblack/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </span>
          <span>
            <Link to="/#about">About</Link> · <Link to="/insights">Insights</Link>{" "}
            · © 2026
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Operations;
