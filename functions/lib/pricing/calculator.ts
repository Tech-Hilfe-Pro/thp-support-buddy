/**
 * Lógica central de cálculo de precios
 * Tech Hilfe Pro
 */

import { PriceRequest, PriceResponse, SubscriptionTier } from './types.ts';
import { getZoneByPLZ, isValidPLZ } from './zones.ts';
import { getServiceById } from './services.ts';

/**
 * Redondea al múltiplo de 0.50 más cercano
 */
export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

/**
 * Valida el request de precio
 */
export function validatePriceRequest(req: PriceRequest): string | null {
  // Validar PLZ
  if (!isValidPLZ(req.plz)) {
    return 'PLZ inválida. Debe ser un código postal alemán de 5 dígitos.';
  }

  // Validar serviceId
  const service = getServiceById(req.serviceId);
  if (!service) {
    return 'Service ID inválido.';
  }

  // Validar horas (0.5 - 8 en pasos de 0.5)
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
 */
export function calculatePrice(req: PriceRequest): PriceResponse | { error: string } {
  // Validar request
  const validationError = validatePriceRequest(req);
  if (validationError) {
    return { error: validationError };
  }

  // Obtener zona
  const zone = getZoneByPLZ(req.plz);
  if (!zone) {
    return { error: 'PLZ fuera del área de servicio.' };
  }

  // Tarifa base
  let baseRate = zone.baseRate;

  // Aplicar suplementos
  const surcharges = {
    urgency: 0,
    hardware: 0,
  };

  if (req.urgency) {
    surcharges.urgency = 0.25; // +25%
  }

  if (req.hardware) {
    surcharges.hardware = 0.10; // +10%
  }

  const totalSurcharge = surcharges.urgency + surcharges.hardware;
  const rateWithSurcharges = baseRate * (1 + totalSurcharge);

  // Calcular subtotal (sin descuento)
  let subtotal = rateWithSurcharges * req.hours;

  // Aplicar descuento de suscripción (SOLO si es servicio on-site)
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

  // Total con descuento
  const totalBeforeRounding = subtotal * (1 - discount.pct);
  const total = roundToHalf(totalBeforeRounding);

  return {
    baseRate,
    zone: zone.name,
    surcharges: {
      urgency: surcharges.urgency * 100, // Devolver como porcentaje
      hardware: surcharges.hardware * 100,
    },
    discount: {
      type: discount.type,
      pct: discount.pct * 100,
    },
    hours: req.hours,
    total,
    currency: 'EUR',
  };
}
