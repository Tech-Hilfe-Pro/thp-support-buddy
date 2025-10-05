import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, MessageCircle } from "lucide-react";
import { COMPANY } from "@/data/company";

export default function StickyReentryHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mq.matches;

    // IntersectionObserver to detect when sentinel is not visible
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        // Show header when sentinel is not visible (scrolled past 600px area)
        if (!entry.isIntersecting && window.scrollY > 600) {
          setIsVisible(true);
          
          // Auto-hide after 4 seconds
          const timer = setTimeout(() => {
            setIsVisible(false);
          }, 4000);
          setAutoHideTimer(timer);
        } else {
          setIsVisible(false);
          if (autoHideTimer) {
            clearTimeout(autoHideTimer);
            setAutoHideTimer(null);
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
      }
    };
  }, [autoHideTimer]);

  // Handle user interaction - keep visible
  const handleInteraction = () => {
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      setAutoHideTimer(null);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[45] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md transition-all duration-300 max-[360px]:hidden ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
      aria-live="polite"
    >
      <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0 flex-shrink">
          <img src="/brand/logo-32.webp" alt="Tech Hilfe Pro" width="32" height="32" className="w-8 h-8 flex-shrink-0" />
          <span className="font-semibold text-sm hidden sm:inline">
            Tech <span className="text-[hsl(var(--thp-primary))]">Hilfe</span> Pro
          </span>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/preise#rechner"
            className="btn-cta text-sm px-3 py-2"
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Preis berechnen</span>
            <span className="sm:hidden">Preis</span>
          </Link>
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta text-sm px-3 py-2"
            aria-label="WhatsApp kontaktieren"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

