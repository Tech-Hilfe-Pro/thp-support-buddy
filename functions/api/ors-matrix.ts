/**
 * Proxy ORS Matrix API - Cloudflare Pages Function
 * Calcula distancia (km) y duración (min) desde base THP hasta destino
 */

interface Env {
  ORS_KEY: string;
  THP_BASE_COORD: string; // "lon,lat"
}

interface RequestBody {
  dest: [number, number]; // [lon, lat]
  profile?: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const key = context.env.ORS_KEY;
    const baseCoordStr = context.env.THP_BASE_COORD;

    if (!key || !baseCoordStr) {
      return new Response(
        JSON.stringify({ error: 'Missing ORS configuration' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const body = await context.request.json() as RequestBody;
    const { dest, profile = 'driving-car' } = body;

    if (!dest || !Array.isArray(dest) || dest.length !== 2) {
      return new Response(
        JSON.stringify({ error: 'Invalid dest coordinates' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Parse base coordinates
    const [lonStr, latStr] = baseCoordStr.split(',');
    const origin: [number, number] = [parseFloat(lonStr), parseFloat(latStr)];

    if (isNaN(origin[0]) || isNaN(origin[1])) {
      return new Response(
        JSON.stringify({ error: 'Invalid base coordinates' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Call ORS Matrix API
    const orsUrl = `https://api.openrouteservice.org/v2/matrix/${profile}`;
    const orsBody = {
      locations: [origin, dest],
      sources: [0],
      destinations: [1],
      metrics: ['distance', 'duration'],
    };

    const orsResponse = await fetch(orsUrl, {
      method: 'POST',
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orsBody),
    });

    if (!orsResponse.ok) {
      console.error('ORS API error:', orsResponse.status, await orsResponse.text());
      return new Response(
        JSON.stringify({ error: 'ORS unavailable' }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    const orsData = await orsResponse.json();
    
    // Extract distance (m) and duration (s) from response
    const distance = orsData.distances?.[0]?.[0];
    const duration = orsData.durations?.[0]?.[0];

    if (typeof distance !== 'number' || typeof duration !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Invalid ORS response' }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // Convert to km and minutes
    const result = {
      distanceKm: Math.round((distance / 1000) * 10) / 10,
      durationMin: Math.round(duration / 60),
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  } catch (error) {
    console.error('ORS proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
};
