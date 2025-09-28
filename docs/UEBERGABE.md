# Übergabe · Tech Hilfe Pro

## Überblick
- Zielgruppen: Privat (Senioren), KMU. Remote-first, Vor-Ort nach Bedarf.
- Preislogik: 79 €/h Vor-Ort, Abrechnung 15-Min-Blöcke, Mindestzeit 45 Min, **20 % Rabatt** auf Arbeitszeit für Abonnenten, Anfahrt je PLZ-Zone.
- Remote: 39 € / 30 Min, danach 9,90 € / 15 Min.

## Architektur
- Vite + React + TS + Tailwind, Cloudflare Pages + Functions.
- Kernmodule:
  - `src/lib/pricing.ts` (Preis-/Zeitlogik, Rabatte, Zonen)
  - `src/lib/quote.ts` (Quote speichern/lesen)
  - `src/lib/ics.ts` (Kalendereinträge)
  - `src/lib/consent.ts` (Consent-State)
  - `src/lib/analytics.ts` (cookieless, consent-gated)
- Daten:
  - `src/data/services.ts`, `src/data/pricing.ts`, `src/data/copy.ts`, `src/data/seo.ts`
- Zahlung:
  - Payment Element: `/kasse` (One-Time), Billing: Subscriptions
  - Functions: `/api/stripe/*`

## Wichtige Flows
- **Rechner → Termin**: Quote persistiert → Terminformular → Zusammenfassung → ICS
- **Kasse**: One-Time (PaymentIntent) oder Abo (SetupIntent + Subscription)
- **Techniker-Flow**: PIN → Quick Charge → Checkout-Link für Kunden

## Recht & Consent
- Seiten: Impressum, Datenschutz, AGB, Widerruf
- Consent-Banner (TTDSG): "Akzeptieren/Ablehnen"; keine Tracker ohne Consent.

## SEO
- `<SEO />`-Komponente, JSON-LD (LocalBusiness, Breadcrumb, FAQ), Sitemap/Robots.

## Wartung
- ENV-Änderungen in Cloudflare; Version in `src/version.ts` pflegen.
- Stripe-Keys/Webhook-Secrets rotieren: Dashboard → Keys → ENV aktualisieren.
- KV leeren (optional): Project Settings → Resources → KV.

## Bekannte Grenzen
- Kein echtes Auth-System (Techniker-PIN ist nur Gate).
- Analytics minimalistisch (KV optional).