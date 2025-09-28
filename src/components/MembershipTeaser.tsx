import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MembershipTeaser() {
  return (
    <section id="mitgliedschaft-teaser" className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Mitgliedschaft</h2>
              <p className="text-muted-foreground">
                Planbare IT-Unterstützung. Mitglieder sparen 20 % auf Arbeitszeit vor Ort.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                  Remote zuerst
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                  20% Rabatt vor Ort
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                  SLA verfügbar
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link to="/abo">
                  Mitglied werden
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}