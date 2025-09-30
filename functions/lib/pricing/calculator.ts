/**
 * Lógica central de cálculo de precios Tech Hilfe Pro
 * 
 * LÓGICA:
 * - Surcharges: urgency +25%; hardware +10%
 * - Subtotal = base * (1 + surcharges) * hours
 * - Descuento SOLO si onsite y subscriptionTier: start (15%), plus (25%)
 * - Redondeo a 0,50 € → roundToHalf = Math.round(x*2)/2
 */

import { PriceRequest, PriceResponse } from './types.ts';
import { getZoneByPLZ, isValidPLZ } from './zones.ts';
import { getServiceById } from './services.ts';

/**
 * Redondea al múltiplo de 0.50 más cercano
 * roundToHalf = Math.round(x*2)/2
 */
export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

/**
 * Valida el request de precio
 */
export function validatePriceRequest(req: PriceRequest): string | null {
  // Validar PLZ (5 dígitos)
  if (!isValidPLZ(req.plz)) {
    return 'PLZ inválida. Debe ser un código postal alemán de 5 dígitos.';
  }

  // Validar serviceId existente
  const service = getServiceById(req.serviceId);
  if (!service) {
    return 'Service ID inválido.';
  }

  // Validar horas: 0.5 ≤ hours ≤ 8 y múltiplos de 0.5
  if (req.hours < 0.5 || req.hours > 8) {
    return 'Las horas deben estar entre 0.5 y 8.';
  }
  if ((req.hours * 2) % 1 !== 0) {
    return 'Las horas deben ser múltiplos de 0.5 (ej: 1, 1.5, 2, 2.5).';
  }

  // Validar subscriptionTier si existe
  if (req.subscriptionTier && !['start', 'plus'].includes(req.subscriptionTier)) {
    return 'Subscription tier inválido. Debe ser "start" o "plus".';
  }

  return null;
}

/**
 * Calcula el precio total según parámetros
 * REGLA CRÍTICA: Descuento SOLO aplica si onsite=true
 */
export function calculatePrice(req: PriceRequest): PriceResponse | { error: string } {
  // Validar request
  const validationError = validatePriceRequest(req);
  if (validationError) {
    return { error: validationError };
  }

  // Obtener zona (o error si fuera de área)
  const zone = getZoneByPLZ(req.plz);
  if (!zone) {
    return { error: 'PLZ fuera del área de servicio.' };
  }

  // Tarifa base de la zona
  const baseRate = zone.baseRate;

  // Aplicar suplementos
  const surcharges = {
    urgency: req.urgency ? 0.25 : 0,   // +25%
    hardware: req.hardware ? 0.10 : 0, // +10%
  };

  const totalSurcharge = surcharges.urgency + surcharges.hardware;
  const rateWithSurcharges = baseRate * (1 + totalSurcharge);

  // Calcular subtotal (sin descuento)
  const subtotal = rateWithSurcharges * req.hours;

  // Aplicar descuento de suscripción (SOLO si onsite=true)
  const discount = {
    type: req.subscriptionTier || null,
    pct: 0,
  };

  if (req.onsite && req.subscriptionTier) {
    if (req.subscriptionTier === 'start') {
      discount.pct = 0.15; // -15%
    } else if (req.subscriptionTier === 'plus') {
      discount.pct = 0.25; // -25%
    }
  }

  // Total con descuento y redondeo a 0,50 €
  const totalBeforeRounding = subtotal * (1 - discount.pct);
  const total = roundToHalf(totalBeforeRounding);

  return {
    baseRate,
    zone: zone.name,
    surcharges: {
      urgency: surcharges.urgency * 100, // en %
      hardware: surcharges.hardware * 100, // en %
    },
    discount: {
      type: discount.type,
      pct: discount.pct * 100, // en %
    },
    hours: req.hours,
    total,
    currency: 'EUR',
  };
}
