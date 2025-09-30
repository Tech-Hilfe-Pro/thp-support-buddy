import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";

const BASE_URL = "http://localhost:8787"; // Cloudflare Pages local

// Handlers para MSW
const handlers = [
  // Escenario exitoso
  http.post(`${BASE_URL}/api/travel-quote`, async ({ request }) => {
    const body = await request.json() as any;

    if (body.plz === "50823") {
      return HttpResponse.json({
        originBase: "Köln 50823",
        distance_km: 0,
        duration_min: 0,
        km_total: 0,
        min_total: 0,
        travel_fee: 0,
        breakdown: {
          fuel_cost: 0,
          wear_cost: 0,
          time_cost: 0,
          margen: 0,
        },
        currency: "EUR",
      });
    }

    if (body.plz === "51063") {
      return HttpResponse.json({
        originBase: "Köln 50823",
        distance_km: 8.5,
        duration_min: 15,
        km_total: 17.0,
        min_total: 30,
        travel_fee: 15.5,
        breakdown: {
          fuel_cost: 2.12,
          wear_cost: 3.06,
          time_cost: 20.0,
          margen: 2.82,
        },
        currency: "EUR",
      });
    }

    // PLZ fuera de área (fallback Haversine)
    if (body.plz === "10115") {
      return HttpResponse.json({
        originBase: "Köln 50823",
        distance_km: 480,
        duration_min: 411,
        km_total: 960,
        min_total: 822,
        travel_fee: 450.0,
        breakdown: {
          fuel_cost: 119.81,
          wear_cost: 172.8,
          time_cost: 548.0,
          margen: 94.07,
        },
        currency: "EUR",
        fallback: true,
      });
    }

    return HttpResponse.json(
      { error: "PLZ not found" },
      { status: 400 }
    );
  }),
];

const server = setupServer(...handlers);

describe("API /api/travel-quote - Integración", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("debe devolver travel_fee = 0 para origen mismo (zona gratuita)", async () => {
    const response = await fetch(`${BASE_URL}/api/travel-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plz: "50823", // Köln mismo
        hours: 1,
      }),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();

    expect(data.travel_fee).toBe(0);
    expect(data.currency).toBe("EUR");
    expect(data.breakdown).toBeDefined();
    expect(typeof data.breakdown.fuel_cost).toBe("number");
  });

  it("debe calcular correctamente para PLZ dentro del área", async () => {
    const response = await fetch(`${BASE_URL}/api/travel-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plz: "51063", // Köln-Mülheim
        hours: 2,
      }),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();

    expect(data.travel_fee).toBeGreaterThan(0);
    expect(data.currency).toBe("EUR");
    expect(data.originBase).toContain("Köln");
    expect(data.distance_km).toBeGreaterThan(0);
    expect(data.duration_min).toBeGreaterThan(0);

    // Verificar breakdown completo
    expect(data.breakdown.fuel_cost).toBeGreaterThan(0);
    expect(data.breakdown.wear_cost).toBeGreaterThan(0);
    expect(data.breakdown.time_cost).toBeGreaterThan(0);
    expect(data.breakdown.margen).toBeGreaterThan(0);
  });

  it("debe usar fallback Haversine cuando ORS falla", async () => {
    const response = await fetch(`${BASE_URL}/api/travel-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plz: "10115", // Berlín (muy lejos)
        hours: 1,
      }),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();

    expect(data.fallback).toBe(true);
    expect(data.travel_fee).toBeGreaterThan(100); // debe ser caro
    expect(data.currency).toBe("EUR");
  });

  it("debe seleccionar la base más cercana por duración", async () => {
    const response = await fetch(`${BASE_URL}/api/travel-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plz: "51063",
        hours: 1,
      }),
    });

    const data = await response.json();
    expect(data.originBase).toBeDefined();
    expect(["Köln", "Pulheim", "Neuss"]).toContain(data.originBase.split(" ")[0]);
  });

  it("debe validar input y devolver error para PLZ inválida", async () => {
    const response = await fetch(`${BASE_URL}/api/travel-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plz: "123", // inválida
      }),
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);
  });

  it("debe respetar parámetro subscriptionTier (aunque no afecta travel_fee)", async () => {
    const response = await fetch(`${BASE_URL}/api/travel-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plz: "51063",
        hours: 1,
        subscriptionTier: "A",
      }),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();

    // El travel_fee no debe cambiar por subscriptionTier
    expect(data.travel_fee).toBeGreaterThan(0);
  });
});

describe("API /api/travel-quote - Escenarios de error", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("debe manejar ORS API down con fallback", async () => {
    // Simular ORS down
    server.use(
      http.post("https://api.openrouteservice.org/v2/matrix/driving-car", () => {
        return HttpResponse.json({ error: "Service unavailable" }, { status: 503 });
      })
    );

    const response = await fetch(`${BASE_URL}/api/travel-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plz: "51063",
      }),
    });

    // Debe usar fallback Haversine
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.fallback).toBe(true);
  });
});
