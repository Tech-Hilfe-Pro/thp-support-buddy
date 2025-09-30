# Tests - Tech Hilfe Pro

## Ejecutar tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con UI interactiva
npm run test:ui

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

## Estructura de tests

```
src/test/
├── setup.ts                          # Configuración global de tests
├── helpers.ts                        # Funciones helper para tests
├── unit/                             # Tests unitarios
│   ├── roundTo05.test.ts            # Tests de función de redondeo
│   ├── travelConfig.test.ts         # Tests de configuración
│   └── travelCostCalculation.test.ts # Tests de cálculos de coste
└── integration/                      # Tests de integración
    ├── travelQuoteAPI.test.ts       # Tests de API endpoint
    ├── useTravelQuote.test.ts       # Tests de hook React
    └── PriceAndTravelCard.test.tsx  # Tests de componente UI
```

## Cobertura

Los tests deben cumplir con los siguientes umbrales de cobertura:
- Lines: >= 85%
- Functions: >= 85%
- Branches: >= 85%
- Statements: >= 85%

## Tests unitarios

### roundTo05
- Redondeo a múltiplos de 0.5
- Casos extremos (valores pequeños, negativos)

### getTravelConfig
- Configuración por defecto
- Override con ENV variables
- Validación de valores inválidos
- Inmutabilidad del objeto resultante

### Cálculos de coste
- Zona gratuita (FREE_KM/FREE_MIN)
- Cálculo de fuel_cost
- Cálculo de wear_cost
- Cálculo de time_cost
- Aplicación de margen
- Configuración personalizada

## Tests de integración

### API /api/travel-quote
- Respuesta exitosa con datos válidos
- Manejo de zona gratuita
- Fallback Haversine cuando ORS falla
- Selección de base más cercana
- Validación de input
- Manejo de errores

### Hook useTravelQuote
- Inicialización con estado vacío
- Validación de PLZ
- Debounce de 300ms
- Cache de resultados (2 minutos)
- Generación de summary
- Manejo de errores
- Cancelación con AbortController
- Función refetch

### Componente PriceAndTravelCard
- Snapshot del estado inicial
- Snapshot con props por defecto
- Accesibilidad (aria-live, labels, aria-required)

## Ejecutar tests específicos

```bash
# Solo tests unitarios
npm test -- src/test/unit

# Solo tests de integración
npm test -- src/test/integration

# Test específico
npm test -- src/test/unit/roundTo05.test.ts
```

## Debugging tests

```bash
# Ejecutar con output detallado
npm test -- --reporter=verbose

# Ejecutar tests fallidos
npm test -- --run --reporter=verbose --bail
```
