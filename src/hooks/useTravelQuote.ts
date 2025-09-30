import { useState, useEffect, useRef, useCallback } from "react";

export interface TravelQuoteInput {
  plz: string;
  service?: string;
  hours?: number;
  subscriptionTier?: "A" | "B" | null;
  lat?: number;
  lon?: number;
}

export interface TravelQuoteResponse {
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

export interface TravelQuoteData extends TravelQuoteResponse {
  summary: string;
}

interface CacheEntry {
  data: TravelQuoteData;
  timestamp: number;
}

const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutos
const DEBOUNCE_DELAY_MS = 300;
const cache = new Map<string, CacheEntry>();

function getCacheKey(input: TravelQuoteInput): string {
  return `${input.plz}|${input.service || ""}|${input.hours || 1}|${input.subscriptionTier || ""}`;
}

function generateSummary(data: TravelQuoteResponse): string {
  return `Basis: ${data.originBase} · Distanz: ${data.km_total} km · Zeit: ${data.min_total} min · Anfahrt: ${data.travel_fee} €`;
}

export function useTravelQuote(input: TravelQuoteInput) {
  const [data, setData] = useState<TravelQuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastInputRef = useRef<string>("");

  const fetchTravelQuote = useCallback(
    async (signal: AbortSignal) => {
      // Validación básica
      if (!input.plz || !/^\d{5}$/.test(input.plz)) {
        setError("PLZ muss 5 Ziffern sein");
        setData(null);
        return;
      }

      // Verificar cache
      const cacheKey = getCacheKey(input);
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        setData(cached.data);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/travel-quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plz: input.plz,
            service: input.service,
            hours: input.hours ?? 1,
            subscriptionTier: input.subscriptionTier,
            lat: input.lat,
            lon: input.lon,
          }),
          signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const responseData: TravelQuoteResponse = await response.json();
        const enrichedData: TravelQuoteData = {
          ...responseData,
          summary: generateSummary(responseData),
        };

        // Guardar en cache
        cache.set(cacheKey, {
          data: enrichedData,
          timestamp: Date.now(),
        });

        setData(enrichedData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            // Petición cancelada, no actualizar estado
            return;
          }
          setError(err.message);
        } else {
          setError("Unbekannter Fehler");
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [input]
  );

  const refetch = useCallback(() => {
    // Cancelar petición anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Limpiar debounce anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Invalidar cache para esta clave
    const cacheKey = getCacheKey(input);
    cache.delete(cacheKey);

    // Iniciar nueva petición
    setLoading(true);
    setError(null);

    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    fetchTravelQuote(newAbortController.signal);
  }, [input, fetchTravelQuote]);

  useEffect(() => {
    // Generar input key para detectar cambios
    const inputKey = getCacheKey(input);

    // Si el input no ha cambiado, no hacer nada
    if (inputKey === lastInputRef.current) {
      return;
    }

    lastInputRef.current = inputKey;

    // Cancelar petición anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Limpiar debounce anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Validación rápida
    if (!input.plz || !/^\d{5}$/.test(input.plz)) {
      setLoading(false);
      setError(null);
      setData(null);
      return;
    }

    // Aplicar debounce
    setLoading(true);
    setError(null);

    debounceTimerRef.current = setTimeout(() => {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      fetchTravelQuote(newAbortController.signal);
    }, DEBOUNCE_DELAY_MS);

    // Cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [input, fetchTravelQuote]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
