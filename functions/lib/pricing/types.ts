/**
 * Tipos centrales para el sistema de precios Tech Hilfe Pro
 */

export type SubscriptionTier = 'start' | 'plus' | null;
export type PlanType = 'kmu' | 'privat';

export interface PriceRequest {
  plz: string;
  serviceId: string;
  hours: number;
  onsite: boolean;
  subscriptionTier?: SubscriptionTier;
  urgency?: boolean;
  hardware?: boolean;
}

export interface PriceResponse {
  baseRate: number;
  zone: string;
  surcharges: {
    urgency: number;
    hardware: number;
  };
  discount: {
    type: SubscriptionTier;
    pct: number;
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
