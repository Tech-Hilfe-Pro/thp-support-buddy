/**
 * Tipos centrales para el sistema de precios Tech Hilfe Pro
 */

export type SubscriptionTier = 'start' | 'plus' | null;
export type PlanType = 'kmu' | 'privat';

export interface PriceRequest {
  plz: string;
  serviceId: string;
  hours: number;       // 0.5–8 en pasos de 0.5
  onsite: boolean;     // true = in situ, false = remoto
  urgency?: boolean;   // +25%
  hardware?: boolean;  // +10%
  subscriptionTier?: SubscriptionTier; // descuento SOLO si onsite
}

export interface PriceResponse {
  baseRate: number;
  zone: string;
  surcharges: {
    urgency: number;  // en %
    hardware: number; // en %
  };
  discount: {
    type: SubscriptionTier;
    pct: number; // en %
  };
  hours: number;
  total: number;
  currency: 'EUR';
}

export interface KMUPlan {
  id: string;
  name: string;
  price: number;
  minMonthly: number;
  annualDiscount: number; // 0.10 = 10%
  onsiteDiscount: number; // 0.25 = 25%
}

export interface PrivatPlan {
  id: string;
  name: string;
  monthly: number;
  onsiteDiscount: number;
}

export interface Service {
  id: string;
  slug: string;
  nameDe: string;
  descriptionShort: string;
  remoteAvailable: boolean;
}

export interface CheckoutRequest {
  planType: PlanType;
  planId: string;
  qty?: number;
  companyName?: string;
  email: string;
}
