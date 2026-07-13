import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const WEBHOOK = "https://n8n.dreamscope.win/webhook/workshop-prework";

const css = `
  :root {
    --wp-dark: #1E2B3A;
    --wp-caramel: #B5895A;
    --wp-caramel-deep: #9C7144;
    --wp-cream: #FBF8F1;
    --wp-white: #FFFFFF;
    --wp-body: #4A4036;
    --wp-muted: #8A7E70;
    --wp-line: #E7DECF;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .wp-page {
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--wp-body);
    background: var(--wp-cream);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  .wp-page * { box-sizing: border-box; }
  .wp-wrap { max-width: 720px; margin: 0 auto; padding: 0 1.25rem; }

  /* HERO */
  .wp-hero { background: var(--wp-dark); padding: 3.5rem 0 3rem; position: relative; overflow: hidden; }
  .wp-hero::after {
    content: ''; position: absolute; top: -45%; right: -20%;
    width: 520px; height: 520px;
    background: radial-gradient(circle, rgba(181,137,90,0.20) 0%, transparent 70%);
    border-radius: 50%;
  }
  .wp-hero .wp-wrap { position: relative; z-index: 1; }
  .wp-kicker {
    display: block; font-size: 0.74rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 2.5px; color: var(--wp-caramel); margin-bottom: 1.2rem;
  }
  .wp-hero h1 {
    font-family: 'Cormorant Garamond', serif; font-weight: 600; color: #fff;
    font-size: clamp(2.3rem, 7vw, 3.6rem); line-height: 1.08; margin-bottom: 1.2rem;
  }
  .wp-hero p { font-size: 1.05rem; color: rgba(255,255,255,0.78); max-width: 580px; line-height: 1.7; }

  /* FORM SECTIONS */
  .wp-form { padding: 2.6rem 0 3.5rem; }
  .wp-slab {
    font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600;
    color: var(--wp-dark); margin: 2rem 0 1rem;
  }
  .wp-slab:first-child { margin-top: 0; }
  .wp-card {
    background: var(--wp-white); border: 1px solid var(--wp-line); border-radius: 14px;
    padding: 1.3rem 1.2rem; margin-bottom: 1rem;
  }
  .wp-card label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--wp-muted); margin-bottom: 0.35rem; }
  .wp-card input[type="text"], .wp-card input[type="email"], .wp-card select, .wp-card textarea {
    display: block; width: 100%; font-family: inherit; font-size: 1rem;
    padding: 0.9rem 1rem; border-radius: 10px; border: 1.5px solid var(--wp-line);
    background: var(--wp-cream); color: var(--wp-dark); margin-bottom: 1rem;
  }
  .wp-card input:focus, .wp-card select:focus, .wp-card textarea:focus {
    outline: 2px solid var(--wp-caramel); outline-offset: 1px;
  }
  .wp-card select { appearance: none; -webkit-appearance: none; }
  .wp-card textarea { resize: vertical; min-height: 110px; }
  .wp-card > :last-child { margin-bottom: 0; }

  /* CANDIDATE CARDS */
  .wp-cand-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 0.9rem; }
  .wp-cand-title {
    font-size: 0.74rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--wp-caramel-deep);
  }
  .wp-remove {
    font-family: inherit; font-size: 0.82rem; font-weight: 600; color: var(--wp-muted);
    background: none; border: none; cursor: pointer; padding: 0.3rem 0.4rem;
  }
  .wp-remove:hover { color: var(--wp-caramel-deep); }
  .wp-read { padding: 0.9rem 0 0; }
  .wp-read-text { font-size: 0.95rem; color: var(--wp-dark); line-height: 1.5; margin-bottom: 0.6rem; }
  .wp-seg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.45rem; }
  .wp-seg button {
    font-family: inherit; font-size: 0.88rem; font-weight: 600;
    padding: 0.7rem 0.3rem; min-height: 44px;
    background: var(--wp-cream); color: var(--wp-muted);
    border: 1.5px solid var(--wp-line); border-radius: 10px;
    cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .wp-seg button:hover { border-color: var(--wp-caramel); color: var(--wp-caramel-deep); }
  .wp-seg button.on { background: var(--wp-caramel); border-color: var(--wp-caramel); color: #fff; }
  .wp-pain { margin-top: 1.1rem; }

  .wp-add {
    display: block; width: 100%; font-family: inherit; font-size: 0.95rem; font-weight: 600;
    color: var(--wp-caramel-deep); background: none; border: 2px dashed var(--wp-line);
    border-radius: 14px; padding: 1rem; cursor: pointer; margin-bottom: 1rem;
    transition: border-color 0.15s, color 0.15s;
  }
  .wp-add:hover { border-color: var(--wp-caramel); color: var(--wp-caramel); }

  /* FIRST PICK */
  .wp-pick-q { font-size: 1rem; color: var(--wp-dark); font-weight: 600; line-height: 1.5; margin-bottom: 0.6rem; }
  .wp-pick-row {
    display: flex; align-items: center; gap: 0.8rem; padding: 0.85rem 0.4rem;
    border-top: 1px solid var(--wp-line); cursor: pointer;
  }
  .wp-pick-row:first-of-type { border-top: none; }
  .wp-pick-row input[type="radio"] {
    width: 1.25rem; height: 1.25rem; accent-color: var(--wp-caramel); flex-shrink: 0; cursor: pointer;
  }
  .wp-pick-row span { font-size: 0.98rem; color: var(--wp-dark); }
  .wp-pick-row span.unnamed { color: var(--wp-muted); font-style: italic; }

  /* SUBMIT */
  .wp-submit {
    display: block; width: 100%; font-family: inherit;
    background: var(--wp-caramel); color: #fff; border: none; border-radius: 10px;
    padding: 1.05rem 2rem; font-size: 1.05rem; font-weight: 600; cursor: pointer;
    transition: background 0.2s, transform 0.2s; margin-top: 1.6rem;
  }
  .wp-submit:hover:not(:disabled) { background: var(--wp-caramel-deep); transform: translateY(-1px); }
  .wp-submit:disabled { opacity: 0.4; cursor: not-allowed; }
  .wp-missing { font-size: 0.85rem; color: var(--wp-muted); margin-top: 0.7rem; text-align: center; }
  .wp-fail { margin-top: 1rem; font-size: 0.92rem; color: #A54B2E; text-align: center; }
  .wp-fail a { color: var(--wp-caramel-deep); }

  /* SUCCESS */
  .wp-success { text-align: center; padding: 1.5rem 0 0.5rem; }
  .wp-success h2 {
    font-family: 'Cormorant Garamond', serif; font-weight: 600; color: var(--wp-dark);
    font-size: clamp(1.9rem, 5vw, 2.5rem); margin-bottom: 0.6rem;
  }
  .wp-success p { font-size: 1.05rem; color: var(--wp-body); max-width: 460px; margin: 0 auto; }

  .wp-hp { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden; }

  /* FOOTER */
  .wp-footer { background: var(--wp-dark); padding: 2rem; text-align: center; }
  .wp-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .wp-footer a { color: var(--wp-caramel); text-decoration: none; }

  @media (max-width: 420px) {
    .wp-seg button { font-size: 0.82rem; padding: 0.65rem 0.2rem; }
  }
`;

