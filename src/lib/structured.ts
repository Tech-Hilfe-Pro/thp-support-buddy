import { SITE_NAME, SITE_URL, DEFAULT_LOCALE } from "../data/seo";

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
    telephone: params.telephone || "+49 1556 5029989",
    address: {
      "@type": "PostalAddress",
      streetAddress: params.address?.streetAddress || "Schirmerstr. 7",
      postalCode: params.address?.postalCode || "50823",
      addressLocality: params.address?.addressLocality || "Köln",
      addressRegion: params.address?.addressRegion || "NRW",
      addressCountry: params.address?.addressCountry || "DE"
    },
    areaServed: params.areaServed || ["Köln", "Neuss"],
    openingHours: params.openingHours || ["Mo-Fr 09:00-18:00"],
    geo: params.geo ? { "@type": "GeoCoordinates", ...params.geo } : undefined
  };
}

export function webSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: DEFAULT_LOCALE
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