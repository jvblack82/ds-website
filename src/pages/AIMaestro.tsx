import { useEffect } from "react";

// Phase 1 placeholder. Replaced by the full AI Maestro page in Phase 3.
const css = `
  .aim-soon {
    min-height: 72vh;
    background: #FBF8F1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    font-family: 'Inter', sans-serif;
  }
  .aim-soon-inner { max-width: 600px; text-align: center; }
  .aim-soon-kicker {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #B5895A;
    margin-bottom: 1.2rem;
  }
  .aim-soon h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    color: #1E2B3A;
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.15;
  }
  .aim-soon p { color: #6b6257; font-size: 1.05rem; line-height: 1.7; }
  .aim-soon a { color: #B5895A; font-weight: 600; text-decoration: none; }
`;

const AIMaestro = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="aim-soon">
      <div className="aim-soon-inner">
        <div className="aim-soon-kicker">Dreamscope · AI Maestro</div>
        <h1>The operations mind that understands AI.</h1>
        <p>
          This page is launching shortly. In the meantime, the 15-minute
          discovery is open.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <a href="https://discovery.dreamscope.win/ai_maestro">
            Take the discovery →
          </a>
        </p>
      </div>
    </div>
  );
};

export default AIMaestro;
