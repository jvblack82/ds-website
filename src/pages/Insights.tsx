import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { INSIGHTS } from "@/data/insights";

const css = `
  :root {
    --ins-dark: #1E2B3A;
    --ins-teal: #0C7C8A;
    --ins-teal-light: #0E96A6;
    --ins-cream: #F7F4EF;
    --ins-sand: #EDE8E0;
    --ins-warm-white: #FDFCFA;
    --ins-body: #3A3A3A;
    --ins-muted: #7A7A7A;
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }

  .ins-page {
    font-family: 'DM Sans', sans-serif;
    color: var(--ins-body);
    background: var(--ins-warm-white);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  .ins-page * { box-sizing: border-box; }
  .ins-wrap { max-width: 860px; margin: 0 auto; padding: 0 2rem; }

  /* HERO */
  .ins-hero { background: var(--ins-dark); color: #fff; padding: 4rem 0 4.2rem; position: relative; overflow: hidden; }
  .ins-hero::after {
    content: ''; position: absolute; top: -55%; right: -12%;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(12,124,138,0.18) 0%, transparent 70%);
    border-radius: 50%;
  }
  .ins-hero .ins-wrap { position: relative; z-index: 1; }
  .ins-kicker {
    display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 2.5px; color: var(--ins-teal-light); margin-bottom: 1.1rem;
  }
  .ins-hero h1 {
    font-family: 'DM Serif Display', serif; font-weight: 400;
    font-size: clamp(2.4rem, 5vw, 3.4rem); line-height: 1.1; margin-bottom: 1rem;
  }
  .ins-hero p { font-size: 1.1rem; color: rgba(255,255,255,0.75); max-width: 560px; }

  /* LIST */
  .ins-list { padding: 4rem 0 5rem; }
  .ins-card {
    display: block; text-decoration: none; background: #fff;
    border: 1px solid var(--ins-sand); border-radius: 14px;
    padding: 2rem 2.2rem; margin-bottom: 1.4rem;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }
  .ins-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px -24px rgba(30,43,58,0.35);
    border-color: var(--ins-teal);
  }
  .ins-card-meta {
    font-size: 0.78rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1.5px; color: var(--ins-teal); margin-bottom: 0.7rem;
  }
  .ins-card h2 {
    font-family: 'DM Serif Display', serif; font-weight: 400;
    font-size: clamp(1.4rem, 2.6vw, 1.8rem); line-height: 1.25;
    color: var(--ins-dark); margin-bottom: 0.6rem;
  }
  .ins-card p { font-size: 0.98rem; color: var(--ins-muted); line-height: 1.65; margin: 0; }
  .ins-card-read {
    display: inline-block; margin-top: 1.1rem; font-size: 0.92rem;
    font-weight: 600; color: var(--ins-teal);
  }

  /* FOOTER */
  .ins-footer { background: var(--ins-dark); border-top: 1px solid rgba(255,255,255,0.08); padding: 2rem; text-align: center; }
  .ins-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); margin: 0; }
  .ins-footer a { color: var(--ins-teal-light); text-decoration: none; }

  @media (max-width: 560px) {
    .ins-hero { padding: 3rem 0 3.2rem; }
    .ins-list { padding: 3rem 0 3.5rem; }
    .ins-card { padding: 1.5rem 1.4rem; }
  }
`;

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const Insights = () => {
  usePageMeta({
    title: "Insights · Dreamscope Consulting",
    description:
      "Field notes from the culture practice and the AI work. Written by Joe Black, an operator based in Ho Chi Minh City.",
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
    <div className="ins-page">
      {/* HERO */}
      <header className="ins-hero">
        <div className="ins-wrap">
          <span className="ins-kicker">Dreamscope · Insights</span>
          <h1>Insights</h1>
          <p>Field notes from the culture practice and the AI work. Written by Joe.</p>
        </div>
      </header>

      {/* ARTICLE CARDS */}
      <section className="ins-list">
        <div className="ins-wrap">
          {INSIGHTS.map((article) => (
            <Link
              key={article.slug}
              to={`/insights/${article.slug}`}
              className="ins-card"
            >
              <div className="ins-card-meta">
                {formatDate(article.date)} · {article.minutes} min read
              </div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span className="ins-card-read">Read the piece →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ins-footer">
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
          · <Link to="/#about">About</Link> · © 2026
        </p>
      </footer>
    </div>
  );
};

export default Insights;
