/**
 * Environment variables validation
 * Validates required env vars without external dependencies
 */

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// Required environment variables
const REQUIRED_VARS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_PUBLISHABLE_KEY',
] as const;

function validateEnv() {
  const missing: string[] = [];
  
  REQUIRED_VARS.forEach((varName) => {
    const value = import.meta.env[varName];
    if (!value || String(value).trim() === '') {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(', ')}`;
    
    if (isProd) {
      // In production, throw error to fail the build
      throw new Error(message);
    } else if (isDev) {
      // In development, log warning
      console.warn(`⚠️ ${message}`);
    }
  }
}

// Validate on module load
validateEnv();

// Export validated environment variables
export const env = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ?? '',
  VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '',
  VITE_SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID ?? '',
} as const;
