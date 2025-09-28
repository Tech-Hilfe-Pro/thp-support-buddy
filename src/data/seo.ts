export const SITE_NAME = "Tech Hilfe Pro";
export const DEFAULT_LOCALE = "de-DE";
export const DEFAULT_OG_LOCALE = "de_DE";
export const DEFAULT_IMAGE = "/og/default.jpg"; // Platzhalter in /public anlegen
export const SITE_URL = (import.meta as any)?.env?.SITE_URL || "https://example.com";

type SeoEntry = { title: string; description: string; path: string; type?: "website" | "article" };

export const SEO_PAGES: Record<string, SeoEntry> = {
  home: { title: "IT-Service Köln & Neuss | Schnelle PC-Hilfe vor Ort | Tech Hilfe Pro", description: "Professioneller IT-Service in Köln & Neuss. PC, Mac, WLAN, Drucker, Smart-Home - remote oder vor Ort. Faire Preise, schnelle Hilfe.", path: "/" },
  leistungen: { title: "IT-Service Köln | PC-Hilfe, WLAN, Drucker Setup | Tech Hilfe Pro", description: "Alle IT-Services auf einen Blick: PC/Mac-Reparatur, WLAN-Optimierung, Drucker-Installation, Smart-Home Setup in Köln & Neuss.", path: "/leistungen" },
  preise: { title: "IT-Service Preise Köln | Transparente Kosten & Abos | Tech Hilfe Pro", description: "Faire IT-Service Preise in Köln. Senioren-Abos ab 19€, On-Demand ab 39€. KMU-Pakete pro Gerät. 20% Vor-Ort-Rabatt für Abonnenten.", path: "/pakete-preise" },
  termin: { title: "IT-Service Termin buchen Köln | Schnell & unkompliziert | Tech Hilfe Pro", description: "Jetzt IT-Service Termin in Köln & Neuss buchen. Remote-Start oder Vor-Ort-Besuch. Schnelle Terminvergabe, faire Preise.", path: "/termin" },
  terminSum: { title: "Termin Zusammenfassung | IT-Service Köln", description: "Ihre Termin- und Preisdaten zur Bestätigung. ICS-Download für Ihren Kalender verfügbar.", path: "/termin/zusammenfassung" },
  terminOk: { title: "Termin bestätigt | IT-Service Köln", description: "Vielen Dank! Ihr IT-Service Termin ist bestätigt. Wir melden uns zeitnah mit weiteren Details.", path: "/termin/bestaetigt" },
  kasse: { title: "Zahlung | IT-Service Köln (Intern)", description: "Sichere Zahlung über Stripe. SEPA-Lastschrift, Karte oder Apple Pay für IT-Services.", path: "/kasse" },
  ueber: { title: "Über uns | Lokaler IT-Service Köln & Neuss | Tech Hilfe Pro", description: "Ihr lokaler IT-Service in Köln & Neuss. Persönlich, zuverlässig, mit fairen Preisen. Lernen Sie unser Team kennen.", path: "/ueber-uns" },
  kontakt: { title: "IT-Service Kontakt Köln | Wir sind für Sie da | Tech Hilfe Pro", description: "Kontaktieren Sie uns für IT-Service in Köln & Neuss. Telefon, E-Mail oder persönlich. Schnelle Hilfe bei allen IT-Problemen.", path: "/kontakt" },
  techniker: { title: "Techniker Portal | IT-Service Vor-Ort (Intern)", description: "Interner Arbeitsbereich für Techniker. Vor-Ort-Abwicklung mit Quick Charge Funktion.", path: "/techniker" },
  beleg: { title: "Beleg | IT-Service Abrechnung (Intern)", description: "Rechnungsübersicht für IT-Services. Druckfreundliche Darstellung für Belege und Abrechnungen.", path: "/beleg" },
  impressum: { title: "Impressum | IT-Service Köln | Tech Hilfe Pro", description: "Impressum und Anbieterkennzeichnung von Tech Hilfe Pro. Rechtliche Angaben gemäß § 5 TMG für IT-Service Köln.", path: "/recht/impressum" },
  datenschutz: { title: "Datenschutz | IT-Service Köln | Tech Hilfe Pro", description: "Datenschutzerklärung für IT-Services. Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.", path: "/recht/datenschutz" },
  agb: { title: "AGB | IT-Service Köln Geschäftsbedingungen | Tech Hilfe Pro", description: "Allgemeine Geschäftsbedingungen für IT-Service & Support in Köln. Leistungsumfang, Preise und Vertragsbedingungen.", path: "/recht/agb" },
  widerruf: { title: "Widerruf | IT-Service Köln Widerrufsrecht | Tech Hilfe Pro", description: "Widerrufsbelehrung für IT-Service Verträge. Hinweise zum Widerrufsrecht und Ausnahmen bei Eilaufträgen.", path: "/recht/widerruf" }
};

export function fullUrl(path: string) {
  const base = SITE_URL.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}