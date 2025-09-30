import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Wifi, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServiceBySlug } from "@/data/servicesData";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : null;

  if (!service) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <SEO 
          title="Service nicht gefunden | Tech Hilfe Pro"
          description="Der gesuchte Service wurde nicht gefunden."
          path={`/service/${slug}`}
        />
        <h1 className="text-3xl font-bold mb-4">Service nicht gefunden</h1>
        <p className="text-muted-foreground mb-8">
          Der Service "{slug}" existiert nicht oder wurde entfernt.
        </p>
        <Button asChild>
          <Link to="/leistungen">Zurück zu allen Leistungen</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <SEO 
        title={`${service.nameDe} | Tech Hilfe Pro`}
        description={service.descriptionShort}
        path={`/service/${service.slug}`}
      />

      <Link 
        to="/leistungen" 
        className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zu allen Leistungen
      </Link>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{service.nameDe}</h1>
            {service.remoteAvailable && (
              <Badge variant="secondary" className="gap-1">
                <Wifi className="w-3 h-3" />
                Remote möglich
              </Badge>
            )}
            {!service.remoteAvailable && (
              <Badge variant="outline" className="gap-1">
                <MapPin className="w-3 h-3" />
                Nur Vor-Ort
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">{service.descriptionShort}</p>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Was wir für Sie tun</h2>
          <p className="text-muted-foreground">
            Unsere erfahrenen Techniker helfen Ihnen bei allen Fragen rund um {service.nameDe.toLowerCase()}. 
            {service.remoteAvailable 
              ? ' Dieser Service kann oft bequem remote durchgeführt werden – Sie müssen nicht einmal zu Hause sein.'
              : ' Für diesen Service kommen wir gerne zu Ihnen nach Hause oder ins Büro.'
            }
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="flex-1">
            <Link to="/kontakt">Jetzt Kontakt aufnehmen</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex-1">
            <Link to="/preise">Preise ansehen</Link>
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            💡 Tipp
          </h3>
          <p className="text-sm text-muted-foreground">
            Mit einem unserer monatlichen Haus-IT-Pakete sparen Sie bis zu 25% auf Vor-Ort-Einsätze. 
            <Link to="/preise" className="text-primary hover:underline ml-1">
              Mehr erfahren →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
