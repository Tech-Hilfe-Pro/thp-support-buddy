import { Link } from "react-router-dom";
import { Clock, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const formatDuration = (minutes: number) => {
    if (minutes === 0) return "Laufend";
    if (minutes < 60) return `${minutes} Min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{service.titel}</CardTitle>
          {service.remote && (
            <Badge variant="secondary" className="ml-2 shrink-0">
              <Wifi className="w-3 h-3 mr-1" />
              Remote
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm">
          {service.kurz}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span>Typisch: {formatDuration(service.zeitMin)}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ab {service.preisAb}€
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-none">
        <Button asChild className="w-full" size="sm">
          <Link 
            to="/pakete-preise#rechner"
            aria-label={`Preis und Zeit für ${service.titel} berechnen`}
          >
            Preis & Zeit ansehen
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;