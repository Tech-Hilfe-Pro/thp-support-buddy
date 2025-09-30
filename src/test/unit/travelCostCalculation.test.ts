import { describe, it, expect } from "vitest";
import { getTravelConfig, roundTo05 } from "../../../functions/lib/travelConfig";

/**
 * Replica la función calculateTravelCost del endpoint para testing
 */
function calculateTravelCost(
  distance_km: number,
  duration_min: number,
  config: ReturnType<typeof getTravelConfig>
) {
  const km_total = distance_km * 2;
  const min_total = duration_min * 2;

  // Zona gratuita
  if (distance_km <= config.free_km || duration_min <= config.free_min) {
    return {
      travel_fee: 0,
      breakdown: {
        fuel_cost: 0,
        wear_cost: 0,
        time_cost: 0,
        margen: 0,
      },
    };
  }

  const fuel_cost = (km_total * config.consumo_l_100km / 100) * config.precio_fuel_eur_l;
  const wear_cost = km_total * config.desgaste_eur_km;
  const time_cost = (min_total / 60) * config.tarifa_hora_viaje;
  const subtotal = fuel_cost + wear_cost + time_cost;
  const travel_fee = roundTo05(subtotal * config.margen);

  return {
    travel_fee,
    breakdown: {
      fuel_cost: Math.round(fuel_cost * 100) / 100,
      wear_cost: Math.round(wear_cost * 100) / 100,
      time_cost: Math.round(time_cost * 100) / 100,
      margen: Math.round((subtotal * (config.margen - 1)) * 100) / 100,
    },
  };
}

describe("calculateTravelCost - Zona gratuita (FREE_KM/FREE_MIN)", () => {
  const config = getTravelConfig();

  it("debe devolver travel_fee = 0 si distancia <= FREE_KM", () => {
    const result = calculateTravelCost(3, 20, config); // 3 km < 5 km
    expect(result.travel_fee).toBe(0);
    expect(result.breakdown.fuel_cost).toBe(0);
    expect(result.breakdown.wear_cost).toBe(0);
    expect(result.breakdown.time_cost).toBe(0);
  });

  it("debe devolver travel_fee = 0 si duración <= FREE_MIN", () => {
    const result = calculateTravelCost(10, 10, config); // 10 min < 15 min
    expect(result.travel_fee).toBe(0);
  });

  it("debe devolver travel_fee = 0 si ambos están en el límite", () => {
    const result = calculateTravelCost(5, 15, config); // exactamente en el límite
    expect(result.travel_fee).toBe(0);
  });

  it("debe calcular coste si supera ambos límites", () => {
    const result = calculateTravelCost(10, 20, config); // 10 km > 5 km, 20 min > 15 min
    expect(result.travel_fee).toBeGreaterThan(0);
  });
});

describe("calculateTravelCost - Cálculos de componentes", () => {
  const config = getTravelConfig();

  it("debe calcular fuel_cost correctamente", () => {
    const distance_km = 20; // ida
    const km_total = distance_km * 2; // 40 km total
    const result = calculateTravelCost(distance_km, 30, config);

    const expected_fuel_cost = (km_total * config.consumo_l_100km / 100) * config.precio_fuel_eur_l;
    // 40 * 7.5 / 100 * 1.66 = 4.98 €
    expect(result.breakdown.fuel_cost).toBeCloseTo(expected_fuel_cost, 2);
  });

  it("debe calcular wear_cost correctamente", () => {
    const distance_km = 20;
    const km_total = distance_km * 2; // 40 km
    const result = calculateTravelCost(distance_km, 30, config);

    const expected_wear_cost = km_total * config.desgaste_eur_km;
    // 40 * 0.18 = 7.20 €
    expect(result.breakdown.wear_cost).toBeCloseTo(expected_wear_cost, 2);
  });

  it("debe calcular time_cost correctamente", () => {
    const duration_min = 30; // ida
    const min_total = duration_min * 2; // 60 min
    const result = calculateTravelCost(20, duration_min, config);

    const expected_time_cost = (min_total / 60) * config.tarifa_hora_viaje;
    // (60 / 60) * 40 = 40 €
    expect(result.breakdown.time_cost).toBeCloseTo(expected_time_cost, 2);
  });

  it("debe calcular subtotal y aplicar margen correctamente", () => {
    const result = calculateTravelCost(20, 30, config);

    // fuel: 4.98, wear: 7.20, time: 40 = subtotal 52.18
    const expected_subtotal = result.breakdown.fuel_cost + result.breakdown.wear_cost + result.breakdown.time_cost;
    const expected_with_margen = expected_subtotal * config.margen;
    const expected_travel_fee = roundTo05(expected_with_margen);

    expect(result.travel_fee).toBe(expected_travel_fee);
  });

  it("debe calcular margen (markup) correctamente", () => {
    const result = calculateTravelCost(20, 30, config);

    const subtotal = result.breakdown.fuel_cost + result.breakdown.wear_cost + result.breakdown.time_cost;
    const expected_margen = subtotal * (config.margen - 1);

    expect(result.breakdown.margen).toBeCloseTo(expected_margen, 2);
  });
});

describe("calculateTravelCost - Casos extremos", () => {
  const config = getTravelConfig();

  it("debe manejar distancia muy corta (justo fuera de FREE_KM)", () => {
    const result = calculateTravelCost(6, 20, config);
    expect(result.travel_fee).toBeGreaterThan(0);
    expect(result.travel_fee).toBeLessThan(10); // debe ser barato
  });

  it("debe manejar distancia muy larga", () => {
    const result = calculateTravelCost(50, 60, config);
    expect(result.travel_fee).toBeGreaterThan(50);
  });

  it("debe redondear travel_fee a múltiplos de 0.5", () => {
    const result = calculateTravelCost(15, 25, config);
    const decimal = result.travel_fee % 1;
    expect([0, 0.5]).toContain(decimal);
  });

  it("debe devolver números positivos", () => {
    const result = calculateTravelCost(10, 20, config);
    expect(result.travel_fee).toBeGreaterThanOrEqual(0);
    expect(result.breakdown.fuel_cost).toBeGreaterThanOrEqual(0);
    expect(result.breakdown.wear_cost).toBeGreaterThanOrEqual(0);
    expect(result.breakdown.time_cost).toBeGreaterThanOrEqual(0);
  });
});

describe("calculateTravelCost - Configuración personalizada", () => {
  it("debe usar configuración ENV custom", () => {
    const customConfig = getTravelConfig({
      CONSUMO_L_100KM: "10.0",
      PRECIO_FUEL_EUR_L: "2.0",
      DESGASTE_EUR_KM: "0.25",
      TARIFA_HORA_VIAJE: "50",
      MARGEN: "1.20",
      FREE_KM: "3",
      FREE_MIN: "10",
    });

    const result = calculateTravelCost(10, 20, customConfig);

    // Con valores más altos, el coste debe ser mayor
    expect(result.travel_fee).toBeGreaterThan(30);
  });

  it("debe respetar FREE_KM custom", () => {
    const customConfig = getTravelConfig({
      FREE_KM: "15", // zona gratuita más grande
    });

    const result = calculateTravelCost(12, 30, customConfig);
    expect(result.travel_fee).toBe(0); // 12 km < 15 km
  });
});
