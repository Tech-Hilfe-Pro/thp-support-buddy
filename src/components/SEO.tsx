import { useEffect } from "react";
import { SITE_NAME, DEFAULT_OG_LOCALE, DEFAULT_IMAGE, fullUrl } from "../data/seo";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  robots?: "index,follow" | "noindex,nofollow";
  locale?: string; // "de_DE"
  canonical?: string;
  hreflang?: { lang: string; href: string }[]; // optional
  jsonLd?: any[]; // Array von Objekten → mehrere <script type="application/ld+json">
};

function upsertMeta(attr: "name"|"property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, attrs: Record<string,string> = {}) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${attrs["hreflang"] ? `[hreflang="${attrs["hreflang"]}"]` : ""}`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(attrs).forEach(([k,v]) => el!.setAttribute(k, v));
}

function removeExisting(selector: string) {
  document.head.querySelectorAll(selector).forEach(n => n.parentElement?.removeChild(n));
}

export default function SEO(props: SEOProps) {
  const {
    title, description, path, type = "website",
    image = DEFAULT_IMAGE, robots = "index,follow",
    locale = DEFAULT_OG_LOCALE, canonical, hreflang, jsonLd
  } = props;

  useEffect(() => {
    const abs = canonical || fullUrl(path);
    document.title = title;
    
    // Basic
    upsertMeta("name", "description", description);
    upsertLink("canonical", abs);
    upsertMeta("name", "robots", robots);
    
    // OG
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", locale);
    upsertMeta("property", "og:url", abs);
    upsertMeta("property", "og:image", image.startsWith("http") ? image : fullUrl(image));
    
    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image.startsWith("http") ? image : fullUrl(image));
    
    // hreflang (einsprachig DE, dennoch rel alternate & x-default setzen)
    removeExisting('link[rel="alternate"]');
    const selfHref = abs;
    upsertLink("alternate", selfHref, { hreflang: "de-DE" });
    upsertLink("alternate", selfHref, { hreflang: "x-default" });
    
    // JSON-LD
    document.head.querySelectorAll('script[data-thp="jsonld"]').forEach(s => s.remove());
    (jsonLd || []).forEach(obj => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-thp","jsonld");
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
    
    return () => {};
  }, [title, description, path, type, image, robots, locale, canonical, JSON.stringify(hreflang), JSON.stringify(jsonLd)]);

  return null;
}