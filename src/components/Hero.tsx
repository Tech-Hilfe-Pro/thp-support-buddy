import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const typewriterTexts = [
    "PC/Mac-Hilfe",
    "WLAN-Optimierung", 
    "Drucker-Setup",
    "Smart-TV/Streaming",
    "Smart-Home",
    "Sicherheits-Check",
    "Datenrettung",
    "E-Mail & Cloud",
    "Backups",
    "Virenschutz",
    "Router & Mesh",
    "Schulung für Senioren"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(typewriterTexts[0]);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const currentText = typewriterTexts[currentTextIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentTextIndex, prefersReducedMotion, typewriterTexts]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Morphic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
        
        {/* Morphic blobs */}
        {!prefersReducedMotion && (
          <>
            <div className="absolute top-20 left-10 w-72 h-72 morphic-blob morphic-float opacity-20" 
                 style={{ animationDelay: '0s' }} />
            <div className="absolute top-40 right-20 w-96 h-96 morphic-blob morphic-pulse opacity-15" 
                 style={{ animationDelay: '5s' }} />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 morphic-blob morphic-float opacity-10" 
                 style={{ animationDelay: '10s' }} />
          </>
        )}
        
        {/* Static gradient for reduced motion */}
        {prefersReducedMotion && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        )}
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 text-shadow">
            Tech Hilfe Pro
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 font-medium">
            Wir richten es ein. Wir halten es am Laufen.
          </p>

          {/* Typewriter Text */}
          <div className="mb-12 h-12 flex items-center justify-center">
            <div 
              className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary"
              aria-live="polite"
              aria-label="Unsere Leistungen"
            >
              {prefersReducedMotion ? (
                <span>PC/Mac-Hilfe • WLAN-Optimierung • Drucker-Setup</span>
              ) : (
                <span className="typewriter-text">
                  {displayText}
                </span>
              )}
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link to="/pakete-preise">
                Preis in 60 Sekunden
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link to="/termin">
                Jetzt Termin buchen
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Vertrauensvoll seit über 10 Jahren in Köln, Neuss & Umgebung
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground">
              <span className="flex items-center">
                ✓ Vor-Ort & Remote Service
              </span>
              <span className="flex items-center">
                ✓ Faire Festpreise
              </span>
              <span className="flex items-center">
                ✓ Seniorenfreundlich
              </span>
              <span className="flex items-center">
                ✓ Schnelle Hilfe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;