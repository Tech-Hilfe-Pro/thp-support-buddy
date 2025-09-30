import { useParams, useSearchParams, Link, useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";
import { SERVICE_DETAILS } from "@/data/serviceDetails";
import { PriceAndTravelCard } from "@/components/PriceAndTravelCard";
import { generateFAQSchema } from "@/lib/localSEO";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const plz = searchParams.get("plz") || undefined;

  // Buscar servicio por slug (mapeo simple)
  const service = SERVICES.find((s) => s.id === slug);
  const details = slug ? SERVICE_DETAILS[slug] : undefined;

  if (!service || !details) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Alert variant="destructive">
          <AlertDescription>
            Service nicht gefunden. <Link to="/leistungen" className="underline">Zurück zu allen Leistungen</Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Generar FAQ schema (mapear question/answer a q/a)
  const faqSchema = generateFAQSchema(
    details.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))
  );

  return (
    <>
      <SEO
        title={`${service.titel} – Tech Hilfe Pro Köln & Neuss`}
        description={`${service.kurz} Professioneller IT-Service in Köln und Neuss. ${service.remote ? "Remote oder vor Ort." : "Vor-Ort-Service."} Ab ${service.preisAb}€.`}
        path={location.pathname}
        keywords={`${service.titel}, IT-Service Köln, IT-Service Neuss, ${service.remote ? "Remote Support" : "Vor-Ort-Service"}`}
        structuredData={faqSchema}
      />

      <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Breadcrumb / Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/leistungen" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zurück zu allen Leistungen
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {service.titel}
          </h1>
          <p className="text-lg text-muted-foreground">
            {service.kurz}
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <span className="font-medium">Ab {service.preisAb}€</span>
            </div>
            {service.remote && (
              <div className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-accent-foreground">
                Remote möglich
              </div>
            )}
            <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-muted-foreground">
              {service.zielgruppe === "beide" ? "Privat & KMU" : service.zielgruppe === "privat" ? "Privatkunden" : "KMU"}
            </div>
          </div>
        </div>

        {/* Tip Box */}
        <Alert className="mb-8 border-primary/20 bg-primary/5">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertDescription className="text-sm sm:text-base">
            {details.tip}
          </AlertDescription>
        </Alert>

        {/* Price & Travel Calculator */}
        <div id="preis-anfahrt" className="mb-12 scroll-mt-20">
          <PriceAndTravelCard
            serviceSlug={service.id}
            defaultPLZ={plz}
            defaultHours={service.zeitMin > 0 ? service.zeitMin / 60 : 1}
          />
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Häufig gestellte Fragen
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {details.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Footer */}
        <div className="rounded-lg border bg-muted/30 p-6 text-center">
          <h3 className="mb-3 text-xl font-semibold">
            Noch Fragen zu {service.titel}?
          </h3>
          <p className="mb-4 text-muted-foreground">
            Wir beraten Sie gerne persönlich und erstellen ein individuelles Angebot.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link to="/kontakt">
                Jetzt Kontakt aufnehmen
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/termin">
                Termin vereinbaren
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
