import { describe, it, expect } from "vitest";
import { getTravelConfig, BASES } from "../../../functions/lib/travelConfig";

describe("getTravelConfig", () => {
  it("debe devolver configuración por defecto sin ENV", () => {
    const config = getTravelConfig();

    expect(config.consumo_l_100km).toBe(7.5);
    expect(config.precio_fuel_eur_l).toBe(1.66);
    expect(config.desgaste_eur_km).toBe(0.18);
    expect(config.tarifa_hora_viaje).toBe(40);
    expect(config.margen).toBe(1.12);
    expect(config.free_km).toBe(5);
    expect(config.free_min).toBe(15);
  });

  it("debe usar valores de ENV cuando están presentes", () => {
    const env = {
      CONSUMO_L_100KM: "8.0",
      PRECIO_FUEL_EUR_L: "1.80",
      DESGASTE_EUR_KM: "0.20",
      TARIFA_HORA_VIAJE: "45",
      MARGEN: "1.15",
      FREE_KM: "10",
      FREE_MIN: "20",
    };

    const config = getTravelConfig(env);

    expect(config.consumo_l_100km).toBe(8.0);
    expect(config.precio_fuel_eur_l).toBe(1.80);
    expect(config.desgaste_eur_km).toBe(0.20);
    expect(config.tarifa_hora_viaje).toBe(45);
    expect(config.margen).toBe(1.15);
    expect(config.free_km).toBe(10);
    expect(config.free_min).toBe(20);
  });

  it("debe ignorar valores ENV inválidos y usar defaults", () => {
    const env = {
      CONSUMO_L_100KM: "invalid",
      PRECIO_FUEL_EUR_L: "-5",
      MARGEN: "0",
    };

    const config = getTravelConfig(env);

    expect(config.consumo_l_100km).toBe(7.5); // default
    expect(config.precio_fuel_eur_l).toBe(1.66); // default (negativo rechazado)
    expect(config.margen).toBe(1.12); // default (cero rechazado)
  });

  it("debe devolver un objeto inmutable", () => {
    const config = getTravelConfig();

    // El objeto debe estar frozen
    expect(Object.isFrozen(config)).toBe(true);
  });

  it("debe mezclar ENV parcial con defaults", () => {
    const env = {
      CONSUMO_L_100KM: "9.0",
      // resto sin definir
    };

    const config = getTravelConfig(env);

    expect(config.consumo_l_100km).toBe(9.0); // ENV
    expect(config.precio_fuel_eur_l).toBe(1.66); // default
  });
});

describe("BASES", () => {
  it("debe contener exactamente 3 bases", () => {
    expect(BASES).toHaveLength(3);
  });

  it("debe incluir Köln, Pulheim y Neuss", () => {
    const names = BASES.map((b) => b.name);
    expect(names).toContain("Köln");
    expect(names).toContain("Pulheim");
    expect(names).toContain("Neuss");
  });

  it("debe tener coordenadas válidas", () => {
    BASES.forEach((base) => {
      expect(base.lat).toBeGreaterThan(50);
      expect(base.lat).toBeLessThan(52);
      expect(base.lon).toBeGreaterThan(6);
      expect(base.lon).toBeLessThan(7);
    });
  });

  it("debe ser inmutable", () => {
    // El array debe estar frozen
    expect(Object.isFrozen(BASES)).toBe(true);
    
    // Los objetos internos también deben estar frozen
    BASES.forEach(base => {
      expect(Object.isFrozen(base)).toBe(true);
    });
  });
});
