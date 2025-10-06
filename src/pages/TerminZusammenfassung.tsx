import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";
import { readQuoteFromStorage, clearQuoteInStorage } from "@/lib/quote";
import { buildICS, downloadICS } from "@/lib/ics";
import { SEO_PAGES } from "@/data/seo";
import { formatEUR } from "@/lib/format";

const meta = { title: "Intern – Bitte nicht indexieren", description: "", path: typeof location !== "undefined" ? location.pathname : "/" };

const TerminZusammenfassung = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const meta = SEO_PAGES.terminSum;

  useEffect(() => {
    const storedBookingData = sessionStorage.getItem("thp_booking_data");
    const storedQuote = readQuoteFromStorage();
    
    if (!storedBookingData) {
      navigate("/termin");
      return;
    }
    
    setBookingData(JSON.parse(storedBookingData));
    setQuote(storedQuote);
  }, [navigate]);

  const handleConfirm = () => {
    // Clear stored data
    sessionStorage.removeItem("thp_booking_data");
    clearQuoteInStorage();
    navigate("/termin/bestaetigt");
  };

  const handleGoToCheckout = () => {
    navigate("/kasse", { 
      state: { 
        mode: "one_time" 
      } 
    });
  };

  const handleDownloadICS = () => {
    if (!bookingData) return;
    
    const service = SERVICES.find(s => s.id === bookingData.serviceId);
    const dateTime = new Date(`${bookingData.preferredDate}T${bookingData.preferredTime}`);
    const duration = service?.zeitMin || 60;
    
    const icsData = buildICS({
      title: "Tech Hilfe Pro – Termin",
      description: `Service: ${service?.titel || 'IT-Support'}\nKunde: ${bookingData.firstName} ${bookingData.lastName}\nBeschreibung: ${bookingData.description || 'Kein Kommentar'}`,
      startISO: dateTime.toISOString(),
      durationMin: duration,
      location: bookingData.appointmentType === "onsite" 
        ? `${bookingData.address || ''} ${bookingData.plz}`.trim() || "Vor-Ort-Termin"
        : "Remote (Telefon/Online)"
    });
    
    downloadICS("tech-hilfe-pro-termin.ics", icsData);
  };

  if (!bookingData) {
    return <div>Laden...</div>;
  }

  const service = SERVICES.find(s => s.id === bookingData.serviceId);
  const dateTime = new Date(`${bookingData.preferredDate}T${bookingData.preferredTime}`);

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} robots="noindex,nofollow" />
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terminzusammenfassung</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Bitte prüfen Sie Ihre Angaben und bestätigen Sie den Termin.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Data */}
          <section aria-labelledby="customer-data">
            <Card>
              <CardHeader>
                <CardTitle id="customer-data">Ihre Daten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}
                </div>
                <div>
                  <strong>E-Mail:</strong> {bookingData.email}
                </div>
                <div>
                  <strong>Telefon:</strong> {bookingData.phone}
                </div>
                <div>
                  <strong>PLZ:</strong> {bookingData.plz}
                </div>
                {bookingData.address && (
                  <div>
                    <strong>Adresse:</strong> {bookingData.address}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Appointment Details */}
          <section aria-labelledby="appointment-details">
            <Card>
              <CardHeader>
                <CardTitle id="appointment-details">Termindetails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Service:</strong> {service?.titel || 'Unbekannt'}
                </div>
                <div>
                  <strong>Terminart:</strong> {bookingData.appointmentType === "onsite" ? "Vor-Ort" : "Remote"}
                </div>
                <div>
                  <strong>Datum:</strong> {dateTime.toLocaleDateString("de-DE", { 
                    weekday: "long", 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </div>
                <div>
                  <strong>Uhrzeit:</strong> {dateTime.toLocaleTimeString("de-DE", { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })} Uhr
                </div>
                <div>
                  <strong>Dringlichkeit:</strong> {
                    bookingData.urgency === "normal" ? "Normal" :
                    bookingData.urgency === "heute" ? "Heute (+15%)" :
                    "Sofort (+30%)"
                  }
                </div>
                {bookingData.subscription && (
                  <div className="text-primary">
                    <strong>Mitgliedschaft:</strong> 20% Rabatt auf Arbeitszeit
                  </div>
                )}
                {bookingData.description && (
                  <div>
                    <strong>Beschreibung:</strong> {bookingData.description}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Price Summary */}
        {quote && bookingData.appointmentType === "onsite" && (
          <section aria-labelledby="price-summary" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle id="price-summary">Preisübersicht</CardTitle>
                <CardDescription>
                  Basierend auf Ihrer Berechnung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Arbeitszeit {bookingData.urgency !== "normal" && `(${bookingData.urgency === "heute" ? "+15%" : "+30%"})`}</span>
                    <span>{formatEUR(quote.breakdown.arbeitszeitBrutto)}</span>
                  </div>
                  {bookingData.subscription && (
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
                    <span>Geschätzter Gesamtpreis</span>
                    <span>{formatEUR(quote.total)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Hinweis: Endpreis abhängig von tatsächlicher Dauer; Mindestzeit Vor-Ort 45 Min.
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {quote && bookingData.appointmentType === "onsite" ? (
            <Button onClick={handleGoToCheckout} className="flex-1" size="lg">
              Zur Kasse
            </Button>
          ) : (
            <Button onClick={handleConfirm} className="flex-1" size="lg">
              Termin bestätigen
            </Button>
          )}
          <Button 
            onClick={() => navigate("/termin")} 
            variant="outline" 
            className="flex-1" 
            size="lg"
          >
            Bearbeiten
          </Button>
          <Button 
            onClick={handleDownloadICS} 
            variant="secondary" 
            className="flex-1" 
            size="lg"
          >
            ICS herunterladen
          </Button>
        </div>
      </div>
    </>
  );
};

export default TerminZusammenfassung;