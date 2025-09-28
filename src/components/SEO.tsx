import { useEffect } from "react";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://www.techhilfepro.de";

type Props = {
  title: string;
  description: string;
  path: string;            // ej: "/pakete-preise"
  robots?: string;         // ej: "noindex,nofollow" para rutas internas
  ogImage?: string;        // ej: "/og/default.jpg" (1200x630)
  ogType?: "website" | "article";
  lang?: "de";
};

export default function SEO({ 
  title, 
  description, 
  path, 
  robots, 
  ogImage = "/og/default.jpg", 
  ogType = "website", 
  lang = "de" 
}: Props) {
  const base = SITE_URL.replace(/\/$/, "");
  const url = `${base}${path}`;
  const img = ogImage.startsWith("http") ? ogImage : `${base}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update or create link tags
    const updateLink = (rel: string, href: string) => {
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Basic meta tags
    updateMeta("name", "description", description);
    updateMeta("name", "viewport", "width=device-width, initial-scale=1");
    if (robots) {
      updateMeta("name", "robots", robots);
    }

    // Canonical URL
    updateLink("canonical", url);

    // Open Graph
    updateMeta("property", "og:type", ogType);
    updateMeta("property", "og:locale", lang === "de" ? "de_DE" : "en_US");
    updateMeta("property", "og:title", title);
    updateMeta("property", "og:description", description);
    updateMeta("property", "og:url", url);
    updateMeta("property", "og:image", img);

    // Twitter
    updateMeta("name", "twitter:card", "summary_large_image");
    updateMeta("name", "twitter:title", title);
    updateMeta("name", "twitter:description", description);
    updateMeta("name", "twitter:image", img);

    // Icons
    updateLink("icon", "/brand/favicon.svg");
    updateMeta("name", "theme-color", "#111827");

    // Add PNG favicon for better compatibility
    let pngIcon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/png"]');
    if (!pngIcon) {
      pngIcon = document.createElement("link");
      pngIcon.setAttribute("rel", "icon");
      pngIcon.setAttribute("type", "image/png");
      pngIcon.setAttribute("sizes", "32x32");
      pngIcon.setAttribute("href", "/brand/favicon.png");
      document.head.appendChild(pngIcon);
    }
  }, [title, description, path, robots, ogImage, ogType, lang, url, img]);

  return null;
}