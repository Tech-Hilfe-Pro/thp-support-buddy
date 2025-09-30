import { useEffect, useState } from "react";
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

/**
 * Página "KMU – Managed Services"
 * - 3 cards con precios fijos y mínimos:
 *   • Basic – 14,90 €/Endpoint/Monat — Mindestumsatz 99 €/Monat
 *   • Standard – 24,90 €/Endpoint/Monat — Mindestumsatz 179 €/Monat
 *   • Premium – 39,90 €/Endpoint/Monat — Mindestumsatz 299 €/Monat
 * - Tabla comparativa (RMM, Patches, Backup Basic, Reporting, SLA)
 * - Badges: "–10% Vorauszahlung", "–25% Vor-Ort mit aktivem Abo"
 * - CTA "Plan wählen" → POST /api/checkout (plan, qty endpoints)
 * - Integración con GET /api/plans-kmu
 */

interface KMUPlan {
  id: string;
  name: string;
  price: number;
  minMonthly: number;
  annualDiscount: number;
  onsiteDiscount: number;
}

export default function KMUPage() {
  const [plans, setPlans] = useState<KMUPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar planes KMU del backend
    fetch('/api/plans-kmu')
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setPlans(data.plans || []);
      })
      .catch(err => {
        console.error('Error loading KMU plans:', err);
        setError('Fehler beim Laden der Pläne.');
      })
      .finally(() => setLoading(false));
  }, []);

  const features = {
    'kmu-basic': {
      rmm: true,
      patches: true,
      backup: false,
      reporting: 'Monatlich',
      sla: '16h/Werktag',
      onsite: '1× pro Quartal'
    },
    'kmu-standard': {
      rmm: true,
      patches: true,
      backup: 'Basic',
      reporting: 'Wöchentlich',
      sla: '4h/Werktag',
      onsite: '1× pro Monat'
    },
    'kmu-premium': {
      rmm: true,
      patches: true,
      backup: 'Advanced',
      reporting: 'Täglich',
      sla: '1h/8h (24/7)',
      onsite: '2× pro Monat'
    }
  };

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
          <Badge className="mb-4 bg-primary text-primary-foreground">Für Unternehmen</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Managed IT-Services für KMU
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Planbare IT-Kosten, proaktive Überwachung und schnelle Hilfe bei Problemen. 
            Wählen Sie das passende Paket für Ihr Unternehmen.
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

        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Pläne werden geladen...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* 3 Cards con precios */}
        {!loading && !error && plans.length > 0 && (
          <>
            <section className="grid md:grid-cols-3 gap-6 mb-16">
              {plans.map((plan, idx) => {
                const isPopular = idx === 1; // Standard como más popular
                return (
                  <Card 
                    key={plan.id} 
                    className={`relative ${isPopular ? 'border-2 border-primary shadow-lg' : 'border border-border'}`}
                  >
                    {isPopular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cta text-white">
                        Beliebt
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription>
                        {idx === 0 && 'Für kleinere Teams'}
                        {idx === 1 && 'Für wachsende Unternehmen'}
                        {idx === 2 && 'Für anspruchsvolle IT-Anforderungen'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          {plan.price.toFixed(2)} €
                        </div>
                        <div className="text-sm text-muted-foreground">
                          pro Endpoint/Monat
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Mindestumsatz: {plan.minMonthly} €/Monat
                        </div>
                      </div>
                      
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Remote Monitoring & Management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Automatisches Patch-Management</span>
                        </li>
                        {features[plan.id as keyof typeof features].backup && (
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Backup {features[plan.id as keyof typeof features].backup}</span>
                          </li>
                        )}
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>
                            Reporting {features[plan.id as keyof typeof features].reporting}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>SLA: {features[plan.id as keyof typeof features].sla}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>
                            Vor-Ort: {features[plan.id as keyof typeof features].onsite}
                          </span>
                        </li>
                      </ul>
                      
                      <Link 
                        to="/kontakt"
                        className={`block w-full rounded-xl px-4 py-3 text-center font-semibold transition-colors ${
                          isPopular 
                            ? 'text-white hover:opacity-90' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                        style={isPopular ? { background: 'hsl(var(--thp-cta))' } : {}}
                      >
                        Plan wählen
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </section>

            {/* Tabla comparativa */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Vergleichen Sie unsere KMU-Pakete
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead className="text-center">Basic</TableHead>
                      <TableHead className="text-center">Standard</TableHead>
                      <TableHead className="text-center">Premium</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">RMM (Monitoring)</TableCell>
                      <TableCell className="text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Patch-Management</TableCell>
                      <TableCell className="text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Backup</TableCell>
                      <TableCell className="text-center">–</TableCell>
                      <TableCell className="text-center">Basic</TableCell>
                      <TableCell className="text-center">Advanced</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Reporting</TableCell>
                      <TableCell className="text-center">Monatlich</TableCell>
                      <TableCell className="text-center">Wöchentlich</TableCell>
                      <TableCell className="text-center">Täglich</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SLA Reaktionszeit</TableCell>
                      <TableCell className="text-center">16h/Werktag</TableCell>
                      <TableCell className="text-center">4h/Werktag</TableCell>
                      <TableCell className="text-center">1h/8h (24/7)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Vor-Ort-Service</TableCell>
                      <TableCell className="text-center">1× pro Quartal</TableCell>
                      <TableCell className="text-center">1× pro Monat</TableCell>
                      <TableCell className="text-center">2× pro Monat</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>
          </>
        )}

        {/* CTA final */}
        <section className="text-center bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Bereit für planbare IT-Kosten?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein unverbindliches Angebot. 
            Wir analysieren Ihre IT-Infrastruktur und empfehlen das passende Paket.
          </p>
          <Link 
            to="/kontakt"
            className="inline-block rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'hsl(var(--thp-cta))' }}
          >
            Jetzt Beratung anfragen
          </Link>
        </section>
      </main>
    </>
  );
}
