/**
 * PLZ Dataset Loader
 * Carga eficiente de centroides de PLZ alemanas con singleton y cache global
 */

interface PLZCoordinate {
  lat: number;
  lon: number;
}

interface PLZEntry {
  plz: string;
  lat: number;
  lon: number;
}

interface PLZResult extends PLZCoordinate {
  source: "dataset";
}

// Cache global para entornos serverless
declare global {
  var __PLZ_MAP: Map<string, PLZCoordinate> | undefined;
}

let plzMapSingleton: Map<string, PLZCoordinate> | null = null;

/**
 * Valida formato de PLZ alemana (5 dígitos)
 */
function isValidPLZ(plz: string): boolean {
  return /^\d{5}$/.test(plz);
}

/**
 * Carga el dataset de PLZ desde JSON
 * Usa cache global para entornos serverless (Cloudflare Workers)
 */
async function loadDataset(): Promise<PLZEntry[]> {
  try {
    // En entorno de desarrollo/build, usar fetch absoluto
    const response = await fetch("/data/plz-centroids.de.json");
    
    if (!response.ok) {
      throw new Error(`Failed to load PLZ dataset: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("PLZ dataset must be an array");
    }

    return data as PLZEntry[];
  } catch (error) {
    console.error("Error loading PLZ dataset:", error);
    // Retornar dataset mínimo con las bases conocidas
    return [
      { plz: "50823", lat: 50.949, lon: 6.92 },
      { plz: "50259", lat: 50.999, lon: 6.804 },
      { plz: "41460", lat: 51.204, lon: 6.689 },
    ];
  }
}

/**
 * Obtiene el Map de PLZ con lazy loading y cache global
 * Singleton para optimizar memoria en entornos serverless
 */
export async function loadPLZMap(): Promise<Map<string, PLZCoordinate>> {
  // Verificar cache global primero (serverless)
  if (globalThis.__PLZ_MAP) {
    return globalThis.__PLZ_MAP;
  }

  // Verificar singleton local
  if (plzMapSingleton) {
    return plzMapSingleton;
  }

  // Cargar y cachear
  const dataset = await loadDataset();
  const map = new Map<string, PLZCoordinate>();

  for (const entry of dataset) {
    if (isValidPLZ(entry.plz)) {
      map.set(entry.plz, {
        lat: entry.lat,
        lon: entry.lon,
      });
    }
  }

  // Guardar en cache global y singleton
  globalThis.__PLZ_MAP = map;
  plzMapSingleton = map;

  console.log(`PLZ dataset loaded: ${map.size} entries`);

  return map;
}

/**
 * Obtiene coordenadas de una PLZ desde el dataset
 * @returns Coordenadas con source 'dataset' o null si no existe
 */
export async function getFromDataset(plz: string): Promise<PLZResult | null> {
  // Validar formato
  if (!isValidPLZ(plz)) {
    return null;
  }

  // Obtener Map (cacheado)
  const plzMap = await loadPLZMap();

  // Lookup O(1)
  const coords = plzMap.get(plz);

  if (!coords) {
    return null;
  }

  return {
    lat: coords.lat,
    lon: coords.lon,
    source: "dataset",
  };
}

/**
 * Limpia el cache (útil para tests)
 */
export function clearCache(): void {
  plzMapSingleton = null;
  globalThis.__PLZ_MAP = undefined;
}

/**
 * Obtiene estadísticas del dataset cargado
 */
export async function getDatasetStats(): Promise<{
  total: number;
  cached: boolean;
}> {
  const isCached = !!plzMapSingleton || !!globalThis.__PLZ_MAP;
  const map = await loadPLZMap();

  return {
    total: map.size,
    cached: isCached,
  };
}
