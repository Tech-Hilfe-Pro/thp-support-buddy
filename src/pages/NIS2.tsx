import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

export default function NIS2() {
  return (
    <>
      <SEO 
        title="NIS2: Was KMU jetzt tun sollten – Tech Hilfe Pro"
        description="Überblick, Geltungsbereich und eine umsetzbare 10-Punkte-Checkliste mit minimalen Nachweisen. Remote & vor-Ort-Service für NIS2-Compliance."
        path="/nis2"
      />
      <main id="main" className="container py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="h1-fluid h1-balance mb-3">
            NIS2: Was KMU jetzt tun sollten
          </h1>
          
          <p className="text-muted-foreground max-w-2xl mb-5">
            Überblick, Geltungsbereich und eine umsetzbare 10-Punkte-Checkliste mit minimalen Nachweisen. Remote & vor-Ort-Service.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 mb-12">
            <Link to="/termin" className="btn-cta" aria-label="NIS2 Quick-Check anfragen">
              Quick-Check NIS2
            </Link>
            <a 
              href="/nis2-checklist.pdf" 
              className="btn-wa" 
              target="_blank" 
              rel="noopener"
              aria-label="Checkliste als PDF öffnen"
            >
              Checkliste (PDF)
            </a>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>Was ist NIS2?</h2>
            <p>
              Die NIS2-Richtlinie (Network and Information Security Directive 2) legt Cybersicherheitsanforderungen 
              für Unternehmen in wesentlichen und wichtigen Sektoren in der Europäischen Union fest.
            </p>

            <h2>Betrifft mein Unternehmen NIS2?</h2>
            <p>
              NIS2 gilt für mittlere und große Unternehmen (50+ Mitarbeiter oder 10M€+ Umsatz) in Sektoren wie:
            </p>
            <ul>
              <li>Energie und Versorgung</li>
              <li>Verkehr</li>
              <li>Gesundheitswesen</li>
              <li>Digitale Infrastruktur</li>
              <li>Abfallwirtschaft</li>
              <li>Postdienste</li>
              <li>Und viele weitere kritische Sektoren</li>
            </ul>

            <h2>10-Punkte-Checkliste</h2>
            <ol>
              <li><strong>Geltungsbereichsprüfung:</strong> Feststellen, ob Ihr Unternehmen unter NIS2 fällt</li>
              <li><strong>Risikoanalyse:</strong> Cybersicherheitsrisiken identifizieren und bewerten</li>
              <li><strong>Sicherheitsrichtlinien:</strong> Richtlinien entwickeln und dokumentieren</li>
              <li><strong>Incident Management:</strong> Reaktionsverfahren einrichten</li>
              <li><strong>Business Continuity:</strong> Backup- und Wiederherstellungspläne</li>
              <li><strong>Lieferkettensicherheit:</strong> Anbieter bewerten</li>
              <li><strong>Verschlüsselung und Zugriffskontrolle:</strong> MFA und Verschlüsselung implementieren</li>
              <li><strong>Schwachstellenmanagement:</strong> Patching und Updates</li>
              <li><strong>Mitarbeiterschulung:</strong> Cybersicherheitsbewusstsein schaffen</li>
              <li><strong>Meldewesen:</strong> Verfahren zur Vorfallmeldung</li>
            </ol>

            <h2>Unser NIS2-Service</h2>
            <p>
              Wir bieten umfassende Beratung zur Einhaltung von NIS2 – von der ersten Bewertung bis 
              zur Umsetzung technischer und organisatorischer Maßnahmen.
            </p>
            <ul>
              <li>Kostenloser Quick-Check zu Beginn</li>
              <li>Detaillierte Gap-Analyse</li>
              <li>Umsetzungs-Roadmap</li>
              <li>Kontinuierlicher technischer Support</li>
              <li>Dokumentation und Nachweise</li>
            </ul>
          </div>

          <div className="mt-12 pt-6 border-t flex flex-wrap gap-3">
            <Link to="/termin" className="btn-cta" aria-label="NIS2 Quick-Check buchen">
              Quick-Check NIS2 buchen
            </Link>
            <Link to="/blog/nis2-kmu-erste-90-tage" className="btn-wa">
              Mehr Informationen →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
