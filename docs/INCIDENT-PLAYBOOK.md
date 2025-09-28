# Incident Playbook

## 1) "Kasse lädt nicht"
- Prüfen: `VITE_STRIPE_PUBLISHABLE_KEY` vorhanden? Preconnect auf js.stripe.com aktiv?
- Console-Fehler: Payment Element Mount? PaymentIntent Response ok?

## 2) "Webhook invalid signature"
- `STRIPE_WEBHOOK_SECRET` prüfen (richtige Umgebung).
- Body darf nicht verändert werden; Signatur-Check (wenn aktiv) muss Raw-Body nutzen. In lenient mode nur Event-Typ prüfen.

## 3) "Rabatt falsch berechnet"
- `SUBSCRIPTION_DISCOUNT` in `src/lib/pricing.ts` = 0.20?
- Abo-Checkbox gesetzt? Anfahrt wird nie rabattiert.