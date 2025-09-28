export type ConsentState = "granted" | "denied" | "unset";

const KEY = "thp_consent_v1";

export function getConsent(): ConsentState {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "granted" || stored === "denied") {
      return stored as ConsentState;
    }
  } catch {
    // localStorage not available or error
  }
  return "unset";
}

export function setConsent(value: ConsentState): void {
  try {
    localStorage.setItem(KEY, value);
    // Set global state for immediate access
    (window as any).__thp_consent = value;
  } catch {
    // localStorage not available
  }
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

export function emitConsentGranted(): void {
  window.dispatchEvent(new CustomEvent("thp:consent-granted"));
}

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