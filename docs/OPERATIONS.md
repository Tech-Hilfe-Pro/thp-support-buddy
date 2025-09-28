# Operations & Wartung

## Tägliche Checks
- `/health` "ok: true", Zeitstempel aktuell.
- Cloudflare Deploys grün, keine neuen Fehler im Functions Log.
- Stripe Dashboard: Zahlungen, Subscriptions ohne Fehlversuche.

## Wöchentliche Aufgaben
- Lighthouse kurz prüfen (Home ≥ 90/90/90/90).
- Offene Webhook-Fehler sichten.
- Preise/Copy stichprobenartig vergleichen (Rechner vs. Tabellen).

## Schlüsselrotation
- Stripe: Neue Secret Keys erzeugen → ENV setzen → alten Key deaktivieren nach Smoke-Test.
- `STRIPE_WEBHOOK_SECRET` neu setzen, wenn Endpoint neu angelegt.

## Vorfall-Handling (Kurz)
- Payment schlägt fehl: Stripe Dashboard prüfen, Logs `/api/stripe/*`.
- Webhook 4xx/5xx: `STRIPE_WEBHOOK_SECRET` verifizieren, Raw-Body-Handling prüfen, ggf. "lenient mode" temporär (ENV).
- Downtime: Cloudflare Status, erneute Deploys/Rollback via Git.