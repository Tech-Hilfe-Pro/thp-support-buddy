import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md ${
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-3 lg:px-6">
        <div className="h-16 flex items-center gap-3">
          {/* Brand */}
          <Link 
            to="/" 
            className="shrink-0 flex items-center gap-2 text-xl font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-1 py-1"
          >
            <img 
              src="/assets/power-icon.png" 
              alt="" 
              className="h-8 w-8" 
              width="32" 
              height="32"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            Tech Hilfe Pro
          </Link>

          {/* Desktop Nav */}
          <nav
            className="ml-2 hidden md:flex min-w-0 flex-1 items-center overflow-x-auto no-scrollbar"
            aria-label="Hauptnavigation"
          >
            <div className="flex flex-nowrap items-center gap-1 md:gap-2 lg:gap-3 xl:gap-4">
              <NavItem to="/">Startseite</NavItem>
              <NavItem to="/leistungen">Leistungen</NavItem>
              {/* Kürzeres Label für kleinere Breakpoints */}
              <NavLink 
                to="/pakete-preise" 
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <span className="xl:inline hidden">Pakete & Preise</span>
                <span className="xl:hidden inline">Preise</span>
              </NavLink>
              <NavItem to="/abo">Mitgliedschaft</NavItem>
              <NavItem to="/ueber-uns">Über uns</NavItem>
              <NavItem to="/kontakt">Kontakt</NavItem>
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md">
                  Rechtliches
                  <svg className="ml-1 h-4 w-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-1 hidden group-hover:block bg-background border rounded-lg shadow-lg p-2 min-w-40">
                  <NavItem to="/recht/impressum">Impressum</NavItem>
                  <NavItem to="/recht/datenschutz">Datenschutz</NavItem>
                  <NavItem to="/recht/agb">AGB</NavItem>
                  <NavItem to="/recht/widerruf">Widerruf</NavItem>
                </div>
              </div>
            </div>
          </nav>

          {/* CTAs rechts (nicht schrumpfen) */}
          <div className="ml-auto hidden md:flex items-center gap-2 shrink-0">
            <Link 
              to="/abo" 
              className="px-3 py-2 rounded-lg border border-input text-sm font-medium text-foreground bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
            >
              Mitglied werden
            </Link>
            <Link 
              to="/termin" 
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
            >
              Jetzt Termin buchen
            </Link>
            {/* Contact Icons */}
            <a 
              href="tel:+4915565029989" 
              className="p-2 text-foreground hover:bg-accent rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
              aria-label="Anrufen"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
            <a 
              href="https://wa.me/4915565029989" 
              className="p-2 hover:bg-accent rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 whatsapp-brand" 
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388"/>
              </svg>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-auto p-2 rounded-lg border border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menü öffnen"
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <div id="mobile-nav" className={`${open ? "block" : "hidden"} md:hidden pb-3`}>
          <div className="flex flex-col gap-1">
            <NavItem to="/">Startseite</NavItem>
            <NavItem to="/leistungen">Leistungen</NavItem>
            <NavItem to="/pakete-preise">Pakete & Preise</NavItem>
            <NavItem to="/abo">Mitgliedschaft</NavItem>
            <NavItem to="/ueber-uns">Über uns</NavItem>
            <NavItem to="/kontakt">Kontakt</NavItem>
            <div className="pt-2 border-t mt-2">
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground">Rechtliches</p>
              <NavItem to="/recht/impressum">Impressum</NavItem>
              <NavItem to="/recht/datenschutz">Datenschutz</NavItem>
              <NavItem to="/recht/agb">AGB</NavItem>
              <NavItem to="/recht/widerruf">Widerruf</NavItem>
            </div>
            <Link 
              to="/termin" 
              className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
            >
              Jetzt Termin buchen
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}