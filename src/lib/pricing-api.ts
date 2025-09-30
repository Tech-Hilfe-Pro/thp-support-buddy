/**
 * Cliente TypeScript para las APIs de precios
 * Wrapper para facilitar las llamadas desde el frontend
 */

import { KMU_PLANS as KMU_DATA, PRIVAT_PLANS as PRIVAT_DATA } from '@/data/pricingData';

export interface PriceRequest {
  plz: string;
  serviceId: string;
  hours: number;
  onsite: boolean;
  subscriptionTier?: 'start' | 'plus' | null;
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
    type: 'start' | 'plus' | null;
    pct: number;
  };
  hours: number;
  total: number;
  currency: string;
}

export interface Service {
  id: string;
  slug: string;
  nameDe: string;
  descriptionShort: string;
  remoteAvailable: boolean;
}

export interface KMUPlan {
  id: string;
  name: string;
  price: number;
  minMonthly: number;
  annualDiscount: number;
  onsiteDiscount: number;
}

export interface PrivatPlan {
  id: string;
  name: string;
  monthly: number;
  onsiteDiscount: number;
}

/**
 * API wrapper para pricing
 */
export class PricingAPI {
  static async calculatePrice(request: PriceRequest): Promise<PriceResponse | { error: string }> {
    try {
      const response = await fetch('/api/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calculating price:', error);
      return { error: 'Fehler bei der Preisberechnung.' };
    }
  }

  static async getServices(): Promise<{ services: Service[] } | { error: string }> {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching services:', error);
      return { error: 'Fehler beim Laden der Services.' };
    }
  }

  static async getKMUPlans(): Promise<{ plans: KMUPlan[] } | { error: string }> {
    try {
      const response = await fetch('/api/plans-kmu');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching KMU plans:', error);
      // Fallback: use pricingData.ts
      return getKMUPlansFallback();
    }
  }

  static async getPrivatPlans(): Promise<{ plans: PrivatPlan[] } | { error: string }> {
    try {
      const response = await fetch('/api/plans-privat');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Privat plans:', error);
      // Fallback: use pricingData.ts
      return getPrivatPlansFallback();
    }
  }
}

/**
 * Fallback functions - read from pricingData.ts if Edge functions fail
 */

function getKMUPlansFallback(): { plans: KMUPlan[] } {
  return {
    plans: KMU_DATA.map(p => ({
      id: p.id,
      name: `${p.name} (${p.subtitle})`,
      price: p.pricePerEndpoint,
      minMonthly: p.minMonthly,
      annualDiscount: p.discounts.annual,
      onsiteDiscount: p.discounts.onsite
    }))
  };
}

function getPrivatPlansFallback(): { plans: PrivatPlan[] } {
  return {
    plans: PRIVAT_DATA.map(p => ({
      id: p.id,
      name: p.name,
      monthly: p.monthly,
      onsiteDiscount: p.onsiteDiscountPct
    }))
  };
}

/**
 * Utilidades de validación
 */
export function isValidPLZ(plz: string): boolean {
  return /^\d{5}$/.test(plz);
}

export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}
