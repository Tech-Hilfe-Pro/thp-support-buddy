/**
 * Cliente para API de precios Tech Hilfe Pro
 * Tipos y funciones para interactuar con las Edge Functions
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
  annualDiscount: number;
  onsiteDiscount: number;
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

/**
 * Redondea al múltiplo de 0.50 más cercano
 */
export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

/**
 * Valida formato PLZ alemana (5 dígitos)
 */
export function isValidPLZ(plz: string): boolean {
  return /^\d{5}$/.test(plz);
}

/**
 * API Client para llamar a las edge functions
 */
const API_BASE = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || '/functions/v1';

export class PricingAPI {
  /**
   * Calcula precio para un servicio
   */
  static async calculatePrice(request: PriceRequest): Promise<PriceResponse | { error: string }> {
    try {
      const response = await fetch(`${API_BASE}/price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.error || 'Error al calcular precio' };
      }

      return await response.json();
    } catch (error) {
      return { error: 'Error de conexión con el servidor' };
    }
  }

  /**
   * Obtiene catálogo de planes KMU
   */
  static async getKMUPlans(): Promise<{ plans: KMUPlan[] } | { error: string }> {
    try {
      const response = await fetch(`${API_BASE}/plans-kmu`);
      
      if (!response.ok) {
        return { error: 'Error al obtener planes KMU' };
      }

      return await response.json();
    } catch (error) {
      return { error: 'Error de conexión con el servidor' };
    }
  }

  /**
   * Obtiene catálogo de planes Privat
   */
  static async getPrivatPlans(): Promise<{ plans: PrivatPlan[] } | { error: string }> {
    try {
      const response = await fetch(`${API_BASE}/plans-privat`);
      
      if (!response.ok) {
        return { error: 'Error al obtener planes Privat' };
      }

      return await response.json();
    } catch (error) {
      return { error: 'Error de conexión con el servidor' };
    }
  }

  /**
   * Obtiene catálogo de servicios
   */
  static async getServices(): Promise<{ services: Service[] } | { error: string }> {
    try {
      const response = await fetch(`${API_BASE}/services`);
      
      if (!response.ok) {
        return { error: 'Error al obtener servicios' };
      }

      return await response.json();
    } catch (error) {
      return { error: 'Error de conexión con el servidor' };
    }
  }

  /**
   * Crea sesión de Stripe Checkout
   */
  static async createCheckout(request: CheckoutRequest): Promise<{ url: string } | { error: string }> {
    try {
      const response = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.error || 'Error al crear sesión de checkout' };
      }

      return await response.json();
    } catch (error) {
      return { error: 'Error de conexión con el servidor' };
    }
  }
}
