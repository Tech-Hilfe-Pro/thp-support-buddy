/**
 * Tests unitarios para utilidades de pricing
 */

import { describe, it, expect } from 'vitest';
import { roundToHalf, isValidPLZ } from '@/lib/pricing-client';

describe('roundToHalf', () => {
  it('debe redondear al múltiplo de 0.50 más cercano', () => {
    expect(roundToHalf(10.2)).toBe(10.0);
    expect(roundToHalf(10.3)).toBe(10.5);
    expect(roundToHalf(10.8)).toBe(11.0);
  });
});

describe('isValidPLZ', () => {
  it('debe validar PLZ alemana de 5 dígitos', () => {
    expect(isValidPLZ('50823')).toBe(true);
    expect(isValidPLZ('1234')).toBe(false);
  });
});
