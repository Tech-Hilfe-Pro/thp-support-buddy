import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageCircle } from "lucide-react";

export default function NIS2QuickCheckForm() {
  const [formData, setFormData] = useState({
    firma: "",
    ansprechpartner: "",
    email: "",
    telefon: "",
    mitarbeitende: "",
    branche: "",
    mfaAktiv: false,
    backupsGetestet: false,
    patchManagement: false,
    awarenessTraining: false,
    incidentPlaybook: false,
    lieferantenpruefung: false,
    besonderheiten: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firma.trim()) {
      newErrors.firma = "Firma ist erforderlich";
    }
    if (!formData.ansprechpartner.trim()) {
      newErrors.ansprechpartner = "Ansprechpartner ist erforderlich";
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }
    if (!formData.consent) {
      newErrors.consent = "Bitte bestätigen Sie die Datenschutzhinweise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildEmailBody = () => {
    const checks = [];
    if (formData.mfaAktiv) checks.push("✓ MFA aktiv");
    if (formData.backupsGetestet) checks.push("✓ Backups getestet");
    if (formData.patchManagement) checks.push("✓ Patch-Management");
    if (formData.awarenessTraining) checks.push("✓ Awareness-Training");
    if (formData.incidentPlaybook) checks.push("✓ Incident-Playbook");
    if (formData.lieferantenpruefung) checks.push("✓ Lieferantenprüfung");

    return `NIS2 QuickCheck Anfrage

Firma: ${formData.firma}
Ansprechpartner: ${formData.ansprechpartner}
E-Mail: ${formData.email}
Telefon: ${formData.telefon || "nicht angegeben"}

Mitarbeitende: ${formData.mitarbeitende || "nicht angegeben"}
Branche: ${formData.branche || "nicht angegeben"}

Aktueller Stand:
${checks.length > 0 ? checks.join("\n") : "Keine Angaben"}

Besonderheiten/Fragen:
${formData.besonderheiten || "keine"}
`;
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(`NIS2 QuickCheck – ${formData.firma}`);
    const body = encodeURIComponent(buildEmailBody());
    const mailtoUrl = `mailto:info@techhilfepro.de?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      window.location.href = "/thanks/nis2-quickcheck";
    }, 400);
  };

  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const msg = encodeURIComponent(
      `NIS2 QuickCheck Anfrage von ${formData.firma} (${formData.ansprechpartner}). Bitte um Rückruf.`
    );
    const whatsappUrl = `https://wa.me/4915565029989?text=${msg}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      window.location.href = "/thanks/nis2-quickcheck";
    }, 400);
  };

  return (
    <form className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Firma */}
        <div>
          <Label htmlFor="firma">
            Firma <span className="text-red-600" aria-label="erforderlich">*</span>
          </Label>
          <Input
            id="firma"
            type="text"
            value={formData.firma}
            onChange={(e) => handleInputChange("firma", e.target.value)}
            aria-invalid={!!errors.firma}
            aria-describedby={errors.firma ? "firma-error" : undefined}
            className={errors.firma ? "border-red-500" : ""}
            required
          />
          {errors.firma && (
            <p id="firma-error" className="text-sm text-red-600 mt-1" role="alert">
              {errors.firma}
            </p>
          )}
        </div>

        {/* Ansprechpartner */}
        <div>
          <Label htmlFor="ansprechpartner">
            Ansprechpartner <span className="text-red-600" aria-label="erforderlich">*</span>
          </Label>
          <Input
            id="ansprechpartner"
            type="text"
            value={formData.ansprechpartner}
            onChange={(e) => handleInputChange("ansprechpartner", e.target.value)}
            aria-invalid={!!errors.ansprechpartner}
            aria-describedby={errors.ansprechpartner ? "ansprechpartner-error" : undefined}
            className={errors.ansprechpartner ? "border-red-500" : ""}
            required
          />
          {errors.ansprechpartner && (
            <p id="ansprechpartner-error" className="text-sm text-red-600 mt-1" role="alert">
              {errors.ansprechpartner}
            </p>
          )}
        </div>

        {/* E-Mail */}
        <div>
          <Label htmlFor="email">
            E-Mail <span className="text-red-600" aria-label="erforderlich">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={errors.email ? "border-red-500" : ""}
            required
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-600 mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <Label htmlFor="telefon">Telefon</Label>
          <Input
            id="telefon"
            type="tel"
            value={formData.telefon}
            onChange={(e) => handleInputChange("telefon", e.target.value)}
          />
        </div>

        {/* Mitarbeitende */}
        <div>
          <Label htmlFor="mitarbeitende">Mitarbeitende</Label>
          <Select value={formData.mitarbeitende} onValueChange={(value) => handleInputChange("mitarbeitende", value)}>
            <SelectTrigger id="mitarbeitende">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<10">&lt;10</SelectItem>
              <SelectItem value="10-49">10–49</SelectItem>
              <SelectItem value="50-249">50–249</SelectItem>
              <SelectItem value="250+">250+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Branche */}
        <div>
          <Label htmlFor="branche">Branche</Label>
          <Input
            id="branche"
            type="text"
            value={formData.branche}
            onChange={(e) => handleInputChange("branche", e.target.value)}
            placeholder="z.B. Handel, Produktion, IT-Dienstleistung"
          />
        </div>
      </div>

      {/* Aktueller Stand */}
      <div>
        <Label className="block mb-3">Aktueller Stand (optional)</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mfaAktiv"
              checked={formData.mfaAktiv}
              onCheckedChange={(checked) => handleInputChange("mfaAktiv", checked === true)}
            />
            <Label htmlFor="mfaAktiv" className="font-normal cursor-pointer">
              MFA aktiv
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backupsGetestet"
              checked={formData.backupsGetestet}
              onCheckedChange={(checked) => handleInputChange("backupsGetestet", checked === true)}
            />
            <Label htmlFor="backupsGetestet" className="font-normal cursor-pointer">
              Backups (getestet)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="patchManagement"
              checked={formData.patchManagement}
              onCheckedChange={(checked) => handleInputChange("patchManagement", checked === true)}
            />
            <Label htmlFor="patchManagement" className="font-normal cursor-pointer">
              Patch-Management
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="awarenessTraining"
              checked={formData.awarenessTraining}
              onCheckedChange={(checked) => handleInputChange("awarenessTraining", checked === true)}
            />
            <Label htmlFor="awarenessTraining" className="font-normal cursor-pointer">
              Awareness-Training
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="incidentPlaybook"
              checked={formData.incidentPlaybook}
              onCheckedChange={(checked) => handleInputChange("incidentPlaybook", checked === true)}
            />
            <Label htmlFor="incidentPlaybook" className="font-normal cursor-pointer">
              Incident-Playbook
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lieferantenpruefung"
              checked={formData.lieferantenpruefung}
              onCheckedChange={(checked) => handleInputChange("lieferantenpruefung", checked === true)}
            />
            <Label htmlFor="lieferantenpruefung" className="font-normal cursor-pointer">
              Lieferantenprüfung
            </Label>
          </div>
        </div>
      </div>

      {/* Besonderheiten */}
      <div>
        <Label htmlFor="besonderheiten">Besonderheiten/Fragen</Label>
        <Textarea
          id="besonderheiten"
          value={formData.besonderheiten}
          onChange={(e) => handleInputChange("besonderheiten", e.target.value)}
          rows={4}
          placeholder="Was möchten Sie uns noch mitteilen?"
        />
      </div>

      {/* Consent */}
      <div>
        <div className="flex items-start space-x-2">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => handleInputChange("consent", checked === true)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            required
          />
          <Label htmlFor="consent" className="font-normal cursor-pointer">
            Ich habe die{" "}
            <a href="/recht/datenschutz" className="text-[#3BA9FF] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3BA9FF] rounded" target="_blank" rel="noopener">
              Datenschutzhinweise
            </a>{" "}
            gelesen. <span className="text-red-600" aria-label="erforderlich">*</span>
          </Label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="text-sm text-red-600 mt-1" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          type="button"
          onClick={handleEmailSubmit}
          className="bg-[#3BA9FF] hover:bg-[#2e8fd9] text-white flex items-center gap-2"
        >
          <Mail className="w-5 h-5" aria-hidden="true" />
          QuickCheck per E-Mail senden
        </Button>
        <Button
          type="button"
          onClick={handleWhatsAppSubmit}
          variant="outline"
          className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          Schnell via WhatsApp
        </Button>
      </div>
    </form>
  );
}
