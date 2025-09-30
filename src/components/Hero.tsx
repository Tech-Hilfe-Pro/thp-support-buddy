import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = [
    "PC-Reparatur vor Ort",
    "Netzwerk-Setup",
    "Digitalisierung für KMU"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [words.length, reduced]);

  const currentWord = reduced ? words.join(" • ") : words[currentIndex];

  return (
    <section id="hero" className="relative pt-16 md:pt-20 pb-16 md:pb-20 bg-gradient-to-br from-thp-primary via-thp-primary-dark to-[hsl(205,90%,53%)] overflow-hidden">

      <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
          Schneller IT-Support für Zuhause & Unternehmen
        </h1>
        <div className="text-3xl md:text-5xl font-extrabold mt-2 text-white/95 min-h-[1.2em] flex items-center justify-center overflow-hidden">
          <span 
            className={`transition-all duration-300 ${isVisible || reduced ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} max-w-full px-2`}
            style={{ textAlign: 'center' }}
          >
            {currentWord}
          </span>
        </div>
        <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
          Wir lösen Ihre Technikprobleme – remote oder vor Ort in Köln, Neuss & Umgebung.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link 
            to="/preise#rechner" 
            className="rounded-xl bg-thp-cta px-6 py-3.5 text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            Preis in 60 Sekunden
          </Link>
          <Link 
            to="/termin" 
            className="rounded-xl bg-white/95 backdrop-blur px-6 py-3.5 font-semibold text-thp-primary hover:bg-white transition-all shadow-md"
          >
            Jetzt Termin buchen
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90 font-medium">
          <span>✓ Vor-Ort & Remote</span>
          <span>✓ Faire Preise</span>
          <span>✓ Verständliche Hilfe</span>
          <span>✓ Schnelle Hilfe</span>
        </div>
      </div>
    </section>
  );
}