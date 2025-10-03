/** Supabase temporalmente desactivado */
export const supabaseOrNull = null;

/** Útil si un componente quiere abortar de forma explícita */
export function requireSupabase(): never {
  throw new Error("Supabase está desactivado en este entorno.");
}
