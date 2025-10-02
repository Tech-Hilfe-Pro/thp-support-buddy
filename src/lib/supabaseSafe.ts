import type { SupabaseClient } from "@supabase/supabase-js";
// El cliente auto-generado por Lovable Cloud:
import { supabase as autoSupabase } from "@/integrations/supabase/client";

export let supabaseOrNull: SupabaseClient | null =
  autoSupabase ?? null;

export function requireSupabase(client: typeof supabaseOrNull): asserts client is SupabaseClient {
  if (!client) {
    throw new Error("Supabase no configurado por el entorno (Lovable Cloud).");
  }
}
