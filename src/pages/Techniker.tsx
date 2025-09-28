import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoaderCircle, Copy, ExternalLink, Shield } from "lucide-react";
import { SERVICES } from "@/data/services";
import { calcTechnicianTotal, TechnicianInput, Urgency } from "@/lib/pricing";

const Techniker = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    serviceTitle: "",
    plz: "",
    minutesWorked: 45,
    urgency: "normal" as Urgency,
    subscription: false,
    customerEmail: ""
  });
  
  const [result, setResult] = useState<any>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if already authenticated in session
    const authStatus = sessionStorage.getItem("thp_tech_ok");
    if (authStatus === "1") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = () => {
    const correctPin = import.meta.env.VITE_TECH_PIN || "2468"; // Fallback for development
    
    if (pin === correctPin) {
      sessionStorage.setItem("thp_tech_ok", "1");
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Ungültiger PIN. Bitte versuchen Sie es erneut.");
      setPin("");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.serviceTitle.trim()) newErrors.serviceTitle = "Service ist erforderlich";
    if (!formData.plz.trim()) newErrors.plz = "PLZ ist erforderlich";
    else if (!/^\d{5}$/.test(formData.plz)) newErrors.plz = "PLZ muss 5-stellig sein";
    if (formData.minutesWorked < 45) newErrors.minutesWorked = "Mindestzeit 45 Minuten";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;

    const input: TechnicianInput = {
      serviceTitle: formData.serviceTitle,
      plz: formData.plz,
      minutesWorked: formData.minutesWorked,
      urgency: formData.urgency,
      subscription: formData.subscription
    };

    const calculation = calcTechnicianTotal(input);
    setResult(calculation);
    setCheckoutUrl(""); // Reset checkout URL
  };

  const handleCreateCheckoutLink = async () => {
    if (!result || !result.inArea) return;

    try {
      setIsLoading(true);
      
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents: Math.round(result.total * 100),
          description: `Tech Hilfe Pro – ${formData.serviceTitle}`,
          customerEmail: formData.customerEmail || undefined,
          successUrl: `${window.location.origin}/termin/bestaetigt`,
          cancelUrl: `${window.location.origin}/techniker`
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Checkout-Link konnte nicht erstellt werden");
      }

      const data = await response.json();
      setCheckoutUrl(data.url);
    } catch (error) {
      console.error("Checkout Link Error:", error);
      alert("Fehler beim Erstellen des Checkout-Links: " + (error instanceof Error ? error.message : "Unbekannter Fehler"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(checkoutUrl);
    // Simple feedback - in production you might want a toast
    alert("Link wurde in die Zwischenablage kopiert");
  };

  const handleOpenInApp = () => {
    window.location.href = "/kasse?mode=one_time";
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // PIN Gate
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Techniker-Zugang - Tech Hilfe Pro</title>
          <meta name="description" content="Techniker-Portal für Vor-Ort-Service" />
        </Helmet>
        
        <div className="container mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardHeader className="text-center">
              <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle>Techniker-Zugang</CardTitle>
              <CardDescription>
                Bitte geben Sie Ihren PIN ein
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pinError && (
                <Alert variant="destructive" role="alert">
                  <AlertDescription>{pinError}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="pin">PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                  placeholder="PIN eingeben"
                />
              </div>
              
              <Button onClick={handlePinSubmit} className="w-full">
                Anmelden
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Main Techniker Interface
  return (
    <>
      <Helmet>
        <title>Techniker-Portal - Tech Hilfe Pro</title>
        <meta name="description" content="Quick Charge für Vor-Ort-Service" />
      </Helmet>
      
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Techniker-Portal</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Quick Charge für Vor-Ort-Abrechnung
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Column */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Service-Abrechnung</CardTitle>
                  <CardDescription>
                    Erfassen Sie die erbrachte Leistung
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Service */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceTitle">Service / Leistung *</Label>
                    <Select value={formData.serviceTitle} onValueChange={(value) => handleInputChange("serviceTitle", value)}>
                      <SelectTrigger id="serviceTitle" aria-invalid={!!errors.serviceTitle}>
                        <SelectValue placeholder="Service auswählen oder eingeben" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.filter(s => s.zielgruppe === "beide" || s.zielgruppe === "privat").map((service) => (
                          <SelectItem key={service.id} value={service.titel}>
                            {service.titel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Oder freier Text eingeben"
                      value={formData.serviceTitle}
                      onChange={(e) => handleInputChange("serviceTitle", e.target.value)}
                      aria-invalid={!!errors.serviceTitle}
                    />
                    {errors.serviceTitle && (
                      <p className="text-sm text-destructive" role="alert">
                        {errors.serviceTitle}
                      </p>
                    )}
                  </div>

                  {/* PLZ */}
                  <div className="space-y-2">
                    <Label htmlFor="plz">PLZ *</Label>
                    <Input
                      id="plz"
                      pattern="\d{5}"
                      maxLength={5}
                      value={formData.plz}
                      onChange={(e) => handleInputChange("plz", e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="z.B. 50823"
                      aria-invalid={!!errors.plz}
                    />
                    {errors.plz && (
                      <p className="text-sm text-destructive" role="alert">
                        {errors.plz}
                      </p>
                    )}
                  </div>

                  {/* Minutes Worked */}
                  <div className="space-y-2">
                    <Label htmlFor="minutesWorked">Tatsächliche Minuten vor Ort *</Label>
                    <Input
                      id="minutesWorked"
                      type="number"
                      min={45}
                      step={15}
                      value={formData.minutesWorked}
                      onChange={(e) => handleInputChange("minutesWorked", parseInt(e.target.value) || 45)}
                      aria-invalid={!!errors.minutesWorked}
                    />
                    <p className="text-xs text-muted-foreground">
                      Mindestzeit 45 Min, wird automatisch auf 15-Min-Blöcke aufgerundet
                    </p>
                    {errors.minutesWorked && (
                      <p className="text-sm text-destructive" role="alert">
                        {errors.minutesWorked}
                      </p>
                    )}
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Dringlichkeit</Label>
                    <Select value={formData.urgency} onValueChange={(value: Urgency) => handleInputChange("urgency", value)}>
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

                  {/* Subscription */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="subscription"
                      checked={formData.subscription}
                      onCheckedChange={(checked) => handleInputChange("subscription", checked === true)}
                    />
                    <Label htmlFor="subscription" className="text-sm">
                      Abo aktiv (20% Rabatt auf Arbeitszeit)
                    </Label>
                  </div>

                  {/* Customer Email */}
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Kunden-E-Mail (optional)</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                      placeholder="kunde@example.com"
                    />
                  </div>

                  {/* Calculate Button */}
                  <Button onClick={handleCalculate} className="w-full" size="lg">
                    Betrag berechnen
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Column */}
            <div>
              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {result.inArea ? "Berechnung" : "Außerhalb Servicegebiet"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.inArea ? (
                      <div className="space-y-6">
                        {/* Price Breakdown */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Arbeitszeit {formData.urgency !== "normal" && `(${formData.urgency === "heute" ? "+15%" : "+30%"})`}</span>
                            <span>{result.breakdown.arbeitszeitBrutto.toFixed(2)} €</span>
                          </div>
                          {formData.subscription && (
                            <div className="flex justify-between text-green-600">
                              <span>Abo-Rabatt (20%)</span>
                              <span>–{result.breakdown.rabattAbo.toFixed(2)} €</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>Anfahrt</span>
                            <span>{result.breakdown.anfahrt.toFixed(2)} €</span>
                          </div>
                          <hr />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Gesamt</span>
                            <span>{result.total.toFixed(2)} €</span>
                          </div>
                        </div>

                        {/* Important Notice */}
                        <Alert>
                          <AlertDescription>
                            <strong>Wichtig:</strong> Rabatt 20% nur auf Arbeitszeit, Anfahrt ausgeschlossen.
                          </AlertDescription>
                        </Alert>

                        {/* Checkout Options */}
                        <div className="space-y-4">
                          <h3 className="font-semibold">Checkout-Optionen</h3>
                          
                          {/* Customer Device Checkout */}
                          <div className="space-y-3">
                            <Button 
                              onClick={handleCreateCheckoutLink}
                              disabled={isLoading}
                              className="w-full"
                              size="lg"
                            >
                              {isLoading ? (
                                <>
                                  <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                  Checkout-Link erstellen...
                                </>
                              ) : (
                                "Checkout-Link erzeugen (Kunden-Gerät)"
                              )}
                            </Button>

                            {checkoutUrl && (
                              <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                                <p className="text-sm font-medium">Checkout-Link erstellt:</p>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => window.open(checkoutUrl, '_blank')}
                                    className="flex-1"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Checkout öffnen
                                  </Button>
                                  <Button
                                    onClick={handleCopyLink}
                                    variant="outline"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                {/* Optional QR Code */}
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground mb-2">QR-Code für Kunden:</p>
                                  <img 
                                    alt="QR-Code für Checkout"
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(checkoutUrl)}`}
                                    className="mx-auto border rounded"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* In-App Checkout */}
                          <Button 
                            onClick={handleOpenInApp}
                            variant="outline"
                            className="w-full"
                            size="lg"
                          >
                            In-App-Kasse öffnen
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Hinweis: Bei In-App-Kasse müssen Sie Betrag und Quote erneut eingeben.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-muted-foreground mb-4">{result.message}</p>
                        <p className="text-sm text-muted-foreground">
                          Bitte kontaktieren Sie die Zentrale für individuelle Preisabsprache.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Info Card */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Abrechnungshinweise</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Vor-Ort ab 45 Min, Abrechnung in 15-Min-Blöcken</li>
                    <li>• 20% Rabatt auf Vor-Ort-Arbeitszeit für aktive Abonnenten</li>
                    <li>• Anfahrt nach PLZ-Zone; Preise ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Techniker;