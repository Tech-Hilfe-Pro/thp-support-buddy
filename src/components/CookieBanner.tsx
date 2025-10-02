import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getConsent, setConsent, emitConsentGranted } from "@/lib/consent";
import { COPY } from "@/data/copy";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Show banner only if consent is unset
    if (getConsent() === "unset") {
      setIsVisible(true);
      // Focus trap: focus on accept button when banner appears
      setTimeout(() => {
        acceptButtonRef.current?.focus();
      }, 100);
    }
  }, []);

  const handleAccept = () => {
    setConsent("granted");
    emitConsentGranted();
    closeBanner();
  };

  const handleDeny = () => {
    setConsent("denied");
    closeBanner();
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  // Handle keyboard navigation for focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      const banner = bannerRef.current;
      if (!banner) return;

      const focusableElements = banner.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      onKeyDown={handleKeyDown}
    >
      <Card 
        ref={bannerRef}
        className={`w-full max-w-md transition-transform duration-300 ${
          isClosing ? "translate-y-4 sm:scale-95" : "translate-y-0 sm:scale-100"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 id="cookie-banner-title" className="text-lg font-semibold">
              Cookie-Einstellungen
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeny}
              className="h-6 w-6 p-0"
              aria-label="Banner schließen"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div id="cookie-banner-description" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {COPY.legal.cookiesBanner.text}
            </p>
            
            <p className="text-xs text-muted-foreground">
              Mehr Informationen finden Sie in unserer{" "}
              <a 
                href="/recht/datenschutz" 
                className="text-primary underline hover:underline focus:underline focus:outline-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                {COPY.legal.cookiesBanner.privacyLink}
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              ref={acceptButtonRef}
              onClick={handleAccept}
              className="flex-1"
            >
              {COPY.legal.cookiesBanner.accept}
            </Button>
            <Button
              onClick={handleDeny}
              variant="outline"
              className="flex-1"
            >
              {COPY.legal.cookiesBanner.deny}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;