import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";
import { Button } from "@/components/ui/button";

export default function ServicesGridLimited() {
  // Show only first 6 services
  const limitedServices = SERVICES.slice(0, 6);

  return (
    <section id="leistungen" className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <h2 className="text-2xl font-bold text-center text-foreground mb-8">
          Unsere Leistungen
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {limitedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/leistungen">
              Alle Leistungen ansehen
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}