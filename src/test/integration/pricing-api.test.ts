/**
 * Tests de integración para API de precios
 * Estos tests verifican las llamadas a las edge functions
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { PricingAPI, type PriceRequest } from '@/lib/pricing-client';

// Mock server para simular edge functions
const server = setupServer(
  // POST /api/price - Cálculo de precios
  http.post('*/price', async ({ request }) => {
    const body = await request.json() as PriceRequest;

    // Simular validaciones
    if (!body.plz || !/^\d{5}$/.test(body.plz)) {
      return HttpResponse.json(
        { error: 'PLZ inválida' },
        { status: 400 }
      );
    }

    if (body.plz === '10115') {
      return HttpResponse.json(
        { error: 'PLZ fuera del área de servicio' },
        { status: 400 }
      );
    }

    // Simular cálculo exitoso (Köln Kern)
    const baseRate = 79;
    const surchargeTotal = (body.urgency ? 0.25 : 0) + (body.hardware ? 0.10 : 0);
    const rateWithSurcharges = baseRate * (1 + surchargeTotal);
    let total = rateWithSurcharges * body.hours;

    const discount = {
      type: body.subscriptionTier || null,
      pct: 0,
    };

    if (body.onsite && body.subscriptionTier === 'start') {
      discount.pct = 15;
      total *= 0.85;
    } else if (body.onsite && body.subscriptionTier === 'plus') {
      discount.pct = 25;
      total *= 0.75;
    }

    total = Math.round(total * 2) / 2;

    return HttpResponse.json({
      baseRate,
      zone: 'Köln Kern',
      surcharges: {
        urgency: body.urgency ? 25 : 0,
        hardware: body.hardware ? 10 : 0,
      },
      discount,
      hours: body.hours,
      total,
      currency: 'EUR',
    });
  }),

  // GET /api/plans-kmu
  http.get('*/plans-kmu', () => {
    return HttpResponse.json({
      plans: [
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
      ],
    });
  }),

  // GET /api/plans-privat
  http.get('*/plans-privat', () => {
    return HttpResponse.json({
      plans: [
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
      ],
    });
  }),

  // GET /api/services
  http.get('*/services', () => {
    return HttpResponse.json({
      services: [
        {
          id: '1',
          slug: 'computer',
          nameDe: 'Computer',
          descriptionShort: 'PC-Einrichtung und Wartung',
          remoteAvailable: true,
        },
        // ... más servicios
      ],
    });
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('PricingAPI.calculatePrice', () => {
  it('debe calcular precio básico correctamente', async () => {
    const request: PriceRequest = {
      plz: '50823',
      serviceId: '1',
      hours: 2,
      onsite: true,
    };

    const result = await PricingAPI.calculatePrice(request);
    expect(result).not.toHaveProperty('error');

    if ('error' in result) return;

    expect(result.baseRate).toBe(79);
    expect(result.zone).toBe('Köln Kern');
    expect(result.total).toBe(158);
    expect(result.currency).toBe('EUR');
  });

  it('debe aplicar suplemento de urgencia', async () => {
    const request: PriceRequest = {
      plz: '50823',
      serviceId: '1',
      hours: 2,
      onsite: true,
      urgency: true,
    };

    const result = await PricingAPI.calculatePrice(request);
    if ('error' in result) return;

    expect(result.surcharges.urgency).toBe(25);
    expect(result.total).toBe(197.5);
  });

  it('debe aplicar descuento de suscripción', async () => {
    const request: PriceRequest = {
      plz: '50823',
      serviceId: '1',
      hours: 2,
      onsite: true,
      subscriptionTier: 'plus',
    };

    const result = await PricingAPI.calculatePrice(request);
    if ('error' in result) return;

    expect(result.discount.pct).toBe(25);
    expect(result.total).toBe(118.5);
  });

  it('debe retornar error para PLZ inválida', async () => {
    const request: PriceRequest = {
      plz: '1234',
      serviceId: '1',
      hours: 2,
      onsite: true,
    };

    const result = await PricingAPI.calculatePrice(request);
    expect(result).toHaveProperty('error');
  });

  it('debe retornar error para PLZ fuera de área', async () => {
    const request: PriceRequest = {
      plz: '10115',
      serviceId: '1',
      hours: 2,
      onsite: true,
    };

    const result = await PricingAPI.calculatePrice(request);
    expect(result).toHaveProperty('error');
    if ('error' in result) {
      expect(result.error).toContain('fuera del área');
    }
  });
});

describe('PricingAPI.getKMUPlans', () => {
  it('debe retornar 3 planes KMU', async () => {
    const result = await PricingAPI.getKMUPlans();
    expect(result).not.toHaveProperty('error');

    if ('error' in result) return;

    expect(result.plans).toHaveLength(3);
    expect(result.plans[0].id).toBe('kmu-basic');
    expect(result.plans[0].price).toBe(14.90);
  });
});

describe('PricingAPI.getPrivatPlans', () => {
  it('debe retornar 2 planes Privat', async () => {
    const result = await PricingAPI.getPrivatPlans();
    expect(result).not.toHaveProperty('error');

    if ('error' in result) return;

    expect(result.plans).toHaveLength(2);
    expect(result.plans[0].id).toBe('privat-start');
    expect(result.plans[0].monthly).toBe(9.90);
  });
});

describe('PricingAPI.getServices', () => {
  it('debe retornar catálogo de servicios', async () => {
    const result = await PricingAPI.getServices();
    expect(result).not.toHaveProperty('error');

    if ('error' in result) return;

    expect(result.services).toBeDefined();
    expect(result.services.length).toBeGreaterThan(0);
    expect(result.services[0]).toHaveProperty('id');
    expect(result.services[0]).toHaveProperty('slug');
    expect(result.services[0]).toHaveProperty('nameDe');
  });
});
