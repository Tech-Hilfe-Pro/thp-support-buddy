import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

/**
 * Componente PriceCalculatorNew (PLZ)
 * - Input PLZ (5 dígitos), select servicio, range horas 0.5–8, toggle onsite, select tier (Start/Plus/Ninguno)
 * - Hook que llama a POST /api/price y muestra { baseRate, zone, surcharges, discount, total }
 * - Validación, aria-live, fallback si API falla
 */

interface Service {
  id: string;
  slug: string;
  nameDe: string;
  descriptionShort: string;
  remoteAvailable: boolean;
}

interface PriceResponse {
  baseRate: number;
  zone: string;
  surcharges: {
    urgency: number;
    hardware: number;
  };
  discount: {
    type: 'start' | 'plus' | null;
    pct: number;
  };
  hours: number;
  total: number;
  currency: string;
}

export default function PriceCalculatorNew() {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  
  const [plz, setPlz] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [hours, setHours] = useState(1);
  const [onsite, setOnsite] = useState(true);
  const [tier, setTier] = useState<'start' | 'plus' | null>(null);
  const [urgency, setUrgency] = useState(false);
  const [hardware, setHardware] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PriceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cargar servicios
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setServices(data.services || []);
      })
      .catch(err => {
        console.error('Error loading services:', err);
      })
      .finally(() => setLoadingServices(false));
  }, []);

  const calculatePrice = async () => {
    setError(null);
    setResult(null);
    
    // Validaciones
    if (!plz || !/^\d{5}$/.test(plz)) {
      setError('Bitte geben Sie eine gültige 5-stellige PLZ ein.');
      document.getElementById('plz')?.focus();
      return;
    }
    if (!serviceId) {
      setError('Bitte wählen Sie einen Service aus.');
      document.getElementById('service')?.focus();
      return;
    }
    if (hours < 0.5 || hours > 8) {
      setError('Stunden müssen zwischen 0,5 und 8 liegen.');
      document.getElementById('hours')?.focus();
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plz,
          serviceId,
          hours,
          onsite,
          subscriptionTier: tier,
          urgency,
          hardware
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error('Error calculating price:', err);
      setError('Fehler bei der Preisberechnung. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Preis- & Zeit-Rechner</CardTitle>
        <CardDescription>
          Berechnen Sie Ihren individuellen Preis basierend auf Standort und Servicedauer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* PLZ */}
          <div className="space-y-2">
            <Label htmlFor="plz">Postleitzahl (PLZ) *</Label>
            <Input
              id="plz"
              type="text"
              placeholder="z.B. 50823"
              value={plz}
              onChange={(e) => setPlz(e.target.value)}
              maxLength={5}
              pattern="\d{5}"
              required
              aria-describedby={error && error.includes('PLZ') ? "plz-error" : undefined}
            />
            {error && error.includes('PLZ') && (
              <p id="plz-error" role="alert" className="text-sm text-destructive mt-1">
                {error}
              </p>
            )}
          </div>

          {/* Service */}
          <div className="space-y-2">
            <Label htmlFor="service">Service *</Label>
            {loadingServices ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Laden...
              </div>
            ) : (
              <Select value={serviceId} onValueChange={setServiceId}>
                <SelectTrigger id="service" aria-describedby={error && !serviceId ? "service-error" : undefined}>
                  <SelectValue placeholder="Service auswählen" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {services.length > 0 ? (
                    services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.nameDe}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="__empty" disabled>
                      Keine Services verfügbar
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
            {error && error.includes('Service') && (
              <p id="service-error" role="alert" className="text-sm text-destructive mt-1">
                {error}
              </p>
            )}
          </div>

          {/* Stunden */}
          <div className="space-y-2">
            <Label htmlFor="hours">Stunden (0,5 - 8) *</Label>
            <Input
              id="hours"
              type="number"
              min="0.5"
              max="8"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              required
            />
          </div>

          {/* Vor-Ort / Remote */}
          <div className="space-y-2">
            <Label htmlFor="onsite">Servicetyp *</Label>
            <Select value={onsite ? 'onsite' : 'remote'} onValueChange={(v) => setOnsite(v === 'onsite')}>
              <SelectTrigger id="onsite">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onsite">Vor-Ort</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mitgliedschaft */}
          <div className="space-y-2">
            <Label htmlFor="tier">Mitgliedschaft (optional)</Label>
            <Select value={tier || 'none'} onValueChange={(v) => setTier(v === 'none' ? null : v as 'start' | 'plus')}>
              <SelectTrigger id="tier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Keine</SelectItem>
                <SelectItem value="start">Haus-IT Start (–15%)</SelectItem>
                <SelectItem value="plus">Haus-IT Plus (–25%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Urgencia */}
          <div className="space-y-2">
            <Label htmlFor="urgency">Dringlichkeit (optional)</Label>
            <Select value={urgency ? 'yes' : 'no'} onValueChange={(v) => setUrgency(v === 'yes')}>
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">Normal</SelectItem>
                <SelectItem value="yes">Eilauftrag (+25%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hardware flag */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hardware"
            checked={hardware}
            onChange={(e) => setHardware(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="hardware" className="cursor-pointer">
            Hardware-intensiver Service (+10%)
          </Label>
        </div>

        {/* Button */}
        <Button 
          onClick={calculatePrice} 
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Berechne...
            </>
          ) : (
            'Preis berechnen'
          )}
        </Button>

        {/* Error */}
        {error && (
          <div 
            className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div 
            className="p-6 bg-primary/5 border border-primary/20 rounded-lg space-y-4"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Zone:</span>
              <Badge variant="outline">{result.zone}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Basistarif:</span>
              <span className="font-medium">{result.baseRate.toFixed(2)} € / Stunde</span>
            </div>

            {result.surcharges.urgency > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Eilzuschlag:</span>
                <span>+{result.surcharges.urgency}%</span>
              </div>
            )}

            {result.surcharges.hardware > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hardware-Zuschlag:</span>
                <span>+{result.surcharges.hardware}%</span>
              </div>
            )}

            {result.discount.pct > 0 && (
              <div className="flex items-center justify-between text-sm text-green-600">
                <span>Mitgliedschafts-Rabatt ({result.discount.type === 'start' ? 'Start' : 'Plus'}):</span>
                <span>–{result.discount.pct}%</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Stunden:</span>
              <span className="font-medium">{result.hours.toFixed(1)} h</span>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Gesamtpreis:</span>
                <span className="text-2xl font-bold text-primary">
                  {result.total.toFixed(2)} €
                </span>
              </div>
            </div>

            {!onsite && result.discount.pct === 0 && tier && (
              <p className="text-xs text-muted-foreground">
                Hinweis: Mitgliedschafts-Rabatt gilt nur für Vor-Ort-Services.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
