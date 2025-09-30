export const PRIVAT_ABOS = [
  { 
    id: "basic", 
    name: "Home-Office+ Basic", 
    preis: 16.90, 
    segment: "privat" as const,
    devicesHint: "1–5 Geräte",
    rabattVorOrt: 0.20, 
    features: [
      "Monitoring leicht",
      "AV/Updates verwaltet", 
      "Priorität Standard",
      "20% Vor-Ort-Rabatt für Abonnenten"
    ],
    legacyIds: ["S", "M"] // Mapping für bestehende Referenzen
  },
  { 
    id: "plus", 
    name: "Home-Office+ Plus", 
    preis: 24.90, 
    segment: "privat" as const,
    devicesHint: "1–5 Geräte",
    rabattVorOrt: 0.20, 
    features: [
      "Alle Basic-Features",
      "Jährlicher WLAN-Check",
      "Verwalteter Premium-Virenschutz",
      "Priorität Express"
    ],
    legacyIds: ["L"] // Mapping für bestehende Referenzen
  },
];

export const PRIVAT_ON_DEMAND = {
  erstdiagnose: { preis:39, dauerMin:30, text:"Erstdiagnose Remote (30 Min). Danach 15-Min-Blöcke." },
  folgeblock: { preis:9.90, blockMin:15 },
  vorOrtHinweis: "Vor-Ort ab 45 Min; Anfahrt je PLZ-Zone; Ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend."
};

export const KMU_TIERS = [
  { 
    id: "grow", 
    name: "KMU Grow", 
    preisProGeraet: 49, 
    segment: "kmu" as const,
    devicesHint: "bis 29 Mitarbeitende",
    features: [
      "Monitoring + Patch-Management",
      "Remote-Support",
      "Monatsreport",
      "M365-Backup",
      "MDM/MTD mobil",
      "Reaktionszeit < 8h"
    ],
    legacyIds: ["starter", "grow"] // Mapping für bestehende Referenzen
  },
  { 
    id: "pro", 
    name: "KMU Pro", 
    preisProGeraet: 79, 
    segment: "kmu" as const,
    devicesHint: "bis 29 Mitarbeitende", 
    features: [
      "Alle Grow-Features",
      "Image-Backup auf kritischen Geräten",
      "1× Vor-Ort/Monat inkl.",
      "SLA 4h"
    ],
    legacyIds: ["pro"] // Mapping für bestehende Referenzen
  },
];

export const STRIPE_PLAN_TO_ENV: Record<string, string> = {
  // Neue Struktur
  basic: "PRICE_PRIVAT_BASIC",
  plus: "PRICE_PRIVAT_PLUS",
  grow: "PRICE_KMU_GROW", 
  pro: "PRICE_KMU_PRO",
  
  // Legacy Support
  S: "PRICE_PRIVAT_BASIC", // Maps to Basic
  M: "PRICE_PRIVAT_BASIC", // Maps to Basic  
  L: "PRICE_PRIVAT_PLUS",  // Maps to Plus
  starter: "PRICE_KMU_GROW" // Maps to Grow
};