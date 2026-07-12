import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoDreamscope from "@/assets/logo-dreamscope.png";

type NavChild = { label: string; to?: string; href?: string };
type NavGroupDef = {
  id: string;
  label: string;
  to: string;
  overviewLabel: string;
  items: NavChild[];
};

const groups: NavGroupDef[] = [
  {
    id: "culture",
    label: "Culture",
    to: "/culture",
    overviewLabel: "Culture overview",
    items: [
      { label: "The Practice", to: "/culture" },
      { label: "The Culture Engine", to: "/culture-engine" },
      { label: "The 2-minute Culture Check", to: "/check/culture" },
      {
        label: "Take the discovery",
        href: "https://discovery.dreamscope.win/culture",
      },
    ],
  },
  {
    id: "maestro",
    label: "AI Maestro",
    to: "/ai-maestro",
    overviewLabel: "AI Maestro overview",
    items: [
      { label: "AI Maestro", to: "/ai-maestro" },
      { label: "AI Coaching", to: "/coaching" },
      { label: "The Self-Updating Website", to: "/website" },
      { label: "Workshop pre-work", to: "/workshops/prep" },
    ],
  },
];

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
  .ds-nav-logo img { height: 32px; width: auto; display: block; }
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

  /* Grouped dropdowns (desktop) */
  .ds-nav-group { position: relative; }
  .ds-nav-group-trigger { display: flex; align-items: center; gap: 0.25rem; }
  .ds-nav-chev {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.4rem 0.2rem;
    margin: 0;
    display: flex;
    align-items: center;
    color: #3A3A3A;
    border-radius: 4px;
    line-height: 1;
  }
  .ds-nav-chev svg { width: 11px; height: 11px; display: block; transition: transform 0.18s; }
  .ds-nav-chev:hover, .ds-nav-chev:focus-visible { color: #0C7C8A; }
  .ds-nav-chev:focus-visible { outline: 2px solid #0C7C8A; outline-offset: 2px; }
  .ds-nav-group.open .ds-nav-chev svg { transform: rotate(180deg); }
  .ds-nav-dropdown {
    position: absolute;
    top: 100%;
    left: -0.75rem;
    padding-top: 14px;
    display: none;
    z-index: 110;
  }
  .ds-nav-group.open .ds-nav-dropdown { display: block; }
  .ds-nav-dropdown-panel {
    background: #FDFCFA;
    border: 1px solid rgba(30, 43, 58, 0.1);
    border-radius: 8px;
    box-shadow: 0 12px 30px -14px rgba(30, 43, 58, 0.3);
    padding: 0.45rem;
    min-width: 236px;
    display: flex;
    flex-direction: column;
  }
  .ds-nav-drop-link {
    display: block;
    padding: 0.6rem 0.85rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #3A3A3A;
    text-decoration: none;
    border-radius: 6px;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;
  }
  .ds-nav-drop-link:hover, .ds-nav-drop-link:focus-visible {
    background: rgba(12, 124, 138, 0.08);
    color: #1E2B3A;
  }
  .ds-nav-drop-link.active { color: #0C7C8A; }
  .ds-nav-ext { color: #0C7C8A; margin-left: 0.2rem; }

  /* Mobile */
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
  .ds-nav-macc-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.92rem;
    font-weight: 500;
    color: #3A3A3A;
    text-align: left;
  }
  .ds-nav-macc-btn svg { width: 11px; height: 11px; display: block; transition: transform 0.18s; }
  .ds-nav-macc-btn.exp { color: #0C7C8A; }
  .ds-nav-macc-btn.exp svg { transform: rotate(180deg); }
  .ds-nav-macc-kids {
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
    margin-top: 1rem;
    padding-left: 1rem;
    border-left: 2px solid rgba(12, 124, 138, 0.25);
  }
  .ds-nav-macc-kids .ds-nav-link { font-size: 0.9rem; }
  @media (max-width: 760px) {
    .ds-nav-links { display: none; }
    .ds-nav-toggle { display: block; }
    .ds-nav-mobile.open { display: flex; }
  }
`;

const chevron = (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M2.2 4.3 L6 8.1 L9.8 4.3"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileExp, setMobileExp] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLElement>(null);
  const { pathname, hash } = useLocation();

  const close = () => setMobileOpen(false);

  // Close menus and dropdowns on route change.
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileExp({});
  }, [pathname, hash]);

  // Close on outside click and on Escape.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    "ds-nav-link" + (isActive ? " active" : "");
  const dropLinkClass = ({ isActive }: { isActive: boolean }) =>
    "ds-nav-drop-link" + (isActive ? " active" : "");

  const groupIsActive = (g: NavGroupDef) =>
    g.items.some(
      (it) => it.to && (pathname === it.to || pathname.startsWith(it.to + "/"))
    );

  return (
    <>
      <style>{navStyles}</style>
      <nav className="ds-nav" ref={navRef}>
        <div className="ds-nav-inner">
          <Link to="/" className="ds-nav-logo" onClick={close} aria-label="Dreamscope home">
            <img src={logoDreamscope} alt="Dreamscope" />
          </Link>
          <div className="ds-nav-links">
            {groups.map((g) => {
              const open = openGroup === g.id;
              return (
                <div
                  key={g.id}
                  className={"ds-nav-group" + (open ? " open" : "")}
                  onMouseEnter={() => setOpenGroup(g.id)}
                  onMouseLeave={() =>
                    setOpenGroup((cur) => (cur === g.id ? null : cur))
                  }
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenGroup((cur) => (cur === g.id ? null : cur));
                    }
                  }}
                >
                  <div className="ds-nav-group-trigger">
                    <Link
                      to={g.to}
                      className={
                        "ds-nav-link" + (groupIsActive(g) ? " active" : "")
                      }
                    >
                      {g.label}
                    </Link>
                    <button
                      type="button"
                      className="ds-nav-chev"
                      aria-expanded={open}
                      aria-haspopup="true"
                      aria-controls={`ds-nav-dropdown-${g.id}`}
                      aria-label={`Open ${g.label} menu`}
                      onClick={() => setOpenGroup(open ? null : g.id)}
                      onFocus={(e) => {
                        if (e.currentTarget.matches(":focus-visible")) {
                          setOpenGroup(g.id);
                        }
                      }}
                    >
                      {chevron}
                    </button>
                  </div>
                  <div
                    className="ds-nav-dropdown"
                    id={`ds-nav-dropdown-${g.id}`}
                  >
                    <div className="ds-nav-dropdown-panel">
                      {g.items.map((it) =>
                        it.href ? (
                          <a
                            key={it.label}
                            className="ds-nav-drop-link"
                            href={it.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {it.label}
                            <span className="ds-nav-ext" aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <NavLink
                            key={it.label}
                            to={it.to!}
                            end
                            className={dropLinkClass}
                            onClick={() => setOpenGroup(null)}
                          >
                            {it.label}
                          </NavLink>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className={"ds-nav-mobile" + (mobileOpen ? " open" : "")}>
          {groups.map((g) => {
            const exp = !!mobileExp[g.id];
            const kids: NavChild[] = [
              { label: g.overviewLabel, to: g.to },
              ...g.items.filter((it) => it.to !== g.to),
            ];
            return (
              <div key={g.id}>
                <button
                  type="button"
                  className={"ds-nav-macc-btn" + (exp ? " exp" : "")}
                  aria-expanded={exp}
                  aria-haspopup="true"
                  onClick={() =>
                    setMobileExp((m) => ({ ...m, [g.id]: !m[g.id] }))
                  }
                >
                  <span>{g.label}</span>
                  {chevron}
                </button>
                {exp && (
                  <div className="ds-nav-macc-kids">
                    {kids.map((it) =>
                      it.href ? (
                        <a
                          key={it.label}
                          className="ds-nav-link"
                          href={it.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={close}
                        >
                          {it.label}
                          <span className="ds-nav-ext" aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <NavLink
                          key={it.label}
                          to={it.to!}
                          end
                          className={linkClass}
                          onClick={close}
                        >
                          {it.label}
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
