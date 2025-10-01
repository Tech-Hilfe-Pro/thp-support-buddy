/**
 * Cliente ORS Matrix - Proxy a través de Cloudflare Pages Function
 * Calcula distancia (km) y duración (min) desde base THP hasta destino
 */

export interface TravelMatrix {
  distanceKm: number;
  durationMin: number;
}

/**
 * Llama al proxy ORS Matrix para obtener distancia y tiempo de viaje
 * @param dest Coordenadas destino [lon, lat]
 * @param profile Perfil de ruta (default: "driving-car")
 * @returns {TravelMatrix | null} null si falla o no disponible
 */
export async function getTravelMatrix(
  dest: [number, number],
  profile: string = 'driving-car'
): Promise<TravelMatrix | null> {
  try {
    const response = await fetch('/api/ors-matrix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dest, profile }),
    });

    if (!response.ok) {
      console.warn('ORS Matrix proxy error:', response.status);
      return null;
    }

    const data = await response.json();
    return data as TravelMatrix;
  } catch (error) {
    console.warn('ORS Matrix call failed:', error);
    return null;
  }
}
