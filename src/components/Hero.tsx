import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  // Servicios principales para el efecto typewriter (presentes en DOM para SEO)
  const services = [
    "PC-Reparatur vor Ort",
    "Netzwerk-Setup", 
    "Digitalisierung für KMU",
    "Smart-Home Installation"
  ];

  // Estados para el efecto typewriter
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Referencias para controlar los timeouts
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const pauseTimeoutRef = useRef<NodeJS.Timeout>();

  // Detectar preferencia de movimiento reducido
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Efecto cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Efecto typewriter principal
  useEffect(() => {
    // Si hay preferencia de movimiento reducido, mostrar solo el primer servicio
    if (reducedMotion) {
      setCurrentText(services[0]);
      setIsTyping(false);
      return;
    }

    const currentService = services[currentServiceIndex];

    if (isTyping) {
      // Fase de escritura: escribir letra por letra
      if (currentText.length < currentService.length) {
        typingTimeoutRef.current = setTimeout(() => {
          setCurrentText(currentService.slice(0, currentText.length + 1));
        }, 100); // Velocidad de escritura: 100ms por letra
      } else {
        // Texto completo escrito, pausar 2 segundos
        pauseTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Fase de borrado: borrar letra por letra
      if (currentText.length > 0) {
        typingTimeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50); // Velocidad de borrado: 50ms por letra (más rápido)
      } else {
        // Texto completamente borrado, pasar al siguiente servicio
        setCurrentServiceIndex((prev) => (prev + 1) % services.length);
        setIsTyping(true);
      }
    }

    // Limpiar timeouts al desmontar o cambiar dependencias
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [currentText, isTyping, currentServiceIndex, reducedMotion, services]);

  return (
    <section 
      id="hero" 
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: '#1e3a8a' }} // Navy blue background
    >
      {/* Patrón de fondo sutil para agregar textura sin distraer */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Título principal con texto dinámico - optimizado para SEO local */}
          <h1 className="text-white mb-6">
            <span className="block text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              IT-Service in Köln & Neuss
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mt-2">
              Ihr Partner für
            </span>
            {/* Contenedor del texto dinámico - responsive */}
            <span className="block mt-4 md:mt-6 min-h-[1.2em]">
              <span 
                className="text-2xl md:text-4xl lg:text-5xl font-bold"
                style={{ color: '#f97316' }} // Orange color para el texto dinámico
                aria-live="polite" // Accesibilidad: anuncia cambios a lectores de pantalla
              >
                {reducedMotion ? (
                  // Mostrar todos los servicios estáticamente si hay preferencia de movimiento reducido
                  services.join(" • ")
                ) : (
                  <>
                    {currentText}
                    <span 
                      className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                      aria-hidden="true" // El cursor es solo decorativo
                    >
                      |
                    </span>
                  </>
                )}
              </span>
            </span>
          </h1>

          {/* Servicios ocultos para SEO - solo visibles para lectores de pantalla */}
          <div className="sr-only">
            <p>Unsere Hauptleistungen:</p>
            <ul>
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Subtítulo estático */}
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            IT-Service in Köln & Neuss, für Privat und Firma
          </p>

          {/* Botón CTA prominente */}
          <div className="mb-12">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 text-lg md:text-xl font-bold text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: '#f97316' }} // Orange CTA button
            >
              Jetzt kontaktieren
            </Link>
          </div>

          {/* Características destacadas */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Vor-Ort & Remote Service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Faire Transparente Preise</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Schnelle Hilfe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Seniorenfreundlich</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente sutil en la parte inferior para transición suave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </section>
  );
}