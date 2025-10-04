import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="py-12">
      <div className="container max-w-5xl text-center card p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Bereit? Wir kümmern uns um Ihre Technik.</h2>
        <p className="mt-2 text-muted-foreground">Remote zuerst. Vor-Ort, wenn es Sinn ergibt. Klarer Preis, klare Zeitfenster.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/preise#rechner" className="btn-cta">
            Preis in 60 Sekunden
          </Link>
          <Link to="/termin" className="btn-cta">
            Jetzt Termin buchen
          </Link>
        </div>
      </div>
    </section>
  );
}