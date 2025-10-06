import { useEffect, useRef } from "react";
import { X, Wifi, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Service } from "@/data/services";
import { Link } from "react-router-dom";

interface ServiceDrawerProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDrawer({ service, isOpen, onClose }: ServiceDrawerProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Defer focus and DOM updates to avoid forced reflow
      requestAnimationFrame(() => {
        // Focus trap: foco al título al abrir
        titleRef.current?.focus();
        
        // Bloquear scroll del body
        document.body.classList.add("menu-open");
        
        // Aplicar inert al resto de la página
        const main = document.querySelector("main");
        if (main) main.setAttribute("inert", "true");
      });
    } else {
      // Restaurar al cerrar (también defer para evitar reflow)
      requestAnimationFrame(() => {
        document.body.classList.remove("menu-open");
        const main = document.querySelector("main");
        if (main) main.removeAttribute("inert");
      });
    }

    return () => {
      document.body.classList.remove("menu-open");
      const main = document.querySelector("main");
      if (main) main.removeAttribute("inert");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <aside
        className="bg-background w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header fijo */}
        <header className="flex items-start justify-between p-6 border-b bg-background sticky top-0 z-10">
          <div className="flex-1 pr-4">
            <h2
              id="drawer-title"
              ref={titleRef}
              tabIndex={-1}
              className="text-2xl font-bold mb-2 focus:outline-none"
            >
              {service.title}
            </h2>
            <div className="flex items-center gap-2">
              {service.remoteAvailable ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Wifi className="w-3 h-3" aria-hidden="true" />
                  Remote verfügbar
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  Nur vor Ort
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Drawer schließen"
            className="shrink-0 min-w-[44px] min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </header>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Benefit */}
          <p className="text-lg text-muted-foreground">{service.benefit}</p>

          {/* Descripción */}
          {service.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Über diesen Service</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          )}

          {/* Was wir machen */}
          {service.bullets && service.bullets.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Was wir machen</h3>
              <ul className="space-y-2" aria-label="Service-Leistungen">
                {service.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-foreground/90">
                    <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Beispiele */}
          {service.examples && service.examples.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Typische Beispiele</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {service.examples.map((ex, idx) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          {service.faq && service.faq.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Häufige Fragen</h3>
              <Accordion type="single" collapsible className="border rounded-lg">
                {service.faq.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="px-4 text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        {/* Footer fijo con CTAs */}
        <footer className="border-t p-6 bg-background sticky bottom-0">
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" size="lg" className="min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <Link to={`/preise#rechner?service=${service.slug}`}>
                Preis berechnen
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-cta hover:bg-cta/90 text-cta-foreground min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
              <Link to="/termin">
                Termin buchen
              </Link>
            </Button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
