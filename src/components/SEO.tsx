import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/data/company";

const SITE_URL = import.meta.env.SITE_URL || import.meta.env.VITE_SITE_URL || "https://techhilfepro.de";

type Props = {
  title?: string; 
  description?: string; 
  path: string;
  robots?: string; 
  ogImage?: string; 
  ogType?: "website"|"article"; 
  lang?: "de";
  imageAlt?: string;
};

export default function SEO({ 
  title = "IT-Support & Managed Services in Köln & Neuss | Tech Hilfe Pro", 
  description = "Remote & vor-Ort-Service. Transparente Preise. DSGVO-konform.", 
  path, 
  robots, 
  ogImage = "/og/IT-Support-Koeln_Tech-Hilfe-Pro.jpg", 
  ogType = "website", 
  lang = "de",
  imageAlt = "IT-Support in Köln – Tech Hilfe Pro"
}: Props) {
  const base = SITE_URL.replace(/\/$/, "");
  const url = `${base}${path}`;
  const img = ogImage.startsWith("http") ? ogImage : `${base}${ogImage}`;
  
  // Schema.org structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": COMPANY.brand,
    "image": `${base}/brand/logo.png`,
    "url": base,
    "telephone": COMPANY.telDisplay,
    "email": COMPANY.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY.street,
      "addressLocality": COMPANY.city,
      "postalCode": COMPANY.postalCode,
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
      },
      {
        "@type": "State",
        "name": "Nordrhein-Westfalen"
      }
    ],
    "paymentAccepted": "Stripe, Überweisung, Rechnung",
    "priceRange": "€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      COMPANY.whatsappUrl
    ],
    "description": "IT-Support für Privat & KMU in Köln, Neuss & Umgebung. Remote-First, Vor-Ort bei Bedarf. Transparente Preise, monatlich kündbar."
  };
  
  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots && <meta name="robots" content={robots} />}
      <link rel="canonical" href={url} />
      
      {/* OpenGraph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={lang==="de"?"de_DE":"en_US"} />
      <meta property="og:site_name" content={COMPANY.brand} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/brand/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon.png" />
      <meta name="theme-color" content="#3BA9FF" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
}
