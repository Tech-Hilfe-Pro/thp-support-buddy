import { KOELN_40KM, NEUSS_30KM } from "@/data/plz";

export type Urgency = "normal" | "heute" | "jetzt";

export const BLOCK_MIN = 15;
export const HOURLY_ONSITE = 79;                  // €/h Vor-Ort Arbeitszeit
export const URGENCY_MULT: Record<Urgency, number> = { 
  normal: 1.0, 
  heute: 1.15, 
  jetzt: 1.30 
};

export const TRAVEL_FEE = {
  KOELN_40KM: 9,         // € pauschal
  NEUSS_30KM: 7,         // € pauschal
  FALLBACK_NEAR: 15      // € falls via API ≤45 km gefunden
};

export const SUBSCRIPTION_DISCOUNT = 0.20;  // 20 % auf Arbeitszeit (nicht auf Fahrt)

export function isInServiceArea(plz: string): "KOELN_40KM" | "NEUSS_30KM" | "NONE" {
  if (KOELN_40KM.includes(plz)) return "KOELN_40KM";
  if (NEUSS_30KM.includes(plz)) return "NEUSS_30KM";
  return "NONE";
}

// Optionale Distanzabfrage (API-Fallback). NICHT zwingend – nur versuchen:
export async function fetchPlzInRadius(plz: string, km: number): Promise<boolean> {
  try {
    // Opendatasoft: georef-germany-postleitzahl (Zentroid je PLZ)
    // Für Köln 50823 (50.938, 6.960) oder Neuss 41460 (51.200, 6.700) prüfen wir, ob die eingegebene PLZ in <= km liegt.
    // Vereinfachung hier: Hole Koordinate der eingegebenen PLZ und messe Distanz zu Köln/Neuss.
    // (Implementiere einfache Haversine; wenn API fehlt/fehlschlägt => return false.)
    return false; // Stub; UI darf nicht abstürzen.
  } catch {
    return false;
  }
}

export function ceilToBlocks(minutes: number): number {
  return Math.max(1, Math.ceil(minutes / BLOCK_MIN));
}

export function calcLaborCost(minutes: number, urgency: Urgency, subscription: boolean): { laborGross: number; discount: number; laborNet: number } {
  const blocks = ceilToBlocks(minutes);
  const blockPrice = HOURLY_ONSITE / (60 / BLOCK_MIN); // 79 €/h => 19.75 €/15 Min
  const base = blocks * blockPrice;
  const withUrgency = base * URGENCY_MULT[urgency];
  const discount = subscription ? withUrgency * SUBSCRIPTION_DISCOUNT : 0;
  const net = withUrgency - discount;
  return { laborGross: round2(withUrgency), discount: round2(discount), laborNet: round2(net) };
}

export function calcTravelFee(plz: string): number {
  const area = isInServiceArea(plz);
  if (area === "KOELN_40KM") return TRAVEL_FEE.KOELN_40KM;
  if (area === "NEUSS_30KM") return TRAVEL_FEE.NEUSS_30KM;
  return NaN; // signalisiert "außerhalb"
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export type CalcInput = {
  serviceId: string;           // muss es bereits in SERVICES geben
  plz: string;                 // 5-stellig
  urgency: Urgency;            // normal/heute/jetzt
  subscription: boolean;       // 20% Rabatt auf Arbeitszeit
  devices?: number;            // optional, default 1
  onsiteMinutes: number;       // Basis-Min. Vor-Ort (aus SERVICES.zeitMin)
};

export function estimateWindow(min: number): string {
  // konservativ: +/- 30 %
  const minLo = Math.max(30, Math.floor(min * 0.9));
  const minHi = Math.ceil(min * 1.3);
  return `${minLo}–${minHi} Min`;
}

export function calculateOnsiteTotal(input: CalcInput) {
  const trFee = calcTravelFee(input.plz);

  if (Number.isNaN(trFee)) {
    return { inArea: false, message: "Außerhalb des Standard-Einsatzgebiets. Bitte Anfrage senden.", total: NaN };
  }

  const { laborGross, discount, laborNet } = calcLaborCost(input.onsiteMinutes, input.urgency, input.subscription);
  const total = round2(laborNet + trFee);

  return {
    inArea: true,
    breakdown: {
      arbeitszeitBrutto: laborGross,
      rabattAbo: discount,
      arbeitszeitNetto: laborNet,
      anfahrt: trFee
    },
    total,
    zeitfenster: estimateWindow(input.onsiteMinutes)
  };
}

export type TechnicianInput = {
  serviceTitle: string;
  plz: string;
  minutesWorked: number;      // tatsächliche Minuten vor Ort
  urgency: Urgency;           // normal | heute | jetzt
  subscription: boolean;      // Abo aktiv?
};

export function calcTechnicianTotal(input: TechnicianInput) {
  const trFee = calcTravelFee(input.plz);

  if (Number.isNaN(trFee)) {
    return { inArea: false, message: "Außerhalb des Einsatzgebiets", total: NaN };
  }

  const { laborGross, discount, laborNet } = calcLaborCost(input.minutesWorked, input.urgency, input.subscription);
  const total = round2(laborNet + trFee);

  return {
    inArea: true,
    breakdown: {
      arbeitszeitBrutto: laborGross,
      rabattAbo: discount,
      arbeitszeitNetto: laborNet,
      anfahrt: trFee
    },
    total,
    zeitfenster: estimateWindow(input.minutesWorked)
  };
}