export type Card = {
  id: string;
  title: string;
  goal: string;
  steps: string[];
  criteria: string[];
  owner: string;
  due: string;
  blockers?: string[];
  monologue?: string;
  refs?: { label: string; url: string }[];
};

export type ColumnName = "Backlog" | "Now" | "Next" | "Done";

export type Column = {
  name: ColumnName;
  items: Card[];
};

export type Board = {
  columns: Column[];
};

export const ROADMAP: Board = {
  columns: [
    {
      name: "Now",
      items: [
        {
          id: "now-01",
          title: "Definir paquetes y SLA (Starter/Grow/Pro)",
          goal: "Paquetes publicados en /leistungen con SLA y exclusiones",
          steps: [
            "Escribir alcance por paquete: inventario, parches, AV/EDR, backup verificado, revisión mensual/trimestral",
            "SLA respuesta: Starter 8h, Grow 4h, Pro 2h; ventana soporte y tiempos de cola",
            "Exclusiones: proyectos, on-site fuera de zona, recuperación de desastres sin contrato, etc.",
          ],
          criteria: [
            "Página /leistungen actualizada",
            "Checklist de exclusiones visible en /agb",
            "Texto en DE claro, legible en móvil",
          ],
          owner: "JCM Lache",
          due: "2025-10-07",
          monologue: "Si no defines el 'no incluido', pagarás tú la fiesta.",
          refs: [
            {
              label: "Crecimiento MSP 2025 (+13%)",
              url: "https://omdia.tech.informa.com/insights/2025/canalys-msp-trends-and-predictions-2025",
            },
            {
              label: "MediaMarkt 79€/h domicilio",
              url: "https://faq.mediamarkt.de/app/answers/detail/a_id/18925/~/technikhilfe-f%C3%BCr-zuhause",
            },
          ],
        },
        {
          id: "now-02",
          title: "Pricing objetivo y mínimos mensuales",
          goal: "Actualizar precios y mínimos (≥ 249–399 €/mes) y fee de onboarding",
          steps: [
            "Fijar precio por endpoint según paquete",
            "Definir mínimo mensual por cliente (no por endpoint)",
            "Crear fee de onboarding con hoja de inventario inicial",
          ],
          criteria: [
            "Tabla de precios publicada",
            "Mínimos y onboarding visibles en /preise y /agb",
          ],
          owner: "JCM Lache",
          due: "2025-10-08",
          monologue: "No eres ONG. Si te tiembla el pulso, recuerda a MediaMarkt.",
          refs: [
            {
              label: "Benchmark retail domicilio",
              url: "https://faq.mediamarkt.de/app/answers/detail/a_id/18925/~/technikhilfe-f%C3%BCr-zuhause",
            },
          ],
        },
        {
          id: "now-03",
          title: "Flujo Stripe con SCA/3DS2",
          goal: "Pago con fricción mínima y SCA conforme",
          steps: [
            "Usar Payment Intents + 3DS2",
            "Probar exenciones y fallback a challenge",
            "Páginas éxito/cancelación y reintentos",
          ],
          criteria: ["Tasa de éxito ≥ 95% pruebas", "Sin rechazos por SCA en QA"],
          owner: "JCM Lache",
          due: "2025-10-10",
          refs: [
            {
              label: "Stripe 3DS2 guía",
              url: "https://stripe.com/guides/3d-secure-2",
            },
            {
              label: "3D Secure docs",
              url: "https://docs.stripe.com/payments/3d-secure",
            },
          ],
        },
        {
          id: "now-04",
          title: "Legal/DPA y registro de actividades",
          goal: "DPAs archivados (Cloudflare, NinjaOne) y registro actualizado",
          steps: [
            "Descargar y firmar DPA NinjaOne",
            "Guardar DPA Cloudflare",
            "Agregar transferencias SCC/DPF al registro",
          ],
          criteria: [
            "DPAs en carpeta /legal",
            "Registro con entradas de subprocesadores",
          ],
          owner: "JCM Lache",
          due: "2025-10-09",
          refs: [
            {
              label: "Cloudflare DPA",
              url: "https://www.cloudflare.com/cloudflare-customer-dpa/",
            },
            {
              label: "NinjaOne DPA",
              url: "https://www.ninjaone.com/data-processing-agreements/",
            },
          ],
        },
      ],
    },
    {
      name: "Next",
      items: [
        {
          id: "next-01",
          title: "Oferta 'NIS2-ready light'",
          goal: "Landing y checklist de elegibilidad publicadas",
          steps: [
            "Landing con resumen de obligaciones y límites del servicio",
            "Checklist de alcance y entregables (inventario, backups probados, reporte mensual)",
            "CTA diagnóstico gratuito (15–20 min)",
          ],
          criteria: ["Landing /nis2 con CTA", "Checklist descargable (PDF)"],
          owner: "JCM Lache",
          due: "2025-10-20",
          refs: [
            {
              label: "NIS2 en DE (30k empresas)",
              url: "https://www.deloitte.com/dl/en/services/legal/perspectives/umsetzung-nis2-richtlinie.html",
            },
            {
              label: "NIS2UmsuCG (estatus 30.07.2025)",
              url: "https://www.taylorwessing.com/en/insights-and-events/insights/2025/07/the-nis-2-implementation-act",
            },
          ],
        },
        {
          id: "next-02",
          title: "Paquete 'MID Digitale Sicherheit'",
          goal: "Oferta compatible con MID y playbook de solicitud",
          steps: [
            "Redactar alcance orientado a subvención",
            "Plantilla de presupuesto y cronograma",
            "Página /mid con requisitos y FAQ",
          ],
          criteria: ["Página /mid publicada", "PDF one-pager de propuesta"],
          owner: "JCM Lache",
          due: "2025-10-25",
          refs: [
            {
              label: "MID NRW (Ministerium)",
              url: "https://www.wirtschaft.nrw/mittelstand-innovativ-und-digital",
            },
            {
              label: "MID portal",
              url: "https://www.mittelstand-innovativ-digital.nrw/",
            },
          ],
        },
        {
          id: "next-03",
          title: "ORS desde servidor",
          goal: "Cálculo de rutas/tiempos sin exponer IP del cliente",
          steps: [
            "Crear endpoint /api/ors-proxy",
            "Purgar logs de IP a X días",
            "Actualizar Datenschutzerklärung",
          ],
          criteria: [
            "Llamadas ORS solo server-side",
            "Política de retención documentada",
          ],
          owner: "JCM Lache",
          due: "2025-10-18",
          refs: [
            {
              label: "Stripe SCA (contexto pagos)",
              url: "https://docs.stripe.com/payments/3d-secure",
            },
          ],
        },
      ],
    },
    {
      name: "Backlog",
      items: [
        {
          id: "backlog-01",
          title: "Prueba social Köln (10 reseñas/60 días)",
          goal: "10 reseñas verificadas",
          steps: [
            "Automatizar solicitud post-ticket",
            "Insertar testimonios locales en /home",
          ],
          criteria: ["10 reseñas publicadas"],
          owner: "JCM Lache",
          due: "2025-11-30",
        },
        {
          id: "backlog-02",
          title: "Analítica cookieless",
          goal: "Métricas sin banner",
          steps: [
            "Implementar analítica sin cookies ni fingerprinting",
            "Actualizar Datenschutz (Variante A)",
          ],
          criteria: ["Sin banner visible", "Tiempos y conversiones medidos"],
          owner: "JCM Lache",
          due: "2025-10-22",
        },
      ],
    },
    {
      name: "Done",
      items: [],
    },
  ],
};
