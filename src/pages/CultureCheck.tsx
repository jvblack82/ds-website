import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const DISCOVERY = "https://discovery.dreamscope.win/culture";
const WEBHOOK = "https://n8n.dreamscope.win/webhook/culture-check";

const css = `
  :root {
    --cc-dark: #1E2B3A;
    --cc-teal: #0C7C8A;
    --cc-teal-light: #0E96A6;
    --cc-cream: #F7F4EF;
    --cc-sand: #EDE8E0;
    --cc-warm-white: #FDFCFA;
    --cc-body: #3A3A3A;
    --cc-muted: #7A7A7A;
    --cc-accent-bg: #E8F4F5;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .cc-page {
    font-family: 'DM Sans', sans-serif;
    color: var(--cc-body);
    background: var(--cc-warm-white);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  .cc-page * { box-sizing: border-box; }
  .cc-wrap { max-width: 720px; margin: 0 auto; padding: 0 1.25rem; }

  /* HERO */
  .cc-hero { background: var(--cc-dark); color: #fff; padding: 3.5rem 0 3rem; position: relative; overflow: hidden; }
  .cc-hero::after {
    content: ''; position: absolute; top: -45%; right: -20%;
    width: 520px; height: 520px;
    background: radial-gradient(circle, rgba(12,124,138,0.18) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cc-hero .cc-wrap { position: relative; z-index: 1; }
  .cc-kicker {
    display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 2.5px; color: var(--cc-teal-light); margin-bottom: 1.2rem;
  }
  .cc-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2rem, 6vw, 3.1rem); line-height: 1.12; font-weight: 400;
    margin-bottom: 1.2rem; max-width: 18ch;
  }
  .cc-hero p { font-size: 1.05rem; color: rgba(255,255,255,0.78); max-width: 560px; line-height: 1.7; }

  /* STATEMENTS */
  .cc-check { padding: 2.6rem 0 3.5rem; background: var(--cc-warm-white); }
  .cc-q {
    background: #fff; border: 1px solid var(--cc-sand); border-radius: 14px;
    padding: 1.3rem 1.2rem 1.2rem; margin-bottom: 1rem;
  }
  .cc-q-num { font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; color: var(--cc-teal); margin-bottom: 0.4rem; }
  .cc-q-text { font-size: 1.02rem; color: var(--cc-dark); font-weight: 500; line-height: 1.55; }
  .cc-seg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 1rem; }
  .cc-seg button {
    font-family: inherit; font-size: 0.92rem; font-weight: 600;
    padding: 0.85rem 0.3rem; min-height: 48px;
    background: var(--cc-warm-white); color: var(--cc-muted);
    border: 1.5px solid var(--cc-sand); border-radius: 10px;
    cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .cc-seg button:hover { border-color: var(--cc-teal-light); color: var(--cc-teal); }
  .cc-seg button.on { background: var(--cc-teal); border-color: var(--cc-teal); color: #fff; }

  /* PROGRESS + SUBMIT */
  .cc-progress { margin: 1.8rem 0 1rem; }
  .cc-progress-text { font-size: 0.85rem; color: var(--cc-muted); margin-bottom: 0.5rem; }
  .cc-progress-bar { height: 4px; background: var(--cc-sand); border-radius: 2px; overflow: hidden; }
  .cc-progress-fill { height: 100%; background: var(--cc-teal); border-radius: 2px; transition: width 0.25s; }
  .cc-submit {
    display: block; width: 100%; font-family: inherit;
    background: var(--cc-teal); color: #fff; border: none; border-radius: 10px;
    padding: 1.05rem 2rem; font-size: 1.05rem; font-weight: 600; cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .cc-submit:hover:not(:disabled) { background: var(--cc-teal-light); transform: translateY(-1px); }
  .cc-submit:disabled { opacity: 0.4; cursor: not-allowed; }

  /* RESULT */
  .cc-result { background: var(--cc-dark); color: #fff; padding: 3.5rem 0 4rem; }
  .cc-result-kicker {
    display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 2.5px; color: var(--cc-teal-light); margin-bottom: 1rem;
  }
  .cc-band { font-family: 'DM Serif Display', serif; font-size: clamp(1.9rem, 5.5vw, 2.7rem); font-weight: 400; line-height: 1.15; margin-bottom: 0.5rem; }
  .cc-score { font-size: 1.1rem; color: var(--cc-teal-light); font-weight: 600; margin-bottom: 1.4rem; }
  .cc-band-copy { font-size: 1.02rem; line-height: 1.8; color: rgba(255,255,255,0.85); max-width: 620px; margin-bottom: 2.2rem; }
  .cc-ctas { display: flex; flex-direction: column; gap: 1.5rem; }
  .cc-btn {
    display: inline-block; text-align: center; text-decoration: none;
    padding: 1rem 2rem; border-radius: 10px; font-weight: 600; font-size: 1.02rem;
    transition: background 0.2s, transform 0.2s, border-color 0.2s, color 0.2s;
  }
  .cc-btn.primary { background: var(--cc-teal); color: #fff; }
  .cc-btn.primary:hover { background: var(--cc-teal-light); transform: translateY(-1px); }
  .cc-btn.ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.35); }
  .cc-btn.ghost:hover { border-color: var(--cc-teal-light); color: var(--cc-teal-light); }

  /* EMAIL GATE */
  .cc-gate {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 1.5rem 1.3rem;
  }
  .cc-gate-lead { font-size: 0.98rem; color: rgba(255,255,255,0.8); margin-bottom: 1.1rem; line-height: 1.6; }
  .cc-gate label { display: block; font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.6); margin-bottom: 0.35rem; }
  .cc-gate input[type="email"], .cc-gate input[type="text"]:not(.cc-hp-input) {
    display: block; width: 100%; font-family: inherit; font-size: 1rem;
    padding: 0.9rem 1rem; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.2);
    background: #fff; color: var(--cc-dark); margin-bottom: 1rem;
  }
  .cc-gate input:focus { outline: 2px solid var(--cc-teal-light); outline-offset: 1px; }
  .cc-gate .cc-submit { margin-top: 0.2rem; }
  .cc-gate-fail { margin-top: 1rem; font-size: 0.92rem; color: #F3C0B0; }
  .cc-gate-fail a { color: #fff; }
  .cc-success { font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,0.9); }
  .cc-success strong { color: #fff; }

  .cc-hp { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden; }

  /* FOOTER */
  .cc-footer { background: var(--cc-dark); border-top: 1px solid rgba(255,255,255,0.08); padding: 2rem; text-align: center; }
  .cc-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .cc-footer a { color: var(--cc-teal-light); text-decoration: none; }

  @media (max-width: 420px) {
    .cc-seg button { font-size: 0.84rem; padding: 0.8rem 0.2rem; }
  }
`;

