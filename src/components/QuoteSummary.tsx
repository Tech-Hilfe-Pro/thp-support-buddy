import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { readQuoteFromStorage } from "@/lib/quote";
import { useEffect, useState } from "react";
import { formatEUR } from "@/lib/format";

const QuoteSummary = () => {
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    const storedQuote = readQuoteFromStorage();
    setQuote(storedQuote);
  }, []);

  if (!quote) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preisberechnung</CardTitle>
          <CardDescription>
            Noch keine Berechnung vorhanden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Nutzen Sie unseren Rechner für eine individuelle Preisberechnung.
          </p>
          <Button asChild variant="outline" className="w-full">
            <a href="/preise#rechner">Zum Preis-Rechner</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ihre Preisberechnung</CardTitle>
        <CardDescription>
          {quote.serviceTitle} in PLZ {quote.plz}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Arbeitszeit {quote.urgency !== "normal" && `(${quote.urgency === "heute" ? "+15%" : "+30%"})`}</span>
            <span>{formatEUR(quote.breakdown.arbeitszeitBrutto)}</span>
          </div>
          {quote.subscription && (
            <div className="flex justify-between text-primary">
              <span>Abo-Rabatt (20%)</span>
              <span>–{formatEUR(quote.breakdown.rabattAbo)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Anfahrt</span>
            <span>{formatEUR(quote.breakdown.anfahrt)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Gesamt</span>
            <span>{formatEUR(quote.total)}</span>
          </div>
        </div>

        {/* Time Window */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm">
            <strong>Geschätztes Zeitfenster:</strong> {quote.zeitfenster}
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground">
          Hinweis: Endpreis abhängig von tatsächlicher Dauer; Mindestzeit Vor-Ort 45 Min.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuoteSummary;