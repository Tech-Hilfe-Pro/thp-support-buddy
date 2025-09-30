import { COMPANY } from "@/data/company";
import { SITE_URL } from "@/data/seo";

/**
 * Generiert LocalBusiness Schema.org JSON-LD für lokale SEO
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    "name": COMPANY.brand,
    "url": SITE_URL,
    "logo": `${SITE_URL}/brand/logo.svg`,
    "image": `${SITE_URL}/og/default.jpg`,
    "telephone": COMPANY.telE164,
    "email": COMPANY.email,
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY.street,
      "postalCode": COMPANY.postalCode,
      "addressLocality": COMPANY.city,
      "addressRegion": "Nordrhein-Westfalen",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.956,
      "longitude": 6.957
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Köln",
        "addressRegion": "Nordrhein-Westfalen",
        "addressCountry": "DE"
      },
      {
        "@type": "City",
        "name": "Neuss",
        "addressRegion": "Nordrhein-Westfalen", 
        "addressCountry": "DE"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Köln & Umkreis 40km"
      }
    ],
    "openingHours": [
      "Mo-Fr 09:00-18:00"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "serviceType": "IT-Support & Computer-Service",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 50.956,
        "longitude": 6.957
      },
      "geoRadius": "40000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT-Service Angebote",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "PC & Mac Reparatur",
            "description": "Professionelle Reparatur und Wartung von Computern"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "WLAN & Netzwerk Setup",
            "description": "Installation und Optimierung von Netzwerken"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Smart Home Installation",
            "description": "Einrichtung intelligenter Haussteuerung"
          }
        }
      ]
    }
  };
}

/**
 * Generiert FAQ Schema.org JSON-LD
 */
export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

/**
 * Generiert Organization Schema.org JSON-LD
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    "name": COMPANY.brand,
    "url": SITE_URL,
    "logo": `${SITE_URL}/brand/logo.svg`,
    "email": COMPANY.email,
    "telephone": COMPANY.telE164,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY.street,
      "postalCode": COMPANY.postalCode,
      "addressLocality": COMPANY.city,
      "addressRegion": "Nordrhein-Westfalen",
      "addressCountry": "DE"
    },
    "founder": {
      "@type": "Person",
      "name": COMPANY.owner
    },
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Köln",
        "addressCountry": "DE"
      }
    },
    "sameAs": [
      COMPANY.whatsappUrl
    ]
  };
}

/**
 * Generiert WebSite Schema.org JSON-LD mit Suchfunktion
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    "name": COMPANY.brand,
    "url": SITE_URL,
    "inLanguage": "de-DE",
    "description": "Professioneller IT-Service in Köln & Neuss. PC, Mac, WLAN, Drucker, Smart-Home - remote oder vor Ort.",
    "publisher": {
      "@id": `${SITE_URL}#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/leistungen?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generiert BreadcrumbList Schema.org JSON-LD
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}