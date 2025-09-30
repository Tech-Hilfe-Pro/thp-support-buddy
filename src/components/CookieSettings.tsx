import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  getConsentData, 
  setConsentData,
  type ConsentCategories 
} from "@/lib/consent";

const CookieSettings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consentData = getConsentData();
    if (consentData) {
      setCategories(consentData.categories);
    }

    const handleOpenSettings = () => {
      setShowSettings(true);
    };

    window.addEventListener('thp:open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('thp:open-cookie-settings', handleOpenSettings);
  }, []);

  const handleSaveSettings = () => {
    setConsentData(categories);
    setShowSettings(false);
  };

  const handleCategoryChange = (category: keyof ConsentCategories, checked: boolean) => {
    if (category === 'essential') return; // Essential cannot be disabled
    setCategories(prev => ({
      ...prev,
      [category]: checked
    }));
  };

  return (
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
  );
};

export default CookieSettings;