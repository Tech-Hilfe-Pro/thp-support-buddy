import { useState } from "react";
import { Monitor, Wifi, Printer, Tv, Home, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeviceType, ServiceType, Urgency, WizardState } from "@/lib/filters";

interface MiniWizardProps {
  onComplete: (state: WizardState) => void;
}

const DEVICES: { id: DeviceType; label: string; Icon: typeof Monitor }[] = [
  { id: "pc", label: "PC/Laptop", Icon: Monitor },
  { id: "wlan", label: "WLAN/Router", Icon: Wifi },
  { id: "drucker", label: "Drucker/Scanner", Icon: Printer },
  { id: "tv", label: "TV/Streaming", Icon: Tv },
  { id: "smarthome", label: "SmartHome", Icon: Home },
  { id: "handy", label: "Handy/Tablet", Icon: Smartphone },
];

const TYPES: { id: ServiceType; label: string }[] = [
  { id: "remote", label: "Remote" },
  { id: "vor-ort", label: "Vor-Ort" },
];

const URGENCIES: { id: Urgency; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "heute", label: "Heute" },
  { id: "wochenende", label: "Wochenende" },
];

export default function MiniWizard({ onComplete }: MiniWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [state, setState] = useState<WizardState>({});

  const handleDevice = (device: DeviceType) => {
    setState((prev) => ({ ...prev, device }));
    setStep(2);
  };

  const handleType = (type: ServiceType) => {
    setState((prev) => ({ ...prev, type }));
    setStep(3);
  };

  const handleUrgency = (urgency: Urgency) => {
    const finalState = { ...state, urgency };
    setState(finalState);
    onComplete(finalState);
  };

  return (
    <section className="bg-secondary/30 rounded-2xl p-6 sm:p-8 mb-8" aria-labelledby="wizard-title">
      <h2 id="wizard-title" className="text-2xl font-bold mb-6 text-center">
        Finden Sie Ihren Service in 3 Schritten
      </h2>

      <div className="space-y-6" role="region" aria-live="polite">
        {/* Step 1: Gerät */}
        {step === 1 && (
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-3">1. Was braucht Hilfe?</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DEVICES.map(({ id, label, Icon }) => (
                <Button
                  key={id}
                  variant="outline"
                  size="lg"
                  onClick={() => handleDevice(id)}
                  className="h-auto py-4 flex flex-col gap-2 min-h-[96px]"
                  aria-label={`Gerät auswählen: ${label}`}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                  <span className="text-sm font-medium">{label}</span>
                </Button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step 2: Remote oder Vor-Ort */}
        {step === 2 && (
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-3">2. Wie möchten Sie Hilfe erhalten?</legend>
            <div className="grid grid-cols-2 gap-4">
              {TYPES.map(({ id, label }) => (
                <Button
                  key={id}
                  variant="outline"
                  size="lg"
                  onClick={() => handleType(id)}
                  className="h-auto py-6 text-base font-semibold"
                  aria-label={`Service-Typ auswählen: ${label}`}
                >
                  {label}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(1)}
              className="mt-2"
            >
              ← Zurück
            </Button>
          </fieldset>
        )}

        {/* Step 3: Dringlichkeit */}
        {step === 3 && (
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-3">3. Wann brauchen Sie Hilfe?</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {URGENCIES.map(({ id, label }) => (
                <Button
                  key={id}
                  variant={id === "heute" ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleUrgency(id)}
                  className="h-auto py-4"
                  aria-label={`Dringlichkeit auswählen: ${label}`}
                >
                  {label}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(2)}
              className="mt-2"
            >
              ← Zurück
            </Button>
          </fieldset>
        )}
      </div>
    </section>
  );
}
