export const SITE_NAME = "Tech Hilfe Pro";
export const DEFAULT_LOCALE = "de-DE";
export const DEFAULT_OG_LOCALE = "de_DE";
export const DEFAULT_IMAGE = "/og/default.jpg"; // Platzhalter in /public anlegen
export const SITE_URL = (import.meta as any)?.env?.SITE_URL || "https://example.com";

type SeoEntry = { title: string; description: string; path: string; type?: "website" | "article" };

export const SEO_PAGES: Record<string, SeoEntry> = {
  home: { title: "IT-Hilfe in Köln & Neuss | Tech Hilfe Pro", description: "Wir richten es ein. Wir halten es am Laufen. PC/Mac, WLAN, Drucker, Smart-TV, Sicherheit – remote oder vor Ort.", path: "/" },
  leistungen: { title: "Leistungen | IT-Service für Privat & KMU", description: "PC/Mac-Hilfe, WLAN-Optimierung, Drucker-Setup, Smart-Home, Sicherheit, Backups – klar erklärt.", path: "/leistungen" },
  preise: { title: "Pakete & Preise | Transparent & fair", description: "Abos für Senioren, On-Demand, KMU-Tiers pro Gerät. 20 % Vor-Ort-Rabatt für Abonnenten.", path: "/pakete-preise" },
  termin: { title: "Termin buchen | Schnell & unkompliziert", description: "Jetzt Termin anfragen. Remote zuerst – Vor-Ort nach Bedarf. Köln, Neuss & Umgebung.", path: "/termin" },
  terminSum: { title: "Termin – Zusammenfassung", description: "Ihre Termin- und Preisdaten zur Bestätigung und als ICS-Download.", path: "/termin/zusammenfassung" },
  terminOk: { title: "Termin bestätigt", description: "Vielen Dank! Wir melden uns zeitnah mit Details.", path: "/termin/bestaetigt" },
  kasse: { title: "Kasse | Zahlung (Sandbox)", description: "SEPA-Lastschrift, Karte, Apple Pay – sicher über Stripe.", path: "/kasse" },
  ueber: { title: "Über uns | Lokal & zuverlässig", description: "Regionale IT-Hilfe mit klaren Preisen und ehrlicher Beratung.", path: "/ueber-uns" },
  kontakt: { title: "Kontakt | Wir sind für Sie da", description: "Schreiben Sie uns oder rufen Sie an. Köln, Neuss & Umgebung.", path: "/kontakt" },
  techniker: { title: "Techniker | Vor-Ort-Abwicklung", description: "Interner Ablauf für Vor-Ort-Einsätze mit Quick Charge.", path: "/techniker" },
  beleg: { title: "Beleg | Druckansicht", description: "Übersicht zur Abrechnung – druckfreundlich.", path: "/beleg" },
  impressum: { title: "Impressum", description: "Angaben gemäß § 5 TMG. Verantwortlich: [Name/Anschrift].", path: "/recht/impressum" },
  datenschutz: { title: "Datenschutzerklärung", description: "Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.", path: "/recht/datenschutz" },
  agb: { title: "AGB", description: "Allgemeine Geschäftsbedingungen für IT-Service & Support.", path: "/recht/agb" },
  widerruf: { title: "Widerruf", description: "Hinweise zum Widerrufsrecht und Ausnahmen bei Eilaufträgen.", path: "/recht/widerruf" }
};

export function fullUrl(path: string) {
  const base = SITE_URL.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}