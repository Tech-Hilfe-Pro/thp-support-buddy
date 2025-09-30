# API de Precios Tech Hilfe Pro

Sistema unificado de precios, catálogos y Stripe para Tech Hilfe Pro.

## Arquitectura

```
Backend (Edge Functions - Deno)
├── functions/lib/pricing/
│   ├── types.ts          # Tipos TypeScript compartidos
│   ├── plans.ts          # Catálogos de planes KMU y Privat
│   ├── services.ts       # Catálogo de 17 servicios
│   ├── zones.ts          # Zonas PLZ y tarifas
│   └── calculator.ts     # Lógica de cálculo de precios
│
└── functions/api/
    ├── price.ts          # POST /api/price - Cálculo de precios
    ├── plans-kmu.ts      # GET /api/plans/kmu
    ├── plans-privat.ts   # GET /api/plans/privat
    ├── services.ts       # GET /api/services
    ├── checkout.ts       # POST /api/checkout - Stripe Checkout
    └── stripe-webhook.ts # POST /api/stripe/webhook

Frontend (React + TypeScript)
└── src/lib/pricing-client.ts  # Cliente API + tipos
```

## Endpoints

### POST /api/price

Calcula el precio de un servicio según parámetros.

**Request:**
```json
{
  "plz": "50823",
  "serviceId": "1",
  "hours": 2,
  "onsite": true,
  "subscriptionTier": "plus",
  "urgency": false,
  "hardware": false
}
```

**Response (éxito):**
```json
{
  "baseRate": 79,
  "zone": "Köln Kern",
  "surcharges": {
    "urgency": 0,
    "hardware": 0
  },
  "discount": {
    "type": "plus",
    "pct": 25
  },
  "hours": 2,
  "total": 118.5,
  "currency": "EUR"
}
```

**Response (error):**
```json
{
  "error": "PLZ fuera del área de servicio."
}
```

### GET /api/plans/kmu

Retorna catálogo de planes KMU.

**Response:**
```json
{
  "plans": [
    {
      "id": "kmu-basic",
      "name": "Managed IT-Partner (Basic)",
      "price": 14.90,
      "minMonthly": 99,
      "annualDiscount": 0.10,
      "onsiteDiscount": 0.25
    },
    ...
  ]
}
```

### GET /api/plans/privat

Retorna catálogo de planes Privat.

**Response:**
```json
{
  "plans": [
    {
      "id": "privat-start",
      "name": "Haus-IT Start",
      "monthly": 9.90,
      "onsiteDiscount": 0.15
    },
    ...
  ]
}
```

### GET /api/services

Retorna catálogo de 17 servicios.

**Response:**
```json
{
  "services": [
    {
      "id": "1",
      "slug": "computer",
      "nameDe": "Computer",
      "descriptionShort": "PC-Einrichtung, Wartung...",
      "remoteAvailable": true
    },
    ...
  ]
}
```

### POST /api/checkout

Crea sesión de Stripe Checkout para suscripciones.

