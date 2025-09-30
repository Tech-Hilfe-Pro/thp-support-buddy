import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { track, bucketAmount } from "@/lib/analytics";
import { SERVICES } from "@/data/services";
import { calculateOnsiteTotal, CalcInput, Urgency } from "@/lib/pricing";
import { saveQuoteToStorage, Quote } from "@/lib/quote";
import { formatEUR } from "@/lib/format";

const PriceTimeCalculator = () => {
  const navigate = useNavigate();
  const [serviceId, setServiceId] = useState<string>("");
  const [plz, setPlz] = useState<string>("");
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const [subscription, setSubscription] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<{ service?: string; plz?: string }>({});

  // Track calculator opened
  useEffect(() => {
    track("calculator_opened");
  }, []);

  const handleCalculate = () => {
    const newErrors: { service?: string; plz?: string } = {};
    
    if (!serviceId) {
      newErrors.service = "Bitte wählen Sie einen Service aus";
    }
    
    if (!plz || plz.length !== 5 || !/^\d{5}$/.test(plz)) {
      newErrors.plz = "Bitte geben Sie eine gültige 5-stellige PLZ ein";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }
    
    setErrors({});
    
    const service = SERVICES.find(s => s.id === serviceId);
    const onsiteMinutes = service?.zeitMin || 60;
    
    const input: CalcInput = {
      serviceId,
      plz,
      urgency,
      subscription,
      onsiteMinutes
    };
    
    const calculation = calculateOnsiteTotal(input);
    setResult(calculation);
    
    if (calculation.inArea) {
      // Track successful calculation result
      track("calculator_result_shown", {
        serviceId,
        plzArea: "unknown", // Note: zone info not available in current calculation result
        subscription,
        urgency,
        minutes: onsiteMinutes,
        totalBucket: bucketAmount(calculation.total * 100)
      });
    }
  };

  const handleBookingRedirect = () => {
    if (result && result.inArea && selectedService) {
      const quote: Quote = {
        serviceId,
        serviceTitle: selectedService.titel,
        plz,
        urgency,
        subscription,
        onsiteMinutes: selectedService.zeitMin || 60,
        breakdown: result.breakdown,
        total: result.total,
        zeitfenster: result.zeitfenster,
        createdAtISO: new Date().toISOString()
      };
      
      saveQuoteToStorage(quote);
      navigate("/termin?from=rechner");
    }
  };

  const selectedService = SERVICES.find(s => s.id === serviceId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preis- & Zeit-Rechner</CardTitle>
          <CardDescription>
            Berechnen Sie in 60 Sekunden Ihren individuellen Vor-Ort-Preis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service">Service auswählen</Label>
            <Select value={serviceId} onValueChange={setServiceId}>
              <SelectTrigger id="service" aria-invalid={!!errors.service}>
                <SelectValue placeholder="Wählen Sie einen Service aus" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.filter(s => s.zielgruppe === "beide" || s.zielgruppe === "privat").map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.titel} ({service.zeitMin} Min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="text-sm text-destructive" role="alert">
                {errors.service}
              </p>
            )}
          </div>

          {/* PLZ Input */}
          <div className="space-y-2">
            <Label htmlFor="plz">Postleitzahl</Label>
            <Input
              id="plz"
              type="text"
              pattern="\d{5}"
              maxLength={5}
              placeholder="z.B. 50823"
              title="Fünfstellige PLZ"
              value={plz}
              onChange={(e) => setPlz(e.target.value.replace(/\D/g, '').slice(0, 5))}
              aria-invalid={!!errors.plz}
            />
            {errors.plz && (
              <p className="text-sm text-destructive" role="alert">
                {errors.plz}
              </p>
            )}
          </div>

          {/* Urgency Selection */}
          <div className="space-y-2">
            <Label htmlFor="urgency">Dringlichkeit</Label>
            <Select value={urgency} onValueChange={(value: Urgency) => setUrgency(value)}>
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal (Standardpreis)</SelectItem>
                <SelectItem value="heute">Heute (+15%)</SelectItem>
                <SelectItem value="jetzt">Sofort (+30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subscription Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscription"
              checked={subscription}
              onCheckedChange={(checked) => setSubscription(checked === true)}
            />
            <Label
              htmlFor="subscription"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ich habe eine aktive Mitgliedschaft (20% Rabatt auf Arbeitszeit)
            </Label>
          </div>

          {/* Calculate Button */}
          <Button onClick={handleCalculate} className="w-full" size="lg">
            Preis berechnen
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div aria-live="polite" role="status">
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>
                {result.inArea ? "Ihr Vor-Ort-Preis" : "Service-Anfrage"}
              </CardTitle>
              {selectedService && (
                <CardDescription>
                  {selectedService.titel} in PLZ {plz}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {result.inArea ? (
                <div className="space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Arbeitszeit {urgency !== "normal" && `(${urgency === "heute" ? "+15%" : "+30%"})`}</span>
                      <output>{formatEUR(result.breakdown.arbeitszeitBrutto)}</output>
                    </div>
                    {subscription && (
                      <div className="flex justify-between text-primary">
                        <span>Abo-Rabatt (20%)</span>
                        <output>–{formatEUR(result.breakdown.rabattAbo)}</output>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Anfahrt</span>
                      <output>{formatEUR(result.breakdown.anfahrt)}</output>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Gesamt</span>
                      <output>{formatEUR(result.total)}</output>
                    </div>
                  </div>

                  {/* Time Window */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Geschätztes Zeitfenster:</strong> {result.zeitfenster}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleBookingRedirect} className="flex-1">
                      Weiter zur Terminbuchung
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a href="/preise">Pakete vergleichen</a>
                    </Button>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-muted-foreground">
                    Hinweis: Preise inkl. Anfahrt gemäß PLZ. Ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">{result.message}</p>
                  <Button asChild className="w-full">
                    <a href="/termin">Unverbindliche Anfrage</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceTimeCalculator;