/**
 * Travel Quote Calculator - Cloudflare Pages Function
 * Calcula distancia, tiempo y coste de desplazamiento usando OpenRouteService Matrix API
 */

import { getTravelConfig, roundTo05, BASES, type BaseLocation } from "../lib/travelConfig";

interface Env {
  ORS_API_KEY: string;
  CONSUMO_L_100KM?: string;
  PRECIO_FUEL_EUR_L?: string;
  DESGASTE_EUR_KM?: string;
  TARIFA_HORA_VIAJE?: string;
  MARGEN?: string;
  FREE_KM?: string;
  FREE_MIN?: string;
  TRAVEL_CACHE?: KVNamespace;
}

interface TravelQuoteInput {
  plz: string;
  service?: string;
  hours?: number;
  subscriptionTier?: "A" | "B" | null;
  lat?: number;
  lon?: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface ORSMatrixResponse {
  durations: number[][];
  distances: number[][];
}

interface TravelQuoteResponse {
  originBase: string;
  distance_km: number;
  duration_min: number;
  km_total: number;
  min_total: number;
  travel_fee: number;
  breakdown: {
    fuel_cost: number;
    wear_cost: number;
    time_cost: number;
    margen: number;
  };
  currency: string;
  fallback?: boolean;
}

// Cache en memoria para geocodificación (simple, sin KV)
const geoCache = new Map<string, { coords: Coordinates; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 1 día
const ROUTE_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos

// Validación de entrada
function validateInput(data: any): TravelQuoteInput | null {
  if (!data.plz || typeof data.plz !== "string" || !/^\d{5}$/.test(data.plz)) {
    return null;
  }
  
  const hours = data.hours ?? 1;
  if (typeof hours !== "number" || hours < 0.5 || hours > 8) {
    return null;
  }

  if (data.lat !== undefined && (typeof data.lat !== "number" || data.lat < -90 || data.lat > 90)) {
    return null;
  }

  if (data.lon !== undefined && (typeof data.lon !== "number" || data.lon < -180 || data.lon > 180)) {
    return null;
  }

  return {
    plz: data.plz,
    service: data.service,
    hours,
    subscriptionTier: data.subscriptionTier ?? null,
    lat: data.lat,
    lon: data.lon,
  };
}

// Geocodificación de PLZ alemana usando ORS
async function geocodePLZ(plz: string, apiKey: string): Promise<Coordinates | null> {
  // Verificar cache
  const cached = geoCache.get(plz);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.coords;
  }

  try {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${plz},Germany&boundary.country=DE&size=1`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("ORS Geocode failed:", response.status);
      return null;
    }

    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      const coords = { lat, lon };
      geoCache.set(plz, { coords, timestamp: Date.now() });
      return coords;
    }
  } catch (error) {
    console.error("Geocode error:", error);
  }

  return null;
}

// Calcular distancia Haversine (fallback)
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Llamar a ORS Matrix API
async function getORSMatrix(
  bases: BaseLocation[],
  destination: Coordinates,
  apiKey: string
): Promise<ORSMatrixResponse | null> {
  try {
    const locations = [
      ...bases.map((b) => [b.lon, b.lat]),
      [destination.lon, destination.lat],
    ];

    const response = await fetch("https://api.openrouteservice.org/v2/matrix/driving-car", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locations,
        metrics: ["distance", "duration"],
        units: "km",
      }),
    });

    if (!response.ok) {
      console.error("ORS Matrix failed:", response.status, await response.text());
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ORS Matrix error:", error);
    return null;
  }
}

// Calcular coste de viaje usando configuración centralizada
function calculateTravelCost(
  distance_km: number,
  duration_min: number,
  config: ReturnType<typeof getTravelConfig>
): { travel_fee: number; breakdown: any } {
  const km_total = distance_km * 2;
  const min_total = duration_min * 2;

  // Si está dentro de zona gratuita
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

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Verificar API key
    const apiKey = env.ORS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "ORS_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parsear y validar input
    const body = await request.json();
    const input = validateInput(body);
    if (!input) {
      return new Response(JSON.stringify({ error: "Invalid input. Required: plz (5 digits)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Configuración de costes usando módulo centralizado
    const config = getTravelConfig(env);

    // Obtener coordenadas del destino
    let destination: Coordinates;
    if (input.lat !== undefined && input.lon !== undefined) {
      destination = { lat: input.lat, lon: input.lon };
    } else {
      const coords = await geocodePLZ(input.plz, apiKey);
      if (!coords) {
        return new Response(
          JSON.stringify({ error: "Could not geocode PLZ. Provide lat/lon." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      destination = coords;
    }

    // Cache key para rutas
    const cacheKey = `route:${destination.lat.toFixed(4)},${destination.lon.toFixed(4)}`;
    
    // Intentar obtener de cache (si KV está disponible)
    if (env.TRAVEL_CACHE) {
      try {
        const cached = await env.TRAVEL_CACHE.get(cacheKey, "json");
        if (cached) {
          return new Response(JSON.stringify(cached), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      } catch (e) {
        console.log("Cache read failed:", e);
      }
    }

    // Llamar a ORS Matrix API
    let matrixData = await getORSMatrix(BASES, destination, apiKey);
    let useFallback = false;

    // Si ORS falla, usar fallback con Haversine
    if (!matrixData) {
      useFallback = true;
      matrixData = {
        durations: BASES.map((base) => {
          const dist = haversineDistance(base.lat, base.lon, destination.lat, destination.lon);
          const duration = (dist / 35) * 3600; // 35 km/h promedio
          return [0, 0, 0, duration];
        }),
        distances: BASES.map((base) => {
          const dist = haversineDistance(base.lat, base.lon, destination.lat, destination.lon);
          return [0, 0, 0, dist];
        }),
      };
    }

    // Seleccionar base con menor duración
    let bestBaseIndex = 0;
    let minDuration = matrixData.durations[0][3]; // Columna del destino (índice 3)

    for (let i = 1; i < BASES.length; i++) {
      const duration = matrixData.durations[i][3];
      if (duration < minDuration) {
        minDuration = duration;
        bestBaseIndex = i;
      }
    }

    const selectedBase = BASES[bestBaseIndex];
    const distance_km = matrixData.distances[bestBaseIndex][3];
    const duration_sec = matrixData.durations[bestBaseIndex][3];
    const duration_min = duration_sec / 60;

    // Calcular coste
    const { travel_fee, breakdown } = calculateTravelCost(
      distance_km,
      duration_min,
      config
    );

    const response: TravelQuoteResponse = {
      originBase: `${selectedBase.name} ${selectedBase.plz}`,
      distance_km: Math.round(distance_km * 100) / 100,
      duration_min: Math.round(duration_min * 10) / 10,
      km_total: Math.round(distance_km * 2 * 100) / 100,
      min_total: Math.round(duration_min * 2 * 10) / 10,
      travel_fee,
      breakdown,
      currency: "EUR",
      ...(useFallback && { fallback: true }),
    };

    // Guardar en cache (si KV está disponible)
    if (env.TRAVEL_CACHE) {
      try {
        await env.TRAVEL_CACHE.put(cacheKey, JSON.stringify(response), {
          expirationTtl: Math.floor(ROUTE_CACHE_TTL_MS / 1000),
        });
      } catch (e) {
        console.log("Cache write failed:", e);
      }
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Travel quote error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
