import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar envs según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Validar envs críticos (solo warn, no throw)
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    console.warn(
      '⚠️  ADVERTENCIA: Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY.\n' +
      '   El build continuará, pero algunas funcionalidades pueden no estar disponibles en runtime.'
    );
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
