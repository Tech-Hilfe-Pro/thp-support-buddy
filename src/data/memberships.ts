export type Audience = "PRIVAT" | "KMU";

export type MembershipPlan = {
  id: "basic" | "plus" | "business";
  audience: Audience;                 // Zielgruppe
  name: string;                       // "Abo Basic"
  badge?: string;                     // "Beliebt", "Neu"
  priceMonthly: number;               // € pro Monat (brutto, §19 UStG-Hinweis extern)
  laborDiscount?: number;             // 0.20 → 20 % auf Arbeitszeit Vor-Ort
  includes: string[];                 // kurze Vorteile
  msp?: boolean;                      // zeigt MSP-Chip
  sla?: "BASIS" | "STANDARD" | "PRIORITY" | null; // SLA-Level Anzeige
  stripePriceId?: string;             // price_... (Stripe)
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "basic",
    audience: "PRIVAT",
    name: "Abo Basic",
    badge: "Beliebt",
    priceMonthly: 19.90,
    laborDiscount: 0.20,
    includes: ["Priorisierte Hilfe (Remote zuerst)", "20 % Rabatt Vor-Ort", "E-Mail & Telefon-Support"],
    msp: false,
    sla: "BASIS",
    stripePriceId: "price_basic_monthly"
  },
  {
    id: "plus",
    audience: "KMU",
    name: "Abo Plus",
    priceMonthly: 49.90,
    laborDiscount: 0.20,
    includes: ["Remote-Helpdesk Mo–Fr", "Patch/Update-Hinweise", "Bevorzugte Vor-Ort-Termine"],
    msp: true,
    sla: "STANDARD",
    stripePriceId: "price_plus_monthly"
  },
  {
    id: "business",
    audience: "KMU",
    name: "Abo Business",
    priceMonthly: 89.90,
    laborDiscount: 0.20,
    includes: ["Monitoring-Hinweise (NinjaOne)", "Inventar-Überblick Light", "Quartals-Check"],
    msp: true,
    sla: "PRIORITY",
    stripePriceId: "price_business_monthly"
  }
];

export function getLowestPrice(): number {
  const nums = MEMBERSHIP_PLANS.map(p => p.priceMonthly).filter(n => n > 0);
  return nums.length ? Math.min(...nums) : 0;
}