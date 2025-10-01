import { SITE_URL, DEFAULT_OG_LOCALE } from "../data/seo";

const SITE_NAME = "Tech Hilfe Pro";

type PostalAddress = { 
  streetAddress: string; 
  postalCode: string; 
  addressLocality: string; 
  addressRegion: string; 
  addressCountry: string; 
};

export function localBusiness(params: {
  name?: string; 
  telephone?: string; 
  address?: PostalAddress; 
  areaServed?: string[];
  url?: string; 
  sameAs?: string[];
  openingHours?: string[]; 
  geo?: { latitude: number; longitude: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#local`,
    name: params.name || SITE_NAME,
    url: params.url || SITE_URL,
    image: `${SITE_URL}/og/default.jpg`,
    telephone: params.telephone || "+49 15565029989",
    address: {
      "@type": "PostalAddress",
      streetAddress: params.address?.streetAddress || "Büro in Köln (virtuell)",
      postalCode: params.address?.postalCode || "50667",
      addressLocality: params.address?.addressLocality || "Köln",
      addressRegion: params.address?.addressRegion || "NRW",
      addressCountry: params.address?.addressCountry || "DE"
    },
    areaServed: params.areaServed || ["Köln", "Neuss", "40 km Umkreis"],
    openingHours: params.openingHours || ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
    geo: params.geo ? { "@type": "GeoCoordinates", ...params.geo } : undefined
  };
}

export function webSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "de-DE"
  };
}

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url
    }))
  };
}

export function faq(entries: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(e => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer }
    }))
  };
}