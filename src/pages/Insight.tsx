import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getInsight, type InsightBlock } from "@/data/insights";

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

  /* ARTICLE HERO */
  .ins-art-hero { background: var(--ins-dark); color: #fff; padding: 3.6rem 0 3.8rem; position: relative; overflow: hidden; }
  .ins-art-hero::after {
    content: ''; position: absolute; top: -55%; right: -12%;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(12,124,138,0.18) 0%, transparent 70%);
    border-radius: 50%;
  }
  .ins-art-hero .ins-wrap { position: relative; z-index: 1; }
  .ins-crumb { font-size: 0.85rem; margin-bottom: 1.3rem; }
  .ins-crumb a { color: var(--ins-teal-light); text-decoration: none; font-weight: 600; }
  .ins-art-hero h1 {
    font-family: 'DM Serif Display', serif; font-weight: 400;
    font-size: clamp(2rem, 4.5vw, 3rem); line-height: 1.15;
    max-width: 22ch; margin-bottom: 1.1rem;
  }
  .ins-byline { font-size: 0.95rem; color: rgba(255,255,255,0.65); }
  .ins-byline strong { color: rgba(255,255,255,0.9); font-weight: 600; }

  /* BODY */
  .ins-body { padding: 3.6rem 0 4.2rem; }
  .ins-measure { max-width: 65ch; margin: 0 auto; }
  .ins-measure p { font-size: 1.08rem; line-height: 1.8; margin: 0 0 1.4rem; }
  .ins-measure h2 {
    font-family: 'DM Serif Display', serif; font-weight: 400;
    font-size: clamp(1.5rem, 3vw, 1.9rem); line-height: 1.25;
    color: var(--ins-dark); margin: 2.6rem 0 1.1rem;
  }
  .ins-measure blockquote {
    font-family: 'DM Serif Display', serif; font-style: italic;
    font-size: 1.45rem; line-height: 1.45; color: var(--ins-teal);
    border-left: 3px solid var(--ins-teal); padding-left: 1.5rem;
    margin: 2.2rem 0;
  }
  .ins-measure ul { list-style: none; padding: 0; margin: 0 0 1.4rem; }
  .ins-measure li {
    font-size: 1.04rem; line-height: 1.7; padding: 0.55rem 0 0.55rem 1.6rem;
    position: relative; border-top: 1px solid var(--ins-sand);
  }
  .ins-measure li:first-child { border-top: none; }
  .ins-measure li::before { content: '→'; position: absolute; left: 0; color: var(--ins-teal); }

  /* CLOSING BAND */
  .ins-band { background: var(--ins-dark); color: #fff; padding: 4rem 0; text-align: center; }
  .ins-band h2 {
    font-family: 'DM Serif Display', serif; font-weight: 400;
    font-size: clamp(1.7rem, 3.4vw, 2.4rem); margin-bottom: 0.9rem;
  }
  .ins-band p { color: rgba(255,255,255,0.65); font-size: 1.05rem; max-width: 560px; margin: 0 auto 2rem; line-height: 1.7; }
  .ins-band-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; }
  .ins-btn {
    display: inline-block; padding: 0.95rem 2rem; border-radius: 8px;
    text-decoration: none; font-weight: 600; font-size: 1rem;
    transition: transform 0.2s, background 0.2s, border-color 0.2s, color 0.2s;
  }
  .ins-btn.teal { background: var(--ins-teal); color: #fff; }
  .ins-btn.teal:hover { background: var(--ins-teal-light); transform: translateY(-1px); }
  .ins-btn.outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.35); }
  .ins-btn.outline:hover { border-color: var(--ins-teal-light); color: var(--ins-teal-light); }
  .ins-band-back { margin-top: 1.6rem; font-size: 0.9rem; }
  .ins-band-back a { color: var(--ins-teal-light); text-decoration: none; }

  /* FOOTER */
  .ins-footer { background: var(--ins-dark); border-top: 1px solid rgba(255,255,255,0.08); padding: 2rem; text-align: center; }
  .ins-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); margin: 0; }
  .ins-footer a { color: var(--ins-teal-light); text-decoration: none; }

  /* NOT FOUND */
  .ins-missing { padding: 5rem 0; text-align: center; }
  .ins-missing h1 { font-family: 'DM Serif Display', serif; font-weight: 400; color: var(--ins-dark); font-size: 2rem; margin-bottom: 0.8rem; }
  .ins-missing a { color: var(--ins-teal); font-weight: 600; text-decoration: none; }

  @media (max-width: 560px) {
    .ins-art-hero { padding: 2.8rem 0 3rem; }
    .ins-body { padding: 2.8rem 0 3.2rem; }
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

function renderBlock(block: InsightBlock, i: number) {
  switch (block.t) {
    case "h2":
      return <h2 key={i}>{block.x}</h2>;
    case "quote":
      return <blockquote key={i}>{block.x}</blockquote>;
    case "ul":
      return (
        <ul key={i}>
          {(block.x as string[]).map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p key={i}>{block.x}</p>;
  }
}

const Insight = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getInsight(slug);

  usePageMeta(
    article
      ? {
          title: `${article.title} · Dreamscope Insights`,
          description: article.description,
          canonical: `https://www.dreamscope.win/insights/${article.slug}`,
        }
      : {
          title: "Insight not found · Dreamscope Consulting",
          description: "That piece doesn't exist. The rest of the insights do.",
          noindex: true,
        }
  );

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // BlogPosting structured data for the article
  useEffect(() => {
    if (!article) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      author: { "@type": "Person", name: "Joe Black" },
      publisher: { "@type": "Organization", name: "Dreamscope Consulting", url: "https://www.dreamscope.win" },
      mainEntityOfPage: `https://www.dreamscope.win/insights/${article.slug}`,
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [article]);

  if (!article) {
    return (
      <div className="ins-page">
        <div className="ins-wrap ins-missing">
          <h1>That piece doesn't exist.</h1>
          <p>
            <Link to="/insights">Back to all insights →</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ins-page">
      {/* ARTICLE HERO */}
      <header className="ins-art-hero">
        <div className="ins-wrap">
          <div className="ins-crumb">
            <Link to="/insights">← Insights</Link>
          </div>
          <h1>{article.title}</h1>
          <div className="ins-byline">
            <strong>Joe Black</strong> · {formatDate(article.date)} ·{" "}
            {article.minutes} min read
          </div>
        </div>
      </header>

      {/* BODY */}
      <article className="ins-body">
        <div className="ins-wrap">
          <div className="ins-measure">
            {article.blocks.map((block, i) => renderBlock(block, i))}
          </div>
        </div>
      </article>

      {/* CLOSING BAND */}
      <section className="ins-band">
        <div className="ins-wrap">
          <h2>{article.band.heading}</h2>
          <p>{article.band.body}</p>
          <div className="ins-band-links">
            {article.band.links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  className={`ins-btn ${link.primary ? "teal" : "outline"}`}
                  href={link.href}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  className={`ins-btn ${link.primary ? "teal" : "outline"}`}
                  to={link.href}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
          <div className="ins-band-back">
            <Link to="/insights">← All insights</Link>
          </div>
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

export default Insight;
