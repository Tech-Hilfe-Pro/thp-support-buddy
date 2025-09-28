import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { track } from "@/lib/analytics";
import { SERVICES } from "@/data/services";
import { readQuoteFromStorage } from "@/lib/quote";
import QuoteSummary from "@/components/QuoteSummary";
import { SEO_PAGES, fullUrl } from "@/data/seo";
import { breadcrumb, localBusiness } from "@/lib/structured";
import { COPY, FORM_MSG } from "@/data/copy";
import { COMPANY } from "@/data/company";

const Termin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromCalculator = searchParams.get("from") === "rechner";

  const meta = SEO_PAGES.termin;
  const ld = [
    breadcrumb([
      { name: "Start", url: fullUrl("/") },
      { name: "Termin buchen", url: fullUrl(meta.path) }
    ]),
    localBusiness({ 
      telephone: COMPANY.telE164,
      address: {
        streetAddress: COMPANY.street,
        postalCode: COMPANY.postalCode,
        addressLocality: COMPANY.city,
        addressRegion: "NW",
        addressCountry: "DE"
      },
      areaServed: ["Köln", "Neuss"],
      openingHours: ["Mo-Fr 09:00-18:00"],
      sameAs: []
    })
  ];
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    plz: "",
    address: "",
    serviceId: "",
    urgency: "normal" as "normal" | "heute" | "jetzt",
    subscription: false,
    appointmentType: "onsite" as "onsite" | "remote",
    preferredDate: "",
    preferredTime: "",
    description: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    track("booking_started");
    
    if (fromCalculator) {
      const quote = readQuoteFromStorage();
      if (quote) {
        setFormData(prev => ({
          ...prev,
          serviceId: quote.serviceId,
          plz: quote.plz,
          urgency: quote.urgency,
          subscription: quote.subscription,
          appointmentType: "onsite"
        }));
      }
    }
  }, [fromCalculator]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Vorname ist erforderlich";
    if (!formData.lastName.trim()) newErrors.lastName = "Nachname ist erforderlich";
    if (!formData.email.trim()) newErrors.email = "E-Mail ist erforderlich";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ungültige E-Mail-Adresse";
    if (!formData.phone.trim()) newErrors.phone = "Telefonnummer ist erforderlich";
    if (!formData.plz.trim()) newErrors.plz = "PLZ ist erforderlich";
    else if (!/^\d{5}$/.test(formData.plz)) newErrors.plz = "PLZ muss 5-stellig sein";
    if (!formData.serviceId) newErrors.serviceId = "Service auswählen";
    if (!formData.preferredDate) newErrors.preferredDate = "Wunschtermin ist erforderlich";
    if (!formData.preferredTime) newErrors.preferredTime = "Uhrzeit ist erforderlich";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const honeypot = String(form.get("company") || "");
    if (honeypot.trim() !== "") {
      return;
    }
    
    if (validateForm()) {
      sessionStorage.setItem("thp_booking_data", JSON.stringify(formData));
      navigate("/termin/zusammenfassung");
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} jsonLd={ld} />
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-6">{COPY.booking.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Buchen Sie schnell und unkompliziert einen Termin für Ihren IT-Support. 
              Wählen Sie zwischen Vor-Ort-Service oder Remote-Unterstützung.
            </p>
          </header>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <section className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ihre Angaben</CardTitle>
                  <CardDescription>
                    Bitte füllen Sie alle Pflichtfelder (*) aus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Vorname *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          aria-invalid={!!errors.firstName}
                          aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        />
                        {errors.firstName && (
                          <p id="firstName-error" className="text-sm text-destructive" role="alert">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nachname *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          aria-invalid={!!errors.lastName}
                          aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        />
                        {errors.lastName && (
                          <p id="lastName-error" className="text-sm text-destructive" role="alert">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-sm text-destructive" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-sm text-destructive" role="alert">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="plz">PLZ *</Label>
                        <Input
                          id="plz"
                          pattern="\d{5}"
                          maxLength={5}
                          value={formData.plz}
                          onChange={(e) => handleInputChange("plz", e.target.value.replace(/\D/g, '').slice(0, 5))}
                          aria-invalid={!!errors.plz}
                          aria-describedby={errors.plz ? "plz-error" : undefined}
                        />
                        {errors.plz && (
                          <p id="plz-error" className="text-sm text-destructive" role="alert">
                            {errors.plz}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="address">Straße & Hausnummer</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="z.B. Musterstraße 123"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="serviceId">Service *</Label>
                      <Select value={formData.serviceId} onValueChange={(value) => handleInputChange("serviceId", value)}>
                        <SelectTrigger id="serviceId" aria-invalid={!!errors.serviceId}>
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
                      {errors.serviceId && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.serviceId}
                        </p>
                      )}
                    </div>

                    {/* Urgency and Subscription */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Dringlichkeit</Label>
                        <Select value={formData.urgency} onValueChange={(value: "normal" | "heute" | "jetzt") => handleInputChange("urgency", value)}>
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
                      <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                          id="subscription"
                          checked={formData.subscription}
                          onCheckedChange={(checked) => handleInputChange("subscription", checked === true)}
                        />
                        <Label htmlFor="subscription" className="text-sm">
                          Ich habe eine aktive Mitgliedschaft (20% Rabatt auf Arbeitszeit)
                        </Label>
                      </div>
                    </div>

                    {/* Appointment Type */}
                    <div className="space-y-2">
                      <Label>Terminart</Label>
                      <Select value={formData.appointmentType} onValueChange={(value: "onsite" | "remote") => handleInputChange("appointmentType", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">Vor-Ort-Service</SelectItem>
                          <SelectItem value="remote">Remote-Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date and Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Wunschtermin *</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                          aria-invalid={!!errors.preferredDate}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.preferredDate && (
                          <p className="text-sm text-destructive" role="alert">
                            {errors.preferredDate}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Uhrzeit *</Label>
                        <Input
                          id="preferredTime"
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                          aria-invalid={!!errors.preferredTime}
                        />
                        {errors.preferredTime && (
                          <p className="text-sm text-destructive" role="alert">
                            {errors.preferredTime}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Honeypot */}
                    <label className="hidden" aria-hidden="true">
                      Firmenname
                      <input type="text" name="company" autoComplete="off" tabIndex={-1} className="hidden" />
                    </label>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Kurzbeschreibung/Notizen</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Beschreiben Sie kurz Ihr Problem oder besondere Wünsche..."
                        rows={3}
                      />
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" className="flex-1">
                        Termin prüfen
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <a href="/pakete-preise">Zurück zu Pakete & Preise</a>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Wichtige Hinweise</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Vor-Ort ab 45 Min. Abrechnung in 15-Min-Blöcken.</li>
                    <li>• 20% Rabatt auf Vor-Ort-Arbeitszeit für aktive Abonnenten.</li>
                    <li>• Anfahrt nach PLZ-Zone; Preise ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend.</li>
                    <li>• Ihre Daten werden ausschließlich zur Terminabwicklung verwendet.</li>
                  </ul>
                  {formData.appointmentType === "remote" && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Remote:</strong> 39 € / 30 Min, danach 9,90 € / 15 Min (Preis wird beim Gespräch bestätigt).
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Quote Summary Section */}
            <aside className="lg:col-span-1">
              {formData.appointmentType === "onsite" ? (
                <QuoteSummary />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Remote-Support</CardTitle>
                    <CardDescription>
                      Flexible Abrechnung nach Gespräch
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold tabular-nums">39,00 €</p>
                        <p className="text-sm text-muted-foreground">Erstdiagnose (30 Min)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold tabular-nums">9,90 €</p>
                        <p className="text-sm text-muted-foreground">je 15-Min-Block danach</p>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Remote-Support wird minutengenau abgerechnet</p>
                        <p>Endpreis wird vor Beginn bestätigt</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>

          {/* FAQ Section */}
          <section className="mt-16">
            <FAQ title="Termin buchen – FAQ" items={COPY.faq.termin} />
          </section>

          {/* Fine Print */}
          <div className="mx-auto max-w-3xl text-xs text-muted-foreground space-y-1 pt-10 text-center">
            <p>{COPY.fineprint.onsiteMinimum}</p>
            <p>{COPY.fineprint.subscriberDiscount}</p>
            <p>{COPY.fineprint.travelZone}</p>
            <p>{COPY.fineprint.taxNote}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Termin;