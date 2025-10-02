import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Validate required environment variables in production builds
function validateProductionEnv() {
  if (process.env.NODE_ENV === 'production') {
    const required = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_PUBLISHABLE_KEY',
    ];
    
    const missing = required.filter(key => !process.env[key] || String(process.env[key]).trim() === '');
    
    if (missing.length > 0) {
      throw new Error(`❌ Production build failed: Missing required environment variables: ${missing.join(', ')}`);
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Validate env vars before building in production
  if (mode === 'production') {
    validateProductionEnv();
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
