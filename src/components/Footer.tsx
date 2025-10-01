import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { COPY } from "@/data/copy";
import { COMPANY } from "@/data/company";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Kontakt</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <img src="/logo.png" alt="Logo" className="w-5 h-5" />
                    <span>Tech <span className="text-[hsl(var(--thp-primary))]">Hilfe</span> Pro</span>
                  </div>
                  <p>Büro in Köln (HO).</p>
                  <p>Remote & Vor-Ort-Service.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <a 
                    href={`tel:${COMPANY.telE164}`}
                    className="hover:text-primary transition-colors"
                  >
                    {COMPANY.telDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <a 
                    href={`mailto:${COMPANY.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Öffnungszeiten</p>
                  <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
                  <p>Sa: 10:00 - 16:00 Uhr</p>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Rechtliches</h3>
            <nav className="space-y-2">
              <Link
                to="/recht/impressum"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                Impressum
              </Link>
              <Link
                to="/recht/datenschutz"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                Datenschutz
              </Link>
              <Link
                to="/recht/agb"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                AGB
              </Link>
              <Link
                to="/recht/widerruf"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                Widerruf
              </Link>
              <Link
                to="/recht/cookies"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                Cookie-Richtlinie
              </Link>
            </nav>
          </div>

          {/* Hilfe & Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Hilfe & Support</h3>
            <nav className="space-y-2">
              <Link
                to="/faq"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                FAQ - Häufige Fragen
              </Link>
              <Link
                to="/kontakt"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                Kontakt
              </Link>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                WhatsApp-Support
              </a>
            </nav>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Kleinunternehmer i.S.d. § 19 UStG<br />
                Zahlungen sicher via Stripe
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tech Hilfe Pro. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
