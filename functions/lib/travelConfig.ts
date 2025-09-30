/**
 * Travel Configuration Module
 * Centraliza parámetros de coste con defaults y ENV override
 */

export interface BaseLocation {
  name: string;
  plz: string;
  lat: number;
  lon: number;
}

export interface TravelConfig {
  consumo_l_100km: number;
  precio_fuel_eur_l: number;
  desgaste_eur_km: number;
  tarifa_hora_viaje: number;
  margen: number;
  free_km: number;
  free_min: number;
}

// Bases fijas de salida (inmutables)
export const BASES: Readonly<BaseLocation[]> = Object.freeze([
  Object.freeze({ name: "Köln", plz: "50823", lat: 50.949, lon: 6.920 }),
  Object.freeze({ name: "Pulheim", plz: "50259", lat: 50.999, lon: 6.804 }),
  Object.freeze({ name: "Neuss", plz: "41460", lat: 51.204, lon: 6.689 }),
]);

// Defaults (configurables por ENV)
const DEFAULTS: TravelConfig = {
  consumo_l_100km: 7.5,
  precio_fuel_eur_l: 1.66,
  desgaste_eur_km: 0.18,
  tarifa_hora_viaje: 40,
  margen: 1.12,
  free_km: 5,
  free_min: 15,
};

/**
 * Obtiene configuración de viaje validada
 * Lee desde ENV si existe, sino usa defaults
 */
export function getTravelConfig(env?: Record<string, string | undefined>): Readonly<TravelConfig> {
  const parseFloat = (key: string, defaultValue: number): number => {
    if (!env) return defaultValue;
    const value = env[key];
    if (!value) return defaultValue;
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) || parsed <= 0 ? defaultValue : parsed;
  };

  const config: TravelConfig = {
    consumo_l_100km: parseFloat("CONSUMO_L_100KM", DEFAULTS.consumo_l_100km),
    precio_fuel_eur_l: parseFloat("PRECIO_FUEL_EUR_L", DEFAULTS.precio_fuel_eur_l),
    desgaste_eur_km: parseFloat("DESGASTE_EUR_KM", DEFAULTS.desgaste_eur_km),
    tarifa_hora_viaje: parseFloat("TARIFA_HORA_VIAJE", DEFAULTS.tarifa_hora_viaje),
    margen: parseFloat("MARGEN", DEFAULTS.margen),
    free_km: parseFloat("FREE_KM", DEFAULTS.free_km),
    free_min: parseFloat("FREE_MIN", DEFAULTS.free_min),
  };

  return Object.freeze(config);
}

/**
 * Redondea un valor al múltiplo de 0.5 más cercano
 * Ejemplos: 12.3 → 12.5, 12.7 → 13.0, 12.2 → 12.0
 */
export function roundTo05(value: number): number {
  return Math.round(value * 2) / 2;
}
