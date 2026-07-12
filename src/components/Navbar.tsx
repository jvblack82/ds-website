import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoDreamscope from "@/assets/logo-dreamscope.png";

const navStyles = `
  .ds-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(253, 252, 250, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(30, 43, 58, 0.08);
    font-family: 'DM Sans', sans-serif;
  }
  .ds-nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0.85rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ds-nav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .ds-nav-logo img { height: 30px; width: auto; display: block; }
  .ds-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .ds-nav-link {
    font-size: 0.92rem;
    color: #3A3A3A;
    text-decoration: none;
    transition: color 0.2s;
    font-weight: 500;
  }
  .ds-nav-link:hover { color: #1E2B3A; }
  .ds-nav-link.active { color: #0C7C8A; }
  .ds-nav-cta {
    background: #0C7C8A;
    color: #fff;
    padding: 0.55rem 1.3rem;
    border-radius: 7px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .ds-nav-cta:hover { background: #0E96A6; transform: translateY(-1px); }
  .ds-nav-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #1E2B3A;
    font-size: 1.5rem;
    line-height: 1;
    padding: 0;
  }
  .ds-nav-mobile {
    display: none;
    flex-direction: column;
    gap: 1.1rem;
    padding: 0.5rem 2rem 1.5rem;
  }
  @media (max-width: 760px) {
    .ds-nav-links { display: none; }
    .ds-nav-toggle { display: block; }
    .ds-nav-mobile.open { display: flex; }
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    "ds-nav-link" + (isActive ? " active" : "");

  return (
    <>
      <style>{navStyles}</style>
      <nav className="ds-nav">
        <div className="ds-nav-inner">
          <Link to="/" className="ds-nav-logo" onClick={close} aria-label="Dreamscope home">
            <img src={logoDreamscope} alt="Dreamscope" />
          </Link>
          <div className="ds-nav-links">
            <NavLink to="/culture" className={linkClass}>
              Culture
            </NavLink>
            <NavLink to="/ai-maestro" className={linkClass}>
              AI Maestro
            </NavLink>
            <NavLink to="/workshops" className={linkClass}>
              Workshops
            </NavLink>
            <Link to="/#contact" className="ds-nav-cta">
              Let's Talk
            </Link>
          </div>
          <button
            className="ds-nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
        <div className={"ds-nav-mobile" + (open ? " open" : "")}>
          <NavLink to="/culture" className={linkClass} onClick={close}>
            Culture
          </NavLink>
          <NavLink to="/ai-maestro" className={linkClass} onClick={close}>
            AI Maestro
          </NavLink>
          <NavLink to="/workshops" className={linkClass} onClick={close}>
            Workshops
          </NavLink>
          <Link
            to="/#contact"
            className="ds-nav-cta"
            onClick={close}
            style={{ alignSelf: "flex-start" }}
          >
            Let's Talk
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
