/**
 * Catálogos de planes KMU y Privat
 * Valores cerrados según especificación
 */

import { KMUPlan, PrivatPlan } from './types.ts';

export const KMU_PLANS: KMUPlan[] = [
  {
    id: 'kmu-basic',
    name: 'Managed IT-Partner (Basic)',
    price: 14.90,
    minMonthly: 99,
    annualDiscount: 0.10,
    onsiteDiscount: 0.25,
  },
  {
    id: 'kmu-standard',
    name: 'Advanced IT-Pro (Standard)',
    price: 24.90,
    minMonthly: 179,
    annualDiscount: 0.10,
    onsiteDiscount: 0.25,
  },
  {
    id: 'kmu-premium',
    name: 'Enterprise IT-Guard (Premium)',
    price: 39.90,
    minMonthly: 299,
    annualDiscount: 0.10,
    onsiteDiscount: 0.25,
  },
];

export const PRIVAT_PLANS: PrivatPlan[] = [
  {
    id: 'privat-start',
    name: 'Haus-IT Start',
    monthly: 9.90,
    onsiteDiscount: 0.15,
  },
  {
    id: 'privat-plus',
    name: 'Haus-IT Plus',
    monthly: 19.90,
    onsiteDiscount: 0.25,
  },
];

export function getKMUPlanById(id: string): KMUPlan | null {
  return KMU_PLANS.find((p) => p.id === id) || null;
}

export function getPrivatPlanById(id: string): PrivatPlan | null {
  return PRIVAT_PLANS.find((p) => p.id === id) || null;
}
