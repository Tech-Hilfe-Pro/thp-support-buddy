export type Urgency = "normal" | "heute" | "jetzt";

export const BLOCK_MIN = 15;
export const HOURLY_ONSITE = 79; // €/h Vor-Ort Arbeitszeit
export const URGENCY_MULT: Record<Urgency, number> = { normal: 1.0, heute: 1.15, jetzt: 1.30 };
export const SUBSCRIPTION_DISCOUNT = 0.20; // 20% auf Arbeitszeit

export const TRAVEL_FEE = {
  KOELN_40KM: 9,
  NEUSS_30KM: 7,
  FALLBACK_NEAR: 15
};

import { KOELN_40KM, NEUSS_30KM } from "@/data/plz";

export function isInServiceArea(plz: string): "KOELN_40KM" | "NEUSS_30KM" | "NONE" {
  if (KOELN_40KM.includes(plz)) return "KOELN_40KM";
  if (NEUSS_30KM.includes(plz)) return "NEUSS_30KM";
  return "NONE";
}

export function ceilToBlocks(minutes: number): number {
  return Math.max(1, Math.ceil(minutes / BLOCK_MIN));
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function calcLaborCost(
  minutes: number,
  urgency: Urgency,
  subscription: boolean
): { laborGross: number; discount: number; laborNet: number } {
  const blocks = ceilToBlocks(minutes);
  const blockPrice = HOURLY_ONSITE / (60 / BLOCK_MIN); // 79 €/h → 19.75 €/15min
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
  return NaN;
}

export function estimateWindow(min: number): string {
  const minLo = Math.max(30, Math.floor(min * 0.9));
  const minHi = Math.ceil(min * 1.3);
  return `${minLo}–${minHi} Min`;
}

export type CalcInput = {
  serviceId: string;
  plz: string;
  urgency: Urgency;
  subscription: boolean;
  devices?: number;
  onsiteMinutes: number;
  travelKm?: number;      // Distancia real desde ORS (opcional)
  travelMinutes?: number; // Tiempo real desde ORS (opcional)
};

export function calculateOnsiteTotal(input: CalcInput) {
  const trFee = calcTravelFee(input.plz);
  if (Number.isNaN(trFee)) {
    return { inArea: false, message: "Außerhalb des Standard-Einsatzgebiets. Bitte Anfrage senden.", total: NaN };
  }
  const { laborGross, discount, laborNet } = calcLaborCost(input.onsiteMinutes, input.urgency, input.subscription);
  const total = round2(laborNet + trFee);
  
  // Si hay datos de ORS, incluir en el retorno
  const travelInfo = input.travelKm && input.travelMinutes 
    ? { travelKm: input.travelKm, travelMinutes: input.travelMinutes }
    : undefined;
  
  return {
    inArea: true,
    breakdown: { arbeitszeitBrutto: laborGross, rabattAbo: discount, arbeitszeitNetto: laborNet, anfahrt: trFee },
    total,
    zeitfenster: estimateWindow(input.onsiteMinutes),
    ...(travelInfo && { travelInfo })
  };
}

export type TechnicianInput = {
  serviceTitle: string;
  plz: string;
  minutesWorked: number;
  urgency: Urgency;
  subscription: boolean;
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
    breakdown: { arbeitszeitBrutto: laborGross, rabattAbo: discount, arbeitszeitNetto: laborNet, anfahrt: trFee },
    total,
    zeitfenster: estimateWindow(input.minutesWorked)
  };
}