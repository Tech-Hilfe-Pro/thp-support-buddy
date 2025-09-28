import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SEO from "@/components/SEO";
import { toast } from "@/hooks/use-toast";
import { TechnicianInput, calcTechnicianTotal } from "@/lib/pricing";
import { SERVICES } from "@/data/services";
import { SEO_PAGES } from "@/data/seo";

const Techniker = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const meta = SEO_PAGES.techniker;

  const [technicianData, setTechnicianData] = useState<TechnicianInput>({
    plz: "",
    serviceId: "",
    startTime: "",
    endTime: "",
    additionalMinutes: 0,
    materialCosts: 0,
    isKMU: false,
    description: "",
  });

  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const storedPin = localStorage.getItem("thp_technician_pin");
    if (storedPin === "1234") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("thp_technician_pin", pinInput);
    } else {
      toast({
        title: "Falscher PIN",
        description: "Bitte korrekten PIN eingeben.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setTechnicianData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    const service = SERVICES.find((s) => s.id === technicianData.serviceId);
    if (!service) {
      toast({
        title: "Service fehlt",
        description: "Bitte Service auswählen.",
        variant: "destructive",
      });
      return;
    }

    if (!technicianData.startTime || !technicianData.endTime) {
      toast({
        title: "Zeiten fehlen",
        description: "Bitte Start- und Endzeit angeben.",
        variant: "destructive",
      });
      return;
    }

    const calculatedTotal = calcTechnicianTotal(technicianData, service.zeitMin);
    setTotal(calculatedTotal);
  };

  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} />
      {!isAuthenticated ? (
        <div className="container mx-auto max-w-md py-20">
          <Card>
            <CardHeader>
              <CardTitle>Techniker-Login</CardTitle>
              <CardDescription>Bitte PIN eingeben</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="container mx-auto max-w-3xl py-16">
          <h1 className="text-3xl font-bold mb-8">Techniker-Ansicht</h1>

          <Card>
            <CardHeader>
              <CardTitle>Einsatzdaten</CardTitle>
              <CardDescription>Daten für die Abrechnung</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plz">PLZ</Label>
                  <Input
                    type="text"
                    id="plz"
                    value={technicianData.plz}
                    onChange={(e) => handleInputChange("plz", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="serviceId">Service</Label>
                  <Select onValueChange={(value) => handleInputChange("serviceId", value)}>
                    <SelectTrigger id="serviceId">
                      <SelectValue placeholder="Service auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.titel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Startzeit</Label>
                  <Input
                    type="time"
                    id="startTime"
                    value={technicianData.startTime}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Endzeit</Label>
                  <Input
                    type="time"
                    id="endTime"
                    value={technicianData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="additionalMinutes">Zusätzliche Minuten</Label>
                <Input
                  type="number"
                  id="additionalMinutes"
                  value={technicianData.additionalMinutes}
                  onChange={(e) =>
                    handleInputChange("additionalMinutes", parseInt(e.target.value))
                  }
                />
              </div>

              <div>
                <Label htmlFor="materialCosts">Materialkosten (€)</Label>
                <Input
                  type="number"
                  id="materialCosts"
                  value={technicianData.materialCosts}
                  onChange={(e) =>
                    handleInputChange("materialCosts", parseFloat(e.target.value))
                  }
                />
              </div>

              <div>
                <Label htmlFor="description">Beschreibung</Label>
                <Input
                  type="text"
                  id="description"
                  value={technicianData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isKMU"
                  checked={technicianData.isKMU}
                  onCheckedChange={(checked) => handleInputChange("isKMU", checked === true)}
                />
                <Label htmlFor="isKMU">KMU-Kunde</Label>
              </div>

              <Button onClick={calculateTotal}>Berechnen</Button>

              {total !== null && (
                <Alert>
                  <AlertDescription>
                    Gesamt: {total.toFixed(2)} € (zzgl. MwSt. bei KMU)
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Techniker;
