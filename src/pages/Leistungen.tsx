import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Wifi, MapPin } from "lucide-react";
import { SERVICES_DATA } from "@/data/servicesData";

export default function Leistungen() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = SERVICES_DATA.filter(s => {
    if (!searchTerm.trim()) return true;
    const lwr = searchTerm.toLowerCase();
    return s.nameDe.toLowerCase().includes(lwr) || s.descriptionShort.toLowerCase().includes(lwr);
  });

  return (
    <>
      <SEO
        title="IT-Leistungen für Privatkunden | Tech Hilfe Pro"
        description="Umfassende IT-Services: Computer-Reparatur, WLAN-Setup, Smart-Home, Drucker, und mehr. Remote oder vor Ort in Köln & Neuss."
        path="/leistungen"
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Unsere Leistungen</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von Computer-Reparatur bis Smart-Home – wir sind für Sie da.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="search"
            placeholder="Service suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filtered.length > 0 ? (
          <Accordion type="multiple" className="max-w-4xl mx-auto mb-12">
            {filtered.map((srv) => (
              <AccordionItem key={srv.id} value={srv.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="font-semibold">{srv.nameDe}</span>
                    {srv.remoteAvailable ? (
                      <Badge variant="secondary" className="gap-1">
                        <Wifi className="w-3 h-3" />
                        Remote
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        Vor-Ort
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">{srv.descriptionShort}</p>
                  <Button asChild size="sm">
                    <Link to={`/service/${srv.slug}`}>Details ansehen</Link>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Keine Services gefunden.</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Filter zurücksetzen
            </Button>
          </div>
        )}

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">Bereit anzufangen?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/preise">Preise ansehen</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
