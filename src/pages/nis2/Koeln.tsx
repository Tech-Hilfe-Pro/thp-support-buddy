import SEO from "@/components/SEO";
import NIS2QuickCheckForm from "@/components/forms/NIS2QuickCheckForm";
import { CheckCircle2 } from "lucide-react";

export default function NIS2Koeln() {
  return (
    <>
      <SEO 
        title="NIS2 Beratung für KMU in Köln | Tech Hilfe Pro" 
        description="Schneller NIS2-QuickCheck für Kölner KMU. Unverbindliche Erstberatung, praxisnah und bezahlbar. Remote & vor Ort."
        path="/nis2-koeln"
      />
      
      <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#3BA9FF] to-[#2e8fd9] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg">
              NIS2 für KMU in Köln – Schnell, praxisnah, bezahlbar.
            </h1>
            
            <ul className="space-y-3 mb-8 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Betroffenheitsanalyse light – prüfen Sie in 10 Minuten, ob NIS2 Sie betrifft</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" aria-hidden="true" />
                <span>QuickCheck mit 10 Kernpunkten – keine stundenlange Analyse</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Handlungsempfehlungen innerhalb von 48h – konkret und umsetzbar</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#quickcheck-form" 
                className="btn-cta inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white hover:brightness-110 transition-all"
              >
                Kostenlosen QuickCheck anfragen
              </a>
              <a 
                href="/nis2-checklist.pdf?utm_source=site&utm_medium=cta&utm_campaign=nis2" 
                className="btn btn-secondary inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-white/90 text-[#1e293b] hover:bg-white transition-all"
                download
              >
                Checklist (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* Was prüfen wir? */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Was prüfen wir?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">MFA (Multi-Faktor-Authentifizierung)</h3>
                <p className="text-slate-600">Ist MFA für kritische Systeme und Zugriffe aktiv?</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">Backups getestet</h3>
                <p className="text-slate-600">Werden Backups regelmäßig getestet und dokumentiert?</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">Patch-Stand</h3>
                <p className="text-slate-600">Ist ein Patch-Management-Prozess etabliert?</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">Incident-Meldeweg</h3>
                <p className="text-slate-600">Existiert ein dokumentierter Meldeweg für Sicherheitsvorfälle?</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">Lieferkette</h3>
                <p className="text-slate-600">Werden Lieferanten und Dienstleister auf IT-Sicherheit geprüft?</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">Schulungen</h3>
                <p className="text-slate-600">Erhalten Mitarbeitende regelmäßige Awareness-Trainings?</p>
              </div>
            </div>
          </div>
        </section>

        {/* QuickCheck Form */}
        <section id="quickcheck-form" className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">NIS2 QuickCheck anfragen</h2>
            <p className="text-slate-600 mb-8">
              Füllen Sie das Formular aus und wir melden uns innerhalb von 1 Werktag mit einer ersten Einschätzung.
            </p>
            
            <NIS2QuickCheckForm />
          </div>
        </section>

        {/* DSGVO Notice */}
        <section className="py-8 px-4 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-slate-600">
              <strong>Datenschutz:</strong> Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. 
              Details in unserer{" "}
              <a href="/recht/datenschutz" className="text-[#3BA9FF] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3BA9FF] rounded">
                Datenschutzerklärung
              </a>.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
