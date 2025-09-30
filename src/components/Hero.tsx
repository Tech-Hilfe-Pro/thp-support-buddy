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
    <section id="hero" className="pt-10 md:pt-14 pb-12 md:pb-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold">Schneller IT-Support für Zuhause & Unternehmen</h1>
        <div className="text-3xl md:text-5xl font-extrabold mt-2 text-primary h-[1.2em] flex items-center justify-center overflow-hidden">
          <span 
            className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'} max-w-full px-2`}
            style={{ textAlign: 'center' }}
          >
            {currentWord}
          </span>
        </div>
        <p className="mt-4 text-slate-600">Wir lösen Ihre Technikprobleme – remote oder vor Ort in Köln, Neuss & Umgebung.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/pakete-preise#rechner" className="rounded-xl bg-primary px-5 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Preis in 60 Sekunden</Link>
          <Link to="/termin" className="rounded-xl border border-border px-5 py-3 font-medium hover:bg-secondary transition-colors">Jetzt Termin buchen</Link>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
          <span>✓ Vor-Ort & Remote</span><span>✓ Faire Preise</span><span>✓ Seniorenfreundlich</span><span>✓ Schnelle Hilfe</span>
        </div>
      </div>
    </section>
  );
}