const READS: { key: "repeats" | "judgment" | "exhaust"; text: string }[] = [
  { key: "repeats", text: "It comes back weekly or monthly in roughly the same shape." },
  { key: "judgment", text: "Doing it well depends on someone's judgment, not just following steps." },
  { key: "exhaust", text: "It runs on information that lives in files, email, or systems you could show us." },
];

const READ_OPTIONS: { label: string; value: string }[] = [
  { label: "Yes", value: "yes" },
  { label: "Somewhat", value: "somewhat" },
  { label: "No", value: "no" },
];

const PROGRAMS = [
  "First Win",
  "Build Day",
  "The Cohort",
  "Team Win",
  "Team Build",
  "Done For You",
  "Not sure yet",
];

interface Candidate {
  key: number;
  job: string;
  repeats: string | null;
  judgment: string | null;
  exhaust: string | null;
  pain: string;
}

let nextKey = 3;
const freshCandidate = (key: number): Candidate => ({
  key,
  job: "",
  repeats: null,
  judgment: null,
  exhaust: null,
  pain: "",
});

const WorkshopPrep = () => {
  usePageMeta({
    title: "Workshop Pre-work · What Should Claude Do First?",
    description:
      "Name 3 to 5 real jobs from your work. Three quick reads on each tell us which one to build first in your session.",
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [program, setProgram] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([
    freshCandidate(0),
    freshCandidate(1),
    freshCandidate(2),
  ]);
  const [firstPickKey, setFirstPickKey] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const updateCandidate = (key: number, patch: Partial<Candidate>) => {
    setCandidates((prev) => prev.map((c) => (c.key === key ? { ...c, ...patch } : c)));
  };

  const addCandidate = () => {
    setCandidates((prev) => (prev.length >= 5 ? prev : [...prev, freshCandidate(nextKey++)]));
  };

  const removeCandidate = (key: number) => {
    setCandidates((prev) => (prev.length <= 3 ? prev : prev.filter((c) => c.key !== key)));
    setFirstPickKey((prev) => (prev === key ? null : prev));
  };

  const missing: string[] = [];
  if (!email.trim()) missing.push("your email");
  candidates.forEach((c, i) => {
    if (!c.job.trim()) missing.push(`a job for candidate ${i + 1}`);
    if (!c.repeats || !c.judgment || !c.exhaust) missing.push(`the reads on candidate ${i + 1}`);
  });
  if (firstPickKey === null || !candidates.some((c) => c.key === firstPickKey))
    missing.push("your pick");
  const ready = missing.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || formState === "sending") return;
    setFormState("sending");
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          form: "workshop_prework",
          version: 1,
          submitter: {
            name: name.trim() || null,
            email: email.trim(),
            company: company.trim() || null,
            role: role.trim() || null,
            program: program || null,
          },
          candidates: candidates.map((c) => ({
            job: c.job.trim(),
            repeats: c.repeats,
            judgment: c.judgment,
            exhaust: c.exhaust,
            pain: c.pain.trim() || null,
          })),
          firstPick: candidates.findIndex((c) => c.key === firstPickKey),
          notes: notes.trim() || null,
          website,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFormState("sent");
    } catch {
      setFormState("failed");
    }
  };

  return (
    <div className="wp-page">
      {/* HERO */}
      <header className="wp-hero">
        <div className="wp-wrap">
          <span className="wp-kicker">Workshop pre-work</span>
          <h1>What should Claude do first?</h1>
          <p>
            Name 3 to 5 jobs in your work you'd hand to a capable coworker
            tomorrow. Three quick reads on each tell us (and you) which one to
            build first. We read every submission and come back with an honest
            pick before your session.
          </p>
        </div>
      </header>

      {/* FORM */}
      <section className="wp-form">
        <div className="wp-wrap">
          {formState === "sent" ? (
            <div className="wp-success">
              <h2>Got it.</h2>
              <p>
                We read every one and come back with an honest pick before your
                session.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="wp-slab">You</h2>
              <div className="wp-card">
                <label htmlFor="wp-name">Name</label>
                <input
                  id="wp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
                <label htmlFor="wp-email">Work email (required)</label>
                <input
                  id="wp-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
                <label htmlFor="wp-company">Company</label>
                <input
                  id="wp-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                />
                <label htmlFor="wp-role">Role</label>
                <input
                  id="wp-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="What you do there"
                />
                <label htmlFor="wp-program">Which program are you considering?</label>
                <select
                  id="wp-program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                >
                  <option value="">Select one</option>
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <h2 className="wp-slab">Your candidates</h2>
              {candidates.map((c, i) => (
                <div className="wp-card" key={c.key}>
                  <div className="wp-cand-head">
                    <span className="wp-cand-title">Candidate {i + 1}</span>
                    {candidates.length > 3 && (
                      <button
                        type="button"
                        className="wp-remove"
                        onClick={() => removeCandidate(c.key)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <label htmlFor={`wp-job-${c.key}`}>What's the job? (required)</label>
                  <input
                    id={`wp-job-${c.key}`}
                    type="text"
                    value={c.job}
                    onChange={(e) => updateCandidate(c.key, { job: e.target.value })}
                    placeholder="One line, in your own words"
                  />
                  {READS.map((r) => (
                    <div className="wp-read" key={r.key}>
                      <div className="wp-read-text">{r.text}</div>
                      <div className="wp-seg" role="group" aria-label={r.text}>
                        {READ_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={c[r.key] === opt.value ? "on" : ""}
                            aria-pressed={c[r.key] === opt.value}
                            onClick={() => updateCandidate(c.key, { [r.key]: opt.value })}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="wp-pain">
                    <label htmlFor={`wp-pain-${c.key}`}>
                      What makes it painful? (optional)
                    </label>
                    <input
                      id={`wp-pain-${c.key}`}
                      type="text"
                      value={c.pain}
                      onChange={(e) => updateCandidate(c.key, { pain: e.target.value })}
                      placeholder="One line is plenty"
                    />
                  </div>
                </div>
              ))}
              {candidates.length < 5 && (
                <button type="button" className="wp-add" onClick={addCandidate}>
                  + Add another
                </button>
              )}

              <h2 className="wp-slab">Your pick</h2>
              <div className="wp-card">
                <div className="wp-pick-q">
                  If only one could be running by the end of your session,
                  which one?
                </div>
                {candidates.map((c, i) => (
                  <label className="wp-pick-row" key={c.key}>
                    <input
                      type="radio"
                      name="wp-first-pick"
                      checked={firstPickKey === c.key}
                      onChange={() => setFirstPickKey(c.key)}
                    />
                    {c.job.trim() ? (
                      <span>{c.job.trim()}</span>
                    ) : (
                      <span className="unnamed">Candidate {i + 1} (not named yet)</span>
                    )}
                  </label>
                ))}
              </div>

              <div className="wp-card">
                <label htmlFor="wp-notes">Anything else we should know? (optional)</label>
                <textarea
                  id="wp-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Context, constraints, the thing you almost wrote in a job line"
                />
              </div>

              <div className="wp-hp" aria-hidden="true">
                <label htmlFor="wp-website">Website</label>
                <input
                  id="wp-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <button className="wp-submit" type="submit" disabled={!ready || formState === "sending"}>
                {formState === "sending" ? "Sending..." : "Send my pre-work"}
              </button>
              {!ready && (
                <p className="wp-missing">Still needed: {missing.join(", ")}.</p>
              )}
              {formState === "failed" && (
                <p className="wp-fail">
                  That didn't send. Try again or just email{" "}
                  <a href="mailto:joe@dreamscope.win">joe@dreamscope.win</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wp-footer">
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

export default WorkshopPrep;
