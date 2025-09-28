# Deploy-Checkliste · Tech Hilfe Pro

## 1) Vorbereitung
- `.env.sample` kopieren → `.env` (lokal) und Werte setzen.
- In Cloudflare Pages: Projekt → **Settings → Environment Variables**:
  - `VITE_STRIPE_PUBLISHABLE_KEY` (Client, sichtbar)
  - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SITE_URL`, `ANALYTICS_ENABLE`, `ANALYTICS_TOKEN` (Server/Functions)
  - Preis-IDs: `PRICE_PRIVAT_S`, `PRICE_PRIVAT_M`, `PRICE_PRIVAT_L`, `PRICE_KMU_STARTER`, `PRICE_KMU_GROW`, `PRICE_KMU_PRO`
  - Optional Binding: **KV Namespace** als `ANALYTICS_KV`
- `VITE_TECH_PIN` setzen (4–6-stellig).

## 2) Stripe
- Dashboard → Produkte/Preise: Price-IDs für Abos notieren und als ENV setzen.
- Webhook (Testmode): Endpoint `https://<domain>/api/stripe/webhook`
  - Events: `payment_intent.succeeded`, `invoice.paid`, `customer.subscription.created`, `customer.subscription.updated`
  - Secret kopieren → `STRIPE_WEBHOOK_SECRET`

## 3) Build/Tests
- Lokal: `node scripts/verify-env.ts`
- Preview Build (Cloudflare): Pull Request auf `main` → Preview inspect.
- Manuell prüfen:
  - `/health` zeigt JSON ok.
  - `/sitemap.xml`, `/robots.txt` erreichbar.
  - SEO `<SEO />` vorhanden (Title/Desc wechselnd).
  - Rechner rechnet, Termin speichert Quote, ICS-Download funktioniert.
  - Kasse (Sandbox) läuft für One-Time & Abo.
  - Techniker-Flow → Checkout-Link erzeugbar.

## 4) Go-Live
- `SITE_URL` auf Produktion setzen.
- Stripe Webhook auf Produktionsdomain anpassen.
- Analytics optional aktivieren (`ANALYTICS_ENABLE=true`).