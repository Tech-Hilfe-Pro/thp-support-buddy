import SEO from "@/components/SEO";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function NIS2QuickCheck() {
  return (
    <>
      <SEO 
        title="Vielen Dank | Tech Hilfe Pro" 
        description="Wir haben Ihre NIS2 QuickCheck-Anfrage erhalten."
        path="/thanks/nis2-quickcheck"
        robots="noindex, nofollow"
      />
      
      <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-green-600" aria-hidden="true" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-slate-900">
            Vielen Dank!
          </h1>
          
          <p className="text-xl text-slate-700 mb-8">
            Wir haben Ihre NIS2 QuickCheck-Anfrage erhalten und melden uns innerhalb von 1 Werktag mit einer kurzen Einschätzung.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-[#3BA9FF] text-white hover:bg-[#2e8fd9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3BA9FF]"
          >
            Zur Startseite
          </Link>
        </div>
      </section>
    </>
  );
}
