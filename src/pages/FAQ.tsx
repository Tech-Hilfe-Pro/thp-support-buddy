import { useState } from "react";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

type FAQItem = {
  q: string;
  a: string;
  category: string;
};

const FAQ_DATA: FAQItem[] = [
  // Allgemein
  { 
    category: "Allgemein",
    q: "Wie schnell können Sie mir helfen?", 
    a: "Remote-Support oft innerhalb von 1-2 Stunden, Vor-Ort-Termine meist innerhalb von 24-48 Stunden. Bei Notfällen kontaktieren Sie uns direkt via WhatsApp oder Telefon." 
  },
  { 
    category: "Allgemein",
    q: "Arbeiten Sie nur in Köln und Neuss?", 
    a: "Hauptsächlich ja. Für Remote-Support sind wir bundesweit verfügbar. Vor-Ort-Service bieten wir im Umkreis von ca. 40 km um Köln an (Köln, Neuss, Düsseldorf, Bergisch Gladbach, etc.)." 
  },
  { 
    category: "Allgemein",
    q: "Was ist der Unterschied zwischen Remote und Vor-Ort?", 
    a: "Remote: Wir verbinden uns per Internet mit Ihrem Gerät und lösen das Problem aus der Ferne. Schneller und günstiger. Vor-Ort: Ein Techniker kommt zu Ihnen nach Hause oder ins Büro – ideal bei Hardware-Problemen oder wenn Remote nicht möglich ist." 
  },
  
  // Preise
  { 
    category: "Preise",
    q: "Was kostet Remote-Support?", 
    a: "Remote-Support wird in 15-Minuten-Blöcken abgerechnet (ca. 15-20 €/Block). Erste 30 Minuten Diagnose: 30 €. Mit Abo erhalten Sie Rabatte und priorisierte Bearbeitung." 
  },
  { 
    category: "Preise",
    q: "Wie berechnen Sie Vor-Ort-Einsätze?", 
    a: "Stundensatz je nach PLZ-Zone (Köln Kern ab 79 €/h) + Anfahrtspauschale. Mit aktivem Abo: bis zu 25% Rabatt. Genaue Preise berechnen Sie mit unserem Preis-Rechner auf der Preise-Seite." 
  },
  { 
    category: "Preise",
    q: "Lohnt sich ein Abo?", 
    a: "Ja, wenn Sie regelmäßig IT-Support benötigen. Ab dem ersten Vor-Ort-Einsatz amortisiert sich das Abo oft durch die Rabatte (15-25%). Zusätzlich: Priorität bei Terminen und regelmäßige Checks." 
  },
  { 
    category: "Preise",
    q: "Welche Zahlungsmethoden akzeptieren Sie?", 
    a: "Wir nutzen Stripe für sichere Online-Zahlungen (Karte, SEPA-Lastschrift, Apple Pay). Für Firmenkunden auch Rechnung mit 14 Tagen Zahlungsziel." 
  },
  
  // Services
  { 
    category: "Services",
    q: "Können Sie auch Windows 11 installieren?", 
    a: "Ja, wir installieren Windows 11, migrieren Ihre Daten und richten alles ein. Remote oder vor Ort möglich. Dauer: ca. 2-3 Stunden je nach System." 
  },
  { 
    category: "Services",
    q: "Helfen Sie bei WLAN-Problemen?", 
    a: "Absolut. Wir optimieren Ihr WLAN, richten Mesh-Systeme ein, beheben Verbindungsprobleme und konfigurieren Router. Remote-Diagnose möglich, bei Bedarf kommen wir vor Ort." 
  },
  { 
    category: "Services",
    q: "Richten Sie auch Smart-Home-Geräte ein?", 
    a: "Ja, wir installieren und konfigurieren Alexa, Google Home, Philips Hue, Smart-Thermostate und mehr. Auch Integration mehrerer Systeme." 
  },
  { 
    category: "Services",
    q: "Bieten Sie Backup-Lösungen an?", 
    a: "Ja, wir richten lokale und Cloud-Backups ein (OneDrive, Google Drive, externe Festplatten). Für KMU: professionelle Backup-Strategien mit automatischer Überwachung." 
  },
  { 
    category: "Services",
    q: "Können Sie Drucker einrichten?", 
    a: "Ja, Installation und Konfiguration von Druckern, Scannern und Multifunktionsgeräten – inkl. Netzwerk-Drucker und Treiber-Updates." 
  },
  
  // Abos
  { 
    category: "Abos",
    q: "Gibt es eine Mindestlaufzeit bei den Abos?", 
    a: "Nein, alle Abos sind monatlich kündbar. Keine versteckten Kosten, keine Bindung." 
  },
  { 
    category: "Abos",
    q: "Was ist im Abo enthalten?", 
    a: "Rabatte auf Vor-Ort-Einsätze (15-25%), priorisierte Terminvergabe, WhatsApp-Direktkanal, Update-Erinnerungen und jährliche Gesundheitschecks. Remote-Support wird weiterhin nach Aufwand berechnet." 
  },
  { 
    category: "Abos",
    q: "Kann ich mein Abo upgraden?", 
    a: "Ja, jederzeit. Wechsel von Start zu Plus erfolgt sofort, anteiliger Preis wird verrechnet." 
  },
  
  // KMU
  { 
    category: "KMU",
    q: "Was ist in den KMU-Paketen enthalten?", 
    a: "Remote Monitoring & Management (RMM), automatisches Patch-Management, Inventarverwaltung und Remote-Support. Je nach Paket kommen Backup, erweiterte SLAs und Vor-Ort-Priorität hinzu." 
  },
  { 
    category: "KMU",
    q: "Was bedeutet der Mindestumsatz?", 
    a: "Um die Qualität zu sichern, gibt es Mindestumsätze: Basic 99 €/Monat, Standard 179 €, Premium 299 €. Das entspricht ca. 7-10 Endpoints je nach Paket." 
  },
  { 
    category: "KMU",
    q: "Bieten Sie auch NIS-2-Vorbereitung an?", 
    a: "Ja, wir helfen bei der Gap-Analyse und erstellen eine Roadmap für NIS-2-Compliance. Vollständige Zertifizierung erfolgt durch externe Auditoren." 
  },
  
  // Technisch
  { 
    category: "Technisch",
    q: "Welche Betriebssysteme unterstützen Sie?", 
    a: "Windows (10, 11), macOS, iOS, Android und grundlegende Linux-Distributionen (Ubuntu, Debian)." 
  },
  { 
    category: "Technisch",
    q: "Wie funktioniert Remote-Support technisch?", 
    a: "Wir nutzen sichere Tools wie AnyDesk oder TeamViewer. Sie erhalten einen Link, klicken darauf, und wir können mit Ihrer Zustimmung Ihren Bildschirm sehen und helfen." 
  },
  { 
    category: "Technisch",
    q: "Ist Remote-Support sicher?", 
    a: "Ja, alle Verbindungen sind Ende-zu-Ende verschlüsselt. Sie sehen jederzeit, was wir tun, und können die Sitzung jederzeit beenden." 
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(FAQ_DATA.map(f => f.category)));

  const filtered = FAQ_DATA.filter(f => {
    const matchesCategory = !selectedCategory || f.category === selectedCategory;
    if (!search.trim()) return matchesCategory;
    const lwr = search.toLowerCase();
    return matchesCategory && (f.q.toLowerCase().includes(lwr) || f.a.toLowerCase().includes(lwr));
  });

  return (
    <>
      <SEO
        title="Häufig gestellte Fragen (FAQ) | Tech Hilfe Pro"
        description="Antworten auf die wichtigsten Fragen zu IT-Support, Preisen, Abos, Services und mehr. Finden Sie schnell die Hilfe, die Sie brauchen."
        path="/faq"
      />

      <div className="container mx-auto max-w-5xl px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Häufig gestellte Fragen</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schnelle Antworten auf Ihre Fragen zu IT-Support, Preisen und Services
          </p>
        </header>
        
        {/* Search */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Frage suchen... (z.B. 'Drucker', 'Preis', 'Windows 11')"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              aria-label="Fragen durchsuchen"
            />
          </div>
          {search && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {filtered.length} {filtered.length === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden
            </p>
          )}
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            Alle
          </Badge>
          {categories.map(cat => (
            <Badge 
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* FAQ List */}
        {filtered.length > 0 ? (
          <Accordion type="multiple" className="mb-12">
            {filtered.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left">
                  <div>
                    <Badge variant="secondary" className="text-xs mr-2 mb-1">
                      {faq.category}
                    </Badge>
                    <span>{faq.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Keine Ergebnisse für "{search}" gefunden.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
              }}
            >
              Filter zurücksetzen
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">Weitere Fragen?</h2>
          <p className="text-muted-foreground mb-6">
            Wir helfen Ihnen gerne persönlich weiter – per Telefon, E-Mail oder WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/kontakt">Kontakt aufnehmen</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/preise#rechner">Preis berechnen</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
