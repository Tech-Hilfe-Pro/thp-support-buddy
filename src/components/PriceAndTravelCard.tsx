import { useState, useCallback } from "react";
import { useTravelQuote } from "@/hooks/useTravelQuote";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MapPin, Clock, Euro, Info, AlertCircle, Calendar, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PriceAndTravelCardProps {
  serviceSlug: string;
  defaultPLZ?: string;
  defaultHours?: number;
  subscriptionTier?: "A" | "B" | null;
  onRequestAppointment?: (data: { plz: string; summary: string }) => void;
  onAddToCart?: (data: { serviceSlug: string; plz: string; hours: number; travelFee: number }) => void;
}

type AboTier = "none" | "A" | "B";

const ABO_LABELS: Record<AboTier, string> = {
  none: "Keine",
  A: "Abo A (−15% auf Arbeitszeit)",
  B: "Abo B (−25% auf Arbeitszeit)",
};

const ABO_TO_TIER: Record<AboTier, "A" | "B" | null> = {
  none: null,
  A: "A",
  B: "B",
};

export function PriceAndTravelCard({
  serviceSlug,
  defaultPLZ = "",
  defaultHours = 1,
  subscriptionTier = null,
  onRequestAppointment,
  onAddToCart,
}: PriceAndTravelCardProps) {
  const { toast } = useToast();
  
  // Estado local
  const [plz, setPlz] = useState(defaultPLZ);
  const [hours, setHours] = useState(defaultHours);
  const [aboTier, setAboTier] = useState<AboTier>(
    subscriptionTier === "A" ? "A" : subscriptionTier === "B" ? "B" : "none"
  );
  const [hasCalculated, setHasCalculated] = useState(false);

  // Hook de travel quote con auto-cálculo
  const { data, loading, error } = useTravelQuote({
    plz,
    service: serviceSlug,
    hours,
    subscriptionTier: ABO_TO_TIER[aboTier],
  });

  // Handler de PLZ con máscara (solo números, max 5)
  const handlePLZChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setPlz(value);
    if (value.length === 5) {
      setHasCalculated(true);
    }
  }, []);

  // Handler de horas
  const handleHoursChange = useCallback((value: number[]) => {
    setHours(value[0]);
    if (plz.length === 5) {
      setHasCalculated(true);
    }
  }, [plz]);

  // Handler de Abo
  const handleAboChange = useCallback((value: AboTier) => {
    setAboTier(value);
  }, []);

  // Handler de Termin anfragen
  const handleRequestAppointment = useCallback(() => {
    if (!data) {
      toast({
        title: "Bitte zuerst berechnen",
        description: "Geben Sie eine PLZ ein, um die Anfahrt zu berechnen.",
        variant: "destructive",
      });
      return;
    }

    if (onRequestAppointment) {
      onRequestAppointment({ plz, summary: data.summary });
    } else {
      // Fallback: abrir formulario de contacto (implementar según tu flujo)
      toast({
        title: "Termin anfragen",
        description: `PLZ: ${plz}, Anfahrt: ${data.travel_fee}€`,
      });
    }
  }, [data, plz, onRequestAppointment, toast]);

  // Handler de Warenkorb
  const handleAddToCart = useCallback(() => {
    if (!data) {
      toast({
        title: "Bitte zuerst berechnen",
        description: "Geben Sie eine PLZ ein, um die Anfahrt zu berechnen.",
        variant: "destructive",
      });
      return;
    }

    if (onAddToCart) {
      onAddToCart({ serviceSlug, plz, hours, travelFee: data.travel_fee });
    } else {
      toast({
        title: "Zum Warenkorb",
        description: `Service hinzugefügt: ${data.travel_fee}€ Anfahrt`,
      });
    }
  }, [data, serviceSlug, plz, hours, onAddToCart, toast]);

  const isPLZValid = plz.length === 5;
  const showResults = hasCalculated && isPLZValid && !loading && !error && data;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Preis & Anfahrt berechnen
        </CardTitle>
        <CardDescription>
          Geben Sie Ihre Postleitzahl ein, um die Anfahrtskosten zu ermitteln.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* PLZ Input */}
        <div className="space-y-2">
          <Label htmlFor="plz-input" className="text-sm font-medium">
            Postleitzahl (PLZ)
          </Label>
          <Input
            id="plz-input"
            type="text"
            inputMode="numeric"
            placeholder="z.B. 50823"
            value={plz}
            onChange={handlePLZChange}
            maxLength={5}
            className="text-lg"
            aria-required="true"
            aria-invalid={plz.length > 0 && !isPLZValid}
            aria-describedby="plz-hint"
          />
          <p id="plz-hint" className="text-xs text-muted-foreground">
            5-stellige deutsche Postleitzahl
          </p>
        </div>

        {/* Stunden Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="hours-slider" className="text-sm font-medium">
              Geschätzte Einsatzzeit
            </Label>
            <span className="text-sm font-semibold text-primary" aria-live="polite">
              {hours}h
            </span>
          </div>
          <Slider
            id="hours-slider"
            min={0.5}
            max={8}
            step={0.5}
            value={[hours]}
            onValueChange={handleHoursChange}
            className="w-full"
            aria-label="Stunden auswählen"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0,5h</span>
            <span>8h</span>
          </div>
        </div>

        {/* Abo Selector */}
        <div className="space-y-2">
          <Label htmlFor="abo-select" className="text-sm font-medium">
            Abo vorhanden?
          </Label>
          <Select value={aboTier} onValueChange={handleAboChange}>
            <SelectTrigger id="abo-select" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(ABO_LABELS) as AboTier[]).map((tier) => (
                <SelectItem key={tier} value={tier}>
                  {ABO_LABELS[tier]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Hinweis: Rabatt gilt nur für Arbeitszeit, nicht für Anfahrt.
          </p>
        </div>

        {/* Loading State */}
        {loading && isPLZValid && (
          <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground" role="status">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Anfahrt wird berechnet...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Panel */}
        {showResults && (
          <div
            className="space-y-4 rounded-lg border bg-muted/50 p-4"
            role="region"
            aria-live="polite"
            aria-label="Berechnungsergebnis"
          >
            {/* Fallback Warning */}
            {data.fallback && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Geschätzte Anfahrt (offline-Berechnung)
                </AlertDescription>
              </Alert>
            )}

            {/* Summary */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Zusammenfassung</h3>
              <p className="text-sm text-muted-foreground">{data.summary}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Distanz (Hin + Rück)</p>
                  <p className="text-sm font-medium">{data.km_total} km</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Fahrzeit (Hin + Rück)</p>
                  <p className="text-sm font-medium">{data.min_total} min</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Anfahrtskosten</p>
                  <p className="text-lg font-bold text-primary">{data.travel_fee.toFixed(2)} €</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Basis</p>
                  <p className="text-sm font-medium">{data.originBase}</p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            {data.breakdown && (
              <details className="text-sm">
                <summary className="cursor-pointer font-medium hover:text-primary">
                  Kostenaufschlüsselung anzeigen
                </summary>
                <div className="mt-2 space-y-1 pl-4 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Kraftstoff:</span>
                    <span>{data.breakdown.fuel_cost.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verschleiß:</span>
                    <span>{data.breakdown.wear_cost.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fahrzeit:</span>
                    <span>{data.breakdown.time_cost.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marge:</span>
                    <span>{data.breakdown.margen.toFixed(2)} €</span>
                  </div>
                </div>
              </details>
            )}

            {/* Políticas */}
            <div className="space-y-1 border-t pt-3 text-xs text-muted-foreground">
              <p className="flex items-start gap-1">
                <Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
                <span>Anfahrt frei bis 5 km oder 15 Min.</span>
              </p>
              <p className="flex items-start gap-1">
                <Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
                <span>Deckelung: max. 30% des Auftrags</span>
              </p>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        {showResults && (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleRequestAppointment}
              className="flex-1"
              variant="default"
              size="lg"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Termin anfragen
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              variant="outline"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Zum Warenkorb
            </Button>
          </div>
        )}

        {/* Initial State Message */}
        {!hasCalculated && !loading && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Geben Sie eine PLZ ein, um automatisch die Anfahrtskosten zu berechnen.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