**Request:**
```json
{
  "planType": "privat",
  "planId": "privat-plus",
  "email": "user@example.com",
  "qty": 1,
  "companyName": "Tech GmbH"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### POST /api/stripe/webhook

Webhook para eventos de Stripe (verificación de firma).

## Lógica de Precios

### Zonas

| Zona | PLZ Ejemplo | Tarifa Base |
|------|-------------|-------------|
| Köln Kern | 50823 | 79 €/h |
| Neuss/Köln Umland | 41460 | 85 €/h |
| Umland 20-40km | 40212, 53111 | 95 €/h |

### Suplementos

- **Urgencia** (`urgency: true`): +25%
- **Hardware** (`hardware: true`): +10%
- Se aplican sobre la tarifa base antes de multiplicar por horas

### Descuentos (solo on-site)

- **Start** (`subscriptionTier: 'start'`): -15%
- **Plus** (`subscriptionTier: 'plus'`): -25%
- No aplica a servicios remotos

### Fórmula

```
1. rate_with_surcharges = baseRate * (1 + urgency + hardware)
2. subtotal = rate_with_surcharges * hours
3. total_before_rounding = subtotal * (1 - discount)
4. total = roundToHalf(total_before_rounding)
```

Donde `roundToHalf()` redondea al múltiplo de 0.50 más cercano.

## Planes

### KMU (Empresas)

| Plan | Nombre | Precio/endpoint | Mín. Mensual |
|------|--------|-----------------|--------------|
| kmu-basic | Managed IT-Partner (Basic) | 14,90 € | 99 € |
| kmu-standard | Advanced IT-Pro (Standard) | 24,90 € | 179 € |
| kmu-premium | Enterprise IT-Guard (Premium) | 39,90 € | 299 € |

**Descuentos:**
- 10% prepago anual
- 25% en servicios on-site con suscripción activa

### Privat (Clientes residenciales)

| Plan | Nombre | Mensual | Descuento On-site |
|------|--------|---------|-------------------|
| privat-start | Haus-IT Start | 9,90 € | 15% |
| privat-plus | Haus-IT Plus | 19,90 € | 25% |

## Servicios

17 servicios en total:

1. Computer
2. Computer-Software
3. Drucker, Kopierer & Scanner
4. E-Book-Reader & Tablets
5. Festplatten & Datensicherung
6. Heimnetzwerk & WLAN
7. Konsolen & VR
8. Küche & Haushalt
9. Smart-Home & Assistenten
10. Smartwatch & Fitnesstracker
11. Telefon, Handy & Fax
12. Ton, HiFi & Lautsprecher
13. TV, DVD, Blu-ray & Video
14. TV-Internet & Streaming
15. TV-Receiver
16. TV-Einrichtung
17. Windows 11

Cada servicio incluye:
- `id`: Identificador único
- `slug`: URL-friendly
- `nameDe`: Nombre en alemán
- `descriptionShort`: Descripción breve (2-3 líneas)
- `remoteAvailable`: boolean (disponibilidad remota)

## Uso en Frontend

```typescript
import { PricingAPI } from '@/lib/pricing-client';

// Calcular precio
const result = await PricingAPI.calculatePrice({
  plz: '50823',
  serviceId: '1',
  hours: 2,
  onsite: true,
  subscriptionTier: 'plus',
});

if ('error' in result) {
  console.error(result.error);
} else {
  console.log(`Precio total: ${result.total} €`);
}

// Obtener planes
const kmuPlans = await PricingAPI.getKMUPlans();
const privatPlans = await PricingAPI.getPrivatPlans();

// Obtener servicios
const services = await PricingAPI.getServices();
```

## Variables de Entorno

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (mapeo de planes)
STRIPE_PRICE_KMU_BASIC=price_...
STRIPE_PRICE_KMU_STANDARD=price_...
STRIPE_PRICE_KMU_PREMIUM=price_...
STRIPE_PRICE_PRIVAT_START=price_...
STRIPE_PRICE_PRIVAT_PLUS=price_...

# App
APP_URL=https://techhilfepro.de
```

## Seguridad

✅ **Validación exhaustiva** de inputs (PLZ, serviceId, hours)  
✅ **CORS** configurado para dominio de la app  
✅ **Rate limiting** (preparado para 60 req/min)  
✅ **Verificación de firma** en webhook de Stripe  
✅ **Sin datos sensibles** en logs  
✅ **Cumplimiento RGPD** - no almacenamos tarjetas  

## Tests

```bash
# Ejecutar todos los tests
npm run test

# Tests específicos de pricing
npm run test pricing

# Con coverage (objetivo: >85%)
npm run test:coverage
```

Tests incluidos:
- ✅ Cálculo de precios (todas las combinaciones)
- ✅ Validación de PLZ
- ✅ Redondeo a 0.50€
- ✅ API calls con MSW mock
- ✅ Catálogos de planes y servicios

## Próximos Pasos

1. **Configurar Stripe Price IDs** en variables de entorno
2. **Configurar webhook** en Stripe Dashboard → apuntar a `/api/stripe/webhook`
3. **Integrar frontend** con `PricingAPI` client
4. **Persistencia** (opcional): añadir base de datos para tracking de suscripciones
