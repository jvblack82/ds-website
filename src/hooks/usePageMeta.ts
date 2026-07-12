import { useEffect } from "react";

const SITE_ORIGIN = "https://www.dreamscope.win";

interface PageMeta {
  title: string;
  description: string;
  /** Absolute canonical URL. Defaults to https://www.dreamscope.win + current route path. */
  canonical?: string;
  /** When true, sets meta robots to noindex,nofollow. Removed otherwise. */
  noindex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Per-route head manager. Sets document.title, description, OG tags,
 * canonical link, and robots directives on mount and whenever values change.
 * Values persist until the next routed page sets its own (every routed page
 * calls this hook, so there is nothing to restore on unmount).
 */
export function usePageMeta({ title, description, canonical, noindex }: PageMeta) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);

    const path = window.location.pathname.replace(/\/+$/, "");
    const url = canonical ?? `${SITE_ORIGIN}${path === "" ? "/" : path}`;
    upsertMeta("property", "og:url", url);

    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    const robots = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"]'
    );
    if (noindex) {
      upsertMeta("name", "robots", "noindex,nofollow");
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, canonical, noindex]);
}
