export type ConsentCategories = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentData = {
  version: string;
  timestamp: number;
  categories: ConsentCategories;
};

export type ConsentState = "granted" | "denied" | "unset";

const KEY = "thp_consent_v2";
const CONSENT_VERSION = "1.0";

// Default categories
const DEFAULT_CATEGORIES: ConsentCategories = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function getConsentData(): ConsentData | null {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      const data = JSON.parse(stored) as ConsentData;
      return data;
    }
  } catch {
    // localStorage not available or parsing error
  }
  return null;
}

export function getConsent(): ConsentState {
  const data = getConsentData();
  if (!data) return "unset";
  
  // Check if user has granted any non-essential categories
  if (data.categories.analytics || data.categories.marketing) {
    return "granted";
  }
  
  // If only essential is true, consider it as "denied" for non-essential
  return "denied";
}

export function setConsentData(categories: ConsentCategories): void {
  try {
    const data: ConsentData = {
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      categories,
    };
    localStorage.setItem(KEY, JSON.stringify(data));
    // Set global state for immediate access
    (window as any).__thp_consent_data = data;
    
    // Emit events based on categories
    if (categories.analytics || categories.marketing) {
      emitConsentGranted();
    }
    emitConsentChanged();
  } catch {
    // localStorage not available
  }
}

export function setConsent(value: ConsentState): void {
  let categories: ConsentCategories;
  
  if (value === "granted") {
    categories = { essential: true, analytics: true, marketing: true };
  } else {
    categories = { essential: true, analytics: false, marketing: false };
  }
  
  setConsentData(categories);
}

export function acceptEssentialOnly(): void {
  setConsentData({ essential: true, analytics: false, marketing: false });
}

export function acceptAll(): void {
  setConsentData({ essential: true, analytics: true, marketing: true });
}

export function onConsentGranted(callback: () => void): void {
  if (getConsent() === "granted") {
    // Execute immediately if already granted
    callback();
  } else {
    // Listen for consent event
    window.addEventListener("thp:consent-granted", callback);
  }
}

export function onConsentChanged(callback: () => void): void {
  window.addEventListener("thp:consent-changed", callback);
}

export function emitConsentGranted(): void {
  window.dispatchEvent(new CustomEvent("thp:consent-granted"));
}

export function emitConsentChanged(): void {
  window.dispatchEvent(new CustomEvent("thp:consent-changed"));
}

export function hasAnalyticsConsent(): boolean {
  const data = getConsentData();
  return data?.categories.analytics === true;
}

export function hasMarketingConsent(): boolean {
  const data = getConsentData();
  return data?.categories.marketing === true;
}

// Import analytics flush when consent is granted
import { flushQueue } from "./analytics";
onConsentGranted(() => flushQueue());

// Initialize global state on load
if (typeof window !== "undefined") {
  (window as any).__thp_consent = getConsent();
}

// Here later: Analytics Loader (Umami/Cloudflare WA) can hook into consent events
// Example for future implementation:
// onConsentGranted(() => {
//   // Load analytics scripts only after consent
//   loadAnalytics();
// });