import { Link } from "react-router-dom";
import { Wifi, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  highlighted?: boolean;
  onDetails: () => void;
}

export default function ServiceCard({ service, highlighted = false, onDetails }: ServiceCardProps) {
  return (
    <article
      className={`
        rounded-2xl border bg-card shadow-sm overflow-hidden flex flex-col h-full 
        transition-all duration-200 hover:shadow-lg
        ${highlighted ? 'ring-2 ring-primary ring-offset-2' : ''}
      `}
      aria-label={`Service: ${service.title}`}
    >
      <div className="p-5 flex-1 flex flex-col space-y-4">
        {/* Header mit Badge */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug flex-1">
            {service.title}
          </h3>
          {service.remoteAvailable ? (
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0"
              aria-label="Remote verfügbar"
            >
              <Wifi className="w-3 h-3" aria-hidden="true" />
              Remote
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium shrink-0"
              aria-label="Nur vor Ort"
            >
              <MapPin className="w-3 h-3" aria-hidden="true" />
              Vor-Ort
            </span>
          )}
        </div>

        {/* Benefit */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.benefit}
        </p>

        {/* Bullets */}
        {service.bullets && service.bullets.length > 0 && (
          <ul className="space-y-1.5 text-sm text-foreground/80" aria-label="Service-Leistungen">
            {service.bullets.slice(0, 4).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" variant="outline">
              <Link
                to={`/preise#rechner?service=${service.slug}`}
                aria-label={`Preis berechnen für ${service.title}`}
              >
                Preis in 60s
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-cta hover:bg-cta/90 text-cta-foreground">
              <Link
                to="/termin"
                aria-label={`Termin buchen für ${service.title}`}
              >
                Termin buchen
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDetails}
            className="w-full text-primary hover:text-primary/80"
            aria-label={`Details anzeigen für ${service.title}`}
          >
            Details & FAQ →
          </Button>
        </div>
      </div>
    </article>
  );
}
