import type { SupabaseClient } from "@supabase/supabase-js";
// El cliente auto-generado por Lovable Cloud:
import { supabase as autoSupabase } from "@/integrations/supabase/client";

export const supabaseOrNull: SupabaseClient | null =
  autoSupabase ?? null;

export function requireSupabase(client: SupabaseClient | null): asserts client is SupabaseClient {
  if (!client) {
    throw new Error("Supabase no configurado por el entorno gestionado (Lovable Cloud).");
  }
}
