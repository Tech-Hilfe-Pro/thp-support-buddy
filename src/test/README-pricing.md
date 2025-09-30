# Tests del Sistema de Precios Tech Hilfe Pro

Este directorio contiene tests unitarios para el nuevo sistema de precios unificado.

## Estructura

```
src/test/unit/pricing/
├── calculator.test.ts    # Tests de lógica de cálculo de precios
├── zones.test.ts         # Tests de validación PLZ y zonas
├── plans.test.ts         # Tests de catálogos de planes
└── services.test.ts      # Tests de catálogo de servicios
```

## Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests específicos de pricing
npm run test pricing

# Con coverage
npm run test:coverage
```

## Cobertura

Los tests cubren:

✅ **Cálculo de precios** (calculator.test.ts)
- Redondeo a 0.50€
- Validaciones de input
- Cálculo básico por zonas
- Suplementos (urgency, hardware)
- Descuentos de suscripción (start, plus)
- Combinaciones múltiples
- Casos edge (PLZ fuera de área, fracciones de hora)

✅ **Zonas PLZ** (zones.test.ts)
- Validación de formato PLZ
- Asignación correcta de zonas
- Tarifas base por zona
- Manejo de PLZ fuera de área

✅ **Catálogos de planes** (plans.test.ts)
- Estructura de planes KMU
- Estructura de planes Privat
- Precios y descuentos correctos
- Funciones de lookup

✅ **Catálogo de servicios** (services.test.ts)
- 17 servicios correctos
- IDs y slugs únicos
- Campos requeridos
- Flag remoteAvailable

## Criterios de Aceptación

- ✅ Cobertura > 85% de las líneas de código de pricing
- ✅ Todos los casos de cálculo validados
- ✅ Validaciones exhaustivas de inputs
- ✅ Sin errores de redondeo
