import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ServiceCard from "@/components/ServiceCard";
import TagToggle from "@/components/TagToggle";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";
import { COMPANY } from "@/data/company";

const Leistungen = () => {
  const [filter, setFilter] = useState<"alle" | "privat" | "kmu">("alle");
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = [
    { value: "alle", label: "Alle" },
    { value: "privat", label: "Privat" },
    { value: "kmu", label: "KMU" },
  ];

  const filteredServices = useMemo(() => {
    let filtered = SERVICES;

    // Filter by target group
    if (filter !== "alle") {
      filtered = filtered.filter(
        service => service.zielgruppe === filter || service.zielgruppe === "beide"
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        service =>
          service.titel.toLowerCase().includes(term) ||
          service.kurz.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filter, searchTerm]);

  return (
    <>
      <SEO 
        title="IT-Leistungen in Köln & Neuss | Tech Hilfe Pro"
        description="Alle IT-Services im Überblick: PC-Hilfe, WLAN-Setup, Sicherheit, Smart-Home und mehr. Für Privat und KMU."
        path="/leistungen" 
      />
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-6">Unsere Leistungen</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Was wir konkret für Sie tun - von der einfachen PC-Hilfe bis zur komplexen IT-Infrastruktur
            </p>
          </header>

          {/* Filter Controls */}
          <section className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <TagToggle
                options={filterOptions}
                value={filter}
                onChange={(value) => setFilter(value as typeof filter)}
              />
              
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Service suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </section>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredServices.length} {filteredServices.length === 1 ? "Service" : "Services"} gefunden
              {filter !== "alle" && ` für ${filter === "privat" ? "Privatkunden" : "Unternehmen"}`}
              {searchTerm && ` mit "${searchTerm}"`}
            </p>
          </div>

          {/* Service Grid */}
          {filteredServices.length > 0 ? (
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </section>
          ) : (
            <section className="text-center py-12 mb-16">
              <p className="text-muted-foreground mb-4">
                Keine Services gefunden, die Ihren Kriterien entsprechen.
              </p>
              <button
                onClick={() => {
                  setFilter("alle");
                  setSearchTerm("");
                }}
                className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                Filter zurücksetzen
              </button>
            </section>
          )}

          {/* Additional Info */}
          <section className="bg-muted/30 p-8 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">Ihr Service ist nicht dabei?</h2>
            <p className="text-muted-foreground mb-4">
              Wir bieten auch individuelle Lösungen für spezielle Anforderungen.
            </p>
            <p className="text-sm text-muted-foreground">
              Kontaktieren Sie uns für eine maßgeschneiderte Beratung.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Leistungen;