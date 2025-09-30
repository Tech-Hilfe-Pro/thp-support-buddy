import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wifi } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";

/**
 * Página "Leistungen" (Privat)
 * - Dos planes (cards): Haus-IT Start (9,90 €) y Haus-IT Plus (19,90 €)
 * - Accordion accesible (WCAG 2.1 AA) con 17 servicios (DE)
 * - Cada ítem → modal o enlace con H1, descriptionShort, badge "remote" con icono Wi-Fi
 * - Integración con GET /api/services
 */

interface Service {
  id: string;
  slug: string;
  nameDe: string;
  descriptionShort: string;
  remoteAvailable: boolean;
}

export default function LeistungenNeuPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar servicios del backend
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setServices(data.services || []);
      })
      .catch(err => {
        console.error('Error loading services:', err);
        setError('Fehler beim Laden der Services.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO 
        title="IT-Leistungen für Privatkunden | Tech Hilfe Pro"
        description="17 IT-Services für Zuhause: Computer, WLAN, Smart-Home, TV und mehr. Mit Abo-Rabatten."
        path="/leistungen"
        ogImage={`/og?title=${encodeURIComponent("IT-Leistungen")}&subtitle=${encodeURIComponent("Für Privatkunden")}`}
      />
      
      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            IT-Leistungen für Privatkunden
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Von PC-Einrichtung bis Smart-Home – wir helfen Ihnen schnell und unkompliziert. 
            Remote oder vor Ort in Köln, Neuss & Umgebung.
          </p>
        </header>

        {/* Planes Haus-IT */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Unsere Mitgliedschaften</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 border-border hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Haus-IT Start</CardTitle>
                <CardDescription>Für gelegentliche IT-Hilfe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary">9,90 €</div>
                  <div className="text-sm text-muted-foreground">pro Monat</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>15% Rabatt auf Vor-Ort-Services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Monatlich kündbar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Prioritäts-Support</span>
                  </li>
                </ul>
                <Link 
                  to="/abo" 
                  className="block w-full rounded-xl bg-primary text-primary-foreground px-4 py-3 text-center font-semibold hover:bg-primary/90 transition-colors"
                >
                  Jetzt wählen
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-lg relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cta text-white">
                Beliebt
              </Badge>
              <CardHeader>
                <CardTitle className="text-xl">Haus-IT Plus</CardTitle>
                <CardDescription>Für regelmäßige IT-Betreuung</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-primary">19,90 €</div>
                  <div className="text-sm text-muted-foreground">pro Monat</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>25% Rabatt auf Vor-Ort-Services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Monatlich kündbar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Premium-Support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Quartalscheck inklusive</span>
                  </li>
                </ul>
                <Link 
                  to="/abo" 
                  className="block w-full rounded-xl px-4 py-3 text-center font-semibold transition-colors"
                  style={{ background: 'hsl(var(--thp-cta))', color: 'white' }}
                >
                  Jetzt wählen
                </Link>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Monatlich kündbar. Preise ohne versteckte Kosten.
          </p>
        </section>

        {/* Accordion de 17 servicios */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Alle Services im Detail</h2>
          
          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Services werden geladen...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          )}
          
          {!loading && !error && services.length > 0 && (
            <Accordion type="single" collapsible className="space-y-2">
              {services.map((service) => (
                <AccordionItem 
                  key={service.id} 
                  value={service.id}
                  className="border rounded-xl px-4 bg-card"
                >
                  <AccordionTrigger 
                    className="hover:no-underline py-4"
                    aria-label={`Details zu ${service.nameDe}`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="font-semibold text-foreground">
                        {service.nameDe}
                      </span>
                      {service.remoteAvailable && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Wifi className="w-3 h-3" />
                          Remote
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-muted-foreground mb-4">
                      {service.descriptionShort}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link 
                        to={`/pakete-preise#rechner`}
                        className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Preis berechnen
                      </Link>
                      <Link 
                        to="/termin"
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
                      >
                        Termin buchen
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>

        {/* CTA final */}
        <section className="mt-16 text-center bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Noch Fragen? Wir beraten Sie gerne!
          </h2>
          <p className="text-muted-foreground mb-6">
            Kontaktieren Sie uns für eine unverbindliche Erstberatung.
          </p>
          <Link 
            to="/kontakt"
            className="inline-block rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'hsl(var(--thp-cta))' }}
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </section>
      </main>
    </>
  );
}
