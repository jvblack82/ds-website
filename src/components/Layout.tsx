import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motionSafeScrollBehavior } from "@/lib/utils";
import Navbar from "./Navbar";

// After a cold load, fonts and images above the target are still settling
// when the first scroll runs, and they push the target down. Land on it once
// more when they have settled, unless the visitor has already started
// scrolling. Returns a cleanup.
function landAgainAfterLoad(id: string) {
  // Aborted by the visitor's first input, by the cleanup, or once the second
  // landing is done; every listener below goes with it.
  const stop = new AbortController();
  const { signal } = stop;
  for (const e of ["wheel", "touchstart", "keydown", "mousedown"]) {
    window.addEventListener(e, () => stop.abort(), { passive: true, signal });
  }
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true, signal }));
  Promise.all([document.fonts.ready, loaded]).then(() => {
    if (signal.aborted) return;
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    stop.abort();
  });
  return () => stop.abort();
}

const Layout = () => {
  const { pathname, hash } = useLocation();
  const coldLoad = useRef(true);

  // Scroll to the hash target on navigation, otherwise jump to top. A cold
  // load jumps without animating: a smooth scroll still running when the
  // second landing fires carries on past the target.
  useEffect(() => {
    const firstRun = coldLoad.current;
    coldLoad.current = false;
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        if (firstRun) {
          el.scrollIntoView({ behavior: "instant" });
          return landAgainAfterLoad(id);
        }
        el.scrollIntoView({ behavior: motionSafeScrollBehavior() });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
