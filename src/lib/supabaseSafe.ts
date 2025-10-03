import type { SupabaseClient } from "@supabase/supabase-js";

export const supabaseOrNull: SupabaseClient | null = null;

export function requireSupabase(): never {
  throw new Error("Supabase está desactivado en este entorno.");
}
