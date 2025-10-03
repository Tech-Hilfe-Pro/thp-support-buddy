export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: "NIS2" | "Windows" | "Cyber" | "Backup";
  excerpt: string;
  content: string;
};

export const POSTS: Post[] = [
  {
    slug: "nis2-kmu-primeros-90-dias",
    title: "NIS2: Primeros 90 días para KMU",
    date: "2025-10-04",
    tag: "NIS2",
    excerpt: "Qué pide NIS2 y por dónde empezar. Checklist accionable.",
    content: `
      <h2>Resumen</h2>
      <p>La directiva NIS2 impone nuevas obligaciones de ciberseguridad para empresas de sectores críticos. Este artículo explica los primeros pasos que debe dar tu KMU.</p>
      
      <h3>¿Qué es NIS2?</h3>
      <p>NIS2 (Network and Information Security Directive 2) es una directiva europea que establece medidas de ciberseguridad para proteger infraestructuras críticas.</p>
      
      <h3>Checklist de los primeros 90 días</h3>
      <ul>
        <li>Evaluar si tu empresa está dentro del alcance de NIS2</li>
        <li>Designar un responsable de seguridad de la información</li>
        <li>Realizar un análisis de riesgos inicial</li>
        <li>Implementar MFA en todos los accesos críticos</li>
        <li>Establecer un plan de respuesta a incidentes</li>
        <li>Documentar todas las medidas implementadas</li>
      </ul>
      
      <h3>Próximos pasos</h3>
      <p>Contáctanos para un Quick-Check NIS2 gratuito y descubre qué medidas necesita tu empresa específicamente.</p>
    `
  },
  {
    slug: "windows-11-25h2-prepare",
    title: "Windows 11 25H2: prepara tu despliegue",
    date: "2025-09-28",
    tag: "Windows",
    excerpt: "Anillos, pausas y dónde ver incidencias en vivo.",
    content: `
      <h2>Resumen</h2>
      <p>Windows 11 25H2 trae mejoras significativas pero también requiere una planificación cuidadosa del despliegue.</p>
      
      <h3>Novedades principales</h3>
      <ul>
        <li>Mejoras en el rendimiento del sistema</li>
        <li>Nuevas características de seguridad</li>
        <li>Optimizaciones para dispositivos táctiles</li>
        <li>Mejor integración con Microsoft 365</li>
      </ul>
      
      <h3>Estrategia de despliegue por anillos</h3>
      <p>Recomendamos un despliegue gradual:</p>
      <ol>
        <li>Anillo 1: Dispositivos de prueba (1-2 semanas)</li>
        <li>Anillo 2: Early adopters (2-4 semanas)</li>
        <li>Anillo 3: Despliegue general (4+ semanas)</li>
      </ol>
      
      <h3>Monitoreo de incidencias</h3>
      <p>Mantente informado a través de Windows Release Health Dashboard y nuestro servicio de monitoreo para KMU.</p>
    `
  },
  {
    slug: "ransomware-controles-clave-2025",
    title: "Ransomware 2025: controles que sí funcionan",
    date: "2025-09-20",
    tag: "Cyber",
    excerpt: "MFA, parches, EDR y backups probados. Nada de humo.",
    content: `
      <h2>Resumen</h2>
      <p>El ransomware sigue siendo una de las mayores amenazas para las empresas. Aquí están los controles que realmente funcionan en 2025.</p>
      
      <h3>Control 1: Autenticación multifactor (MFA)</h3>
      <p>El 99% de los ataques de ransomware se pueden prevenir con MFA. No es opcional, es esencial.</p>
      
      <h3>Control 2: Gestión de parches</h3>
      <p>Mantén todos los sistemas actualizados. Los atacantes explotan vulnerabilidades conocidas en sistemas sin parchear.</p>
      
      <h3>Control 3: EDR (Endpoint Detection and Response)</h3>
      <p>Las soluciones EDR detectan y responden a amenazas en tiempo real. No confíes solo en antivirus tradicional.</p>
      
      <h3>Control 4: Backups 3-2-1</h3>
      <ul>
        <li>3 copias de tus datos</li>
        <li>2 tipos de medios diferentes</li>
        <li>1 copia offsite</li>
      </ul>
      
      <h3>Control 5: Formación de usuarios</h3>
      <p>El eslabón más débil suele ser el humano. Invierte en formación regular de concienciación.</p>
    `
  }
];
