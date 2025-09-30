import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="py-12">
      <div className="container max-w-5xl text-center card p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">Bereit? Wir kümmern uns um Ihre Technik.</h2>
        <p className="mt-2 text-neutral-600">Remote zuerst. Vor-Ort, wenn es Sinn ergibt. Klarer Preis, klare Zeitfenster.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/preise#rechner" className="inline-flex items-center justify-center rounded-xl bg-brand-600 text-white px-6 py-3 text-base font-medium hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 min-h-[44px]">
            Preis in 60 Sekunden
          </Link>
          <Link to="/termin" className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white text-neutral-900 px-6 py-3 text-base font-medium hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 min-h-[44px]">
            Jetzt Termin buchen
          </Link>
        </div>
      </div>
    </section>
  );
}