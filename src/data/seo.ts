export const DEFAULT_TITLE = "Tech Hilfe Pro | IT-Service Köln & Neuss";
export const DEFAULT_DESCRIPTION = "Professioneller IT-Service für Privat & KMU in Köln, Neuss & Umgebung. PC, Mac, WLAN, Drucker – remote oder vor Ort.";
export const DEFAULT_OG_LOCALE = "de_DE";
export const DEFAULT_IMAGE = "/og/default.jpg";
export const SITE_URL = (import.meta as any)?.env?.SITE_URL || "https://techhilfepro.de";

type SeoEntry = { title: string; description: string; path: string; type?: "website" | "article" };

export const SEO_PAGES: Record<string, SeoEntry> = {
  home: { title: "IT-Service Köln & Neuss | Tech Hilfe Pro", description: "Professioneller IT-Service in Köln & Neuss. PC, Mac, WLAN, Drucker, Smart-Home - remote oder vor Ort.", path: "/" },
  leistungen: { title: "IT-Leistungen | Tech Hilfe Pro", description: "Alle IT-Services: PC/Mac-Reparatur, WLAN-Optimierung, Drucker, Smart-Home Setup in Köln & Neuss.", path: "/leistungen" },
  kmu: { title: "KMU Managed Services | Tech Hilfe Pro", description: "IT-Betreuung für kleine und mittlere Unternehmen. Monitoring, Patches, Backup pro Gerät.", path: "/kmu" },
  preise: { title: "IT-Service Preise | Tech Hilfe Pro", description: "Transparente IT-Preise für Privat & KMU. Monatliche Pakete oder On-Demand.", path: "/preise" },
  faq: { title: "Häufige Fragen | Tech Hilfe Pro", description: "Antworten auf die wichtigsten Fragen zu IT-Service, Preisen und Ablauf.", path: "/faq" },
  termin: { title: "Termin buchen | Tech Hilfe Pro", description: "Jetzt IT-Service Termin in Köln & Neuss buchen. Remote oder vor Ort.", path: "/termin" },
  terminSum: { title: "Termin Zusammenfassung | Tech Hilfe Pro", description: "Ihre Termin- und Preisdaten zur Bestätigung.", path: "/termin/zusammenfassung" },
  terminOk: { title: "Termin bestätigt | Tech Hilfe Pro", description: "Vielen Dank! Ihr IT-Service Termin ist bestätigt.", path: "/termin/bestaetigt" },
  kasse: { title: "Zahlung | Tech Hilfe Pro", description: "Sichere Zahlung über Stripe.", path: "/kasse" },
  ueber: { title: "Über uns | Tech Hilfe Pro", description: "Ihr IT-Service in Köln & Neuss. Persönlich, zuverlässig, fair.", path: "/ueber-uns" },
  kontakt: { title: "Kontakt | Tech Hilfe Pro", description: "Kontaktieren Sie uns für IT-Service in Köln & Neuss.", path: "/kontakt" },
  techniker: { title: "Techniker Portal | Tech Hilfe Pro", description: "Interner Arbeitsbereich für Techniker.", path: "/techniker" },
  beleg: { title: "Beleg | Tech Hilfe Pro", description: "Rechnungsübersicht für IT-Services.", path: "/beleg" },
  impressum: { title: "Impressum | Tech Hilfe Pro", description: "Impressum und Anbieterkennzeichnung.", path: "/recht/impressum" },
  datenschutz: { title: "Datenschutz | Tech Hilfe Pro", description: "Datenschutzerklärung von Tech Hilfe Pro.", path: "/recht/datenschutz" },
  agb: { title: "AGB | Tech Hilfe Pro", description: "Allgemeine Geschäftsbedingungen von Tech Hilfe Pro.", path: "/recht/agb" },
  widerruf: { title: "Widerruf | Tech Hilfe Pro", description: "Widerrufsbelehrung für Verbraucher.", path: "/recht/widerruf" }
};
