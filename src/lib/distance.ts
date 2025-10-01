/**
 * Stub para ORS (OpenRouteService) - distancias y tiempos de viaje
 * Por ahora devuelve null; listo para integración futura
 */

export interface TravelMatrix {
  distance: number; // km
  duration: number; // minutos
}

/**
 * Calcula distancia y tiempo desde base hasta PLZ destino
 * @param plz PLZ del cliente (5 dígitos)
 * @returns {TravelMatrix | null} null si no disponible o fuera de zona
 */
export async function getTravelMatrix(plz: string): Promise<TravelMatrix | null> {
  // TODO: integrar con ORS API cuando esté disponible
  // const response = await fetch(`https://api.openrouteservice.org/...`)
  // return { distance: ..., duration: ... }
  
  return null;
}
