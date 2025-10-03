import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

export default function NIS2() {
  return (
    <>
      <SEO 
        title="NIS2: Was KMU jetzt tun sollten – Tech Hilfe Pro"
        description="Marco, alcance y checklist de 10 pasos con evidencias mínimas. Remote & vor-Ort-Service für NIS2-Compliance."
        path="/nis2"
      />
      <main id="main" className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            NIS2: Was KMU jetzt tun sollten
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Marco, alcance y checklist de 10 pasos con evidencias mínimas. Remote & vor-Ort-Service.
          </p>

          <div className="mb-12 flex flex-wrap gap-3">
            <Link to="/termin" className="btn-cta">
              Quick-Check NIS2
            </Link>
            <a 
              href="https://wa.me/4915565029989" 
              className="btn-wa" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>¿Qué es NIS2?</h2>
            <p>
              La directiva NIS2 (Network and Information Security Directive 2) establece requisitos de ciberseguridad 
              para empresas de sectores esenciales e importantes en la Unión Europea.
            </p>

            <h2>¿Afecta a mi empresa?</h2>
            <p>
              NIS2 aplica a empresas medianas y grandes (50+ empleados o 10M€+ facturación) en sectores como:
            </p>
            <ul>
              <li>Energía y utilities</li>
              <li>Transporte</li>
              <li>Salud</li>
              <li>Infraestructura digital</li>
              <li>Gestión de residuos</li>
              <li>Servicios postales</li>
              <li>Y muchos más sectores críticos</li>
            </ul>

            <h2>Checklist de 10 pasos</h2>
            <ol>
              <li><strong>Evaluación de alcance:</strong> Determinar si tu empresa está sujeta a NIS2</li>
              <li><strong>Análisis de riesgos:</strong> Identificar y evaluar riesgos de ciberseguridad</li>
              <li><strong>Políticas de seguridad:</strong> Desarrollar y documentar políticas</li>
              <li><strong>Gestión de incidentes:</strong> Establecer procedimientos de respuesta</li>
              <li><strong>Continuidad de negocio:</strong> Planes de backup y recuperación</li>
              <li><strong>Seguridad en la cadena de suministro:</strong> Evaluar proveedores</li>
              <li><strong>Cifrado y control de acceso:</strong> Implementar MFA y encriptación</li>
              <li><strong>Gestión de vulnerabilidades:</strong> Patching y actualizaciones</li>
              <li><strong>Formación del personal:</strong> Concienciación en ciberseguridad</li>
              <li><strong>Reporting:</strong> Procedimientos de notificación de incidentes</li>
            </ol>

            <h2>Nuestro servicio NIS2</h2>
            <p>
              Ofrecemos asesoramiento completo para cumplir con NIS2, desde la evaluación inicial hasta 
              la implementación de medidas técnicas y organizativas.
            </p>
            <ul>
              <li>Quick-Check inicial gratuito</li>
              <li>Análisis de gap detallado</li>
              <li>Roadmap de implementación</li>
              <li>Soporte técnico continuo</li>
              <li>Documentación y evidencias</li>
            </ul>
          </div>

          <div className="mt-12 pt-6 border-t flex flex-wrap gap-3">
            <Link to="/termin" className="btn-cta">
              Quick-Check NIS2 buchen
            </Link>
            <Link to="/blog/nis2-kmu-primeros-90-dias" className="btn-wa">
              Más información →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
