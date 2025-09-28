export function getPriceIdFromEnv(env: any, key: string): string {
  const priceId = env[key];
  if (!priceId) {
    throw new Error(`Preis-ID für ${key} nicht in Umgebungsvariablen gefunden`);
  }
  return priceId;
}

export function formEncode(data: Record<string, any>): string {
  return Object.keys(data)
    .filter(key => data[key] !== undefined && data[key] !== null)
    .map(key => {
      const value = data[key];
      if (Array.isArray(value)) {
        return value.map(v => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`).join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}

export function getOrigin(req: any): string {
  try {
    return new URL(req.url).origin;
  } catch {
    return 'http://localhost:8788'; // Fallback for development
  }
}