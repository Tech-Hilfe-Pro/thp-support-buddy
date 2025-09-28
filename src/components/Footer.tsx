import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Clock } from "lucide-react";

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
                  <p className="font-medium">Tech Hilfe Pro</p>
                  <p>Musterstraße 123</p>
                  <p>50667 Köln</p>
                  <p className="mt-1">Servicegebiet: Köln, Neuss & Umgebung</p>
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
            </nav>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Kleinunternehmer i.S.d. § 19 UStG - keine Ausweisung der Umsatzsteuer
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Folge uns</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tech Hilfe Pro. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;