const QUESTIONS: { id: string; text: string }[] = [
  {
    id: "c1",
    text: "In the last month, bad news traveled up: someone on the frontline raised a real problem to a leader instead of sitting on it.",
  },
  {
    id: "c2",
    text: "Ask three people in three different teams what gets someone fired here regardless of their results. They'd give the same answer.",
  },
  {
    id: "c3",
    text: "In the last two weeks, a manager recognized a specific employee action, by name, in front of others, without HR prompting it.",
  },
  {
    id: "c4",
    text: "The last time we collected employee feedback, something visibly changed within 90 days, and employees could tell you what.",
  },
  {
    id: "c5",
    text: "The last time a strong performer resigned, leadership already knew they were at risk before the letter arrived.",
  },
  {
    id: "c6",
    text: "In the last quarter, a team changed how they do their own work without asking head office first.",
  },
  {
    id: "c7",
    text: "You can name someone below management level who got measurably better at their job in the last six months because the company invested in them.",
  },
  {
    id: "c8",
    text: "In the last year, how someone treats people has decided a promotion, a bonus, or an exit. In either direction.",
  },
];

const OPTIONS: { label: string; value: number }[] = [
  { label: "Describes us", value: 2 },
  { label: "Sometimes", value: 1 },
  { label: "Not us", value: 0 },
];

type BandId = "strong" | "mixed" | "at_risk";

const BANDS: Record<BandId, { label: string; copy: string }> = {
  strong: {
    label: "Built on purpose",
    copy: "Bad news reaches leaders. Recognition happens without being prompted. Behavior decides promotions. That is a culture built on purpose, showing up in observable behavior, which is the only place culture exists. Two warnings. First, these signals decay with scale. Habits that hold at 20 people strain at 50 and break past 150 unless somebody rebuilds them deliberately. What carried you here will not automatically survive your next doubling. Second, you answered for the company, and your frontline might answer differently. The gap between those two answers is where problems hide, and measuring it is exactly where the culture discovery starts. Want the question-by-question read too? Drop your email below.",
  },
  mixed: {
    label: "Holding on goodwill",
    copy: "Some of these behaviors are alive in your company. Others are running on individual goodwill instead of systems you built, and goodwill does not scale or survive turnover. This is the most common band and the riskiest place to sit while growing, because the strong signals mask the weak ones until a key resignation or a bad quarter pulls the cover off. What you need now is precision: which of the eight behaviors are carrying you, and which are decorative. Drop your email and we will send the per-question read, what each answer signals, and one practical move for every gap. Nothing generic. Prefer to put real data behind it first? Take the culture discovery.",
  },
  at_risk: {
    label: "Growing by accident",
    copy: "Your company has a culture. Every company does. Yours is growing by accident, which means how people treat each other and your customers is being set by whoever has the most influence on each team. Not by you. At a couple hundred employees that shows up as locations underperforming for reasons nobody can name, strong people leaving out of nowhere, and feedback rounds that change nothing. Posters and team builders will not fix it. Culture is behavior, and behavior gets managed, not decorated. Start with the per-question breakdown: what each gap is costing you and one concrete move per question, straight to your email. Ready for the bigger conversation? Take the culture discovery.",
  },
};

