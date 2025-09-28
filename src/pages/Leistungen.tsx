import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import ServiceCard from "@/components/ServiceCard";
import SEO from "@/components/SEO";
import { Chip } from "@/components/Chip";
import { SERVICES } from "@/data/services";

export default function LeistungenPage() {
  const [aud, setAud] = useState<"PRIVAT" | "KMU">("PRIVAT");
  const [searchTerm, setSearchTerm] = useState("");

  const view = useMemo(() => {
    let filtered = SERVICES.filter((s: any) => 
      aud === "PRIVAT" ? 
        (s.zielgruppe === "privat" || s.zielgruppe === "beide") : 
        (s.zielgruppe === "kmu" || s.zielgruppe === "beide")
    );

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((s: any) =>
        s.titel.toLowerCase().includes(term) ||
        s.kurz.toLowerCase().includes(term)
      );
    }

    return filtered.slice(0, 9);
  }, [aud, searchTerm]);

  return (
    <>
      <SEO 
        title="IT-Leistungen in Köln & Neuss | Tech Hilfe Pro"
        description="Alle IT-Services im Überblick: PC-Hilfe, WLAN-Setup, Sicherheit, Smart-Home und mehr. Für Privat und KMU."
        path="/leistungen"
        ogImage={`/og?title=${encodeURIComponent("IT-Leistungen")}&subtitle=${encodeURIComponent("Von WLAN bis Smart-Home")}`}
      />
      
      <main id="main" className="mx-auto max-w-7xl px-3 lg:px-6 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Unsere Leistungen</h1>
          <p className="text-slate-600 mt-1">Von der PC-Einrichtung bis zur Smart-Home-Installation – wir sind Ihr zuverlässiger Partner.</p>
          
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="inline-flex rounded-xl border bg-slate-50 p-1">
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${aud === "PRIVAT" ? "bg-white shadow" : "text-slate-600"}`} 
                onClick={() => setAud("PRIVAT")}
              >
                Privat
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${aud === "KMU" ? "bg-white shadow" : "text-slate-600"}`} 
                onClick={() => setAud("KMU")}
              >
                KMU
              </button>
            </div>
            
            <Input
              type="text"
              placeholder="Service suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
          
          <div className="mt-3 flex gap-2">
            <Chip kind="KMU" />
            <Chip kind="MSP" />
            <Chip kind="SLA" />
          </div>
        </header>

        {view.length > 0 ? (
          <section aria-label="Leistungen" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {view.map((s: any) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </section>
        ) : (
          <section className="text-center py-12 mb-8">
            <p className="text-slate-600 mb-4">
              Keine Services gefunden, die Ihren Kriterien entsprechen.
            </p>
            <button
              onClick={() => {
                setAud("PRIVAT");
                setSearchTerm("");
              }}
              className="text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              Filter zurücksetzen
            </button>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/pakete-preise#rechner" className="rounded-xl bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">
            Preis in 60 Sekunden
          </a>
          <a href="/termin" className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">
            Jetzt Termin buchen
          </a>
        </div>
      </main>
    </>
  );
}