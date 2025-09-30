import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = [
    "PC-Soforthilfe",
    "Office & Programme", 
    "Scan & Druck Service",
    "Datenrettung NRW",
    "WLAN Turbo Check",
    "Gaming & VR Setup",
    "SmartHome Assistent",
    "Fitness & Wearables",
    "Handy Soforthilfe",
    "Audio & Musik Setup",
    "TV Startklar machen",
    "Streaming Support",
    "Receiver Einrichtung",
    "Windows Update Fix",
    "Tablet & E-Reader"
  ];
  
  const [shuffledWords] = useState(() => [...words].sort(() => Math.random() - 0.5));
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
        setCurrentIndex((prev) => (prev + 1) % shuffledWords.length);
        setIsVisible(true);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [shuffledWords.length, reduced]);

  const currentWord = shuffledWords[currentIndex];

  return (
    <section id="hero" className="relative pt-16 md:pt-20 pb-16 md:pb-20 bg-gradient-to-br from-[hsl(205,100%,63%)] via-[hsl(205,95%,58%)] to-[hsl(205,90%,53%)] overflow-hidden">
      {/* TODO: Remover banner debug después de verificar */}
      <div data-debug="thp" className="fixed bottom-0 inset-x-0 bg-[#3BA9FF] text-[#0B2A45] py-2 px-4 text-center z-[9999] text-sm font-semibold shadow-lg">
        🔍 DEBUG: #3BA9FF ACTIVO · PRECIOS KMU: 14,90 / 24,90 / 39,90 · PRIVAT: 9,90 / 19,90
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
          Schneller IT-Support für Zuhause & Unternehmen
        </h1>
        <div className="text-3xl md:text-5xl font-extrabold mt-2 text-white/95 h-[1.2em] flex items-center justify-center overflow-hidden">
          <span 
            className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'} max-w-full px-2`}
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
            to="/pakete-preise#rechner" 
            className="rounded-xl bg-[hsl(24,95%,53%)] px-6 py-3.5 text-white font-semibold hover:bg-[hsl(24,95%,48%)] transition-all shadow-lg hover:shadow-xl"
          >
            Preis in 60 Sekunden
          </Link>
          <Link 
            to="/termin" 
            className="rounded-xl bg-white/95 backdrop-blur px-6 py-3.5 font-semibold text-[hsl(205,100%,63%)] hover:bg-white transition-all shadow-md"
          >
            Jetzt Termin buchen
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90 font-medium">
          <span>✓ Vor-Ort & Remote</span>
          <span>✓ Faire Preise</span>
          <span>✓ Seniorenfreundlich</span>
          <span>✓ Schnelle Hilfe</span>
        </div>
      </div>
    </section>
  );
}