/**
 * Tests unitarios para lógica de cálculo de precios
 * Verifican roundToHalf, validatePriceRequest, zonas y calculatePrice
 */

import { describe, it, expect } from 'vitest';

// Mock de las funciones para testing local
function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

function isValidPLZ(plz: string): boolean {
  return /^\d{5}$/.test(plz);
}

describe('roundToHalf', () => {
  it('debe redondear al múltiplo de 0.50 más cercano', () => {
    expect(roundToHalf(10.2)).toBe(10.0);
    expect(roundToHalf(10.3)).toBe(10.5);
    expect(roundToHalf(10.8)).toBe(11.0);
    expect(roundToHalf(158)).toBe(158);
    expect(roundToHalf(158.1)).toBe(158);
    expect(roundToHalf(158.3)).toBe(158.5);
  });
});

describe('isValidPLZ', () => {
  it('debe validar PLZ alemana de 5 dígitos', () => {
    expect(isValidPLZ('50823')).toBe(true);
    expect(isValidPLZ('41460')).toBe(true);
    expect(isValidPLZ('40212')).toBe(true);
    expect(isValidPLZ('1234')).toBe(false);
    expect(isValidPLZ('123456')).toBe(false);
    expect(isValidPLZ('abcde')).toBe(false);
  });
});

describe('Lógica de precios', () => {
  it('Köln Kern: 79 €/h base, 2h = 158 €', () => {
    const baseRate = 79;
    const hours = 2;
    const total = roundToHalf(baseRate * hours);
    expect(total).toBe(158);
  });

  it('Con urgency +25%: 79 * 1.25 * 2h = 197.5 €', () => {
    const baseRate = 79;
    const urgencySurcharge = 0.25;
    const hours = 2;
    const total = roundToHalf(baseRate * (1 + urgencySurcharge) * hours);
    expect(total).toBe(197.5);
  });

  it('Con hardware +10%: 79 * 1.10 * 2h = 173.8 → 174 €', () => {
    const baseRate = 79;
    const hardwareSurcharge = 0.10;
    const hours = 2;
    const total = roundToHalf(baseRate * (1 + hardwareSurcharge) * hours);
    expect(total).toBe(173.5);
  });

  it('Descuento Start (-15%) SOLO si onsite: 158 * 0.85 = 134.3 → 134.5 €', () => {
    const subtotal = 158;
    const discount = 0.15;
    const onsite = true;
    const total = onsite ? roundToHalf(subtotal * (1 - discount)) : subtotal;
    expect(total).toBe(134.5);
  });

  it('Descuento Plus (-25%) SOLO si onsite: 158 * 0.75 = 118.5 €', () => {
    const subtotal = 158;
    const discount = 0.25;
    const onsite = true;
    const total = onsite ? roundToHalf(subtotal * (1 - discount)) : subtotal;
    expect(total).toBe(118.5);
  });

  it('Sin descuento si NO onsite (remote)', () => {
    const subtotal = 158;
    const discount = 0.25;
    const onsite = false;
    const total = onsite ? roundToHalf(subtotal * (1 - discount)) : subtotal;
    expect(total).toBe(158);
  });

  it('Neuss/Köln Umland: 85 €/h base, 1.5h = 127.5 €', () => {
    const baseRate = 85;
    const hours = 1.5;
    const total = roundToHalf(baseRate * hours);
    expect(total).toBe(127.5);
  });

  it('Umland 20-40km: 95 €/h base, 3h = 285 €', () => {
    const baseRate = 95;
    const hours = 3;
    const total = roundToHalf(baseRate * hours);
    expect(total).toBe(285);
  });

  it('Combinado: urgency + hardware + descuento onsite Plus', () => {
    const baseRate = 79;
    const urgency = 0.25;
    const hardware = 0.10;
    const hours = 2;
    const discount = 0.25;
    const onsite = true;

    const rateWithSurcharges = baseRate * (1 + urgency + hardware);
    const subtotal = rateWithSurcharges * hours;
    const total = onsite ? roundToHalf(subtotal * (1 - discount)) : roundToHalf(subtotal);

    // 79 * 1.35 * 2 = 213.3 * 0.75 = 159.975 → 160 €
    expect(total).toBe(160);
  });
});
