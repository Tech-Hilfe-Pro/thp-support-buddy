import { Link } from "react-router-dom";
import { Clock, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const formatDuration = (minutes: number) => {
    if (minutes === 0) return "Laufend";
    if (minutes < 60) return `${minutes} Min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <article className="rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold leading-snug line-clamp-2">{service.titel}</h3>
          {service.remote && (
            <Badge variant="secondary" className="ml-2 shrink-0">
              <Wifi className="w-3 h-3 mr-1" />
              Remote
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">{service.kurz}</p>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center text-slate-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Typisch: {formatDuration(service.zeitMin)}</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              ab {service.preisAb}€
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button asChild className="w-full" size="sm">
            <Link 
              to="/preise#rechner"
              aria-label={`Preis und Zeit für ${service.titel} berechnen`}
            >
              Preis & Zeit ansehen
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}