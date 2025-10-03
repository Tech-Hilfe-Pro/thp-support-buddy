import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SEO from "@/components/SEO";
import { KMU_PLANS } from "@/data/pricingData";

/**
 * Página "KMU – Managed Services"
 * Lee exclusivamente de pricingData.ts - sin hardcodes
 */

export default function KMUPage() {
  return (
    <>
      <SEO 
        title="Managed IT-Services für KMU | Tech Hilfe Pro"
        description="Professionelle IT-Betreuung für kleine und mittelständische Unternehmen. RMM, Patches, Backup und SLA."
        path="/kmu"
        ogImage={`/og?title=${encodeURIComponent("KMU Managed Services")}&subtitle=${encodeURIComponent("IT-Partner für Unternehmen")}`}
      />
      
      <main id="main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Transparente Preise ohne Überraschungen
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Planbare IT-Kosten, proaktive Überwachung und schnelle Hilfe bei Problemen. 
            Wählen Sie den passenden Service‑Level für Ihr Unternehmen.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Für kleine & mittlere Unternehmen – planbare IT-Kosten.
          </p>
        </header>

        {/* Badges de descuentos */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Badge variant="outline" className="text-sm">
            –10% bei Vorauszahlung (12 Monate)
          </Badge>
          <Badge variant="outline" className="text-sm">
            –25% Vor-Ort-Rabatt mit aktivem Abo
          </Badge>
        </div>

        {/* 3 Cards con precios desde pricingData.ts */}
        <section className="grid md:grid-cols-3 gap-6 mb-16 items-stretch">
          {KMU_PLANS.map((plan, idx) => {
            const isPopular = idx === 1; // Standard como más popular
            return (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col rounded-2xl border transition-all duration-200 ${
                  isPopular 
                    ? 'border-[hsl(var(--thp-primary))] ring-2 ring-[hsl(var(--thp-primary))]' 
                    : 'border-[var(--thp-card-border)]'
                }`}
                style={{
                  boxShadow: 'var(--thp-shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  if (!isPopular) e.currentTarget.style.boxShadow = 'var(--thp-shadow-md)';
                }}
                onMouseLeave={(e) => {
                  if (!isPopular) e.currentTarget.style.boxShadow = 'var(--thp-shadow-sm)';
                }}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(var(--thp-cta))] text-white">
                    Beliebt
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-xs uppercase tracking-wide">
                    {plan.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col flex-1">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {plan.pricePerEndpoint.toFixed(2)} €
                    </div>
                    <div className="text-sm text-muted-foreground">
                      pro Endpoint/Monat
                    </div>
                    <Badge variant="outline" className="w-fit mt-2 text-xs">
                      Mindestumsatz: {plan.minMonthly} €/Monat
                    </Badge>
                  </div>
                  
                  <ul className="space-y-2 text-sm flex-1" style={{ lineHeight: '1.5' }}>
                    {plan.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/kontakt"
                    className={`block w-full rounded-xl px-4 py-3 text-center font-semibold transition-colors mt-auto ${
                      isPopular 
                        ? 'bg-[hsl(var(--thp-cta))] text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--thp-cta))] focus-visible:ring-offset-2' 
                        : 'bg-[hsl(var(--thp-primary))] text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--thp-primary))] focus-visible:ring-offset-2'
                    }`}
                  >
                    Plan wählen
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Tabla comparativa - sin "incluidas", solo features */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Vergleichen Sie unsere Service‑Level
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  {KMU_PLANS.map(p => (
                    <TableHead key={p.id} className="text-center">{p.subtitle}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">RMM (Monitoring)</TableCell>
                  {KMU_PLANS.map(p => (
                    <TableCell key={p.id} className="text-center">
                      {p.features.rmm ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : '–'}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Patch-Management</TableCell>
                  {KMU_PLANS.map(p => (
                    <TableCell key={p.id} className="text-center">
                      {p.features.patch ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : '–'}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Backup</TableCell>
                  {KMU_PLANS.map(p => (
                    <TableCell key={p.id} className="text-center capitalize">
                      {p.features.backup === 'none' ? '–' : p.features.backup}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Reporting</TableCell>
                  {KMU_PLANS.map(p => (
                    <TableCell key={p.id} className="text-center capitalize">
                      {p.features.reporting}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SLA Reaktionszeit</TableCell>
                  {KMU_PLANS.map(p => (
                    <TableCell key={p.id} className="text-center">
                      {p.features.sla}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vor-Ort-Service</TableCell>
                  {KMU_PLANS.map(p => (
                    <TableCell key={p.id} className="text-center text-xs">
                      {p.features.onsite}
                    </TableCell>
                  ))}
                </TableRow>
                {KMU_PLANS.some(p => p.features.consulting) && (
                  <TableRow>
                    <TableCell className="font-medium">Consulting</TableCell>
                    {KMU_PLANS.map(p => (
                      <TableCell key={p.id} className="text-center text-xs">
                        {p.features.consulting || '–'}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Bereit für planbare IT-Kosten?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein unverbindliches Angebot. 
            Wir analysieren Ihre IT-Infrastruktur und empfehlen den passenden Service‑Level.
          </p>
          <Link 
            to="/kontakt"
            className="inline-block rounded-xl bg-[hsl(var(--thp-cta))] px-6 py-3 font-semibold text-white transition-all hover:opacity-90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--thp-cta))] focus-visible:ring-offset-2"
          >
            Jetzt Beratung anfragen
          </Link>
        </section>
      </main>
    </>
  );
}
