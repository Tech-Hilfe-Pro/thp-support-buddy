import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SEO from "@/components/SEO";
import { toast } from "@/hooks/use-toast";
import { track, bucketAmount } from "@/lib/analytics";
import { TechnicianInput, calcTechnicianTotal, Urgency } from "@/lib/pricing";
import { SERVICES } from "@/data/services";
import { SEO_PAGES } from "@/data/seo";
import { COPY } from "@/data/copy";
import { formatEUR } from "@/lib/format";

const meta = { title: "Intern – Bitte nicht indexieren", description: "", path: typeof location !== "undefined" ? location.pathname : "/" };

const Techniker = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const meta = SEO_PAGES.techniker;

  const [formData, setFormData] = useState<TechnicianInput>({
    serviceTitle: "",
    plz: "",
    minutesWorked: 45, // Minimum 45 minutes
    urgency: "normal",
    subscription: false,
  });

  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [calculation, setCalculation] = useState<any>(null);
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const techOk = sessionStorage.getItem("thp_tech_ok");
    if (techOk === "1") {
      setIsAuthenticated(true);
      // Track technician quick charge started
      track("tech_quickcharge_started");
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_TECH_PIN || "2468";
    
    if (pinInput === correctPin) {
      sessionStorage.setItem("thp_tech_ok", "1");
      setIsAuthenticated(true);
      setPinError("");
      // Track technician quick charge started
      track("tech_quickcharge_started");
    } else {
      setPinError("Ungültiger PIN. Bitte versuchen Sie es erneut.");
      setPinInput("");
    }
  };

  const validateForm = () => {
    if (!formData.serviceTitle.trim()) {
      toast({ title: "Service fehlt", description: "Bitte Service eingeben.", variant: "destructive" });
      return false;
    }
    if (!formData.plz || formData.plz.length !== 5) {
      toast({ title: "PLZ fehlt", description: "Bitte gültige PLZ eingeben.", variant: "destructive" });
      return false;
    }
    if (formData.minutesWorked < 45) {
      toast({ title: "Mindestzeit", description: "Mindestens 45 Minuten erforderlich.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const calculateTotal = () => {
    if (!validateForm()) return;

    const result = calcTechnicianTotal(formData);
    
    if (!result.inArea) {
      toast({ 
        title: "Außerhalb des Einsatzgebiets", 
        description: result.message, 
        variant: "destructive" 
      });
      return;
    }

    setCalculation(result);
    toast({ title: "Berechnung erfolgreich", description: `Gesamt: ${formatEUR(result.total)}` });
  };

  const handleCreateCheckoutSession = async () => {
    if (!calculation) {
      toast({ title: "Keine Berechnung", description: "Bitte zuerst berechnen.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents: Math.round(calculation.total * 100),
          description: `Tech Hilfe Pro - ${formData.serviceTitle}`,
          customerEmail: customerEmail || undefined,
          successUrl: `${window.location.origin}/termin/bestaetigt`,
          cancelUrl: `${window.location.origin}/techniker`
        }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Erstellen der Checkout-Session");
      }

      const data = await response.json();
      setCheckoutUrl(data.url);
      
      // Track checkout link created
      track("tech_checkoutlink_created", {
        amountBucket: bucketAmount(calculation.total * 100)
      });
      
      toast({ 
        title: "Checkout-Link erstellt", 
        description: "Link für Kunden-Gerät bereit." 
      });
    } catch (error) {
      toast({ 
        title: "Fehler", 
        description: "Checkout-Session konnte nicht erstellt werden.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInAppCheckout = () => {
    if (!calculation) {
      toast({ title: "Keine Berechnung", description: "Bitte zuerst berechnen.", variant: "destructive" });
      return;
    }

    // Create a quote object for the in-app checkout
    const quote = {
      serviceId: "custom",
      serviceTitle: formData.serviceTitle,
      plz: formData.plz,
      urgency: formData.urgency,
      subscription: formData.subscription,
      appointmentType: "onsite" as const,
      breakdown: calculation.breakdown,
      total: calculation.total,
      timestamp: Date.now()
    };

    // Store in localStorage for the checkout page
    localStorage.setItem("thp_quote", JSON.stringify(quote));
    
    // Navigate to checkout
    window.location.href = "/kasse?mode=one_time";
  };

  const copyCheckoutLink = () => {
    if (checkoutUrl) {
      navigator.clipboard.writeText(checkoutUrl);
      toast({ title: "Link kopiert", description: "Checkout-Link in Zwischenablage kopiert." });
    }
  };

  const openCheckoutLink = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  const updateFormData = (field: keyof TechnicianInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEO title={meta.title} description={meta.description} path={meta.path} robots="noindex,nofollow" />
        <div className="container mx-auto max-w-md py-20">
          <Card>
            <CardHeader>
              <CardTitle>{COPY.technician.pinTitle}</CardTitle>
              <CardDescription>PIN-geschützter Bereich für Vor-Ort-Einsätze</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="pin">PIN eingeben</Label>
                  <Input
                    id="pin"
                    type="password"
                    placeholder="PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="text-center"
                  />
                  {pinError && (
                    <p className="text-sm text-destructive mt-2">{pinError}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Anmelden
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} robots="noindex,nofollow" />
      <div className="container mx-auto max-w-4xl py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{COPY.technician.title}</h1>
          <p className="text-lg text-muted-foreground">
            Quick Charge für Vor-Ort-Einsätze mit Checkout-Optionen
          </p>
        </div>

        <div className="grid gap-8">
          {/* Quick Charge Form */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.technician.quickCharge}</CardTitle>
              <CardDescription>
                Berechnen Sie den Endbetrag basierend auf der tatsächlichen Arbeitszeit vor Ort
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service">Service/Leistung</Label>
                  <Select 
                    value={formData.serviceTitle} 
                    onValueChange={(value) => updateFormData('serviceTitle', value)}
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Service wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.titel}>
                          {service.titel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="plz">PLZ</Label>
                  <Input
                    id="plz"
                    type="text"
                    placeholder="50xxx"
                    maxLength={5}
                    value={formData.plz}
                    onChange={(e) => updateFormData('plz', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minutes">Tatsächliche Minuten vor Ort</Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="45"
                    step="15"
                    value={formData.minutesWorked}
                    onChange={(e) => updateFormData('minutesWorked', parseInt(e.target.value) || 45)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Mindestens 45 Min, wird auf 15-Min-Blöcke aufgerundet
                  </p>
                </div>

                <div>
                  <Label htmlFor="urgency">Dringlichkeit</Label>
                  <Select 
                    value={formData.urgency} 
                    onValueChange={(value: Urgency) => updateFormData('urgency', value)}
                  >
                    <SelectTrigger id="urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="heute">Heute (+15%)</SelectItem>
                      <SelectItem value="jetzt">Sofort (+30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscription"
                  checked={formData.subscription}
                  onCheckedChange={(checked) => updateFormData('subscription', checked === true)}
                />
                <Label htmlFor="subscription">
                  Abo aktiv (20 % Rabatt auf Arbeitszeit)
                </Label>
              </div>

              <div>
                <Label htmlFor="email">Kunden-E-Mail (optional, für Checkout)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="kunde@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateTotal} className="flex-1">
                  Betrag berechnen
                </Button>
              </div>

              {/* Calculation Result */}
              {calculation && (
                <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                  <h3 className="font-semibold">Berechnung</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>Arbeitszeit (Brutto):</span>
                    <span>{formatEUR(calculation.breakdown.arbeitszeitBrutto)}</span>
                    
                    {calculation.breakdown.rabattAbo > 0 && (
                      <>
                        <span>Abo-Rabatt (20 %):</span>
                        <span className="text-destructive">-{formatEUR(calculation.breakdown.rabattAbo)}</span>
                      </>
                    )}
                    
                    <span>Anfahrt:</span>
                    <span>{formatEUR(calculation.breakdown.anfahrt)}</span>
                    
                    <span className="font-semibold">Gesamt:</span>
                    <span className="font-semibold">{formatEUR(calculation.total)}</span>
                  </div>
                  
                  <Alert>
                    <AlertDescription>
                      <strong>Hinweis:</strong> Rabatt 20 % nur auf Arbeitszeit, Anfahrt ausgeschlossen. 
                      Vor-Ort ab 45 Min, Abrechnung in 15-Min-Blöcken.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Checkout Options */}
          {calculation && (
            <Card>
              <CardHeader>
                <CardTitle>Checkout-Optionen</CardTitle>
                <CardDescription>
                  Wählen Sie die passende Zahlungsmethode für den Kunden
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    onClick={handleCreateCheckoutSession}
                    disabled={isLoading}
                    size="lg"
                    className="h-auto p-4 text-left"
                  >
                    <div>
                      <div className="font-semibold">Checkout-Link erzeugen</div>
                      <div className="text-sm opacity-90">Für Kunden-Gerät</div>
                    </div>
                  </Button>

                  <Button 
                    onClick={handleInAppCheckout}
                    variant="outline"
                    size="lg"
                    className="h-auto p-4 text-left"
                  >
                    <div>
                      <div className="font-semibold">In-App-Kasse öffnen</div>
                      <div className="text-sm opacity-70">Auf diesem Gerät</div>
                    </div>
                  </Button>
                </div>

                {checkoutUrl && (
                  <div className="p-4 bg-muted/30 rounded-lg space-y-4">
                    <h3 className="font-semibold">Checkout-Link für Kunden-Gerät</h3>
                    
                    <div className="flex gap-2">
                      <Button onClick={openCheckoutLink} className="flex-1">
                        Checkout öffnen
                      </Button>
                      <Button onClick={copyCheckoutLink} variant="outline">
                        Link kopieren
                      </Button>
                    </div>

                    <div className="text-center">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(checkoutUrl)}`}
                        alt="QR-Code für Checkout-Link" 
                        className="mx-auto"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        QR-Code zum Scannen mit Kunden-Smartphone
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Techniker;