function bandFor(score: number): BandId {
  if (score >= 13) return "strong";
  if (score >= 8) return "mixed";
  return "at_risk";
}

const CultureCheck = () => {
  usePageMeta({
    title: "The Culture Check · Accident or On Purpose?",
    description:
      "Eight observable behaviors, two minutes, an honest read on whether your culture is built on purpose or growing by accident.",
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [answers, setAnswers] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(QUESTIONS.map((q) => [q.id, null]))
  );
  const [result, setResult] = useState<{ score: number; band: BandId } | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [gateState, setGateState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const resultRef = useRef<HTMLElement | null>(null);

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== null).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const handleAnswer = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    const score = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    setResult({ score, band: bandFor(score) });
  };

  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !email.trim() || gateState === "sending") return;
    setGateState("sending");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          form: "culture_check",
          version: 1,
          score: result.score,
          maxScore: 16,
          band: result.band,
          answers: QUESTIONS.map((q) => ({ id: q.id, value: answers[q.id] })),
          submitter: {
            email: email.trim(),
            name: name.trim() || null,
            company: company.trim() || null,
          },
          website,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setGateState("sent");
    } catch {
      setGateState("failed");
    }
  };

  const gate =
    gateState === "sent" ? (
      <div className="cc-gate">
        <p className="cc-success">
          <strong>Breakdown on its way.</strong> If you reply to that email it
          reaches me, not a funnel.
        </p>
      </div>
    ) : (
      <form className="cc-gate" onSubmit={handleGateSubmit}>
        <p className="cc-gate-lead">
          The per-question read: what each answer signals and one practical
          move for every gap, straight to your email.
        </p>
        <label htmlFor="cc-email">Work email (required)</label>
        <input
          id="cc-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
        <label htmlFor="cc-name">Name (optional)</label>
        <input
          id="cc-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <label htmlFor="cc-company">Company (optional)</label>
        <input
          id="cc-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
        />
        <div className="cc-hp" aria-hidden="true">
          <label htmlFor="cc-website">Website</label>
          <input
            id="cc-website"
            className="cc-hp-input"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <button className="cc-submit" type="submit" disabled={gateState === "sending"}>
          {gateState === "sending" ? "Sending..." : "Send me the breakdown"}
        </button>
        {gateState === "failed" && (
          <p className="cc-gate-fail">
            That didn't send. Try again or just email{" "}
            <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a>.
          </p>
        )}
      </form>
    );

  return (
    <div className="cc-page">
      {/* HERO */}
      <header className="cc-hero">
        <div className="cc-wrap">
          <span className="cc-kicker">The Culture Check</span>
          <h1>Is your culture growing by accident or on purpose?</h1>
          <p>
            Eight statements. Every one is an observable behavior from the last
            30 to 365 days, not an opinion about whether you value culture.
            About 2 minutes, honest answers only.
          </p>
        </div>
      </header>

      {/* STATEMENTS */}
      <section className="cc-check">
        <div className="cc-wrap">
          {QUESTIONS.map((q, i) => (
            <div className="cc-q" key={q.id}>
              <div className="cc-q-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="cc-q-text">{q.text}</div>
              <div className="cc-seg" role="group" aria-label={`Statement ${i + 1}`}>
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    className={answers[q.id] === opt.value ? "on" : ""}
                    aria-pressed={answers[q.id] === opt.value}
                    onClick={() => handleAnswer(q.id, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="cc-progress">
            <div className="cc-progress-text">
              {answeredCount} of {QUESTIONS.length} answered
            </div>
            <div className="cc-progress-bar">
              <div
                className="cc-progress-fill"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <button
            className="cc-submit"
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
          >
            See my result
          </button>
        </div>
      </section>

      {/* RESULT */}
      {result && (
        <section className="cc-result" ref={resultRef} id="result">
          <div className="cc-wrap">
            <span className="cc-result-kicker">Your result</span>
            <h2 className="cc-band">{BANDS[result.band].label}</h2>
            <div className="cc-score">{result.score} of 16</div>
            <p className="cc-band-copy">{BANDS[result.band].copy}</p>
            {result.band === "strong" ? (
              <div className="cc-ctas">
                <a className="cc-btn primary" href={DISCOVERY}>
                  Take the culture discovery →
                </a>
                {gate}
              </div>
            ) : (
              <div className="cc-ctas">
                {gate}
                <a className="cc-btn ghost" href={DISCOVERY}>
                  Take the culture discovery →
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="cc-footer">
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

export default CultureCheck;
