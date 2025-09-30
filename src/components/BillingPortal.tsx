import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Settings, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function BillingPortal() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePortalAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Bitte geben Sie Ihre E-Mail-Adresse ein");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/portal/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Öffnen des Portals');
      }

      // Redirect to Stripe Billing Portal
      window.open(data.url, '_blank');
      toast.success("Portal wird geöffnet...");

    } catch (error) {
      console.error('Portal error:', error);
      toast.error(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Settings className="w-12 h-12 text-primary mx-auto mb-3" />
        <h2 className="text-xl font-semibold mb-2">Abo verwalten</h2>
        <p className="text-muted-foreground text-sm">
          Verwalten Sie Ihr Abonnement, ändern Sie Zahlungsmethoden oder kündigen Sie Ihren Plan.
        </p>
      </div>

      <form onSubmit={handlePortalAccess} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            <Mail className="w-4 h-4 inline mr-2" />
            E-Mail-Adresse
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="ihre@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Geben Sie die E-Mail-Adresse ein, mit der Sie Ihr Abo abgeschlossen haben.
          </p>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Portal wird geöffnet...
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 mr-2" />
              Abo-Portal öffnen
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t text-center">
        <p className="text-xs text-muted-foreground">
          Sie werden zu einem sicheren Portal von Stripe weitergeleitet, 
          wo Sie alle Abo-Einstellungen verwalten können.
        </p>
      </div>
    </Card>
  );
}