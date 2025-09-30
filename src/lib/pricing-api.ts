/**
 * Cliente TypeScript para las APIs de precios
 * Wrapper para facilitar las llamadas desde el frontend
 */

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
      return { error: 'Fehler beim Laden der KMU-Pläne.' };
    }
  }

  static async getPrivatPlans(): Promise<{ plans: PrivatPlan[] } | { error: string }> {
    try {
      const response = await fetch('/api/plans-privat');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Privat plans:', error);
      return { error: 'Fehler beim Laden der Privat-Pläne.' };
    }
  }
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
