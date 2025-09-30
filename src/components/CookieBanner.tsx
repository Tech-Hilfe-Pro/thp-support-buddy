import { useState, useEffect, useRef } from "react";
import { X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  getConsent, 
  getConsentData, 
  setConsentData, 
  acceptEssentialOnly, 
  acceptAll,
  type ConsentCategories 
} from "@/lib/consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Show banner only if consent is unset
    const consentData = getConsentData();
    if (!consentData) {
      setIsVisible(true);
      // Focus trap: focus on accept button when banner appears
      setTimeout(() => {
        acceptButtonRef.current?.focus();
      }, 100);
    } else {
      setCategories(consentData.categories);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAll();
    closeBanner();
  };

  const handleEssentialOnly = () => {
    acceptEssentialOnly();
    closeBanner();
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    setConsentData(categories);
    setShowSettings(false);
    closeBanner();
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleCategoryChange = (category: keyof ConsentCategories, checked: boolean) => {
    if (category === 'essential') return; // Essential cannot be disabled
    setCategories(prev => ({
      ...prev,
      [category]: checked
    }));
  };

  // Handle keyboard navigation for focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && showSettings) {
      setShowSettings(false);
      return;
    }

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
    <>
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
                onClick={handleEssentialOnly}
                className="h-6 w-6 p-0"
                aria-label="Banner schließen"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div id="cookie-banner-description" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Wir verwenden Cookies, um Ihnen die beste Erfahrung zu bieten. 
                Essentielle Cookies sind für die Funktion der Website erforderlich.
                Mit Ihrer Zustimmung verwenden wir auch Analyse-Cookies zur Verbesserung unserer Dienste.
              </p>
              
              <p className="text-xs text-muted-foreground">
                Mehr Informationen finden Sie in unserer{" "}
                <a 
                  href="/recht/datenschutz" 
                  className="text-primary hover:underline focus:underline focus:outline-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Datenschutzerklärung
                </a>
                .
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <div className="flex gap-2">
                <Button
                  onClick={handleEssentialOnly}
                  variant="outline"
                  className="flex-1 text-xs"
                >
                  Nur essenziell
                </Button>
                <Button
                  onClick={handleOpenSettings}
                  variant="outline"
                  className="flex-1 text-xs"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Einstellungen
                </Button>
              </div>
              <Button
                ref={acceptButtonRef}
                onClick={handleAcceptAll}
                className="w-full"
              >
                Alle akzeptieren
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie-Kategorien</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="essential"
                  checked={true}
                  disabled={true}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="essential" className="text-sm font-medium">
                    Essentielle Cookies
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Erforderlich für grundlegende Website-Funktionen wie Navigation und Sicherheit.
                    Diese können nicht deaktiviert werden.
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="analytics"
                  checked={categories.analytics}
                  onCheckedChange={(checked) => 
                    handleCategoryChange('analytics', checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="analytics" className="text-sm font-medium">
                    Analyse-Cookies
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Helfen uns zu verstehen, wie Besucher unsere Website nutzen, 
                    um die Benutzererfahrung zu verbessern.
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={categories.marketing}
                  onCheckedChange={(checked) => 
                    handleCategoryChange('marketing', checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="marketing" className="text-sm font-medium">
                    Marketing-Cookies
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Werden verwendet, um relevante Werbung und maßgeschneiderte Inhalte zu zeigen.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowSettings(false)}
                variant="outline"
                className="flex-1"
              >
                Abbrechen
              </Button>
              <Button
                onClick={handleSaveSettings}
                className="flex-1"
              >
                Speichern
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;