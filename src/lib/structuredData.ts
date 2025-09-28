import { COMPANY } from "@/data/company";

export function buildOrganizationJsonLd() {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://www.techhilfepro.de";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY.brand,
    "url": siteUrl,
    "logo": `${siteUrl}/brand/logo.svg`,
    "email": COMPANY.email,
    "telephone": COMPANY.telE164,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY.street,
      "postalCode": COMPANY.postalCode,
      "addressLocality": COMPANY.city,
      "addressRegion": "NW",
      "addressCountry": "DE"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Köln"
      },
      {
        "@type": "City", 
        "name": "Neuss"
      }
    ],
    "openingHours": "Mo-Fr 09:00-18:00"
  };
}

export function buildLocalBusinessJsonLd() {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://www.techhilfepro.de";
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#localbusiness`,
    "name": COMPANY.brand,
    "url": siteUrl,
    "image": `${siteUrl}/og/default.jpg`,
    "telephone": COMPANY.telE164,
    "email": COMPANY.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY.street,
      "postalCode": COMPANY.postalCode,
      "addressLocality": COMPANY.city,
      "addressRegion": "NW",
      "addressCountry": "DE"
    },
    "areaServed": ["Köln", "Neuss"],
    "openingHours": ["Mo-Fr 09:00-18:00"],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.956,
      "longitude": 6.957
    }
  };
}