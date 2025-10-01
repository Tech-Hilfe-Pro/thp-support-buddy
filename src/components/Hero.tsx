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
  const [prevIndex, setPrevIndex] = useState(-1);
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
    
    const duration = 3400; // 3.4s total cycle
    
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, reduced, isPaused, currentIndex]);

  return (
    <section ref={heroRef} id="hero" className="hero-scrim relative pt-16 md:pt-20 pb-16 md:pb-20 overflow-hidden min-h-[64vh] md:min-h-[70vh] lg:min-h-[72vh] flex items-center">
      <div id="scroll-sentinel" className="absolute top-0 left-0 w-full h-1" aria-hidden="true" />

      <div className="mx-auto max-w-5xl px-4 text-center relative z-10 w-full" data-testid="hero-rotator">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-shadow-lg">
          Schneller IT-Support für Zuhause & Unternehmen
        </h1>
        <span 
          className="hero-rotator text-2xl md:text-4xl lg:text-5xl font-extrabold mt-3" 
          aria-live="polite"
        >
          {reduced ? (
            <span className="hero-phrase hero-accent whitespace-nowrap font-extrabold text-white" style={{ position: 'relative', opacity: 1, transform: 'none' }}>
              {words[0]}
            </span>
          ) : (
            words.map((word, i) => (
              <span
                key={i}
                className={`hero-phrase hero-accent whitespace-nowrap font-extrabold text-white ${
                  i === currentIndex ? 'entering willchange' : i === prevIndex ? 'leaving willchange' : 'hidden'
                }`}
                onAnimationEnd={(e) => e.currentTarget.classList.remove('willchange')}
              >
                {word}
              </span>
            ))
          )}
        </span>
        <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto text-shadow-lg">
          Wir lösen Ihre Technikprobleme – <strong>REMOTE</strong> oder vor Ort in Köln, Neuss & Umgebung.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link 
            to="/preise#rechner" 
            className="btn-cta rounded-xl px-6 py-3.5 transition-all hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            Preis in 60 Sekunden
          </Link>
          <Link 
            to="/termin" 
            className="btn-ghost rounded-xl px-6 py-3.5 font-semibold hover:bg-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
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