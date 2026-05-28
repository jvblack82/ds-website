import { useEffect } from "react";

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

  .ce-page {
    font-family: 'DM Sans', sans-serif;
    color: var(--body);
    background: var(--warm-white);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  .ce-page * { box-sizing: border-box; }

  .hero {
    background: var(--dark);
    color: white;
    padding: 3rem 2rem 4.5rem;
    position: relative;
    overflow: hidden;
  }
  .hero::after {
    content: '';
    position: absolute;
    top: -50%; right: -20%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(12,124,138,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero-inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .hero-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
  }
  .hero-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 1.25rem;
    color: white;
    letter-spacing: 0.5px;
  }
  .hero-logo span { color: var(--teal-light); }
  .hero-cta-nav a {
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    font-size: 0.9rem;
    margin-left: 2rem;
    transition: color 0.2s;
  }
  .hero-cta-nav a:hover { color: white; }
  .hero-cta-nav a.btn-nav {
    background: var(--teal);
    color: white;
    padding: 0.6rem 1.4rem;
    border-radius: 6px;
    font-weight: 500;
  }
  .hero-cta-nav a.btn-nav:hover { background: var(--teal-light); }

  .hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    line-height: 1.15;
    max-width: 750px;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
  .hero p.subtitle {
    font-size: 1.15rem;
    color: rgba(255,255,255,0.75);
    max-width: 600px;
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }
  .hero-btn {
    display: inline-block;
    background: var(--teal);
    color: white;
    padding: 0.9rem 2.2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: transform 0.2s, background 0.2s;
  }
  .hero-btn:hover { background: var(--teal-light); transform: translateY(-1px); }

  .stats-bar {
    background: var(--cream);
    padding: 3rem 2rem;
    border-bottom: 1px solid var(--sand);
  }
  .stats-grid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
  }
  .stat-item .stat-number {
    font-family: 'DM Serif Display', serif;
    font-size: 2.5rem;
    color: var(--teal);
    display: block;
    margin-bottom: 0.4rem;
  }
  .stat-item .stat-label {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.5;
  }

  .ds-section { padding: 5rem 2rem; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--teal);
    margin-bottom: 1rem;
  }
  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.5rem);
    color: var(--dark);
    margin-bottom: 1.2rem;
    font-weight: 400;
    line-height: 1.2;
  }
  .section-subtitle {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 650px;
    line-height: 1.7;
    margin-bottom: 3rem;
  }

  .problem { background: var(--warm-white); }
  .problem-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }
  .problem-text p {
    margin-bottom: 1.2rem;
    font-size: 1.05rem;
    line-height: 1.75;
  }
  .problem-text p strong { color: var(--dark); }
  .problem-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .problem-card {
    background: var(--cream);
    border-radius: 10px;
    padding: 1.3rem 1.5rem;
    border-left: 3px solid var(--teal);
  }
  .problem-card .pc-title {
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.3rem;
    font-size: 0.95rem;
  }
  .problem-card .pc-desc {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.5;
  }

  .approach { background: var(--cream); }
  .approach-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }
  .approach-step {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    position: relative;
  }
  .step-num {
    font-family: 'DM Serif Display', serif;
    font-size: 2.5rem;
    color: var(--sand);
    position: absolute;
    top: 1rem; right: 1.5rem;
  }
  .approach-step h3 {
    font-size: 1.1rem;
    color: var(--dark);
    margin-bottom: 0.6rem;
    font-weight: 600;
  }
  .approach-step p {
    font-size: 0.92rem;
    color: var(--muted);
    line-height: 1.6;
  }
  .approach-note {
    margin-top: 2rem;
    font-style: italic;
    color: var(--teal);
    font-size: 1.05rem;
    text-align: center;
  }

  .results { background: var(--dark); color: white; }
  .results .section-label { color: var(--teal-light); }
  .results .section-title { color: white; }
  .results .section-subtitle { color: rgba(255,255,255,0.6); }
  .results-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin: 2.5rem 0 2.2rem;
  }
  .result-stat { text-align: center; }
  .result-stat .rs-num {
    font-family: 'DM Serif Display', serif;
    font-size: 2.6rem;
    color: var(--teal-light);
    display: block;
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  .result-stat .rs-label {
    display: block;
    font-weight: 600;
    color: white;
    font-size: 0.95rem;
    margin-bottom: 0.35rem;
  }
  .result-stat .rs-desc {
    display: block;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.55);
    line-height: 1.5;
  }
  .results-note {
    text-align: center;
    font-size: 0.98rem;
    color: rgba(255,255,255,0.6);
    max-width: 620px;
    margin: 0 auto;
    font-style: italic;
  }

  .deliverables { background: var(--warm-white); }
  .deliverables-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .deliv-card {
    padding: 1.5rem 1.8rem;
    border: 1px solid var(--sand);
    border-radius: 10px;
    transition: border-color 0.2s;
  }
  .deliv-card:hover { border-color: var(--teal); }
  .deliv-card h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.4rem;
  }
  .deliv-card p {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.6;
  }

  .engagement { background: var(--dark); color: white; }
  .engagement .section-label { color: var(--teal-light); }
  .engagement .section-title { color: white; }
  .engagement .section-subtitle { color: rgba(255,255,255,0.6); }
  .phases {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .phase {
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .phase-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--teal-light);
    margin-bottom: 0.5rem;
  }
  .phase h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    font-weight: 400;
  }
  .phase p {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
  }
  .phase-timeline {
    font-size: 0.8rem;
    color: var(--teal-light);
    margin-top: 1rem;
    font-weight: 500;
  }

  .fit { background: var(--accent-bg); }
  .fit-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.5rem;
  }
  .fit-tag {
    background: white;
    border: 1px solid var(--sand);
    border-radius: 50px;
    padding: 0.5rem 1.3rem;
    font-size: 0.9rem;
    color: var(--dark);
    font-weight: 500;
  }

  .cta {
    background: var(--dark);
    color: white;
    text-align: center;
    padding: 5rem 2rem;
  }
  .cta h2 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    margin-bottom: 1rem;
    font-weight: 400;
  }
  .cta p {
    color: rgba(255,255,255,0.6);
    font-size: 1.05rem;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  .cta-btn {
    display: inline-block;
    background: var(--teal);
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.05rem;
    transition: transform 0.2s, background 0.2s;
  }
  .cta-btn:hover { background: var(--teal-light); transform: translateY(-1px); }

  .ds-footer {
    background: var(--dark);
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 2rem;
    text-align: center;
  }
  .ds-footer p {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.3);
  }
  .ds-footer a { color: var(--teal-light); text-decoration: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero h1, .hero p.subtitle, .hero-btn {
    animation: fadeUp 0.6s ease-out both;
  }
  .hero p.subtitle { animation-delay: 0.15s; }
  .hero-btn { animation-delay: 0.3s; }

  @media (max-width: 900px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .results-grid { grid-template-columns: repeat(2, 1fr); }
    .problem-grid { grid-template-columns: 1fr; }
    .approach-steps { grid-template-columns: 1fr; }
    .deliverables-grid { grid-template-columns: 1fr; }
    .phases { grid-template-columns: 1fr; }
    .hero-cta-nav { display: none; }
  }
  @media (max-width: 600px) {
    .stats-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .results-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .ds-section { padding: 3.5rem 1.5rem; }
  }
`;

const CultureEngine = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="ce-page">
      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <nav className="hero-nav">
            <div className="hero-logo">
              Dreamscope<span>.</span>
            </div>
            <div className="hero-cta-nav">
              <a href="#approach">How It Works</a>
              <a href="#deliverables">What You Get</a>
              <a href="#contact" className="btn-nav">
                Let's Talk
              </a>
            </div>
          </nav>
          <h1>You're scaling. But performance isn't scaling with you.</h1>
          <p className="subtitle">
            The Culture Engine is an AI-powered diagnostic system that finds the
            root cause of underperformance in scaling companies, then surfaces
            the fix that already exists inside your organization.
          </p>
          <a href="#contact" className="hero-btn">
            Book a 30-Minute Conversation
          </a>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">5 of 7</span>
            <span className="stat-label">
              Leadership departures predicted before they happened
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">-87%</span>
            <span className="stat-label">
              Supervisor sentiment in one division, invisible to all 40 leaders
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50</span>
            <span className="stat-label">
              Proven practices surfaced from the company's own top performers
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">80%</span>
            <span className="stat-label">
              Correlation that redirected a $200K+ budget decision
            </span>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem ds-section" id="problem">
        <div className="section-inner">
          <div className="problem-grid">
            <div className="problem-text">
              <div className="section-label">The Problem</div>
              <h2 className="section-title">
                You've tried everything. The numbers didn't move.
              </h2>
              <p>
                New locations underperform. Your best people are stretched thin.
                The playbook that worked at 5 stores doesn't work at 20.
              </p>
              <p>
                You've probably tried consultants, training programs, engagement
                surveys.{" "}
                <strong>
                  The numbers didn't move because you were treating symptoms, not
                  the root cause.
                </strong>
              </p>
              <p>
                The Culture Engine finds the root cause, and the fix that
                already exists inside your company. Not recommendations from a
                textbook. Your own people's solutions to your own problems.
              </p>
            </div>
            <div className="problem-cards">
              <div className="problem-card">
                <div className="pc-title">
                  Blind spots leadership can't see
                </div>
                <div className="pc-desc">
                  290 employees flagged a supervisor crisis. 40 leaders mentioned
                  it 5 times total. The system caught what humans missed.
                </div>
              </div>
              <div className="problem-card">
                <div className="pc-title">Surveys that go nowhere</div>
                <div className="pc-desc">
                  Most companies collect data and don't know what to do with it.
                  We classify every response against 19 validated drivers, so you
                  know exactly what to fix and where.
                </div>
              </div>
              <div className="problem-card">
                <div className="pc-title">Reports that sit on a shelf</div>
                <div className="pc-desc">
                  A 100-page PDF nobody reads is not a culture strategy. We
                  deliver action plans with named owners, 90-day targets, and
                  quarterly measurement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="approach ds-section" id="approach">
        <div className="section-inner">
          <div className="section-label">The Rockstar Philosophy</div>
          <h2 className="section-title">
            Your best people already built the playbook. You just don't know it
            yet.
          </h2>
          <p className="section-subtitle">
            Instead of telling you what's broken, we find who's already winning,
            and make their methods everyone's methods.
          </p>
          <div className="approach-steps">
            <div className="approach-step">
              <span className="step-num">01</span>
              <h3>Find who's already winning</h3>
              <p>
                Every leader scored 1–6 against documented behavioral criteria.
                10 Rockstar signals, 9 Red Flag signals, full evidence chains
                from their own words. Not a vibe check. A defensible assessment.
              </p>
            </div>
            <div className="approach-step">
              <span className="step-num">02</span>
              <h3>Document what they do</h3>
              <p>
                Extract the replicable practices from your top performers. Rate
                signal strength. Map each practice to your company's own
                strategic goals, KPIs, and values.
              </p>
            </div>
            <div className="approach-step">
              <span className="step-num">03</span>
              <h3>Deploy across the network</h3>
              <p>
                Named owners, 90-day targets, quarterly measurement. Not a
                report. A living operational playbook. Then we lead the
                implementation alongside your team.
              </p>
            </div>
          </div>
          <p className="approach-note">
            Then we lead the implementation alongside your team. This doesn't
            sit on a shelf.
          </p>
        </div>
      </section>

      {/* RESULTS / 4P's CASE STUDY */}
      <section className="results ds-section" id="results">
        <div className="section-inner">
          <div className="section-label">Case Study · Pizza 4P's</div>
          <h2 className="section-title">Culture driven performance</h2>
          <p className="section-subtitle">
            A behavior-driven approach, measured. What happened when culture
            stopped being a poster and became daily practice.
          </p>
          <div className="results-grid">
            <div className="result-stat">
              <span className="rs-num">18–60%</span>
              <span className="rs-label">Happiness boost</span>
              <span className="rs-desc">
                Satisfaction jumped from simple, feedback-driven changes.
              </span>
            </div>
            <div className="result-stat">
              <span className="rs-num">5–20%</span>
              <span className="rs-label">Mystery shopper increase</span>
              <span className="rs-desc">
                Behavior-led training moved the KPIs that matter.
              </span>
            </div>
            <div className="result-stat">
              <span className="rs-num">18 pts</span>
              <span className="rs-label">eNPS rise</span>
              <span className="rs-desc">A measurably better place to work.</span>
            </div>
            <div className="result-stat">
              <span className="rs-num">25 → 37</span>
              <span className="rs-label">Locations, 5 countries</span>
              <span className="rs-desc">Growth the culture could sustain.</span>
            </div>
          </div>
          <p className="results-note">
            Culture shifted from concept to concrete behavior. The business
            followed.
          </p>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="deliverables ds-section" id="deliverables">
        <div className="section-inner">
          <div className="section-label">What You Get</div>
          <h2 className="section-title">
            An operational playbook, not a PDF.
          </h2>
          <p className="section-subtitle">
            Everything maps to your goals, your values, your people. No generic
            recommendations.
          </p>
          <div className="deliverables-grid">
            <div className="deliv-card">
              <h3>State of Culture Report</h3>
              <p>
                Multi-layer convergent analysis. Employee survey data, leadership
                interviews, and focus groups. Three independent sources
                classified against the same 19-driver framework. YoY trends.
                Division-level breakdowns.
              </p>
            </div>
            <div className="deliv-card">
              <h3>Individual Leader Profiles</h3>
              <p>
                Every interviewed leader scored 1–6 with full evidence chains.
                Seven-section extractions detailed enough for performance
                reviews. Your talent map, built on data.
              </p>
            </div>
            <div className="deliv-card">
              <h3>Practice Matrix</h3>
              <p>
                Your own people's best practices mapped to your strategic goals.
                Named owners assigned. Signal strength rated. The training
                curriculum already exists inside your company.
              </p>
            </div>
            <div className="deliv-card">
              <h3>Queryable AI Knowledge Base</h3>
              <p>
                Leadership can ask questions of the data anytime. "What did our
                North region say about supervisors?" Answered in seconds, with
                evidence citations. Always-on.
              </p>
            </div>
            <div className="deliv-card">
              <h3>Implementation Support</h3>
              <p>
                Action plan workshops with your leadership team. Named owners,
                90-day targets, and we work alongside your team to make it
                happen. Not "good luck." Let's go.
              </p>
            </div>
            <div className="deliv-card">
              <h3>Culture Engine Quarterly</h3>
              <p>
                Optional ongoing measurement. Pulse survey every 90 days through
                the same 19-driver framework. Track whether your initiatives are
                actually working. Course-correct in weeks, not years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="engagement ds-section" id="engagement">
        <div className="section-inner">
          <div className="section-label">The Engagement</div>
          <h2 className="section-title">
            Three phases. Eight weeks to first insights.
          </h2>
          <p className="section-subtitle">
            A structured process that turns raw data into an operational
            playbook.
          </p>
          <div className="phases">
            <div className="phase">
              <div className="phase-label">Phase 1</div>
              <h3>Discovery</h3>
              <p>
                Survey deployment across your organization. 20–40 leadership
                interviews. Focus groups with frontline staff. Strategic context
                collection. Your goals, values, and priorities.
              </p>
              <div className="phase-timeline">Weeks 1–4</div>
            </div>
            <div className="phase">
              <div className="phase-label">Phase 2</div>
              <h3>Analysis</h3>
              <p>
                AI-powered classification against 19 validated drivers. Leader
                scoring with evidence chains. Convergent analysis across all
                three data sources. Full report delivery and action plan
                workshop.
              </p>
              <div className="phase-timeline">Weeks 4–8</div>
            </div>
            <div className="phase">
              <div className="phase-label">Phase 3</div>
              <h3>Activation</h3>
              <p>
                Implementation support alongside your team. Quarterly pulse
                measurement. AI knowledge base always-on. We don't hand you a
                report and walk away. We help you make it real.
              </p>
              <div className="phase-timeline">Ongoing</div>
            </div>
          </div>
        </div>
      </section>

      {/* IDEAL FIT */}
      <section className="fit ds-section" id="fit">
        <div className="section-inner">
          <div className="section-label">Is This For You?</div>
          <h2 className="section-title">
            Companies growing fast enough that leadership can't feel the floor
            anymore.
          </h2>
          <div className="fit-tags">
            <span className="fit-tag">200–10,000+ employees</span>
            <span className="fit-tag">Multi-location or single-site</span>
            <span className="fit-tag">Retail &amp; Hospitality</span>
            <span className="fit-tag">F&amp;B</span>
            <span className="fit-tag">Services</span>
            <span className="fit-tag">Corporate</span>
            <span className="fit-tag">Scaling fast</span>
            <span className="fit-tag">
              Tried interventions that didn't stick
            </span>
          </div>
        </div>
      </section>

      {/* FRAMEWORK NOTE */}
      <section
        style={{ background: "var(--warm-white)", padding: "3rem 2rem" }}
      >
        <div
          className="section-inner"
          style={{ textAlign: "center", maxWidth: 700 }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            Built on the{" "}
            <strong style={{ color: "var(--dark)" }}>19-driver model</strong>{" "}
            validated by Utrecht University &amp; 2DaysMood across 300+
            companies. AI-powered classification across surveys, interviews, and
            focus groups. Every finding is evidence-backed and traceable to
            source data.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <h2>Let's start with a conversation.</h2>
        <p>
          30 minutes. No pitch. Just understanding what you're dealing with, and
          whether this can help.
        </p>
        <a
          href="mailto:joe@dreamscope.win?subject=Culture%20Engine%20-%20Let's%20talk"
          className="cta-btn"
        >
          Email me to start →
        </a>
      </section>

      {/* FOOTER */}
      <footer className="ds-footer">
        <p>
          Dreamscope Consulting &middot;{" "}
          <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a> &middot;
          &copy; 2026
        </p>
      </footer>
    </div>
  );
};

export default CultureEngine;
