import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Printer, Home } from "lucide-react";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/data/seo";
import { COPY } from "@/data/copy";
import { formatEUR } from "@/lib/format";

const meta = { title: "Intern – Bitte nicht indexieren", description: "", path: typeof location !== "undefined" ? location.pathname : "/" };

const Beleg = () => {
  const [searchParams] = useSearchParams();
  const meta = SEO_PAGES.beleg;
  const [receipt, setReceipt] = useState({
    customerName: searchParams.get("customerName") || "",
    customerEmail: searchParams.get("customerEmail") || "",
    service: searchParams.get("service") || "",
    date: new Date().toLocaleDateString("de-DE"),
    time: new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
    plz: searchParams.get("plz") || "",
    address: searchParams.get("address") || "",
    laborGross: parseFloat(searchParams.get("laborGross") || "0"),
    discount: parseFloat(searchParams.get("discount") || "0"),
    laborNet: parseFloat(searchParams.get("laborNet") || "0"),
    travel: parseFloat(searchParams.get("travel") || "0"),
    total: parseFloat(searchParams.get("total") || "0"),
    subscription: searchParams.get("subscription") === "true",
    urgency: searchParams.get("urgency") || "normal"
  });

  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (field: string, value: string) => {
    setReceipt(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} robots="noindex,nofollow" />
      
      <div className="min-h-screen bg-white">
        {/* Print Controls - Hidden in print */}
        <div className="no-print bg-gray-50 p-4 border-b">
          <div className="container mx-auto max-w-4xl flex justify-between items-center">
            <h1 className="text-2xl font-bold">Beleg erstellen</h1>
            <div className="flex gap-4">
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Drucken
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <a href="/">
                  <Home className="h-4 w-4" />
                  Zur Startseite
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="container mx-auto max-w-4xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 no-print mb-8">
            {/* Input Form - Not printed */}
            <Card>
              <CardHeader>
                <CardTitle>Beleg-Daten eingeben</CardTitle>
                <CardDescription>
                  Füllen Sie die Felder aus und drucken Sie den Beleg
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Kundenname</Label>
                    <Input
                      id="customerName"
                      value={receipt.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">E-Mail</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={receipt.customerEmail}
                      onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                      placeholder="max@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">Service/Leistung</Label>
                  <Input
                    id="service"
                    value={receipt.service}
                    onChange={(e) => handleInputChange("service", e.target.value)}
                    placeholder="PC-Hilfe, WLAN-Setup, etc."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="plz">PLZ</Label>
                    <Input
                      id="plz"
                      value={receipt.plz}
                      onChange={(e) => handleInputChange("plz", e.target.value)}
                      placeholder="50823"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Datum</Label>
                    <Input
                      id="date"
                      type="date"
                      value={receipt.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Uhrzeit</Label>
                    <Input
                      id="time"
                      type="time"
                      value={receipt.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Adresse (optional)</Label>
                  <Textarea
                    id="address"
                    value={receipt.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Straße und Hausnummer"
                    rows={2}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="laborGross">Arbeitszeit (Brutto) €</Label>
                    <Input
                      id="laborGross"
                      type="number"
                      step="0.01"
                      value={receipt.laborGross}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        handleInputChange("laborGross", value.toString());
                        // Auto-calculate net after discount
                        const discount = receipt.subscription ? value * 0.2 : 0;
                        const net = value - discount;
                        setReceipt(prev => ({
                          ...prev,
                          laborGross: value,
                          discount: discount,
                          laborNet: net,
                          total: net + prev.travel
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="travel">Anfahrt €</Label>
                    <Input
                      id="travel"
                      type="number"
                      step="0.01"
                      value={receipt.travel}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        handleInputChange("travel", value.toString());
                        setReceipt(prev => ({
                          ...prev,
                          travel: value,
                          total: prev.laborNet + value
                        }));
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Vorschau</CardTitle>
                <CardDescription>
                  So wird der Beleg gedruckt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs bg-gray-50 p-4 rounded font-mono">
                  <div className="text-center mb-4">
                    <strong>TECH HILFE PRO</strong><br />
                    IT-Support für Privat & Unternehmen
                  </div>
                  <div className="mb-2">
                    <strong>Datum:</strong> {receipt.date} {receipt.time}
                  </div>
                  {receipt.customerName && (
                    <div className="mb-2">
                      <strong>Kunde:</strong> {receipt.customerName}
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div>Leistung: {receipt.service || "—"}</div>
                    <div>PLZ: {receipt.plz || "—"}</div>
                    <div className="mt-2">
                      <div>Arbeitszeit: {formatEUR(receipt.laborGross)}</div>
                      {receipt.subscription && receipt.discount > 0 && (
                        <div>Abo-Rabatt (-20%): -{formatEUR(receipt.discount)}</div>
                      )}
                      <div>Anfahrt: {formatEUR(receipt.travel)}</div>
                      <div className="border-t mt-1 pt-1">
                        <strong>Gesamt: {formatEUR(receipt.total)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Printable Receipt */}
          <div className="print-only">
            <div className="max-w-md mx-auto bg-white p-6 font-serif">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold mb-2">TECH HILFE PRO</h1>
                <p className="text-sm text-gray-600">
                  IT-Support für Privat & Unternehmen<br />
                  Köln, Neuss & Umgebung
                </p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Datum:</span>
                  <span>{receipt.date} {receipt.time}</span>
                </div>

                {receipt.customerName && (
                  <div className="flex justify-between text-sm">
                    <span>Kunde:</span>
                    <span>{receipt.customerName}</span>
                  </div>
                )}

                {receipt.customerEmail && (
                  <div className="flex justify-between text-sm">
                    <span>E-Mail:</span>
                    <span>{receipt.customerEmail}</span>
                  </div>
                )}

                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Leistung:</span>
                    <span>{receipt.service || "IT-Support"}</span>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span>PLZ:</span>
                    <span>{receipt.plz}</span>
                  </div>

                  {receipt.address && (
                    <div className="flex justify-between text-sm mb-2">
                      <span>Adresse:</span>
                      <span className="text-right">{receipt.address}</span>
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Arbeitszeit {receipt.urgency !== "normal" && `(${receipt.urgency === "heute" ? "+15%" : "+30%"})`}:</span>
                    <span>{formatEUR(receipt.laborGross)}</span>
                  </div>

                  {receipt.subscription && receipt.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Abo-Rabatt (20%):</span>
                      <span>-{formatEUR(receipt.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Anfahrt:</span>
                    <span>{formatEUR(receipt.travel)}</span>
                  </div>

                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Gesamt:</span>
                      <span>{formatEUR(receipt.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-300 pt-4 text-xs text-gray-600 space-y-1">
                  <p>Vor-Ort ab 45 Min, Abrechnung in 15-Min-Blöcken</p>
                  <p>20% Rabatt auf Vor-Ort-Arbeitszeit für aktive Abonnenten</p>
                  <p>Anfahrt nach PLZ-Zone; Preise ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend</p>
                </div>

                <div className="text-center text-xs text-gray-600 mt-6">
                  <p>Vielen Dank für Ihr Vertrauen!</p>
                  <p>info@techhilfe-pro.de | +49 221 123 456 7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          @page { margin: 1cm; }
        }
        @media screen {
          .print-only { display: none; }
        }
      `}</style>
    </>
  );
};

export default Beleg;