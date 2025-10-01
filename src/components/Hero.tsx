import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const words = [
    "PC-Reparatur",
    "Netzwerk-Setup",
    "KMU-Digitalisierung",
    "WLAN-Optimierung",
    "Drucker-Einrichtung",
    "Fernwartung-Support",
    "Windows-11-Upgrade",
    "M365-Backup",
    "NIS-2-Gap-Check"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  // IntersectionObserver to pause animation when out of viewport
  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || isPaused) return; // No animation for reduced motion or when paused
    
    const duration = 3600; // 3.6s total cycle
    const fadeOutDuration = 220; // 220ms exit
    
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, fadeOutDuration);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, reduced, isPaused]);

  return (
    <section ref={heroRef} id="hero" className="relative pt-16 md:pt-20 pb-16 md:pb-20 bg-gradient-to-br from-[hsl(205,100%,63%)] via-[hsl(205,100%,58%)] to-[hsl(205,90%,53%)] overflow-hidden min-h-[64vh] md:min-h-[70vh] lg:min-h-[72vh] flex items-center">
      <div id="scroll-sentinel" className="absolute top-0 left-0 w-full h-1" aria-hidden="true" />

      <div className="mx-auto max-w-5xl px-4 text-center relative z-10 w-full" data-testid="hero-rotator">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
          Schneller IT-Support für Zuhause & Unternehmen
        </h1>
        <div className="text-2xl md:text-4xl lg:text-5xl font-extrabold mt-3 min-h-[1.5em] flex items-center justify-center overflow-hidden">
          {reduced ? (
            <span className="a11y-pill inline-flex whitespace-nowrap font-extrabold">
              {words[0]}
            </span>
          ) : (
            <span 
              key={currentIndex}
              className={`a11y-pill inline-flex whitespace-nowrap font-extrabold ${
                isVisible 
                  ? 'animate-hero-slide-in' 
                  : 'opacity-0 translate-y-[-6px] transition-all duration-[220ms]'
              }`}
            >
              {words[currentIndex]}
            </span>
          )}
        </div>
        <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
          Wir lösen Ihre Technikprobleme – <strong>REMOTE</strong> oder vor Ort in Köln, Neuss & Umgebung.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link 
            to="/preise#rechner" 
            className="rounded-xl bg-[hsl(var(--thp-cta))] px-6 py-3.5 text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--thp-primary))]"
          >
            Preis in 60 Sekunden
          </Link>
          <Link 
            to="/termin" 
            className="rounded-xl bg-white/95 backdrop-blur px-6 py-3.5 font-semibold text-[hsl(var(--thp-primary))] hover:bg-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
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