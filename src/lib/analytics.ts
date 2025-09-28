/* Lightweight, cookieless analytics for THP. Sends to /api/track only if:
   - env ANALYTICS_ENABLE === "true"
   - user consent === "granted"
   No cookies. Uses sessionStorage for a non-persistent SID. */
import { getConsent, onConsentGranted } from "./consent";

type Props = Record<string, unknown>;
type EventName =
  | "page_view"
  | "calculator_opened"
  | "calculator_result_shown"
  | "booking_started"
  | "booking_submitted"
  | "booking_confirmed"
  | "checkout_started"
  | "payment_succeeded"
  | "subscription_created"
  | "tech_quickcharge_started"
  | "tech_checkoutlink_created";

const ENABLED = (import.meta as any)?.env?.ANALYTICS_ENABLE === "true";
const TOKEN = (import.meta as any)?.env?.ANALYTICS_TOKEN || "";
const QUEUE_KEY = "thp_evt_queue";
const SID_KEY = "thp_sid";

function uuid4() {
  const a = crypto.getRandomValues(new Uint8Array(16));
  a[6] = (a[6] & 0x0f) | 0x40;
  a[8] = (a[8] & 0x3f) | 0x80;
  const h = [...a].map(b => b.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}

function getSid(): string {
  try {
    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) {
      sid = uuid4();
      sessionStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return "nosid";
  }
}

function readQueue(): any[] {
  try {
    const raw = sessionStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { 
    return []; 
  }
}

function writeQueue(q: any[]) {
  try { 
    sessionStorage.setItem(QUEUE_KEY, JSON.stringify(q)); 
  } catch {}
}

async function send(payload: any) {
  if (!ENABLED) return;
  try {
    const headers: Record<string,string> = { "Content-Type":"application/json" };
    if (TOKEN) headers["Authorization"] = `Bearer ${TOKEN}`;
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      await fetch("/api/track", { method:"POST", headers, body, keepalive:true });
    }
  } catch {}
}

export function flushQueue() {
  if (!ENABLED) return;
  if (getConsent() !== "granted") return;
  const q = readQueue();
  if (!q.length) return;
  writeQueue([]);
  q.forEach(evt => send(evt));
}

export function track(event: EventName, props: Props = {}) {
  if (!ENABLED) return;
  const base = {
    sid: getSid(),
    ts: new Date().toISOString(),
    href: typeof location !== "undefined" ? location.href : "",
    path: typeof location !== "undefined" ? location.pathname : "",
    ua: typeof navigator !== "undefined" ? navigator.userAgent : ""
  };
  const payload = { event, ...base, props };
  const consent = getConsent();
  if (consent === "granted") {
    void send(payload);
  } else if (consent === "unset") {
    const q = readQueue();
    q.push(payload);
    writeQueue(q);
  } else {
    // denied → verwerfen
  }
}

// Init: flush on consent
onConsentGranted(() => flushQueue());

// Helpers
export function trackPageView() { 
  track("page_view"); 
}

export function bucketAmount(amountCents?: number) {
  if (!amountCents || amountCents <= 0) return "0";
  if (amountCents < 5000) return "<50€";
  if (amountCents < 10000) return "50–100€";
  if (amountCents < 20000) return "100–200€";
  return "≥200€";
}